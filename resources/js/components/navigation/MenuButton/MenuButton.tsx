// React
import React from 'react'
// Style
import classes from './MenuButton.module.css'

const MenuButton: React.FC = () => {

    function openMenu() {
        setOpen(!open)
    }

    return (
        <button className={classes.burger} open={open} onClick={openMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}
export default MenuButton
