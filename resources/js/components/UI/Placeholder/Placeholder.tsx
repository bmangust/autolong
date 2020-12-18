// React
import React from 'react'

// Third-party
import {NavLink} from 'react-router-dom'

// Styles
import classes from './Placeholder.module.css'

// Typescript
import {Plus} from '../iconComponents'

type Props = {
    title: string;
    description: string;
    link?: string;
    linkName: string;
}

const Placeholder: React.FC<Props> = props => {
    const {title, description, link, linkName} = props

    return <div className={classes.placeholder + ' card'}>
        <div className="card-body">
            <div className={classes.placeholderBody}>
                <img src="/imgs/placeholder-img.png" alt="placeholder"/>
                <div>
                    <p className={classes.title}>
                        {title}
                    </p>
                    <p className={classes.description}>
                        {description}
                    </p>
                </div>
            </div>
            {link
                ? <NavLink className={classes.placeholderAdd} to={link}>
                    <Plus/>
                    {linkName}
                </NavLink>
                : <p>У вас нет доступа к созданию</p>
            }
        </div>
    </div>
}

export default Placeholder
