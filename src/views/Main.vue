<template>
  <div class="main">
  	<div v-if="!$route.meta.hideTop" class="topBox">
  		<div class="top" >
				<span>{{topName}}</span>
			</div>
  	</div>
		
  	<!-- 二级路由,下分分类\排行榜\检索 -->
  	<!--<div class="content"></div>-->
  	<transition  name="slide">
  		<router-view ></router-view>
  	</transition>
  	
  	<div  v-if="!$route.meta.hideBottom" class="bottomBox">
	  	<div class="bottom" >
	  		<div :class="{active: item.isCheck}" v-for="(item, index) in tabs" :key="index" @click="changeActive(item, index)">
	  			<img :src="item.url"><span>{{item.title}}</span>
	  		</div>
	  	</div>
	  	<div class="clearB">
			<!--防止主体的中间部分，因botton是fiex而被盖住-->
			</div>
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
  			{title: '分类', isCheck: true, path:{name: 'classify'}, flag: 'classify',url:'./classify.png'},
  			{title: '排行榜', isCheck: false, path:{name: 'rank'}, flag: 'rank',url:'./rank.png'},
  			{title: '搜索', isCheck: false, path:{name: 'search'}, flag: 'search',url:'./search.png'},
  		],
  		//顶部的显示文字，默认为’分类，点击路由相应改变
			topName:'分类',
		
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
  		this.topName = this.tabs[this.idx].title;
      this.$router.push(item.path);
  	}

  },


  created() {

  }
}
</script>

<style scoped lang="less">
	.main{
		/*即app的高度*/
		height: 100%;
		.content{
			/*最顶上至少要有一个具体的高度，后面的100%才能起作用*/
			/*min-height: ~"calc(100% - 110px)";*/
			/*避免边框等影响，最好别刚好100%*/
			/*height: 81%;*/
			/*width: 100%;*/
			/*overflow: auto;*/
		}
		.topBox{
			height: 8%;
			.top{
				top: 0;
				/*min-height: 50px;*/
				height: 100%;
		    background-color: #409EFF;
		    color: white;
		    display:flex;
		    justify-content: center;
		     align-items:center;
		    
		    span{
		    	display: inline-block;
		    	font-size: 25px;
		    	/*height: 100%;*/
		    	/*line-height:100%;*/
		    }
			}
		}
		.bottomBox{
			height: 10%;
			.bottom{
				position: fixed;
				bottom: 0;
				width: 100%;
				/*min-height: 60px;*/
				height: 10%;
		    z-index: 10;
		    /*border-top: #A9A9A9 1px solid;*/
		    background-color: #f8f8f8;
		    div{
					float: left;
					width: 33%;
					text-align: center;
					height: 100%;
					line-height: 60px;
					font-size: 20px;
					background-color: #f8f8f1;
					img{
							height: 20px;
							padding: 0;
							vertical-align:middle;
							position: relative;
							top:-2px;
							/*display: block;
							float: left;*/
						}
					&.active{
						color: orange;
					}
				}
				
			}
		}
		.clearT{
			/*min-height: 50px;*/
		}
		.clearB{
			/*min-height: 60px;*/
		}
		
	}
	

</style>
