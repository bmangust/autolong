// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Typescript
import {IOrder} from '../../../../Orders/IOrders'

// Styles
import classes from './PaymentForm.module.css'

// Actions
import {setOrderPayment} from '../../../../../store/actions/containers'

// App
import {timeConverter, toFixed} from '../../../../../utils'
import Input from '../../../../UI/Inputs/Input/Input'

type Props = {
    order: IOrder
    setIsShow: (boolean) => void
    deliveryPriceOrder: number
}

const PaymentForm: React.FC<Props> = (props) => {
    const {order, setIsShow, deliveryPriceOrder} = props
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [paymentAmountRub, setPaymentAmountRub] = useState(0)
    const [surchargeAmount, setSurchargeAmount] = useState(0)
    const [surchargeAmountRub, setSurchargeAmountRub] = useState(0)
    const [refusalAmount, setRefusalAmount] = useState(0)
    const [orderingAmount, setOrderingAmount] = useState(0)
    const [customsAmount, setCustomsAmount] = useState(0)

    const dispatch = useDispatch()

    const submitForm = () => {
        const data = {
            deliveryPrice, paymentAmount, paymentAmountRub,
            surchargeAmount, surchargeAmountRub, refusalAmount,
            orderingAmount, customsAmount
        }
        dispatch(setOrderPayment(order.id, data))
    }

    useEffect(() => {
        setPaymentAmount(order.paymentAmount || 0)
        setPaymentAmountRub(order.paymentAmountRub || 0)
        setSurchargeAmount(order.surchargeAmount || 0)
        setSurchargeAmountRub(order.surchargeAmountRub || 0)
        setRefusalAmount(order.refusalAmount || 0)
        setOrderingAmount(order.orderingAmount || 0)
        setCustomsAmount(order.customsAmount || 0)
    }, [order])

    useEffect(() => {
        if (deliveryPriceOrder) {
            setDeliveryPrice(deliveryPriceOrder)
        }
    }, [deliveryPriceOrder])

    const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')

    const onChangeHandler = (e, code = 'cny') => {
        const value = +e.target.value
        const name = e.target.name
        if (floatRegExp.test(String(value))) {
            switch (name) {
                case 'paymentAmount':
                    if (code && code === 'rub') {
                        setPaymentAmountRub(value)
                    } else {
                        setPaymentAmount(value)
                    }
                    break
                case 'surchargeAmount':
                    if (code && code === 'rub') {
                        setSurchargeAmountRub(value)
                    } else {
                        setSurchargeAmount(value)
                    }
                    break
                case 'refusalAmount':
                    setRefusalAmount(value)
                    break
                case 'orderingAmount':
                    setOrderingAmount(value)
                    break
                case 'customsAmount':
                    setCustomsAmount(value)
                    break
            }
        }
    }

    const total = paymentAmount + surchargeAmount
    const totalRub = paymentAmountRub + surchargeAmountRub
    const additionalTotal = refusalAmount + orderingAmount + customsAmount

    return <>
        <div>
            <p className={classes.title}>Заказ {order.name} от {timeConverter(order.createdAt)}</p>
        </div>
        <div className={classes.block}>
            <p>Оплата (курс {paymentAmount > 0 ? (paymentAmountRub / paymentAmount).toFixed(
                3) : 'подсчет невозможен'})</p>
            <div className="row">
                <Input
                    type='number'
                    label='CNY'
                    min='0'
                    value={paymentAmount.toString()}
                    name='paymentAmount'
                    onChange={(e) => onChangeHandler(e)}
                />
                <Input
                    type='number'
                    label='Руб'
                    min='0'
                    value={paymentAmountRub.toString()}
                    onChange={(e) => onChangeHandler(e, 'rub')}
                    name='paymentAmount'
                />
            </div>
        </div>
        <div className={classes.block}>
            <p>Доплата (курс {surchargeAmount > 0 ? (surchargeAmountRub / surchargeAmount).toFixed(
                3) : 'подсчет невозможен'})</p>
            <div className="row">
                <Input
                    type='number'
                    label='CNY'
                    min='0'
                    value={surchargeAmount.toString()}
                    name='surchargeAmount'
                    onChange={(e) => onChangeHandler(e)}
                />
                <Input
                    type='number'
                    label='Руб'
                    min='0'
                    value={surchargeAmountRub.toString()}
                    onChange={(e) => onChangeHandler(e, 'rub')}
                    name='surchargeAmount'
                />
            </div>
        </div>
        <div className={classes.block}>
            <p>Доп.расходы (в рублях)</p>
            <div className="row">
                <Input
                    type='number'
                    label='Отказное'
                    min='0'
                    value={refusalAmount.toString()}
                    name='refusalAmount'
                    onChange={(e) => onChangeHandler(e)}
                />
                <Input
                    type='number'
                    label='Оформление'
                    min='0'
                    value={orderingAmount.toString()}
                    name='orderingAmount'
                    onChange={(e) => onChangeHandler(e)}
                />
                <Input
                    type='number'
                    label='Таможня'
                    min='0'
                    value={customsAmount.toString()}
                    name='customsAmount'
                    onChange={(e) => onChangeHandler(e)}
                />
            </div>
        </div>
        <div className={classes.total}>
            <p>
                <span>Итого стоимость товаров:</span>
                <span>
                    <b> {toFixed(total, 2)} ¥ </b>
                    {total > 0
                        ? `(${toFixed(totalRub, 2)} ₽ по курсу ${toFixed(totalRub / total, 2)})`
                        : null
                    }
                </span>
            </p>
            <p>
                <span>Стоимость оформления:</span>
                <span>
                   <b> {toFixed(additionalTotal, 2)} ₽ </b>
                    {additionalTotal > 0 && totalRub > 0
                        ? `(+${toFixed(additionalTotal / totalRub, 2)} ₽)`
                        : null
                    }
                </span>
            </p>
        </div>
        <div className={classes.footer}>
            <div className="row">
                <div className="col-lg-6">
                    <button
                        onClick={() => setIsShow(false)}
                        className='btn btn-light'>
                        Отмена
                    </button>
                </div>
                <div className="col-lg-6">
                    <button
                        onClick={() => submitForm()}
                        className='btn btn-success'>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default PaymentForm
