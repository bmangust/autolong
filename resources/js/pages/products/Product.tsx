// React
import React, {useEffect} from 'react'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'

// Third-party
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'

// Actions
import {deleteProductById, fetchProductById} from '../../store/actions/products'

// App
import Loader from '../../components/UI/Loader/Loader'
import {imgFormatter, moneyFormatter, timeConverter} from '../../utils'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'

const Product: React.FC = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()
    const history = useHistory()

    const {product, loading, error} = useSelector(
        (state: IProductsRootState) => ({
            error: state.productsState.error,
            product: state.productsState.product,
            loading: state.productsState.loading
        })
    )

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    if (error) {
        return <div>Error! {error.message}</div>
    }
    if (loading) {
        return <Loader/>
    }

    const onDeleteHandler = (id) => {
        dispatch(deleteProductById(id))
        history.push('/products')
    }

    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className="card mb-3">
                    <div className="card-body-info">
                        <div className='row mb-4'>
                            <div className="col-lg-5">
                                {imgFormatter(
                                    product.image,
                                    null,
                                    product.nameRu,
                                    'border rounded p-2')}
                            </div>
                            <div className='col-lg-7'>
                                <table
                                    className="w-100"
                                >
                                    <tbody>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders pb-3">
                                            Внутренний номер
                                        </td>
                                        <td
                                            className="infoBlockText pb-3">
                                            {'autolongNumber' in product
                                                ? product.autolongNumber
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders pb-3">
                                            HS code
                                        </td>
                                        <td
                                            className="infoBlockText pb-3">
                                            {'hsCode' in product
                                                ? product.hsCode
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders pb-3">
                                            Артикул
                                        </td>
                                        <td
                                            className="infoBlockText pb-3">
                                            {'vendorCode' in product
                                                ? product.vendorCode
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders pb-3">
                                            Цена
                                        </td>
                                        <td
                                            className="infoBlockText pb-3">
                                            {'price' in product
                                                ? moneyFormatter(product.price)
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders pb-3">
                                            Вес брутто
                                        </td>
                                        <td
                                            className="infoBlockText pb-3">
                                            {'weightBrutto' in product
                                                ? product.weightBrutto
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="infoBlockHeaders">
                                            Вес нетто
                                        </td>
                                        <td
                                            className="infoBlockText">
                                            {'weightNetto' in product
                                                ? product.weightNetto
                                                : ''}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-6 border-right pt-2">
                                <p className="infoBlockHeaders mb-2">
                                    Название товара
                                    <span className="
                                    float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    RU
                                </span>
                                </p>
                                <p className="infoBlockText">
                                    {'nameRu' in product
                                        ? product.nameRu
                                        : ''}
                                </p>
                                <p className="infoBlockHeaders mb-2">
                                    Описание
                                </p>
                                <p
                                    className="infoBlockText"
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: 'aboutRu' in product
                                                ? product.aboutRu
                                                : 'Описание отсутствует'
                                        }
                                    }/>
                            </div>
                            <div className="col-lg-6 pt-2">
                                <p className="infoBlockHeaders mb-2">
                                    Product name
                                    <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    ENG
                                </span>
                                </p>
                                <p className="infoBlockText">
                                    {'nameEn' in product
                                        ? product.nameEn
                                        : ''}
                                </p>
                                <p className="infoBlockHeaders mb-2">
                                    About product
                                </p>
                                <p
                                    className="infoBlockText"
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: 'aboutEn' in product
                                                ? product.aboutEn
                                                : 'Описание отсутствует'
                                        }
                                    }/>
                            </div>

                            <div className="col-lg-5 mt-4">
                                <p className="infoBlockHeaders">
                                    Дата добавления
                                </p>
                            </div>

                            <div className="col-lg-7 mt-4">
                                <p className="infoBlockText">
                                    {'createdAt' in product
                                        ? timeConverter(product.createdAt)
                                        : ''}
                                </p>
                            </div>

                            <div className="col-lg-5">
                                <p className="infoBlockHeaders">
                                    Дата обновления
                                </p>
                            </div>

                            <div className="col-lg-7">
                                <p className="infoBlockText">
                                    {'updatedAt' in product
                                        ? timeConverter(product.createdAt)
                                        : ''}
                                </p>
                            </div>

                        </div>
                        <div className='d-flex justify-content-between'>
                            <NavLink to={`/productedit/${id}`}
                                     className='editButton'>
                                Редактировать информацию
                            </NavLink>
                            <button onClick={() => onDeleteHandler(product.id)}
                                    className='btn btn-danger'>
                                Удалить товар
                            </button>
                        </div>
                    </div>
                </div>

                {product.orders.length
                    ? <div className="card card-body mb-3">
                        {product.orders.map(order => (
                            <div key={order.id + order.name}
                                 className='row'>
                                <div className="col-8">
                                    <NavLink to={`/order/${order.id}`}>
                                        {order.name}
                                    </NavLink>
                                </div>
                                <div className="col-4">
                                    {order.items.find(({productId}) =>
                                        productId === product.id
                                    )?.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    : null
                }

                <SandboxFilesCard
                    id={product.id}
                    sandboxFiles={product.sandboxFiles}
                    page='products'
                />
            </div>
            <div className='col-lg-4'>
                <div className="card">
                    {'provider' in product && product.provider
                        ? <div className="card-body">
                            <p className="infoBlockHeaders mb-1">
                                Поставщик</p>
                            <p className="infoBlockText">
                                {product.provider.name}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Страна</p>
                            <p className="infoBlockText">
                                {'country' in product.provider
                                    ? product.provider.country
                                        ? product.provider.country.name : '--'
                                    : '--'}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Почта</p>
                            <p className="infoBlockText">
                                {product.provider.email}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Телефон</p>
                            <p className="infoBlockText">
                                {product.provider.phone}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Wechat</p>
                            <p className="infoBlockText">
                                {product.provider.wechat}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Сайт</p>
                            <p className="infoBlockText">
                                <a href={product.provider.website}
                                   target="_blank"
                                   rel="noreferrer">
                                    {product.provider.website}
                                </a>
                            </p>
                            <p className="infoBlockHeaders mb-1 mt-5">
                                Перейти на страницу поставщика
                            </p>
                            <NavLink to={'/provider/' + product.provider.id}>
                                <SvgArrowRight/>
                            </NavLink>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Product
