// React
import React from 'react'

// App
import ProductsTable
    from '../../components/Products/ProductsTable/ProductsTable'

const NewProducts: React.FC = () => {
    return <ProductsTable unpublished={true}/>
}

export default NewProducts
