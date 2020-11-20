// React
import React, {ReactNode} from 'react'

// Third-party
import ReactDOM from 'react-dom'

// Styles
import classes from './Modal.module.css'

interface IModal {
    title: string
    isOpen: boolean
    setIsOpen: Function
    onSuccessNode?: NonNullable<ReactNode>
    onCloseNode?: NonNullable<ReactNode>
    onClose?: () => void
}

const Modal: React.FC<IModal> = (
    {
        title,
        isOpen,
        setIsOpen,
        onSuccessNode,
        onClose,
        onCloseNode,
        children
    }) => {
    const cls = [classes.backDrop]

    const closeHandler = () => {
        setIsOpen(false)
    }

    if (isOpen) {
        cls.push(classes.show)
    }

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <>
            <div className={classes.modal}>
                <div className={classes.modalDialog}>
                    <div className={classes.modalContent}>
                        <div onClick={() => closeHandler()}
                             className={classes.modalClose}>
                            &times;
                        </div>
                        <div className={classes.modalBody}>
                            <h2 className='mb-3'>{title}</h2>
                            {children}
                            {onSuccessNode ? onSuccessNode : null}
                            {onCloseNode ? onCloseNode : onClose}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.join(' ')}/>
        </>,
        document.body
    )
}

export default Modal
