import * as React from "react";
import Typography from "@mui/material/Typography";
import Container, { ContainerProps } from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";

import SessionsTable from "../components/SessionsTable";

import { Session } from "../types/session";
import { getSessions } from "../lib/api";
import Layout from "@/components/Layout";
import Navbar from "@/components//Navbar";
import {
  FilterAndColumnsProvider,
  filterkeys,
  FilterAndColumnsContext,
} from "@/contexts/FilterAndColumnsContext";

type SessionListContainerProps = ContainerProps;

const SessionListContainer: React.FC<SessionListContainerProps> = (props) => {
  const [allSessions, setAllSessions] = React.useState<Session[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);
  const { filters, setFilters } = React.useContext(FilterAndColumnsContext);

  React.useEffect(() => {
    getSessions().then((data) => {
      setAllSessions(data);
      setLoading(false);
    });
  }, []);

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
    const newFilters = fillFilters(allSessions);
    if (prevFilters !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
    }
    if (allSessions.length > 0) setInitialLoadComplete(true);
  }, [allSessions, filters, setFilters, initialLoadComplete]);

  return (
    <Container {...props}>
      {isLoading ? (
        <Typography variant="h4" component="h1" sx={{ px: 2, py: 4 }}>
          Loading...
        </Typography>
      ) : (
        <SessionsTable rows={allSessions} />
      )}
    </Container>
  );
};

export default function SessionList() {
  return (
    <Layout>
      <FilterAndColumnsProvider key={"sessions"}>
        <Navbar title={"Sessions"} />
        <SessionListContainer sx={{ pt: 0, px: 0 }} maxWidth={"lg"} disableGutters={true} />
      </FilterAndColumnsProvider>
    </Layout>
  );
}
