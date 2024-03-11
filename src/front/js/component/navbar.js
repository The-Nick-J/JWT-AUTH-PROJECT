import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import '../../styles/navbar.css';

export const Navbar = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()	

    const handleProfile = async () => {
        navigate("/profile/"+await actions.getUserLoggedIn())
    }

    const handleSignout = async () => {
        actions.signedOut()
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand font-weight-bold">React Boilerplate</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {store.isLogin ?
                            <>
                                <li className="nav-item">
                                    <button onClick={() => handleProfile()} className="btn btn-link nav-link">Profile</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => handleSignout()} className="btn btn-link nav-link">Cerrar Sesion</button>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <button onClick={() => actions.showModalSignin(true)} className="btn btn-link nav-link">Iniciar Sesion</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => actions.showModalSignup(true)} className="btn btn-link nav-link">Registrarse</button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>

            {/* Modals */}
            <Signup />
            <Signin />
        </nav>
    );
};
