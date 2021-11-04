const bill = document.querySelector('.money-input');
const btns = document.querySelectorAll('.tip-porcentage')
const numberOfPeople = document.querySelector('.people-input');
const tipAmount = document.querySelector('#amount')
const tipTotal = document.querySelector('#total')
const messageAlert = document.querySelector('#alert-message')
const resetBtn = document.querySelector('.reset-btn')
const customInput = document.querySelector('#custom')

//convert input values into decimal
function convertToDecimal(item) {
 return (parseInt(item) / 100)
}

//clear all inputs
function clearFields() {
 bill.value = ''
 numberOfPeople.value = ''
 tipAmount.textContent = "$0.00"
 tipTotal.textContent = "$0.00"
  customInput.value = ''
}

//empty number of people input message
function alert () {
 messageAlert.textContent = 'Can\'t be zero'
 numberOfPeople.style.border = 'red 2px solid'
}

//reset button functionality
function reset() {
   resetBtn.classList.add('active')
    resetBtn.disabled = false
    resetBtn.addEventListener('click', () => {   
   resetBtn.disabled = true
   resetBtn.classList.remove('active')
   clearFields()  
   })
}

//input validation
function inputValidation(value) {
 if (numberOfPeople.value === '') {
  alert()
   setTimeout(() => {
    messageAlert.textContent = ''
    numberOfPeople.style = 'hsl(172, 67%, 45%) 1px solid'
   }, 2000)
 } else {
   const tip = (bill.value * value) / numberOfPeople.value;
   tipAmount.textContent = `$${tip.toFixed(2)}`
   
   const total = (bill.value / numberOfPeople.value) + tip
   tipTotal.textContent = `$${total.toFixed(2)}`
 }
}

//custom input functionality
customInput.addEventListener('input', customStatus)

function customStatus(e) {
 let customTip = convertToDecimal(e.target.value)
 inputValidation(customTip)
 if (customTip) {
  reset()  
 }
 else if(!customTip) {
   tipAmount.textContent = '$0.00'
  tipTotal.textContent = '$0.00'
 }
}

//buttons for tips
btns.forEach((btn) => {
 btn.addEventListener('click', (e) => {
  const btnTarget = convertToDecimal(e.target.innerHTML.slice(0, 2));  
  inputValidation(btnTarget)


  // active class
  const activeElement = document.querySelector('.active')

  if (activeElement !== null) {
   activeElement.classList.remove('active')
  }e.target.classList.add('active')

  // reset functionality.
  if (e.target.classList.contains('active')) {
   reset()   
  }   
 })
})



 