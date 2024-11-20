import { forwardRef, memo } from "react";

import type { TableRowProps } from "../../types.ts";

export const TableRow = memo(
    forwardRef<HTMLTableRowElement | null, TableRowProps>(({ id, name, address, checked, handleSelectCompany, handleEditCompany }, ref) => {
        return (
            <tr ref={ref}>
                <td>
                    <input checked={checked} onChange={(e) => handleSelectCompany(id, e.target.checked)} type="checkbox" name="companies" />
                </td>
                <td>
                    <input value={name} onChange={(e) => handleEditCompany(id, "name", e.target.value)} placeholder={"Название"} />
                </td>
                <td>
                    <input value={address} onChange={(e) => handleEditCompany(id, "address", e.target.value)} placeholder={"Адрес"} />
                </td>
            </tr>
        );
    }),
);
