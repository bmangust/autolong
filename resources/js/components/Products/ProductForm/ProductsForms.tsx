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

    const onHideHandler = (id) => {
        const newState = productsState.filter((product) => {
            const productId = product.number || product.autolongNumber
            if (id !== productId) {
                return product
            }
        })
        setProductsState(newState)
    }

    return <TransitionGroup>
        {productsState.map((product: IProduct | IProductAutolong) => {
            return <CSSTransition
                key={product.number || product.autolongNumber}
                unmountOnExit
                timeout={750}
                classNames='fade'>
                <ProductItemForm
                    onHide={onHideHandler}
                    providers={providers}
                    key={'id' in product
                        ? product.id
                        : product.number + product.articul}
                    product={product}/>
            </CSSTransition>
        })}
    </TransitionGroup>
}

export default ProductsForms
