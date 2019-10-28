const Koa=require("koa")
const koaBody=require("koa-body")
const koaStatic=require("koa-static")
const koaError=require("koa-json-error")
const koaParamter=require("koa-parameter")
const mongoose=require("mongoose")
const path=require("path")
const {secret,url}=require("./config")
const routing=require('./routes')
//
mongoose.connect(url,{userNewUrlParser:true},()=> console.log('mongodb启动成功,test的Collection 开启'))
mongoose.connection.on('error',console.error);
app=new Koa();

app.use(koaStatic(path.join(__dirname,'public')))
app.use(koaError({
    postFormat:(e,{stack,...rest})=> process.env.NODE_DEV =='production'?rest:{stack,rest}
}))
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'/public/uploads'),
        keepExtensions:true
    }
}))
app.use(koaParamter(app))
routing(app);
app.listen(3000,()=>console.log('程序启动在3000端口'))
