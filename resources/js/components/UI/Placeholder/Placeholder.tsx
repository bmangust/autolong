// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Placeholder.module.css'

// Typescript
import {IPlaceholder} from './IPlaceholder'
import {Plus} from '../iconComponents'

const Placeholder: React.FC<IPlaceholder> = props => {
    return (
        <div className={classes.placeholder + ' card'}>
            <div className="card-body">
                <div className={classes.placeholderBody}>
                    <img src="/imgs/placeholder-img.png" alt="placeholder"/>
                    <div>
                        <p className={classes.title}>
                            {props.title}
                        </p>
                        <p className={classes.description}>
                            {props.description}
                        </p>
                    </div>
                </div>
                <NavLink className={classes.placeholderAdd}
                         to={props.link}>
                    <Plus/>
                    {props.linkName}
                </NavLink>
            </div>
        </div>
    )
}

export default Placeholder
