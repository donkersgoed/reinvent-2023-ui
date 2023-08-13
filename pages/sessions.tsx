import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";

import SessionsTable from "../components/SessionsTable";

import { Session } from "../types/session";
import { getSessions } from "../lib/api";
import Layout from "@/components/Layout";
import Navbar from "@/components//Navbar";
import { FilterAndColumnsProvider } from "@/contexts/FilterAndColumnsContext";

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
    <Layout>
      <FilterAndColumnsProvider>
        <Navbar title={"Sessions"} />
        <Container sx={{ pt: 0, px: 0 }} maxWidth={"lg"} disableGutters={true}>
          {isLoading ? <Typography>Loading...</Typography> : <SessionsTable rows={allSessions} />}
        </Container>
      </FilterAndColumnsProvider>
    </Layout>
  );
}
