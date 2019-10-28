const mongoose=require('mongoose')
const {Schema ,model } =mongoose

const userSchema= new Schema({
    account:{type:String,default:"这是微信号"},
    username:{type: String ,require:true},
    avatarurl:{type:String,default:""},
    sex: { type: String, enum: ['男', '女'], default: '男'},
    province:{type:String,default:"广东省"},
    city:{type:String,default:"深圳"},
    phone:{type:String,default:"13322401238891"},
    cards:[{type:Schema.Types.ObjectId,ref:'cards'}],
    orders:[{type:Schema.Types.ObjectId,ref:'orders'}]
})

module.exports=model('User',userSchema)