import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets'
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem.jsx';

const Collection = () => {
    const { products,search,showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubcategory] = useState([]);
    const [sortValue, setSortValue] = useState('relevance');
    
    const toggleCategory=(e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item=>item!==e.target.value));
        }else{
            setCategory(prev=>[...prev,e.target.value]);
        }
    }
    const togglesubCategory=(e)=>{
        if(subCategory.includes(e.target.value)){
            setSubcategory(prev=>prev.filter(item=>item!==e.target.value));
        }else{
            setSubcategory(prev=>[...prev,e.target.value]);
        }
    }
    const applyFilter=()=>{
       


        let tempproducts=products.slice();

        if(showSearch && search){
            tempproducts=tempproducts.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));

        }
        
        if(category.length>0){
            tempproducts=tempproducts.filter(item=>category.includes(item.category));
        }
        if(subCategory.length>0){
            tempproducts=tempproducts.filter(item=>subCategory.includes(item.subCategory));
        }
        setFilterProducts(tempproducts);
    }
    const sortProducts=()=>{
        let tempproducts=filterProducts.slice();
        switch(sortValue){
            case 'low-high':
                setFilterProducts(tempproducts.sort((a,b)=>a.price-b.price));
                break;
            case 'high-low':
                setFilterProducts(tempproducts.sort((a,b)=>b.price-a.price));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(()=>{
        applyFilter();

    },[category,subCategory,search,showSearch,products]);

    useEffect(()=>{
        sortProducts();
    },[sortValue]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='min-w-60'>
            <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
            </p>
            {/* category filter */}
            <div className={`border border-gray-500 pl-5 py-3 mt-6 ${showFilter ? '':'hidden '} sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                    </p>
                </div>
            </div>
                {/* Sub category filter */}
                <div className={`border border-gray-500 pl-5 py-3 my-5 ${showFilter ? '':'hidden '} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={togglesubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={togglesubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={togglesubCategory}  />Winterwear
                        </p>
                    </div>
                 </div>
        </div>


        {/* Right Products Section */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1="OUR" text2="COLLECTIONS" />
                {/* Product sort */}
                <select onChange={(e)=>setSortValue(e.target.value)} className='border-2 border-gray-300 text-sm px-2 bg-white'>
                    <option value="relevant">Sort by:Relevance</option>
                    <option value="low-high">Sort by:Low to High</option>
                    <option value="high low">Sort by:High to Low</option>

                </select>
            </div>

            {/* Map products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }

            </div>

        </div>

    </div>
  )
}

export default Collection;