// React
import React, {forwardRef} from 'react'

// Styles
import classes from './InputCheckbox.module.css'

type InputElement = HTMLInputElement

interface ICheckboxField {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    name: string
    id?: string
    classNameLabel?: string
}

const InputCheckbox: React.ForwardRefExoticComponent<React.PropsWithoutRef<ICheckboxField> &
    // eslint-disable-next-line react/display-name
    React.RefAttributes<InputElement>> = forwardRef<InputElement, ICheckboxField>((
    {
        label, id, name, classNameLabel,
        ...rest
    }, ref) => {
    return <div className={classes.input}>
        <input
            defaultChecked={false}
            type='checkbox'
            className={classes.inpCbx}
            name={name}
            ref={ref as any}
            id={name}
            {...rest}/>
        <label className={classes.cbx} htmlFor={name}>
                <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"/>
                    </svg>
                </span>
            <span className={classNameLabel
                ? classes[classNameLabel]
                : ''}>{label}</span>
        </label>
    </div>
})

export default InputCheckbox
