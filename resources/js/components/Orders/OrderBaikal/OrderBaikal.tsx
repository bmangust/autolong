// React
import React, {useState} from 'react'

// Third-party
import axios from 'axios'
import {toast} from 'react-toastify'

// Styles
import classes from './OrderBaikal.module.css'

// App
import SvgBaikalStart from '../../UI/iconComponents/BaikalStart'

type Props = {
    baikalTrackerLink: string | null
    baikalTrackerHistory: { date: string, text: string }[]
}

const OrderBaikal: React.FC<Props> = (props) => {
    const {baikalTrackerLink, baikalTrackerHistory} = props
    const [baikalId, setBaikalId] = useState('')

    console.log(baikalTrackerLink)
    console.log(baikalTrackerHistory)

    const onChangeHandler = (e) => {
        const value = e.target.value
        if (value) {
            setBaikalId(value)
        }
    }

    const onClickHandler = () => {
        axios.post('/api/orders/checkbaikalstatus', {baikalId})
            .then(({data}) => {
                toast.success(`${baikalId} Идентификатор сохранен`)
            })
    }

    return <div className='col-lg-4'>
        <div className='card card-body-info'>
            <p className={classes.title}>
                TRACKING
            </p>
            <p>Введите идентификатор груза от сервиса BAIKAL</p>
            <SvgBaikalStart/>
            <input
                value={baikalId}
                onChange={(e) => onChangeHandler(e)}
                placeholder='Н-р: V16574-8'
                type="text"/>
            <button onClick={() => onClickHandler()}>Подтвердить</button>
        </div>
    </div>
}

export default OrderBaikal
