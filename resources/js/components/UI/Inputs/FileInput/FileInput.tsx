// React
import React from 'react'

// Third-party
import {Controller} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import {Control} from 'react-hook-form/dist/types'

// Styles
import classes from './FileInput.module.css'

const FileInput: React.FC<{ control: Control, name: string }> = (
    {control, name}) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({onChange, onBlur, value}) => <>
                <Dropzone maxFiles={1} onDrop={onChange}>
                    {({getRootProps, getInputProps}) =>
                        (<div className={classes.fileInput}
                              {...getRootProps()}>
                            <input {...getInputProps()} onBlur={onBlur}
                                   name={name}/>
                            <p className='mb-0'>Перенесите сюда файл или
                                кликните для выбора файла</p>
                        </div>)}
                </Dropzone>
                <ul>
                    {value.map((f, index) => (
                        <li key={index}>
                            {f.name}
                        </li>
                    ))}
                </ul>
            </>}/>
    )
}

export default FileInput
