// React
import React from 'react'

// Style
import classes from './MenuButton.module.css'

const MenuButton: React.FC<{ isOpen: boolean, setIsOpen: Function }> =
    ({isOpen, setIsOpen}) => {
        function openMenu() {
            setIsOpen(!isOpen)
        }

        return (
            <button className={classes.burger} onClick={openMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        )
    }
export default MenuButton
