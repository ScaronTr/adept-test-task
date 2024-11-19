import type { FC } from "react";
import { Provider } from "react-redux";

import type { ProviderProps } from "../types.ts";
import { store } from "./store.ts";

export const StoreProvider: FC<ProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
