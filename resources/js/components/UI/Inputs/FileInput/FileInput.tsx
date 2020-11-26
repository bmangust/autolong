// React
import React from 'react'

// Third-party
import {Controller} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import {Control} from 'react-hook-form/dist/types'

// Styles
import classes from './FileInput.module.css'
import {substringOut} from '../../../../utils'

// import SvgDelete from '../../iconComponents/Delete'

interface IFileInput {
    control: Control
    name: string
    label?: string
    maxFiles?: number
}

const FileInput: React.FC<IFileInput> =
    (
        {
            control,
            name,
            label = 'Перенесите сюда файл или кликните для выбора файла',
            maxFiles = 1
        }) => {
        // const removeFile = (file) => () => {
        //     acceptedFiles.splice(acceptedFiles.indexOf(file), 1)
        // }

        return (
            <Controller
                control={control}
                name={name}
                defaultValue={[]}
                render={({onChange, onBlur, value}) => <>
                    <Dropzone maxFiles={maxFiles} onDrop={onChange}>
                        {({getRootProps, getInputProps}) =>
                            (<div className={classes.fileInput}
                                  {...getRootProps()}>
                                <input
                                    {...getInputProps()}
                                    onBlur={onBlur}
                                    name={name}/>
                                <p className='mb-0'>{label}</p>
                            </div>)}
                    </Dropzone>
                    <ul className={classes.fileList}>
                        {value.map((f, index) => (
                            <li key={index}>
                                <div>
                                    {substringOut(f.name, 30)}
                                    <p className={classes.size}>
                                        {`Размер файла
                                ${(f.size / 1000000).toFixed(3)} mb`}
                                    </p>
                                </div>
                                {/* <button className={classes.delete}>
                                    <SvgDelete/>
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </>}
            />
        )
    }

export default FileInput
