// React
import React, {useState} from 'react'

// Third-party
import axios from 'axios'
import {toast} from 'react-toastify'
import {NavLink, useHistory} from 'react-router-dom'

// Styles
import classes from './ForgotPassword.module.css'

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const history = useHistory()

    const forgotHandler = (e) => {
        e.preventDefault()
        axios.post('/api/forgot', {email})
            .then(() => {
                toast.success('Письмо о смене пароля отправлено на почту')
                history.push('/login')
            })
            .catch(() => toast.error('Что-то пошло не так'))
    }
    return (
        <div className={classes.ForgotPassword + ' row'}>
            <div className='col-xl-7 justify-content-center'>
                <form onSubmit={forgotHandler}
                      className={classes.ForgotPasswordForm}>
                    <h1>Забыли пароль?</h1>
                    <p>
                        Введите свой адрес электронной почты и нажмите
                        кнопку восстановить, чтобы получить новый пароль
                    </p>
                    <input
                        name='email'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email'
                        placeholder='Введите свой e-mail'
                        required
                    />
                    <button
                        type='submit'
                        className='btn btn-success w-100'>
                        Восстановить
                    </button>
                    <NavLink
                        className='d-table ml-auto mr-auto'
                        to={'/login'}>
                        Вернуться назад
                    </NavLink>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
