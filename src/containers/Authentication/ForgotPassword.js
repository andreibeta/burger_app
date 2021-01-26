import React, {useState,useSelector} from "react";
import { auth } from '../../firebase';
import Button from "../../components/UI/Button/Button";

const ForgotPassword = ({history}) =>{
    const [email, setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        await auth.sendPasswordResetEmail(email)
        .then(()=>{
            setEmail('');
            setLoading(false);
            alert("An automatic email had been sent. Please check your email!")
            history.push('/auth');
        })
        .catch(()=>{
            setLoading(false);
            alert("The inserted email has not been found!");
        });
    };

    return (
    <div className="forgotPasswordContainer">
    <div className="forgotPasswordContent">
        {loading 
        ? <h4>Loading</h4>
        : <h3 className="recoverTitle">Recover your password</h3>
        }
        
        <form className="forgotPassword" onSubmit={handleSubmit}>
        <p className="forgotPassword__text">You can recover your password via your registered email</p>
            <input
            className="forgotPassword__input" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
            autoFocus
            />
            <br/>
            <Button buttonType ="Success-v2" disabled={!email}>Submit</Button>
        </form>
    </div>
    </div>
    )
}

export default ForgotPassword;