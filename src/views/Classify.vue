<template>
  <div class="classify">
    <!--分类界面-->
    <section v-for="(item ,key, index) in bigClassify" :key="index">
    	<!--{{key}}-->
    	<h1>{{bigClassifyType[key]}}</h1>
			<ul>
				<li v-for="(sItem, index) in item" :key="index" @click="$router.push({path:'/classifyDetail',query:{gender:key,major:sItem.name}})">
					<p>{{sItem.name}}</p>
					<span>{{sItem.bookCount}}</span>
				</li>
			</ul>
    </section>
		<!--<ul v-if="bigClassify">
      <li v-for="(item, index) in bigClassify" :key="index">
      	<div v-for="(smallitem, key) in item">
      		{{smallitem.name}}
      	</div>
      </li>
    </ul>-->
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Search from '@/components/Search.vue'
export default {
  name: 'classify',
  components: {
    HelloWorld,
    Search,
  },
  data() {
    return {
      recommends: null,
      bigClassify:null,
      bigClassifyType: {
        male: '男生',
        female: '女生',
        picture:'其他',
        press: '出版'
      }
    };
  },
  created() {
  	const api_proxy = 'http://api.kele8.cn/agent/';
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
<style lang="less">
	ul{
		overflow: hidden;
		li{
			float: left;
			list-style:none;
		}
	}
</style>