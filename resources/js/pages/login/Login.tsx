// React
import React from 'react'

// Styles
import classes from './Login.module.css'

const Login: React.FC = () => {
    return (
        <div className={classes.Login}>
            <div className='row'>
                <div className='col-xl-7'>
                    <form action='#' className={classes.LoginForm}>
                        <h1>Вход в систему</h1>
                            <label htmlFor='email'>E-mail:</label>
                            <input
                                name='email'
                                type='email'
                                placeholder='Введите E-mail'
                                required
                            />
                            <label htmlFor='password'>Пароль:</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Введите пароль'
                                required
                            />
                        <button className='btn btn-success w-100'>
                            Войти
                        </button>
                        <a href='#'>Забыли пароль?</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
