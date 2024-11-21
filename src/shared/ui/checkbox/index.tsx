import type { ChangeEventHandler, FC } from "react";

import style from "./index.module.scss";

type Props = {
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name?: string;
};

export const UICheckbox: FC<Props> = ({ checked, onChange, name }) => {
    return (
        <label className={style.label}>
            <input checked={checked} onChange={onChange} type="checkbox" className={style.input} name={name} />
        </label>
    );
};
