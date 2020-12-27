// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Actions
import {checkBaikalStatus, deleteBaikalId} from '../../../store/actions/orders'

// Styles
import classes from './OrderBaikal.module.css'

// App
import SvgBaikalStart from '../../UI/iconComponents/BaikalStart'
import SvgBaikalEmpty from '../../UI/iconComponents/BaikalEmpty'


type Props = {
    baikalTrackerLink: string | null
    baikalTrackerHistory: { date: string, text: string }[]
    orderId: number
}

const OrderBaikal: React.FC<Props> = (props) => {
    const {baikalTrackerLink, baikalTrackerHistory, orderId} = props
    const [baikalId, setBaikalId] = useState('')
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        const value = e.target.value
        if (value) {
            setBaikalId(value)
        }
    }

    const cancelTracking = () => {
        dispatch(deleteBaikalId(orderId))
    }

    const onClickHandler = () => {
        dispatch(checkBaikalStatus(baikalId, orderId))
    }

    let content = <>
        <p className={classes.text}>Введите идентификатор груза от сервиса BAIKAL</p>
        <SvgBaikalStart/>
        <input
            value={baikalId}
            onChange={(e) => onChangeHandler(e)}
            placeholder='Н-р: V16574-8'
            type="text"/>
        <button className='btn btn-success' onClick={() => onClickHandler()}>Подтвердить</button>
    </>

    if (baikalTrackerLink && baikalTrackerHistory.length === 0) {
        content = <>
            <p className={classes.track}>Идентификатор {baikalTrackerLink}</p>
            <span className={classes.cancel} onClick={() => cancelTracking()}>Отменить отслеживание</span>
            <SvgBaikalEmpty/>
            <p className={classes.status}>Ожидаем подгрузку событий</p>
        </>
    }

    if (baikalTrackerLink && baikalTrackerHistory.length !== 0) {
        content = <>
            <p className={classes.track}>Идентификатор {baikalTrackerLink}</p>
            <span className={classes.cancel} onClick={() => cancelTracking()}>Отменить отслеживание</span>
            <ul className={classes.list}>
                {baikalTrackerHistory.map(({date, text}) => {
                    return <li key={date + text}>
                        <p className={classes.date}>{date}</p>
                        <p>text</p>
                    </li>
                })}
            </ul>
        </>
    }

    return <div className='col-lg-4'>
        <div className={classes.card}>
            <p className={classes.title}>
                TRACKING
            </p>
            {content}
        </div>
    </div>
}

export default OrderBaikal
