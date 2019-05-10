<template>
  <div class="classifyDetail">
    <!--分类的详情页-->
    <section v-for="(item ,key, index) in classifyDetail" :key="index">
    	{{key}}
			<ul >
				<li v-for="(sItem, index) in item" :key="index" >
					<p>{{sItem.major}}</p>
					<span v-for="(detail, index) in sItem.mins" :key="index" >{{detail[index]}}</span>
				</li>
			</ul>
    </section>
  </div>
  
</template>

<script>
// @ is an alias to /src
export default {
  name: 'classifyDetail',
  components: {
  },
  data() {
    return {
      recommends: null,
      classifyDetail:null,
    };
  },
  created() {
  	const api_proxy = 'http://api.kele8.cn/agent/';
    axios
      .get(api_proxy+"http://api.zhuishushenqi.com/cats/lv2")
      .then(res => {
           console.log(res);
        this.classifyDetail = res.data;
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
			/*float: left;*/
			list-style:none;
		}
	}
</style>