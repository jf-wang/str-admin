<template>
  <div id="messageForm">
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="path:" style="margin-bottom:0">
        <span>{{logo.path}}</span>
      </el-form-item>
      <el-form-item label="SubItem Key:" style="margin-bottom:0">
        <span>{{logo.key}}</span>
      </el-form-item>
      <el-form-item label="Title Path:" style="margin-bottom:0">
        <span>{{logo.titlePath}}</span>
      </el-form-item>
      <el-form-item label="标题:" style="margin-bottom:0">
         <span>{{logo.title}}</span>
      </el-form-item>
      <el-form-item label="描述:" style="margin-bottom:0">
        <span>{{logo.desc}}</span>
      </el-form-item>
      <el-form-item label="附加值1:" style="margin-bottom:0">
        <span>{{logo.v1}}</span>
      </el-form-item>
      <el-form-item label="附加值2:" style="margin-bottom:0">
        <span>{{logo.v2}}</span>
      </el-form-item>
      <el-form-item label="附加值3:" style="margin-bottom:0">
        <span>{{logo.v3}}</span>
      </el-form-item>
      <el-form-item label="附加值4:" style="margin-bottom:0">
        <span>{{logo.v4}}</span>
      </el-form-item>
      <el-form-item label="附加值5:" style="margin-bottom:0">
        <span>{{logo.v5}}</span>
      </el-form-item>
      <el-form-item label="附加值6:" style="margin-bottom:0">
        <span>{{logo.v6}}</span>
      </el-form-item>
      <el-form-item label="附加值7:" style="margin-bottom:0">
        <span>{{logo.v7}}</span>
      </el-form-item>
      <el-form-item label="附加值8:" style="margin-bottom:0">
        <span>{{logo.v8}}</span>
      </el-form-item>
      <el-form-item label="附加值9:" style="margin-bottom:0">
        <span>{{logo.v9}}</span>
      </el-form-item>
      <el-form-item label="附加值10:" style="margin-bottom:0">
        <span>{{logo.v10}}</span>
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
