// React
import React, {forwardRef} from 'react'

// Styles
import classes from './Input.module.css'

// App
import translate from './inputTranslate.json'

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface ITextFieldProps {
    value?: any
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    name: string
    pattern?: string
    min?: string
    id?: string
    helperText?: string
    placeholder?: string
    autoFocus?: boolean
    type?: 'email' | 'password' | 'text' | 'date' | 'time' | 'number'
    textarea?: boolean
    required?: boolean
    disabled?: boolean
    error?: boolean
}

// eslint-disable-next-line react/display-name
const Input: React.ForwardRefExoticComponent<React.PropsWithoutRef<ITextFieldProps> &
    // eslint-disable-next-line react/display-name
    React.RefAttributes<InputElement>> = forwardRef<InputElement, ITextFieldProps>((
    {
        required, label, id,
        helperText, error, pattern,
        type, disabled, ...rest
    }, ref) => {
    let labelNode
    let errorNode

    const labelCls: string[] = []
    const inputCls: string[] = []

    const onKeyDownHandler = (e) => {
        if (type === 'number') {
            if (e.key === 'e') {
                e.preventDefault()
            }
            if (e.key === '.') {
                const value = e.target.value
                if (value.indexOf('.') === -1) {
                    e.target.value = `${value}.0`
                }
                e.preventDefault()
            }
        }
    }

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
    if (type === 'number') {
        inputCls.push(classes.number)
    }

    return (
        <div className={classes.input}>
            {labelNode}
            <input
                onKeyDown={(e) => onKeyDownHandler(e)}
                type={type}
                pattern={pattern}
                disabled={disabled || false}
                className={inputCls.join(' ')}
                {...rest}
                ref={ref as never}/>
            {errorNode}
        </div>
    )
})

export default Input
