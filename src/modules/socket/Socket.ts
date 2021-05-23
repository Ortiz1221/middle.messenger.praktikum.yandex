export class Socket {
    socket: WebSocket

    constructor(userId: string, chatId: string, token: string) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

        this.socket.addEventListener("open", () => {
            // eslint-disable-next-line
            console.log(`${chatId}: Соединение установлено`);
        });

        this.socket.addEventListener("close", (e: CloseEvent) => {
            e.wasClean
                // eslint-disable-next-line
                ? console.log(`${chatId}: Соединение закрыто чисто`)
                // eslint-disable-next-line
                : console.log(`${chatId}: Обрыв соединения`);
            // eslint-disable-next-line
            console.log(`Код: ${e.code}`);
        });

        this.socket.addEventListener("error", (e:ErrorEvent) => {
            // eslint-disable-next-line
            console.log(`${chatId}: Ошибка`, e.message);
        });

        this.socket.addEventListener("message", (e: MessageEvent) => {
            // eslint-disable-next-line
            console.log("Получены данные", e.data);
        });
    }

    send(content: string) {
        this.socket.send(JSON.stringify({
            content,
            type: "message",
        }));
    }
}
