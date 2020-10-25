// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'
import getSymbolFromCurrency from 'currency-symbol-map'
import {IProductPrice} from './components/Products/IProducts'

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
    const a = new Date(timestamp * 1000)
    const month = a.getMonth() + 1
    const year = a.getFullYear()
    const date = a.getDate()
    return `${date}.${month}.${year}`
}

/**
 * Map price object
 * @param price
 */
export function moneyFormatter(price: IProductPrice) {
    return (
        <span className="pricesBlock">
           {Object.entries(price).sort().map(([key, val]) => {
               return (
                   <span key={key}>
                   {Math.round(val)} {getSymbolFromCurrency(key)}
                   </span>
           )
           })}
        </span>
    )
}
