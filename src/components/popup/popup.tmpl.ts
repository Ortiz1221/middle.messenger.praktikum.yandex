export const popupTmpl = `
    <div class="popup__content">
        <img src="img/close.svg" alt="Close popup" data-action={{action}} class="popup__close">
        <h3 class="popup__title">{{title}}</h3>
        <form name={{formName}} class="popup__form">
            {{#each inputs}}
                <label class="label">
                    <input type=
                        {{#if type}}
                            {{type}}
                        {{else}}
                            "text"
                        {{/if}} 
                        class="input" name={{name}} 
                        placeholder="{{placeholder}}"
                    >
                    <span class="input__err-msg input__err-msg--hidden" data-err-{{name}}>{{errorMsg}}</span>
                </label>
            {{/each}}
            {{> btn text=btnText}}
        </form>
    </div>
`;
