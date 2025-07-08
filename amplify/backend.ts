import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource"; // Only if you have an auth resource
import { data } from "./data/resource";

export const backend = defineBackend({
  auth,   // remove this line if you do not have an auth resource
  data,
});