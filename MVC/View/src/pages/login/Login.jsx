import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Login.scss";

function Login() {
  const [err, setErr] = useState(null)
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const { login } = useContext(AuthContext);

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate('/')
    } catch (error) {
      setErr(error.response.data)
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio,
            architecto aut voluptate quaerat quidem obcaecati
          </p>
          <span>Don't you have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form>
            <input type="text" required name="username" placeholder="Username" onChange={handleChange} />
            <input type="password" required name="password" placeholder="Password" onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
            {err && err}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
