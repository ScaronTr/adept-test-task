import { type ChangeEventHandler, useMemo } from "react";

import {
    type Company,
    type CompanyEditedFields,
    addCompany,
    deleteSelectedCompanies,
    editCompany,
    getSelectedCompaniesMap,
    selectCompanies,
    selectIsSelectedAllCompanies,
    selectSelectedCompanies,
    setIsSelectedAllCompanies,
    setSelectedCompany,
} from "@/entities/company";

import { useAppDispatch, useAppSelector } from "@/shared/hooks";

export const CompaniesPage = () => {
    const companies = useAppSelector(selectCompanies);
    const selectedCompanies = useAppSelector(selectSelectedCompanies);
    const isSelectedAllCompanies = useAppSelector(selectIsSelectedAllCompanies);
    const dispatch = useAppDispatch();

    const handleSelectAllCompanies: ChangeEventHandler<HTMLInputElement> = (e) => dispatch(setIsSelectedAllCompanies(e.target.checked));
    const handleSelectCompany = (id: Company["id"], selected: boolean) => dispatch(setSelectedCompany({ id, selected }));
    const handleAddCompany = () => dispatch(addCompany());
    const handleDeleteCompanies = () => dispatch(deleteSelectedCompanies());
    const handleEditCompany = (id: number, field: CompanyEditedFields, value: string) => dispatch(editCompany({ id, field, value }));

    const selectedCompaniesMap = useMemo(() => getSelectedCompaniesMap(selectedCompanies), [selectedCompanies]);

    return (
        <main>
            <h1>Список компаний</h1>
            <table>
                <caption>
                    <span>Компании</span>
                    <button onClick={handleAddCompany}>Добавить</button>
                    <button onClick={handleDeleteCompanies} disabled={selectedCompanies.length === 0}>
                        Удалить
                    </button>
                </caption>
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
                    {companies.map(({ id, name, address }) => (
                        <tr key={id}>
                            <td>
                                <input
                                    checked={!!selectedCompaniesMap[id]}
                                    onChange={(e) => handleSelectCompany(id, e.target.checked)}
                                    type="checkbox"
                                    name="companies"
                                />
                            </td>
                            <td>
                                <input
                                    value={name}
                                    onChange={(e) => handleEditCompany(id, "name", e.target.value)}
                                    placeholder={"Название"}
                                />
                            </td>
                            <td>
                                <input
                                    value={address}
                                    onChange={(e) => handleEditCompany(id, "address", e.target.value)}
                                    placeholder={"Адрес"}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};
