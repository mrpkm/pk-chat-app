import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/style.css";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("Register Successfully!");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="sidebar-page">
          <div class="overlay-panel">
            <h1> Pk Chat</h1> <br />
            <h2>Hello, Friend!</h2> <br />
            <p>Enter your personal details and start journey with us</p> <br />
            <Link to="/Login">
              <button className="butto btn"> Sign in</button>
            </Link>{" "}
            <br />
          </div>
          {loading && <p>Uploading and compressing the image please wait...</p>}
          {err && <span>Something went wrong</span>}
        </div>
        <div className="main">
          <form action="" onSubmit={handleSubmit} className="form">
            <h1>Register</h1>

            <input
              type="text"
              placeholder="Username"
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="input"
            />
            <input
              type="file"
              required
              id="file"
              style={{ display: "none" }}
              className="input"
            />
            <label htmlFor="file" className="label">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button className="butto" disabled={loading}>
              {" "}
              Signup
            </button>
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

export default Register;
