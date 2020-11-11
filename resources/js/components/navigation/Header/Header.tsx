// React
import React, {useState} from 'react'

// Styles
import classes from './Header.module.css'
import {useLocation} from 'react-router-dom'
import MenuButton from '../MenuButton/MenuButton'

const Header: React.FC = () => {
    const [pageName, setPageName]: any = useState('')
    const location = useLocation()
    // @todo Оптимизировать
    setTimeout(() => {
        return setPageName(location.state)
    }, 0)

    return (
        <>
            <div className={classes.header}>
                <div>
                    <h1>{pageName}</h1>
                </div>
                <div className='d-flex'>
                    <span className={classes.HeaderBlockUserPic}>И</span>
                    <div className={classes.HeaderBlockUserNameRole}>
                        <span className={classes.HeaderBlockUserName}>
                            Иванов И.И.
                        </span>
                        <span className={classes.HeaderBlockUserRole}>
                            Администратор
                        </span>
                    </div>
                    <MenuButton open={open} setOpen={setOpen} />
                </div>
            </div>
        </>
    )
}

export default Header
