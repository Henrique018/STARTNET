import backendRequest from "./utils/backendRequest.js";

const signButtonsCollection = document.getElementsByClassName('button-sign');
const cepDialog = document.querySelector('#cepDialog');
const closeButton = document.getElementsByClassName('close')[0];
const cepInput = document.querySelector('#cep');
const numberInput = document.querySelector('#numeroCasa');
const ConsultButton = document.querySelector('.btnConsulta');

const unavailableModal = document.querySelector('#cepUn');
const unavailableText = document.querySelector('.modal-title');

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
    const CEP = cepDialog.returnValue;

    //Não foi preechido
    if(CEP == '') return;

    // se não preencheu corretamente
    if(CEP.length >= 1 && CEP.length < 8 || CEP.length > 8) {
        alert('Parece que há um erro com o CEP preenchido');
        cepDialog.showModal();
        cepInput.focus();
        return;
    }
    
    try {
        const bodyRequest = {
            cep: CEP
        }
        const response = await backendRequest('/cep', 'POST', bodyRequest);

        if(response?.noService) {
            unavailableText.textContent = `${response.noService}`;
            unavailableModal.showModal();

        } else {
            const {uf, localidade,bairro, logradouro} = response;

            sessionStorage.setItem('userAdress', JSON.stringify({
                uf,
                localidade,
                bairro,
                logradouro,
                numero,
                cep: cepDialog.returnValue,
            }));
            window.location.href = `${location.protocol}//${location.host}/data.html`;
        } 
    }
    catch(e) {
        console.log(e);
    }
});