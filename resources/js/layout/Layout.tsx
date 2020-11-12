// React
import React, {useState} from 'react'
import PropTypes from 'prop-types'

// Styles
import classes from './Layout.module.css'

// App
import Sidebar from '../components/navigation/Sidebar/Sidebar'
import Header from '../components/navigation/Header/Header'

const Layout: React.FC = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={classes.Layout}>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-2 col-lg-3 p-lg-0'>
                        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </div>
                    <main role='main' className='col-xl-10 col-lg-9 pl-lg-5'>
                        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout
