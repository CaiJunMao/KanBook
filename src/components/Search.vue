<template>
  <div class="search">
    <input type="text" v-model="searchKeyWord">
    <ul v-if="suggestKeyWords">
      <li v-for="(item, index) in suggestKeyWords" :key="index">{{item}}</li>
    </ul>
    <div v-if="searchMsg !='成功!'">{{searchMsg}}</div>
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
      axios
        .get("https://www.apiopen.top/novelSearchApi", {
          params: {
            name: this.searchKeyWord
          }
        })
        .then(res => {
          // console.log(res.data);
          this.suggestKeyWords = res.data.data;
          this.searchMsg = res.data.msg;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  input {
    background: red;
  }
}
</style>
