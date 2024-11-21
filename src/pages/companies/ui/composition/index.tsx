import { type ChangeEventHandler, useCallback, useMemo, useState } from "react";

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

import { cn, useAppDispatch, useAppSelector, useObserver } from "@/shared/lib";
import { Icon, UICheckbox } from "@/shared/ui";

import { PER_PAGE } from "../../lib";
import { TableRow } from "../table-row";
import style from "./index.module.scss";

export const CompaniesPage = () => {
    const companies = useAppSelector(selectCompanies);
    const selectedCompanies = useAppSelector(selectSelectedCompanies);
    const isSelectedAllCompanies = useAppSelector(selectIsSelectedAllCompanies);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);

    const handleSelectAllCompanies: ChangeEventHandler<HTMLInputElement> = (e) => dispatch(setIsSelectedAllCompanies(e.target.checked));
    const handleSelectCompany = useCallback(
        (id: Company["id"], selected: boolean) => dispatch(setSelectedCompany({ id, selected })),
        [dispatch],
    );
    const handleAddCompany = () => dispatch(addCompany());
    const handleDeleteCompanies = () => dispatch(deleteSelectedCompanies());
    const handleEditCompany = useCallback(
        (id: number, field: CompanyEditedFields, value: string) => dispatch(editCompany({ id, field, value })),
        [dispatch],
    );
    const handleObserveIntersection: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.disconnect();
                setPage((page) => page + 1);
            }
        });
    };
    const { setObserverElementRef } = useObserver<HTMLTableRowElement>(handleObserveIntersection);

    const selectedCompaniesMap = useMemo(() => getSelectedCompaniesMap(selectedCompanies), [selectedCompanies]);
    const slicedCompanies = useMemo(() => companies.slice(0, page * PER_PAGE), [companies, page]);

    return (
        <main className={style.main}>
            <h1 className={style.pageTitle}>Список компаний</h1>
            <table className={style.table}>
                <caption>
                    <div className={style.tableCaption}>
                        <h2 className={style.tableTitle}>Компании</h2>
                        <div className={style.buttons}>
                            <button onClick={handleAddCompany} className={cn(style.button, style.addButton)}>
                                <Icon name="plus" className={style.buttonIcon} />
                            </button>
                            <button
                                onClick={handleDeleteCompanies}
                                disabled={selectedCompanies.length === 0}
                                className={cn(style.button, style.deleteButton)}
                            >
                                <Icon name="bin" className={style.buttonIcon} />
                            </button>
                        </div>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th>
                            <UICheckbox checked={isSelectedAllCompanies} onChange={handleSelectAllCompanies} />
                        </th>
                        <th>Название</th>
                        <th>Адрес</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedCompanies.map(({ id, name, address }, index) => (
                        <TableRow
                            key={id}
                            ref={companies.length > PER_PAGE * page && slicedCompanies.length - 5 === index ? setObserverElementRef : null}
                            id={id}
                            checked={!!selectedCompaniesMap[id]}
                            name={name}
                            address={address}
                            handleSelectCompany={handleSelectCompany}
                            handleEditCompany={handleEditCompany}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};
