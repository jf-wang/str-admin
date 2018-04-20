<template>
  <div id="messageForm">
    <div class="employeeDetailed">
      <span>员工详细信息</span>
    </div>
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="姓名:" style="margin-bottom:0">
        <span>{{logo.name}}</span>
      </el-form-item>
      <el-form-item label="登录名:" style="margin-bottom:0">
        <span>{{logo.loginName}}</span>
      </el-form-item>
      <el-form-item label="部门:" style="margin-bottom:0">
        <span>{{logo.section}}</span>
      </el-form-item>
      <el-form-item label="职务:" style="margin-bottom:0">
        <span>{{logo.duty}}</span>
      </el-form-item>
      <el-form-item label="照片:" style="margin-bottom:0">
        <img :src="logo.dialogImageUrl" alt="" width="60px" height="60px">
      </el-form-item>
      <el-form-item label="履历:" style="margin-bottom:0">
        <span>{{logo.record}}</span>
      </el-form-item>
      <el-form-item label="身份证号:" style="margin-bottom:0">
        <span>{{logo.IDNumber}}</span>
      </el-form-item>
      <el-form-item label="性别:" style="margin-bottom:0">
        <span>{{logo.gender}}</span>
      </el-form-item>
      <el-form-item label="出生年月:" style="margin-bottom:0">
        <span>{{logo.establishedTime}}</span>
      </el-form-item>
      <el-form-item label="座机:" style="margin-bottom:0">
        <span>{{logo.specialPane}}</span>
      </el-form-item>
      <el-form-item label="手机:" style="margin-bottom:0">
        <span>{{logo.phone}}</span>
      </el-form-item>
      <el-form-item label="Email:" style="margin-bottom:0">
        <span>{{logo.Email}}</span>
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
