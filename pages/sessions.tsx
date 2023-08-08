import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SessionsTable from "../components/SessionsTable";

import { Session } from "../types/session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSessions } from "../lib/api";

const theme = createTheme();

export default function SessionList({
  allSessions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
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
              Find a list of all sessions at Re:Invent 2023 below.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <SessionsTable rows={allSessions} />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{
  allSessions: Session[];
}> = async () => {
  const allSessions = await getSessions();
  return { props: { allSessions } };
};
