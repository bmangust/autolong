// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'

// Typescript
import {
    IProduct, IProductAutolong,
    IProductPrice, IProductsRootState
} from '../IProducts'
import {IProvider} from '../../Providers/IProviders'

// Actions
import {
    createProduct,
    fetchProductPrice,
    updateProduct
} from '../../../store/actions/products'
import TextEditor from '../../UI/TextEditor/TextEditor'

interface IEditProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: string
    aboutRu: string
    aboutEn: string
    providerId: number
    image: string
    imageFile: Blob
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
        let defaultValues

        'id' in product
            ? defaultValues = {
                nameRu: product.nameRu,
                nameEn: product.nameEn,
                vendorCode: product.vendorCode,
                aboutRu: product.aboutRu,
                aboutEn: product.aboutEn,
                image: product.image,
                autolongNumber: product.autolongNumber,
                priceCny: product.price.cny,
                priceRub: product.price.rub,
                priceUsd: product.price.usd,
                weightNetto: product.weightNetto,
                weightBrutto: product.weightBrutto
            }
            : defaultValues = {
                nameRu: product.name,
                autolongNumber: product.number,
                image: product.photo,
                vendorCode: product.articul,
                aboutRu: product.text,
                aboutEn: '',
                priceCny: product.price
            }

        const {
            register, handleSubmit, errors, control
        } = useForm<IEditProductData>({
            defaultValues
        })

        let img = ''
        if ('image' in product && product.image) {
            img = product.image
        } else if ('photo' in product && product.photo) {
            img = product.photo
        }

        const [show, setShow] = useState(true)
        const [priceState, setPriceState] =
            useState<IProductPrice>({rub: 0, usd: 0, cny: 0})
        const [dirty, setDirty] = useState<boolean>(false)

        const dispatch = useDispatch()

        const {price}:IProductPrice = useSelector(
            (state: IProductsRootState) => ({
                price: state.productsState.price
            }))

        useEffect(() => {
            setPriceState(price)
        }, [price])

        const productFormSubmitHandler =
            handleSubmit((formValues: IEditProductData) => {
                if (formValues.imageFile[0]) {
                    formValues.image = formValues.imageFile[0]
                }
                // @ts-ignore
                if ('id' in product && product.id) {
                    dispatch(updateProduct(product.id, formValues))
                } else if ('number' in product) {
                    dispatch(createProduct(formValues))
                }
                setShow(false)
            })

        const onChangePrice = (e) => {
            const value = e.target.value
            setDirty(true)
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
                                           ref={register({required: true})}
                                           type="text"
                                           placeholder="Введите название"/>
                                    {errors.nameRu &&
                                    <small>Это поле обязательно</small>}
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor='autolongNumber'
                                           className='w-100'>
                                        Внутренний номер
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="autolongNumber"
                                           ref={register({required: true})}
                                           type="text"
                                           defaultValue={'number' in product
                                               ? product.number
                                               : ''}
                                           placeholder="Введите номер"/>
                                    {errors.autolongNumber &&
                                    <small>Это поле обязательно</small>}
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
                                    <Controller
                                        name="aboutRu"
                                        control={control}
                                        render={({value, onChange}) => (
                                            <TextEditor
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    {errors.aboutRu &&
                                    <small>Это поле обязательно</small>}
                                    <label htmlFor='providerId'>
                                        Выберите поставщика</label>
                                    <select name="providerId"
                                            ref={register({required: true})}
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
                                    {errors.providerId &&
                                    <small>Это поле обязательно</small>}
                                    <label>Укажите цену</label>
                                    <div className='row mb-3'>
                                        <div className='col-10'>
                                            <input
                                                name="priceCny"
                                                className='w-100'
                                                ref={register({required: true})}
                                                type="number"
                                                onChange={onChangePrice}
                                                placeholder="0"/>
                                            {errors.priceCny &&
                                            <small>Это поле обязательно</small>}
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
                                                disabled
                                                value={dirty
                                                    ? priceState.usd
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
                                                disabled
                                                value={dirty
                                                    ? priceState.rub
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
                                    {img
                                        ? <img width={100} height={100}
                                               src={img} alt=""/>
                                        : null
                                    }
                                    <input className='hidden d-none'
                                           ref={register}
                                           name='image' type="hidden"/>
                                    <input
                                        name="imageFile"
                                        className='col-lg-10 mb-3'
                                        ref={register}
                                        type="file"
                                        placeholder="Путь до изображения"/>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor='aboutEn'>Description</label>
                                    <Controller
                                        name="aboutEn"
                                        control={control}
                                        render={({value, onChange}) => (
                                            <TextEditor
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
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
                                                           ref={register(
                                                               {required: true}
                                                           )}
                                                           type="number"
                                                           className='w-100'/>
                                                    {errors.weightBrutto &&
                                                    <small>
                                                        Это поле обязательно
                                                    </small>}
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
                                                           ref={register(
                                                               {required: true}
                                                           )}
                                                           type="number"
                                                           placeholder="0"/>
                                                    {errors.weightNetto &&
                                                    <small>
                                                        Это поле обязательно
                                                    </small>}
                                                </div>
                                                <div className='col-2
                                                priceSymbol
                                            text-main font-weight-bold pl-0'>
                                                    кг
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <button
                                                className='btn btn-success mr-3'
                                                type="submit">
                                                {'id' in product && product.id
                                                    ? 'Обновить'
                                                    : 'Добавить'}
                                            </button>
                                            <button className='btn btn-light'>
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
