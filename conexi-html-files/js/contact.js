
        // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDJ3aem6_QfiasT1NLr4ZQhiHpBL6hmYIs",
            authDomain: "cheapdrive-e23d8.firebaseapp.com",
            databaseURL: "https://cheapdrive-e23d8.firebaseio.com/",
            projectId: "cheapdrive-e23d8",
            storageBucket: "cheapdrive-e23d8.appspot.com",
            messagingSenderId: "816831106715",
            appId: "1:816831106715:web:879056942248b0f2ec803e",
            measurementId: "G-P636VZKVLD"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);


        // Reference messages collection

        var messagesRef = firebase.database().ref('messages');

        // Listen for form submit
        document.getElementById('contactForm').addEventListener('submit', submitForm);

        // Submit form
        function submitForm(e) {
        e.preventDefault();

            // Get values
            var name = getInputVal('name');
            var subject = getInputVal('subject');
            var mail = getInputVal('mail');
            var phone = getInputVal('phone');
            var message = getInputVal('message');

            // Save message
            saveMessage(name, subject, mail, phone, message);

            // Show alert
            // document.querySelector('.alert').style.display = 'block';

            // Hide alert after 3 seconds
            //     setTimeout(function () {
        //       document.querySelector('.alert').style.display = 'none';
        // }, 3000);
        Swal.fire(
            'Obrigado pelo seu contacto!',
            'Recebemos a sua mensagem e iremos responder em breve!',
            'success'
        )
            // Clear form
            document.getElementById('contactForm').reset();
        }

        // Function to get get form values
        function getInputVal(id) {
            return document.getElementById(id).value;
        }

        // Save message to firebase
        function saveMessage(name, subject, mail, phone, message) {
            var newMessageRef = messagesRef.push();
            newMessageRef.set({

        name: name,
                subject: subject,
                mail: mail,
                phone: phone,
                message: message


            });
        }
  
