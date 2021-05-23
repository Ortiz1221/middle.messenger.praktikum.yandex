export function queryStringify(data: {[key: string]: string}): string {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? "&" : "";

        if (Array.isArray(value)) {
            return `${result}${queryStringify(value.reduce((resFromArr, arrData, i) => ({ ...resFromArr, [`${key}[${i}]`]: arrData }), {}))}${endLine}`;
        }

        if (typeof value === "object") {
            return `${result}${queryStringify(Object.keys(value).reduce((resFromObj, objKey) => ({ ...resFromObj, [`${key}[${objKey}]`]: value[objKey] }), {}))}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, "");
}
