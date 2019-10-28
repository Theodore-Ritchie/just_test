const Router=require('koa-router');
const jwt=require('koa-jwt');
const router=new Router({prefix:'/cards'});

const {find,create,update,del,findById} =require('./../controllers/cards');


router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id',update);
router.delete('/:id',  del);
module.exports=router;