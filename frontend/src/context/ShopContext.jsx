import { createContext } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const ShopProvider=(props)=>{
    const currency='₹';
    const deliveryCharges=50;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products, setProducts]=useState([]);
    const [token ,setToken]=useState('');
    const navigate=useNavigate();
    const addToCart=async (itemId , size)=>{
        let cartData = structuredClone(cartItems);

        if(!size){
            toast.error('Select Size');
            return ;
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size} , {headers:{token}});
                
            } catch (err) {
                console.log(err);
                toast.error(err.message);
                
            }
        }
    };

    const getCartCount=()=>{
        let total=0;
        for(const items in cartItems){
            for(const i in cartItems[items]){
                try{
                    if(cartItems[items][i]>0){
                        total+=cartItems[items][i]
                    }
                }catch(e){

                }
            }
        }
        return total;
    }

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);
        if(token){
            try{

                await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{headers:{token}});

            }catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }

    }

    const getCartAmount=()=>{
        // let totalamount=0;
        // for(const items in cartItems){
        //     let iteminfo=products.find((p)=>p._id===items);
        //     for(const i in cartItems[items]){
        //         try{
        //             if(cartItems[items][i]>0){
        //                 totalamount+=iteminfo.price * cartItems[items][i];
        //             }

        //         }catch(e){

        //         }
        //     }
        // }
        // return totalamount;
            let totalAmount = 0;

            for (const itemId in cartItems) {
                const itemInfo = products.find(p => p._id === itemId);

                if (!itemInfo) {
                    console.warn(`Product with ID ${itemId} not found in product list`);
                    continue;
                }

                const sizes = cartItems[itemId];
                for (const size in sizes) {
                    const quantity = sizes[size];
                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity;
                    }
                }
            }

            return totalAmount;

    }

    const getProductsData=async()=>{
        try{
            const response=await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message);
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const getUserCart=async(token)=>{
        try {
            const response=await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
            
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            
        }
    }
  

    useEffect(()=>{
        getProductsData();
    },[]);
    // useEffect(()=>{
    //      if(!token && localStorage.getItem('token')){
    //         setToken(localStorage.getItem('token'));
    //         getUserCart(localStorage.getItem('token'));
    //      }
    // },[]);
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
          setToken(localToken);
        }
      }, []);
      
      useEffect(() => {
        if (token && products.length > 0) {
          getUserCart(token);
        }
      }, [token, products]);

    const value={
        products,
        currency,
        deliveryCharges,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopProvider;