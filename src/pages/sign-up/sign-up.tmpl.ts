export const signUpTmpl = `
    <h1 class="auth__title">Let's talk</h1>
    <form name="sign-up" class="auth__form" action="submit">
        <h2 class="auth__form-title">Getting started</h2>
        <label class="label">
            <input class="input input__user input--with-icon" name="first_name" type="text" placeholder="First name">
            <span class="input__err-msg input__err-msg--hidden" data-err-first_name>Invalid name</span>
        </label>
        <label class="label">
            <input class="input input__user input--with-icon" name="second_name" type="text" placeholder="Last name">
            <span class="input__err-msg input__err-msg--hidden" data-err-second_name>Invalid name</span>
        </label>
        <label class="label">
            <input class="input input__login input--with-icon" name="login" type="text" placeholder="Login">
            <span class="input__err-msg input__err-msg--hidden" data-err-login>Invalid login</span>
        </label>
        <label class="label">
            <input class="input input__email input--with-icon" name="email" type="text" placeholder="Email">
            <span class="input__err-msg input__err-msg--hidden" data-err-email>Invalid email</span>
        </label>
        <label class="label">
            <input class="input input__password input--with-icon" name="password" type="password" placeholder="Password">
            <span class="input__err-msg input__err-msg--hidden" data-err-password>Password must be at least 8 symbols</span>
        </label>
        <label class="label">
            <input class="input input__phone input--with-icon" name="phone" type="text" placeholder="Phone number">
            <span class="input__err-msg input__err-msg--hidden" data-err-phone>Invalid phone number</span>
        </label>
        {{> btn text=text }}
        <p class="auth__text">Already a member?
            <a class="auth__link nav-item" data-path="/">Sign in</a>
        </p>
    </form>
    <img class="auth__img" src="img/girl_with_flower.svg" alt="A girl with a laptop is smelling a flower">
`;
