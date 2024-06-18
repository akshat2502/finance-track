import "./style.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/users.svg";
import { WalletOutlined } from "@ant-design/icons";
import React from 'react';

function Header() {

    const [user] = useAuthState(auth);
    const navigate= useNavigate();

    async function logoutfunc() {
     try {
        await signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
          toast.error("Sorry, Facing some issue",error)
        });
        
     } catch (error) {
        toast.error(error.message);
     }   
    }

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user, navigate])

    return <div className="navbar">
        <p className="logo"><WalletOutlined /> Financely</p>
        {user && 
        (<div style={ {display: "flex", alignItems: "center", gap:"0.75rem"} }>
             <img
             src={user.photoURL ? user.photoURL : userImg}
             alt="User"
             style={{ borderRadius: "50%", height: "1.6rem", width: "1.6rem" }}
             />
            <p className="logo link" onClick={logoutfunc}>Logout</p>
            </div>
        )}
    </div>
}

export default Header;