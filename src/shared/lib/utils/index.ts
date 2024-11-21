export const cn = (...args: Array<string | null | undefined | Record<string, boolean | undefined | null>>) => {
    let result = "";

    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        if (!item) continue;
        else if (typeof item === "string") {
            result = `${result} ${args[i]}`;
        } else {
            for (const key in item) {
                if (key === "undefined" || key === "null" || !item[key]) continue;
                result = `${result} ${key}`;
            }
        }
    }
    return result.trim();
};
