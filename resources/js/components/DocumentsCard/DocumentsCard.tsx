// React
import React, {useState} from 'react'

// Third-party
import axios, {AxiosError, AxiosResponse} from 'axios'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'

// Styles
import classes from './DocumentsCard.module.css'

// App
import SvgCatalog from '../UI/iconComponents/Catalog'
import SvgDelete from '../UI/iconComponents/Delete'
import SvgDownload from '../UI/iconComponents/Download'
import {createNotyMsg, timeConverter} from '../../utils'
import Modal from '../UI/Modal/Modal'
import SvgEdit from '../UI/iconComponents/Edit'

export interface IDocument {
    name: string
    id: number | null
    file: string
    description: string | ''
    createdAt: number | null
}

const DocumentsCard: React.FC<{
    documents: IDocument[], id: number, page: string
}> = ({documents, id, page}) => {
    const [documentsState, setDocumentsState] = useState(() => {
        return documents
    })
    const initialEditState = {
        name: '',
        id: null,
        description: '',
        file: '',
        createdAt: null
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editState, setEditState] = useState<IDocument>(
        initialEditState
    )

    const {
        register, handleSubmit, reset
    } = useForm()

    const {
        register: register2, handleSubmit: handleSubmit2, reset: reset2
    } = useForm()

    const documentFormSubmitHandler =
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
                    setDocumentsState((state) => {
                        return [...state, answer.data]
                    })
                    reset()
                    setIsOpen(false)
                })
                .catch((error: AxiosError) => {
                    toast.error(error.message)
                })
        })

    const documentEditFormSubmitHandler =
        handleSubmit2((formValues) => {
            const url = `/api/documents/${editState.id}`
            axios
                .put(url, formValues)
                .then((answer: AxiosResponse<IDocument>) => {
                    toast.success(
                        createNotyMsg(answer.data.name, 'файл обновлен'))
                    const newState = documentsState.map((item) => {
                        if (item.id === editState.id) {
                            item.name = answer.data.name
                            item.description = answer.data.description
                        }
                        return item
                    })
                    console.log(newState)
                    setDocumentsState(newState)
                    setEditState(initialEditState)
                    setIsOpen(false)
                    reset2()
                })
                .catch((error: AxiosError) => {
                    toast.error(error.message)
                })
            setIsOpen(false)
        })

    const onClickHandler = () => {
        setIsEdit(false)
        setIsOpen(true)
    }

    const onEditHandler = (document: IDocument) => {
        setEditState(document)
        setIsEdit(true)
        setIsOpen(true)
    }

    const onCancelHandler = () => {
        setIsOpen(false)
    }

    const onDeleteHandler = (document: IDocument) => {
        const url = `/api/documents/${document.id}`
        axios
            .delete(url)
            .then((answer) => {
                toast.success(
                    createNotyMsg(document.name, 'файл удален'))
                setDocumentsState((oldState) =>
                    oldState.filter(({id}) => id !== document.id)
                )
            })
            .catch((error: AxiosError) => {
                toast.error(error.message)
            })
    }

    return <>
        <div className='card card-body'>
            {documentsState
                ? documentsState.map((document) => {
                    return <div
                        className={classes.item}
                        key={document.id}>
                        <div className={classes.desc}>
                            <SvgCatalog className={classes.cat}/>
                            <div>
                                <p>{document.name}</p>
                                {`${document.description
                                    ? document.description + ' |'
                                    : ''}
                                 ${timeConverter(document.createdAt)}`}
                            </div>
                        </div>
                        <div className={classes.icons}>
                            <a href={document.file}
                               rel="noreferrer"
                               download>
                                <SvgDownload/>
                            </a>
                            <SvgEdit
                                onClick={() =>
                                    onEditHandler(document)}
                                className={classes.edit}/>
                            <SvgDelete onClick={() =>
                                onDeleteHandler(document)}/>
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
                <form onSubmit={documentEditFormSubmitHandler}>
                    <label htmlFor='description'>Укажите название файла</label>
                    <input className='mb-3' defaultValue={editState.name}
                           type='text' name='name' ref={register2}/>
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
                <form onSubmit={documentFormSubmitHandler}>
                    <label htmlFor='description'>Укажите название файла</label>
                    <input className='mb-3' type='text'
                           name='name' ref={register}/>
                    <label htmlFor='description'>Укажите описание файла</label>
                    <input className='mb-3' type='text'
                           name='description' ref={register}/>
                    <label className={classes.upload + ' mb-3'} htmlFor="file">
                        Загрузить файл
                        <input
                            id='file'
                            name='file'
                            type="file"
                            ref={register}
                        />
                    </label>
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

export default DocumentsCard
