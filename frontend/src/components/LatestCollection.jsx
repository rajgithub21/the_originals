import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products}=useContext(ShopContext);
    const [latestproducts,setlatestproducts]=useState([]);
    
    useEffect(()=>{
        setlatestproducts(products.slice(0, 10));
    },[products]);
   
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-4xl'>
            <Title text1="LATEST" text2="COLLECTIONS" />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Explore our latest collections, featuring the newest trends and timeless classics. Each piece is crafted with care, ensuring quality and style that lasts. Discover your next favorite item today!
            </p>
        </div>
        {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestproducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection