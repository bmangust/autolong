// React
import React, {useEffect} from 'react'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'

// Actions
import {fetchProductById} from '../../store/actions/products'

// App
import Loader from '../../components/UI/Loader/Loader'
import {moneyFormatter, timeConverter} from '../../utils'

const Product: React.FC = () => {
    const {id}: any = useParams()

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

    const placeholder = '/imgs/placeholder-product-image.png'
    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className="card mb-4">
                    <div className="card-body-info">
                        <div className='row mb-4'>
                            <div className="col-lg-5">
                                <img
                                    src={'image' in product
                                        ? product.image
                                        : placeholder}
                                    alt={'nameRu' in product
                                        ? product.nameRu
                                        : 'product'}
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className='col-lg-7'>
                                <div className="row">
                                    <div className="col-lg-5 infoBlockHeaders">
                                        <p>Артикул:</p>
                                        <p>Цена:</p>
                                        <p>Вес брутто:</p>
                                        <p>Вес нетто:</p>
                                    </div>
                                    <div className="col-lg-7 infoBlockText">
                                        <p>{'vendorCode' in product
                                            ? product.vendorCode
                                            : ''}</p>
                                        <p>{'price' in product
                                            ? moneyFormatter(product.price)
                                            : ''}</p>
                                        <p>{'weightBrutto' in product
                                            ? product.weightBrutto
                                            : ''}</p>
                                        <p>{'weightNetto' in product
                                            ? product.weightNetto
                                            : ''}</p>
                                    </div>
                                </div>
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
                                <p className="infoBlockText">
                                    {'aboutRu' in product
                                        ? product.aboutRu
                                        : 'Описание отсутствует'}
                                </p>
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
                                <p className="infoBlockText">
                                    {'aboutEn' in product
                                        ? product.aboutEn
                                        : 'No description'}
                                </p>
                            </div>

                            <div className="col-lg-5 mt-4">
                                <p className="infoBlockHeaders">
                                    Дата загрузки
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
                        <NavLink to={`/productedit/${id}`}
                                 className='editButton'>
                            Редактировать информацию
                        </NavLink>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    </div>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className="card">
                    {'provider' in product
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
                                        ? product.provider.country.name : ''
                                    : ''}
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
