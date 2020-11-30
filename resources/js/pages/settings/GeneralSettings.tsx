// React
import React from 'react'

// App
import NewsEmail from '../../components/General/NewsEmail/NewsEmail'
import CountrySettings
    from '../../components/Сountries/CountrySettings/CountrySettings'
import CitiesSettings
    from '../../components/Cities/CitiesSettings/CitiesSettings'

const GeneralSettings: React.FC = () => {
    return <>
        <NewsEmail/>
        <CountrySettings/>
        <CitiesSettings/>
    </>
}

export default GeneralSettings
