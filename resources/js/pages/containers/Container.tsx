// React
import React, {useEffect} from 'react'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Styles
import classes from './Container.module.css'

// Actions
import {
    deleteContainerById,
    fetchContainerById
} from '../../store/actions/containers'

// Typescript
import {
    IContainer,
    IContainersRootState
} from '../../components/Containers/IContainers'
import {IOrder} from '../../components/Orders/IOrders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import {getContainerStatusName} from '../../utils'
import OrderItems from '../../components/Orders/OrderItems/OrderItems'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import ContainersStatuses
    from '../../components/Containers/ContainersStatuses/ContainersStatuses'
import OrderPackage from '../../components/OrderPackage/OrderPackages'

const Container: React.FC<IContainer> = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()

    const {container, loading, error} = useSelector(
        (state: IContainersRootState) => ({
            error: state.containersState.error,
            container: state.containersState.container,
            loading: state.containersState.loading
        })
    )

    const onDeleteHandler = () => {
        dispatch(deleteContainerById(id))
    }

    useEffect(() => {
        dispatch(fetchContainerById(id))
    }, [dispatch, id])

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-3 card-body">
                        <div className="d-flex justify-content-between
                         align-items-baseline">
                            <h2 className="mb-0">
                                {'name' in container
                                    ? container.name
                                    : ''}
                            </h2>
                            <button
                                className='btn btn-link'
                                onClick={onDeleteHandler}>
                                Удалить
                            </button>
                            <div className="d-flex">
                                    <span className="infoBlockHeaders mr-3">
                                        Статус контейнера
                                    </span>
                                <span className={
                                    'bg-primary text-white '
                                    + classes.containerStatus}>
                                    {getContainerStatusName(container.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <ContainersStatuses
                            container={container}/>
                    </div>

                    {container.orders
                        ? <div className="card mb-3">
                            <div className='card-body pb-0'>
                                <h2 className="mb-3">
                                    Список заказов в контейнере
                                </h2>
                            </div>
                            {container.orders.map((order: IOrder) => (
                                <div key={order.id + order.name}
                                     className={classes.order}>
                                    <div className={classes.orderHeader}>
                                        <NavLink to={`/order/${order.id}`}>
                                            Заказ {order.id}
                                        </NavLink>
                                    </div>
                                    <div className={classes.orderBody}>
                                        <OrderItems items={order.items}/>
                                    </div>
                                    <div className={classes.orderFooter}>
                                        <p className={classes.orderItemsQrt}>
                                            Товаров в заказе
                                            ({order.items.length})
                                        </p>
                                        <p className={classes.orderPrice}>
                                            Стоимость заказа
                                            <span>{order.price.cny} ¥</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : null
                    }

                    {container.orders
                        ? <OrderPackage
                            containerId={container.id}
                            orders={container.orders}/>
                        : null
                    }

                    <SandboxFilesCard
                        id={container.id}
                        sandboxFiles={container.sandboxFiles}
                        page='containers'
                    />
                </div>

                <div className="col-lg-4">
                    <div className="card card-body-info">
                        <p className="infoBlockHeaders mb-1">
                            Город
                        </p>
                        <p className="infoBlockText">
                            {'city' in container
                                ? container.city.name
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Вес
                        </p>
                        <p className="infoBlockText">
                            -
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Коробки
                        </p>
                        <p className="infoBlockText">
                            -
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Дата выхода
                        </p>
                        <p className="infoBlockText">
                            -
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Дата прибытия на склад
                        </p>
                        <p className="infoBlockText">
                            -
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Container
