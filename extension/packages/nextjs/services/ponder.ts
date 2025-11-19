import * as schema from "../../ponder/ponder.schema";
import { createClient } from "@ponder/client";

const ponderUrl = process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069";

export const ponderClient = createClient(`${ponderUrl}/sql`, { schema });
