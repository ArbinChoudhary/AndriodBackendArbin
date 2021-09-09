const user = require('../models/userModel');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/HamroOnlineBookShop';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('User Schema test anything', () => {
// the code below is for insert testing
 it('Add user testing anything', () => {
 const user = {
"firstname": 'abcd',
 'lastname': 'abcdefgh',
 'email': 'test12@gmail.com',
 "password":"testing1",
 "mobileno":"7492502"
 };
 
 return user.create(user)
 .then((pro_ret) => {
 expect(pro_ret.firstname).toEqual('testing3 ');
 });
 });
 

 it('login testing anything', () => {
    const user = {
    
    'email': 'home@gmail.com',
    "password":"basic123"

    };
    
    return User.findOne(user)
    .then((pro_ret) => {
    expect(pro_ret.email).toEqual('home@gmail.com');
    expect(pro_ret.password).toEqual('powerhouse');
    });
    });





       it('to test the update  user', async () => {
        return user.findByIdAndUpdate({_id :Object('607eaa2a698b902390fee654')}, 
       {$set : {email:'dilip@gmail.com',
                        firstname:'hari'}})
        .then((pp)=>{
        expect(pp.email).toEqual('ktm@gmail.com')
        expect(pp.firstname).toEqual('ktm13')
        })
        
       });


       it('to test the delete  user', async () => {
        return user.findOneAndDelete({_id :Object('607eaa2a698b902390fee654')}, 
       {$set : {email:'ktm@gmail.com'}})
        .then((pp)=>{
        expect(pp.email).toEqual('ktm@gmail.com')
        })
        
       });



















})