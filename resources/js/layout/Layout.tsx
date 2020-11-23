// React
import React, {useContext, useState} from 'react'

// Third-party
import {SanctumContext} from 'react-sanctum'

// Styles
import classes from './Layout.module.css'

// App
import Sidebar from '../components/navigation/Sidebar/Sidebar'
import Header from '../components/navigation/Header/Header'

const Layout: React.FC = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const {authenticated} = useContext(SanctumContext)

    const cls = [classes.Layout]

    if (!authenticated) {
        cls.push(classes.notAuthenticated)
    }

    return (
        <div className={cls.join(' ')}>

            <div className='container'>
                {!authenticated
                    ? <div className='row'>
                        <main role='main' className='col-12'>
                            {props.children}
                        </main>
                    </div>
                    : <div className='row'>
                        <div className={classes.sidebarWrap +
                        ' col-xl-2 col-lg-2 p-lg-0'}>
                            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                        </div>
                        <main role='main' className='col-xl-10 col-lg-10
                     pl-xl-5 pl-auto'>
                            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
                            {props.children}
                        </main>
                    </div>
                }
            </div>
        </div>
    )
}

export default Layout
