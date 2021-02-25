// React
import React, {useEffect, useState} from 'react'

// Third-party
import {CSSTransition, TransitionGroup} from 'react-transition-group'

// Typescript
import {IProduct, IProductAutolong} from '../IProducts'
import {IProvider} from '../../Providers/IProviders'

// App
import ProductItemForm from './ProductItemForm/ProductItemForm'

type Props = {
    vendorProducts: IProduct[] | IProductAutolong[] | { number: number }[]
    providers: IProvider[]
    unpublished: string
    isOrdersPage?: boolean
}

const ProductsForms: React.FC<Props> = (props) => {
    const {vendorProducts, providers, unpublished = 'published', isOrdersPage} = props
    const [productsState, setProductsState] = useState(vendorProducts)

    useEffect(() => {
        if (vendorProducts) {
            setProductsState(vendorProducts)
        }
    }, [vendorProducts])

    const onHideHandler = (number) => {
        setProductsState((prevState) =>
            prevState.filter((product) => (product.number || product.autolongNumber) != number)
        )
    }

    return <TransitionGroup>
        {productsState.map((product) => (
            <CSSTransition
                key={'number' in product ? product.number : product.autolongNumber}
                unmountOnExit
                timeout={750}
                classNames='fade'>
                <ProductItemForm
                    unpublished={unpublished}
                    onHide={onHideHandler}
                    providers={providers}
                    product={product}
                    isOrdersPage={isOrdersPage}
                />
            </CSSTransition>
        ))}
    </TransitionGroup>
}

export default ProductsForms
