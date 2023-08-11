export interface Session {
  title: string;
  level: "100" | "200" | "300" | "400";
  thirdPartyID: string;
  sessionType: string;
  trackName: string;
  topics: string[];
  roles: string[];
  services: string[];
}
