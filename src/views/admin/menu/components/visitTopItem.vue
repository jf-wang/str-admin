<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.visitTopItem" width="30%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="100px" class="demo-ruleForm form">
      <el-form-item label="Top Item :" prop="itemKey">
        <span>{{setKeyruleForm.itemKey}}</span>
      </el-form-item>
      <el-form-item label="标题 :" prop="title">
        <span>{{setKeyruleForm.title}}</span>
      </el-form-item>
      <el-form-item label="说明 :" style="margin-top:20px">
        <span>{{setKeyruleForm.description}}</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click.native="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['setKeyTitle','setKeyruleForm', 'visible','genre','teBddItemSetId','backupsruleForm','topItembackupsruleForm'],
    data() {
        const setKey = (rule, value, callback) => {
        const zz =/^[a-zA-Z0-9_-]+$/
        if (!value) {
          callback(new Error('请输入Set Key'));
        } else if (!zz.test(value)) {
          callback(new Error('只能输入数字大小写字母'));
        } else {
          callback();
        }
      };
      return {
        setKeyrules: {
          itemKey: [{required: true,trigger: 'blur',validator: setKey}],
          title: [{required: true,message: '请输入标题',trigger: 'blur'}]
        },
        ruleForm:{}
      }
    },
    created() {
    },
    methods: {
      handleClose() {
        this.visible.visitTopItem = false
      },
    }
  }

</script>
<style lang="scss" scoped>
.form{
    span{
     display: block;
      border-bottom: 1px solid #dddddd;
       height: 35px;
    }
  }

</style>
