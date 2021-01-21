// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'
import getSymbolFromCurrency from 'currency-symbol-map'

// Typescript
import {ITag} from './components/Catalogs/ITags'
import {IProductPrice} from './components/Products/IProducts'

// App
import statuses from '../statuses/statuses.json'
import courses from '../courses/courses.json'

export function nameToLinkFormatter(name: string, row, page: string) {
    return (
        <NavLink to={`/${page}/${row.id}`}>{name}</NavLink>
    )
}

export function imgFormatter(
    img: any,
    row: any,
    alt: string,
    className = '',
    placeholder = '/imgs/placeholder-product-image.png') {
    return (
        row
            ? <img className={className} src={img || placeholder}
                   alt={row.nameRu}/>
            : <img className={className} src={img || placeholder}
                   alt={alt}/>
    )
}

/**
 * Substring string by value and length
 * @param value
 * @param length
 */
export function substringOut(value: string, length: number) {
    if (value.length > length) {
        return `${value.substring(0, length)}...`
    } else {
        return value
    }
}

export const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')

/**
 * Convert timestamp to m.d.Y by timestamp
 * @param timestamp
 * @param input
 */
export function timeConverter(timestamp, input = false) {
    const a = new Date(timestamp * 1000)
    const month = a.getMonth() + 1
    const year = a.getFullYear()
    const date = a.getDate()
    if (input) {
        return `${year}-${month}-${date}`
    }
    return `${date}.${month}.${year}`
}

/**
 * Map price object
 * @param price
 * @param without
 */
export function moneyFormatter(price: IProductPrice, without: string[] = []) {
    return (
        <span className="pricesBlock">
           {Object.entries(price)
               .sort()
               .map(([key, val]) => {
                   if (without.length && without.includes(key)) {
                       return false
                   }
                   return (
                       <span key={key}>
                       {val ? toLocaleNumber(parseFloat(val))
                           : toLocaleNumber(val)}
                           {getSymbolFromCurrency(key)}
                   </span>
                   )
               })}
        </span>
    )
}

export const toLocaleNumber = (val: number) => {
    return val.toLocaleString('ru-RU', {maximumFractionDigits: 2})
}

export function getOrderStatusName(key: string) {
    return statuses.orderStatuses[key]
}

export function getPaymentStatusName(key: string) {
    return statuses.paymentStatuses[key]
}

export function getContainerStatusName(key: string | undefined) {
    if (key) {
        return statuses.containerStatuses[key]
    }
}

/**
 * Currency conversion by amount and currency code
 * @param amount
 * @param currencyCode
 */
export function currencyConversion(amount: number, currencyCode: string) {
    const usdCourse = courses.usd
    const rubCourse = courses.rub
    const currency = {
        rub: 0, usd: 0, cny: 0
    }
    switch (currencyCode) {
        case 'cny': {
            currency.cny = amount
            currency.rub = +(amount * rubCourse).toFixed(2)
            currency.usd = +(amount * usdCourse).toFixed(2)
            break
        }
        case 'rub': {
            currency.cny = +(amount / rubCourse).toFixed(2)
            currency.rub = amount
            currency.usd = +(currency.cny * usdCourse).toFixed(2)
            break
        }
        case 'usd': {
            currency.cny = +(amount / usdCourse).toFixed(2)
            currency.rub = +(currency.cny * rubCourse).toFixed(2)
            currency.usd = amount
            break
        }
        default: {
            break
        }
    }
    return currency
}

/**
 * Create notification messages by title and description
 * @param title
 * @param desc
 */
export const createNotyMsg = (title: string, desc: string) => {
    return (
        <>
            <p className='Toastify__title'>{title}</p>
            <p className='Toastify__desc'>{desc}</p>
        </>
    )
}

/**
 * Tags converter to string
 * @param tags
 */
export const tagsConverter = (tags: ITag[]) => {
    return (
        tags.map((tag: ITag) => {
            return <span
                key={tag.id + tag.name}
                className='tag'>{tag.name}</span>
        })
    )
}

/**
 * Sort array of objects based on another array
 * key = undefined for entries sorting
 * @param array
 * @param order
 * @param key
 */
export const mapOrder = (
    array: [string, unknown][],
    order: string[],
    key = 0) => {
    array.sort((a, b) => {
        const A = a[key]
        const B = b[key]

        if (order.indexOf(A as string) > order.indexOf(B as string)) {
            return 1
        } else {
            return -1
        }
    })

    return array
}

/**
 * toFixed without rounding
 * @param num
 * @param fixed
 */
export const toFixed = (num, fixed) => {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return num.toString()
        .match(re)[0]
}
