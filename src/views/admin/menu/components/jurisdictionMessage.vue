<template>
  <div id="jurisdictionMessage">
    <div class="employeeDetailed">
      <span>权限点详情</span>
    </div>
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="权限类别:" style="margin-bottom:0">
        <span>TE:urm_authority_type/{{logo.auTypeDdb}}</span>
      </el-form-item>
      <el-form-item label="局部Key:" style="margin-bottom:0">
        <span>{{logo.auKey}}</span>
      </el-form-item>
      <el-form-item label="全局Key:" style="margin-bottom:0">
        <span>{{logo.auTypeDdb}}/{{logo.auKey}}</span>
      </el-form-item>
      <el-form-item label="权限名:" style="margin-bottom:0">
        <span>{{logo.auName}}</span>
      </el-form-item>
       <el-form-item label="说明:" style="margin-bottom:0">
        <span>{{logo.auDesc}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "jurisdictionMessage",
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
