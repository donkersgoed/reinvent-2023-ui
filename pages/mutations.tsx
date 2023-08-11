import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MutationsTable from "../components/MutationsTable";

import { Mutation } from "../types/mutation";
import { getMutations } from "../lib/api";
import Link from "next/link";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary">
              Mutations
            </Typography>
            <Typography component="p" variant="h6" align="center" color="text.primary" gutterBottom>
              [jump to <Link href="/sessions">sessions</Link>]
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {isLoading ? <Typography>Loading...</Typography> : <MutationsTable rows={allMutations} />}
        </Container>
      </main>
    </ThemeProvider>
  );
}
