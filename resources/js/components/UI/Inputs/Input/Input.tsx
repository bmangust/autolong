// React
import React, {forwardRef} from 'react'

// Styles
import classes from './Input.module.css'

// App
import translate from './inputTranslate.json'

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface ITextFieldProps {
    value: string
    onChange: (val: string) => void
    label: string
    name: string
    id: string
    helperText?: string
    placeholder?: string
    autoFocus?: boolean
    type?: 'email' | 'password' | 'text'
    textarea?: boolean
    required?: boolean
    error?: boolean
}

// eslint-disable-next-line react/display-name
const Input: React.FC = forwardRef<InputElement, ITextFieldProps>((
    {
        required, label, id,
        helperText, error, ...rest
    }, ref) => {
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
                   htmlFor={id}>
                {label in translate
                    ? translate[label]
                    : label
                }
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
                {...rest}
                ref={ref as any}
            />
            {errorNode}
        </div>
    )
})

export default Input
