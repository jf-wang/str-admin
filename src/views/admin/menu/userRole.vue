<template>
   <div id="userRole">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统设定</el-breadcrumb-item>
        <el-breadcrumb-item>角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
454545
    </div>
  </div>
</template>

<script>

export default {
  name: "userRole",
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
  #userRole {
    &>.messageCenter{
      background: white;
      min-height: 820px;
      margin: 20px;
      width: 200px
    }
  }
</style>
