export class Validator {
    node: HTMLFormElement;
    inputs: NodeListOf<HTMLInputElement>;
    msgArea: null | HTMLTextAreaElement;
    values: {[k: string]: string};
    isValidForm: boolean;
    formName: string;
    
    constructor(form: HTMLFormElement) {
        this.node = form;
        this.inputs = form.querySelectorAll("input");
        this.msgArea = form.querySelector("textarea");
        this.values = {};
        this.isValidForm = false;
    }

    _getAllValues(inputs: NodeListOf<HTMLInputElement>) {
        const formName = this.node.name;

        inputs.forEach(input => {
            if(formName === "add-user" || formName === "delete-user") {
                if(input.checked) {
                    this.values[input.name] = input.value as string;
                }
            } else {
                this.values[input.name] = input.value;

            }
        });

        if (this.msgArea) {
            const name = this.msgArea.name;
            let value = this.msgArea.value;
            
            this.values[name] = value.trim();
            if (!this.values[name]) {
                value = "";
            }
        }
    }

    isValid() {
        const inputsValidity: {[k: string]: boolean} = {};
        let isValidInput: boolean | undefined;
        const formName = this.node.name;

        if(formName === "add-user" || formName === "delete-user") {
            this.values = {};
            this._getAllValues(this.inputs);
            this.isValidForm = Array.from(this.inputs).some(el => el.checked);
            this.serialize();
            return this.isValidForm;
        }

        if(formName === "change-avatar") {
            const input = this.node.querySelector("input");

            if(input && input.value) {
                this.values = new FormData(this.node) as {};
                return true;
            }
            
            return false
        }

        this._getAllValues(this.inputs);

        console.log(this.values);
        for (let inputName in this.values) {
            isValidInput = this.checkInput(inputName, this.values[inputName]) as boolean;
            inputsValidity[inputName] = isValidInput;
        }
        this.isValidForm = Object.values(inputsValidity).every(el =>  el === true);
        this.serialize();

        return this.isValidForm;
    }

    serialize() {
        if(this.isValidForm) {
            if(this.values["confirm-new-psw"]) {
                delete this.values["confirm-new-psw"];
            }
            console.log(this.values);
            this._clear();
        }
    }

    checkInput(inputName: string, value: string) {
        const EMAIL_REGEXP = /@/i;
        const PASSWORD_REGEXP = /^[\w!@#$%^&*]{8,}$/gi;
        const LOGIN_REGEXP = /^[a-zA-Z0-9_]{3,20}$/gi;
        const NAME_REGEXP = /^[a-zA-Zа-яёА-ЯЁ]{2,}([a-zA-Z]+)*$/gi;
        const PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        const NOT_EMPTY_REGEXP = /^$|^\S+.*/g;
        if (!value) {
            this._toggleErrorMsg(inputName, false);
            this._clear();
            return false;
        }

        if (inputName === "login") {
            return this._checkValidity(inputName, value, LOGIN_REGEXP) || this._checkValidity(inputName, value, EMAIL_REGEXP);
        }
        if (inputName === "display_name") {
            return this._checkValidity(inputName, value, LOGIN_REGEXP);
        }
        if (inputName === "email") {
            return this._checkValidity(inputName, value, EMAIL_REGEXP);
        }
        if (inputName === "password" || 
            inputName ==="oldPassword" || 
            inputName ==="newPassword" || 
            inputName ==="confirm-new-psw") {
            return this._checkValidity(inputName, value, PASSWORD_REGEXP);
        }
        if (inputName === "first_name" || inputName === "second_name") {
            return this._checkValidity(inputName, value, NAME_REGEXP);
        }
        if (inputName === "phone") {
            return this._checkValidity(inputName, value, PHONE_REGEXP);
        }
        if (inputName === "msg" || inputName === "title" || inputName === "search-user") {
            return this._checkValidity(inputName, value, NOT_EMPTY_REGEXP);
        }
    }

    _checkValidity(inputName: string, value: string, regexp: RegExp) {
        let isValid = regexp.test(value);
        if (inputName === "confirm-new-psw") {
            const newPsw: HTMLInputElement | null = this.node.querySelector("[name='newPassword']");
            if (newPsw) {
                if (value !== newPsw.value) {
                    isValid = false;
                }
            }
        }
        if (this.msgArea && inputName === "msg" && !isValid) {
            this.msgArea.value = "";
        }
        this._toggleErrorMsg(inputName, isValid);
        return isValid;
    }

    _toggleErrorMsg(inputName: string, isValid: boolean) {
        if (inputName !== "msg") {
            const errMsg = this.node.querySelector(`[data-err-${inputName}]`);
            if (errMsg) {
                isValid ?
                    errMsg.classList.add("input__err-msg--hidden") :
                    errMsg.classList.remove("input__err-msg--hidden");
            }
            else {
                throw Error("У одного из инпутов нет сообщения об ошибке");
            }
        }
    }
    _clear() {
        if (this.msgArea) {
            this.msgArea.value = "";
            return 
        }

        if(this.node.name === "add-user") {
            this.inputs.forEach(input => input.checked = false);
            return
        }

        if(this.node.name !== "settings") {
            this.inputs.forEach(input => input.value = "");
        }
    }
}