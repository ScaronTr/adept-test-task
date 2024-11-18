import type { FC } from "react";

import "../../styles/main.scss";
import type { ProviderProps } from "../types.ts";

export const StyleProvider: FC<ProviderProps> = ({ children }) => {
    return children;
};
