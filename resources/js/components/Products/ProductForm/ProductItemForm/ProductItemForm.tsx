// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import bsCustomFileInput from 'bs-custom-file-input'
import Select from 'react-select'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Typescript
import {IProduct, IProductAutolong} from '../../IProducts'
import {IProvider} from '../../../Providers/IProviders'

// Styles
import classes from './ProductItemForm.module.css'

// Actions
import {
    createProduct,
    updateProduct,
    updateProductImageById
} from '../../../../store/actions/products'

// App
import TextEditor from '../../../UI/TextEditor/TextEditor'
import {currencyConversion} from '../../../../utils'
import Form from '../../../UI/Form/Form'
import Input from '../../../UI/Inputs/Input/Input'

interface IEditProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: number
    published: number
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

type Props = {
    product: IProduct | IProductAutolong
    providers: IProvider[]
    onHide: Function
    unpublished: string
    isOrdersPage?: boolean
}

const ProductItemForm: React.FC<Props> = (props) => {
    const {product, providers, onHide, unpublished = 'published', isOrdersPage} = props
    let defaultValues

    const [priceState, setPriceState] = useState({rub: 0, usd: 0, cny: 0})

    const providersOptions = providers.map(
        (provider: IProvider) => {
            return {
                label: provider.name,
                value: provider.id
            }
        })

    let schema: yup.ObjectSchema<yup.Shape<object | undefined, { nameRu: string }>> = yup.object()
        .shape({
            autolongNumber: yup.string()
                .required(),
            providerId: yup.object()
                .required(),
            nameRu: yup.string()
                .required()
            // priceCny: yup.number().positive().integer().required()
        })

    if (unpublished === 'unpublished') {
        providersOptions.unshift({
            label: '???? ?????????????????? ????????????????????',
            value: 0
        })
        schema = yup.object()
            .shape({
                nameRu: yup.string()
                    .required(),
                providerId: yup.object()
                    .required()
            })
    }

    'id' in product
        ? defaultValues = {
            nameRu: product.nameRu,
            nameEn: product.nameEn,
            vendorCode: product.vendorCode,
            aboutRu: product.aboutRu,
            aboutEn: product.aboutEn,
            image: product.image,
            providerId: providersOptions
                .filter(({value}) => value === product.providerId)[0],
            autolongNumber: +product.autolongNumber,
            hsCode: product.hsCode || null,
            priceCny: product.price.cny,
            priceRub: product.price.rub,
            priceUsd: product.price.usd,
            weightNetto: product.weightNetto,
            weightBrutto: product.weightBrutto
        }
        : defaultValues = {
            nameRu: product.name,
            autolongNumber: +product.number,
            image: product.photo,
            vendorCode: product.articul,
            aboutRu: product.text,
            aboutEn: '',
            priceRub: product.price
        }

    const {register, handleSubmit, errors, control} = useForm<IEditProductData>({
        defaultValues, resolver: yupResolver(schema)
    })

    let img = '/imgs/placeholder-product-image.png'
    if ('image' in product && product.image) {
        img = product.image
    } else if ('photo' in product && product.photo) {
        img = product.photo
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (!('id' in product && product.id)) {
            product.price
                ? setPriceState(currencyConversion(+product.price, 'rub'))
                : setPriceState(currencyConversion(0, 'cny'))
        } else {
            setPriceState(currencyConversion(+product.price.cny, 'cny'))
        }
    }, [product])

    const productFormSubmitHandler = handleSubmit((formValues: IEditProductData) => {
        formValues.published = unpublished === 'unpublished' ? 0 : 1
        formValues.providerId = formValues.providerId.value === 0 ? null : formValues.providerId.value
        if ('id' in product && product.id) {
            dispatch(updateProduct(product.id, formValues))
            if (formValues.imageFile[0]) {
                dispatch(updateProductImageById(product.id,
                    {image: formValues.imageFile[0]}))
            }
        } else if ('number' in product) {
            if (formValues.imageFile[0]) {
                formValues.image = formValues.imageFile[0]
            }
            dispatch(createProduct(formValues, '', isOrdersPage))
        }
        onHide('number' in product ? product.number : product.autolongNumber)
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
        placeholder='???????????????? ????????????????????'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    bsCustomFileInput.init()

    return <div className='card mb-3'>
        <div className="card-body">
            <Form onSubmit={productFormSubmitHandler}>

                {unpublished !== 'unpublished'
                    ? <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label
                                htmlFor='autolongNumber'
                                className='w-100 required'>
                                ???????????????????? ??????????
                            </label>
                            <input
                                className='col-lg-10 mb-3'
                                name="autolongNumber"
                                ref={register}
                                type="text"
                                defaultValue={'number' in product
                                    ? product.number
                                    : ''}
                                placeholder="?????????????? ??????????"
                            />
                            {errors.autolongNumber &&
                            <small>?????? ???????? ??????????????????????</small>}

                            <label htmlFor='hsCode'
                                   className='w-100'>
                                HS code
                            </label>
                            <input
                                className='col-lg-10 mb-3'
                                name="hsCode"
                                ref={register}
                                type="number"
                                placeholder="?????????????? HS code"
                            />

                            <label htmlFor='vendorCode'
                                   className='w-100'>
                                ?????????????? ??????????????
                            </label>
                            <input
                                className='col-lg-10 mb-3'
                                name="vendorCode"
                                ref={register}
                                type="text"
                                placeholder="?????????????? ??????????"
                            />
                        </div>
                        <div className="col-lg-6 mt-lg-0 mt-3">
                            <div className="row mb-3">
                                <div className="col-lg-2 col-3 pr-0">
                                    {img
                                        ? <img className={classes.ProductItemImg}
                                               src={img} alt=""/>
                                        : null
                                    }
                                </div>
                                <div className="col-lg-8 mt-lg-0 mt-2">
                                    <label htmlFor='image'>
                                        ???????????????? ??????????????????????
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
                                            ???????????????? ????????
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <label className='required'
                                   htmlFor='providerId'>
                                ???????????????? ????????????????????
                            </label>
                            <div className='col-lg-10 mb-3 p-0'>
                                <Controller
                                    name="providerId"
                                    as={providerSelect}
                                    defaultValue=''
                                    options={providersOptions}
                                    control={control}
                                />
                                {errors.providerId &&
                                <small>?????? ???????? ??????????????????????</small>}
                            </div>
                        </div>
                    </div>
                    : <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <div className='col-lg-10 mb-3 p-0'>
                                <label htmlFor='vendorCode'
                                       className='w-100'>
                                    ?????????????? ??????????????
                                </label>
                                <input
                                    className='mb-3'
                                    name="vendorCode"
                                    ref={register}
                                    type="text"
                                    placeholder="?????????????? ??????????"
                                />
                                <label
                                    htmlFor='providerId'>
                                    ???????????????? ????????????????????
                                </label>
                                <Controller
                                    name="providerId"
                                    as={providerSelect}
                                    defaultValue={
                                        {
                                            label: '???? ?????????????????? ????????????????????',
                                            value: 0
                                        }
                                    }
                                    options={providersOptions}
                                    control={control}
                                />
                                {errors.providerId &&
                                <small>?????? ???????? ??????????????????????</small>}
                            </div>
                        </div>
                        <div className="col-lg-6 mt-lg-0 mt-3">
                            <div className="row mb-3">
                                <div className="col-lg-2 col-3 pr-0">
                                    {img
                                        ? <img className={classes.ProductItemImg}
                                               src={img} alt=""/>
                                        : null
                                    }
                                </div>
                                <div className="col-lg-8 mt-lg-0 mt-2">
                                    <label htmlFor='image'>
                                        ???????????????? ??????????????????????
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
                                            ???????????????? ????????
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className='mb-3 row'>
                    <div className='col-lg-6'>
                        <label
                            htmlFor='nameRu'
                            className='w-100 required'>
                            ?????????????? ???????????????? ????????????
                            <span className="float-right text-main font-weight-bold ">
                                RU
                            </span>
                        </label>
                        <input
                            name="nameRu"
                            className='col-lg-10 mb-3'
                            ref={register}
                            type="text"
                            placeholder="?????????????? ????????????????"
                        />
                        {errors.nameRu &&
                        <small>?????? ???????? ??????????????????????</small>}
                        <label htmlFor='aboutRu'>
                            ???????????????? ????????????</label>
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
                                <small>?????? ???????? ??????????????????????</small>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-lg-0 mt-3">
                        <label htmlFor='nameEn' className='w-100'>
                            Product name
                            <span className="float-right text-main font-weight-bold ">
                                ENG
                            </span>
                        </label>
                        <input
                            name="nameEn"
                            className='col-lg-10 mb-3'
                            ref={register}
                            type="text" placeholder="Type here"
                        />

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
                            ?????????????? ????????</label>
                        <div className='row mb-3'>
                            <div className='col-lg-10 col-11'>
                                <Input
                                    name="priceCny"
                                    style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                    className='w-100'
                                    ref={register}
                                    type="number"
                                    value={priceState.cny}
                                    onChange={(e) => onChangePrice(e, 'cny')}
                                    placeholder="0"
                                />
                                {errors.priceCny &&
                                <small>?????? ???????? ??????????????????????</small>}
                            </div>
                            <div className='col-1 pl-0'>
                                <span className='priceSymbol text-orange font-weight-bold'>
                                    ??
                                </span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-xl-4 col-lg-10 col-11'>
                                <Input
                                    name="priceUsd"
                                    style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                    type="number"
                                    ref={register}
                                    onChange={(e) => onChangePrice(e, 'usd')}
                                    value={priceState.usd}
                                    className='w-100'
                                    placeholder="0"
                                />
                            </div>
                            <div className='col-xl-2 col-1 pl-0'>
                                <span className='priceSymbol text-main font-weight-bold'>
                                    $
                                </span>
                            </div>
                            <div className='col-xl-4 col-lg-10 col-11 mt-xl-0 mt-3'>
                                <Input
                                    name="priceRub"
                                    style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                    type="number"
                                    ref={register}
                                    onChange={(e) => onChangePrice(e, 'rub')}
                                    value={priceState.rub}
                                    className='w-100'
                                    placeholder="0"
                                />
                            </div>
                            <div className='col-xl-2 col-1 pl-0 mt-xl-0 mt-3'>
                                <span className='priceSymbol text-main font-weight-bold'>
                                    ???
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='row mb-3'>
                            <div className='col-lg-12'>
                                <label>?????????????? ??????</label>

                                <div className='row mb-3'>
                                    <div className='col-xl-2 col-3 small pt-2 font-weight-bold'>
                                        ????????????
                                    </div>
                                    <div className='col-xl-8 col-lg-7 col-8'>
                                        <input name="weightBrutto"
                                               placeholder="0"
                                               ref={register}
                                               type="number"
                                               className='w-100'/>
                                        {errors.weightBrutto &&
                                        <small>
                                            ?????? ???????? ??????????????????????
                                        </small>}
                                    </div>
                                    <div
                                        className='col-xl-2 col-lg-2 col-1 priceSymbol  text-main font-weight-bold pl-0'>
                                        ????
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-xl-2 col-3 small pt-2 font-weight-bold'>
                                        ??????????
                                    </div>
                                    <div className='col-xl-8 col-lg-7 col-8'>
                                        <input name="weightNetto"
                                               className='w-100'
                                               ref={register}
                                               type="number"
                                               placeholder="0"/>
                                        {errors.weightNetto &&
                                        <small>
                                            ?????? ???????? ??????????????????????
                                        </small>}
                                    </div>
                                    <div
                                        className='col-xl-2 col-lg-2 col-1 priceSymbol text-main font-weight-bold pl-0'>
                                        ????
                                    </div>
                                </div>

                            </div>
                            <div className={classes.btns + ' col-lg-12'}>
                                <button
                                    className='btn btn-success'
                                    type="submit">
                                    {'id' in product && product.id
                                        ? '????????????????'
                                        : '????????????????'}
                                </button>
                                <button className='btn btn-light'>
                                    ???????????????? ????????????????????
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default ProductItemForm
