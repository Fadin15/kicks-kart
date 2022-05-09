var express = require('express');
const { response } = require('../app');

var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
    console.log(products)

  })
  
  
});
router.get('/add-product',function(req,res){
res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
 

  productHelpers.addProduct(req.body,(id)=>{ 
    let Image=req.files.image
    console.log(id)
    Image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err)
      }
    })

  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

module.exports = router;
