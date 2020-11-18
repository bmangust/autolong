// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Styles
import classes from './ContainersStatuses.module.css'

// Actions
import {changeContainerStatus} from '../../../store/actions/containers'

// Typescript
import {IContainer} from '../IContainers'

// App
import SvgInTransit from '../../UI/iconComponents/InTransit'
import SvgArrivedAtCustoms from '../../UI/iconComponents/ArrivedAtCustoms'
import SvgRelease from '../../UI/iconComponents/Release'
import SvgToTheCarrier from '../../UI/iconComponents/ToTheCarrier'
import SvgOrderInContainer from '../../UI/iconComponents/OrderInContainer'
import {timeConverter} from '../../../utils'

const ContainersStatuses: React.FC<{ container: IContainer }> =
    (({container}) => {
        const dispatch = useDispatch()

        const onClickHandler = (status) => {
            dispatch(changeContainerStatus(container?.id, {status}))
        }

        const cls = [classes.status]

        let containerStatus

        switch (container.status) {
            case 'containerAssemble': {
                containerStatus = <div className={classes.statusBody}>
                    <SvgToTheCarrier/>
                    <div>
                        <p className={classes.statusTitle}>
                            Контейнер собирается
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что контейнер в транзите
                        </p>
                        <button
                            onClick={() =>
                                onClickHandler('containerInTransit')}
                            className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'containerInTransit': {
                containerStatus = <div className={classes.statusBody}>
                    <SvgInTransit/>
                    <div>
                        <p className={classes.statusTitle}>
                            Контейнер в транзите
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что контейнер прибыл на таможню
                        </p>
                        <button onClick={() =>
                            onClickHandler('containerArrivedAtCustoms')}
                                className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'containerArrivedAtCustoms': {
                containerStatus = <div className={classes.statusBody}>
                    <SvgArrivedAtCustoms/>
                    <div>
                        <p className={classes.statusTitle}>
                            Контейнер прибыл на таможню
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что контейнер прошёл таможню
                        </p>
                        <button onClick={() =>
                            onClickHandler('containerRelease')}
                                className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'containerRelease': {
                containerStatus = <div className={classes.statusBody}>
                    <SvgRelease/>
                    <div>
                        <p className={classes.statusTitle}>
                            Контейнер выпущен
                        </p>
                        <p className={classes.statusText}>
                            Подтвердите, что контейнер на складе
                        </p>
                        <button onClick={() =>
                            onClickHandler('containerInStock')}
                                className='btn btn-success'>
                            Подтвердить
                        </button>
                    </div>
                </div>
                break
            }
            case 'containerInStock': {
                cls.push(classes.black)
                containerStatus = <div className={classes.statusBody}>
                    <SvgOrderInContainer/>
                    <div>
                        <p className={classes.statusTitle}>
                            Контейнер на складе
                        </p>
                        <div className={classes.orderContainer}>
                            <div>
                                <p>Дата прибытия</p>
                                <span>
                                    {timeConverter(container.arrivalDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                break
            }
            default: {
                containerStatus = null
                break
            }
        }

        return containerStatus
            ? <div className={cls.join(' ')}>
                {containerStatus}
            </div>
            : null
    })

export default ContainersStatuses
