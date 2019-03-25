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
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });
}
    document.querySelector(".btnCreateAccount").addEventListener("click",createAccount);