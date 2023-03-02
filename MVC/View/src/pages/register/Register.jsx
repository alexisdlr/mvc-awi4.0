import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import axios from 'axios'
function Register() {
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  })

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleClick = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8800/api/auth/register', inputs)
      navigate('/login')
    } catch (error) {
      setErr(error.response.data)
     console.log(error); 
    }
  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>BIRD FACE</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio,
            architecto aut voluptate quaerat quidem obcaecati
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h2>Register</h2>
          <form>
            <input type="text" required name="username" placeholder="Username" onChange={handleChange} />
            <input type="email" required name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" required name="password" placeholder="Password" onChange={handleChange} />
            <input type="text" required name="name" placeholder="Name" onChange={handleChange} />
            <button onClick={handleClick}>Register</button>
            {err && <p style={{color: 'red'}}>{err}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
