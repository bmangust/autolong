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
    orderId?: number
    isContainer?: boolean
}

const OrderBaikal: React.FC<Props> = (props) => {
    const {baikalTrackerLink, baikalTrackerHistory, orderId, isContainer = false} = props
    const [baikalId, setBaikalId] = useState('')
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        const value = e.target.value
        setBaikalId(value)
    }

    const cancelTracking = () => {
        dispatch(deleteBaikalId(orderId))
    }

    const onClickHandler = () => {
	    let order_id = window.location.pathname.replace('/container/','')
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
        const url = new URL(baikalTrackerLink)
        const id = url.searchParams.get('id')
        content = <>
            <p className={classes.track}>Идентификатор {id}</p>
            {isContainer
                ? null
                : <span className={classes.cancel} onClick={() => cancelTracking()}>Отменить отслеживание</span>
            }
            <SvgBaikalEmpty/>
            <p className={classes.status}>Ожидаем подгрузку событий</p>
        </>
    }

    if (baikalTrackerLink && baikalTrackerHistory.length !== 0) {
        const url = new URL(baikalTrackerLink)
        const id = url.searchParams.get('id')
        
        content = <>
            <p className={classes.track}>Код: {baikalTrackerLink.replace('https://tms.baikalasia.com/selectBaikalasiaE.aspx?CNum=','')}</p>
            <p className={classes.track}>Идентификатор {id}</p>
            {isContainer
                ? null
                : <span className={classes.cancel} onClick={() => cancelTracking()}>Отменить отслеживание</span>
            }
            <ul className={classes.list}>
                {[...baikalTrackerHistory].reverse()
                    .map(({date, text}) => {
                        return <li key={date + text}>
                            <p className={classes.date}>{date}</p>
                            <p>{text}</p>
                        </li>
                    })}
            </ul>
        </>
    }

    return <div className={classes.card}>
        <p className={classes.title}>
            TRACKING
        </p>
        {content}
    </div>
}

export default OrderBaikal
