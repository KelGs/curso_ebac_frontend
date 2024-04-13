const container = document.querySelector('.container')
const btnSubmit = document.querySelector("#btn-submit");
const inputFirst = document.querySelector("#number-first")
const inputSecond = document.querySelector("#number-second")
const paragraph = document.createElement('p');


const getValue = () => {
  const valueFirst = inputFirst.value;
  const valueSecond = inputSecond.value;
  return valueFirst && valueSecond ? {valueFirst, valueSecond} : neutralForm();
}

const validForm = () => {
  paragraph.classList.add('form-valid');
  paragraph.classList.remove('form-invalid', 'form-neutral', 'form-equal');
  paragraph.innerHTML = `Sucesso! O formulário foi válidado. <br> O Campo B é maior que o Campo A`;
  inputSecond.value = '';
  inputFirst.value = '';
}

const invalidForm = () => {
  paragraph.classList.add('form-invalid');
  paragraph.classList.remove('form-valid', 'form-neutral', 'form-equal');
  paragraph.innerHTML = `Erro! O formulário não foi válidado. <br> O Campo A é maior que o Campo B`;
}

const equalForm = () => {
  paragraph.classList.add('form-equal');
  paragraph.classList.remove('form-valid', 'form-neutral', 'form-invalid');
  paragraph.innerHTML = `Atenção, os valores são iguais!  <br> Adicione uma diferençã entre os campos.`;
}

const neutralForm = () => {
  paragraph.classList.add('form-neutral');
  paragraph.classList.remove('form-invalid', 'form-valid', 'form-equal');
  paragraph.innerHTML = `Por gentileza, preenchas os campos acima`;
  container.appendChild(paragraph);
}

const validNumber = () => {
  if(getValue()) {
    const values = getValue();
    const firstValue = +values.valueFirst;
    const secondValue = +values.valueSecond;

    if(secondValue > firstValue) {
      validForm();
    } else if(secondValue < firstValue) {
      invalidForm();
    } else if(secondValue === firstValue) {
      equalForm();
    } else {
      neutralForm();
    }
    container.appendChild(paragraph);
  }
}

const submitForm = (ev) => {
  ev.preventDefault();
  validNumber()
}

btnSubmit.addEventListener('click', (ev) => {
  submitForm(ev);
})