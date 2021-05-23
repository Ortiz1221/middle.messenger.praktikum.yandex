export function cloneDeep(item: {[k: string]: unknown}) {
    if (item === null || typeof item !== "object") {
        return item;
    }

    if (item instanceof Array) {
        const copy: unknown[] = [];
        item.forEach((_, i) => (copy[i] = cloneDeep(item[i])));
        return copy;
    }

    if (item instanceof Object) {
        const copy: {[k: string]: unknown} = {};
        Object.keys(item)
            .forEach((k) => (copy[k] = cloneDeep(item[k] as { [k: string]: unknown })));
        return copy;
    }
    throw new Error(`Can't copy object: ${item}`);
}
