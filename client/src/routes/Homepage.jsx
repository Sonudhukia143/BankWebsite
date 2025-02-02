import '../../styles/userpage.css';
import Features from '../helpercomponents/Features';

export default function Homepage() {
    return (
        <>
            <div className="maindiv">
            <div className="text">
                <p><b>Handle It Easily...</b></p>
                    <h1>Handle</h1>
                    <h2>Hub</h2>
                </div>
                <div className="scroll">
                    <div>
                        Scroll Down
                    </div>
                </div>
                <div className="background">
                </div>
            </div>
            <div className="abouttext">
            </div>
            
            <Features />        
        </>
    )
}