import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import "./login.css";
import styles from"./login.module.css";
// import "./case.js";

const provider = new GoogleAuthProvider();

function Login() {
  var [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const nav = useNavigate();
  const [isCorrect, setIsCorrect] = useState(true);
  // const history = unstable_HistoryRouter();
  function googleLogin() {
    var temp = "abc";
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user.displayName);
        temp = user.displayName;
        // useEffect(()={setName(temp);},[])
        // setName(temp);
        name = temp;
        // console.log(temp);
        // console.log(name);
        // console.log("crthyegtrhjuy");
        redirect();
        //   setTimeout(() => {
        //   },1000);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    // return name;
  }
  async function login(){
    // const response = await );
    console.log("login called")
    fetch('http://localhost:3030/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      }).then((res)=>{
        console.log(res);
        if(!res.ok){
          console.log("login failed");
          // isCorrect = false;
          setIsCorrect(false);
          return null;
        }else{
          return res.json();
        }
      }).then((res)=>{
        console.log(res);
        if(res == null){
          console.log("login failed");
        }else{
          sessionStorage.setItem('username', res.username);
          sessionStorage.setItem('email', res.email);
          redirect();
        }
      })
  }
  function redirect() {
    console.log(`Redirecting` + name);
    // nav("/chat/" + name);
    // nav("/chat");
    nav("/dashboard");
    // nav("/enter/"+name);
  }
  return (
    <>
      <div className={styles.mybody}>
      <div className={styles.myCon}>
         <div class={styles.formContainer}>
      <p class={styles.mytitle}>Welcome back</p>
      <div class={styles.form}>
        <input type="email" class={styles.input} placeholder="Email" onChange={(e) => {
              // setName(e.target.value);
              setEmail(e.target.value);
            }}/>
        <input type="password" class={styles.input} style={{marginBottom:"0px"}} placeholder="Password" onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
        {!isCorrect && <span style={{color:"red",marginLeft:"5px"}}>Incorrect email or password</span>}
        <p class={styles.pageLink}>
          <span class={styles.pageLinkLabel}>Forgot Password?</span>
        </p>
        {/* <div className="row">
          <div className="col">
          <button class="form-btn" onClick={() => {
                redirect();
              }}>Log in</button>
          </div>
          <div className="col">
            <button class="form-btn" onClick={() => {}}>
              Sign up
            </button>
          </div>
        </div> */}
        <button class={styles.formBtn} onClick={() => {
                // redirect();
                login();
        }}>Log in</button>
        <button class={styles.formBtn} onClick={() => {
              // redirect();
              nav("/signup");
        }}>Sign up</button>
      </div>
      <p className={styles.signUpLabel}>
        Don't have an account?<span class="sign-up-link">Sign up</span>
      </p>
      <div class={styles.buttonsContainer}>
        <div class={styles.appleLoginButton}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" class={styles.appleIcon} viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
          </svg>
          <span>Log in with Apple</span>
        </div>
        <div class={styles.googleLoginButton} onClick={() => {
                googleLogin();
              }}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" class={styles.googleIcon} viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Log in with Google</span>
        </div>
      </div>
    </div>

      </div>
      </div>
    </>
  );
  //   return (
  //     <div class="form-container">
  //       <p class="title">Login</p>
  //       <form class="form">
  //         <div class="input-group">
  //           <label for="username">Username</label>
  //           <input
  //             type="text"
  //             name="username"
  //             id="username"
  //             placeholder=""
  //             value={name}
  //             onChange={(e)=>{name=e.target.value}}
  //           ></input>
  //         </div>
  //         <div class="input-group">
  //           <label for="password">Password</label>
  //           <input
  //             type="password"
  //             name="password"
  //             id="password"
  //             placeholder=""
  //           ></input>
  //           <div class="forgot">
  //             <a rel="noopener noreferrer" href="#">
  //               Forgot Password ?
  //             </a>
  //           </div>
  //         </div>
  //         <button class="sign" onClick={()=>{
  //             nav("/chat/" + name);
  //         }}>Sign in</button>
  //       </form>
  //       <div class="social-message">
  //         <div class="line"></div>
  //         <p class="message">Login with social accounts</p>
  //         <div class="line"></div>
  //       </div>
  //       <div class="social-icons">
  //         <button aria-label="Log in with Google" class="icon" onClick={()=>{
  //             name = googleLogin()
  //             // nav("/chat/" + name)
  //         }}>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 32 32"
  //             class="w-5 h-5 fill-current"
  //           >
  //             <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
  //           </svg>
  //         </button>
  //         <button aria-label="Log in with Twitter" class="icon">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 32 32"
  //             class="w-5 h-5 fill-current"
  //           >
  //             <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
  //           </svg>
  //         </button>
  //         <button aria-label="Log in with GitHub" class="icon">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 32 32"
  //             class="w-5 h-5 fill-current"
  //           >
  //             <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
  //           </svg>
  //         </button>
  //       </div>
  //       <p class="signup">
  //         Don't have an account?
  //         <a rel="noopener noreferrer" href="#" class="">
  //           Sign up
  //         </a>
  //       </p>
  //     </div>
  //   );
        
  
  /* <div className="row">
          <div className="col">Enter your name :</div>
        </div>
        <div className="row">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="row">
          <div className="col">
            <button
              class="editBtn"
              onClick={() => {
                redirect();
              }}
            >
              click
            </button>
            <button
              onClick={() => {
                googleLogin();
              }}
            >
              Sign in
            </button>
          </div>
        </div> */
}


export default Login;
