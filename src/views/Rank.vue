<template>
  <div class="rank">
    <!--<div>排行界面</div>-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
		  <el-tab-pane :label="item.title" :name="item.flag" v-for="(item, index) in tabs" :key="index"
		  	>
    <!--bookList == null为什么不可以作为判断依据？-->
		  	<BookList v-bind:bookList="bookList"></BookList>
		 	</el-tab-pane>
		</el-tabs>
		<!--自己写的标签卡-->
    <!--<div class="top" :class="{active: item.isCheck}" v-for="(item, index) in tabs" :key="index" @click="changeActive(item, index);showNovels(item.flag)">{{item.title}}
    
    </div><br />-->
    <!--<BookList v-bind:bookList="bookList"></BookList>-->	
  </div>
  
</template>

<script>
// @ is an alias to /src
import BookList from "../components/BookList.vue";
export default {
  name: 'Rank',
  components: {
    BookList,
  },
  data() {
    return {
    	//加载标志
    	loading:true,
    	activeName: 'hot',
    	idx: 0,
  		tabs: [
  			{title: '人气榜', isCheck: true,flag: 'hot'},
  			{title: '新书榜', isCheck: false, flag: 'new'},
  			{title: '完结榜', isCheck: false, flag: 'over'},
  		],
		//三个榜单
  		hot:null,
  		new:null,
  		over:null,
  		//排行榜小说
		bookList:null,
    };
  },
   //computed：计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
//computed:{
//	imgUrl(cover){
//		return 'http://statics.zhuishushenqi.com'+cover
//	}
//},
  methods: {
  	//改变图片路径
  	imgUrl(cover){
  		return 'http://statics.zhuishushenqi.com'+cover
  	},
//	<!--自己写的标签卡样式-->
//	changeActive(item, index) {
//		if (this.idx == index) {
//			return;
//		}
//		item.isCheck = true;
//		this.tabs[this.idx].isCheck = false;
//		this.idx = index;
//	},
		//标签卡点击事件
		handleClick(tab, event) {
        console.log(tab.name);
        this.showNovels(tab.name);
        
     },
  	showNovels(flag){
  		//获取排行榜小说，即获取当前榜的小说列表
  		const api_proxy = 'http://api.kele8.cn/agent/';
//    let id = '5a322ef4fc84c2b8efaa8335'
			let id = ''
			//flag标志当前选中的榜单，默认显示是hot
			console.log(flag)
			if(flag == 'hot'){
				id = this.hot._id
			}else if(flag == 'new'){
				id = this.new._id
			}else{
				id = this.over._id
			}
			//加载数据成功之前显示loading图标
        this.loading = true
     axios
      .get(api_proxy+"http://api.zhuishushenqi.com/ranking/"+id)
      .then(res => {
           console.log(res);
        this.bookList = res.data.ranking.books;
        //加载成功取消loading图标
        this.loading = false
        console.log(this.loading);
        
      })
      .catch(err => {
        console.error(err);
      });
  	}
  },
  created() {
  	//''!=null',null ==null
//	console.log(this.bookList == null)
  	const api_proxy = 'http://api.kele8.cn/agent/';
		//获取所有排行榜,取出需要的榜单,以获取其id
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/ranking/gender")
      .then(res => {
           console.log(res);
//      this.rankList = res.data;
        this.hot = res.data.picture[0];
        this.new = res.data.picture[3];
        this.over = res.data.picture[4];
        console.log( this.hot);
        
      })
      .catch(err => {
        console.error(err);
      });
       //加载数据成功之前显示loading图标
        this.loading = true
    //默认显示hot榜的小说列表
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/ranking/"+"5a322ef4fc84c2b8efaa8335")
      .then(res => {
           console.log(res);
        this.bookList = res.data.ranking.books;
         //加载成功取消loading图标
        this.loading = false
        console.log(this.loading);
      })
      .catch(err => {
        console.error(err);
      });
      
  },
}
</script>
<style lang="less" >
	.rank{
		height: 81%;
		.el-tabs{
			height:100%;
			.el-tabs__header{
				height: 12%;
				/*height: 50px;*/
				/*background-color: bisque;*/
				margin: 0;
			}
			.el-tabs__content{
				height: 88%;
				/*height: ~"calc(1000px - 30px)";*/
				.el-tab-pane{
					/*background-color: skyblue;*/
					height: 100%;
					overflow: auto;
					/*height: 80%;
					overflow: hidden;*/
				}
			}
		}
		
		.el-tabs__nav{
			width: 100%;
			.el-tabs__item{
				height: 50px;
				width: 33%;
				text-align: center;
				padding: 0;
				
			}
		}
		
			
	}
	
	/*.rank{
		div.top{
				float: left;
				&.active{
					color: #e4393c;
				}
		}
	}*/
</style>