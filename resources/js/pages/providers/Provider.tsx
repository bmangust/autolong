// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Css
import classes from './Providers.module.css'

// Actions
import {
    deleteProviderById,
    fetchProviderById
} from '../../store/actions/providers'

// Typescript
import {
    IProvider,
    IProvidersRootState
} from '../../components/Providers/IProviders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgCatalog from '../../components/UI/iconComponents/Catalog'
import {ArrowRight} from '../../components/UI/iconComponents'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import SvgBlackLabel from '../../components/UI/iconComponents/BlackLabel'
import {SanctumContext} from '../../Sanctum'
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton'

const Provider: React.FC<IProvider> = () => {
    const {id}: any = useParams()
    const {user} = useContext(SanctumContext)

    const dispatch = useDispatch()
    const history = useHistory()

    const {provider, loading, error} = useSelector(
        (state: IProvidersRootState) => ({
            error: state.providersState.error,
            provider: state.providersState.provider,
            loading: state.providersState.loading
        })
    )

    useEffect(() => {
        dispatch(fetchProviderById(id))
    }, [dispatch, id])

    const onDeleteHandler = (id) => {
        dispatch(deleteProviderById(id))
        history.push('/providers')
    }

    let ordersPrice = <p>Заказов нет</p>

    if (provider && provider.orders.length) {
        let totalCny = 0
        let totalRub = 0
        let totalUsd = 0
        provider.orders.map((order) => {
            if (Object.keys(order).length) {
                totalCny += +order.price.cny
                totalRub += +order.price.rub
                totalUsd += +order.price.usd
            }
        })
        ordersPrice =
            <>
                <p className={classes.priceMain}>{totalCny.toFixed(2)} ¥</p>
                <p className={classes.price}>{totalRub.toFixed(2)} ₽</p>
                <p className={classes.price}>{totalUsd.toFixed(2)} $</p>
                <img className='mt-lg-5 mt-2' alt='' src='/imgs/box.jpg'/>
            </>
    }


    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!provider) {
        return null
    }
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body-info">
                    <div className="row">
                        <div className="col-lg-6 d-flex mb-lg-0 mb-3">
                            <p className='infoBlockHeaders mb-0 mr-5'>
                                Название
                            </p>
                            <p className='infoBlockText mb-0'>
                                {provider.name}
                            </p>
                        </div>
                        <div className="col-lg-6 d-flex">
                            <p className='infoBlockHeaders mb-0 mr-5'>
                                Название компании
                            </p>
                            <p className='infoBlockText mb-0'>
                                {provider.nameCompany}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body-info">

                            <h2 className="mb-3">
                                Общая информация
                                {provider.unscrupulous
                                    ? <SvgBlackLabel
                                        className='float-right'/>
                                    : null
                                }
                            </h2>

                            <div className="row mb-3">
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Почта</p>
                                    <p>Телефон</p>
                                    <p>Wechat</p>
                                    <p>Сайт</p>
                                    <p>Страна</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.email
                                        ? provider.email
                                        : '-'}</p>
                                    <p>{provider.phone
                                        ? provider.phone
                                        : '-'}</p>
                                    <p>{provider.wechat
                                        ? provider.wechat
                                        : '-'}</p>
                                    <p>{provider.website
                                        ? provider.website
                                        : '-'}</p>
                                    <p>{provider.country
                                        ? provider.country.name
                                        : '-'}</p>
                                </div>
                            </div>

                            <h2 className="mb-3">Реквизиты</h2>

                            <div className="row mb-3">
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Beneficiary Name</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiaryName
                                        ? provider.beneficiaryName
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Address</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiaryAddress
                                        ? provider.beneficiaryAddress
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Beneficiary Account Name</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiaryAccountName
                                        ? provider.beneficiaryAccountName
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Beneficiary Bank Address</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiaryBankAddress
                                        ? provider.beneficiaryBankAddress
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Bank Account Number</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiaryBankCode
                                        ? provider.beneficiaryBankCode
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Manufacturer</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.manufacturer
                                        ? provider.manufacturer
                                        : '-'}</p>
                                </div>
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>SWIFT Address</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{provider.beneficiarySwiftAddress
                                        ? provider.beneficiarySwiftAddress
                                        : '-'}</p>
                                </div>
                            </div>

                            {provider && 'catalogs' in provider
                                ? <div className='mb-5'>
                                    <h2 className='mb-4'>
                                        Каталоги поставщика
                                        ({provider.catalogs.length})
                                    </h2>
                                    {provider.catalogs.map(catalog => {
                                        const catId = catalog.id
                                        return (
                                            <div
                                                className={classes.catalogsItem}
                                                key={catId + catalog.name}>
                                                <div>
                                                    <SvgCatalog/>
                                                    {catalog.name}
                                                </div>
                                                <NavLink
                                                    to={`/catalog/${catId}`}>
                                                    Перейти в каталог
                                                    <ArrowRight/>
                                                </NavLink>
                                            </div>
                                        )
                                    })}
                                </div>
                                : <p>Каталогов нет</p>}

                            <div className='d-flex justify-content-between flex-lg-row flex-column'>
                                {user && user.role.accesses.providersUpdate == 1
                                    ? <NavLink
                                        to={`/provideredit/${id}`}
                                        className='editButton'>
                                        Редактировать
                                    </NavLink>
                                    : null
                                }
                                {user && user.role.accesses.providersDelete == 1
                                    ? <DeleteButton
                                        name='поставщика'
                                        buttonStyle='old'
                                        deleteFn={() => onDeleteHandler(provider.id)}>
                                        Удалить поставщика
                                    </DeleteButton>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <SandboxFilesCard
                        id={provider.id}
                        sandboxFiles={provider.sandboxFiles}
                        page='providers'
                    />
                </div>

                <div className="col-lg-4">
                    <div className="card mb-3">
                        <div className="card-body-info">
                            <h2>Сумма всех заказов</h2>
                            {ordersPrice}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body-info">
                            <h2>Список заказов</h2>
                            {'orders' in provider && provider.orders
                                ? provider.orders.map((order) => (
                                    Object.keys(order).length
                                        ? <p className={classes.orders}
                                             key={order.id + order.name}>
                                            <NavLink
                                                to={`/order/${order.id}`}>
                                                {order.name}
                                            </NavLink>
                                        </p>
                                        : null
                                ))
                                : 'Заказов нет'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Provider
