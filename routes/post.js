const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postControllers');
const httpsControllers = require('../controllers/https');

/* GET home page. */
router.get('/', function(req, res) {
  postsControllers.getPostsData(res)
});
router.post('/',(req,res)=>{
  postsControllers.addPostsData(req,res);
})
router.delete('/',(req,res)=>{
  postsControllers.deleteAllPostData(res)
})
router.delete('/:id',(req,res)=>{
  const id =req.params.id ;
  postsControllers.deleteIDPostData(res,id)
})
router.patch('/:id',(req,res)=>{
  const id =req.params.id ;
  postsControllers.patchPostsData(req,res,id)
})
router.options('/',(req,res)=>{
  httpsControllers.cors(res)
})
module.exports = router;
