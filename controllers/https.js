const httpsControllers = {
  cors:(res)=>{
    res.status(200).send('<h2>options success</h2>');
    res.end();
  },
}
module.exports = httpsControllers;