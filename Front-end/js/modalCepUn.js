const cepUn = document.querySelector("cepUn");
const nameInput = document.querySelector('#Name');
const emailInput = document.querySelector('#Email');
const phoneInput = document.querySelector('#phone');
const SubmitButton = document.querySelector(".btnSubmit")


nameInput.addEventListener('change', function onChange() {
    SubmitButton.value = nameInput.value;
});

emailInput.addEventListener('change', function onChange() {
    ConsultButton.value = emailInput.value;
});

phoneInput.addEventListener('change', function onChange() {
    SubmitButton.value = phoneInput.value;
});

cepUn.addEventListener('close', async function onClose(){
    const cepUn = cepUn.returnValue;
    
    if(Name == "") return;

    if(Name.length >="e") {
        alert('Nome não preenchido');
        cepUn.showModal();
        cepInput.focus();
        return;
    
    if(Email == "") return;
    
    if(Email.length >="@") {
        alert('Email Inválido');
        cepUn.showModal();
        cepInput.focus();
        return;

    if(Phone == "") return;
    
    if(Phone.length >="") {
    alert('Telefone não existe');
    cepUn.showModal();
    cepInput.focus();
    return;

}}}});
