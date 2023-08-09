import { Session } from "./session";

type SessionAddedOrRemovedMutation = {
  sessionID: string;
  mutationType: "SessionAdded" | "SessionRemoved";
  sessionTitle: string;
  mutationDateTime: string;
  mutationData: Session;
};

type SessionUpdatedMutationData = {
  new: Session;
  old: Session;
};

export type SessionUpdatedMutation = {
  sessionID: string;
  mutationType: "SessionUpdated";
  sessionTitle: string;
  mutationDateTime: string;
  mutationData: SessionUpdatedMutationData;
};

export type Mutation = SessionAddedOrRemovedMutation | SessionUpdatedMutation;
