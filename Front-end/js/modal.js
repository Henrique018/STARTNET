const signButtonsCollection = document.getElementsByClassName('button-sign')
const closeButton = document.getElementsByClassName('closeDialog')[0]
const cepDialog = document.querySelector('#cepDialog')

//transfoma um HTMLCollection em um array
const signButtons = Array.prototype.slice.call(signButtonsCollection);

signButtons.forEach(button => {
    button.addEventListener('click', () => {
        cepDialog.showModal();
    })
});

closeButton.addEventListener('click', () => cepDialog.close())