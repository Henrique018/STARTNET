const optionsColletion = document.getElementsByTagName('option');
const options = Array.prototype.slice.call(optionsColletion);

const planoEscolhido = JSON.parse(sessionStorage.getItem('planoEscolhido'));

if(planoEscolhido) {
    const [chosenOption] = options.filter(option => option.value == planoEscolhido);
    chosenOption.setAttribute('selected', 'selected');
}

const agendamento = document.querySelector('#date');

const minimumDay = ("0" + (new Date().getDate() + 2)).slice(1); 
const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
const year = new Date().getFullYear();

const minPossibleDate = `${year}-${month}-${minimumDay}`; 

agendamento.setAttribute('min', minPossibleDate);


