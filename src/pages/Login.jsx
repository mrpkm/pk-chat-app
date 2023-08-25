
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import '../style/style.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successfully!')
      setTimeout(()=>{
        navigate("/")
      },1000)
    
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="main-container">
      
      <div className="container">
            <div className="sidebar-page">
            <div class="overlay-panel">
                <h1> Pk Chat</h1>
			<h2>Welcome Back!</h2> <br />
				<p> Hello guys this is ChatApp To keep connected with us please login with your personal info</p> <br />
                <p>If you dont have an account ?</p> <br />
                <Link to="/register">	<button className="butto btn">Sign Up</button></Link> <br />
        {err && <span>Something went wrong</span>}
			</div>
            </div>
            <div className="main">
                <form action="" onSubmit={handleSubmit} className="form">
                <h1>Sign in</h1>
               
                    <input type="email" placeholder="Email" required  className="input"/>
                    <input type="password" placeholder="Password" required className="input" />
                   
                    <button className="butto"> Signin</button>
                </form>
           
              
            </div>
      </div>
      <ToastContainer
position="top-center"
autoClose={500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
};


export default Login;

