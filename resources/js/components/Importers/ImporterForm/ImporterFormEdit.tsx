// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

// Actions
import {updateImporter} from '../../../store/actions/importers'

// Typescript
import {IImporter} from '../IImporters'

// Styles
import classes from './ImporterForm.module.css';

interface ICreateImporterData {
    nameRu: string
    nameEn: string
    address: string
    phone: string
}

const ImporterFormEdit: React.FC<{ importer: IImporter }> = ({importer}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const defaultValues = {
        nameRu: importer.nameRu,
        nameEn: importer.nameEn,
        address: importer.address,
        phone: importer.phone
    }

    const {
        register, handleSubmit, errors
    } = useForm<ICreateImporterData>({
        defaultValues
    })

    const importerFormSubmitHandler =
        handleSubmit((formValues: ICreateImporterData) => {
            dispatch(updateImporter(formValues, importer.id, '/importers'))
        })

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={importerFormSubmitHandler}>
                    <div className='mb-0 row mb-lg-3'>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label htmlFor='nameRu' className='w-100 required'>
                                Укажите название
                                <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    RU
                                </span>
                            </label>
                            <input className='col-lg-10' name="nameRu"
                                   ref={register({required: true})}
                                   type="text" placeholder="Введите название"/>
                            {errors.nameRu &&
                            <small>Это поле обязательно</small>}
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label htmlFor='nameEn' className='w-100 required'>
                                Name
                                <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    ENG
                                </span>
                            </label>
                            <input name="nameEn" className='col-lg-10 required'
                                   ref={register({required: true})}
                                   type="text" placeholder="Type here"/>
                            {errors.nameEn &&
                            <small>Это поле обязательно</small>}
                        </div>
                    </div>
                    <div className='mb-3 row mb-lg-5'>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label className='required'
                                   htmlFor='address'>Укажите адрес</label>
                            <input
                                name="address" type="text"
                                className='col-lg-10'
                                ref={register({required: true})}
                                placeholder="Введите адрес"/>
                            {errors.address &&
                            <small>Это поле обязательно</small>}
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label
                                className='required'
                                htmlFor='phone'>Укажите номер телефона</label>
                            <input
                                name="phone" type="tel"
                                className='col-lg-10'
                                ref={register({required: true})}
                                placeholder="Введите номер"/>
                            {errors.address &&
                            <small>Это поле обязательно</small>}
                        </div>
                    </div>
                    <div className={classes.btns}>
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='btn btn-light'>
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

export default ImporterFormEdit
