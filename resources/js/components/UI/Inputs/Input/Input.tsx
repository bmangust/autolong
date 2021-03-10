// React
import React, {CSSProperties, forwardRef, ReactText} from 'react'

// Styles
import classes from './Input.module.css'

// App
import translate from './inputTranslate.json'

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface ITextFieldProps {
    value?: any
    style?: CSSProperties
    defaultValue?: ReactText
    className?: string
    wrapperClass?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
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
        type, disabled, className,
        wrapperClass, style, value, ...rest
    }, ref) => {
    let labelNode
    let errorNode

    const labelCls: string[] = []
    const inputCls: string[] = []
    const wrapperCls: string[] = [classes.input]

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

    if (wrapperClass) {
        wrapperCls.push(wrapperClass)
    }

    if (className) {
        inputCls.push(className)
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
        return <div style={style} className={wrapperCls.join(' ')}>
            {labelNode}
            <input
                type={type}
                value={value || ''}
                pattern={pattern}
                disabled={disabled || false}
                className={inputCls.join(' ')}
                {...rest}
                ref={ref as never}/>
            {errorNode}
        </div>
    }

    return <div style={style} className={wrapperCls.join(' ')}>
        {labelNode}
        <input
            type={type}
            value={value}
            pattern={pattern}
            disabled={disabled || false}
            className={inputCls.join(' ')}
            {...rest}
            ref={ref as never}/>
        {errorNode}
    </div>
})

export default Input
