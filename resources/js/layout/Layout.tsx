// React
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import classes from './Layout.module.css'

// App
import Sidebar from '../components/navigation/Sidebar/Sidebar';
import Header from '../components/navigation/Header/Header';

const Layout: React.FC = (props) => {
    return (
        <div className={classes.Layout}>
            <div className="container">
                <div className="row">
                    <div className='col-lg-2 p-0'>
                        <Sidebar/>
                        <span
                        className="version"
                        >Версия от 23.10.2020</span>
                    </div>
                    <main role='main' className="col-lg-10 pl-5">
                        <Header/>
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
