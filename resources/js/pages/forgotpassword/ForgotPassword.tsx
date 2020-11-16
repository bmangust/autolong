// React
import React from 'react'

// Styles
import classes from './ForgotPassword.module.css'

const ForgotPassword: React.FC = () => {
    return (
        <div className={classes.ForgotPassword}>
            <div className='row'>
                <div className='col-xl-7'>
                    <form action='#' className={classes.ForgotPasswordForm}>
                        <h1>Забыли пароль?</h1>
                        <p>
                            Введите свой адрес электронной почты и нажмите нопку
                            восстановить, чтобы получить новый пароль
                        </p>
                        <input
                            name='email'
                            type='email'
                            placeholder='Введите свой e-mail'
                            required
                        />
                        <button className='btn btn-success w-100'>
                            Восстановить
                        </button>
                        <a href='#'>Вернуться назад</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
