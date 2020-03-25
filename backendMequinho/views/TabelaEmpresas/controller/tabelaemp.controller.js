//FUNCAO ONLOAD --------------------------

//quando inicia a página faz
window.onload = function() {
    //chama a função para atualizar os companies
   // refreshCompanies(); //adicionar função de validação ao formulário  
   // validator();
    document.getElementById("register-form").onsubmit = function(e) {
        //validação do formulário ao submeter
    //    validator();
        saveCompanies();
    };


    //FUNCAO DE VALIDACAO -------------------------

    //função de validação
    function validator() {
        let validator = new Validator(document.querySelector('form[name="register-form"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveCompanies()

                if (res) {
                    saveCompanies();
                }
            },


        );

    }


    //FUNCAO DE GRAVACAO --------------------------------------

    function saveCompanies() {
        var data = {};

        data.email = document.getElementById("company").value; //os nomes a verde nao fazem sentido mas é porque nao os alteramos no formulario
        data.nome = document.getElementById("first_name").value;
        data.localizacao = document.getElementById("local").value;
        data.contacto = document.getElementById("last_name").value;
        data.site = document.getElementById("payable").value;
        data.tipo_empresa = document.getElementById("tipo").value;


        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('https://b401-back-webitcloud.c9users.io/comptables', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function(response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100–599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                if (response.status === 409) {
                    alert("Duplicated Email");
                }
                else {
                    throw Error(response.statusText);
                }
            }
            else {
                document.getElementById("register-form").reset(); //limpeza dos dados do form
                alert("submitted with success");
                refreshCompanies();
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            alert("Submission error");
            console.error(err);
        });
    }


    //FUNCAO DE LEITURA ---------------------------


   
};
