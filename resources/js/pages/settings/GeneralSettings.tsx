// React
import React, {useEffect} from 'react'

// App
import NewsEmail from '../../components/General/NewsEmail/NewsEmail'
import CountrySettings
    from '../../components/Сountries/CountrySettings/CountrySettings'
import CitiesSettings
    from '../../components/Cities/CitiesSettings/CitiesSettings'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEmailSettings} from '../../store/actions/settings'

const GeneralSettings: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmailSettings())
    }, [dispatch])
    const {errorEmail, emailSettings, loadingEmail} = useSelector((state) => ({
        loadingEmail: state.settingsState.loadingEmail,
        errorEmail: state.settingsState.errorEmail,
        emailSettings: state.settingsState.emailSettings
    }))

    return <>
        {!loadingEmail
            ? <NewsEmail errorEmail={errorEmail} emailSettings={emailSettings}/>
            : null
        }
        <CountrySettings/>
        <CitiesSettings/>
    </>
}

export default GeneralSettings
