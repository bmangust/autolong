// React
import React, {ReactNode} from 'react'

// Third-party
import ReactDOM from 'react-dom'

// Styles
import classes from './Modal.module.css'

interface IModal {
    title?: string
    isOpen: boolean
    setIsOpen: Function
    onSuccessNode?: NonNullable<ReactNode>
    onCloseNode?: NonNullable<ReactNode>
    onClose?: () => void
    size?: string
}

const Modal: React.FC<IModal> = (
    {
        title,
        isOpen,
        setIsOpen,
        onSuccessNode,
        onClose,
        onCloseNode,
        children,
        size
    }) => {
    const cls = [classes.backDrop]
    const clsModal = [classes.modalDialog]

    const closeHandler = () => {
        setIsOpen(false)
    }

    if (isOpen) {
        cls.push(classes.show)
    }

    if (size) {
        clsModal.push(classes[size])
    }

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <>
            <div className={classes.modal}>
                <div className={clsModal.join(' ')}>
                    <div className={classes.modalContent}>
                        <div onClick={() => closeHandler()}
                             className={classes.modalClose}>
                            &times;
                        </div>
                        <div className={classes.modalBody}>
                            {title
                                ? <h2 className='mb-3'>{title}</h2>
                                : null
                            }
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
