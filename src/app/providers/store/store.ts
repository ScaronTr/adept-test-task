import { configureStore } from "@reduxjs/toolkit";

import { companiesReducer } from "@/entities/company";

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
    },
});
