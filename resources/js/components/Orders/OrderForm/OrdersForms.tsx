// React
import React, {useEffect, useState} from 'react'

// Third-party
import {CSSTransition, TransitionGroup} from 'react-transition-group'

// Typescript
import {IProvider} from '../../Providers/IProviders'
import {IProduct} from '../../Products/IProducts'

// App
import OrderItemForm from './OrderItemForm/OrderItemForm'

const OrdersForms: React.FC<{
    items: any, providers: IProvider[]
}> = ({items, providers}) => {
    const [itemsState, setItemsState] = useState(() => items)

    useEffect(() => {
        setItemsState(items)
    }, [items])

    const onHideHandler = (number) => {
        setItemsState((oldState) =>
            Object.keys(oldState)
                .filter(key => key != number)
                .reduce((obj, key) => {
                    obj[key] = oldState[key]
                    return obj
                }, {})
        )
    }

    return <TransitionGroup>
        {Object.entries(itemsState).map(([key, value]) => (
            <CSSTransition
                key={key}
                unmountOnExit
                timeout={750}
                classNames='fade'>
                <OrderItemForm
                    providerId={+key}
                    providers={providers}
                    onHide={onHideHandler}
                    products={value as IProduct[]}
                />
            </CSSTransition>
        ))}
    </TransitionGroup>
}

export default OrdersForms
