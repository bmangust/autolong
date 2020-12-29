// React
import React, {useContext, useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import {NavLink} from 'react-router-dom'
import {toast} from 'react-toastify'

// Typescript
import {ICity, ICitiesRootState} from '../../Cities/ICities'

// Styles
import classes from './OrderStatuses.module.css'

// Actions
import {changeOrderStatus} from '../../../store/actions/orders'
import {fetchCities} from '../../../store/actions/cities'
import {setBlackLabelById} from '../../../store/actions/providers'

// Typescript
import {IContainer} from '../../Containers/IContainers'

// App
import SvgInProduction from '../../UI/iconComponents/InProduction'
import SvgReadyForSent from '../../UI/iconComponents/ReadyForSent'
import SvgDeliveryBox from '../../UI/iconComponents/DeliveryBox'
import SvgOrderInContainer from '../../UI/iconComponents/OrderInContainer'
import {getContainerStatusName, timeConverter} from '../../../utils'
import InputCheckbox from '../../UI/Inputs/InputCheckbox/InputCheckbox'
import {SanctumContext} from '../../../Sanctum'

const OrderStatuses: React.FC<{
    arrivalDate: string
    id: number
    orderCity: ICity
    status: string
    providerId: number
    container?: IContainer
    unscrupulous: 0 | 1
}> = ({id, status, orderCity, arrivalDate, providerId, container, unscrupulous}) => {
    const dispatch = useDispatch()

    const [date, setDate] = useState('')
    const [city, setCity] = useState<{ label: string, value: any } | null>(null)
    const [unscrupulousState, setUnscrupulousState] = useState<boolean>(!!unscrupulous)
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        if (arrivalDate) {
            setDate(arrivalDate)
        }
    }, [arrivalDate])

    useEffect(() => {
        if (orderCity) {
            setCity({label: orderCity.name, value: orderCity.id})
        }
    }, [orderCity])

    useEffect(() => {
        dispatch(fetchCities())
    }, [dispatch])

    const onChangeDateHandler = (e) => {
        setDate(e.target.value)
    }

    const onClickHandler = (status: string) => {
        dispatch(changeOrderStatus(id, {status}))
        if (status === 'orderCompleted') {
            dispatch(setBlackLabelById(providerId, unscrupulousState))
        }
    }

    const onSubmitHandler = (status) => {
        if (date && city && Object.keys(city).length) {
            const data = {
                status,
                arrivalDate: date,
                city: city ? city.label : ''
            }
            dispatch(changeOrderStatus(id, data))
        } else {
            toast.error(`Заполните поле ${!date ? 'Дата' : ''}
                ${!city ? 'Город' : ''}`)
        }
    }

    const onChangeCityHandler = (newValue: any) => {
        setCity(newValue)
    }

    const onCheckHandler = (e) => {
        setUnscrupulousState(e.target.checked)
    }

    const {cities} = useSelector((state: ICitiesRootState) => ({
        cities: state.citiesState.cities
    }))

    let citiesOptions: { label: string, value: number }[] = []
    if (cities.length) {
        citiesOptions = cities.map((city: ICity) => {
            return {
                label: city.name,
                value: city.id
            }
        })
    }

    const cls = [classes.status]

    let orderStatus
    switch (status) {
        case 'orderCreated': {
            orderStatus = <div className={classes.statusBody}>
                <SvgDeliveryBox/>
                <div>
                    <p className={classes.statusTitle}>Заказ создан</p>
                    <p className={classes.statusText}>
                        Подтвердите, что производитель принял его в работу
                    </p>
                    <button
                        onClick={() => onClickHandler('orderConfirmed')}
                        className='btn btn-success'>
                        Подтвердить
                    </button>
                </div>
            </div>
            break
        }
        case 'orderConfirmed': {
            orderStatus = <div>
                <p className={classes.statusText}>
                    Подтвердите, что вы получили сообщение от производителя
                    об отправке и укажите, город получения и
                    предварительную дату прибытия к грузоперевозчику
                </p>
                <div className={classes.inputs}>
                    <input onChange={onChangeDateHandler}
                           defaultValue={arrivalDate || ''}
                           type="date" name='arrivalDate'/>
                    <CreatableSelect
                        isClearable={true}
                        defaultValue={orderCity ? {label: orderCity.name, value: orderCity.id} : null}
                        placeholder='Введите город'
                        onChange={onChangeCityHandler}
                        classNamePrefix='select-mini-tags'
                        className='select-mini-tags p-0'
                        options={citiesOptions}
                    />
                </div>
                <button
                    onClick={() => onSubmitHandler('orderInProduction')}
                    className='btn btn-success mr-3'>
                    Подтвердить
                </button>
                <button
                    onClick={() => onClickHandler('orderCreated')}
                    className='btn btn-link color-blue'>
                    Откатить
                </button>
            </div>
            break
        }
        case 'orderInProduction': {
            orderStatus = <div className={classes.statusBody}>
                <SvgInProduction/>
                <div>
                    <p className={classes.statusTitle}>
                        Заказ в производстве
                    </p>
                    <p className={classes.statusText}>
                        Подтвердите, что заказ готов к отгрузке
                    </p>
                    <button
                        onClick={() => onClickHandler('orderReadyForSent')}
                        className='btn btn-success mr-3'>
                        Подтвердить
                    </button>
                    <button
                        onClick={() => onClickHandler('orderConfirmed')}
                        className='btn btn-link color-blue'>
                        Откатить
                    </button>
                </div>
            </div>
            break
        }
        case 'orderReadyForSent': {
            orderStatus = <div className={classes.statusBody}>
                <SvgReadyForSent/>
                <div>
                    <p className={classes.statusTitle + ' mb-0 mt-2'}>
                        Заказ готов к отгрузке
                    </p>
                    <button
                        onClick={() => onClickHandler('orderInProduction')}
                        className='btn btn-link color-blue'>
                        Откатить
                    </button>
                </div>
            </div>
            break
        }
        case 'orderInStock': {
            orderStatus = <div>
                <p className={classes.statusText}>
                    Проверьте, что всё пришло правильно и поставьте
                    «Чёрную метку», если поставщик прислал
                    неправильный заказ
                </p>
                <div className='row'>
                    <div className="col-lg-6">
                        <InputCheckbox
                            classNameLabel='blackLabel'
                            name='unscrupulous'
                            defaultChecked={unscrupulousState}
                            label='Недобросовестный поставщик'
                            onChange={onCheckHandler}/>
                    </div>
                    <div className="col-4 offset-lg-2 offset-0">
                        <button
                            onClick={() =>
                                onClickHandler('orderCompleted')}
                            className='btn btn-success'>
                            Завершить
                        </button>
                    </div>
                </div>
            </div>
            break
        }
        default: {
            orderStatus = null
            break
        }
    }

    let containerBlock: {} | null | undefined

    if (container && Object.keys(container).length) {
        cls.push(classes.black, 'mt-3 mb-3')
        containerBlock = <div className={classes.statusBody}>
            <SvgOrderInContainer/>
            <div>
                <p className={classes.statusTitle}>
                    Заказ привязан к контейнеру
                </p>
                <div className={classes.orderContainer}>
                    <div>
                        <p>Номер контейнера</p>
                        <NavLink to={`/container/${container?.id}`}>
                            №{container.name} от {timeConverter(container.createdAt)}
                        </NavLink>
                    </div>
                    <div>
                        <p>Статус контейнера</p>
                        <span>
                            {getContainerStatusName(container?.status)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }

    return user.role.accesses.ordersUpdate == 1
        ? <>
            {orderStatus
                ? <div className={classes.status}>
                    {orderStatus}
                </div>
                : null
            }
            {containerBlock
                ? <div className={cls.join(' ')}>
                    {containerBlock}
                </div>
                : null}
        </>
        : null
}

export default OrderStatuses
