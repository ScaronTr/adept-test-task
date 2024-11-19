import { CompaniesPage } from "@/pages/companies";

import { StoreProvider } from "./store";
import { StyleProvider } from "./styles/";

export const AppProvider = () => {
    return (
        <StoreProvider>
            <StyleProvider>
                <CompaniesPage />
            </StyleProvider>
        </StoreProvider>
    );
};
