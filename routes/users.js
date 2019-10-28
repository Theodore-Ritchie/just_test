const Router=require('koa-router');
const jwt=require('koa-jwt');
const router=new Router({prefix:'/users'});

const {find,create,update,del,findById} =require('./../controllers/users');

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id',update);
router.delete('/:id',  del);
module.exports=router;