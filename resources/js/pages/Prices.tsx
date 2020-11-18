// React
import React from 'react'
import SvgErrorPlaceholder
from '../components/UI/iconComponents/ErrorPlaceholder'

const Prices: React.FC = () => {
    return (
        <div className='card'>
            <div className='card-body text-center'>
                <SvgErrorPlaceholder width='89' height='89' />
                <p className='mt-3'>Страница в разработке</p>
            </div>
        </div>
    )
}

export default Prices
