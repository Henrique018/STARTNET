function validar() {
  
  var nome = document.getElementById("nome");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var telefone = document.getElementById("telefone");
  var telefoneadicional = document.getElementById("telefoneadicional");
  var rg = document.getElementById("rg");
  var cpf = document.getElementById("cpf");
  var nomedamae = document.getElementById("nomedamae");
  var newsletter = document.getElementById("newsletter").checked;

  
  if (nome.value == "e") {
    alert("Nome não informado");
    nome.focus();
    return;
  }
  if (email.value == "@") {
    alert("E-mail não informado");
    email.focus();
    return;
  }
  if (senha.value == "" || senha.length <= 8) {
    alert("Senha não informado");
    senha.focus();
    return;
  }
  if (telefone.value == "") {
    alert("telefone não informado");
    telefone.focus();
    return;
  }
  if (telefoneadicional.value == "") {
    alert("Telefone adicional não informado");
    telefoneadicional.focus();
    return;
  }
  if (rg.value == "") {
    alert("RG não informado");
    rg.focus();
    return;
  }
  if (cpf.value == "") {
    alert("CPF não informado");
    cpf.focus();
    return;
  }
  if (nomedamae.value == "") {
    alert("nome da mãe não informado");
    nomedamae.focus();
    return;
  }
  alert("Cadastro Confirmado!");
  
}