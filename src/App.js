
import { GithubAuthProvider, getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-auth-config';
const app = initializeApp(firebaseConfig);

function App() {
  const [userInfo, setUserInfo] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleSignInGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUserInfo(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });

  }

  const handleSignInFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log("after sign in", user);
        setUserInfo(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }


  const handleSignInGithub = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log("after sign in", user);
        setUserInfo(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const handleSignInTwitter = () => {

  }
  return (
    <div className="App">
      <button onClick={handleSignInGoogle}>Sign in Google</button>
      <button onClick={handleSignInFacebook}>Sign in Facebook</button>
      <button onClick={handleSignInGithub}>Sign in Github</button>
      <button onClick={handleSignInTwitter}>Sign in Twitter</button>
      <br />
      <h1>User Name : {userInfo.displayName}</h1>
      <p>Email : {userInfo.email}</p>
      <img src={userInfo.photoURL} alt="" />
    </div>
  );
}

export default App;
