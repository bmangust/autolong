// React
import React, {useContext, useState} from 'react'

// Third-party
import {toast} from 'react-toastify'
import {NavLink} from 'react-router-dom'
import {push} from 'connected-react-router'
import {useDispatch} from 'react-redux'

// Styles
import classes from './Login.module.css'
import SanctumContext from '../../Sanctum/SanctumContext'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()

    const {signIn} = useContext(SanctumContext)

    const loginHandler = (e) => {
        e.preventDefault()
        if (signIn) {
            signIn(email, password)
                .then(() => {
                    toast.success('Успешная авторизация')
                    dispatch(push('/'))
                    location.reload()
                })
                .catch(() => toast.error('Неверный пароль или email'))
        }

        // axios.post('/api/login', {email, password})
        //     .then((answer) => {
        //         console.log('login', answer.data)
        //         return axios.get('/api/user', {
        //             withCredentials: true,
        //             headers: {
        //                 'Authorization': `Bearer ${answer.data}`
        //             }
        //         })
        //             .then((answer) => console.log(answer.data))
        //             .catch((error) => console.log(error))
        //     })
        //     .catch((error) => console.log(error.message))
    }


    return (
        <div className={classes.Login}>
            <div className='row'>
                <div className='col-xl-7'>
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
        </div>
    )
}

export default Login
