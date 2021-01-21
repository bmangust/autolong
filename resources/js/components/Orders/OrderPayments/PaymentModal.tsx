// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Styles
import classes from './PaymentModal.module.css'

// Typescript
import {IPaymentHistory} from '../IOrders'

// Actions
import {paymentHandler} from '../../../store/actions/orders'

// App
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/Inputs/Input/Input'
import {floatRegExp} from '../../../utils'

type Props = {
    orderId: number
    activePayment?: IPaymentHistory | null
    isOpen: boolean
    setIsOpen: (boolean) => void
}

const PaymentModal: React.FC<Props> = (props) => {
    const {isOpen, setIsOpen, orderId, activePayment} = props
    const [paymentType, setPaymentType] = useState('')
    const [paymentAmount, setPaymentAmount] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (activePayment) {
            setPaymentType(activePayment.paymentType)
            setPaymentAmount(activePayment.paymentAmount)
        } else {
            setPaymentType('')
            setPaymentAmount(0)
        }
    }, [activePayment])

    const addPaymentHandler = () => {
        if (activePayment) {
            dispatch(paymentHandler(orderId, {paymentType, paymentAmount, id: activePayment.id}, 'edit'))
        } else {
            dispatch(paymentHandler(orderId, {paymentType, paymentAmount}, 'add'))
        }
        setIsOpen(false)
        setPaymentType('')
        setPaymentAmount(0)
    }

    const onChangeHandler = (e) => {
        const value = +e.target.value
        if (floatRegExp.test(String(value))) {
            setPaymentAmount(value)
        }
    }

    if (!isOpen) {
        return null
    }
    return <Modal
        size='size-600'
        isOpen={isOpen}
        title='Добавить оплату за заказ'
        setIsOpen={setIsOpen}>
        <div className="row">
            <Input
                value={paymentType}
                name='paymentType'
                placeholder='Тип оплаты'
                label='Тип оплаты'
                onChange={(e) => setPaymentType(e.target.value)}
            />
            <Input
                min='0'
                type='number'
                value={paymentAmount.toString()}
                name='paymentAmount'
                label='CNY'
                onChange={(e => onChangeHandler(e))}
            />
        </div>
        <div className={classes.btnGroup}>
            <button onClick={() => setIsOpen(false)} className={classes.cancel}>Отмена</button>
            <button onClick={() => addPaymentHandler()} className={classes.save}>Сохранить</button>
        </div>
    </Modal>
}

export default PaymentModal
