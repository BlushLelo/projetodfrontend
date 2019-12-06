const baseUrl = "http://localhost:8081/"

function login() {
  let userName = document.getElementById('luserName').value;
  let password = document.getElementById('lpassword').value;
  axios.post(baseUrl + "Login", {
    userName: userName,
    senha: password
  }).then(function (response) {
    if (response.status === 200) {
      if (response.data.role === "USER") {
        window.location.href = "userPage.html"
      }
      if (response.data.role === "PROVIDER") {
        window.location.href = "providerPage.html"
      }
    }
  }).catch(function (error) {
    console.log(error)
  })
}


function createUser() {
  let cpf = document.getElementById('rcpf').value;
  let senha = document.getElementById('rpassword').value;
  let userName = document.getElementById('ruserName').value;
  let rg = document.getElementById('rrg').value;
  let contato = document.getElementById('rcontato').value;
  axios.post(baseUrl + "user", {
    cpf: cpf,
    senha: senha,
    userName: userName,
    rg: rg,
    contact: contato,
  }).then(function (response) {
    if(response.status === 200) {
      document.cookie="userName=" + userName
      document.cookie="userCpf=" + cpf.replace(/[^a-zA-Z0-9]/g, '')
    }
  }).catch(function (error) {
    console.log(error)
  })
}


function createProvider() {
  let cpf = document.getElementById('rcpfp').value;
  let senha = document.getElementById('rpasswordp').value;
  let userName = document.getElementById('ruserNamep').value;
  let rg = document.getElementById('rrgp').value;
  let contato = document.getElementById('rcontatop').value;
  axios.post(baseUrl + "provider", {
    cpf: cpf,
    senha: senha,
    userName: userName,
    rg: rg,
    contact: contato,
  }).then(function (response) {
    if(response.status === 200) {
      document.cookie="providerName=" + userName
      document.cookie="providerCpf=" + cpf.replace(/[^a-zA-Z0-9]/g, '')
    }
  }).catch(function (error) {
    console.log(error)
  })
}

function searchProviders() {
  let senha = document.getElementById('askedSection');
  senha.childNodes[1].appendChild()

  axios.get(baseUrl + "/user/service", {
    userName: "joao"
  }).then(function (response) {
    //TODO -- Iterate over response.data.services adding a li ? in a Section for askedServices


  }).catch(function (error) {
    console.log(error)

  })

}

function askForService() {
  let providerName = document.getElementById('rproviderr').value;
  let service = document.getElementById('rservice').value;
  axios.post(baseUrl + "services", {
    //TODO - Unfix userName getting it from Cookies or Session
    userName: "joao",
    providerName: providerName,
    serviceRequested: service,
  }).then(function (response) {
    prompt("Serviço criado com sucesso")
  }).catch(function (error) {
    console.log(error)
  })
}

function createService() {
  let serviceName = document.getElementById('sName').value;
  let serviceDescription = document.getElementById('sDescricao').value;
  let category = document.getElementById('sCategoria').value;
  let value = document.getElementById('sValue').value;
  let cpf = getCookie("providerCpf");
  axios.post(baseUrl + "service", {
    providerCpf: cpf,
    serviceName: serviceName,
    serviceDescription: serviceDescription,
    category: category,
    value: value
  }).then(function (response) {
    prompt("Serviço criado com sucesso")
  }).catch(function (error) {
    console.log("error")
  })

}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
