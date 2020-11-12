// React
import React, {forwardRef} from 'react'

// Styles
import classes from './Input.module.css'

interface IInput {
    props: any
    ref: any
    required: boolean
    label: string
    helperText: string
    error: boolean
}

const Input: React.FC<IInput> = (
    {
        props, ref, required = false, label = '',
        helperText = '', error = false
    }) => {
    let labelNode
    let errorNode

    const labelCls: string[] = []
    const inputCls: string[] = []

    if (required) {
        labelCls.push('required')
    }

    if (label) {
        labelNode =
            <label className={labelCls.join(' ')}
                   htmlFor={props.id}>
                {label}
            </label>
    }

    if (error) {
        inputCls.push(classes.error)
        errorNode =
            <small className={classes.helperText}>
                {helperText}
            </small>
    }

    return (
        <div className={classes.input}>
            {labelNode}
            <input
                className={inputCls.join(' ')}
                {...props}
                ref={ref}
            />
            {errorNode}
        </div>
    )
}

export default forwardRef(Input)
