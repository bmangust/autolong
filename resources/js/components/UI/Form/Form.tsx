// React
import React from 'react'

const Form: React.FC = ({children, ...props}) => {
    return <form noValidate {...props}>{children}</form>
}

export default Form
