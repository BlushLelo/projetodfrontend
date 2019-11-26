const baseUrl = "http://localhost:8080/"

function login() {
  let userName = document.getElementById('luserName').value;
  let password = document.getElementById('lpassword').value;
  axios.post(baseUrl + "Login", {
    userName: userName,
    senha: password
  }).then(function (response) {
    if (response.status === 200) {
      prompt("Login efetuado com sucesso")
    }
  }).catch(function (error) {
    console.log(error)
  })
}


function  createUser() {
  let cpf =  document.getElementById('rcpf').value;
  let senha =  document.getElementById('rpassword').value;
  let userName =  document.getElementById('ruserName').value;
  let rg =  document.getElementById('rrg').value;
  let contato =  document.getElementById('rcontato').value;
  axios.post(baseUrl + "user", {
    cpf: cpf,
    senha: senha,
    userName: userName,
    rg: rg,
    contact: contato,
  }).then(function (response) {
    prompt("Cadastro realizado com sucesso")
  }).catch(function (error) {
    console.log(error)
  })
}
