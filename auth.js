
  const db = firebase.firestore();


  //----------------------------Loginwith Emal----------------------

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
       e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
  //  console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password).then(creditial => {
        console.log("Login successfully" + creditial.user)
        if (email =="mwubahimanaboaz800@gmail.com"){

            loginForm.reset()
           window.location.replace("admin-dashboard.html")
        }else{
            loginForm.reset()
            window.location.replace("boaz.html")
        }
    }).catch((err) => {
        alert(err.message)
    })
})


// -------------------------------Auth with facebook---------------------------
const fbAuthBtn = document.querySelector('#fbAuth');

fbAuthBtn.addEventListener('click', () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    fbProvider.addScope('user_birthday')
    firebase.auth().signInWithPopup(fbProvider).then((result)=>{
        const token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log( "user signed in" + token)
        console.log( "user signed in" + user)
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode,errorMessage,email, credential)
})
})
  //--------------------------------Auth with Google---------------------------------
  
  const googleAuth = document.querySelector('#googleAuth')
  googleAuth.addEventListener('click', () =>{
      const provider = new firebase.auth.GoogleAuthProvider();
      //console.log(provider)
      firebase.auth().signInWithPopup(provider).then(()=>{

          console.log("auth ...")
      }).catch(err => alert(err.message))

  })


  /// --- create user and it info -------


  const userForm = document.querySelector('#action');
  userForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      let usremail = document.querySelector('#user-email').value;
      let userpaswd = document.querySelector('#psw').value;
      let userName = document.querySelector('#names').value;
      let userRole = document.querySelector('#role').value;

firebase.auth().createUserWithEmailAndPassword(usremail, userpaswd).then( cred =>{
    
    let user = {
        userName,
        userRole
    }
     db.collection('userss').doc(cred.user.uid).set({user}).then( () => {

         console.log("register successfully" + cred.user)
     }).catch( err => alert(err.message))
}).catch( err => alert(err.message))

  })