<template>
  <div id="userRoleMessag">
    <el-form :model="logo" label-width="100px" ref="logo" class="form">
      <el-form-item label="角色类别:" style="margin-bottom:0">
        <span>{{logo.name}}</span>
      </el-form-item>
     
      <el-form-item label="局部Key:" style="margin-bottom:0">
        <span>{{logo.specialPane}}</span>
      </el-form-item>
      <el-form-item label="角色名:" style="margin-bottom:0">
        <span>{{logo.phone}}</span>
      </el-form-item>
      <el-form-item label="说明:" style="margin-bottom:0">
        <span>{{logo.remark}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "userRoleMessag",
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
