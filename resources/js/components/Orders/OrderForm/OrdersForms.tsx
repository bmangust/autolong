// React
import React, {useEffect, useState} from 'react'

// Third-party
import {CSSTransition, TransitionGroup} from 'react-transition-group'

// Typescript
import {IProvider} from '../../Providers/IProviders'
import {IProduct} from '../../Products/IProducts'
import {IOrderProducts} from '../IOrders'

// App
import OrderItemForm from './OrderItemForm/OrderItemForm'

type Props = {
    items: IOrderProducts,
    providers: IProvider[]
}

const OrdersForms: React.FC<Props> = (props) => {
    const {items, providers} = props
    const [itemsState, setItemsState] = useState<{ number: IProduct[] } | {}>(items)

    useEffect(() => {
        setItemsState({...items})
    }, [items])

    const onHideHandler = (number: number) => {
        setItemsState((oldState) =>
            Object.keys(oldState)
                .filter(key => +key != number)
                .reduce((obj, key) => {
                    obj[key] = oldState[key]
                    return obj
                }, {})
        )
    }

    return <TransitionGroup>
        {Object.entries(itemsState)
            .map(([key, value]) => (
                <CSSTransition
                    key={key + itemsState[key].length}
                    unmountOnExit
                    timeout={750}
                    classNames='fade'>
                    <OrderItemForm
                        providerId={+key}
                        providers={providers}
                        onHide={onHideHandler}
                        products={value}
                    />
                </CSSTransition>
            ))}
    </TransitionGroup>
}

export default OrdersForms
