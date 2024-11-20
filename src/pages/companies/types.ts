import type { Company, CompanyEditedFields } from "@/entities/company";

export type TableRowProps = Company & {
    checked: boolean;
    handleSelectCompany: (id: Company["id"], selected: boolean) => void;
    handleEditCompany: (id: Company["id"], field: CompanyEditedFields, value: string) => void;
};
