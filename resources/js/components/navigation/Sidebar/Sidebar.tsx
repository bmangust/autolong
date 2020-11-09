// React
import React, {useState} from 'react'

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

    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className={classes.burger}
                open={open}
                onClick={() => setOpen(!open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={classes.sidebar + ' nav flex-column'} open={open}>
                <div className='w-100'>{renderLinks(routes)}</div>
                <NavLink className={classes.help} to='/help'>
                    <SvgHelp />
                    <span>
                        Справка по работе <br />с системой
                    </span>
                </NavLink>
            </nav>
        </>
    )
}

export default Sidebar
