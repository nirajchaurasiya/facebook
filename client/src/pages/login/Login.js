import { useContext, useRef } from 'react';
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();

        const userCredentials = { email: email.current.value, password: password.current.value }
        loginCall(userCredentials, dispatch)
    }
    const navigate = useNavigate()
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">SocialAPP</div>
                    <span className="loginDesc">Connect with friends and the world around you on SocialAPP</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox" >
                        <input type="email" placeholder='Email' className="loginInput" ref={email} required />
                        <input type="password" placeholder='Password' className="loginInput" ref={password} required />
                        <button className='loginButton' onClick={handleClick}>{isFetching ? <div className='spinner'></div> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={() => { navigate('/register') }}>
                            {isFetching ? <div className='spinner'></div> : "Create a account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
