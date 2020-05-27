import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    audio: {
      // 音乐当前播放时间
      currentTime: 0,
      //音乐总时长
      maxTime: 0
    },
    //数据
    id: 0,
    picUrl: '',
    srcmp3: '',
    name: ''
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
