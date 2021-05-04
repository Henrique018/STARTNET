const email = document.getElementById('email')
const password = document.getElementById('password')
const form =  document.getElementById('form')


form.addEventListener('submit',(e) => {
    let messages = {}
    if (email.value ===''|| email.value == null ){
        messages,push('Email Invalido')
    }
     
    if(password.value.lenght <= 8){
        messages.push('Senha Invalida')
    }
})