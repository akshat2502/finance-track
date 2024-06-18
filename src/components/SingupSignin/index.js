import React, { useState } from 'react'
import './style.css';
import Input from '../input/input';
import Button from '../buttons/button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignupSigninComponent() {

  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmpassword, setConfirmPassword]= useState("");
  const [loading, setLoading]= useState(false);
  const [loginform, setLoginForm]= useState(false);
  const navigate=useNavigate();

  // signup for the first time
  async function SignupWithEmail(event) {
    event.preventDefault(); 
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmpassword);

    //authenticate the user
    if(name!=="" && email!=="" && password!=="" && confirmpassword!==""){
      if(password === confirmpassword){
        setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        toast.success("user created!")
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        CreateDoc(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);  
      });
    } else {
      toast.error("passwords do not match");
      setLoading(false);
    }
    } else {
      toast.error("all fields are mandatory!");
      setLoading(false);
    }
  }
// creation of Doc
  async function CreateDoc(user){ 
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData=await getDoc(userRef);

    if(!userData.exists()) {
    try {
      await setDoc(userRef, {
        name: user.displayName? user.displayName: name,
        email:user.email,
        photoURL: user.photoURL? user.photoURL: "",
        createdAt: new Date()
      });
      toast.success("Doc has created!")
    } catch (e) {
      toast.error(e.message);
    } 
    } else {
      toast.error("Doc already exists");
    }
  }

  // login user with the email already exists
  function loginWithEmail(event){
    console.log(email);
    console.log(password);
    event.preventDefault();
      if(email!=="" && password!=="") {
    try {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        const user = userCredential.user;
        console.log("user logged in", user);
        toast.success("User has logged in!") 
        navigate("/dashboard");
        setLoading(true);

      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      }); 
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
    } else {
      toast.error("All fields are mandatory!")
    }
  }

 async function signinwithGoogle(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log("user>>>>>", user);
        navigate("/dashboard");
        toast.success("User authenticated!");
      }).catch((error) => {
        console.log(error.message);
        setLoading(false);
       });  
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  function LoginForm() {
    setLoginForm(true);
  }

  return ( 
  <> { loginform? <div className='signup-wrapper'>
  <h2 className='title'>Log in to <span style={ {color: "var(---theme)"} }>Financely</span></h2>
  <form>

     <Input 
      type="email"
      label={"email ID"}
      state={email}
      setState={setEmail}
      placeholder={"XYZ@gmail.com"}
      />
     <Input 
      type="password"
      label={"password"}
      state={password}
      setState={setPassword}
      placeholder={"Example@**12"}
      />
    
    <Button 
    disabled={loading}
    text={loading? "loading..." : "Login with Email and Password"} 
    onClick={loginWithEmail} />

    <p style={{textAlign: "center"}}>Or</p>

    <Button 
    onClick={signinwithGoogle}
     text={"Log in with Google"} 
     blue={"true"}/>
     <p className='p-login' onClick={()=>{setLoginForm(!loginform)}}>Don't have an account? Click here</p>
  </form>
</div>
    :
    <div className='signup-wrapper'>
      <h2 className='title'>SignUp with <span style={ {color: "var(---theme)"} }>Financely</span></h2>
      <form>
        <Input 
          type="name"
          label={"full name"}
          state={name}
          setState={setName}
          placeholder={"XYZ"}
          />
         <Input 
          type="email"
          label={"email ID"}
          state={email}
          setState={setEmail}
          placeholder={"XYZ@gmail.com"}
          />
         <Input 
          type="password"
          label={"password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@**12"}
          />
         <Input 
          type="password"
          label={"confirm password"}
          state={confirmpassword}
          setState={setConfirmPassword}
          placeholder={"Example@**12"}
          />
        <Button 
        disabled={loading}
        text={loading? "loading..." : "Sign up with Email and Password"} 
        onClick={SignupWithEmail} />

        <p style={{textAlign: "center"}}>Or</p>

        <Button 
        onClick={signinwithGoogle}
         text={"Sign up with Google"} 
         blue={"true"}/>
         <p className='p-login' onClick={LoginForm}>Already have an account? Click here</p>
      </form>
    </div> }
  </>
  )
}

export default SignupSigninComponent;