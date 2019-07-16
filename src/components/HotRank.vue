<template>
  <div class="hotRank">
  	//人气榜
    <div v-if="hot">
    	{{hot.title}}的id{{hot._id}}
    	获取小说列表
    	<div v-for="book in bookList">
    		<div><p>{{book.title}}</p><img :src="imgUrl(book.cover)" style="height: 50px;"/></div>
    	</div>
    </div>
    <p></p>
  </div>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HotRank',
  data() {
    return {
    	rid:null,
  		hot:null,
  		//排行榜小说
			bookList:null,
    };
  },
  methods: {
  	//改变图片路径
  	imgUrl(cover){
  		return 'http://statics.zhuishushenqi.com'+cover
  	},
  },
  created() {
  	//路由传过来的榜单id
  	this.rid = this.$route.params.rid;
  	const api_proxy = 'http://api.kele8.cn/agent/';
    //获取人气排行榜小说
     axios
      .get(api_proxy+"http://api.zhuishushenqi.com/ranking/"+this.rid)
      .then(res => {
           console.log(res);
        this.bookList = res.data.ranking.books;
        
      })
      .catch(err => {
        console.error(err);
      });
  },
}
</script>
<style lang="less">
	.rank{
		div.top{
				float: left;
				&.active{
					color: #e4393c;
				}
		}
	}
</style>