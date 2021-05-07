const signButtonsCollection = document.getElementsByClassName('button-sign');
const closeButton = document.getElementsByClassName('closeDialog')[0];
const cepDialog = document.querySelector('#cepDialog');
const cepInput = document.querySelector('#cep');
const numberInput = document.querySelector('#numeroCasa');
const ConsultButton = document.querySelector('.btnConsulta');

//transfoma um HTMLCollection em um array
const signButtons = Array.prototype.slice.call(signButtonsCollection);

signButtons.forEach(button => {
    button.addEventListener('click', () => {
        cepDialog.showModal();

        localStorage.setItem('planoEscolhido', JSON.stringify(button.dataset.plano));
    })
});

closeButton.addEventListener('click', () => cepDialog.close());

cepInput.addEventListener('change', function onChange() {
    ConsultButton.value = cepInput.value;
});

numberInput.addEventListener('change', function onChange() {
    numero = numberInput.value;
});

cepDialog.addEventListener('close', async function onClose() {
    if(cepDialog.returnValue === '') return;

    // se não preencheu corretamente
    if(cepDialog.returnValue.length > 1 && cepDialog.returnValue.length < 8 ||cepDialog.returnValue.length > 8) {
        alert('Parece que há um erro com o CEP preenchido');
        cepDialog.showModal();
        return;
    }
    
    try {
        const response = await getZipcode(String(cepDialog.returnValue));

        if(response?.noService) {
            alert(response.noService);
            return;
        }

        console.log({ddd: response.ddd, bairro: response.bairro});
    }
    catch(e) {
        console.log(e);
    }
    
});

async function getZipcode(zipcode) {
    const options = {
        method: 'POST',
        body: JSON.stringify({"cep": zipcode}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch('http://localhost:3000/cep', options)
    .then(res => res.json())
    .then(res => res);
    return response;
}