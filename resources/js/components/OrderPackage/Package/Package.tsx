// React
import React, {useCallback, useEffect, useState} from 'react'

// Styles
import classes from './Package.module.css'

// Typescript
import {IProduct} from '../../Products/IProducts'

// App
import {substringOut} from '../../../utils'
import SvgClose from '../../UI/iconComponents/Close'

interface IPackage {
    id: number
    name: string
    qty: number
    width: number
    height: number
    length: number
}

const Package: React.FC<{
    item: IProduct
    setData: Function
}> = (
    {item, setData}) => {
    const [packages, setPackages] = useState<IPackage[]>([])
    const [totalIn, setTotalIn] = useState<any>(0)
    const [isShow, setIsShow] = useState(true)

    const packageTemplate = {
        name: '',
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
        const PcsCtnCtns: {} = {}
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
        setData((oldDate: any) => {
            return Object.assign({}, oldDate, data)
        })
        setIsShow(false)
    }

    return isShow
        ? <div key={item.id} className={classes.item}>
            <div className={classes.itemHeader}>
                <p className={classes.itemTitle}>
                    {substringOut(item.nameRu, 40)}
                </p>
                <div className={classes.itemInfo}>
                    <div>
                        <span>Всего: </span>
                        {`${item.quantity} шт`}
                    </div>
                    <div>
                        <span>Осталось распределить: </span>
                        {`${+item.quantity - totalIn} шт`}
                    </div>
                    {/* {`Всего ${item.quantity}
                    осталось распределить ${+item.quantity - totalIn} шт.`} */}
                </div>
            </div>
            <div>
                {packages.map((pack: IPackage, index: number) => (
                    <div key={index} className={classes.package}>
                        <div className={classes.name}>
                            {pack.name}
                        </div>
                        <div className={classes.input}>
                            <label>Кол-во коробок</label>
                            <input onChange={(e) => onChangeHandler(e, pack.id)}
                                   type='number' name='qty'
                                   value={pack.qty}/>
                        </div>
                        <div className={classes.input}>
                            <label>Кол-во шт</label>
                            <input onChange={(e) => onChangeHandler(e, pack.id)}
                                   type='number' name='qty'
                                   value={pack.qty}/>
                        </div>
                        <div className={classes.input}>
                            <label>Длина</label>
                            <input onChange={(e) => onChangeHandler(e, pack.id)}
                                   type='number' name='length'
                                   value={pack.length}/>
                        </div>
                        <div className={classes.input}>
                            <label>Ширина</label>
                            <input onChange={(e) => onChangeHandler(e, pack.id)}
                                   type='number' name='width'
                                   value={pack.width}/>
                        </div>
                        <div className={classes.input}>
                            <label>Высота</label>
                            <input onChange={(e) => onChangeHandler(e, pack.id)}
                                   type='number' name='height'
                                   value={pack.height}/>
                        </div>
                        <div className={classes.close}>
                            <button>
                                <SvgClose width='10px'/>
                            </button>
                        </div>
                    </div>
                ))}
                <div className={classes.btns}>
                    {!(+item.quantity - totalIn)
                        ? <button className='btn btn-success'
                                  onClick={() => sendPackageHandler(item.id)}>
                            Добавить в упаковочный лист
                        </button>
                        : null
                    }
                    <button onClick={addPackageHandler}
                            disabled={!(+item.quantity - totalIn)}
                            className={
                                classes.btnAdd + ' btn btn-outline-dashed'
                            }>
                       + Добавить коробку
                    </button>
                </div>
            </div>
        </div>
        : null
}

export default Package
