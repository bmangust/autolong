// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'

// Typescript
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'

// Actions
import {createCatalog} from '../../../store/actions/catalogs'
import {fetchProviders} from '../../../store/actions/providers'

interface ICreateCatalogData {
    name: string
    providerId: string
    tags: []
    file: string
}

const CatalogForm: React.FC = () => {
    const {
        register, handleSubmit
    } = useForm<ICreateCatalogData>()

    const dispatch = useDispatch()
    const history = useHistory()

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const catalogFormSubmitHandler =
        handleSubmit((formValues: ICreateCatalogData) => {
            formValues.file = formValues.file[0]
            formValues.tags = [...formValues.tags]
            dispatch(createCatalog(formValues))
            history.push('/catalogs')
        })

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={catalogFormSubmitHandler}>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='name'>
                                Укажите название для каталога
                            </label>
                            <input placeholder="Введите название" name='name'
                                   ref={register}
                                   className='col-lg-10 mb-3' type="text"/>

                            <label className='w-100' htmlFor='providerId'>
                                Выберите поставщика
                            </label>
                            <select className='col-lg-10'
                                    ref={register}
                                    name="providerId" id="providerId">
                                <option disabled defaultValue=''>
                                    Выберите поставщика
                                </option>
                                {providers.map((provider: IProvider) => {
                                    return (<option
                                        key={provider.id}
                                        value={provider.id}>
                                        {provider.name}</option>)
                                })}
                            </select>

                            <label className='w-100' htmlFor='file'>
                                Загрузите файл каталога
                            </label>
                            <input multiple={false} name="file"
                                   ref={register}
                                   type="file" className='col-lg-10'/>
                        </div>
                        <div className="col-lg-6">
                            <label className='w-100'>
                                Укажите теги
                            </label>
                            <input
                                name='tags' type="text" ref={register}
                                className='col-lg-10' placeholder="Type here"/>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='mr-3 btn btn-light'>
                            Назад
                        </button>
                        <button
                            className='btn btn-success'
                            type="submit"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CatalogForm
