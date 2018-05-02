<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.addSubItemdialog" width="40%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="SubItem Key" prop="subItemKey">
        <el-input v-model="setKeyruleForm.subItemKey" size="small" placeholder="请输入SubItem Key"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="setKeyruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top:20px" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述内容" v-model="setKeyruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="附属值1" style="margin-top:20px" prop="value1">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值1内容" v-model="setKeyruleForm.value1"></el-input>
      </el-form-item>
      <el-form-item label="附属值2" style="margin-top:20px" prop="value2">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值2内容" v-model="setKeyruleForm.value2"></el-input>
      </el-form-item>
      <el-form-item label="附属值3" style="margin-top:20px" prop="value3">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值3内容" v-model="setKeyruleForm.value3"></el-input>
      </el-form-item>
      <el-form-item label="附属值4" style="margin-top:20px" prop="value4">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值4内容" v-model="setKeyruleForm.value4"></el-input>
      </el-form-item>
      <el-form-item label="附属值5" style="margin-top:20px" prop="value5">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值5内容" v-model="setKeyruleForm.value5"></el-input>
      </el-form-item>
      <el-form-item label="附属值6" style="margin-top:20px" prop="value6">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值6内容" v-model="setKeyruleForm.value6"></el-input>
      </el-form-item>
      <el-form-item label="附属值7" style="margin-top:20px" prop="value7">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值7内容" v-model="setKeyruleForm.value7"></el-input>
      </el-form-item>
      <el-form-item label="附属值8" style="margin-top:20px" prop="value8">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值8内容" v-model="setKeyruleForm.value8"></el-input>
      </el-form-item>
      <el-form-item label="附属值9" style="margin-top:20px" prop="value9">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值9内容" v-model="setKeyruleForm.value9"></el-input>
      </el-form-item>
      <el-form-item label="附属值10" style="margin-top:20px" prop="value10">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值10内容" v-model="setKeyruleForm.value10"></el-input>
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
    props: ['setKeyTitle', 'setKeyruleForm', 'visible', 'genre', 'TopItemPath', 'targetPath'],
    data() {
      const setKey = (rule, value, callback) => {
        const zz = /^[a-zA-Z\d]+$/
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
          subItemKey: [{required: true,validator: setKey,trigger: 'blur'}],
          title: [{required: true,message: '请输入标题',trigger: 'blur'}]
        },
        ruleForm: {}
      }
    },
    created() {},
    methods: {
      handleClose() {
        this.visible.addSubItemdialog = false
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeysubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm = Object.assign({}, this.setKeyruleForm)
            if (this.setKeyTitle == "新增:顶层SubItem") {
              this.ruleForm.targetPath = this.TopItemPath;
              this.ruleForm.position = te.bdd.constants.POSITION_UNDER;
              te.crud.do('sysAdmin_bdd_createSubItem', this.ruleForm, data => {
                this.visible.addSubItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
                this.$message.success(data.__msg)
              }, err => {
                this.$message.warning(err.__msg)
              })
            } else if (this.setKeyTitle == "新增：同级SubItem") { //如果是修改的表单
              this.ruleForm.targetPath = this.targetPath;
              this.ruleForm.position = te.bdd.constants.POSITION_BROTHER;
              te.crud.do('sysAdmin_bdd_createSubItem', this.ruleForm, data => {
                this.visible.addSubItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
                this.$message.success(data.__msg)
              }, err => {
                this.$message.warning(err.__msg)
              })
            } else if (this.setKeyTitle == "新增：子级SubItem") { //如果是修改的表单
              this.ruleForm.targetPath = this.targetPath;
              this.ruleForm.position = te.bdd.constants.POSITION_UNDER;
              te.crud.do('sysAdmin_bdd_createSubItem', this.ruleForm, data => {
                this.visible.addSubItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
                this.$message.success(data.__msg)
              }, err => {
                this.$message.warning(err.__msg)
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
