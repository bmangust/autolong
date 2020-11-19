// React
import React, {useState} from 'react'

// Typescript
import {IProduct} from '../Products/IProducts'

// App
import Package from './Package/Package'
import Collapse from 'react-bootstrap/cjs/Collapse'

const OrderPackages: React.FC<{ items: IProduct[], orderId: number }> = (
    {items, orderId}) => {
    const [show, isShow] = useState(false)

    const showPackagesHandler = () => {
        isShow(oldState => !oldState)
    }

    return <div className="card card-body mb-3">
        <h2 className='mb-4'>Упаковка</h2>
        <Collapse in={show}>
            <div>
                <div className='mb-3'>
                    {items && items.length
                        ? items.map((item) =>
                            <Package key={item.id}
                                     orderId={orderId}
                                     item={item}/>)
                        : null
                    }
                </div>
            </div>
        </Collapse>
        <button onClick={showPackagesHandler}
                className='btn btn-outline-dashed'>
            {show ? 'Скрыть' : 'Показать'} упаковку
        </button>
    </div>
}

export default OrderPackages
