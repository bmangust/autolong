// React
import React, {useContext, useState} from 'react'

// Third-party
import {toast} from 'react-toastify'
import {NavLink, useHistory} from 'react-router-dom'

// Styles
import classes from './Login.module.css'
import SanctumContext from '../../Sanctum/SanctumContext'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const history = useHistory()

    const {signIn} = useContext(SanctumContext)

    const loginHandler = (e) => {
        e.preventDefault()
        if (signIn) {
            signIn(email, password)
                .then(() => {
                    toast.success('Успешная авторизация')
                    history.push('/')
                    location.reload()
                })
                .catch(() => toast.error('Неверный пароль или email'))
        }
    }

    return (
        <div className={classes.Login + ' row'}>
            <div className='col-xl-7 justify-content-center'>
                <form onSubmit={loginHandler} className={classes.LoginForm}>
                    <h1>Вход в систему</h1>
                    <label htmlFor='email'>E-mail:</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        type='email'
                        placeholder='Введите E-mail'
                        autoComplete='email'
                        required
                    />
                    <label htmlFor='password'>Пароль:</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        type='password'
                        placeholder='Введите пароль'
                        autoComplete='current-password'
                        required
                    />
                    <button
                        type='submit'
                        className='btn btn-success w-100'>
                        Войти
                    </button>
                    <NavLink
                        className='d-table ml-auto mr-auto'
                        to={'/forgotpassword'}>
                        Забыли пароль?
                    </NavLink>
                </form>
            </div>
        </div>
    )
}

export default Login
