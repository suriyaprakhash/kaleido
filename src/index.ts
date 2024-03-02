
import { Calculator } from './logic/calculator'

var calc = new Calculator();

let resultElement: Element | null = null;

function init() {

    const addForm = document.querySelector(".add-form");
    const subForm = document.querySelector(".sub-form");
    resultElement = document.querySelector(".res");
    addForm?.addEventListener("submit", addSubmitHandler);
    subForm?.addEventListener("submit", subSubmitHandler);
}

function addSubmitHandler(e: Event) {
    e.preventDefault();
    const num1 = document.querySelector("input[name='add-firstnumber']") as HTMLInputElement;
    const num2 = document.querySelector("input[name='add-secondnumber']") as HTMLInputElement;
    const result = calc.add(Number(num1.value), Number(num2.value));
    // const result = Number(num2.value) - Number(num1.value)

    if (resultElement) {
        resultElement.textContent = result.toString();
    }
}

function subSubmitHandler(e: Event) {
    e.preventDefault();
    const num1 = document.querySelector("input[name='sub-firstnumber']") as HTMLInputElement;
    const num2 = document.querySelector("input[name='sub-secondnumber']") as HTMLInputElement;
    const result = calc.sub(Number(num1.value), Number(num2.value));
    // const result = Number(num2.value) - Number(num1.value)
    // const resultElement = document.querySelector(".s-res");
    if (resultElement) {
        resultElement.textContent = result.toString();
    }
}

init();