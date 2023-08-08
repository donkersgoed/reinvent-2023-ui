export async function getSessions() {
  // const API_URL = "https://api.reinvent23.l15d.com/sessions";
  const API_URL = "https://mzr7s3r3e8.execute-api.eu-west-1.amazonaws.com/prod/sessions";
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    headers,
    method: "GET",
  });

  const sessionsJson = await res.json();
  return sessionsJson.sessions;
}
