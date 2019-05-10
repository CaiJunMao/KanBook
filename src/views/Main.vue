<template>
  <div class="main">
		<div class="top">
			顶部
		</div>
		<div class="clear">
			<!--防止主体的中间部分，因top是fiex而往上顶-->
		</div>
  	<!-- 二级路由,下分分类和排行榜 -->
  	<router-view></router-view>
		<div class="clear">
			<!--防止主体的中间部分，因botton是fiex而被盖住-->
		</div>
  	<div class="bottom">
  		<div :class="{active: item.isCheck}" v-for="(item, index) in tabs" :key="index" @click="changeActive(item, index)">{{item.title}}</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
  	return {
  		idx: 0,
  		tabs: [
  			{title: '分类', isCheck: true, path:{name: 'classify'}, flag: 'classify'},
  			{title: '排行榜', isCheck: false, path:{name: 'rank'}, flag: 'rank'},
  		]

  	};
  },
  methods: {
  	changeActive(item, index) {
  		if (this.idx == index) {
  			return;
  		}
  		item.isCheck = true;
  		this.tabs[this.idx].isCheck = false;
  		this.idx = index;
      this.$router.push(item.path);
  	}

  },


  created() {

  }
}
</script>

<style scoped lang="less">
	.main{
		.top{
			position: fixed;
			top: 0;
			width: 100%;
			height: 50px;
	    z-index: 10;
	    background-color: paleturquoise;
	    padding: 0;
	    
		}
		.clear{
			height: 50px;
		}
		.bottom{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 50px;
	    z-index: 10;
		}
	}
	

	.main .bottom>div{
		float: left;
		width: 50%;
		text-align: center;
		height: 50px;
		line-height: 50px;
		background-color: #f8f8f8;
	}

	.main .bottom>div.active{
		color: #e4393c;
	}
</style>
