export const chatInfoTmpl = `
    <h3 class="main__chat-panel-title">Chat info</h3>
    <button class="btn btn__search-user-popup">Add user</button>
    <form action="submit" name="add-user" class="main__add-user {{#unless searchRes}}main__add-user--hidden{{/unless}}">
        {{#each searchRes}}
            <label for="search-res">
                <input class="main__user-search-res" type="checkbox" name={{login}} value={{id}}>
                {{login}}
            </label>
        {{/each}}
        <button class="btn main__add-btn" data-action="add-user" data-id={{currChat}}>Add to chat</button>
    </form>
    <h4 class="main__chat-panel-subtitle">Users in chat</h4>    
    <form action="submit" name="delete-user" class="main__chat-users-list">
        {{#each users}}
            <label for="curr-users">
                <input class="main__user-in-chat" type="checkbox" name={{login}} value={{id}}>
                {{login}}
            </label>
        {{/each}}
        <button class="btn main__delete-user-btn" data-action="delete-user">Delete users</button>
    </form>
`;
