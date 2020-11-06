// React
import React, {useState} from 'react'

// Third-party
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

// Styles
import classes from './DocumentsCard.module.css'

// App
import SvgCatalog from '../UI/iconComponents/Catalog'
import SvgDelete from '../UI/iconComponents/Delete'
import SvgDownload from '../UI/iconComponents/Download'
import {createNotyMsg, timeConverter} from '../../utils'

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

    const onUploadHandler = (e) => {
        const url = `/api/${page}/${id}/savefile`
        const formData = new FormData()
        const data = {file: e.target.files[0]}
        Object.entries(data).forEach(([key, val]) => {
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
                    console.log([...state, answer.data])
                    return [...state, answer.data]
                })
            })
            .catch((error: AxiosError) => {
                toast.error(error.message)
            })
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

    return <div className='card card-body'>
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
        <label className={classes.upload} htmlFor="file">
            + Новый файл
            <input
                id='file'
                type="file"
                onChange={onUploadHandler}
            />
        </label>
    </div>
}

export default DocumentsCard
