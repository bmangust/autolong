// React
import React, {useEffect, useState, useCallback} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Styles
import classes from './Package.module.css'

// Typescript
import {IProduct} from '../../Products/IProducts'

// Actions
import {createOrderInvoice} from '../../../store/actions/orders'

// App
import {substringOut} from '../../../utils'

interface IPackage {
    id: number
    name: string
    qty: number
    width: number
    height: number
    length: number
}

const Package: React.FC<{ item: IProduct, orderId: number }> = (
    {item, orderId}) => {
    const [packages, setPackages] = useState<IPackage[]>([])
    const [totalIn, setTotalIn] = useState<any>(0)
    const dispatch = useDispatch()

    const packageTemplate = {
        name: 'Коробка',
        id: 1,
        qty: 1,
        width: 0,
        height: 0,
        length: 0
    }

    const addPackageHandler = () => {
        const newPackage = packageTemplate
        newPackage.name = `${newPackage.name} ${packages.length + 1}`
        newPackage.id = packages.length + 1
        setPackages(oldState => [...oldState, newPackage])
    }

    const updateTotal = useCallback(() => {
        let total = 0
        packages.map(({qty}) => {
            total += qty
        })
        setTotalIn(total)
    }, [packages])

    useEffect(() => {
        updateTotal()
    }, [updateTotal])

    const onChangeHandler = (e, id) => {
        const name = e.target.name
        const value = +e.target.value
        const qty = +item.quantity - totalIn
        if (name === 'qty' && qty - value >= -1 || name !== 'qty') {
            const newItems = packages.map((el) =>
                el.id === id ? {...el, [name]: value} : el
            )
            setPackages(newItems)
        }
    }

    const sendPackageHandler = (id) => {
        const PcsCtnCtns: { number: number } = {}
        const meas: { length: number, width: number, height: number } = {}
        packages.map((pack) => {
            PcsCtnCtns[pack.id] = pack.qty
            meas.length = pack.length
            meas.height = pack.height
            meas.width = pack.width
        })
        const data = {
            [id]: {
                PcsCtnCtns,
                meas
            }
        }
        dispatch(createOrderInvoice(orderId, data, 'packinglist'))
    }

    return <div key={item.id} className={classes.item}>
        <div className={classes.itemHeader}>
            <p>{substringOut(item.nameRu, 40)}</p>
            <p>{`Всего ${item.quantity}
                    осталось распределить ${+item.quantity - totalIn} шт.`}</p>
        </div>
        <div>
            {packages.map((pack: IPackage, index: number) => (
                <div key={index} className={classes.package}>
                    <div className={classes.name}>
                        {pack.name}
                    </div>
                    <div className={classes.input}>
                        <input onChange={(e) => onChangeHandler(e, pack.id)}
                               type='number' name='qty'
                               value={pack.qty}/>
                    </div>
                    <div className={classes.input}>
                        <input onChange={(e) => onChangeHandler(e, pack.id)}
                               type='number' name='length'
                               value={pack.length}/>
                    </div>
                    <div className={classes.input}>
                        <input onChange={(e) => onChangeHandler(e, pack.id)}
                               type='number' name='width'
                               value={pack.width}/>
                    </div>
                    <div className={classes.input}>
                        <input onChange={(e) => onChangeHandler(e, pack.id)}
                               type='number' name='height'
                               value={pack.height}/>
                    </div>
                </div>
            ))}
            {!(+item.quantity - totalIn)
                ? <button className='btn btn-success mb-3'
                          onClick={() => sendPackageHandler(item.id)}>
                    Отправить упаковку
                </button>
                : null
            }
            <button onClick={addPackageHandler}
                    disabled={!(+item.quantity - totalIn)}
                    className='btn btn-outline-dashed'>
                Добавить упаковку
            </button>
        </div>
    </div>
}

export default Package
