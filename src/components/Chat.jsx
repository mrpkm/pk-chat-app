import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Chat = () => {
  const { data } = useContext(ChatContext);
const toastCall= ()=>{
  toast.warning('Dummy Used')
}

  return (
    <div className="chat">
   
{/* Same as */}

      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" onClick={toastCall} />
          <img src={Add} alt="" onClick={toastCall} />
          <img src={More} alt="" onClick={toastCall} />
        </div>
      </div>
      <Messages />
      <Input/>
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

export default Chat;
