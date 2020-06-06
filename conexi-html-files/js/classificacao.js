
var firebaseConfig = {
    apiKey: "AIzaSyB9WHw-FNVOUFVPglCO8daD32E6LVKWxEs",
    authDomain: "cheapdrive-c9dc6.firebaseapp.com",
    databaseURL: "https://cheapdrive-c9dc6.firebaseio.com",
    projectId: "cheapdrive-c9dc6",
    storageBucket: "cheapdrive-c9dc6.appspot.com",
    messagingSenderId: "619802521881",
    appId: "1:619802521881:web:ea7dcb7445f6e4cdd91588",
    measurementId: "G-JX23V0SNJ0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var x = document.getElementById("classificar");
var stars = [false, false, false, false, false];
function addclassificacao() {
    let Name = document.getElementById('Name');
    firebase.database().ref('classificacao').push({
        name: Name.value,
        rating: stars
    });
    Name.value = '';

}
function color(key, star) {
    for (let index = 0; index <= star; index++) {
        document.getElementById('star' + key + (index)).style.color = "orange";
    }
}
function nocolor(key) {
    for (let index = 0; index < stars.length; index++) {
        document.getElementById('star' + key + (index)).style.color = "initial";
    }
}
function mark(name, key, star) {
    for (let index = 0; index <= star; index++) {
        stars[index] = true
    }
    firebase.database().ref('classificacao/' + key).set({
        name: name,
        rating: stars

    })
    stars = [false, false, false, false, false];
    Swal.fire(
        'Obrigado por nos ter escolhido!',
        'A sua opinião é muito importante para nós!',
        'success'
    )
   
        x.style.display = "none";
    
}

(() => {
    firebase.database().ref('classificacao').on('value', function (data) {
        var classificacao = data.val();
        document.getElementById('divRender').innerHTML = '';
        for (const key in classificacao) {
            if (classificacao[key].rating[0]) {
                document.getElementById('divRender').innerHTML += `
                <div class="row" id="${key}">
                            <h6>Nome do cliente: ${classificacao[key].name} <br>  
                                
                            <div Rating: <br> ‎</div> 
                              
                            <div id="starsR${key}"></div>
                </div>
                <hr>
                `;
                for (let index = 0; index < classificacao[key].rating.length; index++) {
                    if (classificacao[key].rating[index]) {
                        document.getElementById('starsR' + key).innerHTML += `

                        <i style="color:orange" class="material-icons iconstar">star</i>

                        `;
                    } else {
                        document.getElementById('starsR' + key).innerHTML += `
                        <i style="color:initial" class="material-icons iconstar">star</i>

                        `;
                    }
                }
            } else {
                document.getElementById('divRender').innerHTML += `
                             <div class="row" id="${key}">
                            
                            <h6><br>Classificação: </h6>
                            <i onmouseover="color('${key}','0')" onclick="mark('${classificacao[key].name}','${key}','0')" onmouseleave="nocolor('${key}')" id='${'star' + key + 0}' class="material-icons iconstar">star</i>
                            <i onmouseover="color('${key}','1')" onclick="mark('${classificacao[key].name}','${key}','1')" onmouseleave="nocolor('${key}')" id='${'star' + key + 1}' class="material-icons iconstar">star</i>
                            <i onmouseover="color('${key}','2')" onclick="mark('${classificacao[key].name}','${key}','2')" onmouseleave="nocolor('${key}')" id='${'star' + key + 2}' class="material-icons iconstar">star</i>
                            <i onmouseover="color('${key}','3')" onclick="mark('${classificacao[key].name}','${key}','3')" onmouseleave="nocolor('${key}')" id='${'star' + key + 3}' class="material-icons iconstar">star</i>
                            <i onmouseover="color('${key}','4')" onclick="mark('${classificacao[key].name}','${key}','4')" onmouseleave="nocolor('${key}')" id='${'star' + key + 4}' class="material-icons iconstar">star</i>
                </div>
                <hr>
                `;
            }
        }
    });



})();