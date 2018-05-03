<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.topItemdialogs" width="30%"  @close="cancel('topItembackupsruleForm')">
    <el-form :model="topItembackupsruleForm" :rules="setKeyrules" ref="topItembackupsruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Top Item" prop="itemKey">
        <el-input v-model="topItembackupsruleForm.itemKey" size="small" placeholder="请输入Top Item"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="topItembackupsruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="说明" style="margin-top:20px" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入说明内容" v-model="topItembackupsruleForm.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click.native="handleClose">取 消</el-button>
      <el-button type="info" v-if="genre==1" @click.native="resetForm('topItembackupsruleForm')">清 空</el-button>
      <el-button type="info" v-if="genre==2" @click.native="replacement('topItembackupsruleForm')">重 置</el-button>
      <el-button type="danger" @click.native="setKeysubmitForm('topItembackupsruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['setKeyTitle','topItembackupsruleForm', 'visible','genre','teBddItemSetId','backupsruleForm','topItembackupsruleForm'],
    data() {
        const setKey = (rule, value, callback) => {
        const zz =/^[a-zA-Z0-9_-]+$/
        if (!value) {
          callback(new Error('请输入Top Item'));
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
        this.visible.topItemdialogs = false
        this.$refs['topItembackupsruleForm'].resetFields();
      },
      setKeysubmitForm(formName) {
        if (this.setKeyTitle == "游览:TopItem") { //如果是游览，点击确定的时候直接关闭模态框
          this.visible.topItemdialogs = false
          this.$refs['topItembackupsruleForm'].resetFields();
        } else { //不是的话进行表单验证
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm = Object.assign({}, this.topItembackupsruleForm)
              if (this.setKeyTitle == "新增:TopItem") { //如果是新增的表单
               this.ruleForm.itemSetKey=this.teBddItemSetId
               te.crud.do('sysAdmin_bdd_createTopItem', this.ruleForm, data => {
                  this.$message.success(data.__msg)
                  this.visible.topItemdialogs = false; //模态框消失
                  this.$refs['topItembackupsruleForm'].resetFields(); //清空表单
                  this.$emit('successCBK'); //调取父组件重新获取列表
                }, err => {
                  this.$message.warning(err.__msg)
                })
              } else { //如果是修改的表单
                te.crud.do('sysAdmin_bdd_updateTopItem', this.ruleForm, data => {
                  this.$message.success(data.__brief)
                  this.visible.topItemdialogs = false; //模态框消失
                  this.$refs['topItembackupsruleForm'].resetFields(); //清空表单
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
      cancel(formName) { //取消
        this.$refs[formName].resetFields();
        this.$nextTick(function () {
          this.visible.topItemdialogs = false; //模态框显示
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       replacement(formName) { //重置
        this.topItembackupsruleForm.itemKey = this.topItembackupsruleForm.itemKey;
        this.topItembackupsruleForm.title = this.topItembackupsruleForm.title;
        this.topItembackupsruleForm.remark = this.topItembackupsruleForm.remark;
      },
    }
  }

</script>
