const jwtWebToken=require("jsonwebtoken")
const Card=require('./../models/cards')
const {secret}=require('./../config')

class CardCtl{
    async find(ctx) {
        const {per_page, page} = ctx.query
        const perPage = per_page ? per_page * 1 : 0;
        const Page = page ? page * 1 : 0;
        ctx.body = await Card.find({name: new RegExp(ctx.query.q)}).limit(perPage).skip(Page * perPage);
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
        });
        const { name } = ctx.request.body;
        const repeatedCard = await Card.findOne({ name });
        if (repeatedCard) { ctx.throw(409, '卡名已经存在'); }
        const order = await new Card(ctx.request.body).save();
        ctx.body = order;
    };
    async update(ctx) {
        ctx.verifyParams({

        });
        const order = await Card.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!order) { ctx.throw(404, '卡不存在'); }
        ctx.body = order;
    }
    async del(ctx) {
        const order = await Card.findByIdAndRemove(ctx.params.id);
        if (!order) { ctx.throw(404, '卡不存在'); }
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
        const user = await Card.findById(ctx.params.id).select(selectFields)
            .populate(populateStr);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.body = user;
    }
}

module.exports=new CardCtl();