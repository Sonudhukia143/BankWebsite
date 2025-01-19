import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

export default function UserSubmmision () {
    const [username, setUsername] = useState("");
    const [SocialMediaHandel, setMedia] = useState("");
    const [images,setImages] = useState([]);
    const [message,setMessage] = useState("");
    const {isLoggedIn} = useAuth();


    const userSubmit = async (e) => {
        e.preventDefault();
        
        if(!isLoggedIn){
            return alert("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("username",username);
        formData.append("SocialMediaHandel" , SocialMediaHandel);

        Array.from(images).forEach((image) => {
            formData.append(`images`, image);
        });

        console.log(formData.get("SocialMediaHandel"));

          try {
            const response = await fetch("https://handle-hub.vercel.app/api/usersubmission", {
              method: "POST",
              body: formData,
              credentials:"include"
            });
      
            if (response.ok) {
              console.log("User submission successful");
              setMessage("done");
              window.location.href = '/submissions';
            } else {
              console.error("Error submitting form:");
              setMessage("not submiited" + await response.text());
            }
          } catch (err) {
            console.error("Network error:", err);
            setMessage("netowrk erro" + err);
          }
}

    return (
        <>
        { isLoggedIn?<div className="loginDiv">
            <h1>User Submmision Form</h1>
            {message}
            <form onSubmit={userSubmit} className="loginForm">
                <span className="loginInput">
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" className="designForForm" onChange={(e) => setUsername(e.target.value)}/>
                </span>

                <span className="loginInput">
                    <label htmlFor="SocialMediaHandel">Social Media Handle:</label>
                    <input id="SocialMediaHandel" type="text" className="designForForm" onChange={(e) => setMedia(e.target.value)}/>
                </span>

                <span className="loginInput">
                    <label htmlFor="images">Upload Images:</label>
                    <input id="images" type="file" className="designForFormInput" onChange={(e) => setImages(e.target.files)} multiple/>
                </span>

                <span className="loginSpan">
                    <button type="submit" id="loginButton">Submit</button>
                </span>
            </form>
        </div>:<h1>Oops You Are Not Authorized For The Action Try Loging In.</h1>
}
</>
    )
}