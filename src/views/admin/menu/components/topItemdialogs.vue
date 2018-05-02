<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.topItemdialogs" width="30%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Top Item" prop="itemKey">
        <el-input v-model="setKeyruleForm.itemKey" size="small" placeholder="请输入et Key"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="setKeyruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="说明" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入说明内容" v-model="setKeyruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click.native="handleClose">取 消</el-button>
      <el-button type="info" v-if="genre==1" @click.native="resetForm('setKeyruleForm')">清 空</el-button>
      <el-button type="info" v-if="genre==2" @click.native="replacement('setKeyruleForm')">重 置</el-button>
      <el-button type="danger" @click.native="setKeysubmitForm('setKeyruleForm')">确 定</el-button>
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
    created() {},
    methods: {
      handleClose() {
        this.visible.topItemdialogs = false
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeysubmitForm(formName) {
        if (this.setKeyTitle == "游览:TopItem") { //如果是游览，点击确定的时候直接关闭模态框
          this.visible.topItemdialogs = false
          this.$refs['setKeyruleForm'].resetFields();
        } else { //不是的话进行表单验证
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm = Object.assign({}, this.setKeyruleForm)
              if (this.setKeyTitle == "新增:TopItem") { //如果是新增的表单
               this.ruleForm.itemSetKey=this.teBddItemSetId
               te.crud.do('sysAdmin_bdd_createTopItem', this.ruleForm, data => {
                  this.$message.success(data.__msg)
                  this.visible.topItemdialogs = false; //模态框消失
                  this.$refs['setKeyruleForm'].resetFields(); //清空表单
                  this.$emit('successCBK'); //调取父组件重新获取列表
                }, err => {
                  this.$message.warning(err.__msg)
                })
              } else { //如果是修改的表单
                te.crud.do('sysAdmin_bdd_updateTopItem', this.ruleForm, data => {
                  this.$message.success(data.__brief)
                  this.visible.topItemdialogs = false; //模态框消失
                  this.$refs['setKeyruleForm'].resetFields(); //清空表单
                  this.$emit('successCBK'); //调取父组件重新获取列表
                }, err => {
                  this.$message.warning(err.__msg)
                })
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       replacement(formName) { //重置
        this.setKeyruleForm.itemKey = this.topItembackupsruleForm.itemKey;
        this.setKeyruleForm.title = this.topItembackupsruleForm.title;
        this.setKeyruleForm.remark = this.topItembackupsruleForm.remark;
      },
    }
  }

</script>
