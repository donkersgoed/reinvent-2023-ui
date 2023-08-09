export interface Mutation {
  sessionID: string;
  mutationType: "SessionAdded" | "SessionUpdated" | "SessionRemoved";
  sessionTitle: string;
  mutationDateTime: string;
}
