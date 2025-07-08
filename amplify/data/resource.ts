import { defineData } from "@aws-amplify/backend";

export const data = defineData({
  models: {
    Event: {
      fields: {
        id: "ID!",
        name: "String!"
      }
    }
  }
});