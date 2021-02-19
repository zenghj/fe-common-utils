## Todos

1. ~~产出index.d.ts文件~~

2. ~~不通过webpack打包，然后通过npm安装，依然可以正确打包编译出es5代码？会有情况导致node_modules中的包不被babel转换成es5吗？~~

  * 好像是默认情况下脚手架配的webpack会对node_modules中的模块进行babel转换？exclude ode_modules呢？

  * ~~观察loadsh的npm包，他的可是单文件，但是是commonjs，可以require其他文件，是es5语法~~

问题1和2都是因为build的时候执行的是`babel src -d dist --extensions \".ts,.js\"`通过babel做转换会导致根本不会识别tsconfig.json,所以配置了也没用
3. ~~自动生成文档~~

4.  添加测试

5. 环境变量怎么处理，是否需要在工具库中处理，还是只处理工具本身，环境变量对应的逻辑由业务自身处理

6. 是否支持SSR使用

7. gaPlugin实现

## 思考

测试发现，在库中使用es6的api，比如Set，并不会polyfill，而是直接原样输出
