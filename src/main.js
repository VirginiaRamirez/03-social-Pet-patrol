// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//funcion publicar
const share = () => {
  let textPublicate = document.querySelector(".textPublication").value;
  db.collection("users").add({
    publication: textPublicate
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.querySelector(".textPublication").value = "";
    })
    .catch(function (error) {
      console.log("Error adding document: ", error);
    })
}
document.querySelector(".share").addEventListener("click", share);

//Leer datos publicacion
let table = document.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
  table.innerHTML = "";
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().publication}`);
    table.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().publication}</td>
            <td><button class="btn btn-warning onclick="postEdit('${doc.id}','${doc.data().publication}')>Edit</button></td>
            <td><button class="btn btn-danger" onclick="postDelete('${doc.id}')">Delete</button></td>
         </tr>
        `
  });
});

//Borrar publicación
const postDelete = (id) => {
  //Borrar publicación
  db.collection("users").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

//Sections ocultos desde el inicio
document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".aboutUs").style.display = "none";

//Función que despliega opciones para crear usuario
const createUser = () => {

  document.querySelector(".createAccountPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
};

document.querySelector(".createAccount").addEventListener("click", createUser);

//Función que despliega opciones para ingresar a una cuenta
const logIn = () => {
  document.querySelector(".logInPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".logIn").addEventListener("click", logIn);

//Función que guarda los valores de email y password y permite crear una nueva cuenta
const createAccount = () => {
  const email = document.querySelector(".createAccountEmail").value;
  const password = document.querySelector(".createAccountPassword").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    verifyAccount()
  })
    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
      // ...
    });
}
document.querySelector(".btnCreateAccount").addEventListener("click", createAccount);

//Función que guarda los valores de las cajas de texto de ingreso a cuenta existente
const enterAccount = () => {
  const emailLogIn = document.querySelector(".logInEmail").value;
  const passLogIn = document.querySelector(".logInPassword").value;
  firebase.auth().signInWithEmailAndPassword(emailLogIn, passLogIn).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorCode);
    alert(errorMessage);
    // ...
  });
}
document.querySelector(".btnLogIn").addEventListener("click", enterAccount);

//Con esta función se puede ver si un usuario está activo así como la info del mismo
const observer = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("existe usuario activo")
      correctUser();
      // User is signed in.
      var displayName = user.displayName;
      //console.log(displayName);
      var email = user.email;
      //console.log(email);          
      var emailVerified = user.emailVerified;
      //console.log(emailVerified);
      var photoURL = user.photoURL;
      //console.log(photoURL);
      var isAnonymous = user.isAnonymous;
      //console.log(isAnonymous);
      var uid = user.uid;
      //console.log(uid);
      var providerData = user.providerData;
      //console.log(providerData);
      // ...
    } else {
      console.log("no existe usuario activo")
      // User is signed out.
      // ...
    }
  });
}
observer();

//Con esta función se muestra al usuario que ingreso correctamente
const correctUser = () => {
  document.querySelector(".logInPage").style.display = "none";
  document.querySelector(".insideFirstPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
  document.querySelector(".createAccountPage").style.display = "none";
}

//Con esta función se cierra sesión
const closeSession = () => {
  firebase.auth().signOut().then(function () {
    document.querySelector(".insideFirstPage").style.display = "none";
    document.querySelector(".createAccountPage").style.display = "none";
    document.querySelector(".logInPage").style.display = "none";
    document.querySelector(".aboutUs").style.display = "none";
    document.querySelector(".welcomePage").style.display = "block"
    document.querySelector(".logInEmail").value = "";
    document.querySelector(".logInPassword").value = "";
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}
document.querySelector(".btnLogOut").addEventListener("click", closeSession);

//Con esta función se verifica la cuenta(envia correo para verificación)
const verifyAccount = () => {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    console.log("Correo en camino");
    // Email sent.
  }).catch(function (error) {
    console.log(error);
    // An error happened.
  });
}

//Función que muestra la información de la pagina
const whoWeAre = () => {
  document.querySelector(".aboutUs").style.display = "block";
  document.querySelector(".insideFirstPage").style.display = "none";
  document.querySelector(".createAccountPage").style.display = "none";
  document.querySelector(".logInPage").style.display = "none";
  document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".pageInformation").addEventListener("click", whoWeAre);
//firestore
firebase.initializeApp({
  apiKey: "AIzaSyDm3cglN1xasEXFZ0OJ71e-q4LknJRdQQo",
  authDomain: "pet-patrol-620c5.firebaseapp.com",
  projectId: "pet-patrol-620c5"
});

