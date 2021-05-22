export function cloneDeep(item: {[k: string]: unknown}) {
    if (item === null || typeof item !== "object") {
        return item;
    }

    if (item instanceof Array) {
        let copy: unknown[] = [];
        item.forEach((_, i) => (copy[i] = cloneDeep(item[i])));
        return copy;
    }

    if (item instanceof Object) {
        let copy: {[k: string]: unknown} = {};
        Object.keys(item).forEach((k) => (copy[k] = cloneDeep(item[k] as any)));
        return copy;
    }
    throw new Error(`Невозможно скопировать объект: ${item}`);
}
