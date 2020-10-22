// React
import React from 'react'

// Third-party
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Router from './components/navigation/router/Router'
import {routes} from './components/navigation/router/routes'
import {ToastContainer} from 'react-toastify'

// App
import Layout from './layout/Layout'

const Index: React.FC<RouteComponentProps> = () => {
    return (
        <Layout>
            <Router routes={routes}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </Layout>
    )
}

export default withRouter(Index)
