import AppCheckbox from './AppCheckbox.vue'
// 注册自定义组件
// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
  install (app) {
    app.component('AppCheckbox', AppCheckbox)
  }
}