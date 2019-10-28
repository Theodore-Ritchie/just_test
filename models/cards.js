const mongoose=require('mongoose')
const {Schema ,model } =mongoose

const cardsSchema= new Schema({
    name:{type: String ,require:true},
    price:{type:Number,require:true},
    introduct:{type:String,default:"这是商品介绍"},
    parameter:[{type:String,default:"这是一个规格参数"}],
    pic_url:[{type:String,default:''}],
    sell:{type:Number,default:20},
    total:{type:Number,default:1000},
    showParameter:{type:String,default:"展示参数"},
    discount:{type:Number,default:1},
    // location:{type:Schema.Types.ObjectId,ref:''}
})

module.exports=model('Card',cardsSchema)