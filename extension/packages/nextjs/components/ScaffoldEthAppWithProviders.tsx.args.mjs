export const preContent = `
    import { MiniappProvider } from "./MiniappProvider";
    import { ponderClient } from "~~/services/ponder";
    import { PonderProvider } from "@ponder/react";


`;

export const extraProviders = {
    'PonderProvider': {
        client: "$$ponderClient$$",
    },
    'MiniappProvider': {},
};