// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'

// Typescript
import {IOrder} from '../IOrders'
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'
import {IContainer, IContainersRootState} from '../../Containers/IContainers'

// Actions
import {changeOrderStatus, editOrderAdmin} from '../../../store/actions/orders'
import {fetchContainers} from '../../../store/actions/containers'
import {fetchProviders} from '../../../store/actions/providers'

// App
import Loader from '../../UI/Loader/Loader'
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import statuses from '../../../../statuses/statuses.json'
import {timeConverter} from '../../../utils'

type Props = {
    order: IOrder
    setIsOpen: (boolean) => void
}

const OrderEdit: React.FC<Props> = (props) => {
    const {order, setIsOpen} = props
    const dispatch = useDispatch()
    const {register, handleSubmit, errors, control} = useForm({
        defaultValues: {
            name: order.name,
            cargo: !!order.cargo,
            providerId: {label: order.provider.name, value: order.provider.id},
            containerId: order.container ? {
                label: `Контейнер ${order.container.name} от ${timeConverter(order.container.createdAt)}`,
                value: order.container.id
            } : {label: 'Контейнер не выбран', value: 0}
        }
    })

    useEffect(() => {
        dispatch(fetchContainers())
        dispatch(fetchProviders())
    }, [dispatch])

    const {providers, loading} = useSelector((state: IProvidersRootState) => ({
        providers: state.providersState.providers,
        loading: state.providersState.loading
    }))

    const {containers, containersLoading} = useSelector((state: IContainersRootState) => ({
        containers: state.containersState.containers,
        containersLoading: state.containersState.loading
    }))

    const providersOptions = providers.map((provider: IProvider) => {
        return {
            label: provider.name,
            value: provider.id
        }
    })

    const containersOptions = containers.map((container: IContainer) => {
        return {
            label: `Контейнер ${container.name} от ${timeConverter(container.createdAt)}`,
            value: container.id
        }
    })

    containersOptions.unshift({label: 'Контейнер не выбран', value: 0})

    const orderStatuses = Object.entries(statuses.orderStatuses)
        .map(([key, value]) => {
            return {label: value, value: key}
        })

    const orderPaymentStatuses = Object.entries(statuses.paymentStatuses)
        .map(([key, value]) => {
            return {label: value, value: key}
        })

    const onStatusChange = (newValue) => {
        dispatch(changeOrderStatus(order.id, {status: newValue.value}))
    }

    const onPaymentStatusChange = (newValue) => {
        dispatch(changeOrderStatus(order.id, {statusPayment: newValue.value}))
    }

    const editOrderHandler = handleSubmit((formValues) => {
        formValues.cargo = formValues.cargo ? 1 : 0
        formValues.providerId = formValues.providerId.value
        formValues.containerId = formValues.containerId.value !== 0 ? formValues.containerId.value : null
        dispatch(editOrderAdmin(order.id, formValues))
    })

    const select = <Select
        placeholder='Выберите поставщика'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    if (loading || containersLoading) {
        return <Loader/>
    }
    return <Form onSubmit={editOrderHandler}>
        <div className='row mb-3'>
            <Input
                type='text'
                ref={register({required: true})}
                label='Название контейнера'
                placeholder='Название контейнера'
                name='name'
                required
            />
            {errors.name && (
                <small>Это поле обязательно</small>
            )}
            <div className="col-lg-6">
                <label
                    className='w-100 required'
                    style={{marginTop: 10}}
                    htmlFor='status'>
                    Выберите статус заказа
                </label>
                <Select
                    placeholder='Выберите статус заказа'
                    classNamePrefix='select-mini'
                    className='select-mini'
                    defaultValue={{label: statuses.orderStatuses[order.status], value: order.status}}
                    onChange={onStatusChange}
                    options={orderStatuses}
                />
            </div>
            <div className="col-lg-6">
                <label
                    className='w-100 required'
                    style={{marginTop: 10}}
                    htmlFor='paymentStatus'>
                    Выберите статус оплаты заказа
                </label>
                <Select
                    placeholder='Выберите статус оплаты'
                    classNamePrefix='select-mini'
                    className='select-mini'
                    defaultValue={{label: statuses.paymentStatuses[order.statusPayment], value: order.statusPayment}}
                    onChange={onPaymentStatusChange}
                    options={orderPaymentStatuses}
                />
            </div>
            <div className="col-lg-6">
                <label
                    className='w-100 required'
                    style={{marginTop: 10}}
                    htmlFor='status'>
                    Выберите поставщика
                </label>
                <Controller
                    name='providerId'
                    as={select}
                    options={providersOptions}
                    control={control}
                    rules={{required: true}}
                />
                {errors.providerId && (
                    <small>Это поле обязательно</small>
                )}
            </div>
            <div className="col-lg-6">
                <label
                    className='w-100 required'
                    style={{marginTop: 10}}
                    htmlFor='status'>
                    Выберите контейнер
                </label>
                <Controller
                    name='containerId'
                    as={select}
                    options={containersOptions}
                    control={control}
                    rules={{required: true}}
                />
                {errors.containerId && (
                    <small>Это поле обязательно</small>
                )}
            </div>
            <div className='col-lg-6'>
                <label className='w-100' style={{marginTop: 10}} htmlFor='cargo'>
                    Статус карго
                </label>
                <div className='custom-control custom-switch'>
                    <input
                        type='checkbox'
                        name='cargo'
                        ref={register}
                        id='cargo'
                        className='custom-control-input'/>
                    <label className="custom-control-label"
                           htmlFor='cargo'>
                    </label>
                </div>
            </div>
        </div>
        <button
            className='btn btn-success mr-3'
            type='submit'>
            Сохранить
        </button>
        <button
            className='btn btn-light'
            type='button'
            onClick={() => setIsOpen(false)}>
            Закрыть
        </button>
    </Form>
}

export default OrderEdit
