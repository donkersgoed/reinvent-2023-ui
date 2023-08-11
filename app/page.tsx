import styles from "./page.module.css";
import { Typography, Grid } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Typography variant="h2">Re:Invent &apos;23 Session Tracker</Typography>
      </div>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Link href="/sessions" className={styles.card}>
          <h2>
            Sessions <span>-&gt;</span>
          </h2>
          <Typography variant="body1">All sessions at Re:Invent 2023.</Typography>
        </Link>

        <Link href="/mutations" className={styles.card}>
          <h2>
            Mutations <span>-&gt;</span>
          </h2>
          <Typography variant="body1">All changes to sessions at Re:Invent 2023.</Typography>
        </Link>
      </Grid>
    </main>
  );
}
