import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { INITIAL_COMPANIES } from "../lib";
import type { Company } from "../types.ts";

const initialState = {
    data: INITIAL_COMPANIES,
    isSelectedAll: INITIAL_COMPANIES.every(({ selected }) => selected),
};

export const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setIsSelectedAllCompanies: (state, action: PayloadAction<boolean>) => {
            state.isSelectedAll = action.payload;
            state.data = state.data.map((company) => ({ ...company, selected: action.payload }));
        },
        setSelectedCompany: (state, action: PayloadAction<{ id: Company["id"]; selected: Company["selected"] }>) => {
            const newState = state.data.map((company) =>
                company.id === action.payload.id ? { ...company, selected: action.payload.selected } : company,
            );
            state.isSelectedAll = newState.every(({ selected }) => selected);
            state.data = newState;
        },
    },
    selectors: {
        selectCompanies: (state) => state.data,
        selectIsSelectedAllCompanies: (state) => state.isSelectedAll,
    },
});

export const { setIsSelectedAllCompanies, setSelectedCompany } = companiesSlice.actions;

export const { selectCompanies, selectIsSelectedAllCompanies } = companiesSlice.selectors;

export const companiesReducer = companiesSlice.reducer;
