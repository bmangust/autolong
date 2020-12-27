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
import PaymentHistory from '../PaymentHistory/PaymentHistory'

type Props = {
    order: IOrder
}

const OrderPayment: React.FC<Props> = (props) => {
    const {order} = props
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            paymentAmount: order.paymentAmount,
            surchargeAmount: order.surchargeAmount || 0
        }
    })

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
        dispatch(changeOrderStatus(order.id, {statusPayment}))
    }

    const paymentAmountHandler = (e) => {
        setPaymentAmount(e.target.value)
    }

    const surchargeAmountHandler = (e) => {
        setSurchargeAmount(e.target.value)
    }

    const orderPaymentAmount = order.paymentAmount || 0

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
                                {Math.round((orderPaymentAmount + +paymentAmount) / +order.price.cny * 100)} %
                                {surchargeAmount ? ` + ${surchargeAmount} ¥` : null}
                            </h2>
                        </div>
                        <div className='col-6 m-auto'>
                            <SandboxFilesCard
                                id={order.id}
                                isCheck={true}
                                isShowFiles={false}
                                label='+ Добавить чек'
                                sandboxFiles={order.sandboxFiles}
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
        case 'paymentPaidFor': {
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
                                {Math.round((orderPaymentAmount + +paymentAmount) / +order.price.cny * 100)} %
                                {surchargeAmount ? ` + ${surchargeAmount} ¥` : null}
                            </h2>
                        </div>
                        <div className='col-6 m-auto'>
                            <SandboxFilesCard
                                id={order.id}
                                isCheck={true}
                                isShowFiles={false}
                                label='+ Добавить чек'
                                sandboxFiles={order.sandboxFiles}
                                page='orders'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                            <button
                                type='submit'
                                className='btn btn-link'>
                                Подтвердить предоплату
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                type='button'
                                onClick={() => returnPaymentHandler('paymentAwaitingRefund')}
                                className='btn btn-link btn-refund'>
                                Возврат оплаты
                            </button>
                        </div>
                    </div>
                </Form>
            </>
            break
        }
        case 'paymentPrepaymentMade': {
            paymentContent = <>
                <hr className='m-0'/>
                <Form className='mb-4' onSubmit={changePaymentStatus}>
                    <div className='row mb-3 mt-2'>
                        <div className='col-6'>
                            <label>Оплачено</label>
                            <h2 className='m-0'>
                                {Math.round(orderPaymentAmount / +order.price.cny * 100)} %
                                {surchargeAmount ? ` + ${surchargeAmount} ¥` : null}
                            </h2>
                        </div>
                        <div className='col-6 m-auto'>
                            <SandboxFilesCard
                                id={order.id}
                                isCheck={true}
                                isShowFiles={false}
                                label='+ Добавить чек'
                                sandboxFiles={order.sandboxFiles}
                                page='orders'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                            <button
                                type='submit'
                                className='btn btn-link'>
                                Подтвердить полную оплату
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                type='button'
                                onClick={() => returnPaymentHandler('paymentAwaitingRefund')}
                                className='btn btn-link btn-refund'>
                                Возврат оплаты
                            </button>
                        </div>
                    </div>
                </Form>
            </>
            break
        }
        case 'paymentAwaitingRefund': {
            paymentContent = <>
                <hr className='m-0'/>
                <button
                    onClick={() => returnPaymentHandler('paymentRefunded')}
                    className='btn btn-link mb-4 mt-3'>
                    Подтвердить возврат оплаты
                </button>
            </>
            break
        }
        case 'paymentPaidInFull': {
            paymentContent = <>
                <hr className='m-0'/>
                <h2 className='mb-4 pt-3'>
                    Заказ оплачен полностью
                </h2>
            </>
            break
        }
        case 'paymentRefunded': {
            paymentContent = <>
                <hr className='m-0'/>
                <h2 className='mb-4 pt-3'>
                    Оплата заказа возвращена полностью
                </h2>
            </>
            break
        }
        default:
            paymentContent = null
    }

    return <>
        {paymentContent}
        <PaymentHistory
            paymentHistory={order.paymentHistory}
            paymentAmount={order.paymentAmount}
            surchargeAmount={order.surchargeAmount}
            orderPrice={order.price ? +order.price.cny : undefined}
        />
    </>
}

export default OrderPayment
