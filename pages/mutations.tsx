import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MutationsTable from "../components/MutationsTable";

import { Mutation } from "../types/mutation";
import { getMutations } from "../lib/api";
import Link from "next/link";
import Layout from "@/components/Layout";

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
    <Layout title="Mutations">
      <Container sx={{ py: 0, px: 0 }} maxWidth={"lg"} disableGutters={true}>
        {isLoading ? <Typography>Loading...</Typography> : <MutationsTable rows={allMutations} />}
      </Container>
    </Layout>
  );
}
