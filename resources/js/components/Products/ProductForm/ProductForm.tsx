// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'

// Typescript
import {IProductsRootState} from '../IProducts'
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'

// Actions
import {createProduct, fetchProductPrice} from '../../../store/actions/products'
import {fetchProviders} from '../../../store/actions/providers'

interface ICreateProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    aboutRu: string
    aboutEn: string
    providerId: number
    image: string
    priceCny: number
    weightNetto: number
    weightBrutto: number
}

const ProductForm: React.FC = () => {
    const {
        register, handleSubmit
    } = useForm<ICreateProductData>()

    const dispatch = useDispatch()
    const history = useHistory()

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    const {price} = useSelector(
        (state: IProductsRootState) => ({
            price: state.productsState.price
        }))

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const productFormSubmitHandler =
        handleSubmit((formValues: ICreateProductData) => {
            formValues.image = formValues.image[0]
            dispatch(createProduct(formValues))
            history.push('/products')
        })

    const onChangePrice = (e) => {
        const value = e.target.value
        dispatch(fetchProductPrice(value))
    }

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={productFormSubmitHandler}>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
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
                                   type="text" placeholder="Введите название"/>
                        </div>
                        <div className="col-lg-6">
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
                            <label htmlFor='aboutRu'>Описание товара</label>
                            <textarea name="aboutRu" id="aboutRu"
                                      className='col-lg-10 mb-3' rows={4}
                                      ref={register}
                                      placeholder="Введите описание">
                            </textarea>
                            <div className='row'>
                                <div className="col-lg-12">
                                    <label htmlFor='vendorCode'
                                           className='w-100'>
                                        Укажите артикул
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="vendorCode"
                                           ref={register}
                                           type="text"
                                           placeholder="Введите номер"/>
                                    <label htmlFor='catalogId'
                                           className='w-100'>
                                        Выберите поставщика
                                    </label>
                                    <select name="catalogId" ref={register}
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
                                    <label htmlFor='image' className='w-100'>
                                        Загрузите изображение товара
                                    </label>
                                    <input
                                        name="image" className='col-lg-10 mb-3'
                                        ref={register}
                                        type="file"
                                        placeholder="Путь до изображения"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor='aboutEn'>Description</label>
                            <textarea name="aboutEn" id="aboutEn"
                                      className='col-lg-10' rows={4}
                                      ref={register}
                                      placeholder="Type here">
                                </textarea>
                            <div className='row mb-3'>
                                <div className='col-lg-12 mb-3'>
                                    <label>Укажите цену</label>
                                    <div className='row'>
                                        <div className='col-10 mb-3'>
                                            <input name="priceCny"
                                                   className='w-100'
                                                   ref={register}
                                                   onChange={onChangePrice}
                                                   type="number"
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
                                        <div className='col-4'>
                                            <input
                                                name="priceUsd"
                                                type="number"
                                                value={'usd' in price
                                                    ? price.usd
                                                    : 0}
                                                className='w-100'
                                                placeholder="0"
                                                disabled
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
                                                value={'rub' in price
                                                    ? price.rub
                                                    : 0}
                                                className='w-100'
                                                placeholder="0"
                                                disabled
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

                                </div>
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
                                        <div className='col-2 priceSymbol
                                            text-main font-weight-bold pl-0'>
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
                                        <div className='col-2 priceSymbol
                                            text-main font-weight-bold pl-0'>
                                            кг
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='mr-3 btn btn-light'>
                            Назад
                        </button>
                        <button className='btn btn-success'
                                type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
