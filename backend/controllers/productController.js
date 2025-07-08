import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
//adding product

const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body;
        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 &&  req.files.image2[0];
        const image3 =req.files.image3 &&  req.files.image3[0];
        const image4 =req.files.image4 &&  req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined);
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )
        const productdata={
            name,
            description,
            category,
            price : Number(price),
            subCategory,
            bestseller : bestseller==='true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productdata);
        const product=new productModel(productdata);
        await product.save();
        
        res.json({success:true ,  message:"Product added"})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message});
    }



};

//list product
const listProduct = async (req, res) => {
    try{
        const products=await productModel.find({});
        res.json({success:true, products})

    }catch(e){
        console.log(e);
        res.json({success :false , message : e.message});
    }
};

//remove product
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"Product removed successfully"})

    }catch(e){
        console.log(e);
        res.json({ success: false, message: e.message });

    }

};

//single product info
const singleProduct = async (req, res) => {
    try{
        const {productId} =req.body;
        const product=await productModel.findById(productId);
        res.json({success:true, product});

    }catch(e){
        console.log(e);
        res.json({ success: false, message: e.message });

    }

};

///////////////------------------------////////////////////////////////





export {listProduct,addProduct,removeProduct,singleProduct};