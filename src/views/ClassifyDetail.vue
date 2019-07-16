<template>
  <div class="classifyDetail">
  	<TopBar v-bind:name="major"></TopBar>
		<!--状态分类,change在label改变时触发-->
		<el-radio-group  v-model="checkedType" size="small " text-color="white" fill="#67C23A" @change = "getNovels">
		    <el-radio-button v-for="(item ,key, index) in types" :label="key" :key="index">
		    	{{item}}
		    </el-radio-button>
		</el-radio-group>
    <!--分类的详情页-->
    <!--major是大分类界面中的某一类，详情页正是显示着个major对应的所有小分类mins-->
    <!--在classifyDetail找到这个major的所有mins-->
    
	<!--小类别分类,不一定有，所以加v-if-->
		<el-radio-group v-if="mins.length"  v-model="checkedMin" size="small " text-color="white" fill="#E6A23C" @change = "getNovels"> 
		    <el-radio-button v-for="(item ,key, index) in mins" :label="item" :key="index">
		    	{{item}}
		    </el-radio-button>
		</el-radio-group>
		<!--小说列表，当mins没时，高度要改为83%-->
		 <div :class="{'list':mins.length,'listAll':(mins.length == 0 )}">
		 	
    	<BookList v-bind:bookList="novelList" ></BookList>
    </div>
    
   
    
    <!--切换到这个页面时覆盖底部的bottom-->
  </div>
  
</template>

<script>
// @ is an alias to /src
import TopBar from "../components/TopBar.vue";
import BookList from "../components/BookList.vue";
export default {
  name: 'classifyDetail',
  components: {
    TopBar,
    BookList,
  },
  data() {
    return {
    	//状态分类
    	types:{
    		hot:"热门",
    		new:'新书',
    		reputation:'好评',
    		over:'完结',
    		monthly:'包月',
    	},
    	//选中的状态分类
    	checkedType:"hot",
    	//选中的小类别
    	checkedMin:"",
    	//分页开始页
      start:0,
      //分页条数
      limit: 0,
      
      //根据分类得到的小说列表
      novelList:null,
      //大分类的种类，male,female等
      majorType:null,
      //大分类
      major:null,
      //小分类
      mins:null
    };
  },
  methods:{
  	
  	//g根据选择显示小说
  	getNovels(){
  		console.log("选择为："+this.checkedType+"和"+this.checkedMin)
  		const api_proxy = 'http://api.kele8.cn/agent/';
  		axios
      .get(api_proxy+"https://api.zhuishushenqi.com/book/by-categories",{
          params: {
            gender: this.majorType,
            type:this.checkedType,
            major:this.major,
            minor:this.checkedMin,
            start:0,
            limit:20,}
          })
      .then(res => {
      		console.log("小说列表");
           console.log(res);
        	this.novelList = res.data.books;
      })
      .catch(err => {
        console.error(err);
      });
  	}
  },
  created() {
  	//获取参数
  	this.majorType = this.$route.query.gender;
  	this.major = this.$route.query.major;
  	//获取所有小分类
  	const api_proxy = 'http://api.kele8.cn/agent/';
    axios
      .get("http://api.kele8.cn/agent/http://api.zhuishushenqi.com/cats/lv2")
      .then(res => {
      		console.log("小分类");
          console.log(res);
        	this.classifyList = res.data;
        	console.log(this.classifyList[this.majorType]);
        	var majorList = this.classifyList[this.majorType];
        	//majorList是数组，用for of
        	for (var majorItem of majorList) {
        		console.log(majorItem);
        		//找到male下，对应大分类为玄幻的小分类mins
				  	if(this.major == majorItem.major){
				  		 this.mins= majorItem.mins;
				  		 //默认选中第一个类别
				  		 this.checkedMin = this.mins[0];
				  		 break;
				  	}
					}
      })
      .catch(err => {
        console.error(err);
      });
    //获取小说列表,默认显示热门
    axios
      .get(api_proxy+"https://api.zhuishushenqi.com/book/by-categories",{
          params: {
            gender: this.majorType,
            type:'hot',
            major:this.major,
//          minor:"",可不写
            start:0,
            limit:20,}
          })
      .then(res => {
      		console.log("小说列表");
           console.log(res);
        	this.novelList = res.data.books;
      })
      .catch(err => {
        console.error(err);
      });
  }
};

</script>
<style lang="less" scoped>
	.classifyDetail{
		height:100%;
		.list{
			height: 74%;
			overflow: auto;
			/*padding-top:2% ;*/
			}
		.el-radio-group{
			height: 9%;
			display: flex;
			justify-content: space-around;
		  align-items:center;
			/*padding: 2% 5%;*/
			.el-radio-button{
			/*margin-top: 2% ;*/
			}
		}
		.listAll{
			height: 83%;
			overflow: auto;
		}
	}
	
</style>