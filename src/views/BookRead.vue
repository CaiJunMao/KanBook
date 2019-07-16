<template>
  <div class="book-read">
	  <!--小说阅读界面-->
	  <div class="read">
	  	<!--顶部，默认隐藏，点击界面出现-->
	  	<div class="top" v-show="showPanel">
				<i class="el-icon-back back" @click="$router.go(-1)"></i>
				<span>{{bookName |short}}</span>
			</div>
		  <!--<div class="top" v-show="showPanel">
		  	<span>返回</span><span>小说名</span>
		  </div>-->
		  <!--章节具体内容,点击时显示头部和顶部-->
		  <div v-if="content" @click="showPanel=!showPanel;hideChapters()" class="content" 
		  	:class="{'font-small': fontSize == 'small',
		  	'font-middle':fontSize == 'middle',
		  	'font-big':fontSize == 'big'}">
		  	<h1>{{content.title}}</h1>
		  	{{content.cpContent}}
		  </div>
		  <div class="bottom" v-show="showPanel">
		  	<div class="bottom-menu">
		  		<!--上一章-->
		  		<el-button size="small" @click="last()"><i class="el-icon-arrow-left "></i></el-button>
		  		<div @click="showList=!showList;">目录</div>
		  		<!--下一章-->
		  		<el-button size="small" ><i class="el-icon-arrow-right " @click="next()"></i></el-button>
		  	</div>
		  	
		  	<div class="bottom-font">
		  		<span>
		  			字体大小
		  		</span>
		  		<el-select v-model="fontSize" @change="changeFont">
						<el-option v-for="(size,key) in sizeType" :key="key" :label="size.label" :value="size.value" >
						</el-option>
					</el-select>
		  	</div>
		  </div>
	  </div>
	  <!--根据书源获取的小说章节(这个需要在左侧展开隐藏)-->
	  <div v-show="showList " class="list">
	  	<div class="top">
	  		<span>目录</span>
	  		<el-tag  color="white" @click="reverseMenu">反序</el-tag>
	  		<!--<el-tag type="warning" color="white" @click="chapters = chapters.reverse()">正序</el-tag>-->
	  		<i class="el-icon-caret-bottom" @click="hideChapters"></i>
	  	</div>
	  	<div class="clear"></div>
	  	<p v-for="(chapter,key) in chaptersCopy" :key="key"  @click="hideChapters();getChaFromMenu($event)">
	  		<span v-if='!isReserve' :bind:currkey='key+1'>{{key+1}}</span>
	  		<span v-else :bind:currkey='chpsNumber - key'>{{chpsNumber - key}}</span>
	  		<!--<span v-else>{{nowNum(key)}}</span>-->
	  		{{chapter.title}}
	  	</p>
	  </div>
	   
	  
	 
  </div>
</template>
<script>
export default {
  name: "BookRead",
  data() {
    return {
    	//小说名，显示在顶部
    	bookName:'',
    	//逆序标志
    	isReserve:false,
    	//章节总数，用于逆序时倒序显示章节序号
    	chpsNumber:0,
    	//正序的序号值
    	chapKey:0,
    	currkey:'',
    	//字体大小标志，分small middle big,默认为middle
    	fontSize:'middle',
    	sizeType:[
    		{label:"小",value:'small'},
    		{label:"中",value:'middle'},
    		{label:"大",value:'big'}
    	],
    	//章节地址，由章节界面传入
    	link:null,
    	content:null,
    	resouceId:null,
    	//初始的全部章节
    	chapters:null,
    	//目录使用的全部章节副本，以免影响正常的前后章使用
    	chaptersCopy:null,
    	//管理界面显示标志
    	showPanel:false,
    	//目录显示标志
    	showList:false,
    	//当前章节号，默认显示第一章
    	currChapNum:1,
    };
  },
  filters:{
  	//文字过滤器，超过50字省略为...
  	short(str){
      if (str.length > 6) {
        return str.slice(0,6) + '...'
      }
      return str
    
  	},
  },
	computed:{
		//计算属性可以传函数
//		nowNum(){
//			return function(val){
//				return this.chpsNumber - val
//			}
//		}
	},
  methods:{
  	getChaFromMenu(e){
  		console.log(e)
  		console.log(e.target.firstElementChild.innerText)
  		let currentKey = e.target.firstElementChild.innerText
  		this.getCurrentChapter(currentKey)
  	},
  	//上一章
  	last(){
  		if(this.currChapNum !=1){
  			this.currChapNum = this.currChapNum-1
  			console.log(this.currChapNum)
  			this.getCurrentChapter(this.currChapNum)
  		}else{
  			alert("已经是第一章了")
  		}
  		
  	},
  	//下一章
  	next(){
  		//超过章节长度，没有下一章
  		if(this.currChapNum < this.chapters.length){
  			this.currChapNum = Number(this.currChapNum)+1
  			console.log(this.currChapNum)
  			this.getCurrentChapter(this.currChapNum)
  		}else{
  			alert("已经是第最后一章了")
  		}
  	},
  	//从缓存的章节列表chapters取对应的章节号的章节link,再去请求章节内容
  	getCurrentChapter(currChapNum){
  		console.log(currChapNum)
  		this.currChapNum = currChapNum
		console.log(this.currChapNum)
  		let link = this.chapters[currChapNum-1].link
  		this.getCapter(link)
  	},
  	//改变字体大小
  	changeFont(){
//		this.
  	},
  	//menu反序,reverse是数组才有的方法，对对象不适用
  	reverseMenu(){
			this.chaptersCopy.reverse();
			this.isReserve = !this.isReserve;
			this.chpsNumber = this.chaptersCopy.length
			console.log(this.currkey)
  	},
  	//点击获取全部章节
  	getChapters(){
  		const api_proxy = 'http://api.kele8.cn/agent/';
  		//获取小说章节，根据书籍源
	    axios
	    	.get(api_proxy+"http://api.zhuishushenqi.com/atoc/"+this.resouceId+"?view=chapters")
	    	.then(res => {
	    			console.log("全部章节");
	           console.log(res);
	           this.chapters = res.data.chapters
	           console.log( this.chapters === res.data.chapters)
	           this.chaptersCopy =this.deepCopy(res.data.chapters)
	           console.log( this.chaptersCopy === this.chapters)
	      })
	      .catch(err => {
	        console.error(err);
	      });
  	},
  	//s数组深拷贝
  	deepCopy(obj){
	    if(typeof obj != 'object'){
	        return obj;
	    }
	    var newobj = [];
	    for ( var index in obj) {
	        newobj[index] = this.deepCopy(obj[index]);
	    }
	    return newobj;
		},
  	//点击返回隐藏目录页
		hideChapters(){
//			console.log(this.showPanel)
			//为真，说明，此时目录显示，点击，让他隐藏
			if(this.showList){
				this.showList = !this.showList;
				//并把管理界面关了
				this.showPanel = !this.showPanel;
			}
		},
  	//获取对应章节
  	getCapter(link){
  		 // //获取章节具体内容，根据link，注意有些书源的章节的link，不能获取章节的具体内容
  		const api_proxy = 'http://api.kele8.cn/agent/';
	  	axios
			.get(api_proxy+"http://chapterup.zhuishushenqi.com/chapter/"+link)
	    .then(res => {
           console.log(res);
        	this.content = res.data.chapter;
        	 console.log(this.content);
      })
      .catch(err => {
        console.error(err);
      });
     }
  },
  created() {
			this.resouceId = this.$route.params.resouceId;
			this.link = this.$route.params.link;
			this.bookName = this.$route.params.bookName;
			this.currChapNum = this.$route.params.chaNum;
			console.log("传进来的章节号："+this.currChapNum)
  	  //显示传进来的章节link内容,显示所要求显示的章节内容
  	  this.getCapter(this.link);
  	  //获取全部章节，以便上一章下一章跳转
  	  this.getChapters();
  },

};
</script>
<style lang="less" scoped="scoped">
.book-read{
	
	height: 1000px;
	.read{
		/*position: absolute;*/
			background-color: lightgoldenrodyellow;
		height: 100%;
		/*overflow: hidden;*/
		.top{
			position: fixed;
			background-color: #409EFF;
			color: white;
			height: 50px;
			width: 100%;
			text-align: center;
			i.back{
				position: absolute;
				left: 0;
				margin-left:10px ;
				height: 50px;
				line-height: 50px;
				font-size: 25px;
			}
			span{
				display: inline-block;
				font-size: 25px;
				height: 50px;
				line-height:50px;
			}
		}
		.content{
			padding:  2% 5%;
			background-color: lightgoldenrodyellow;
			letter-spacing: 2px;
			word-break:break-all;
			/*textarea:*/
			/*行高和字体大小要能改,15 25;20 30 ;25 35*/
			/*font-size: 25px;
			line-height: 35px;*/
			&.font-small{
				font-size: 15px;
				line-height: 25px;
			}
			&.font-middle{
				font-size: 20px;
				line-height: 30px;
			}
			&.font-big{
				font-size: 25px;
				line-height: 35px;
			}
		}
		
		.bottom{
			position: fixed;
			bottom: 0;
			background-color: white;
			height: 50px;
			line-height: 50px;
			width: 100%;
			text-align: center;
			display: flex;
			>div{
				display: inline-block;
				width: 50%;
				
			}
			.bottom-menu{
				/*background-color: bisque;*/
				justify-content: space-around;
				align-items: center;
				div{
					display: inline-block;
					width: 30%;
					height: 100%;
				}
			}
			.bottom-font{
				padding-right: 2%;
				display: flex;
				
			}
		}
	}
	.list{
		height: 100%;
		/*overflow: hidden;*/
		position: fixed;
		background-color: white;
		top: 0;
		z-index: 99;
		width: 70%;
		overflow: scroll;
		
		.top{
			padding: 0 3%;
			position: fixed;
			background-color: cadetblue;
			width: 64%;
			color: white;
			display: flex;
			justify-content: space-between;
			font-size: 25px;
			 align-items: center;
			
		}
		.clear{
				height: 40px;
			}
		p{
			margin: 0;
			padding-left:5% ;
		}
	}
}
	
</style>
