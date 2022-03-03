console.log('Client side javascript is loaded')

const loginForm = document.querySelector('form')
const user = document.querySelector('input')
const password = document.querySelector('#password')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


loginForm.addEventListener('submit', (e) => {
    e.preventDefault

    console.log(user.value) 
    console.log(password.value)

    messageOne.textContent = 'Loading...'

    
})
