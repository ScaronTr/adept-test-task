import type { Company } from "../types.ts";

export const INITIAL_COMPANIES: Company[] = [];

for (let i = 0; i < 10; i++) {
    INITIAL_COMPANIES.push({ id: i + 1, name: `Компания №${i + 1}`, address: `ул. Компанейская, д. ${i + 1}`, selected: false });
}
