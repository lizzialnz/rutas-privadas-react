//funcion para retornar vista de login
import { Formik } from 'formik'
import React, { useState } from 'react'
import '../css/login.css'
import { axiosPublic } from '../services/axios'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

function Login({setToken}) {
    const [enviado, setenviado] = useState(null)
    const [noenviado, setnoenviado] = useState(null)
    const Navigator = useNavigate();

    const postLogin = async (user, password) => {
        try {
            const data = axiosPublic.post(
                '/auth/login',
                {
                    user,
                    password
                }
            ).then((response) => {
                /**Aquí esta el token */
                setToken(response.data.token);
                console.log('Bienvenido al sistema '+user)
                setenviado('Formulario enviado con éxito!')
                Navigator('/dashboard');
                setTimeout(() => {
                    setenviado('');
                }, 5000);
            }, (error) => {
                console.log(error);
                setnoenviado('Nombre de usuario incorrecto o nose encuentra registrado');
                setTimeout(() => {
                    setnoenviado('');
                }, 5000);
            });

        } catch (ex) {
            setnoenviado('Usuario no existe, intente nuevamente');
            setTimeout(() => {
                setnoenviado('');
            }, 5000);
            console.log(ex);
        }
        
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Esta es la vista de login</p>
            <Formik
                initialValues={{
                    user: '',
                    password: ''
                }}
                validate={(valores) => {
                    var errores = {};
                    if (!valores.user) {
                        errores.user = 'Debe Ingresar una usuario'
                    }
                    if (!valores.password) {
                        errores.password = 'Debe Ingresar una contraseña'
                    }
                    return errores
                }}
                onSubmit={(valores, { resetForm }) => {
                    /**Aqui editar */
                    postLogin(valores.user, valores.password)
                    resetForm()
                }}>
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form className='formulario' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user">UserName</label>
                            <input type="text" id='user' name='user' placeholder='lalonzo ' value={values.user} onChange={handleChange} onBlur={handleBlur} />
                            {touched.user && errors.user && <div className='error'>{errors.user}</div>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' name='password' placeholder='********' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {touched.password && errors.password && <div className='error'>{errors.password}</div>}
                        </div>
                        <button type='submit'>Enviar</button>
                        {enviado && <p className='enviado'>{enviado}</p>}
                        {noenviado && <p className='noenviado'>{noenviado}</p>}
                    </form>
                )}
            </Formik>
        </div>

    )
}
export default Login

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}