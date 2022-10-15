import LoginForm from "../autentication/LoginForm"

import './LoginPage.css'


const handle = (event) => {
    console.log('hola')
    event.preventDefault();
    event.stopPropagation();
  }
  

export default function LoginPage () {
    return (
        <div className="login-page-wrapper">
            <LoginForm handleSubmit={handle}/>
        </div>
    )
}