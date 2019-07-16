<template>
  <div class="search">
  	<!--//搜索时不要顶部，显示结果要顶部-->
  	
  	<div class="top">
  		
  		<el-input placeholder="请输入关键字" prefix-icon="el-icon-search"
    v-model="searchKeyWord">
  		</el-input>
  		
  	</div>
    
    <ul v-if="suggestKeyWords">
      <li v-for="(item, index) in suggestKeyWords" :key="index" @click="searchNovel(item)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Search",
  
  data() {
    return {
      searchKeyWord: null,
      suggestKeyWords: null,
      searchMsg: null
    };
  },
  watch: {
    searchKeyWord: function(newValue, oldValue) {
      // window.console.log(newValue, oldValue);
      const api_proxy = 'http://api.kele8.cn/agent/';
      //通过关键字，显示可能想查找的小说,点击直接跳转到该小说界面
      axios
        .get(api_proxy+"http://api.zhuishushenqi.com/book/auto-complete", {
          params: {
            query: this.searchKeyWord
          }
        })
        .then(res => {
             console.log(res.data);
          this.suggestKeyWords = res.data.keywords;
        })
        .catch(err => {
          console.error(err);
        });
       
    }
  },
  methods:{
  	searchNovel(name){
  		//跳转到搜索结果界面，再查询
  		this.$router.push({name:'searchResult',params:{key:name}})
  		const api_proxy = 'http://api.kele8.cn/agent/';
  		//下面这个接口是模糊搜索的接口，
//		 axios
//      .get(api_proxy+"http://api.zhuishushenqi.com/book/fuzzy-search?", {
//        params: {
//          query: name
//        }
//      })
//      .then(res => {
//           console.log(res.data);
//      })
//      .catch(err => {
//        console.error(err);
//      });
  	}
  }
};
</script>
<style lang="less" scoped>
.search {
	font-size: 25px;
	div.top{
		background-color:skyblue;
		padding:5px 10px;
		button{
		}
	  input {
	  	font-size: 20px;
	    background: aliceblue;
	    width: 80%;
	    line-height: 40px;
	  }
	}
	ul{
		margin: 0;
		padding: 0 3%;
		li{
			height: 30px;
			line-height: 30px;
			font-size: 15px;
			list-style: none;
			border-bottom: darkgrey dotted 1px;
		}
	}
	
}
</style>
