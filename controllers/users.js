const jwtWebToken=require("jsonwebtoken")
const User=require('./../models/users')
const {secret}=require('./../config')

class UserCtl {
    async find(ctx) {
        const {per_page, page} = ctx.query
        const perPage = per_page ? per_page * 1 : 0;
        const Page = page ? page * 1 : 0;
        ctx.body = await User.find({username: new RegExp(ctx.query.q)}).limit(perPage).skip(Page * perPage);
    }
    async create(ctx) {
        //只要有 微信号 和 用户名 建立数据库
        ctx.verifyParams({
            username:{type: 'string',require:true}
        });
        const { username } = ctx.request.body;
        const repeatedUser = await User.findOne({ username });
        if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
        console.log(username)
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    };
    async update(ctx) {
        // 先不验证
        // ctx.verifyParams({
        //     username:{type: 'string',require:false}
        // });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.body = user;
    }
    async del(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.status = 204;
    };
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
        const populateStr = fields.split(';').filter(f => f).map(f => {
            if (f === 'employments') {
                return 'employments.company employments.job';
            }
            if (f === 'educations') {
                return 'educations.school educations.major';
            }
            return f;
        }).join(' ');
        const user = await User.findById(ctx.params.id).select(selectFields)
            .populate(populateStr);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.body = user;
    }
}

module.exports=new UserCtl();