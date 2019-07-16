<template>
  <div class="book-detail">
  	<TopBar v-bind:name="name"></TopBar>
	  <div v-if="book" >
	  	<div class="detail">
			<img :src="imgUrl" class="cover" />
	   		<div >
	   			<h2 >{{book.title}}</h2>
	   			<p>作者：{{book.author}}</p>
	   			<p>分类：{{book.majorCate}}>{{book.minorCate}}</p>
	   			<p>最近更新：{{book.updated}}</p>
	   		</div>
	  	</div >
	  	<div class="operate" v-if="chapters">
	  		<el-button type="danger" @click="choiceChapter(chapters[0].link,1)">开始阅读</el-button>
 				<el-button type="warning" @click="choiceChapter(chapters[chapters.length-1].link,chapters.length)">最新章节</el-button>
	  	</div>
	  	<!--简介-->
	  	 <div class="longIntro">
		   	 <p>{{book.longIntro }}</p>
		   </div>
		   <!--小说标签-->
		   <div class="tag">
		   	<el-tag v-for="tag in book.tags">{{tag}}</el-tag>
<!--<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>-->
		   </div>
		   
			 
		   
		   <div class="chapters" v-if="chapters">
		   	 <!--根据书源id获取的小说章节,点击进入阅读界面-->
		   	 <div class="title">
		   	 		<h1>目录</h1> <span>共{{chapters.length}}章</span>
		   	 </div>
		   	 <!--显示当前页码的章节，需要截取数组chapters.slice(start,end)-->
			   <!--<div v-for="(chapter,key) in chapters.slice(0,10)">-->
			   <div class="chapter" v-for="(chapter,key) in chapters.slice((currentPage-1)*10,(currentPage-1)*10+10)">
			  		<p @click="choiceChapter(chapter.link,(currentPage-1)*10+1+key)">	
			  			{{(currentPage-1)*10+1+key}}.{{chapter.title}}
			  		</p>
			 	 </div>
			 	 <div class="page">
			 	 	<ul>
			 	 		<li @click="first">首页</li>
			 	 		<li @click="pre">上一页</li>
			 	 		<!--<span>{{currentPage}}</span>/<span>{{Math.ceil(book.chaptersCount/10)}}</span>-->
			 	 		<li class="pageNum" >
			 	 			<!--v-model="currentPage"-->
			 	 			<!--<input type="text" @blur="updateMune" v-model="num"/>/
			 	 			<span>{{Math.ceil(book.chaptersCount/10)}}</span>-->
			 	 			<el-select v-model="currentPage" >
						    <el-option v-for="item in allPage" :key="item" :label="item+'/'+allPage" :value="item" >
						    </el-option>
						  </el-select>
			 	 		</li>
			 	 		<li @click="next">下一页</li>
			 	 		<li @click="last">尾页</li>
			 	 	</ul>
			 	 </div>
		   </div>
	  </div>
	 
	  <!--首先显示的是根据小说id获取的小说章节
	  点击小说章节，传入章节号和书源id,进入阅读页面，显示选择的章节-->
	<!--  选择书源，书源好像只有一个优质书源能用，-->
	  <!--<div v-if="resouceList">
	  	
	  	<ul v-for="(resouce,key) in resouceList">
	  		<li @click="choiceRes(resouce._id)">{{resouce.name}}</li>
	  	</ul>
	  </div>-->
	   
	 
	  	
  </div>
</template>
<script>
import TopBar from "../components/TopBar.vue";
export default {
  name: "BookDetail",
  data() {
    return {
    	name:"看看书",
    	bid:null,
    	book:{},
    	//小说源
    	resouceList:null,
    	//章节列表
    	chapters:null,
    	//传入read的resouceid.默认为优质书源
    	resouceId:null,
    	//当前页码
    	currentPage:1,
    };
  },
  components: {
    TopBar,
  },
  //computed：计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
  computed:{
  	imgUrl(){
  		return 'http://statics.zhuishushenqi.com'+this.book.cover
  	},
  	//总页数
		allPage(){
			return Math.ceil(this.chapters.length/10)
		},
		
  },
  methods:{
  	//目录换页
  	first(){
  		this.currentPage = 1
  	},
  	last(){
  		this.currentPage = this.allPage
  	},
  	pre(){
  		if(this.currentPage > 1){
  			this.currentPage--
  		}
  	},
  	next(){
  		if(this.currentPage < this.allPage){
  			this.currentPage++
  		}
  	},
  	
  	//页码改变时，更新目录
  	updateMune(){
//		console.log(this.num);
//		this.currentPage = this.num
  	},
  	choiceRes(resouceId){
  		console.log("选择的书源id:"+resouceId)
  		this.resouceId = resouceId
  	},
  	//选择章节,传入link和当前章节
  	choiceChapter(chaLink,currCha){
		console.log("点击的章节号:"+currCha)
  		//传过去link和resouceId
  		this.$router.push({name:'bookRead', params:{link:chaLink,resouceId:this.resouceId,bookName:this.book.title,chaNum:currCha}})
  	},
  	//获取小说章节
  	getChapters(){
  		const api_proxy = 'http://api.kele8.cn/agent/';
  		//获取小说章节，根据书籍源
	    axios
	    	.get(api_proxy+"http://api.zhuishushenqi.com/atoc/"+this.resouceId+"?view=chapters")
	    	.then(res => {
	           console.log(res);
	           this.chapters = res.data.chapters
	      })
	      .catch(err => {
	        console.error(err);
	      });
  	}
  },
  created() {
  	this.bid = this.$route.params.bid;
    console.log(this.bid);
    
    //获取小说详细介绍
  	const api_proxy = 'http://api.kele8.cn/agent/';
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/book/"+this.bid)
      .then(res => {
      	 console.log("小说详情");
           console.log(res);
        	this.book = res.data;
      })
      .catch(err => {
        console.error(err);
      });
 		//获取小说正版源与盗版源，根据boodid
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/atoc?view=summary&book="+this.bid)
      .then(res => {
           console.log(res);
           this.resouceList = res.data
           //设为优质书源
           console.log("优质书源："+this.resouceList[0]._id);
           this.resouceId =  this.resouceList[0]._id
           this.getChapters()
      })
      .catch(err => {
        console.error(err);
      });
			
      
      
  },

};
</script>
<style lang="less" scoped>
	h2{
		margin: 0;
		margin-bottom: 2%;
		padding: 0;
		color: white;
	}
	p{
		margin: 0;
		padding: 0;
	}
	.detail{
		color: white;
		overflow:hidden;
		background-color: rgba(0,0,0,0.6);
		padding:2% 5% 0 5% ;
		.cover{
			width: 23%;
			float: left;
			height: 100px;
			
		}
		div{
			width:75%;
			float: right;
			height: 100px;
		}
	}
	.operate{
		padding:4% 0;
		display: flex;
		justify-content: space-around;
		
		/*border-bottom: #A9A9A9 dotted 1px;*/
	}
	.longIntro{
		border-bottom:solid 1px aliceblue;
		p{
			/*text-indent: 5%;*/
			font-size: 15px;
			padding:0 5%;
		}
		
	}
	.tag{
		padding: 2%;
		display: flex;
		flex-flow:row wrap;
		/*justify-content:space-around;*/
		border-bottom:solid 1px aliceblue;
		span{
			margin-left: 2%;
			margin-bottom: 2%;
		}
	}
	.chapters{
		padding:0 5%;
		.title{
			padding: 2% 0;
			position: relative;
			overflow: hidden;
			display: flex;
			/*底部对齐*/
			align-items: flex-end ;
			border-bottom:solid 1px aliceblue;
			
			h1{
				float: left;
				margin: 0;
			}
			>span{
					float: left;
					margin-left: 2%;
				}
		}
		.chapter{
			p{height: 30px;line-height: 30px; font-size: 15px;}
		}
		.page{
			
			ul{
				margin: 0;
				padding: 0;
				display: flex;
				/*垂直居中*/
				align-items:center;
				li{
					list-style: none;
					float: left;
					width: 19%;
					height: 100%;
					text-align: center;
					&.pageNum{
						width: 25%;
					}
				}
			}
			
		}
	}
</style>