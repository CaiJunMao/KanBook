<template>
	<div class="top">
		<i class="el-icon-back back" @click="$router.go(-1)"></i>
		<!--<button @click="$router.go(-1)">返回</button>-->
		<span>{{name}}</span>
		<i class="el-icon-search seach" @click="$router.push({path:'/search'})"></i>
	</div>
	
	
   
  
</template>
<script>
	
export default {
  name: "TopBar",
  props:['name'],
  created(){
	console.log(this.name)
  }
};
</script>
<style lang="less" scoped>
.top{
	width: 100%;
	/*min-height: 50px;*/
	height: 8%;
	background-color: #409EFF;
	color: white;
	padding: 0;
	display:flex;
	justify-content: center;
	align-items:center;
	i.back{
		position: absolute;
		left: 0;
		margin-left:10px ;
		font-size: 25px;
	}
	i.seach{
		position: absolute;
		right: 0;
		margin-right:10px ;
		font-size: 25px;
	}
	span{
		display: inline-block;
		font-size: 25px;
	}
}
.clear{
	height: 50px;
}

</style>
