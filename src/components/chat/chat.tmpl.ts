export const chatTmpl = `
    <div class="main__messages {{#unless chatId}}main__messages--err{{/unless}}">
        {{#if chatId}}
            <div class="main__head">
                <div class="chat">
                    <img src={{#if avatar}}
                        {{avatar}}
                    {{else}}
                        "img/userpic-placeholder.png"
                    {{/if}} alt="Chat picture" class="chat__pic">
                    <div class="chat__wrapper">
                        <p class="chat__name">{{title}}</p>
                    </div>
                </div>
                <button class="main__menu main__menu--not-active" 
                    data-chat-id={{currChat}} 
                    data-title={{title}}
                ></button>
            </div>
            <div class="main__chat-screen">
                {{#if msg}}
                        <div class="main__msg-block">
                            <span class="main__sender">{{userName}}</span>
                            <p class="main__msg {{#if sended}}main__msg--sended{{/if}}">{{msg.last_message.content}}</p>
                            <span class="main__msg-time">{{msg.last_message.time}}</span>
                        </div>
                {{/if}}
            </div>
            <div class="main__send-msg">
                <form name="send-msg" class="main__msg-form">
                    <button type="button" class="main__send-file"></button>
                    <textarea name="msg" class="main__msg-input" rows="2" placeholder="Write a message..."></textarea>
                    <button type="button" class="main__add-smile"></button>
                    <button type="submit" class="main__send-msg-btn"></button>
                </form>
            </div>
        {{else}}
            <h2 class="main__no-selected-chats">Select a chat first</h2>
        {{/if}}
    </div>
`;
