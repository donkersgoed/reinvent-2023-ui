// const ROOT = "mzr7s3r3e8.execute-api.eu-west-1.amazonaws.com/prod";
const ROOT = "api.reinvent23.l15d.com";

export async function getSessions() {
  const API_URL = `https://${ROOT}/sessions`;
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    headers,
    method: "GET",
  });

  const sessionsJson = await res.json();
  return sessionsJson.sessions;
}
export async function getMutations() {
  const API_URL = `https://${ROOT}/mutations`;
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    headers,
    method: "GET",
  });

  const mutationsJson = await res.json();
  return mutationsJson.mutations;
}
