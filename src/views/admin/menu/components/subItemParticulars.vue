<template>
  <div id="messageForm">
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="path:" style="margin-bottom:0">
        <span>{{logo.label}}</span>
      </el-form-item>
      <el-form-item label="Source Key:" style="margin-bottom:0">
        <span>{{logo.loginName}}</span>
      </el-form-item>
      <el-form-item label="SubItem Key:" style="margin-bottom:0">
        <span>{{logo.section}}</span>
      </el-form-item>
      <el-form-item label="Title Path:" style="margin-bottom:0">
        <span>{{logo.duty}}</span>
      </el-form-item>
      <el-form-item label="标题:" style="margin-bottom:0">
         <span>{{logo.record}}</span>
      </el-form-item>
      <el-form-item label="描述:" style="margin-bottom:0">
        <span>{{logo.record}}</span>
      </el-form-item>
      <el-form-item label="附加值1:" style="margin-bottom:0">
        <span>{{logo.IDNumber}}</span>
      </el-form-item>
      <el-form-item label="附加值2:" style="margin-bottom:0">
        <span>{{logo.gender}}</span>
      </el-form-item>
      <el-form-item label="附加值3:" style="margin-bottom:0">
        <span>{{logo.establishedTime}}</span>
      </el-form-item>
      <el-form-item label="附加值4:" style="margin-bottom:0">
        <span>{{logo.specialPane}}</span>
      </el-form-item>
      <el-form-item label="附加值5:" style="margin-bottom:0">
        <span>{{logo.phone}}</span>
      </el-form-item>
      <el-form-item label="附加值6:" style="margin-bottom:0">
        <span>{{logo.Email}}</span>
      </el-form-item>
      <el-form-item label="附加值7:" style="margin-bottom:0">
        <span>{{logo.remark}}</span>
      </el-form-item>
      <el-form-item label="附加值8:" style="margin-bottom:0">
        <span>{{logo.default}}</span>
      </el-form-item>
      <el-form-item label="附加值9:" style="margin-bottom:0">
        <span>{{logo.default}}</span>
      </el-form-item>
      <el-form-item label="附加值10:" style="margin-bottom:0">
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
