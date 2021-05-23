export function normalizeDate(arg: string | Date) {
    const date = typeof arg === "string"
        ? new Date(arg)
        : arg;
    const normalizedTime = date
        .toLocaleTimeString()
        .replace(/(.*)\D\d+/, "$1");
    const normalizedDate = date
        .toLocaleDateString();

    return `${normalizedTime} ${normalizedDate}`;
}
