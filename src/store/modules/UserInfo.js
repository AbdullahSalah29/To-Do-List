export default {

    namespaced: true,
    state: {
        users: [],
    },
    getters: {},
    mutations: {
         addUser(state,user){
            state.users.push(user)
            console.log('add user mutation:',state.users)
        } 
    },
    actions: {
       adduser(context,user){
        context.commit("addUser",user)
        } 
    },
    modules: {},

    
}