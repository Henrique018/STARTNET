(function autocomplete () {
    const houseNumber = document.querySelector("#number");
    const adress = document.querySelector("#adress");
    const cepInput = document.querySelector("#cep");
    const state = document.querySelector("#estado");
    const city = document.querySelector("#cidade");

    if(sessionStorage.getItem('userAdress')) {
        const { 
            uf,
            localidade,
            logradouro,
            numero,
            cep
        } = JSON.parse(sessionStorage.getItem('userAdress'));
    
    
        adress.value = logradouro;
        houseNumber.value = numero;
        city.value = localidade;
        state.value = uf;
        cepInput.value = cep;
    }
})();