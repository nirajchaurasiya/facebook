import './register.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios';
export default function Register() {
    const navigate = useNavigate()
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordagain = useRef()
    const handleRegister = async () => {
        password.current.value === passwordagain.current.value ?
            await axios.post('auth/register', {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            })
                .then((data) => {
                    alert("Your account has been created successfully! You can login now.");
                    navigate('/login')

                })
                .catch((err) => {
                    console.log("Some error occured")
                })
            : alert("Password and Confirm Password must be same")
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Social-App</div>
                    <span className="loginDesc">Connect with friends and the world around you on SocialAPP</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="text" required ref={username} placeholder='Username' className="loginInput" />
                        <input type="email" required ref={email} placeholder='Email' className="loginInput" />
                        <input type="password" required ref={password} placeholder='Password' className="loginInput" />
                        <input type="password" required ref={passwordagain} placeholder='Password Again' className="loginInput" />
                        <button className='loginButton' onClick={handleRegister}>Register</button>
                        <span className="loginForgot">Already have an account?</span>
                        <button className="loginRegisterButton" onClick={() => { navigate("/login") }}>Login Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
