// React
import React, {useContext, useEffect, useState} from 'react'

// Third-party
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Accordion} from 'react-bootstrap'

// Actions
import {deleteContainerById, fetchContainerById} from '../../store/actions/containers'

// Typescript
import {IContainer, IContainersRootState} from '../../components/Containers/IContainers'
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
import ContainerEdit from '../../components/Containers/ContainerEdit/ContainerEdit'
import SvgEdit from '../../components/UI/iconComponents/Edit'
import FinalCalculation from '../../components/Containers/FinalCalculation/FinalCalculation'
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton'
import ViewSwitch from '../../components/UI/ViewSwitch/ViewSwitch'

const Container: React.FC<IContainer> = () => {
    const {id}: any = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [activeOrder, setActiveOrder] = useState<null | IOrder>(null)
    const [activeView, setActiveView] = useState(0)
    const [packingList, setPackingList] = useState(false)
    const [isShowAdminModal, setIsShowAdminModal] = useState(false)
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    const {container, loading, error} = useSelector((state: IContainersRootState) => ({
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

    const tablesToCSV = () => {
        setActiveView(1)

        setTimeout(() => {
            const csvData = [];

            // Get each row data
            const tables = document.getElementsByTagName('table');
            const titles = document.getElementsByClassName('order-title');

            for (let x = 0; x < tables.length; x++) {
                const rows = tables[x].getElementsByTagName('tr');

                const titleString = Array(rows[0].childNodes.length - 1)
                titleString.unshift(titles[x].innerText)
                csvData.push(titleString.join(','));

                for (let i = 0; i < rows.length; i++) {
                    // Get each column data
                    const cols = rows[i].querySelectorAll('td,th');

                    // Stores each csv row data
                    const csvrow = [];
                    for (let j = 0; j < cols.length; j++) {
                        csvrow.push(cols[j].innerHTML);
                    }

                    csvData.push(csvrow.join(','));
                }
            }

            downloadCSVFile(csvData.join('\n'), 'export.csv');
        }, 1000);
    }

    const downloadCSVFile = (csvData, fileName) => {
        // Create CSV file object and feed
        // our csv_data into it
        const CSVFile = new Blob([csvData], {
            type: 'text/csv'
        });

        // Create to temporary link to initiate
        // download process
        const tempLink = document.createElement('a');

        // Download csv file
        tempLink.download = fileName;
        tempLink.href = window.URL.createObjectURL(CSVFile);

        // This link should not be displayed
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);

        // Automatically click the link to
        // trigger download
        tempLink.click();
        document.body.removeChild(tempLink);
    }

    let totalWeightNetto = 0
    let totalWeightBrutto = 0
    let totalBoxes = 0
    let totalAmount = 0

    container && container.orders && container.orders.map((order) => {
        totalAmount += order.totalPaymentHistoryRub
        if (order.weightNetto) {
            totalWeightNetto += order.weightNetto
        }
        if (order.weightBrutto) {
            totalWeightBrutto += order.weightBrutto
        }
        order.items.map((item) => {
            if (item.pcsCtnCtns) {
                totalBoxes += item.pcsCtnCtns.pcsCtn.reduce((acc, qty) => acc + qty, 0)
            }
        })
    })

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
                <div className="new-card mb-3">
                    <div className="new-card__header">
                        <h2>
                            № {container.name} от {timeConverter(container.createdAt)}
                        </h2>
                        <div className='new-card__status'>
                            <span className="infoBlockHeaders mr-3">
                                Статус контейнера
                            </span>
                            <span className='new-card__status--badge'>
                                {getContainerStatusName(container.status)}
                            </span>
                        </div>
                    </div>
                    <div className="new-card__footer">
                        {user.role.accesses.adminPower == 1
                                ? <>
                                    <button
                                            onClick={() => setIsShowAdminModal(true)}
                                            className='new-card__footer--btn'>
                                        <SvgEdit/>
                                        Редактировать информацию
                                    </button>
                                    {isShowAdminModal
                                            ? <Modal
                                                    size='size-700'
                                                    title='Редактирование контейнера'
                                                    isOpen={isShowAdminModal}
                                                    setIsOpen={setIsShowAdminModal}>
                                                <ContainerEdit setIsOpen={setIsShowAdminModal} container={container}/>
                                            </Modal>
                                            : null
                                    }
                                </>
                                : null
                        }
                        {user && user.role.accesses.containersDelete == 1
                                ? <DeleteButton
                                        buttonStyle='default'
                                        name='контейнер'
                                        deleteFn={() => onDeleteHandler()}>
                                    Удалить контейнер из системы
                                </DeleteButton>
                                : null
                        }
                    </div>
                </div>

                <div className='mb-3'>
                    <ContainersStatuses container={container}/>
                </div>

                {container.orders && container.orders.length
                        ? <div className="card mb-3">
                            <div className='card-body pb-0'>
                                <h2 className="mb-3"
                                    style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    Список заказов в контейнере
                                    {user.role.accesses.containersUpdate == 1
                                            ? <ViewSwitch activeItem={activeView} setActiveItem={setActiveView}/>
                                            : null
                                    }
                                </h2>
                            </div>
                            <Accordion defaultActiveKey={container.orders[0].id + container.orders[0].name}>
                                {container.orders.map((order: IOrder) => (
                                        <ContainersOrder
                                                key={order.id + order.name}
                                                totalAmount={container.deliveryPrice / totalAmount}
                                                activeView={activeView}
                                                setIsOpen={setIsOpen}
                                                setActiveOrder={setActiveOrder}
                                                setPackingList={setPackingList}
                                                order={order}
                                        />
                                ))}
                            </Accordion>
                            <div className='card card-body mb-lg-0 mb-3'>
                                <button
                                        className='btn btn-secondary w-100'
                                        onClick={() => tablesToCSV()}
                                >
                                    Экспорт в CSV
                                </button>
                            </div>
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
                                items={activeOrder.items}
                        />
                    </Modal>
                    : null
            }
            <div className="col-lg-4">
                {user.role.accesses.ordersShowCargo && container.orders.length && container.orders[0].cargo
                        ? <OrderBaikal
                                isContainer={true}
                                baikalTrackerLink={container.orders[0].baikalTrackerLink}
                                baikalTrackerHistory={container.orders[0].baikalTrackerHistory}/>
                        : null}
                <div className="card card-body-info mb-3">
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
                        {totalWeightNetto || totalWeightBrutto
                                ? <>
                                    {totalWeightNetto ? `Нетто: ${totalWeightNetto}; ` : ''}
                                    {totalWeightBrutto ? `Брутто: ${totalWeightBrutto};` : ''}
                                </>
                                : '-'
                        }
                    </p>
                    <p className="infoBlockHeaders mb-1">
                        Коробки
                    </p>
                    <p className="infoBlockText">
                        {totalBoxes ? `${totalBoxes} шт` : '-'}
                    </p>
                    <p className="infoBlockHeaders mb-1">
                        Дата выхода
                    </p>
                    <p className="infoBlockText">
                        {container.releaseDate
                                ? timeConverter(container.releaseDate)
                                : '-'}
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
                <FinalCalculation
                        orders={container.orders}
                        deliveryPrice={container.deliveryPrice}
                />
            </div>
        </div>
    </div>
}

export default Container
