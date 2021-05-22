export const chatTmpl = `
    <div class="main__messages {{#unless currChat}}main__messages--err{{/unless}}">
        {{#if currChat}}
            <div class="main__head">
                <div class="chat">
                    <img src={{#if avatar}}
                        {{avatar}}
                    {{else}}
                        "../../assets/img/userpic-placeholder.png"
                    {{/if}} alt="Chat picture" class="chat__pic">
                    <div class="chat__wrapper">
                        <p class="chat__name">{{title}}</p>
                        <span class="chat__status chat__status--online">active</span>
                    </div>
                </div>
                <button class="main__menu main__menu--not-active" 
                    data-chat-id={{currChat}} 
                    data-title={{title}}
                ></button>
            </div>
            <div class="main__chat-screen">
                <span class="main__chat-start">Today</span>
                {{#each mockMsgs}}
                    <div class="main__msg-block">
                        <img src={{senderPic}} alt="Sender profile picture" class="main__sender-pic">
                        <p class="main__msg {{#if sended}}main__msg--sended{{/if}}">{{text}}</p>
                        <span class="main__msg-time">{{time}}</span>
                    </div>
                {{/each}}
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
`