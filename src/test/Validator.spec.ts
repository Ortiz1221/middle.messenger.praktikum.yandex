import { assert } from "chai";
import { JSDOM } from "jsdom";
import { Validator } from "../modules/validator/Validator";

describe("Validator", function() {
  it("Works correctly", function() {
    const dom = new JSDOM(`
      <!DOCTYPE html>
        <form>
          <input name="email" type="text">
          <span class="input__err-msg--hidden" data-err-email>Text</span>
          <input name="login" type="text">
          <span class="input__err-msg--hidden" data-err-login>Text</span>
          <input name="display_name" type="text">
          <span class="input__err-msg--hidden" data-err-display_name>Text</span>
          <input name="password" type="text">
          <span class="input__err-msg--hidden" data-err-password>Text</span>
          <input name="first_name" type="text">
          <span class="input__err-msg--hidden" data-err-first_name>Text</span>
          <input name="phone" type="text">
          <span class="input__err-msg--hidden" data-err-phone>Text</span>
          <input name="msg" type="text">
          <span class="input__err-msg--hidden" data-err-msg>Text</span>
        </form>
    `);
    const form = dom.window.document.querySelector("form");
    const validator = new Validator(form);

    assert.isTrue(validator.checkInput("email", "test@ya.ru"));
    assert.isTrue(validator.checkInput("email", "test@ ya.ru"));
    assert.isNotTrue(validator.checkInput("email", "testya.ru"));
    assert.isNotTrue(validator.checkInput("email", "    "));
    assert.isNotTrue(validator.checkInput("email", ""));

    assert.isTrue(validator.checkInput("login", "foo_bar"));
    assert.isTrue(validator.checkInput("login", "foobar123"));
    assert.isNotTrue(validator.checkInput("login", ""));
    assert.isNotTrue(validator.checkInput("login", "     "));
    assert.isNotTrue(validator.checkInput("login", "!!!!!!"));
    assert.isNotTrue(validator.checkInput("login", "foo bar"));
    assert.isNotTrue(validator.checkInput("login", "фубар"));

    assert.isTrue(validator.checkInput("display_name", "foo_bar"));
    assert.isTrue(validator.checkInput("display_name", "foobar123"));
    assert.isNotTrue(validator.checkInput("display_name", ""));
    assert.isNotTrue(validator.checkInput("display_name", "     "));
    assert.isNotTrue(validator.checkInput("display_name", "!!!!!!"));
    assert.isNotTrue(validator.checkInput("display_name", "foo bar"));
    assert.isNotTrue(validator.checkInput("display_name", "фубар"));

    assert.isTrue(validator.checkInput("password", "qwerty123"));
    assert.isTrue(validator.checkInput("password", "qwerty123!"));
    assert.isNotTrue(validator.checkInput("password", ""));
    assert.isNotTrue(validator.checkInput("password", "     "));
    assert.isNotTrue(validator.checkInput("password", "qwerty"));
    assert.isNotTrue(validator.checkInput("password", "qwerty 123"));

    assert.isTrue(validator.checkInput("first_name", "Tanya"));
    assert.isTrue(validator.checkInput("first_name", "Таня"));
    assert.isNotTrue(validator.checkInput("first_name", ""));
    assert.isNotTrue(validator.checkInput("first_name", "     "));
    assert.isNotTrue(validator.checkInput("first_name", "Т аня"));
    assert.isNotTrue(validator.checkInput("first_name", "Таня123"));
    assert.isNotTrue(validator.checkInput("first_name", "Таня!"));
    assert.isNotTrue(validator.checkInput("first_name", "T"));

    assert.isTrue(validator.checkInput("phone", "+790123456789"));
    assert.isTrue(validator.checkInput("phone", "790123456789"));
    assert.isNotTrue(validator.checkInput("phone", ""));
    assert.isNotTrue(validator.checkInput("phone", "     "));
    assert.isNotTrue(validator.checkInput("phone", "qwertyuioas"));
    assert.isTrue(validator.checkInput("phone", "790123 456789"));

    assert.isTrue(validator.checkInput("msg", "Hello"));
    assert.isTrue(validator.checkInput("msg", "Привет"));
    assert.isTrue(validator.checkInput("msg", "Hello again"));
    assert.isTrue(validator.checkInput("msg", "123!"));
    assert.isNotTrue(validator.checkInput("msg", ""));
    assert.isNotTrue(validator.checkInput("msg", "     "));
  })
})