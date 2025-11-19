import * as schema from "../../ponder/ponder.schema";

declare module "@ponder/react" {
  interface Register {
    schema: typeof schema;
  }
}
