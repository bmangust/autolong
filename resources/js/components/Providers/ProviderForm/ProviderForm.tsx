// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'


// Typescript
import {ICountriesRootState, ICountry} from '../../Сountries/ICountries'
import {ICatalog, ICatalogsRootState} from '../../Catalogs/ICatalogs'

// Styles
import classes from './ProviderForm.module.css'

// Actions
import {createProvider} from '../../../store/actions/providers'
import {fetchCountries} from '../../../store/actions/countries'
import {fetchCatalogs} from '../../../store/actions/catalogs'
import SvgClose from '../../UI/iconComponents/Close'
import SvgCatalog from '../../UI/iconComponents/Catalog'

interface ICreateProviderData {
    name: string
    nameCompany: string
    email: string
    website: string
    phone: string
    wechat: string
    countryId: string
    catalogs: [number]
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
        register, handleSubmit,
        errors, control
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

    // const onClickHandler = (e) => {
    //     e.preventDefault()
    //     const {catalogs} = getValues()
    //     if (catalogs) {
    //         setCatalogsArr(prevState => [...prevState, +catalogs])
    //     }
    // }

    const onDeleteHandler = (catId) => {
        const newCatalogsArr = catalogsArr.filter(el => el !== catId)
        setCatalogsArr(newCatalogsArr)
    }

    const onChangeHandler = (newValue: any) => {
        const newCatalogsArr = []
        if (newValue) {
            newValue.forEach(({value}) =>
                newCatalogsArr.push(value)
            )
        }
        setCatalogsArr(newCatalogsArr)
    }

    const countriesSelect = <Select
        placeholder='Выберите страну'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const catalogsOptions = catalogs.map(
        (catalog: ICatalog) => {
            return {
                label: catalog.name,
                value: catalog.id
            }
        })

    const countriesOptions = countries.map(
        (country: ICountry) => {
            return {
                label: country.name,
                value: country.id
            }
        })

    const providerFormSubmitHandler =
        handleSubmit((formValues: ICreateProviderData) => {
            if (catalogsArr.length) {
                formValues.catalogs = catalogsArr
            } else {
                formValues.catalogs = [+formValues.catalogs]
            }
            formValues.countryId = formValues.countryId.value
            dispatch(createProvider(formValues))
            history.push('/providers')
        })

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
                                   ref={register({required: true})}
                                   type="text"
                                   placeholder="Введите название для системы"/>
                            {errors.name &&
                            <small>Это поле обязательно</small>}
                        </div>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='nameCompany'>
                                Укажите название компании
                            </label>
                            <input name="nameCompany" type="text"
                                   ref={register({required: true})}
                                   className='col-lg-10'
                                   placeholder="Введите название"/>
                            {errors.name &&
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
                                   ref={register({required: true})}
                                   type="email" placeholder="Введите почту"/>
                            {errors.email &&
                            <small>Это поле обязательно</small>}

                            <label className='w-100' htmlFor='phone'>
                                Укажите телефон
                            </label>
                            <input name="phone"
                                   ref={register({required: true})}
                                   placeholder="Введите номер телефона"
                                   type="tel" className='col-lg-10 mb-2'/>
                            {errors.phone &&
                            <small>Это поле обязательно</small>}

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
                                    rules={{required: true}}
                                />
                                {errors.countryId &&
                                <small>Это поле обязательно</small>}
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='website'>
                                Укажите адрес сайта
                            </label>
                            <input name="website"
                                   ref={register({required: true})}
                                   placeholder="Введите адрес сайта"
                                   type="text" className='col-lg-10 mb-2'/>
                            {errors.website &&
                            <small>Это поле обязательно</small>}

                            <label className='w-100' htmlFor='wechat'>
                                Укажите Wechat
                            </label>
                            <input name="wechat"
                                   ref={register({required: true})}
                                   className='col-lg-10 mb-2'
                                   type="text" placeholder="Wechat"/>
                            {errors.wechat &&
                            <small>Это поле обязательно</small>}
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
                            ?
                            <div className='col-11'>
                                <div className={classes.catalogs}>
                                    {catalogsArr.map(catId => {
                                        return (
                                            <div
                                                className={classes.catalogsItem}
                                                key={catId}>
                                                <div>
                                                    <SvgCatalog/>
                                                    {catalogs.find(({id}) =>
                                                        id === catId)?.name}
                                                </div>
                                                <SvgClose onClick={() =>
                                                    onDeleteHandler(catId)}/>
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
                                            options={catalogsOptions}
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
                                    rules={{required: true}}
                                />
                                {errors.catalogs &&
                                <small>Это поле обязательно</small>}
                            </div>

                            {/* <button*/}
                            {/*    onClick={onClickHandler}*/}
                            {/*    className='mb-4 d-block small*/}
                            {/*     btn btn-text'>*/}
                            {/*    + Привязать ещё один каталог*/}
                            {/* </button>*/}
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
