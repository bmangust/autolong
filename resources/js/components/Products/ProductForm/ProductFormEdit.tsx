// React
import React, {useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {IProduct, IProductAutolong, IProductsRootState} from '../IProducts'

// Actions
import {
    createProduct,
    fetchProductPrice,
    updateProduct
} from '../../../store/actions/products'
import {IProvider} from '../../Providers/IProviders'

interface IEditProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: string
    aboutRu: string
    aboutEn: string
    providerId: number
    image: string
    priceCny: number
    priceRub: number
    priceUsd: number
    weightNetto: number
    weightBrutto: number
}

const ProductFormEdit: React.FC<{
    product: IProduct | IProductAutolong,
    providers: IProvider[]
}> =
    ({product, providers}) => {
        const {
            register, handleSubmit
        } =
            'id' in product ?
                useForm<IEditProductData>({
                    defaultValues: {
                        nameRu: product.nameRu,
                        nameEn: product.nameEn,
                        vendorCode: product.vendorCode,
                        aboutRu: product.aboutRu,
                        aboutEn: product.aboutEn,
                        autolongNumber: product.autolongNumber,
                        priceCny: product.price.cny,
                        priceRub: product.price.rub,
                        priceUsd: product.price.usd,
                        weightNetto: product.weightNetto,
                        weightBrutto: product.weightBrutto
                    }
                })
                : useForm<IEditProductData>({
                    defaultValues: {
                        nameRu: product.name,
                        autolongNumber: product.number,
                        vendorCode: product.articul,
                        aboutRu: product.text,
                        priceCny: +product.price
                    }
                })

        const [show, setShow] = useState(true)

        const dispatch = useDispatch()

        const productFormSubmitHandler =
            handleSubmit((formValues: IEditProductData) => {
                if (formValues.image) {
                    formValues.image = formValues.image[0]
                } else {
                    if ('image' in product) {
                        formValues.image = product.image
                    }
                }
                if ('id' in product && product.id) {
                    dispatch(updateProduct(product.id, formValues))
                } else if ('number' in product) {
                    dispatch(createProduct(formValues))
                }
                setShow(false)
            })

        const {price} = useSelector(
            (state: IProductsRootState) => ({
                price: state.productsState.price
            }))

        const onChangePrice = (e) => {
            const value = e.target.value
            dispatch(fetchProductPrice(value))
        }

        return (
            show
                ? <div className='card mb-3'>
                    <div className="card-body">
                        <form onSubmit={productFormSubmitHandler}>
                            <div className='mb-3 row'>
                                <div className="col-lg-6">
                                    <label htmlFor='vendorCode'
                                           className='w-100'>
                                        Укажите артикул
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="vendorCode"
                                           ref={register}
                                           type="text"
                                           placeholder="Введите номер"/>
                                    <label htmlFor='nameRu' className='w-100'>
                                        Укажите название товара
                                        <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    RU
                                </span>
                                    </label>
                                    <input name="nameRu" className='col-lg-10'
                                           ref={register}
                                           type="text"
                                           placeholder="Введите название"/>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor='autolongNumber'
                                           className='w-100'>
                                        1с артикул
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="autolongNumber"
                                           ref={register}
                                           type="text"
                                           defaultValue={'number' in product
                                               ? product.number
                                               : ''}
                                           placeholder="Введите номер"/>
                                    <label htmlFor='nameEn' className='w-100'>
                                        Product name
                                        <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    ENG
                                </span>
                                    </label>
                                    <input name="nameEn" className='col-lg-10'
                                           ref={register}
                                           type="text" placeholder="Type here"/>
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <div className="col-lg-6">
                                    <label htmlFor='aboutRu'>
                                        Описание товара</label>
                                    <textarea name="aboutRu" id="aboutRu"
                                              className='col-lg-10 mb-3'
                                              rows={4}
                                              ref={register}
                                              placeholder="Введите описание">
                                </textarea>
                                    <label htmlFor='providerId'>
                                        Выберите поставщика</label>
                                    <select name="providerId" ref={register}
                                            className='col-lg-10 mb-3'
                                            id="providerId">
                                        <option disabled defaultValue=''>
                                            Выберите поставщика
                                        </option>
                                        {providers.map(
                                            (provider: IProvider) => {
                                                return (<option
                                                    key={provider.id}
                                                    value={provider.id}>
                                                    {provider.name}</option>)
                                            })}
                                    </select>
                                    <label>Укажите цену</label>
                                    <div className='row mb-3'>
                                        <div className='col-10'>
                                            <input
                                                name="priceCny"
                                                className='w-100'
                                                ref={register}
                                                type="number"
                                                onChange={onChangePrice}
                                                placeholder="0"/>
                                        </div>
                                        <div className='col-1 pl-0'>
                                    <span
                                        className='priceSymbol
                                        text-orange
                                        font-weight-bold'>
                                        ¥
                                    </span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className='col-4'>
                                            <input
                                                name="priceUsd"
                                                type="number"
                                                ref={register}
                                                defaultValue={'usd' in price
                                                    ? price.usd
                                                    : 0}
                                                className='w-100'
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className='col-2 pl-0'>
                                    <span
                                        className='priceSymbol text-main
                                         font-weight-bold'>
                                    $
                                    </span>
                                        </div>
                                        <div className='col-4'>
                                            <input
                                                name="priceRub"
                                                type="number"
                                                ref={register}
                                                defaultValue={'rub' in price
                                                    ? price.rub
                                                    : 0}
                                                className='w-100'
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className='col-2 pl-0'>
                                    <span
                                        className='priceSymbol text-main
                                        font-weight-bold'>
                                        ₽
                                    </span>
                                        </div>
                                    </div>
                                    <label htmlFor='image' className='w-100'>
                                        Загрузите изображение товара
                                    </label>
                                    {'image' in product && product.image
                                        ? <img width={100} height={100}
                                               src={product.image} alt=""/>
                                        : null
                                    }
                                    <input
                                        name="image" className='col-lg-10 mb-3'
                                        ref={register}
                                        type="file"
                                        placeholder="Путь до изображения"/>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor='aboutEn'>Description</label>
                                    <textarea name="aboutEn" id="aboutEn"
                                              className='col-lg-10' rows={4}
                                              ref={register}
                                              placeholder="Type here">
                                </textarea>
                                    <div className='row mb-3'>
                                        <div className='col-lg-12'>
                                            <label>Укажите вес</label>

                                            <div className='row mb-3'>
                                                <div
                                                    className='col-2 small
                                                    pt-2 font-weight-bold'>
                                                    Брутто
                                                </div>
                                                <div className='col-8'>
                                                    <input name="weightBrutto"
                                                           placeholder="0"
                                                           ref={register}
                                                           type="number"
                                                           className='w-100'/>
                                                </div>
                                                <div className='col-2
                                                priceSymbol
                                                text-main
                                                font-weight-bold pl-0'>
                                                    кг
                                                </div>
                                            </div>
                                            <div className='row mb-3'>
                                                <div
                                                    className='col-2 small
                                            pt-2 font-weight-bold'
                                                >
                                                    Нетто
                                                </div>
                                                <div className='col-8'>
                                                    <input name="weightNetto"
                                                           className='w-100'
                                                           ref={register}
                                                           type="number"
                                                           placeholder="0"/>
                                                </div>
                                                <div className='col-2
                                                priceSymbol
                                            text-main font-weight-bold pl-0'>
                                                    кг
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <button className='btn btn-success'
                                                    type="submit">
                                                {'id' in product && product.id
                                                    ? 'Обновить'
                                                    : 'Добавить'}
                                            </button>
                                            <button>
                                                Отменить добавление
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                : null
        )
    }

export default ProductFormEdit
