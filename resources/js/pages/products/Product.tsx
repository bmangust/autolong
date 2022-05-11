// React
import React, {useContext, useEffect} from 'react'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'

// Actions
import {
    acceptProductById,
    deleteProductById, fetchProductById
} from '../../store/actions/products'

// Styles
import classes from './Product.module.css'

// App
import Loader from '../../components/UI/Loader/Loader'
import {imgFormatter, moneyFormatter, timeConverter} from '../../utils'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import {SanctumContext} from '../../Sanctum'
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton'

const Product: React.FC = () => {
    const {id}: any = useParams()
    const {user} = useContext(SanctumContext)

    const dispatch = useDispatch()

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
    if (!product) {
        return null
    }

    const onDeleteHandler = (id) => {
        dispatch(deleteProductById(id, '/products'))
    }

    const onAcceptHandler = (id) => {
        dispatch(acceptProductById(id, product.nameRu))
    }

    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className="card mb-3">
                    <div className="card-body-info">
                        <div className='row mb-4'>
                            <div className="col-lg-5">
                                {imgFormatter(product.image, null, product.nameRu, 'border rounded p-2 mb-lg-0 mb-3')}
                            </div>
                            <div className='col-lg-7'>
                                <table className="w-100">
                                    <tbody>
                                    <tr>
                                        <td className="infoBlockHeaders pb-3">
                                            Внут.номер
                                        </td>
                                        <td className="infoBlockText pb-3">
                                            {product.autolongNumber}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="infoBlockHeaders pb-3">
                                            HS code
                                        </td>
                                        <td className="infoBlockText pb-3">
                                            {product.hsCode}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="infoBlockHeaders pb-3">
                                            Артикул
                                        </td>
                                        <td className="infoBlockText pb-3">
                                            {product.vendorCode}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="infoBlockHeaders pb-3">
                                            Цена
                                        </td>
                                        <td className="infoBlockText pb-3">
                                            {moneyFormatter(product.price)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="infoBlockHeaders pb-3">
                                            Вес брутто
                                        </td>
                                        <td className="infoBlockText pb-3">
                                            {product.weightBrutto}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="infoBlockHeaders">
                                            Вес нетто
                                        </td>
                                        <td className="infoBlockText">
                                            {product.weightNetto}
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
                                    <span className="float-right text-main font-weight-bold">RU</span>
                                </p>
                                <p className="infoBlockText">
                                    {product.nameRu}
                                </p>
                                <p className="infoBlockHeaders mb-2">
                                    Описание
                                </p>
                                <p className="infoBlockText"
                                   dangerouslySetInnerHTML={
                                       {
                                           __html: product.aboutRu
                                       }
                                   }/>
                            </div>
                            <div className="col-lg-6 pt-2">
                                <p className="infoBlockHeaders mb-2">
                                    Product name
                                    <span className="float-right text-main font-weight-bold">ENG</span>
                                </p>
                                <p className="infoBlockText">
                                    {product.nameEn}
                                </p>
                                <p className="infoBlockHeaders mb-2">
                                    About product
                                </p>
                                <p className="infoBlockText"
                                   dangerouslySetInnerHTML={
                                       {
                                           __html: product.aboutEn
                                       }
                                   }/>
                            </div>

                            <div className="col-lg-5 mt-lg-4 mt-0">
                                <p className="infoBlockHeaders">
                                    Дата добавления
                                </p>
                            </div>

                            <div className="col-lg-7 mt-lg-4 mt-0">
                                <p className="infoBlockText">
                                    {timeConverter(product.createdAt)}
                                </p>
                            </div>

                            <div className="col-lg-5">
                                <p className="infoBlockHeaders">
                                    Дата обновления
                                </p>
                            </div>

                            <div className="col-lg-7">
                                <p className="infoBlockText">
                                    {timeConverter(product.createdAt)}
                                </p>
                            </div>

                        </div>
                        <div className={classes.btns}>
                            {user && user.role.accesses.productsUpdate == 1
                                ? <NavLink
                                    to={`/productedit/${id}${product.published == '0' ? '/unpublished' : '/published'}`}
                                    className='editButton'>
                                    Редактировать
                                </NavLink>
                                : null
                            }
                            {user && user.role.accesses.productsDelete == 1
                                ? <DeleteButton
                                    buttonStyle='old'
                                    name='товар'
                                    deleteFn={() => onDeleteHandler(product.id)}>
                                    Удалить товар
                                </DeleteButton>
                                : null
                            }
                            {product.published == '0'
                                ? <button
                                    onClick={() => onAcceptHandler(product.id)}
                                    className='btn btn-success'>
                                    Одобрить
                                </button>
                                : null
                            }
                        </div>
                    </div>
                </div>

                {product.orders && product.orders.length
                    ? <div className="card card-body mb-3">
                        <h2 className='mb-2'>Список заказов</h2>
                        {product.orders.map(order => (
                            Object.keys(order).length
                                ? <div key={order.id + order.name}
                                       className='row infoBlockText mb-2'>
                                    <div className="col-8">
                                        <NavLink to={`/order/${order.id}`}>
                                            {order.name}
                                        </NavLink>
                                    </div>
                                    <div className="col-4 text-orange">
                                        {order.items.find(({productId}) =>
                                            productId === product.id
                                        )?.quantity} шт
                                    </div>
                                </div>
                                : null
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
                    {product.provider
                        ? <div className="card-body">
                            <p className="infoBlockHeaders mb-1">
                                Поставщик</p>
                            <p className="infoBlockText">
                                {product.provider.name}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Страна</p>
                            <p className="infoBlockText">
                                {product.provider.country
                                    ? product.provider.country.name
                                    : '--'
                                }
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
