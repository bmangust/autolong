// React
import React from 'react'

const Form: React.FC<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> = props => {
    const {children, ...restProps} = props
    return <form noValidate {...restProps}>{children}</form>
}

export default Form
