import { getZipcode } from "./utils/getZipcode.js";

const signButtonsCollection = document.getElementsByClassName('button-sign');
const cepDialog = document.querySelector('#cepDialog');
const closeButton = document.getElementsByClassName('closeDialog')[0];
const cepInput = document.querySelector('#cep');
const numberInput = document.querySelector('#numeroCasa');
const ConsultButton = document.querySelector('.btnConsulta');

//transfoma um HTMLCollection em um array
const signButtons = Array.prototype.slice.call(signButtonsCollection);

signButtons.forEach(button => {
    button.addEventListener('click', () => {
        cepDialog.showModal();

        sessionStorage.setItem('planoEscolhido', JSON.stringify(button.dataset.plano));
    })
});

closeButton.addEventListener('click', () => cepDialog.close());

cepInput.addEventListener('change', function onChange() {
    ConsultButton.value = cepInput.value;
});

let numero;
numberInput.addEventListener('change', function onChange() {
     numero = numberInput.value;
});

cepDialog.addEventListener('close', async function onClose() {
    if(cepDialog.returnValue == '') return;

    // se não preencheu corretamente
    if(cepDialog.returnValue.length >= 1 && cepDialog.returnValue.length < 8 ||cepDialog.returnValue.length > 8) {
        alert('Parece que há um erro com o CEP preenchido');
        cepDialog.showModal();
        cepInput.focus();
        return;
    }
    
    try {
        const response = await getZipcode(cepDialog.returnValue);

        if(response?.noService) {
            alert(response.noService)
        } else {
            const {uf, localidade,bairro, logradouro} = response;

            sessionStorage.setItem('userAdress', JSON.stringify({
                uf,
                localidade,
                bairro,
                logradouro,
                numero
            }));
            window.location.href = `${location.protocol}//${location.host}${location.pathname}data.html`;
        } 
    }
    catch(e) {
        console.log(e);
    }
});