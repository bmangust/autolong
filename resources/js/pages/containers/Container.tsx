// React
import React, {useContext, useEffect, useState} from 'react'

// Third-party
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Accordion} from 'react-bootstrap'

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
import {getContainerStatusName, timeConverter} from '../../utils'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import ContainersStatuses from '../../components/Containers/ContainersStatuses/ContainersStatuses'
import Modal from '../../components/UI/Modal/Modal'
import OrderPackage from '../../components/OrderPackage/OrderPackages'
import {SanctumContext} from '../../Sanctum'
import ContainersOrder from '../../components/Containers/ContainersOrder/ContainersOrder'
import OrderBaikal from '../../components/Orders/OrderBaikal/OrderBaikal'

const Container: React.FC<IContainer> = () => {
    const {id}: any = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [activeOrder, setActiveOrder] = useState<null | IOrder>(null)
    const [packingList, setPackingList] = useState(false)
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

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
    if (!container) {
        return null
    }
    return <div>
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3 card-body">
                    <div className="d-flex justify-content-between align-items-baseline flex-sm-row flex-column">
                        <h2 className="mb-0">
                            Контейнер {container.name} от {timeConverter(container.createdAt)}
                        </h2>
                        {user && user.role.accesses.containersDelete == 1
                            ? < button
                                className='btn btn-link'
                                onClick={onDeleteHandler}>
                                Удалить
                            </button>
                            : null
                        }
                        <div className="d-flex">
                            <span className="infoBlockHeaders mr-3">
                                Статус контейнера
                            </span>
                            <span className={'bg-primary text-white ' + classes.containerStatus}>
                                    {getContainerStatusName(container.status)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <ContainersStatuses container={container}/>
                </div>

                {container.orders
                    ? <div className="card mb-3">
                        <div className='card-body pb-0'>
                            <h2 className="mb-3">
                                Список заказов в контейнере
                            </h2>
                        </div>
                        <Accordion defaultActiveKey={container.orders[0].id + container.orders[0].name}>
                            {container.orders.map((order: IOrder) => (
                                <ContainersOrder
                                    key={order.id + order.name}
                                    setIsOpen={setIsOpen}
                                    setActiveOrder={setActiveOrder}
                                    setPackingList={setPackingList}
                                    order={order}/>
                            ))}
                        </Accordion>
                    </div>
                    : null
                }

                <SandboxFilesCard
                    id={container.id}
                    sandboxFiles={container.sandboxFiles}
                    page='containers'
                />
            </div>

            {activeOrder
                ? <Modal
                    size='size-700'
                    title={`Упаковка заказ ${activeOrder.id}`}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}>
                    <OrderPackage
                        setIsOpen={setIsOpen}
                        containerId={container.id}
                        packingList={packingList}
                        orderId={activeOrder.id}
                        items={activeOrder.items}/>
                </Modal>
                : null
            }
            <div className="col-lg-4">
                {user.role.accesses.ordersShowCargo && container.orders[0].cargo
                    ? <OrderBaikal
                        isContainer={true}
                        baikalTrackerLink={container.orders[0].baikalTrackerLink}
                        baikalTrackerHistory={container.orders[0].baikalTrackerHistory}/>
                    : null}
                <div className="card card-body-info">
                    <p className="infoBlockHeaders mb-1">
                        Город
                    </p>
                    <p className="infoBlockText">
                        {container.city.name}
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
                        {container.arrivalDate
                            ? timeConverter(container.arrivalDate)
                            : '-'}
                    </p>
                </div>
            </div>

        </div>
    </div>
}

export default Container
