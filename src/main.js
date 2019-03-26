//Sections ocultos
document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".aboutUs").style.display = "none";

//Función que despliega opciones para crear usuario
const createUser =()=> {
    
    document.querySelector(".createAccountPage").style.display = "block";
    document.querySelector(".welcomePage").style.display = "none";
    };

    document.querySelector (".createAccount").addEventListener("click",createUser);
    
//Función que despliega opciones para ingresar a una cuenta
const logIn =()=> {
     document.querySelector(".logInPage").style.display = "block";
     document.querySelector(".welcomePage").style.display = "none";
    }
      document.querySelector(".logIn").addEventListener("click", logIn);

//Función que guarda los valores de email y password y permite crear una nueva cuenta
const createAccount =()=> {
    const email = document.querySelector(".createAccountEmail").value;
    const password = document.querySelector(".createAccountPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });
}
    document.querySelector(".btnCreateAccount").addEventListener("click",createAccount);

    //Función que guarda los valores de las cajas de texto de ingreso a cuenta existente
const enterAccount =()=> {
    const emailLogIn = document.querySelector(".logInEmail").value;
    const passLogIn = document.querySelector(".logInPassword").value;
    firebase.auth().signInWithEmailAndPassword(emailLogIn, passLogIn).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });
}
    document.querySelector(".btnLogIn").addEventListener("click",enterAccount);

 const observer =()=> {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("existe usuario activo")
            correctUser();
          // User is signed in.
          var displayName = user.displayName;
          console.log(displayName);
          var email = user.email;
          console.log(email);          
          var emailVerified = user.emailVerified;
          console.log(emailVerified);
          var photoURL = user.photoURL;
          console.log(photoURL);
          var isAnonymous = user.isAnonymous;
          console.log(isAnonymous);
          var uid = user.uid;
          console.log(uid);
          var providerData = user.providerData;
          console.log(providerData);
          // ...
        } else {
            console.log("no existe usuario activo")
          // User is signed out.
          // ...
        }
      });
    }
    observer();

    const correctUser =()=> {
        document.querySelector(".logInPage").style.display = "none";
        document.querySelector(".insideFirstPage").style.display = "block";
    }