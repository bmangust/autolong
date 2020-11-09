// React
import React, {useState} from 'react'

// Third-party
import axios, {AxiosError} from 'axios'
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

export interface IDocuments {
    name: string
    id: number
    file: string
    createdAt: number
}

const DocumentsCard: React.FC<{
    documents: IDocuments[], id: number, page: string
}> = ({documents, id, page}) => {
    const [documentsState, setDocumentsState] = useState(() => {
        return documents
    })
    const [isOpen, setIsOpen] = useState(false)

    const {
        register, handleSubmit
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
                })
                .catch((error: AxiosError) => {
                    toast.error(error.message)
                })
            setIsOpen(false)
        })

    const onClickHandler = () => {
        setIsOpen(true)
    }

    const onCancelHandler = () => {
        setIsOpen(false)
    }

    const onDeleteHandler = (document) => {
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
                                {timeConverter(document.createdAt)}
                            </div>
                        </div>
                        <div className={classes.icons}>
                            <a href={document.file}
                               rel="noreferrer"
                               download>
                                <SvgDownload/>
                            </a>
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
        <Modal title='Добавить новый файл' isOpen={isOpen}>
            <form onSubmit={documentFormSubmitHandler}>
                <label htmlFor='description'>Укажите название файла</label>
                <input className='mb-3' type='text' name='name' ref={register}/>
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
                <button className='btn btn-success mr-3'
                        type="submit">Добавить файл
                </button>
                <button onClick={onCancelHandler}
                        type='button' className='btn btn-light'>
                    Отменить добавление
                </button>
            </form>
        </Modal>
    </>
}

export default DocumentsCard
