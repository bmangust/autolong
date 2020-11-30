// React
import React, {useEffect, useState} from 'react'

// Styles
import classes from './ProductItemForm/ProductItemForm.module.css';

// Third-party
import {useDispatch} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import bsCustomFileInput from 'bs-custom-file-input'
import Select from 'react-select'

// Typescript
import {
    IProduct,
    IProductPrice
} from '../IProducts'
import {IProvider} from '../../Providers/IProviders'

// Actions
import {
    updateProduct,
    updateProductImageById
} from '../../../store/actions/products'

// App
import TextEditor from '../../UI/TextEditor/TextEditor'
import {currencyConversion} from '../../../utils'

interface IEditProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: number
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
    product: IProduct,
    providers: IProvider[]
}> =
    ({product, providers}) => {
        const [priceState, setPriceState] =
            useState<IProductPrice>({rub: '0', usd: '0', cny: '0'})

        const providersOptions = providers.map(
            (provider: IProvider) => {
                return {
                    label: provider.name,
                    value: provider.id
                }
            })

        const defaultValues = {
            nameRu: product.nameRu,
            nameEn: product.nameEn,
            vendorCode: product.vendorCode,
            aboutRu: product.aboutRu,
            aboutEn: product.aboutEn,
            image: product.image,
            providerId:
                product.provider && product.provider.id
                    ? providersOptions.filter(({value}) =>
                    value === product.provider.id)[0]
                    : null,
            autolongNumber: +product.autolongNumber,
            hsCode: product.hsCode,
            priceCny: product.price.cny,
            priceRub: product.price.rub,
            priceUsd: product.price.usd,
            weightNetto: product.weightNetto,
            weightBrutto: product.weightBrutto
        }

        useEffect(() => {
            setPriceState(currencyConversion(product.price.cny, 'cny'))
        }, [product.price.cny])

        const {
            register, handleSubmit, errors, control
        } = useForm<IEditProductData>({
            defaultValues
        })

        let img = '/imgs/placeholder-product-image.png'
        if ('image' in product && product.image) {
            img = product.image
        }

        const dispatch = useDispatch()

        const productFormSubmitHandler =
            handleSubmit((formValues: IEditProductData) => {
                formValues.providerId = formValues.providerId.value
                dispatch(updateProduct(product.id, formValues,
                    `/product/${product.id}`))
                if (formValues.imageFile[0]) {
                    dispatch(updateProductImageById(product.id,
                        {image: formValues.imageFile[0]}))
                }
            })

        const onChangePrice = (e, currencyCode) => {
            const value = e.target.value
            setPriceState(currencyConversion(+value, currencyCode))
        }

        const fileInput =
            <input
                type="file"
                name="imageFile"
                ref={register}
                className="custom-file-input"
            />

        const providerSelect = <Select
            placeholder='Выберите поставщика'
            classNamePrefix='select-mini'
            className='select-mini'
        />

        bsCustomFileInput.init()

        const content =
            <div className='card mb-3'>
                <div className="card-body">
                    <form onSubmit={productFormSubmitHandler}>
                        <div className='mb-3 row'>
                            <div className="col-lg-6">
                                <label htmlFor='autolongNumber'
                                       className='w-100 required'>
                                    Внутренний номер
                                </label>
                                <input className='col-lg-10 mb-3'
                                       name="autolongNumber"
                                       ref={register({required: true})}
                                       type="number"
                                       defaultValue={product.autolongNumber}
                                       placeholder="Введите номер"/>
                                {errors.autolongNumber &&
                                <small>Это поле обязательно</small>}

                                <label htmlFor='hsCode'
                                       className='w-100'>
                                    HS code
                                </label>
                                <input className='col-lg-10 mb-3'
                                       name="hsCode"
                                       ref={register}
                                       type="string"
                                       placeholder="Введите HS code"/>

                                <label htmlFor='vendorCode'
                                       className='w-100'>
                                    Укажите артикул
                                </label>
                                <input className='col-lg-10 mb-3'
                                       name="vendorCode"
                                       ref={register}
                                       type="text"
                                       placeholder="Введите номер"/>

                            </div>
                            <div className="col-lg-6">

                                <div className="row mb-3">
                                    <div className="col-lg-2 col-3 pr-0">
                                        {img
                                            ? <img
                                             className={classes.ProductItemImg}
                                                   src={img} alt=""/>
                                            : null
                                        }
                                    </div>
                                    <div className="col-lg-8">
                                        <label htmlFor='image'>
                                            Загрузка изображения
                                        </label>
                                        <div className="custom-file">
                                            <input className='hidden d-none'
                                                   ref={register}
                                                   name='image'
                                                   type="hidden"/>
                                            {fileInput}
                                            <label
                                                className="custom-file-label"
                                                htmlFor="imageFile">
                                                Выберите файл
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <label className='required'
                                       htmlFor='providerId'>
                                    Выберите поставщика
                                </label>
                                <div className='col-lg-10 mb-3 p-0'>
                                    <Controller
                                        name="providerId"
                                        as={providerSelect}
                                        defaultValue=''
                                        options={providersOptions}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                    {errors.providerId &&
                                    <small>Это поле обязательно</small>}
                                </div>
                            </div>
                        </div>

                        <div className='mb-3 row'>
                            <div className='col-lg-6'>
                                <label htmlFor='nameRu'
                                       className='w-100 required'>
                                    Укажите название товара
                                    <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    RU
                                </span>
                                </label>
                                <input name="nameRu"
                                       className='col-lg-10 mb-3'
                                       ref={register({required: true})}
                                       type="text"
                                       placeholder="Введите название"/>
                                {errors.nameRu &&
                                <small>Это поле обязательно</small>}
                                <label htmlFor='aboutRu'>
                                    Описание товара</label>
                                <div className="row">

                                    <div className="col-lg-10">
                                        <Controller
                                            name="aboutRu"
                                            control={control}
                                            defaultValue=''
                                            render={({value, onChange}) => (
                                                <TextEditor
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {errors.aboutRu &&
                                        <small>Это поле обязательно</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-lg-0 mt-3">
                                <label htmlFor='nameEn' className='w-100'>
                                    Product name
                                    <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    ENG
                                </span>
                                </label>
                                <input name="nameEn"
                                       className='col-lg-10 mb-3'
                                       ref={register}
                                       type="text" placeholder="Type here"/>


                                <label htmlFor='aboutEn'>Description</label>
                                <div className="row">

                                    <div className="col-lg-10">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <div className="col-lg-6">
                                <label className='required'>
                                    Укажите цену</label>
                                <div className='row mb-3'>
                                    <div className='col-lg-10 col-11'>
                                        <input
                                            name="priceCny"
                                            className='w-100'
                                            ref={register({required: true})}
                                            type="number"
                                            value={priceState.cny}
                                            min={0}
                                            step={0.01}
                                            onChange={(e) =>
                                                onChangePrice(e, 'cny')}
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
                                    <div className='col-xl-4 col-lg-10 col-11'>
                                        <input
                                            name="priceUsd"
                                            type="number"
                                            ref={register}
                                            onChange={(e) =>
                                                onChangePrice(e, 'usd')}
                                            value={priceState.usd}
                                            min={0}
                                            step={0.01}
                                            className='w-100'
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className='col-xl-2 col-1 pl-0'>
                                    <span
                                        className='priceSymbol text-main
                                         font-weight-bold'>
                                    $
                                    </span>
                                    </div>
                                    <div className='col-xl-4 col-lg-10
                             col-11 mt-xl-0 mt-3'>
                                        <input
                                            name="priceRub"
                                            type="number"
                                            ref={register}
                                            onChange={(e) =>
                                                onChangePrice(e, 'rub')}
                                            value={priceState.rub}
                                            min={0}
                                            step={0.01}
                                            className='w-100'
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className='col-xl-2 col-1
                                    pl-0 mt-xl-0 mt-3'>
                                    <span
                                        className='priceSymbol text-main
                                        font-weight-bold'>
                                        ₽
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className='row mb-3'>
                                    <div className='col-lg-12'>
                                        <label>Укажите вес</label>

                                        <div className='row mb-3'>
                                            <div
                                                className='col-xl-2 col-3 small
                                                pt-2 font-weight-bold'>
                                                Брутто
                                            </div>
                                            <div className='col-xl-8
                                             col-lg-7 col-8'>
                                                <input name="weightBrutto"
                                                       placeholder="0"
                                                       ref={register}
                                                       type="number"
                                                       className='w-100'/>
                                                {errors.weightBrutto &&
                                                <small>
                                                    Это поле обязательно
                                                </small>}
                                            </div>
                                            <div className='col-xl-2 col-lg-2
                                                col-1
                                                priceSymbol
                                                text-main
                                                font-weight-bold pl-0'>
                                                кг
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div
                                                className='col-xl-2 col-3 small
                                            pt-2 font-weight-bold'
                                            >
                                                Нетто
                                            </div>
                                            <div className='col-xl-8 col-lg-7
                                            col-8'>
                                                <input name="weightNetto"
                                                       className='w-100'
                                                       ref={register}
                                                       type="number"
                                                       placeholder="0"/>
                                                {errors.weightNetto &&
                                                <small>
                                                    Это поле обязательно
                                                </small>}
                                            </div>
                                            <div className='
                                            col-xl-2 col-lg-2 col-1
                                            priceSymbol text-main
                                            font-weight-bold pl-0'>
                                                кг
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <button
                                            className='btn btn-success
                                             mb-2 mt-2 mr-3'
                                            type="submit">
                                            Обновить
                                        </button>
                                        <button className='btn btn-light
                                         mb-2 mt-2'>
                                            Отменить добавление
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        return (content)
    }

export default ProductFormEdit
