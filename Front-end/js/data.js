import backendRequest from '../js/utils/backendRequest.js';

const nome = document.querySelector('#nome');
const cpf  = document.querySelector('#cpf');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const rg  = document.querySelector('#rg');
const telefone  = document.querySelector('#phone');
const dataNascimento = document.querySelector('#date');
const form = document.querySelector('.formdata');

const houseNumber = document.querySelector("#number");
const adress = document.querySelector("#adress");
const cepInput = document.querySelector("#cep");
const state = document.querySelector("#estado");
const city = document.querySelector("#cidade");
const district = document.querySelector("#district");

const userAdress = JSON.parse(sessionStorage.getItem('userAdress'));

if(userAdress) {
    const { 
        uf,
        localidade,
        logradouro,
        numero,
        bairro,
        cep
    } = userAdress;

        adress.value = logradouro;
        houseNumber.value = numero;
        district.value = bairro;
        city.value = localidade;
        state.value = uf;
        cepInput.value = cep;
}

//recuperar valores digitados nos campos
const userInfo = {};
const inputs = [nome, email,cpf,rg,telefone,dataNascimento, senha];

inputs.forEach(input => {
    input.addEventListener('change', () => {
        userInfo[input.name] = input.value; 
    });
});

async function submitForm(userInfo, userAdress) {
    const bodyRequest = {
        ...userInfo,
        // remove parenteses,hifens,espaços e pontos
        telefone: userInfo.telefone.replace(/(\(|\))|(\-|\s|\.)/g,''),
        rg: userInfo.rg.replace(/(\(|\))|(\-|\s|\.)/g,''),
        cpf: userInfo.cpf.replace(/(\(|\))|(\-|\s|\.)/g,''),
	    endereco: {
		    cep: userAdress.cep,
		    logradouro: userAdress.logradouro,
		    numero: userAdress.numero,
		    bairro: userAdress.bairro,
		    cidade: userAdress.localidade,
		    estado: userAdress.uf,
	    }
    };
    console.log(bodyRequest);
    try {
     const response = await backendRequest('/cliente', 'POST', bodyRequest);
    
    if (response.existingUser) {
        alert('Parece que este usuario já cadastrado, faça login para acessar o seu plano');
        return;
    }
      window.location.href = `${location.protocol}//${location.host}/formspagamento.html`;
    } catch(err) {
        console.log('Algo deu errado ao tentar cadastrar usuario', err);
        return;
    }
}
    
form.addEventListener('submit', event => {
    event.preventDefault();
    event.returnValue = false;
     submitForm(userInfo, userAdress);
});
