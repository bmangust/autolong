// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import bsCustomFileInput from 'bs-custom-file-input'
import {useHistory} from 'react-router-dom'

// Typescript
import {IProvider} from '../../Providers/IProviders'
import {ITag} from '../ITags'
import {ICatalog} from '../ICatalogs'

// Actions
import {
    createCatalog,
    updateCatalogById,
    updateCatalogFileById
} from '../../../store/actions/catalogs'

// Styles
import classes from './CatalogForm.module.css'

interface ICreateCatalogData {
    name: string
    providerId: string
    inputFile: File
    tags: []
    file: string
}

type Props = {
    type?: string
    catalog?: ICatalog
    tags: ITag[]
    providers: IProvider[]
}

const CatalogForm: React.FC<Props> = (props) => {
    const {type, catalog, tags, providers} = props

    const dispatch = useDispatch()
    const history = useHistory()

    let defaultTags = []

    let defaultValues = {}

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

    if (type === 'edit') {
        defaultTags = catalog?.tags.map(
            (tag: ITag) => {
                return {
                    label: tag.name,
                    value: tag.id
                }
            }
        )
        defaultValues = {
            name: catalog?.name,
            providerId: providersOptions
                .filter(({value}) =>
                            value === catalog?.provider.id)[0],
            tags: defaultTags,
            file: catalog?.file
        }
    }

    const [tagsState, setTags] = useState(() => defaultTags)

    const {
        register, handleSubmit, control, errors
    } = useForm<ICreateCatalogData>({defaultValues})

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
            formValues.providerId = formValues.providerId.value
            const newTags = []
            tagsState.forEach(option => {
                newTags.push(option.label)
            })
            formValues.tags = [...newTags]
            if (type === 'edit') {
                dispatch(
                    updateCatalogById(formValues, catalog?.id, '/catalogs'))
                if (formValues.inputFile && formValues.inputFile[0]) {
                    dispatch(updateCatalogFileById(
                        catalog?.id, {file: formValues.inputFile[0]}))
                }
            } else {
                if (formValues.inputFile && formValues.inputFile[0]) {
                    formValues.file = formValues.inputFile[0]
                }
                dispatch(createCatalog(formValues, '/catalogs'))
            }
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
                                {type === 'edit'
                                    ? <>
                                        <div className="custom-file">
                                            <input className='hidden d-none'
                                                   ref={register}
                                                   name='file'
                                                   type="hidden"/>
                                            <input multiple={false}
                                                   name="inputFile"
                                                   ref={register}
                                                   className="custom-file-input"
                                                   type="file"/>
                                            <label
                                                className="custom-file-label"
                                                htmlFor="imageFile">
                                                Выберите файл
                                            </label>
                                        </div>
                                    </>
                                    : <>
                                        <input multiple={false} name="inputFile"
                                               ref={register({required: true})}
                                               className="custom-file-input"
                                               type="file"/>
                                        <label
                                            className="custom-file-label"
                                            htmlFor="file">
                                            Выберите файл
                                        </label>
                                    </>
                                }

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
                                defaultValue={tagsState}
                                placeholder='Введите теги'
                                onChange={onChangeHandler}
                                classNamePrefix='select-mini-tags'
                                className='select-mini-tags p-0 col-lg-10 '
                                options={tagsOptions}
                            />
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
