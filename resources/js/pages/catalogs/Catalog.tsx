// React
import React, {useEffect} from 'react'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Css
// import classes from './Catalogs.module.css';

// Actions
import {fetchCatalogById} from '../../store/actions/catalogs'
import {fetchProviderById} from '../../store/actions/providers'

// Typescript
import {
    ICatalog,
    ICatalogsRootState
} from '../../components/Catalogs/ICatalogs'

import {
    IProvidersRootState
} from '../../components/Providers/IProviders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'
import {timeConverter} from '../../utils'

const Catalog: React.FC<ICatalog> = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()

    const {catalog, loading, error} = useSelector(
        (state: ICatalogsRootState) => ({
            error: state.catalogsState.error,
            catalog: state.catalogsState.catalog,
            loading: state.catalogsState.loading
        })
    )

    const {provider} = useSelector(
        (state: IProvidersRootState) => ({
            provider: state.providersState.provider
        })
    )

    useEffect(() => {
        dispatch(fetchCatalogById(id))
        dispatch(fetchProviderById(id))
    }, [dispatch])

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className="card-body-info">

                        <div className="row mb-3">
                            <div className="col-lg-5 infoBlockHeaders">
                                <p>Название каталога</p>
                                <p>Дата загрузки</p>
                                <p>Дата обновления</p>
                                <p>Теги:</p>
                            </div>
                            <div className="col-lg-7 infoBlockText">
                                <p>{'name' in catalog
                                    ? catalog.name
                                    : ''}</p>
                                <p>{'createdAt' in catalog
                                    ? timeConverter(catalog.createdAt)
                                    : ''}</p>
                                <p>{'updatedAt' in catalog
                                    ? timeConverter(catalog.updatedAt)
                                    : ''}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="col-lg-4">
                <a href={'file' in catalog
                    ? '/' + catalog.file
                    : ''}
                   target="_blank"
                   download
                   className="btn btn-success mb-3 w-100"
                   rel="noreferrer">
                    Скачать
                </a>
                <div className="card">
                    <div className="card-body-info">
                        <p className="infoBlockHeaders mb-1">
                            Поставщик
                        </p>
                        <p className="infoBlockText">
                            {'name' in provider
                                ? provider.name
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Страна
                        </p>
                        <p className="infoBlockText">
                            {'country' in provider
                                ? provider.country
                                    ? provider.country.name : ''
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Почта
                        </p>
                        <p className="infoBlockText">
                            {'email' in provider
                                ? provider.email
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Телефон
                        </p>
                        <p className="infoBlockText">
                            {'phone' in provider
                                ? provider.phone
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Wechat
                        </p>
                        <p className="infoBlockText">
                            {'wechat' in provider
                                ? provider.wechat
                                : ''}
                        </p>
                        <p className="infoBlockHeaders mb-1">
                            Сайт
                        </p>
                        <p className="infoBlockText">
                            <a href={'website' in provider
                                ? provider.website
                                : ''}
                               target="_blank"
                               rel="noreferrer">
                                {'website' in provider
                                    ? provider.website
                                    : ''}
                            </a>
                        </p>
                        <p className="infoBlockHeaders mb-1 mt-5">
                            Перейти на страницу поставщика
                        </p>
                        <NavLink to={'id' in provider
                            ? '/provider/' + provider.id
                            : ''}>
                            <SvgArrowRight/>
                        </NavLink>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Catalog
