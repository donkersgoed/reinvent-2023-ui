import * as React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/api";
import { Session } from "@/types/session";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

const BackButton = styled(Button)({
  color: "white",
});

function SessionHeader({ ...props }: TypographyProps) {
  return (
    <Typography
      variant="h5"
      component="h1"
      sx={{
        px: 2,
        pt: 2,
        pb: 1,
        backgroundColor: "#eee",
        borderBottom: "1px solid #ccc",
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
}

function SessionSubHeader({ ...props }: TypographyProps) {
  return (
    <Typography
      variant="h6"
      component="h2"
      sx={{
        px: 2,
        py: 1,
        backgroundColor: "#eee",
        border: "1px solid #ccc",
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
}

function SessionDetail({ ...props }: React.ComponentProps<typeof Grid>) {
  const newProps = {
    item: true,
    sx: {
      display: "flex",
      flexDirection: "column",
    },
    ...props,
  };
  return <Grid {...newProps}>{newProps.children}</Grid>;
}

function SessionDetailList({ ...props }: React.ComponentProps<typeof List>) {
  const newProps = {
    sx: { listStyleType: "disc", pl: 4, border: "1px solid #ccc", flexGrow: 1 },
    ...props,
  };
  return <List {...newProps}>{newProps.children}</List>;
}

function SessionDetailListItem({ ...props }: React.ComponentProps<typeof ListItem>) {
  const newProps = { sx: { display: "list-item" }, ...props };
  return <ListItem {...newProps}>{newProps.children}</ListItem>;
}

type SessionQuery = {
  id: string;
};

export default function SessionPage() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setError] = React.useState(false);
  const router = useRouter();
  const sessionQuery = router.query as SessionQuery;

  React.useEffect(() => {
    if (sessionQuery.id == null) {
      return;
    }
    getSession({ id: sessionQuery.id }).then((data) => {
      if (data.error) {
        setError(true);
        setLoading(false);
      } else {
        setSession(data);
        setLoading(false);
      }
    });
  }, [sessionQuery.id]);

  const sessionAfterLoading = session as Session;

  function clickBack() {
    router.push(`/sessions/`);
  }

  return (
    <Layout>
      <Navbar title={session ? session.thirdPartyID : "Loading..."} nofilters />
      {isLoading ? (
        <Typography variant="h4" component="h1" sx={{ px: 2, py: 4 }}>
          Loading...
        </Typography>
      ) : hasError ? (
        <Typography variant="h4" component="h1" sx={{ px: 2, py: 4 }}>
          Error loading session {sessionQuery.id}
        </Typography>
      ) : (
        <Container
          sx={{
            pt: 0,
            px: 0,
            borderLeft: "1px solid #ccc",
            borderRight: "1px solid #ccc",
            minHeight: "calc(100dvh - 117px)",
            flexGrow: 1,
          }}
          maxWidth={"md"}
          disableGutters={true}
        >
          <Grid container>
            <Grid item xs={12} sx={{ py: 1, px: 1, color: "#FFF", backgroundColor: "#000" }}>
              <BackButton
                variant="text"
                color="success"
                startIcon={<ArrowBackIcon />}
                onClick={() => clickBack()}
              >
                Back to session list
              </BackButton>
            </Grid>
            <Grid item xs={12}>
              <SessionHeader>
                {sessionAfterLoading.thirdPartyID}: {sessionAfterLoading.title}
              </SessionHeader>
            </Grid>
            <Grid item xs={12}>
              <SessionSubHeader>
                Level {sessionAfterLoading.level} {sessionAfterLoading.trackName}
              </SessionSubHeader>
            </Grid>
            <SessionDetail xs={12}>
              <Typography variant="body1" sx={{ px: 2, py: 1 }}>
                {sessionAfterLoading.description.replace(/<[^>]+>/g, "")}
              </Typography>
            </SessionDetail>
            <SessionDetail xs={12} md={6}>
              <SessionSubHeader>Services</SessionSubHeader>
              <SessionDetailList>
                {sessionAfterLoading.services.map((service) => (
                  <SessionDetailListItem key={service} sx={{ display: "list-item" }}>
                    {service}
                  </SessionDetailListItem>
                ))}
              </SessionDetailList>
            </SessionDetail>
            <SessionDetail xs={12} md={6}>
              <SessionSubHeader>Topics</SessionSubHeader>
              <SessionDetailList>
                {sessionAfterLoading.topics.map((topic) => (
                  <SessionDetailListItem key={topic} sx={{ display: "list-item" }}>
                    {topic}
                  </SessionDetailListItem>
                ))}
              </SessionDetailList>
            </SessionDetail>
            <SessionDetail xs={12} md={4}>
              <SessionSubHeader>Industries</SessionSubHeader>
              <SessionDetailList>
                {sessionAfterLoading.industries.map((industry) => (
                  <SessionDetailListItem key={industry} sx={{ display: "list-item" }}>
                    {industry}
                  </SessionDetailListItem>
                ))}
              </SessionDetailList>
            </SessionDetail>
            <SessionDetail xs={12} md={4}>
              <SessionSubHeader>Areas of Interest</SessionSubHeader>
              <SessionDetailList>
                {sessionAfterLoading.areasOfInterest.map((areaOfInterest) => (
                  <SessionDetailListItem key={areaOfInterest} sx={{ display: "list-item" }}>
                    {areaOfInterest}
                  </SessionDetailListItem>
                ))}
              </SessionDetailList>
            </SessionDetail>
            <SessionDetail xs={12} md={4}>
              <SessionSubHeader>Roles</SessionSubHeader>
              <SessionDetailList>
                {sessionAfterLoading.roles.map((role) => (
                  <SessionDetailListItem key={role} sx={{ display: "list-item" }}>
                    {role}
                  </SessionDetailListItem>
                ))}
              </SessionDetailList>
            </SessionDetail>
          </Grid>
        </Container>
      )}
    </Layout>
  );
}
