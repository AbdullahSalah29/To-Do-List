import { createStore } from 'vuex'
import UserInfoModule from './modules/UserInfo'
import TaskInfoModule from './modules/TaskInfo'

const store = createStore({
  strict: false,
  modules: {
    UserInfoModule,
    TaskInfoModule
  }
})

export default store