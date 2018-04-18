<template>
   <div id="user">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">

    </div>
  </div>
</template>

<script>

export default {
  name: "user",
  data() {
    return {
    
    };
  },
  created() {
   
  },
  mounted() {},
  computed: {
   
  },
  props: [],
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
  #user {
    &>.messageCenter{
      background: white;
      min-height: 820px;
      margin: 20px;
    }
  }
</style>
