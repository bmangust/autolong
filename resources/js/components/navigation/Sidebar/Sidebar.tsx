// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Sidebar.module.css'
import {routes} from '../router/routes'
import SvgHelp from '../../UI/iconComponents/Help'

const Sidebar: React.FC<{ isOpen: boolean }> = ({isOpen}) => {
    const renderLinks = (routes) => {
        return routes.map((route, index) =>
            !route.hide ? (
                <NavLink
                    key={index}
                    to={route.path}
                    className={classes.navLink}
                    activeClassName={classes.active}
                    exact={route.exact}
                >
                    {route.icon}
                    {route.name}
                </NavLink>
            ) : null
        )
    }

    const cls = [classes.sidebar]

    if (isOpen) {
        cls.push('show')
    }

    return (
        <nav className={cls.join(' ') + ' nav flex-column'}>
            <div className='w-100'>{renderLinks(routes)}</div>
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
