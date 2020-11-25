// React
import React, {useContext, useEffect, useState} from 'react'

// Styles
import classes from './Header.module.css'
import {useLocation} from 'react-router-dom'
import MenuButton from '../MenuButton/MenuButton'
import {SanctumContext} from '../../../Sanctum'

const Header: React.FC<{ isOpen: boolean, setIsOpen: Function }> = (
    {isOpen, setIsOpen}) => {
    const location = useLocation()

    const [pageName, setPageName]: any = useState('')

    useEffect(() => {
        setPageName(location.state)
    }, [location])

    const {user} = useContext(SanctumContext)

    const roleName = user ? user.role.name : ''
    const fullName = user
        ? `${user.lastname}
            ${user.name && user.name.charAt(0)}.
            ${user.patronymic && user.patronymic.charAt(0)}.`
        : ''
    const firstLetter = user && user.lastname.charAt(0)

    return (
        <>
            <div className={classes.header}>
                <div>
                    <h1>{pageName}</h1>
                </div>
                <div className='d-flex'>
                    <span className={classes.HeaderBlockUserPic}>
                        {firstLetter}
                    </span>
                    <div className={classes.HeaderBlockUserNameRole}>
                        <span className={classes.HeaderBlockUserName}>
                            {fullName}
                        </span>
                        <span className={classes.HeaderBlockUserRole}>
                            {roleName}
                        </span>
                    </div>
                    <MenuButton isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>
            </div>
        </>
    )
}

export default Header
