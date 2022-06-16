// React
import React, {useContext, useEffect, useState} from 'react'

// Third-party
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Accordion} from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

    function getBase64Image(img) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            return {
                image: canvas.toDataURL('image/png'),
                fit: [100, 100]
            }
        } catch {
            return ''
        }
    }

    const exportToPDF = () => {
        setActiveView(0)
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const pdfItems = []
        for (let i = 0; i < allItems.length; i++) {
            pdfItems.push(
                    [
                        getBase64Image(document.getElementsByTagName('img')[i]),
                        {
                            text: allItems[i].nameRu ?? '',
                            link: 'https://cnsup.ru/product/' + allItems[i].productId,
                            color: 'blue'
                        },
                        allItems[i].autolongNumber ?? 0,
                        allItems[i].vendorCode ?? '',
                        allItems[i].quantity ?? 0,
                        allItems[i].provider.name,
                    ]
            )
        }

        const content = {
            content: [
                {text: 'Контейнер: ' + container.name, style: 'header'},
                ' ',
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['Фото', 'Наименование', 'Код товара', 'Артикул', 'Количество (шт)', 'Поставщик'],
                            ...pdfItems
                        ]
                    }
                },
            ]
        }

        pdfMake.createPdf(content).download('container_' + container.name + '.pdf')
    }

    const tablesToCSV = (fileName: string) => {
        setActiveView(1)

        setTimeout(() => {
            const csvData = [];
            const colDelim = '\t'
            const rowDelim = '\r\n'

            // Get each row data
            const tables = document.getElementsByTagName('table');
            const titles = document.getElementsByClassName('order-title');
            const rowsCount = tables[0].getElementsByTagName('tr')[0].childNodes.length

            const params = [
                {
                    title: 'Итоговая стоимость  товаров, ¥',
                    value: totalAmountY.toString() + ' ¥'
                },
                {
                    title: 'Курс ¥ к ₽',
                    value: (totalAmount / totalAmountY).toString() + ' ₽'
                },
                {
                    title: 'Итоговая стоимость  товаров, ₽',
                    value: totalAmount.toString() + ' ₽'
                },
                {
                    title: 'Стоимость доставки, ₽',
                    value: container.deliveryPrice.toString() + ' ₽'
                },
                {
                    title: 'Стоимость доп.расходов, ₽',
                    value: totalOrderingAmount.toString() + ' ₽'
                },
                {
                    title: 'Общая стоимость, ₽',
                    value: totalAmount.toString() + ' ₽'
                },
            ]

            params.forEach(function (item) {
                const csvItem = Array(rowsCount - 2)
                csvItem.unshift('"' + item.value.replace('&nbsp;', ' ') + '"')
                csvItem.unshift('"' + item.title.replace('&nbsp;', ' ') + '"')
                csvData.push(csvItem.join(colDelim));
            })

            for (let x = 0; x < tables.length; x++) {
                const rows = tables[x].getElementsByTagName('tr');

                const titleString = Array(rowsCount - 1)
                titleString.unshift('"' + titles[x].innerText.replace('&nbsp;', ' ') + '"')
                csvData.push(titleString.join(colDelim));

                for (let i = 0; i < rows.length; i++) {
                    // Get each column data
                    const cols = rows[i].querySelectorAll('td,th');

                    // Stores each csv row data
                    const csvrow = [];
                    for (let j = 0; j < cols.length; j++) {
                        csvrow.push('"' + cols[j].innerHTML.replace('&nbsp;', ' ') + '"');
                    }

                    csvData.push(csvrow.join(colDelim));
                }
            }

            downloadCSVFile(csvData.join(rowDelim), fileName + '.csv');
        }, 1000);
    }

    const downloadCSVFile = (csvData, fileName) => {
        csvData = decodeURIComponent('%EF%BB%BF') + csvData
        const csvBytes = new Uint16Array(csvData.split('').map( function(k, v) {
            return k.charCodeAt(0);
        }));
        // Create CSV file object and feed
        // our csv_data into it
        const CSVFile = new Blob([csvBytes], {
            type: 'text/csv;charset=UTF-16LE;'
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
    let totalAmountY = 0
    let totalOrderingAmount = 0
    let allItems = []

    container && container.orders && container.orders.map((order) => {
        allItems = allItems.concat(order.items)
        totalAmount += order.totalPaymentHistoryRub
        totalAmountY += order.totalPaymentHistory
        totalOrderingAmount += order.orderingAmount
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
                                        onClick={() => tablesToCSV(container.name)}
                                >
                                    Экспорт в CSV
                                </button>
                                <button
                                        className='btn btn-secondary w-100 mt-3'
                                        onClick={() => exportToPDF()}
                                >
                                    Экспорт в PDF
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
                        orderId={container.orders[0].id}
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
