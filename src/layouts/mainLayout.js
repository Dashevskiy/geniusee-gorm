import CustomForm from '../components/form';
import Header from '../components/header';
import Footer from '../components/footer';
import Order from '../components/order';

import './index.css';

const LayoutMain = () => {
    return (
        <div className="layout">
            <Header/>

            <h1 className='headline'>checkout</h1>

            <div className='main-container'>
                <CustomForm/>
                <Order/>
            </div>

            <Footer/>
        </div>
    )
}

export default LayoutMain;