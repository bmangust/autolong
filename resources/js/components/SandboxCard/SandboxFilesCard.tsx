// React
import React, {useState} from 'react'

// Third-party
import axios, {AxiosError, AxiosResponse} from 'axios'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Styles
import classes from './SandboxFilesCard.module.css'

// App
import SvgCatalog from '../UI/iconComponents/Catalog'
import SvgDelete from '../UI/iconComponents/Delete'
import SvgDownload from '../UI/iconComponents/Download'
import {createNotyMsg, timeConverter} from '../../utils'
import Modal from '../UI/Modal/Modal'
import SvgEdit from '../UI/iconComponents/Edit'
import FileInput from '../UI/Inputs/FileInput/FileInput'

export interface ISandboxFile {
    name: string
    id: number | null
    file: string
    description: string | ''
    updatedAt: number | null
}

const SandboxFilesCard: React.FC<{
    sandboxFiles: ISandboxFile[], id: number, page: string
}> = ({sandboxFiles, id, page}) => {
    const [sandboxFilesState, setSandboxFilesState] = useState(() => {
        return sandboxFiles
    })
    const initialEditState = {
        name: '',
        id: null,
        description: '',
        file: '',
        updatedAt: null
    }

    const schemaCreate = yup.object().shape({
        name: yup.string().required(),
        file: yup.array().required()
    })

    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editState, setEditState] = useState<ISandboxFile>(
        initialEditState
    )

    const {
        register, handleSubmit, reset, errors, control
    } = useForm({
        resolver: yupResolver(schemaCreate)
    })

    const {
        register: register2, handleSubmit: handleSubmit2,
        reset: reset2, errors: errors2
    } = useForm()

    const sandboxFormSubmitHandler =
        handleSubmit((formValues) => {
            formValues.file = formValues.file[0]
            const url = `/api/${page}/${id}/savefile`
            const formData = new FormData()
            Object.entries(formValues).forEach(([key, val]) => {
                if (Array.isArray(val)) {
                    return formData.append(key, JSON.stringify(val))
                } else {
                    return formData.append(key, val)
                }
            })
            axios
                .post(url, formData)
                .then((answer) => {
                    toast.success(
                        createNotyMsg(answer.data.name, 'файл сохранен'))
                    setSandboxFilesState((state) => {
                        return [...state, answer.data]
                    })
                    reset()
                    setIsOpen(false)
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status === 400) {
                        toast.error(error.response?.data)
                    } else {
                        toast.error(error.message)
                    }
                })
        })

    const sandboxEditFormSubmitHandler =
        handleSubmit2((formValues) => {
            const url = `/api/sandboxfiles/${editState.id}`
            axios
                .put(url, formValues)
                .then((answer: AxiosResponse<ISandboxFile>) => {
                    toast.success(
                        createNotyMsg(answer.data.name, 'файл обновлен'))
                    const newState = sandboxFilesState.map((item) => {
                        if (item.id === editState.id) {
                            item.name = answer.data.name
                            item.description = answer.data.description
                        }
                        return item
                    })
                    setSandboxFilesState(newState)
                    setEditState(initialEditState)
                    setIsOpen(false)
                    reset2()
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status === 400) {
                        toast.error(error.response?.data)
                    } else {
                        toast.error(error.message)
                    }
                })
            setIsOpen(false)
        })

    const onClickHandler = () => {
        setIsEdit(false)
        setIsOpen(true)
    }

    const onEditHandler = (file: ISandboxFile) => {
        setEditState(file)
        setIsEdit(true)
        setIsOpen(true)
    }

    const onCancelHandler = () => {
        setIsOpen(false)
    }

    const onDeleteHandler = (file: ISandboxFile) => {
        const url = `/api/sandboxfiles/${file.id}`
        axios
            .delete(url)
            .then((answer) => {
                toast.success(
                    createNotyMsg(file.name, 'файл удален'))
                setSandboxFilesState((oldState) =>
                    oldState.filter(({id}) => id !== file.id)
                )
            })
            .catch((error: AxiosError) => {
                toast.error(error.message)
            })
    }

    return <>
        <div className='card card-body'>
            {sandboxFilesState
                ? sandboxFilesState.map((file) => {
                    return <div
                        className={classes.item}
                        key={file.id}>
                        <div className={classes.desc}>
                            <SvgCatalog className={classes.cat}/>
                            <div>
                                <p>{file.name}</p>
                                {`${file.description
                                    ? file.description + ' |'
                                    : ''}
                                 ${timeConverter(file.updatedAt)}`}
                            </div>
                        </div>
                        <div className={classes.icons}>
                            <a href={file.file}
                               rel="noreferrer"
                               download>
                                <SvgDownload/>
                            </a>
                            <SvgEdit
                                onClick={() =>
                                    onEditHandler(file)}
                                className={classes.edit}/>
                            <SvgDelete onClick={() =>
                                onDeleteHandler(file)}/>
                        </div>
                    </div>
                })
                : null
            }
            <label onClick={onClickHandler} className={classes.upload}>
                + Новый файл
            </label>
        </div>
        {isEdit
            ? <Modal title='Изменить информацию о файле' isOpen={isOpen}>
                <form onSubmit={sandboxEditFormSubmitHandler}>
                    <label htmlFor='description'>Укажите название файла</label>
                    <input className='mb-3' defaultValue={editState.name}
                           type='text' name='name'
                           ref={register2({required: true})}/>
                    {errors2.name &&
                    <small>Это поле обязательно</small>}
                    <label htmlFor='description'>Укажите описание файла</label>
                    <input className='mb-3' type='text'
                           defaultValue={editState.description}
                           name='description' ref={register2}/>
                    <div className='d-flex justify-content-between'>
                        <button onClick={onCancelHandler}
                                type='button' className='btn btn-light'>
                            Отменить обновление
                        </button>
                        <button className='btn btn-success'
                                type="submit">Обновить информацию
                        </button>
                    </div>
                </form>
            </Modal>
            : <Modal title='Добавить новый файл' isOpen={isOpen}>
                <form onSubmit={sandboxFormSubmitHandler}>
                    <label htmlFor='name'>Укажите название файла</label>
                    <input className='mb-3' type='text'
                           name='name' ref={register({required: true})}/>
                    {errors.name &&
                    <small>Это поле обязательно</small>}
                    <label htmlFor='description'>Укажите описание файла</label>
                    <input className='mb-3' type='text'
                           name='description' ref={register}/>
                    <FileInput name='file' control={control}/>
                    {errors.file &&
                    <small>Это поле обязательно</small>}
                    <div className='d-flex justify-content-between'>
                        <button onClick={onCancelHandler}
                                type='button' className='btn btn-light'>
                            Отменить добавление
                        </button>
                        <button className='btn btn-success'
                                type="submit">Добавить файл
                        </button>
                    </div>
                </form>
            </Modal>
        }
    </>
}

export default SandboxFilesCard
