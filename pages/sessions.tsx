import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SessionsTable from "../components/SessionsTable";

import { Session } from "../types/session";
import { getSessions } from "../lib/api";
import Link from "next/link";

const theme = createTheme();

export default function SessionList() {
  const [allSessions, setAllSessions] = React.useState<Session[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getSessions().then((data) => {
      setAllSessions(data);
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
              Session list
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Find a list of all sessions at Re:Invent 2023 below
            </Typography>
            <Typography component="p" variant="h6" align="center" color="text.primary" gutterBottom>
              [jump to <Link href="/mutations">mutations</Link>]
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="lg">
          {isLoading ? <Typography>Loading...</Typography> : <SessionsTable rows={allSessions} />}
        </Container>
      </main>
    </ThemeProvider>
  );
}
