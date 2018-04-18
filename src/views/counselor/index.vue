<template>
  <div id="counselor">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>资源</el-breadcrumb-item>
        <el-breadcrumb-item>咨询师</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">

    </div>
  </div>
</template>
<script>
  export default {//咨询师
    name: "counselor",
    data() {
      return {

      }
    },
    created: function () {//实例被创建之后执行代码

    },
    computed: {//计算属性

    },
    components: {//组件的引用

    },
    methods: {//方法

    },
    mounted() {  // 页面进入时加载内容

    },
    watch:{//监测变化

    }
  }

</script>
<style lang="scss" scoped>
  #counselor {
    &>.messageCenter{
      background: white;
      min-height: 820px;
      margin: 20px;
    }
  }

</style>
