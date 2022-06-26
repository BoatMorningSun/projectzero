const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   lintOnSave: false
 
}),
module.exports = {
	lintOnSave:false  // 修改成false 就是不检查了
}
