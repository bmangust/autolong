// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import bsCustomFileInput from 'bs-custom-file-input'
import {useHistory} from 'react-router-dom'

// Typescript
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'
import {ITag, ITagsRootState} from '../ITags'

// Actions
import {createCatalog} from '../../../store/actions/catalogs'
import {fetchProviders} from '../../../store/actions/providers'
import {fetchTags} from '../../../store/actions/tags'

interface ICreateCatalogData {
    name: string
    providerId: string
    tags: []
    file: string
}

const CatalogForm: React.FC = () => {
    const {
        register, handleSubmit, control, errors
    } = useForm<ICreateCatalogData>()

    const dispatch = useDispatch()
    const history = useHistory()

    // eslint-disable-next-line no-unused-vars
    const [tagsState, setTags] = useState([])

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    const {tags} = useSelector(
        (state: ITagsRootState) => ({
            tags: state.tagsState.tags
        }))

    useEffect(() => {
        dispatch(fetchProviders())
        dispatch(fetchTags())
    }, [dispatch])

    const providersOptions = providers.map(
        (provider: IProvider) => {
            return {
                label: provider.name,
                value: provider.id
            }
        })

    const tagsOptions = tags.map(
        (tag: ITag) => {
            return {
                label: tag.name,
                value: tag.id
            }
        }
    )

    const onChangeHandler = (newValue: any, actionMeta: any) => {
        setTags(newValue)
    }

    const providerSelect = <Select
        placeholder='Выберите поставщика'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const catalogFormSubmitHandler =
        handleSubmit((formValues: ICreateCatalogData) => {
            formValues.file = formValues.file[0]
            formValues.providerId = formValues.providerId.value
            const newTags = []
            tagsState.forEach(option => {
                newTags.push(option.label)
            })
            formValues.tags = [...newTags]
            dispatch(createCatalog(formValues, '/catalogs'))
        })

    bsCustomFileInput.init()

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={catalogFormSubmitHandler}>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label className='w-100 required'
                                   htmlFor='name'>
                                Укажите название для каталога
                            </label>
                            <input placeholder="Введите название" name='name'
                                   ref={register({required: true})}
                                   className='col-lg-10 mb-3' type="text"/>
                            {errors.name &&
                            <small>Это поле обязательно</small>}

                            <label className='w-100 required'
                                   htmlFor='providerId'>
                                Выберите поставщика
                            </label>
                            <div className='col-lg-10 mb-3 p-0'>
                                <Controller
                                    defaultValue=''
                                    name="providerId"
                                    as={providerSelect}
                                    options={providersOptions}
                                    control={control}
                                    rules={{required: true}}
                                />
                                {errors.providerId &&
                                <small>Это поле обязательно</small>}
                            </div>

                            <label className='w-100 required'
                                   htmlFor='file'>
                                Загрузите файл каталога
                            </label>
                            <div className="custom-file col-lg-10 mb-3 mb-lg-0">
                                <input multiple={false} name="file"
                                       ref={register({required: true})}
                                       className="custom-file-input"
                                       type="file"/>
                                <label
                                    className="custom-file-label"
                                    htmlFor="file">
                                    Выберите файл
                                </label>
                            </div>
                            {errors.file &&
                            <small>Это поле обязательно</small>}
                        </div>
                        <div className="col-lg-6">
                            <label className='w-100'>
                                Укажите теги
                            </label>
                            <CreatableSelect
                                isMulti={true}
                                placeholder='Введите теги'
                                onChange={onChangeHandler}
                                classNamePrefix='select-mini-tags'
                                className='select-mini-tags p-0 col-lg-10 '
                                options={tagsOptions}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='mr-3 btn btn-light mb-3 mb-sm-0'>
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
