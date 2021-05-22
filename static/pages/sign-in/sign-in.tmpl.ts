export const signInTmpl: string = `
    <h1 class="auth__title">Let's talk</h1>
    <form name="sign-in" class="auth__form" action="submit">
        <h2 class="auth__form-title">Sign in</h2>
        <label class="label">
            <input class="input input__user input--with-icon" name="login" type="text" placeholder="Username or email">
            <span class="input__err-msg input__err-msg--hidden" data-err-login>Invalid username or email</span>
        </label>
        <label class="label">
            <input class="input input__password input--with-icon" name="password" type="password" placeholder="Password">
            <span class="input__err-msg input__err-msg--hidden" data-err-password>Password must be at least 8 symbols</span>
        </label>
        <span class="auth__sign-error auth__sign-error--hidden">Something went wrong</span>
        {{> btn text=text}}
        <p class="auth__text">Don’t have an account?
            <a class="auth__link nav-item" data-path="/sign-up">Sign up</a>
        </p>
    </form>
    <img class="auth__img" src="./assets/img/girl_with_flower.svg" alt="A girl with a laptop is smelling a flower">
`