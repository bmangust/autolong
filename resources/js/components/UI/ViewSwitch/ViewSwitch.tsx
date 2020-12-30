// React
import React from 'react'

// Third-party
import ReactTooltip from 'react-tooltip'

// Styles
import classes from './ViewSwitch.module.css'

// App
import SvgViewList from '../iconComponents/ViewList'
import SvgViewCells from '../iconComponents/ViewCells'

type Props = {
    activeItem: number
    setActiveItem: (number) => void
}

const ViewSwitch: React.FC<Props> = (props) => {
    const {activeItem, setActiveItem} = props

    return <div className={classes.switches}>
        <SvgViewList
            data-tip="Показать списком"
            className={activeItem === 0 ? classes.active : ''}
            onClick={() => setActiveItem(0)}
        />
        <SvgViewCells
            data-tip="Показать расчет"
            className={activeItem === 1 ? classes.active : ''}
            onClick={() => setActiveItem(1)}
        />
        <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
}

export default ViewSwitch
