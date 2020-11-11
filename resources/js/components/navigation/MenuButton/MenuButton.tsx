// React
import React from 'react'

// Style
import classes from './MenuButton.module.css'

const MenuButton: React.FC<{isOpen: boolean; setIsOpen: Function}> = ({
    isOpen,
    setIsOpen
}) => {
    function openMenu() {
        setIsOpen(!isOpen)
    }

    const cls = [classes.burger]
    if (isOpen) {
        cls.push('show')
    }

    return (
        <button className={cls.join(' ')} onClick={openMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}
export default MenuButton
