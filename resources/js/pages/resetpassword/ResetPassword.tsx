// React
import React, {useState} from 'react'

// Third-party
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {push} from 'connected-react-router'
import {useDispatch} from 'react-redux'
import queryString from 'query-string'
import {useHistory} from 'react-router-dom'

// Styles
import classes from '../forgotpassword/ForgotPassword.module.css'

const ResetPassword: React.FC = () => {
    const history = useHistory()
    const params = queryString.parse(history.location.search)
    const [password, setPassword] = useState<string>('')
    const [email] = useState<string>(() => {
        return Object.keys(params)[1]
    })
    const [token] = useState<string>(() => {
        return Object.keys(params)[0]
    })
    const dispatch = useDispatch()

    const forgotHandler = (e) => {
        e.preventDefault()
        axios.post('/reset', {password, email, token})
            .then(() => {
                toast.success('Пароль успешно изменен')
                dispatch(push('/login'))
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 400) {
                    toast.error(error.response.data)
                } else {
                    toast.error('Что-то пошло не так')
                }
            })
    }
    return (
        <div className={classes.ForgotPassword + ' row'}>
            <div className='col-xl-7 justify-content-center'>
                <form onSubmit={forgotHandler}
                      className={classes.ForgotPasswordForm}>
                    <h1 className='text-left'>Восстановление пароля</h1>
                    <p>
                        Укажите свой новый пароль
                    </p>
                    <input
                        name='email'
                        type='email'
                        defaultValue={email}
                        autoComplete='email'
                        disabled={true}
                    />
                    <input
                        type="password"
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                        required
                    />
                    <button
                        type='submit'
                        className='btn btn-success w-100'>
                        Сменить пароль
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
