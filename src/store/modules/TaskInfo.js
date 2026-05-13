export default {
  namespaced: true,
  state: {
    tasks: []
  },




  getters: {

     pendingcount(s) {
      return s.tasks.filter((f) => f.status === "pending").length;
    },
    completecount(s) {
      return s.tasks.filter((f) => f.status === "complete").length;
    },
  },



  
  mutations: {
    Addtask(s,task){
      s.tasks.push(task)
      console.log("add mutation",s.tasks)
    },

    EditTask(s,task){
      const index = s.tasks.findIndex(f=>f.id === task.id)
      s.tasks[index] = task
      console.log("edit mutation",s.tasks[index])
    },

    DeleteTask(s,id){
      s.tasks = s.tasks.filter(f=>f.id !== id)
      console.log("delete mutation",s.tasks)
    }
  },

  actions: {
    addtask(context,task){
      context.commit("Addtask",task)
    },

    edittask(context,task){
      context.commit("EditTask",task)
    },

    deletetask(context,id){
      context.commit("DeleteTask",id)
    }
  }
}