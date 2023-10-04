import { useDispatch, useSelector } from "react-redux"
import LoginForm from "../../components/Login/LoginForm"
import { startSessionThunk } from "../../store/slices/authSlice";

import "./Login.css"
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
    const isLogged = useSelector((store) => store.auth.isLogged);
    const dispatch = useDispatch();
    // ME da información acerca de la ruta, en este caso queremos saber si le pasó la ruta de procedencia por su propiedad "state"
    const location = useLocation();

    const from = location.state?.from;

    const handleLogin = async (loginData) => {
        dispatch(startSessionThunk(loginData));
    }

  return (
    <div>
        <section>
            <p>Welcome! Enter your email and password to continue</p>

            <section>
                <h3>Test data</h3>
                <ul>
                    <li>
                        <em>Email</em>: aranda151097@gmail.com
                    </li>
                    <li>
                        <em>Password</em>: aaron12345
                    </li>
                </ul>
            </section>
            <LoginForm onLogin={handleLogin}/>
        </section>

        { isLogged && <Navigate to={from ?? "/"}/>}
    </div>
  )
}

export default Login