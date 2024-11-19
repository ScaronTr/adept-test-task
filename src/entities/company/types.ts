export type Company = {
    id: number;
    name: string;
    address: string;
};

export type InitialState = {
    data: Company[];
    selected: Company["id"][];
    isSelectedAll: boolean;
};
