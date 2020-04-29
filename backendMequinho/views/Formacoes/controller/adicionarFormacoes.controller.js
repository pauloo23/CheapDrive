//FUNCAO ONLOAD --------------------------

//quando inicia a página faz
window.onload = function () {
//chama a função para atualizar as formations
refreshFormations(); //adicionar função de validação ao formulário
validator();
document.getElementById("signup-form").onsubmit = function (e) {
//validação do formulário ao submeter
validator();
};


//FUNCAO DE VALIDACAO -------------------------

//função de validação
function validator() {
let validator = new Validator(document.querySelector('form[name="signup-form"]'), function

(err, res) {
//se validador for válido, res=true e executa o saveFormations()

if (res) {
saveFormations();
}
}, 

)}


//FUNCAO DE GRAVACAO --------------------------------------

function saveFormations() {
var data = {};
data.nome = document.getElementById("nome").value;
data.tipo_formacao = document.getElementById("tipo_formacao").value;
data.dataa = document.getElementById("dataa").value;
data.local = document.getElementById("local").value;
console.log(data); //debugging para ver os dados que foram enviados
//chamada fetch para envio dos dados para o servior via POST
fetch('https://b401-back-webitcloud.c9users.io/formations', {
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
document.getElementById("formformacao").reset(); //limpeza dos dados
alert("submitted with success");
refreshFormations();
}
}).then(function (result) {console.log(result);
}).catch(function (err) {alert("Submission error"); console.error(err);
});
}


//FUNCAO DE LEITURA ---------------------------


function refreshFormations() {
async function fetchAsync() {
const renderFormations = document.getElementById("result");
let txt = "";
const response = await fetch('https://b401-back-webitcloud.c9users.io/formations');
const formations = await response.json();
}
//chama a função fetchAsync()
fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}
};




