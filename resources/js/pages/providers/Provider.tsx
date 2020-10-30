// React
import React, {useEffect} from 'react'

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

const Provider: React.FC<IProvider> = () => {
    const {id}: any = useParams()

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

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body-info">
                       <span
                           className="infoBlockHeaders mr-3">
                           Название
                       </span>
                    <span className="infoBlockText mr-5">
                                    {'name' in provider
                                        ? provider.name
                                        : ''}
                        </span>
                    <span
                        className="infoBlockHeaders mr-3">
                            Название компании
                        </span>
                    <span className="infoBlockText">
                                    {'nameCompany' in provider
                                        ? provider.nameCompany
                                        : ''}
                        </span>
                </div>
            </div>

            <div className="row">

                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body-info">

                            <h2 className="mb-3">Общая информация</h2>

                            <div className="row mb-3">
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Почта</p>
                                    <p>Телефон</p>
                                    <p>Wechat</p>
                                    <p>Сайт</p>
                                    <p>Страна</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{'email' in provider
                                        ? provider.email
                                        : ''}</p>
                                    <p>{'phone' in provider
                                        ? provider.phone
                                        : ''}</p>
                                    <p>{'wechat' in provider
                                        ? provider.wechat
                                        : ''}</p>
                                    <p>{'website' in provider
                                        ? provider.website
                                        : ''}</p>
                                    <p>{'country' in provider
                                        ? provider.country
                                            ? provider.country.name : ''
                                        : ''}</p>
                                </div>
                            </div>

                            <h2 className="mb-3">Реквизиты</h2>

                            <div className="row mb-3">
                                <div className="col-lg-5 infoBlockHeaders">
                                    <p>Beneficiary Name</p>
                                    <p>Address</p>
                                    <p>Beneficiary Account Name </p>
                                    <p>Beneficiary Bank Address</p>
                                    <p>Bank Account Number </p>
                                    <p>SWIFT Address</p>
                                </div>
                                <div className="col-lg-7 infoBlockText">
                                    <p>{'beneficiaryName' in provider
                                        ? provider.beneficiaryName
                                        : ''}</p>
                                    <p>{'beneficiaryAddress' in provider
                                        ? provider.beneficiaryAddress
                                        : ''}</p>
                                    <p>{'beneficiaryAccountName' in provider
                                        ? provider.beneficiaryAccountName
                                        : ''}</p>
                                    <p>{'beneficiaryBankAddress' in provider
                                        ? provider.beneficiaryBankAddress
                                        : ''}</p>
                                    <p>{'beneficiaryBankCode' in provider
                                        ? provider.beneficiaryBankCode
                                        : ''}</p>
                                    <p>{'beneficiarySwiftAddress' in provider
                                        ? provider.beneficiarySwiftAddress
                                        : ''}</p>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <NavLink to={`/provideredit/${id}`}
                                         className='editButton'>
                                    Редактировать информацию
                                </NavLink>
                                <button onClick={() =>
                                    onDeleteHandler(provider.id)}
                                        className='btn btn-danger'>
                                    Удалить поставщика
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body-info">
                            <h2>Сумма всех заказов</h2>
                            <p className={classes.priceMain}>30 890 ¥</p>
                            <p className={classes.price}>343 280 ₽</p>
                            <p className={classes.price}>50 733 $</p>
                            <img className='mt-5' src='/imgs/box.jpg'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Provider
