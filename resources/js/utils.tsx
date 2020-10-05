// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

export function nameToLinkFormatter(name, row, page) {
    return (
        <NavLink to={`/${page}/${row.id}`}>{name}</NavLink>
    )
}

export function imgFormatter(img, row, placeholder) {
    return (
        <img src={img || placeholder}
             alt={row.nameRu}/>
    )
}

/**
 * Substring string by value and length
 * @param value
 * @param length
 */
export function substringOut(value, length) {
    if (value.length > length) {
        return `${value.substring(0, length)}...`
    } else {
        return value
    }
}

/**
 * Convert timestamp to m.d.Y by timestamp
 * @param timestamp
 */
export function timeConverter(timestamp) {
    const nowDate = new Date(timestamp * 1000)
    const month = nowDate.getMonth() + 1
    const year = nowDate.getFullYear()
    const date = nowDate.getDate()
    return `${date}.${month}.${year}`
}

/**
 * Map price object
 * @param price
 */
export function moneyFormatter(price) {
    return (
        <span>
           {Object.entries(price).map(([_, val]) => {
               return val + ' | '
           })}
        </span>
    )
}
