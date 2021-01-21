// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Typescript
import {IOrder, IPaymentHistory} from '../../../../Orders/IOrders'

// Styles
import classes from './PaymentForm.module.css'

// Actions
import {setOrderPayment} from '../../../../../store/actions/containers'

// App
import {floatRegExp, timeConverter, toFixed} from '../../../../../utils'
import Input from '../../../../UI/Inputs/Input/Input'

type Props = {
    order: IOrder
    setIsShow: (boolean) => void
    deliveryPriceOrder: number
}

const PaymentForm: React.FC<Props> = (props) => {
    const {order, setIsShow, deliveryPriceOrder} = props
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const [refusalAmount, setRefusalAmount] = useState(0)
    const [orderingAmount, setOrderingAmount] = useState(0)
    const [customsAmount, setCustomsAmount] = useState(0)
    const [paymentHistory, setPaymentHistory] = useState<IPaymentHistory[]>([])

    const dispatch = useDispatch()

    const submitForm = () => {
        const data = {
            deliveryPrice, refusalAmount, paymentHistory,
            orderingAmount, customsAmount
        }
        dispatch(setOrderPayment(order.id, data))
    }

    useEffect(() => {
        setRefusalAmount(order.refusalAmount || 0)
        setOrderingAmount(order.orderingAmount || 0)
        setCustomsAmount(order.customsAmount || 0)
        setPaymentHistory(order.paymentHistory)
    }, [order])

    useEffect(() => {
        if (deliveryPriceOrder) {
            setDeliveryPrice(deliveryPriceOrder)
        }
    }, [deliveryPriceOrder])

    const onChangeHandler = (e) => {
        const value = +e.target.value
        const name = e.target.name
        const dataId = e.target.dataset.id
        if (floatRegExp.test(String(value))) {
            if (dataId) {
                setPaymentHistory((prevState) => {
                    const data = prevState
                    data.map((item) => {
                        if (item.id === dataId) {
                            item.paymentAmountRub = value
                        }
                    })
                    return [...data]
                })
            }
            switch (name) {
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

    const total = order.totalPaymentHistory
    const totalRub = paymentHistory.reduce((acc, payment) => acc + payment.paymentAmountRub, 0)
    const additionalTotal = refusalAmount + orderingAmount + customsAmount

    return <>
        <div>
            <p className={classes.title}>Заказ {order.name} от {timeConverter(order.createdAt)}</p>
        </div>
        {paymentHistory.map((payment) => {
            return <div key={payment.id} className={classes.block}>
                <p>{payment.paymentType} от {timeConverter(payment.updatedAt)}</p>
                <div className="row">
                    <Input
                        type='number'
                        error={payment.paymentAmountRub === 0}
                        helperText='*Укажите рублевый эквивалент платежа'
                        label='Руб'
                        data-id={payment.id}
                        min='0'
                        value={payment.paymentAmountRub.toString()}
                        name={payment.paymentType}
                        onChange={(e) => onChangeHandler(e)}
                    />
                    <div className={'col-lg-6 col-12 ' + classes.cnyBlock}>
                        <label>
                            CNY
                        </label>
                        <p className={classes.cny}>{payment.paymentAmount}</p>
                    </div>
                </div>
            </div>
        })}

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
