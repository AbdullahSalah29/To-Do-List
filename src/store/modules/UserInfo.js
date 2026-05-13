export default {

    namespaced: true,
    state: {
        users: [],
    },
    getters: {},
    mutations: {
         addUser(s,user){
            s.users.push(user)
            console.log('add user mutation:',s.users)
        } 
    },
    actions: {
       adduser(context,user){
        context.commit("addUser",user)
        } 
    },
    modules: {},

    
}