import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MutationsTable from "../components/MutationsTable";

import { Mutation } from "../types/mutation";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getMutations } from "../lib/api";

const theme = createTheme();

export default function MutationList({
  allMutations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Mutations
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Find a list of all mutations of Re:Invent 2023 sessions below.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <MutationsTable rows={allMutations} />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{
  allMutations: Mutation[];
}> = async () => {
  const allMutations = await getMutations();
  return { props: { allMutations } };
};
