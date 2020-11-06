// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'
import SvgHelp from '../../UI/iconComponents/Help'

// Styles
import classes from './Sidebar.module.css'
import {routes} from '../router/routes'

const Sidebar: React.FC = () => {
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
    return (
        <nav className={classes.sidebar + ' nav flex-column'}>
            <div className='w-100'>{renderLinks(routes)}</div>
            <NavLink className={classes.help} to='/help'>
                <SvgHelp />
                <span>
                    Справка по работе <br />с системой
                </span>
            </NavLink>
        </nav>
    )
}

export default Sidebar
