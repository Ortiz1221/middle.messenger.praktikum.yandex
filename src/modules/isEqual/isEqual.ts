// Функция предназначена для сравнения значений. Не сравнивает значения у вложенных объектов
// или массивов

export function isEqual(a: any, b: any) {
    if (typeof a !== typeof b) {
        return false;
    }

    const aIsArr = Array.isArray(a);
    const bIsArr = Array.isArray(b);

    if ((aIsArr && !bIsArr) || (!aIsArr && bIsArr)) {
        return false;
    }

    if (typeof a !== "object") {
        return a === b;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    return aKeys.every((key, i) => a[key] === b[key] && key === bKeys[i]);
}
