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

export async function getSession({ id }: { id: string }) {
  const API_URL = `https://${ROOT}/sessions/${id}`;
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    headers,
    method: "GET",
  });

  const sessionJson = await res.json();
  return sessionJson;
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
