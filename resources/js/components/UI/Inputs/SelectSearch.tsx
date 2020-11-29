// React
import React from 'react'

// Third-party
import Select from 'react-select'

// Styles
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
    isMulti?: boolean
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
         isMulti,
         isDisabled,
         isSearchable
     }) => {
        return (
            <Select
                className='select-mini select-filter'
                classNamePrefix='select-mini'
                placeholder={placeholder}
                isClearable={true}
                onChange={onChange}
                options={options}
                isMulti={isMulti}
                value={value}
                isLoading={isLoading}
                isDisabled={isDisabled}
                name={name}
                isSearchable={isSearchable}
            />
        )
    }

export default SelectSearch
