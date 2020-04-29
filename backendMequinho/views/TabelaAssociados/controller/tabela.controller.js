//FUNCAO ONLOAD --------------------------

//quando inicia a página faz
window.onload = function () {
//chama a função para atualizar os partners
refreshPartners(); //adicionar função de validação ao formulário  
validator();
document.getElementById("register-form").onsubmit = function (e) {
//validação do formulário ao submeter
validator();
};


//FUNCAO DE VALIDACAO -------------------------

//função de validação
function validator() {
let validator = new Validator(document.querySelector('form[name="register-form"]'), function

(err, res) {
//se validador for válido, res=true e executa o savePartners()

if (res) {
savePartners();
}
}, 


);

}


//FUNCAO DE GRAVACAO --------------------------------------

function savePartners() {
var data = {};

data.email = document.getElementById("company").value; //os nomes a verde nao fazem sentido mas é porque nao os alteramos no formulario
data.nome = document.getElementById("first_name").value;
data.localidade = document.getElementById("local").value;
data.contacto = document.getElementById("last_name").value;

console.log(data); //debugging para ver os dados que foram enviados
//chamada fetch para envio dos dados para o servior via POST
fetch(' https://b401-back-webitcloud.c9users.io/parttables', {
headers: {'Content-Type': 'application/json'},
method: 'POST',
body: JSON.stringify(data)
}).then(function (response) {
if (!response.ok) {
console.log(response.status); //=> number 100–599
console.log(response.statusText); //=> String
console.log(response.headers); //=> Headers
console.log(response.url); //=> String
if (response.status === 409) {
alert("Duplicated Email");
} else {
throw Error(response.statusText);
}
} else {
document.getElementById("register-form").reset(); //limpeza dos dados do form
alert("submitted with success");
refreshPartners();
}
}).then(function (result) {console.log(result);
}).catch(function (err) {alert("Submission error"); console.error(err);
});
}


//FUNCAO DE LEITURA ---------------------------


function refreshPartners() {
async function fetchAsync() {
const renderPartners = document.getElementById("result");
let txt = "";
const response = await fetch(' https://b401-back-webitcloud.c9users.io/parttables');
const partners = await response.json();


//criação de uma tabela para demonstração dos resultados recebidos
txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>";
txt += "<thead style='background-color:#607d8b; color:white '>";
txt += "<tr><th>Nome</th><th>Email</th><th>Localidade</th><th>Contacto</th><th>Site</th><th>Doacao</th></tr></thead><tbody>";
//percorrer a variável partners e por cada company cria a linha da tabela com os dados presentes
for (const partner of partners) {
txt += "<tr><td style='text-align:right'>" + partner.nome + "</td><td>" + partner.email + "</td><td>" + partner.localidade + "</td><td>" + partner.contacto + "</td></tr>";
}//falta a doacao (partner.doacao)
txt += "</tbody></table>";
//envia a tabela construida para a view e mostra no object com ID result 
renderPartners.innerHTML = txt;
}

//chama a função fetchAsync()
fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}
};




