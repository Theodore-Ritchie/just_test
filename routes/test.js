const Router=require('koa-router');
const jwt=require('koa-jwt');
const router=new Router();

router.get("/",function (ctx) {
    ctx.body="抢购卡"
})

module.exports=router