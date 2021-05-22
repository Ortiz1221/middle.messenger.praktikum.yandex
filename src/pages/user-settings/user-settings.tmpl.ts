export const userSettingsTmpl = `
    <div class="settings__wrapper">
        <h1 class="settings__form-title">Edit profile</h1>
        <div class="settings__info">
            <img src=
            {{#if avatar}}
                {{avatar}}
            {{else}}
                "img/userpic-placeholder.png"
            {{/if}} 
            alt="Profile photo" class="settings__img" 
            >
            <button class="settings__edit-img-btn"></button>
            <div class="settings__user">
                <p class="settings__nickname">{{display_name}}</p>
                <p class=
                    {{#if display_name}}
                        "settings__name"
                    {{else}}
                    "settings__nickname"
                    {{/if}}
                >{{first_name}} {{second_name}}</p>
            </div>
        </div>
        <form name="settings" class="settings__form" action="submit">
            <div class="settings__full-name-inputs">
                <label class="label">
                    <input class="input input--no-icon" name="first_name" type="text" placeholder="First name" value={{first_name}}>
                    <span class="input__err-msg input__err-msg--hidden" data-err-first_name>Invalid first name</span>
                </label>
                <label class="label">
                    <input class="input input--no-icon" name="second_name" type="text" placeholder="Last name" value={{second_name}}>
                    <span class="input__err-msg input__err-msg--hidden" data-err-second_name>Invalid last name</span>
                </label>
            </div>
            <label class="label">
                <input class="input input--no-icon" name="display_name" type="text" placeholder="Nickname" value={{display_name}}>
                <span class="input__err-msg input__err-msg--hidden" data-err-display_name>Invalid nickname</span>
            </label>
            <label class="label">
                <input class="input input--no-icon" name="login" type="text" placeholder="Login" value={{login}}>
                <span class="input__err-msg input__err-msg--hidden" data-err-login>Invalid login</span>
            </label>
            <label class="label">
                <input class="input input--no-icon" name="email" type="text" placeholder="Email" value={{email}}>
                <span class="input__err-msg input__err-msg--hidden" data-err-email>Invalid email</span>
            </label>
            <label class="label">
                <input class="input input--no-icon" name="phone" type="text" placeholder="Phone number" value={{phone}}>
                <span class="input__err-msg input__err-msg--hidden" data-err-phone>Invalid phone number</span>
            </label>
            <a class="settings__link nav-item" data-path="/change-psw">Change password</a>
            {{> btn text=btnText}}
            <a class="settings__link nav-item" data-path="/messenger">Back to messenger</a>
        </form>
    </div>
`;
