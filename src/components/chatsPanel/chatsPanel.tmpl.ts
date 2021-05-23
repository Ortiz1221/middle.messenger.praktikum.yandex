export const chatsPanelTmpl = `
    <div class="sidebar__head">
        <img src=
            {{#if user.avatar}}
                https://ya-praktikum.tech/api/v2/resources{{user.avatar}}
            {{else}}
                "img/userpic-placeholder.png"
            {{/if}} 
            alt="Profile photo" class="sidebar__profile-pic"
        >
        <div class="sidebar__user-info">
            {{#if user.display_name}}<p class="sidebar__user-nickname">{{user.display_name}}</p>{{/if}}
            <p class=
                {{#if user.display_name}}
                    "sidebar__user-name"
                {{else}}
                    "sidebar__user-nickname"
                {{/if}}
            >{{user.first_name}} {{user.second_name}}</p>
        </div>
        <ul class="sidebar__menu">
            <li class="sidebar__menu-item">
                <a class="sidebar__menu-link">
                    <img class="nav-item" data-path="/settings" src="img/settings.svg" alt="Click here to open user settings">
                </a>
            </li>
            <li class="sidebar__menu-item">
                <button class="sidebar__menu-btn sidebar__theme-btn"></button>
            </li>
            <li class="sidebar__menu-item">
                <a class="sidebar__menu-link">
                    <img class="nav-item" data-action="logout" data-path="/" src="img/log-out.svg" alt="Click here to log out">
                </a>
            </li>
        </ul>
    </div>
    <div class="sidebar__chats-nav">
        <div class="sidebar__container">
            <form name="search-form" class="sidebar__search-form" action="submit">
                <input type="text" class="input input__search input--with-icon" name="search" placeholder="Search">
            </form>
            <button class="sidebar__add-chat-btn"></button>
        </div>
        <ul class="sidebar__chats-list">
            {{#if chats}}
                {{#each chats}}
                    <li class="sidebar__chat-item {{#if curr}}sidebar__chat-item--active{{/if}}" data-chat-id={{id}} data-token={{token}}>
                        <div class="sidebar__chat-item-panel" data-chat-id={{id}}>
                            <img data-chat-id={{id}} src={{#if avatar}}
                                https://ya-praktikum.tech/api/v2/resources{{avatar}}
                            {{else}}
                                "img/userpic-placeholder.png"
                            {{/if}} alt="Chat picture" class="chat__pic">
                            <div class="chat__wrapper" data-chat-id={{id}}>
                                <p class="chat__name" data-chat-id={{id}}>{{title}}</p>
                                {{#if last_message}}
                                    <p class="sidebar__last-msg" data-chat-id={{id}}><b>{{last_message.user.first_name}}:</b> {{last_message.content}}</p>
                                {{/if}}
                            </div>
                            <span class="sidebar__chat-time" data-chat-id={{id}}>{{last_message.time}}</span>
                        </div>
                    </li>
                {{/each}}
            {{/if}}
        </ul>
    </div>
`;
