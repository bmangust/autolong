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
    vendorProducts: IProduct[] | IProductAutolong[]
    providers: IProvider[]
    unpublished: string
}

const ProductsForms: React.FC<Props> = (props) => {
    const {vendorProducts, providers, unpublished = 'published'} = props
    const [productsState, setProductsState] = useState(() => {
        return vendorProducts
    })

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
        {productsState.map((product: IProduct | IProductAutolong) => (
            <CSSTransition
                key={'number' in product ? product.number : product.autolongNumber}
                unmountOnExit
                timeout={750}
                classNames='fade'>
                <ProductItemForm
                    unpublished={unpublished}
                    onHide={onHideHandler}
                    providers={providers}
                    product={product}/>
            </CSSTransition>
        ))}
    </TransitionGroup>
}

export default ProductsForms
