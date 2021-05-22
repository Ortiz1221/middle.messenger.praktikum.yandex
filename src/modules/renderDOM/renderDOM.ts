interface IBlock<T> {
    new(...args: unknown[]): T;
    addListeners(): void;
    getContent(): Element;
    hide(): void;
}

export function render<T>(query: string, block: IBlock<T>) {
    const root = document.querySelector(query);
    if (root) {
        root.prepend(block.getContent() as Node);
    }
    return root;
}
