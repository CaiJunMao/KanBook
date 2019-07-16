<template>
	<div >
		<ul class="bookList" >
	   		<li class="book" v-for="book in bookList">
		   		<div class="info">
		   			<img class="cover" :src="imgUrl(book.cover)" @click="$router.push({name:'bookDetail', params:{bid:book._id}})"/>
			   		<div class="detail">
			   			<p>书名：{{book.title}}</p>
			   			<p>作者：{{book.author}}</p>
			   			<p>简介：{{book.shortIntro |short}}</p>
			   			
			   		</div>
		   		</div>
		   		
		   		<div class="lastChapter" v-if="book.lastChapter">
		   			<p>最新一章：{{book.lastChapter}}</p>
		   		</div>
		   	</li>
   	</ul>
	</div>
   
  
</template>
<script>
	
export default {
  name: "BookList",
  props:['bookList'],
  filters:{
  	//文字过滤器，超过50字省略为...
  	short(str){
      if (str.length > 30) {
        return str.slice(0,30) + '...'
      }
      return str
    
  	},
  },
  methods:{
  	//图片路径
  	imgUrl(cover){
  		return 'http://statics.zhuishushenqi.com'+cover
  	},
  	
  },
};
</script>
<style lang="less" scoped>
.bookList{
	padding: 0 3%;
	margin: 0;
	p{
		margin: 0;
		padding: 0;
	}
	.book{
		list-style: none;
		margin-bottom: 10px;
		.info{
			overflow:hidden;
			height:100px;
			.cover{
				font-size:0;
				width: 20%;
				height: 100%;
				max-width: 80px;
				float: left;
			}
			.detail{
				width:79%;
				float: right;
				height: 100%;
			}
		}
		
	}
}

</style>
