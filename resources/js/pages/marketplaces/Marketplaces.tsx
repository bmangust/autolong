// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Marketplaces.module.css'

// App
import SvgGeneralSettings
    from '../../components/UI/iconComponents/GeneralSettings'

const Marketplaces: React.FC = () => {
    return (
        <div className='card'>
            <div className='card-body'>
                <div className={classes.link}>
                    <NavLink to='/marketplaces/ozon/goods/stocks'>
                        <SvgGeneralSettings/>
                        <p>OZON: товарный остаток</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Marketplaces
