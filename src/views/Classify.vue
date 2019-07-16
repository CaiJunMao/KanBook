<template>
  <div class="classify">
  	<!--标签卡点击事件@tab-click="handleClick"-->
  	<el-tabs v-model="activeName"  tab-position="left" >
		    <el-tab-pane :label="bigClassifyType[key]" :name="key" v-for="(item ,key, index) in bigClassify" :key="index">
		    	<ul   >
						<li v-for="(sItem, index) in item" :key="index" @click="$router.push({path:'/classifyDetail',query:{gender:key,major:sItem.name}})">
							<img :src="imgUrl(sItem.bookCover[0])"/>
							<div class="">
								<p>{{sItem.name}}</p>
								<p>
									<!--月更新：<span>{{sItem.monthlyCount}}</span>-->
									总计：<span>{{sItem.bookCount}}</span>
								</p>
							</div>
						</li>
					</ul>
		    </el-tab-pane>
		  </el-tabs>
     
    <router-view></router-view>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Search from '@/components/Search.vue'
export default {
  name: 'classify',
  data() {
    return {
    	 activeName: 'male',
      bigClassify:null,
      bigClassifyType: {
        male: '男生',
        female: '女生',
        picture:'其他',
        press: '出版'
      },
//    loading:false
    };
  },
   methods:{
	//图片路径
		imgUrl(cover){
			return 'http://statics.zhuishushenqi.com'+cover
		},
  },
  created() {
  	const api_proxy = 'http://api.kele8.cn/agent/';
  	//获取所有分类
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/cats/lv2/statistics")
      .then(res => {
           console.log(res);
        this.bigClassify = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};

</script>
<style lang="less" >
.classify {
	/*必须在不scope的style中才能修改.el-tabs__content，而如下一个style却可以修改其他element样式*/
	.el-tabs__content{
		height: 100%;
		/*background-color: red;*/
	}
}
    
</style>
<style lang="less" scoped>
.classify {
	height: 81%;
	.el-tabs{
		height:100%;
		.el-tabs__header{
			height: 12%;
			margin: 0;
		}
		.el-tabs__content{
			.el-tab-pane{
				height: 100%;
				overflow: auto;
			}
		}
	}
	
}
	p{
		margin: 0;
		padding: 0;
	}
	ul{
		padding-left: 10px;
		margin: 0;
		/*border-bottom: #0000FF 1px solid;*/
		li{
			list-style:none;
			margin-bottom:10px ;
			display: flex;
			justify-content: space-between;
			img{
				height: 50px;
				width: 20%;
				border-radius: 50%;
				float: left;
				margin-right: 5px;
			};
			>div{
				height: 50px;
				width: 80%;
				float: left;
			}
		}
	}
</style>