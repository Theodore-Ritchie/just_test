const jwtWebToken=require("jsonwebtoken")
const Order=require('./../models/orders')
const Card=require('./../models/cards')
const {secret}=require('./../config')
const {Schema}=require("mongoose")
class OrderCtl{
    async find(ctx) {
        const {per_page, page} = ctx.query
        const perPage = per_page ? per_page * 1 : 0;
        const Page = page ? page * 1 : 0;
        ctx.body = await Order.find({}).limit(perPage).skip(Page * perPage);
    }
    async create(ctx) {
        ctx.verifyParams({
            card: { type: 'string', required: true },
        });
        const { card } = ctx.request.body;
        const hascard = await Card.findById(card);
        if (!hascard) { ctx.throw(409, '卡不存在'); } //卡名称一定要存在n
        const {name=''} = hascard
        ctx.request.body.name=name
        const order = await new Order(ctx.request.body,name).save();
        ctx.body = order;
    };
    async update(ctx) {
        ctx.verifyParams({
        });
        const order = await Order.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!order) { ctx.throw(404, '订单不存在'); }
        ctx.body = order;
    }
    async del(ctx) {
        const order = await Order.findByIdAndRemove(ctx.params.id);
        if (!order) { ctx.throw(404, '订单不存在'); }
        // ctx.status = 204;
        ctx.body='删除成功'
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
        const order = await Order.findById(ctx.params.id).select(selectFields)
            .populate(populateStr);
        if (!order) { ctx.throw(404, '用户不存在'); }
        ctx.body = order;
    }
}

module.exports=new OrderCtl();