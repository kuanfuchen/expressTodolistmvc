const handleSuccess = require('../services/handlesuccess');
const handleError = require('../services/handleError');
const Post = require('../models/postsmodel');

const postsControllers = {
  getPostsData: async(res)=>{
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
      handleError(res,'很抱歉，格式錯誤了')
    }
  },
  deleteIDPostData:async(res,id)=>{
    const info = await Post.find({_id:id});
    if(info.length !== 0){
      await Post.findByIdAndDelete({_id:id})
      handleSuccess(res,'資料已刪除')
    }else{
      handleError(res,'id並不存在')
    }
  },
  deleteAllPostData:async(res)=>{
    await Post.deleteMany({});
    handleSuccess(res,[]);
  },
  patchPostsData:async(req,res,id)=>{
    try{
      const data = req.body;
      if(id && data.name && data.content){
        const modifiedData = await Post.findByIdAndUpdate(id,data,{new:true});
        handleSuccess(res, modifiedData)
      }else{
        handleError(res,'沒有此id或資料有缺少')
      }
    }catch(err){
      handleError(res,'格式錯誤')
    }
  }
}
module.exports = postsControllers;