// React
import React, {useState} from 'react'

// Third-party
import {useHistory} from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'

// Typescript
import {ICountry} from '../../Сountries/ICountries'
import {ICatalog} from '../../Catalogs/ICatalogs'

// Styles
import classes from './ProviderForm.module.css'

// Actions
import {createProvider} from '../../../store/actions/providers'

// App
import SvgClose from '../../UI/iconComponents/Close'
import SvgCatalog from '../../UI/iconComponents/Catalog'
import {useDispatch} from 'react-redux'

interface ICreateProviderData {
    name: string
    nameCompany: string
    email: string
    website: string
    phone: string
    wechat: string
    countryId: string
    catalogs: any
    beneficiaryName: string
    beneficiaryAccountName: string
    beneficiaryBankAddress: string
    beneficiaryAddress: string
    beneficiaryBankName: string
    beneficiaryBankCode: string
    beneficiarySwiftAddress: string
    manufacturer: string
}

const ProviderForm: React.FC<{
    countries: ICountry[], catalogs: ICatalog[]
}> = ({countries, catalogs}) => {
    const {
        register, handleSubmit,
        errors, control
    } = useForm<ICreateProviderData>()

    const history = useHistory()
    const dispatch = useDispatch()

    const [catalogsArr] =
        useState<Array<{ label: string, value: number }>>(() => {
            return catalogs.map(
                (catalog: ICatalog) => {
                    return {
                        label: catalog.name,
                        value: catalog.id
                    }
                })
        })

    const [activeCatalogsArr, setActiveCatalogsArr] =
        useState<Array<{ label: string, value: number }>>([])

    const onDeleteHandler = (catId) => {
        const newCatalogsArr = activeCatalogsArr
            .filter(el => el.value !== catId)
        setActiveCatalogsArr(newCatalogsArr)
    }

    const onChangeHandler = (newValue: any) => {
        setActiveCatalogsArr(newValue)
    }

    const countriesSelect = <Select
        placeholder='Выберите страну'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const countriesOptions = countries.map(
        (country: ICountry) => {
            return {
                label: country.name,
                value: country.id
            }
        })

    const providerFormSubmitHandler =
        handleSubmit((formValues: ICreateProviderData) => {
            const newCatalogsArr = []
            activeCatalogsArr.forEach(catalog => {
                newCatalogsArr.push(catalog.value)
            })
            formValues.catalogs = newCatalogsArr
            formValues.countryId = formValues.countryId.value
            dispatch(createProvider(formValues, '/providers'))
        })

    return <div className='card'>
        <div className="card-body">
            <form onSubmit={providerFormSubmitHandler}>
                <div className='mb-3 row'>
                    <div className="col-lg-6">
                        <label className='w-100 required' htmlFor='name'>
                            Укажите поставщика
                        </label>
                        <input name="name" className='col-lg-10'
                               ref={register({required: true})}
                               type="text"
                               placeholder="Введите название для системы"/>
                        {errors.name &&
                        <small>Это поле обязательно</small>}
                    </div>
                    <div className="col-lg-6">
                        <label className='w-100 required'
                               htmlFor='nameCompany'>
                            Укажите название компании
                        </label>
                        <input name="nameCompany" type="text"
                               ref={register({required: true})}
                               className='col-lg-10'
                               placeholder="Введите название"/>
                        {errors.nameCompany &&
                        <small>Это поле обязательно</small>}
                    </div>

                    <div className="col-lg-12 mt-4 mb-3">
                        <h2>Общая информация</h2>
                    </div>

                    <div className="col-lg-6">
                        <label className='w-100' htmlFor='email'>
                            Укажите почту
                        </label>
                        <input name="email" className='col-lg-10 mb-2'
                               ref={register}
                               type="email" placeholder="Введите почту"/>

                        <label className='w-100' htmlFor='phone'>
                            Укажите телефон
                        </label>
                        <input name="phone"
                               ref={register}
                               placeholder="Введите номер телефона"
                               type="tel" className='col-lg-10 mb-2'/>

                        <label className='w-100' htmlFor='countryId'>
                            Выберите страну
                        </label>
                        <div className='col-lg-10 mb-2 p-0'>
                            <Controller
                                name="countryId"
                                as={countriesSelect}
                                defaultValue=''
                                options={countriesOptions}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <label className='w-100' htmlFor='website'>
                            Укажите адрес сайта
                        </label>
                        <input name="website"
                               ref={register}
                               placeholder="Введите адрес сайта"
                               type="text" className='col-lg-10 mb-2'/>

                        <label className='w-100' htmlFor='wechat'>
                            Укажите Wechat
                        </label>
                        <input name="wechat"
                               ref={register}
                               className='col-lg-10 mb-2'
                               type="text" placeholder="Wechat"/>
                    </div>

                    <div className="col-lg-12 mt-4 mb-3">
                        <h2>Реквизиты</h2>
                    </div>

                    <div className="col-lg-6">
                        <label className='w-100' htmlFor='beneficiaryName'>
                            Beneficiary Name
                        </label>
                        <input name="beneficiaryName"
                               placeholder="Beneficiary name"
                               ref={register}
                               type="text" className='col-lg-10 mb-2'/>

                        <label className='w-100'
                               htmlFor='beneficiaryAccountName'>
                            Beneficiary Account Name
                        </label>
                        <input
                            name="beneficiaryAccountName"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Beneficiary Account Name"
                        />

                        <label className='w-100'
                               htmlFor='beneficiaryBankAddress'>
                            Beneficiary Bank Address
                        </label>
                        <input
                            name="beneficiaryBankAddress"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Beneficiary Bank Address"
                        />

                        <label className='w-100'
                               htmlFor='beneficiarySwiftAddress'>
                            SWIFT Address
                        </label>
                        <input
                            name="beneficiarySwiftAddress"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="SWIFT Address"
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className='w-100'
                               htmlFor='beneficiaryAddress'>
                            Address
                        </label>
                        <input
                            name="beneficiaryAddress"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Address"
                        />

                        <label className='w-100'
                               htmlFor='beneficiaryBankName'>
                            Beneficiary Bank Name
                        </label>
                        <input
                            name="beneficiaryBankName"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Beneficiary Bank Name"
                        />

                        <label className='w-100'
                               htmlFor='beneficiaryBankCode'>
                            Bank Account Number
                        </label>
                        <input
                            name="beneficiaryBankCode"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Bank Account Number"
                        />

                        <label className='w-100'
                               htmlFor='manufacturer'>
                            Manufacturer
                        </label>
                        <input
                            name="manufacturer"
                            type="text" ref={register}
                            className='col-lg-10 mb-2'
                            placeholder="Manufacturer"
                        />
                    </div>

                    <div className="col-lg-12 mt-4 mb-1">
                        <h2>Каталоги {activeCatalogsArr.length
                            ? `(${activeCatalogsArr.length})`
                            : null}</h2>
                    </div>


                    {activeCatalogsArr.length
                        ?
                        <div className='col-lg-11'>
                            <div className={classes.catalogs}>
                                {activeCatalogsArr.map(catalog => {
                                    return (<div
                                            className={classes.catalogsItem}
                                            key={catalog.value}>
                                            <div>
                                                <SvgCatalog/>
                                                {catalog.label}
                                            </div>
                                            <SvgClose onClick={() =>
                                                onDeleteHandler(catalog.value)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        : null}

                    <div className="col-lg-6">
                        <label className='w-100'>
                            Выберите каталог
                        </label>
                        <div className='col-lg-10 mb-2 p-0'>
                            <Controller
                                name="catalogs"
                                render={({onChange}) =>
                                    <Select
                                        placeholder='Выберите каталог'
                                        isMulti={true}
                                        hideSelectedOptions={true}
                                        options={catalogsArr}
                                        value={activeCatalogsArr}
                                        controlShouldRenderValue={false}
                                        classNamePrefix='select-mini'
                                        onChange={(value) => {
                                            onChange(value)
                                            onChangeHandler(value)
                                        }}
                                        className='select-mini'
                                    />
                                }
                                defaultValue=''
                                control={control}
                            />
                        </div>
                    </div>

                </div>

                <div>
                    <button
                        type='button'
                        onClick={() => {
                            history.goBack()
                        }} className='mr-3 btn btn-light mb-3 mb-sm-0'>
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
}

export default ProviderForm
