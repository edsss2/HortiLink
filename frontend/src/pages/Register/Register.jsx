import {FaUser, FaLock, FaEnvelope} from "react-icons/fa";
import {useState} from "react";
import "./Register.css"
import { Link } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        alert("Enviando os dados:"+ username + " - " + email +" - " + password)
    };

  return (
    <div className="register-page">
            <div className="container">
        <form onSubmit={handleSubmit}>
            
            <h1>Crie sua conta !</h1>

            <div className="input-field">
                <input type="text" placeholder='Nome de usuário' required onChange={(e) => setUsername(e.target.value)} />
                <FaUser className="icon" />
            </div>

            <div className="input-field">
                <input type="email" placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                <FaEnvelope className="icon" />
            </div>
            
            <div className="input-field">
                <input type="password" placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className="icon" />
            </div>

            <div className="recall-forget">
                <label>
                    <input type="checkbox" required/>
                    Eu aceito os <a href="#">Termos e Condições de uso.</a>
                </label>
                
            </div>
            
            <button>Criar conta</button>

            <div className="signup-link">
                <p>
                    Já possui uma conta ? <Link to="/login">Faça o login ?</Link>
                    </p>
            </div>

        </form>
      </div>
    </div>
      
      
  );
}

export default Register