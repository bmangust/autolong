// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {IOrder} from '../IOrders'

// Actions
import {changeOrderStatus} from '../../../store/actions/orders'

// App
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import SandboxFilesCard from '../../SandboxCard/SandboxFilesCard'

const OrderPayment: React.FC<{ order: IOrder }> = ({order}) => {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const [paymentAmount, setPaymentAmount] = useState(() => {
        return (order && 'paymentAmount' in order)
            ? order.paymentAmount || 0
            : 0
    })
    const [surchargeAmount, setSurchargeAmount] = useState(() => {
        return (order && 'surchargeAmount' in order)
            ? order.surchargeAmount || 0
            : 0
    })
    const changePaymentStatus = handleSubmit((formValues) => {
        formValues.statusPayment = order.statusPayment
        dispatch(changeOrderStatus(order.id, formValues))
    })

    const returnPaymentHandler = (statusPayment) => {
        dispatch(changeOrderStatus(order.id,
            {statusPayment}))
    }

    const paymentAmountHandler = (e) => {
        setPaymentAmount(e.target.value)
    }

    const surchargeAmountHandler = (e) => {
        setSurchargeAmount(e.target.value)
    }

    let paymentContent

    switch (order.statusPayment) {
        case 'paymentAwaiting': {
            paymentContent = <>
                <hr className='m-0'/>
                <Form className='mb-4'
                      onSubmit={changePaymentStatus}>
                    <div className='row'>
                        <Input
                            id='paymentAmount'
                            type='number'
                            label='Укажите сумму оплаты ¥'
                            ref={register}
                            onChange={paymentAmountHandler}
                            name='paymentAmount'
                        />
                        <Input
                            id='surchargeAmount'
                            type='number'
                            label='* Укажите сумму доплаты ¥'
                            ref={register}
                            onChange={surchargeAmountHandler}
                            name='surchargeAmount'
                        />
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label>Оплачено</label>
                            <h2 className='m-0'>
                                {Math.round(
                                    paymentAmount / +order.price.cny
                                    * 100)} %
                                {surchargeAmount
                                    ? ` + ${surchargeAmount} ¥`
                                    : null
                                }
                            </h2>
                        </div>
                        <div className='col-6 m-auto'>
                            <SandboxFilesCard
                                id={order.id}
                                isCheck={true}
                                isShowFiles={false}
                                label='+ Добавить чек'
                                sandboxFiles={
                                    order.sandboxFiles
                                }
                                page='orders'/>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-link'>
                        Подтвердить оплату
                    </button>
                </Form>
            </>
            break
        }
        case 'paymentPrepaymentMade': {
            paymentContent = <>
                <hr className='m-0'/>
                <Form className='mb-4'
                      onSubmit={changePaymentStatus}>
                    <div className='row'>
                        <Input
                            id='paymentAmount'
                            type='number'
                            label='Укажите сумму оплаты ¥'
                            ref={register}
                            onChange={paymentAmountHandler}
                            name='paymentAmount'
                        />
                        <Input
                            id='surchargeAmount'
                            type='number'
                            label='* Укажите сумму доплаты ¥'
                            ref={register}
                            onChange={surchargeAmountHandler}
                            name='surchargeAmount'
                        />
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label>Оплачено</label>
                            <h2 className='m-0'>
                                {Math.round(
                                    paymentAmount / +order.price.cny
                                    * 100)} %
                                {surchargeAmount
                                    ? ` + ${surchargeAmount} ¥`
                                    : null
                                }
                            </h2>
                        </div>
                        <div className='col-6 m-auto'>
                            <SandboxFilesCard
                                id={order.id}
                                isCheck={true}
                                isShowFiles={false}
                                label='+ Добавить чек'
                                sandboxFiles={
                                    order.sandboxFiles
                                }
                                page='orders'/>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-link'>
                        Подтвердить полную оплату
                    </button>
                    <button
                        type='button'
                        onClick={() =>
                            returnPaymentHandler('paymentAwaitingRefund')}
                        className='btn btn-link'>
                        Возврат оплаты
                    </button>
                </Form>
            </>
            break
        }
        case 'paymentAwaitingRefund': {
            paymentContent = <>
                <hr className='m-0'/>
                <button
                    onClick={() => returnPaymentHandler('paymentRefunded')}
                    className='btn btn-link'>
                    Подтвердить возврат оплаты
                </button>
            </>
            break
        }
        case 'paymentPaidInFull': {
            paymentContent = <>
                <h2>Заказ оплачен полностью</h2>
            </>
            break
        }
        case 'paymentRefunded': {
            paymentContent = <>
                <h2>Оплата заказа возвращена полностью</h2>
            </>
            break
        }
        default:
            paymentContent = null
    }

    return paymentContent
}

export default OrderPayment
