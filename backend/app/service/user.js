const Service = require('egg').Service;

class UserService extends Service {

 // 查询学生信息
 async getUser() {
    try{
        const params = this.ctx.query;
        const { username } = params;
        const user = await this.app.mysql.get('users', { username });
        if(user){
            return user;
    }
}
    catch(err){
      console.log(err);
    }
  
    }
}

module.exports = UserService;