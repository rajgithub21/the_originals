import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestsellerproducts,setbestsellerproducts]=useState([]);

    useEffect(()=>{
        
        const bestproduct=products.filter((item,index)=>(item.bestseller));
       
        setbestsellerproducts(bestproduct.slice(0,5));
    },[products]);
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1="BEST" text2="SELLERS" />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover our best-selling products that have captured the hearts of our customers. These items are not just popular; they are loved for their quality and value.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestsellerproducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} bestseller={item.bestseller}/>
                ))
            }

        </div>
    </div>
  )
}

export default BestSeller