import { useEffect, useState } from "react"

export default function FlashMessage({message}) {
    const [visibility,setVisibility] = useState(true);

    useEffect(() => {
        setVisibility(true);

        const timer = setTimeout(() => {
            setVisibility(false);
        }, 3000);
        
        return () => clearTimeout(timer);
    },[message]);

    return (
        <>
            <div 
                className={`alert alert-warning alert-dismissible fade show ${visibility?'alert-visible':'alert-hidden'}`}
                role="alert"
                >
                    <strong>{message}</strong> Check Again.
            </div>
        </>
    )
}