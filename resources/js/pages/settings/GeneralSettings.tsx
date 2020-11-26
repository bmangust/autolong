// React
import React from 'react'

// App
import NewsEmail from '../../components/General/NewsEmail/NewsEmail'
import CountrySettings
    from '../../components/General/CountrySettings/CountrySettings'

const GeneralSettings: React.FC = () => {
    return <>
        <NewsEmail/>
        <CountrySettings/>
    </>
}

export default GeneralSettings
