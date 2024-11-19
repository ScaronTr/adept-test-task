import type { ChangeEventHandler } from "react";

import {
    type Company,
    selectCompanies,
    selectIsSelectedAllCompanies,
    setIsSelectedAllCompanies,
    setSelectedCompany,
} from "@/entities/company";

import { useAppDispatch, useAppSelector } from "@/shared/hooks";

export const CompaniesPage = () => {
    const companies = useAppSelector(selectCompanies);
    const isSelectedAllCompanies = useAppSelector(selectIsSelectedAllCompanies);
    const dispatch = useAppDispatch();

    const handleSelectAllCompanies: ChangeEventHandler<HTMLInputElement> = (e) => dispatch(setIsSelectedAllCompanies(e.target.checked));
    const handleSelectCompany = (id: Company["id"], selected: Company["selected"]) => dispatch(setSelectedCompany({ id, selected }));

    return (
        <main>
            <h1>Список компаний</h1>
            <table>
                <caption>Компании</caption>
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input checked={isSelectedAllCompanies} onChange={handleSelectAllCompanies} type="checkbox" />
                                Выбрать всё
                            </label>
                        </th>
                        <th>Название</th>
                        <th>Адрес</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(({ id, name, address, selected }) => (
                        <tr key={id}>
                            <td>
                                <input
                                    checked={selected}
                                    onChange={(e) => handleSelectCompany(id, e.target.checked)}
                                    type="checkbox"
                                    name="companies"
                                />
                            </td>
                            <td>{name}</td>
                            <td>{address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};
