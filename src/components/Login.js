import React,{useContext, useEffect} from 'react'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router'
const Login = () => {

    const {handleSignIn,unsuscribe, user} = useContext(UserContext)
    const history = useHistory();
    useEffect(() => {
        if(user){
            history.push('/')
        }
        unsuscribe()
        
    })
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-left">
                    <AiOutlineTwitter/>
                </div>
                <div className="login-right">
                    <AiOutlineTwitter/>
                    <h1>Lo que está pasando ahora</h1>
                    <h3>Únete a Twitter hoy mismo.</h3>
                    <div className="login-register">
                        <div className="login-button" onClick={handleSignIn}>
                            <FcGoogle/>
                            Registrarse con Google
                        </div>
                    </div>
                    <p>Al registrarte, aceptas los <span>Términos de servicio</span> y la <span>Política de privacidad</span>, incluida la política de <span>Uso de Cookies</span>.</p>
                    <p>¿Ya tienes una cuenta? <span>Inicia sesión</span></p>
                </div>
            </div>
            
            <footer className="login-footer">
                <ul>
                    <li>Acerca de </li>
                    <li>Centro de ayuda</li>
                    <li>Condiciones de Servicio</li>
                    <li>Política de Privacidad</li>
                    <li>Política de cookies</li>
                    <li>Información de anuncios</li>
                    <li>Blog</li>
                    <li>Estado</li>
                    <li>Empleos</li>
                    <li>Recursos para marcas</li>
                    <li>Publicidad</li>
                    <li>Marketing</li>
                    <li>Twitter para empresas</li>
                    <li>Desarrolladores</li>
                    <li>Guía</li>
                    <li>Configuración</li>
                </ul>
                <span>© 2021 Twitter, Inc.</span>
            </footer>
        </div>
    )
}

export default Login
