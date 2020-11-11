// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import CreatableSelect from 'react-select/creatable'

// Typescript
import {ICity, ICitiesRootState} from '../../Cities/ICities'

// Styles
import classes from './OrderStatuses.module.css'

// Actions
import {changeOrderStatus} from '../../../store/actions/orders'
import {fetchCities} from '../../../store/actions/cities'

// App
import {toast} from 'react-toastify'
import SvgInProduction from '../../UI/iconComponents/InProduction'
import SvgReadyForSent from '../../UI/iconComponents/ReadyForSent'
import SvgInTransit from '../../UI/iconComponents/InTransit'
import SvgDeliveryBox from '../../UI/iconComponents/DeliveryBox'
import SvgToTheCarrier from '../../UI/iconComponents/ToTheCarrier'
import SvgArrivedAtCustoms from '../../UI/iconComponents/ArrivedAtCustoms'
import SvgRelease from '../../UI/iconComponents/Release'

const OrderStatuses: React.FC<{ id: number, status: string }> =
    ({id, status}) => {
        const dispatch = useDispatch()

        const [date, setDate] = useState('')
        const [city, setCity] = useState({})

        useEffect(() => {
            dispatch(fetchCities())
        }, [dispatch])

        const onChangeDateHandler = (e) => {
            setDate(e.target.value)
        }

        const onClickHandler = (status) => {
            dispatch(changeOrderStatus(id, {status}))
        }

        const onSubmitHandler = (status) => {
            if (date && Object.keys(city).length) {
                const data = {
                    status,
                    arrivalDate: date,
                    city: city.label
                }
                dispatch(changeOrderStatus(id, data))
            } else {
                toast.error(`Заполните поле ${!date ? 'Дата' : ''}
                ${!Object.keys(city).length ? 'Город' : ''}`)
            }
        }

        const onChangeCityHandler = (newValue: any) => {
            setCity(newValue)
        }

        const {cities} = useSelector(
            (state: ICitiesRootState) => ({
                cities: state.citiesState.cities
            }))

        let citiesOptions = []
        if (cities.length) {
            citiesOptions = cities.map(
                (city: ICity) => {
                    return {
                        label: city.name,
                        value: city.id
                    }
                })
        }

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
                               type="date" name='arrivalDate'/>
                        <CreatableSelect
                            isClearable={true}
                            placeholder='Введите город'
                            onChange={onChangeCityHandler}
                            classNamePrefix='select-mini-tags'
                            className='select-mini-tags p-0'
                            options={citiesOptions}
                        />
                    </div>
                    <button
                        onClick={() => onSubmitHandler('orderInProduction')}
                        className='btn btn-success'>
                        Подтвердить
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
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'orderReadyForSent': {
                orderStatus = <div className={classes.statusBody}>
                    <SvgReadyForSent/>
                    <div>
                        <p className={classes.statusTitle}>
                            Заказ готов к отгрузке
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что заказ отправлен к грузоперевозчику
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('orderSentToTheCarrier')}
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'orderSentToTheCarrier': {
                orderStatus = <div className={classes.statusBody}>
                    <SvgToTheCarrier/>
                    <div>
                        <p className={classes.statusTitle}>
                            Заказ прибыл к грузоперевозчику
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что заказ в транзите
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('orderInTransit')}
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'orderInTransit': {
                orderStatus = <div className={classes.statusBody}>
                    <SvgInTransit/>
                    <div>
                        <p className={classes.statusTitle}>
                            Заказ в транзите
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что заказ прибыл на таможню
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('orderArrivedAtCustoms')}
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'orderArrivedAtCustoms': {
                orderStatus = <div className={classes.statusBody}>
                    <SvgArrivedAtCustoms/>
                    <div>
                        <p className={classes.statusTitle}>
                            Заказ прибыл на таможню
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что заказ прошёл таможню
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('orderRelease')}
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'orderRelease': {
                orderStatus = <div className={classes.statusBody}>
                    <SvgRelease/>
                    <div>
                        <p className={classes.statusTitle}>
                            Заказ выпущен
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что заказ на складе
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('orderInStock')}
                            className='btn btn-success'>
                            Подтвердить
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
                    <button
                        onClick={() =>
                            onClickHandler('orderCompleted')}
                        className='btn btn-success'>
                        Завершить
                    </button>
                </div>
                break
            }
            default: {
                orderStatus = null
                break
            }
        }

        return orderStatus
            ? <div className={classes.status}>
                {orderStatus}
            </div>
            : null
    }

export default OrderStatuses
