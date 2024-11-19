import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { INITIAL_COMPANIES, getSelectedCompaniesMap } from "../lib";
import type { Company, InitialState } from "../types.ts";

const initialState: InitialState = {
    data: INITIAL_COMPANIES,
    selected: [],
    isSelectedAll: false,
};

export const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setIsSelectedAllCompanies: (state, action: PayloadAction<boolean>) => {
            state.selected = action.payload ? state.data.map(({ id }) => id) : [];
            state.isSelectedAll = action.payload;
        },
        setSelectedCompany: (state, action: PayloadAction<{ id: Company["id"]; selected: boolean }>) => {
            if (action.payload.selected) {
                state.selected.push(action.payload.id);
                if (state.selected.length === state.data.length && !state.isSelectedAll) state.isSelectedAll = true;
            } else {
                state.selected = state.selected.filter((id) => id !== action.payload.id);
                if (state.isSelectedAll) state.isSelectedAll = false;
            }
        },
        addCompany: (state) => {
            const id = state.data.length ? state.data[state.data.length - 1].id + 1 : 1;

            if (state.isSelectedAll) state.selected.push(id);

            state.data.push({
                id,
                name: "",
                address: "",
            });
        },
        deleteSelectedCompanies: (state) => {
            const idsMap = getSelectedCompaniesMap(state.selected);

            state.data = state.data.filter((company) => !idsMap[company.id]);
            state.selected = [];
            if (state.isSelectedAll) state.isSelectedAll = false;
        },
    },
    selectors: {
        selectCompanies: (state) => state.data,
        selectSelectedCompanies: (state) => state.selected,
        selectIsSelectedAllCompanies: (state) => state.isSelectedAll,
    },
});

export const { setIsSelectedAllCompanies, setSelectedCompany, addCompany, deleteSelectedCompanies } = companiesSlice.actions;

export const { selectCompanies, selectIsSelectedAllCompanies, selectSelectedCompanies } = companiesSlice.selectors;

export const companiesReducer = companiesSlice.reducer;
