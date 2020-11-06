// React
import React, {useState} from 'react'

// Third-party
import {CSSTransition, TransitionGroup} from 'react-transition-group'

// Typescript
import {IProduct, IProductAutolong} from '../IProducts'
import {IProvider} from '../../Providers/IProviders'

// App
import ProductItemForm from './ProductItemForm/ProductItemForm'

const ProductsForms: React.FC<{
    vendorProducts: IProduct[] | IProductAutolong[], providers: IProvider[]
}> = ({vendorProducts, providers}) => {
    const [productsState, setProductsState] = useState(() => {
        return vendorProducts
    })

    const onHideHandler = (number) => {
        setProductsState((oldState) =>
            oldState.filter((product) =>
                (product.number || product.autolongNumber) != number)
        )
    }

    return <TransitionGroup>
        {productsState.map((product: IProduct | IProductAutolong) => (
            <CSSTransition
                key={product.number || product.autolongNumber}
                unmountOnExit
                timeout={750}
                classNames='fade'>
                <ProductItemForm
                    onHide={onHideHandler}
                    providers={providers}
                    product={product}/>
            </CSSTransition>
        ))}
    </TransitionGroup>
}

export default ProductsForms
