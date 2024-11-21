import { forwardRef, memo } from "react";

import { UICheckbox } from "@/shared/ui";

import type { TableRowProps } from "../../types.ts";
import style from "./index.module.scss";

export const TableRow = memo(
    forwardRef<HTMLTableRowElement | null, TableRowProps>(({ id, name, address, checked, handleSelectCompany, handleEditCompany }, ref) => {
        return (
            <tr ref={ref} className={style.row}>
                <td>
                    <UICheckbox checked={checked} onChange={(e) => handleSelectCompany(id, e.target.checked)} name="companies" />
                </td>
                <td>
                    <input
                        value={name}
                        onChange={(e) => handleEditCompany(id, "name", e.target.value)}
                        placeholder={"Название"}
                        className={style.input}
                    />
                </td>
                <td>
                    <input
                        value={address}
                        onChange={(e) => handleEditCompany(id, "address", e.target.value)}
                        placeholder={"Адрес"}
                        className={style.input}
                    />
                </td>
            </tr>
        );
    }),
);
