// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'

// Typescript
import {ICountriesRootState, ICountry} from '../../Сountries/ICountries'
import {ICatalog, ICatalogsRootState} from '../../Catalogs/ICatalogs'

// Actions
import {createProvider} from '../../../store/actions/providers'
import {fetchCountries} from '../../../store/actions/countries'
import {fetchCatalogs} from '../../../store/actions/catalogs'
import SvgClose from '../../UI/iconComponents/Close'

interface ICreateProviderData {
    name: string
    nameCompany: string
    email: string
    website: string
    phone: string
    wechat: string
    countryId: string
    catalogId: [number]
    beneficiaryName: string
    beneficiaryAccountName: string
    beneficiaryBankAddress: string
    beneficiaryAddress: string
    beneficiaryBankName: string
    beneficiaryBankCode: string
    beneficiarySwiftAddress: string
}

const ProviderForm: React.FC = () => {
    const {
        register, handleSubmit, getValues
    } = useForm<ICreateProviderData>()

    const dispatch = useDispatch()
    const history = useHistory()

    const [catalogsArr, setCatalogsArr] = useState<Array<number>>([])

    const {countries} = useSelector(
        (state: ICountriesRootState) => ({
            countries: state.countriesState.countries
        }))

    const {catalogs} = useSelector(
        (state: ICatalogsRootState) => ({
            catalogs: state.catalogsState.catalogs
        }))

    useEffect(() => {
        dispatch(fetchCountries())
        dispatch(fetchCatalogs())
    }, [dispatch])

    const providerFormSubmitHandler =
        handleSubmit((formValues: ICreateProviderData) => {
            if (catalogsArr.length) {
                formValues.catalogId = catalogsArr
            }
            dispatch(createProvider(formValues))
            history.push('/providers')
        })

    const onClickHandler = (e) => {
        e.preventDefault()
        const {catalogId} = getValues()
        if (catalogId) {
            setCatalogsArr(prevState => [...prevState, +catalogId])
        }
    }

    const onDeleteHandler = (catId) => {
        const newCatalogsArr = catalogsArr.filter(el => el !== catId)
        setCatalogsArr(newCatalogsArr)
    }

    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={providerFormSubmitHandler}>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='name'>
                                Укажите поставщика
                            </label>
                            <input name="name" className='col-lg-10'
                                   ref={register}
                                   type="text"
                                   placeholder="Введите название для системы"/>
                        </div>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='nameCompany'>
                                Укажите название компании
                            </label>
                            <input name="nameCompany" type="text"
                                   ref={register}
                                   className='col-lg-10'
                                   placeholder="Введите название"/>
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
                            <input name="phone" ref={register}
                                   placeholder="Введите номер телефона"
                                   type="tel" className='col-lg-10 mb-2'/>

                            <label className='w-100' htmlFor='countryId'>
                                Выберите страну
                            </label>
                            <select name="countryId"
                                    ref={register}
                                    className='col-lg-10 mb-2'>
                                <option disabled defaultValue=''>Страна</option>
                                {countries.map((country: ICountry) => {
                                    return (<option
                                        key={country.id}
                                        value={country.id}>
                                        {country.name}</option>)
                                })}
                            </select>
                        </div>

                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='website'>
                                Укажите адрес сайта
                            </label>
                            <input name="website" ref={register}
                                   placeholder="Введите адрес сайта"
                                   type="text" className='col-lg-10 mb-2'/>

                            <label className='w-100' htmlFor='wechat'>
                                Укажите Wechat
                            </label>
                            <input name="wechat" ref={register}
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
                                Beneficiary Bank Code
                            </label>
                            <input
                                name="beneficiaryBankCode"
                                type="text" ref={register}
                                className='col-lg-10 mb-2'
                                placeholder="Beneficiary Bank Code"
                            />
                        </div>

                        <div className="col-lg-12 mt-4 mb-1">
                            <h2>Каталоги {catalogsArr.length
                                ? `(${catalogsArr.length})`
                                : null}</h2>
                        </div>

                        {catalogsArr.length
                            ? catalogsArr.map(catId => {
                                return (
                                    <div className='col-12' key={catId}>
                                        {catalogs.find(({id}) =>
                                            id === catId)?.name}
                                        <SvgClose onClick={() =>
                                            onDeleteHandler(catId)}/>
                                    </div>
                                )
                            })
                            : null}

                        <div className="col-lg-6">
                            <label className='w-100'>
                                Выберите каталог
                            </label>
                            <select
                                name="catalogId"
                                ref={register}
                                className='col-lg-10 mb-3'
                            >
                                <option disabled
                                        defaultValue=''>
                                    Каталог
                                </option>
                                {catalogs.map((catalog: ICatalog) => {
                                    const isFind =
                                        catalogsArr.includes(catalog.id)
                                    if (!isFind) {
                                        return (<option
                                            key={catalog.id}
                                            value={catalog.id}>
                                            {catalog.name}</option>)
                                    } else {
                                        return null
                                    }
                                })}
                            </select>
                            <button onClick={onClickHandler}
                                    className='mb-4 d-block small'>
                                + Привязать ещё один каталог
                            </button>
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

export default ProviderForm
