// React
import React from 'react'

// Third-party
import Select from 'react-select'

// Styles
import classes from './SelectSearch.module.css'
import {ActionMeta, OptionTypeBase, ValueType} from 'react-select/src/types'

interface option {
    label: string
    value: any
}

interface props {
    options: option[]
    onChange: (value: ValueType<OptionTypeBase>,
               actionMeta: ActionMeta<OptionTypeBase>) => void
    placeholder: string
    value: option
    name?: string
    isLoading?: boolean
    isDisabled?: boolean
    isSearchable?: boolean
}

const SelectSearch: React.FC<props> =
    ({
         options,
         onChange,
         placeholder,
         value,
         name,
         isLoading,
         isDisabled,
         isSearchable
     }) => {
        return (
            <Select
                className={classes.selectSearch}
                classNamePrefix={classes.selectSearch}
                placeholder={placeholder}
                onChange={onChange}
                options={options}
                value={value}
                isLoading={isLoading}
                isDisabled={isDisabled}
                name={name}
                isSearchable={isSearchable}
            />
        )
    }

export default SelectSearch
