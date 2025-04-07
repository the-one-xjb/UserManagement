const Controller = require('egg').Controller;

class UserController extends Controller {
 // 查询学生信息
 async getUser() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser();
    if (!user) {
       ctx.body = {
          status: 500,
          msg: '查询失败',
          data: {},
       };
       return;
    }
    ctx.body = {
       status: 200,
       msg: '查询成功',
       data: user,
    };
    return ctx.body;
  }
}
module.exports = UserController;