const baseUrl = "https://projetointegrado.herokuapp.com"

function login() {
  let cpf = document.getElementById('luserCpf').value;
  let password = document.getElementById('lpassword').value;
  axios.post(baseUrl + "/Login", {
    cpf: cpf,
    senha: password
  }).then(function (response) {
    if (response.status === 200) {
      if (response.data.role === "USER") {
        document.cookie = "userCpf=" + cpf.replace(/[^a-zA-Z0-9]/g, '')
        window.location.href = "userPage.html"
      }
      if (response.data.role === "PROVIDER") {
        document.cookie = "providerCpf=" + cpf.replace(/[^a-zA-Z0-9]/g, '')
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
  axios.post(baseUrl + "/user", {
    cpf: cpf,
    senha: senha,
    userName: userName,
    rg: rg,
    contact: contato,
  }).then(function (response) {
    if (response.status === 200) {
      window.location.href = "login.html"
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
  axios.post(baseUrl + "/provider", {
    cpf: cpf,
    senha: senha,
    userName: userName,
    rg: rg,
    contact: contato,
  }).then(function (response) {
    if (response.status === 200) {
      window.location.href = "login.html"
    }
  }).catch(function (error) {
    console.log(error)
  })
}

function loadServices() {
  let providerCpf = getCookie("providerCpf");
  axios.get(baseUrl + "/service", {}).then(function (response) {
    let section = document.getElementById('requestServiceSection');
    if (response.status === 200) {
      if (response.data.length > 0) {
        for (var i = 0; i < response.data.length; i++) {
          section.innerHTML = section.innerHTML + "<div class='serviceRequested' onClick='askForService(" + providerCpf + ", \"" + response.data[i].serviceName + "\")'> <p>ProviderName: " + response.data[i].providerName + "</p> <p>ServiceName: " + response.data[i].serviceName +
            "</p> <p>Descrição do Serviço: " + response.data[i].serviceDescription + "</p> <p>Categoria: " + response.data[i].category +
            "</p> <p>Valor: " + response.data[i].value + "</p> </div><br>"
        }
      } else {
        section.innerHTML = "<div><p>Ninguém cadastrou serviço</p></div>"
      }
    }

  }).catch(function (error) {
    section.innerHTML = "<div><p>Erro ao listar serviços</p></div>"

  })

}

function askForService(providerCpf, serviceName) {
  let cpf = getCookie("userCpf");

  axios.post(baseUrl + "/service/" + cpf, {
    providerCpf: providerCpf,
    serviceName: serviceName,
  }).then(function (response) {
    alert("Serviço requisitado com sucesso")
    window.location.href = "userPage.html"
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
  axios.post(baseUrl + "/service", {
    providerCpf: cpf,
    serviceName: serviceName,
    serviceDescription: serviceDescription,
    category: category,
    value: value
  }).then(function (response) {
    if (response.status === 200) {
      alert("Serviço cadastrado com sucesso")
      window.location.href = "../providerPage.html"
    }
  }).catch(function (error) {
    console.log("error")
  })

}

function loadProviderServicesDone() {
  let cpf = getCookie("providerCpf");
  axios.get(baseUrl + "/service/provider/" + cpf).then(function (response) {
    if (response.status === 200) {
      let section = document.getElementById("providerServicesSection")
      for (var i = 0; i < response.data.length; i++) {
        section.innerHTML = section.innerHTML + "<div class='serviceRequestedList'> CPF do requisitante: " + response.data[i].userCpf + "<br> Serviço prestado: " + response.data[i].serviceName +
          "<br> Valor: " + response.data[i].value + "</div><br> "
      }
    }
  }).catch(function (error) {
    let section = document.getElementById("providerServicesSection")
    section.innerHTML = "<div><p>Você não prestou nenhum serviço</p></div>"
  })

}

function loadUserServicesAsked() {
  let cpf = getCookie("userCpf");
  axios.get(baseUrl + "/service/user/" + cpf).then(function (response) {
    if (response.status === 200) {
      let section = document.getElementById("userServicesSection")
      for (var i = 0; i < response.data.length; i++) {
        section.innerHTML = section.innerHTML + "<div class='serviceRequestedList'> CPF do prestador: " + response.data[i].providerCpf + "<br> Serviço prestado: " + response.data[i].serviceName +
          "<br> Valor: " + response.data[i].value + "</div><br> "
      }
    }
  }).catch(function (error) {
    let section = document.getElementById("userServicesSection")
    section.innerHTML = "<div><p>Você não prestou nenhum serviço</p></div>"
  })

}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
