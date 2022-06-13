// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

// Actions
import {createChangelog} from '../../../store/actions/changelog'

// Styles
import classes from './ChangelogForm.module.css'

interface ICreateChangelogData {
    changes: string
    link: string
}

const ChangelogForm: React.FC = () => {
    const {
        register, handleSubmit, errors
    } = useForm<ICreateChangelogData>()

    const dispatch = useDispatch()
    const history = useHistory()

    const changelogFormSubmitHandler =
        handleSubmit((formValues: ICreateChangelogData) => {
            dispatch(createChangelog(formValues, '/changelog'))
        })

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={changelogFormSubmitHandler}>
                    <div className='mb-0 row mb-lg-3'>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label htmlFor='changes' className='w-100 required'>
                                Описание изменений
                            </label>
                            <textarea className='col-lg-10' name="changes"
                                   ref={register({required: true})}
                                   placeholder="Введите изменения"/>
                            {errors.changes &&
                            <small>Это поле обязательно</small>}
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label htmlFor='nameEn' className='w-100 required'>
                                Ссылка
                            </label>
                            <input name="link" className='col-lg-10'
                                   ref={register({required: false})}
                                   type="url" placeholder="Сссылка"/>
                            {errors.link &&
                            <small>Это поле обязательно</small>}
                        </div>
                    </div>
                    <div className={classes.btns}>
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className=' btn btn-light'>
                            Назад
                        </button>
                        <button
                            className='btn btn-success'
                            type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangelogForm
