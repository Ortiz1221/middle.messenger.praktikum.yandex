export const changePswTmpl = `
    <form name="change-psw" class="settings__form" action="submit">
        <h1 class="settings__form-title">Change password</h1>
        <label class="label">
            <input class="input input--no-icon" name="oldPassword" type="password" placeholder="Current password">
            <span class="input__err-msg input__err-msg--hidden" data-err-oldPassword>Password must be at least 8 symbols</span>
        </label>
        <label class="label">
            <input class="input input--no-icon" name="newPassword" type="password" placeholder="New password">
            <span class="input__err-msg input__err-msg--hidden" data-err-newPassword>Password must be at least 8 symbols</span>
        </label>
        <label class="label">
            <input class="input input--no-icon" name="confirm-new-psw" type="password" placeholder="Confirm new password">
            <span class="input__err-msg input__err-msg--hidden" data-err-confirm-new-psw>Password must be at least 8 symbols and match new password</span>
        </label>
        <a class="settings__link nav-item" data-path="/settings">Return to settings</a>
        {{> btn text="Save Changes" }}
    </form>
`;
