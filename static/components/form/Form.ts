import { Validator } from "../../modules/validator/Validator.js";

export class Form {
    node: HTMLFormElement; 
    inputs: NodeListOf<HTMLInputElement>;
    validator: Validator;
    values: {[k: string]: string};
    
    constructor(form: HTMLFormElement) {
        this.node = form;
        this.inputs = form.querySelectorAll("input");
        this.values = {};
        this.validator = new Validator(form);
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const isValid = this.validator.isValid();

        if(isValid) {
            this.values = this.validator.values;
        }

        return isValid;  
    }

    onFocusOrBlur(e: Event) {
        if(e.target) {
            const target = e.target as HTMLInputElement;
            
            if (target.classList.contains("input") && target.value) {
                this.validator.checkInput(target.name, target.value);
            }
        }
    }

    addErrMsg() {
        const errMsg = document.querySelector(".auth__sign-error");
        errMsg?.classList.remove("auth__sign-error--hidden");

    }

    removeErrMsg() {
        const errMsg = document.querySelector(".auth__sign-error");
        errMsg?.classList.add("auth__sign-error--hidden");
    }
}


