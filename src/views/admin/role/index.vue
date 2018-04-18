<template>
  <div id="role">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <div class="search-form">
        <!--搜索栏-->
        <el-form :model="listQuery" ref="listQuery" label-position="left" label-width="50px">
          <div class="postInfo-container">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="姓名:" class="postInfo-container-item">
                  <el-input style="width: 95%;" v-model="listQuery.couponName" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
               <el-button type="danger">查询</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "role",
    data() {
      return {
        listQuery:{
          couponName:"",
        }
      };
    },
    created() {

    },
    watch: {},
    mounted() {},
    computed: {

    },
    props: [],
    methods: {

    },
    components: {}
  };

</script>

<style lang="scss" scoped>


</style>
