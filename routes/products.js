const express = require('express');
const { route } = require('next/dist/next-server/server/router');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) =>{
   try{
      const products = await Product.find();
      res.json(products);
   }catch(err){
      res.status(500).json({message: err.message});
   }
})

router.get('/:id', getProducts, (req, res) =>{
   res.json(res.product);
})

router.post('/', async (req, res) =>{
   const product = new Product({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount
   });

   try{
      const newProduct = await product.save();
      res.status(201).json(newProduct);
   }catch(err){
      res.status(400).json({message: err.message});
   }
})

router.patch('/:id', getProducts, async (req, res) =>{
   if(req.body.name != null){
      res.product.name = req.body.name;
   }
   if(req.body.price != null){
      res.product.price = req.body.price;
   }
   if(req.body.amount != null){
      res.product.amount = req.body.amount;
   }

   try{
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
   }catch(err){
      res.status(400).json({message: err.message});
   }
})

router.delete('/:id', getProducts, async (req, res)=>{
   try{
      await res.product.remove();
      res.json({message: "Product has been deleted"});
   }catch(err){
      res.status(500).json({message: err.message});
   }
})

async function getProducts(req, res, next){
   let product;
   try{
      product = await Product.findById(req.params.id);
      if(product == null){
         return res.status(400).json({message: "Couldn't find product"});
      }
   }catch(err){
      return res.status(500).json({message: err.message});
   }
   res.product = product;

   next();
}

module.exports = router;