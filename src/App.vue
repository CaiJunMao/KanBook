<template>
  <div id="app" ref="appScreenSize">
    <!-- 一级路由:下面为app的主体main-->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    data(){
      return {
        clientHeight:'',
        clientWidth:'',
      }
    },
    mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`
      this.clientWidth =   `${document.documentElement.clientWidth}`
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
        this.clientWidth = `${document.documentElement.clientWidth}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight,this.clientWidth)
      },
      clientWidth: function () {
        this.changeFixed(this.clientHeight,this.clientWidth)
      }
    },
    methods:{
      changeFixed(clientHeight,clientWidth){                        //动态修改样式
        console.log(clientHeight);
//      this.$refs.appScreenSize.style.height = clientHeight+'px';
//      this.$refs.appScreenSize.style.width = clientWidth+'px';

      },
    }
  }
</script>

<style lang="less">
	html{
	/*Html级元素默认宽度是100%，即整行；但是高度并不是100%，而仅仅是一行而已。
所以要想实现撑满整个页面，必须显式地设置高度为100%*/
	height: 100%;
}
	body{
		padding: 0;
		margin: 0;
		/*同html默认只有一行的高度*/
		height: 100%;
	}
#app {
   font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*max-width: 760px;*/
  width: 100%;
  max-width: 414px;
  /*设备高度*/
  /*height: 560px;*/
  height: 100%;
  max-height: 823px;
}

</style>
