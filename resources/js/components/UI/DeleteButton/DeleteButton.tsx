// React
import React, {useState} from 'react'

// Styles
import classes from './DeleteButton.module.css'

// App
import Modal from '../Modal/Modal'
import SvgDeleteModal from '../iconComponents/DeleteModal'
import SvgDelete from '../iconComponents/Delete'

type Props = {
    deleteFn: () => void
    name: string
    buttonStyle?: 'default' | 'link' | 'old'
}

const DeleteButton: React.FC<Props> = (props) => {
    const {deleteFn, name, buttonStyle = 'old', children} = props
    const [isOpen, setIsOpen] = useState(false)

    const cls = [classes.btn]

    cls.push(classes[buttonStyle])

    return <>
        <button onClick={() => setIsOpen(true)} className={cls.join(' ')}>
            {buttonStyle === 'default' ? <SvgDelete/> : ''}
            {children}
        </button>
        {isOpen
            ? <Modal
                size='size-600'
                isOpen={isOpen}
                setIsOpen={setIsOpen}>
                <p className={classes.title}>Вы уверены?</p>
                <p className={classes.subtitle}>Вы действительно хотите <b>удалить</b> {name} из системы? </p>
                <SvgDeleteModal className={classes.svg}/>
                <div className={classes.btnGroup}>
                    <button onClick={() => setIsOpen(false)} className={classes.cancel}>Отмена</button>
                    <button onClick={() => deleteFn()} className={classes.success}>Удалить</button>
                </div>
            </Modal>
            : null
        }
    </>
}

export default DeleteButton
