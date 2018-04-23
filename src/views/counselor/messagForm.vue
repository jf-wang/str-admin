<template>
  <div id="messageForm">
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="姓名:" style="margin-bottom:0">
        <span>{{logo.name}}</span>
      </el-form-item>
      <el-form-item label="状态:" style="margin-bottom:0">
        <span v-if="logo.options==1">正常</span>
        <span v-if="logo.options==12">已离职</span>
      </el-form-item>
      <el-form-item label="登录名:" style="margin-bottom:0">
        <span>{{logo.loginName}}</span>
      </el-form-item>
      <el-form-item label="照片:" style="margin-bottom:0">
        <img :src="logo.dialogImageUrl" alt="" width="60px" height="60px">
      </el-form-item>
      <el-form-item label="履历:" style="margin-bottom:0">
        <span>{{logo.record}}</span>
      </el-form-item>
      <el-form-item label="典型案例:" style="margin-bottom:0">
        <span>{{logo.classicCase}}</span>
      </el-form-item>
       <el-form-item label="专兼职:" style="margin-bottom:0">
        <span v-if="logo.section==1">专职</span>
        <span v-if="logo.section==2">兼职</span>
      </el-form-item>
       <el-form-item label="性别:" style="margin-bottom:0">
        <span>{{logo.gender}}</span>
      </el-form-item>
       <el-form-item label="出生年月:" style="margin-bottom:0">
        <span>{{logo.establishedTime}}</span>
      </el-form-item>
      <el-form-item label="身份证号:" style="margin-bottom:0">
        <span>{{logo.IDNumber}}</span>
      </el-form-item>     
      <el-form-item label="座机:" style="margin-bottom:0">
        <span>{{logo.specialPane}}</span>
      </el-form-item>
      <el-form-item label="手机:" style="margin-bottom:0">
        <span>{{logo.phone}}</span>
      </el-form-item>
      <el-form-item label="籍贯:" style="margin-bottom:0">
        <span>{{logo.nativePlace}}</span>
      </el-form-item>
       <el-form-item label="兴趣爱好:" style="margin-bottom:0">
        <span>{{logo.interests}}</span>
      </el-form-item>
       <el-form-item label="性格特征:" style="margin-bottom:0">
        <span>{{logo.character}}</span>
      </el-form-item>
      <el-form-item label="备注:" style="margin-bottom:0">
        <span>{{logo.remark}}</span>
      </el-form-item>
      <el-form-item label="默认模块:" style="margin-bottom:0">
        <span>{{logo.default}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "messageForm",
    data() {
      return {
       
      };
    },
    created() {},
    mounted() {},
    computed: {
      
    },
    props: [
      'logo'
    ],
    methods: {

    },
    components: {}
  };

</script>

<style lang="scss" scoped>
.form{
    span{
     display: block;
      border-bottom: 1px solid #dddddd;
       height: 40px;
    }
  }

</style>
