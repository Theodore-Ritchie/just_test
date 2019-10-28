const mongoose=require('mongoose')
const {Schema ,model } =mongoose

const ordersSchema= new Schema({
    card:{type:Schema.Types.ObjectId,require: true},
    number:{type: Number,default:1},
    discount: {type:Number,default: 1},
    transform:{type:String,enum:['快递发货','自取','送货上门'],default:"快递发货"},
    fee:{type:Number,default:0},
    price:{type:Number,default:9999},
    cardName:{type:String,require: false}
    // location:{type:Schema.Types.ObjectId,ref:''}
});

module.exports=model('Order',ordersSchema)