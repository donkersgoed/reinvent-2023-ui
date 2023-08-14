import * as React from "react";
import Typography from "@mui/material/Typography";
import Container, { ContainerProps } from "@mui/material/Container";
import MutationsTable from "../components/MutationsTable";
import { Session } from "../types/session";
import { Mutation, SessionUpdatedMutation } from "../types/mutation";
import { getMutations } from "../lib/api";
import Navbar from "@/components//Navbar";
import Layout from "@/components/Layout";
import {
  FilterAndColumnsProvider,
  filterkeys,
  FilterAndColumnsContext,
} from "@/contexts/FilterAndColumnsContext";

type SessionListContainerProps = ContainerProps;

const MutationListContainer: React.FC<SessionListContainerProps> = (props) => {
  const [allMutations, setAllMutations] = React.useState<Mutation[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);
  const { filters, setFilters } = React.useContext(FilterAndColumnsContext);

  React.useEffect(() => {
    getMutations().then((data) => {
      setAllMutations(data);
      setLoading(false);
    });
  }, []);

  function extractSessionFromMutation(mutation: Mutation): Session {
    if (mutation.mutationType === "SessionAdded" || mutation.mutationType === "SessionRemoved") {
      return mutation.mutationData;
    } else if (mutation.mutationType === "SessionUpdated") {
      // Typecast mutation.mutationData to SessionUpdatedMutation
      const sessionUpdatedMutation = mutation as SessionUpdatedMutation;
      return sessionUpdatedMutation.mutationData.new;
    } else {
      throw new Error("Invalid mutation type");
    }
  }

  React.useEffect(() => {
    if (initialLoadComplete) {
      // Nothing to do
      return;
    }

    const addOptionToFilter = (filterName: string, option: string) => {
      const newFilters = { ...filters };
      newFilters[filterName].options[option] = true;
      return newFilters;
    };

    const fillFilters = (sessions: Session[]) => {
      let newFilters = { ...filters };
      sessions.forEach((session) => {
        filterkeys.forEach((key) => {
          const sessionFilterValue = session[key as keyof Session];

          if (typeof sessionFilterValue === "string") {
            newFilters = addOptionToFilter(key, sessionFilterValue);
          } else if (Array.isArray(sessionFilterValue)) {
            sessionFilterValue.forEach((value) => {
              newFilters = addOptionToFilter(key, value);
            });
          }
        });
      });
      return newFilters;
    };

    const prevFilters = JSON.stringify(filters);
    const newFilters = fillFilters(allMutations.map(extractSessionFromMutation));
    if (prevFilters !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
    }
    if (allMutations.length > 0) setInitialLoadComplete(true);
  }, [allMutations, filters, setFilters, initialLoadComplete]);

  return (
    <Container {...props}>
      {isLoading ? (
        <Typography variant="h4" component="h1" sx={{ px: 2, py: 4 }}>
          Loading...
        </Typography>
      ) : (
        <MutationsTable rows={allMutations} />
      )}
    </Container>
  );
};

export default function MutationList() {
  return (
    <Layout>
      <FilterAndColumnsProvider key={"mutations"}>
        <Navbar title={"Mutations"} />
        <MutationListContainer sx={{ pt: 0, px: 0 }} maxWidth={"lg"} disableGutters={true} />
      </FilterAndColumnsProvider>
    </Layout>
  );
}
