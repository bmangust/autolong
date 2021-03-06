// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'

// Typescript
import {IProductPrice} from '../IProducts'
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'

// Actions
import {createProduct} from '../../../store/actions/products'
import {fetchProviders} from '../../../store/actions/providers'
import TextEditor from '../../UI/TextEditor/TextEditor'
import {currencyConversion} from '../../../utils'

interface ICreateProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: number
    aboutRu: string
    aboutEn: string
    providerId: number
    image: string
    hsCode: string
    priceCny: number
    weightNetto: number
    weightBrutto: number
}

const ProductForm: React.FC = () => {
    const {
        register, handleSubmit, errors, control
    } = useForm<ICreateProductData>({
        defaultValues: {
            aboutEn: '',
            aboutRu: ''
        }
    })

    const [priceState, setPriceState] =
        useState<IProductPrice>({rub: 0, usd: 0, cny: 0})

    const dispatch = useDispatch()
    const history = useHistory()

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    const providersOptions = providers.map(
        (provider: IProvider) => {
            return {
                label: provider.name,
                value: provider.id
            }
        })

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const productFormSubmitHandler =
        handleSubmit((formValues: ICreateProductData) => {
            formValues.image = formValues.image[0]
            formValues.providerId = formValues.providerId.value
            dispatch(createProduct(formValues, '/products'))
        })

    const select = <Select
        placeholder='???????????????? ????????????????????'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const onChangePrice = (e, currencyCode) => {
        const value = e.target.value
        setPriceState(currencyConversion(+value, currencyCode))
    }

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={productFormSubmitHandler}>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label htmlFor='nameRu' className='w-100'>
                                ?????????????? ???????????????? ????????????
                                <span className="float-right
                                    text-main
                                    font-weight-bold
                                    ">
                                    RU
                                </span>
                            </label>
                            <input name="nameRu" className='col-lg-10'
                                   ref={register({required: true})}
                                   type="text" placeholder="?????????????? ????????????????"/>
                            {errors.nameRu &&
                            <small>?????? ???????? ??????????????????????</small>}
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
                            <input name="nameEn" className='col-lg-10'
                                   ref={register}
                                   type="text" placeholder="Type here"/>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label htmlFor='aboutRu'>???????????????? ????????????</label>
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
                            <small>?????? ???????? ??????????????????????</small>}
                            <div className='row'>
                                <div className="col-lg-12">
                                    <label htmlFor='vendorCode'
                                           className='w-100'>
                                        ?????????????? ??????????????
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="vendorCode"
                                           ref={register({required: true})}
                                           type="text"
                                           placeholder="?????????????? ??????????"/>
                                    {errors.vendorCode &&
                                    <small>?????? ???????? ??????????????????????</small>}

                                    <label htmlFor='autolongNumber'
                                           className='w-100'>
                                        ???????????????????? ??????????
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="autolongNumber"
                                           ref={register({required: true})}
                                           type="number"
                                           placeholder="?????????????? ??????????"/>
                                    {errors.autolongNumber &&
                                    <small>?????? ???????? ??????????????????????</small>}

                                    <label htmlFor='hsCode'
                                           className='w-100'>
                                        HS code
                                    </label>
                                    <input className='col-lg-10 mb-3'
                                           name="hsCode"
                                           ref={register}
                                           type="string"
                                           placeholder="?????????????? HS code"/>

                                    <label htmlFor='providerId'
                                           className='w-100'>
                                        ???????????????? ????????????????????
                                    </label>
                                    <div className='col-lg-10 mb-3 p-0'>
                                        <Controller
                                            defaultValue=''
                                            name="providerId"
                                            as={select}
                                            options={providersOptions}
                                            control={control}
                                            rules={{required: true}}
                                        />
                                        {errors.providerId &&
                                        <small>?????? ???????? ??????????????????????</small>}
                                    </div>

                                    <label htmlFor='image' className='w-100'>
                                        ?????????????????? ?????????????????????? ????????????
                                    </label>
                                    <input
                                        name="image" className='col-lg-10 mb-3'
                                        ref={register}
                                        type="file"
                                        placeholder="???????? ???? ??????????????????????"/>
                                </div>
                            </div>
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
                                <div className='col-lg-12 mb-3'>
                                    <label>?????????????? ????????</label>
                                    <div className='row'>
                                        <div className='col-lg-10 col-11 mb-3'>
                                            <input name="priceCny"
                                                   className='w-100'
                                                   ref={register(
                                                       {required: true}
                                                   )}
                                                   onChange={(e) =>
                                                       onChangePrice(e, 'cny')}
                                                   value={priceState.cny.toString()}
                                                   step={0.01}
                                                   type="number"
                                                   placeholder="0"/>
                                            {errors.priceCny &&
                                            <small>?????? ???????? ??????????????????????</small>}
                                        </div>
                                        <div className='col-1 pl-0'>
                                            <span
                                                className='priceSymbol
                                                text-orange
                                                font-weight-bold'>
                                                ??
                                            </span>
                                        </div>
                                        <div className='col-xl-4
                                        col-lg-10 col-11'>
                                            <input
                                                name="priceUsd"
                                                type="number"
                                                onChange={(e) =>
                                                    onChangePrice(e, 'usd')}
                                                value={priceState.usd?.toString()}
                                                step={0.01}
                                                className='w-100'
                                                placeholder="0"
                                                disabled
                                            />
                                        </div>
                                        <div className='col-xl-2 col-1 pl-0'>
                                            <span className='priceSymbol text-main font-weight-bold'>$</span>
                                        </div>
                                        <div className='col-xl-4 col-lg-10 col-11 mt-xl-0 mt-3'>
                                            <input
                                                name="priceRub"
                                                type="number"
                                                onChange={(e) =>
                                                    onChangePrice(e, 'rub')}
                                                value={priceState.rub?.toString()}
                                                step={0.01}
                                                className='w-100'
                                                placeholder="0"
                                                disabled
                                            />
                                        </div>
                                        <div className='col-xl-2 col-1 pl-0 mt-xl-0 mt-3'>
                                            <span className='priceSymbol text-main font-weight-bold'>???</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-12'>
                                    <label>?????????????? ??????</label>

                                    <div className='row mb-3'>
                                        <div
                                            className='col-xl-2 col-3 small
                                            pt-2 font-weight-bold'>
                                            ????????????
                                        </div>
                                        <div className='col-xl-8
                                         col-lg-7 col-8'>
                                            <input name="weightBrutto"
                                                   placeholder="0"
                                                   ref={register(
                                                       {required: true}
                                                   )}
                                                   type="number"
                                                   className='w-100'/>
                                            {errors.weightBrutto &&
                                            <small>?????? ???????? ??????????????????????</small>}
                                        </div>
                                        <div className='col-xl-2
                                            col-lg-2 col-1 priceSymbol
                                            text-main font-weight-bold pl-0'>
                                            ????
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div
                                            className='col-xl-2 col-3 small
                                            pt-2 font-weight-bold'
                                        >

                                        </div>
                                        <div className='col-xl-8 col-lg-7
                                        col-8'>
                                            <input name="weightNetto"
                                                   className='w-100'
                                                   ref={register(
                                                       {required: true}
                                                   )}
                                                   type="number"
                                                   placeholder="0"/>
                                            {errors.weightNetto &&
                                            <small>?????? ???????? ??????????????????????</small>}
                                        </div>
                                        <div className='
                                        col-xl-2 col-lg-2 col-1 priceSymbol
                                        text-main font-weight-bold pl-0'>
                                            ????
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='btn btn-light mb-2 mt-2 mr-3'>
                            ??????????
                        </button>
                        <button className='btn btn-success mb-2 mt-2'
                                type="submit">
                            ??????????????????
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
