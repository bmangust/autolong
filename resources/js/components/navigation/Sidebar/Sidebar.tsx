// React
import React, {useContext} from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Sidebar.module.css'

// App
import {routes} from '../router/routes'
import SvgHelp from '../../UI/iconComponents/Help'
import SvgLogout from '../../UI/iconComponents/Logout'
import {SanctumContext} from '../../../Sanctum'

const Sidebar: React.FC<{ isOpen: boolean; setIsOpen: Function }> = (
    {
        isOpen,
        setIsOpen
    }) => {
    const onHideMenuHandler = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    const {user} = useContext(SanctumContext)

    const renderLinks = (routes) => {
        return routes.map((route, index) => {
                const checker = (!('access' in route) && !route.access?.length)
                    || route.access?.map(access =>
                        user?.role.accesses[access] == 1).every(i => i === true)
                const isShow = user && checker

                return isShow
                    ? !route.hide
                        ? <NavLink
                            onClick={onHideMenuHandler}
                            key={index}
                            to={route.path}
                            className={classes.navLink}
                            activeClassName={classes.active}
                            exact={route.exact}>
                            {route.icon}
                            {route.name}
                        </NavLink>
                        : null
                    : null
            }
        )
    }

    const {signOut} = useContext(SanctumContext)

    const onLogoutHandler = () => {
        if (signOut) {
            signOut()
        }
    }

    const cls = [classes.sidebar]

    if (isOpen) {
        cls.push(classes.show)
    }

    return (
        <nav className={cls.join(' ') + ' nav flex-column'}>
            <div className='w-100'>
                {renderLinks(routes)}
                <NavLink
                    className={classes.navLink}
                    activeClassName={classes.active}
                    onClick={onLogoutHandler}
                    to='/logout'>
                    <SvgLogout/>
                    Выход
                </NavLink>
            </div>
            <NavLink className={classes.help} to='/help'>
                <SvgHelp/>
                <span>
                    Справка по работе <br/>с системой
                </span>
            </NavLink>
        </nav>
    )
}

export default Sidebar
