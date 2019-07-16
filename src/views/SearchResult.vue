<template>
  <div class="searchResult">
  	<!--第一个需要需要“开始阅读”和“加入书架”两个按钮，所有的结果都需要标出高亮的关键字-->
  	<TopBar v-bind:name="name"></TopBar>
  	<div class="result">共找到<span>{{bookList.length}}</span>条内容</div>
  	<BookList v-bind:bookList="bookList"></BookList>
  </div>
</template>
<script>
import TopBar from "../components/TopBar.vue";
import BookList from "../components/BookList.vue";
export default {
  name: "searchResult",
  components: {
    TopBar,
    BookList,
  },
  data() {
    return {
    	name:"搜索结果",
      bookList:null,
    };
  },
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
  	searchNovel(){
  		const api_proxy = 'http://api.kele8.cn/agent/';
  		//下面这个接口是模糊搜索的接口，
  		 axios
        .get(api_proxy+"http://api.zhuishushenqi.com/book/fuzzy-search?", {
          params: {
            query: name
          }
        })
        .then(res => {
             console.log(res.data);
             this.bookList = res.data.books
        })
        .catch(err => {
          console.error(err);
        });
  	}
  },
  created(){
  	//接收搜索界面传过来的key，检小说
  	//下面这个接口是模糊搜索的接口，
  	let key = this.$route.params.key;
  	console.log(key)
  	const api_proxy = 'http://api.kele8.cn/agent/';
  		 axios
        .get(api_proxy+"http://api.zhuishushenqi.com/book/fuzzy-search?", {
          params: {
            query: key
          }
        })
        .then(res => {
             console.log(res.data);
              this.bookList = res.data.books
        })
        .catch(err => {
          console.error(err);
        });
         axios
        .get(api_proxy+"https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=Z4m%2F0PDcp2xRd%2FzgOl5CepfH%2Fn9lAja8")
        .then(res => {
             console.log(res.data);
//            this.bookList = res.data.books
        })
        .catch(err => {
          console.error(err);
        });
  }
};
</script>
<style lang="less" scoped>
.searchResult{
	.result{
		height: 30px;
		font-size: 20px;
		line-height: 30px;
		padding:3% 3%;
		span{
			color: orange;
		}
	}
}

</style>
