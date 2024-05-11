import React from 'react'
import iphone from '../../assets/img/iphone.png';
import apple64 from '../../assets/img/apple64.png';

export const List = () => {

    const lists = [
        {
            name: 'Woman’s Fashion',
            url: '',
            options: true,
        },
        {
            name: 'Men’s Fashion',
            url: '',
            options: true,
        },
        {
            name: 'Electronics',
            url: '',
            options: false,
        },
        {
            name: 'Home & Lifestyle',
            url: '',
            options: false,
        },
        {
            name: 'Medicine',
            url: '',
            options: false,
        },
        {
            name: 'Sports & Outdoor',
            url: '',
            options: false,
        },
        {
            name: 'Baby’s & Toys',
            url: '',
            options: false,
        },
        {
            name: 'Groceries & Pets',
            url: '',
            options: false,
        },
        {
            name: 'Health & Beauty',
            url: '',
            options: false,
        },
    ];

    return (
        <div>
            <div className="row g-0">
                <div className="col-lg-3 col-sm-12">
                   <div>
                        <ul className="list-unstyled aside-menu" style={{width: '70%',paddingTop: '26px', marginBottom: '0', borderRight: '1px solid rgb(223, 223, 223)'}}>
                            {lists.map((list, index) => (
                            <li key={index} style={{ padding:'12px 0px' }}>
                                <a href={list.url} className="d-flex align-items-center justify-content-between text-decoration-none" style={{color: '#000000'}}>
                                    { list.name }
                                    {list.options ? 
                                    <>
                                       <span style={{marginRight: '20px'}}>
                                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z" fill="black"/>
                                        </svg>
                                       </span>
                                    </> : ''}
                                </a>
                            </li>
                            ))}
                        </ul>
                   </div>
                </div>
                <div className="col-lg-9 py-4 home-img">
                    <div style={{ position: 'relative', backgroundColor: '#000000', width: '100%' }}>
                        <div className="row g-0">
                            <div className="col-6">
                                <div style={{ padding:'90px 65px' }}>
                                    <img src={apple64} alt='iphone-discount' width={45} />
                                    <span className='px-3' style={{ color: '#ffffff', position: 'relative', top: '5px' }}>
                                        iPhone 14 Series
                                    </span>
                                    <div>
                                        <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#ffffff' }}>Up to 10%</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#ffffff' }}>off Voucher</span>
                                    </div>

                                    <div className="my-2">
                                        <a href="#" style={{ color: '#ffffff', textUnderlineOffset: '7px' }}>
                                            <span style={{ paddingRight: '8px', fontWeight: 'bold' }}>Shop Now</span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.5 12H20M20 12L13 5M20 12L13 19" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            
                            </div>
                            <div className="col-6">
                                <img src={iphone} alt='iphone-discount' style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
