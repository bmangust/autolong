// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Settings.module.css'

// App
import SvgGeneralSettings
    from '../../components/UI/iconComponents/GeneralSettings'
import SvgRoleSettings from '../../components/UI/iconComponents/RoleSettings'
import SvgUsersSettings from '../../components/UI/iconComponents/UsersSettings'
// import SvgBackup from '../../components/UI/iconComponents/Backup'

const Settings: React.FC = () => {
    return (
        <div className='card'>
            <div className='card-body'>
                <div className={classes.link}>
                    <NavLink to='/settings/general'>
                        <SvgGeneralSettings/>
                        <p>Общие настройки</p>
                    </NavLink>
                </div>
                <div className={classes.link}>
                    <NavLink to='/settings/roles'>
                        <SvgRoleSettings/>
                        <p>Настроить права доступа</p>
                    </NavLink>
                </div>
                <div className={classes.link}>
                    <NavLink to='/settings/users'>
                        <SvgUsersSettings/>
                        <p>Пользователи</p>
                    </NavLink>
                </div>
                {/* <div className={classes.link}>*/}
                {/*    <NavLink to='/settings/backups'>*/}
                {/*        <SvgBackup/>*/}
                {/*        <p>Бекапы</p>*/}
                {/*    </NavLink>*/}
                {/* </div>*/}
            </div>
        </div>
    )
}

export default Settings
