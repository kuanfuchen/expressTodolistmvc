const handleSuccess = require('../services/handlesuccess');
const handleError = require('../services/handleError');
const Post = require('../models/postsmodel');

const postsControllers = {
  getPostsData: async(res) => {
    const data = await Post.find();
    handleSuccess(res,data);
  },
  addPostsData: async(req,res)=>{
    try{
      const data = req.body;
      if(data.name && data.content){
        const info = await Post.create(data);
        handleSuccess(res,info)
      }else{
        handleError(res,'屬性未填寫完')
      }
    }catch(err){
      console.log(err, 'create err')
      handleError(res,'很抱歉，格式錯誤了')
    }
  },
  deleteIDPostData:async(req, res)=>{
      try{
        console.log(req.originalUrl)
        const id = req.params.id ;
        const handledeleteinfo = await Post.findByIdAndDelete(id)
        if(handledeleteinfo === null){
          handleError(res,'錯誤的id，請重新輸入')
        }else{
          handleSuccess(res,'資料已刪除')
          
        }
      }catch(err){
        handleError(res,'id並不存在')
      }
  },
  deleteAllPostData:async(req,res)=>{
    if(req.originalUrl==='/posts'){
      await Post.deleteMany({});
      handleSuccess(res,[]);
    }else{
      handleError(res,'請補上id')
    }
  },
  patchPostsData:async(req,res,id)=>{
    try{
      const data = req.body;
      if(id && data.name && data.content){
        const modifiedData = await Post.findByIdAndUpdate(id,data,
          {new:true, runValidators: true});
        handleSuccess(res, modifiedData)
      }else{
        handleError(res,'沒有此id或資料有缺少')
      }
    }catch(err){
      console.log(err,'patch err')
      handleError(res,err.message)
    }
  }
}
module.exports = postsControllers;