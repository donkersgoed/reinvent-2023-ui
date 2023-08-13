import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MutationsTable from "../components/MutationsTable";

import { Mutation } from "../types/mutation";
import { getMutations } from "../lib/api";
import Navbar from "@/components//Navbar";
import Layout from "@/components/Layout";
import { FilterAndColumnsProvider } from "@/contexts/FilterAndColumnsContext";

const theme = createTheme();

export default function MutationList() {
  const [allMutations, setAllMutations] = React.useState<Mutation[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getMutations().then((data) => {
      setAllMutations(data);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <FilterAndColumnsProvider>
        <Navbar title={"Mutations"} />
        <Container sx={{ py: 0, px: 0 }} maxWidth={"lg"} disableGutters={true}>
          {isLoading ? (
            <Typography variant="h4" component="h1" sx={{ py: 4 }}>
              Loading...
            </Typography>
          ) : (
            <MutationsTable rows={allMutations} />
          )}
        </Container>
      </FilterAndColumnsProvider>
    </Layout>
  );
}
