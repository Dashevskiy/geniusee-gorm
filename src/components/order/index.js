import React from 'react';
import './index.css';

const Order = () => {
    return (
        <div className='order-container'>
            <div className='order-summary'>
                <h5 className='order-headline'>order summary</h5>
                
                <div className='order-top'>
                    <div className='subscription-container'>
                        <div className='order-title'>6 monts subscription</div>
                        <div>$38.95</div>
                    </div>
                    <div className='coupon-container'>
                        <div className='order-title'>coupon: <span>firstfree</span></div>
                        <div>-10$</div>
                    </div>
                </div>

                <div className='order-middle'>
                    <div className='shiping-container'>
                        <div className='order-title'>shiping</div>
                        <div>free</div>
                    </div>
                    <div className='tax-container'>
                        <div className='order-title'>tax</div>
                        <div>$5.00</div>
                    </div>
                </div>

                <div className='order-bottom'>
                    <div className='order-title'>total</div>
                    <div>$33.95</div>
                </div>
            </div>
            <div className='btn-complete-container'>
                <button type='button' className='btn-complete'>complete purchase</button>
            </div>
            <div className='order-terms'>
                <div>plans autorenew</div>
                <div>cancel anytime</div>
            </div>
        </div>
    )
}

export default Order;