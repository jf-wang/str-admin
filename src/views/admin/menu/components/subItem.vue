<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.subItemdialog" width="40%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="SubItem Key" prop="key">
        <el-input v-model="setKeyruleForm.key" size="small" placeholder="请输入SubItem Key"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="setKeyruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述内容" v-model="setKeyruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="附属值1" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值1内容" v-model="setKeyruleForm.v1"></el-input>
      </el-form-item>
      <el-form-item label="附属值2" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值2内容" v-model="setKeyruleForm.v2"></el-input>
      </el-form-item>
      <el-form-item label="附属值3" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值3内容" v-model="setKeyruleForm.v3"></el-input>
      </el-form-item>
      <el-form-item label="附属值4" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值4内容" v-model="setKeyruleForm.v4"></el-input>
      </el-form-item>
      <el-form-item label="附属值5" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值5内容" v-model="setKeyruleForm.v5"></el-input>
      </el-form-item>
      <el-form-item label="附属值6" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值6内容" v-model="setKeyruleForm.v6"></el-input>
      </el-form-item>
      <el-form-item label="附属值7" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值7内容" v-model="setKeyruleForm.v7"></el-input>
      </el-form-item>
      <el-form-item label="附属值8" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值8内容" v-model="setKeyruleForm.v8"></el-input>
      </el-form-item>
      <el-form-item label="附属值9" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值9内容" v-model="setKeyruleForm.v9"></el-input>
      </el-form-item>
      <el-form-item label="附属值10" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值10内容" v-model="setKeyruleForm.v10"></el-input>
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
    props: ['setKeyTitle', 'setKeyruleForm', 'visible', 'genre', 'TopItemPath', 'SubItembackupsruleForm'],
    data() {
      const setKey = (rule, value, callback) => {
        const zz =/^[a-zA-Z0-9_-]+$/
        if (!value) {
          callback(new Error('请输入Set Key'));
        } else if (!zz.test(value)) {
          callback(new Error('只能输入数字大小写字母'));
        } else if (value.length>300) {
          callback(new Error('限制在1-300字符之间'));
        }  else {
          callback();
        }
      };
      return {
        setKeyrules: {
          // key: [{required: true,validator: setKey,trigger: 'blur'}],
          // title: [{required: true,message: '请输入标题',trigger: 'blur'}]
        },
        ruleForm: {}
      }
    },
    created() {},
    methods: {
      handleClose() {
        this.visible.subItemdialog = false
        this.$refs['setKeyruleForm'].resetFields();

      },
      setKeysubmitForm(formName) {
        if (this.setKeyTitle == "游览:ItemSet") { //如果是游览，点击确定的时候直接关闭模态框
          this.visible.subItemdialog = false
          this.$refs['setKeyruleForm'].resetFields();
        } else { //不是的话进行表单验证
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.path = this.setKeyruleForm.path
              this.ruleForm.title = this.setKeyruleForm.title
              this.ruleForm.description = this.setKeyruleForm.description
              this.ruleForm.subItemKey = this.setKeyruleForm.key
              this.ruleForm.value1 = this.setKeyruleForm.v1
              this.ruleForm.value2 = this.setKeyruleForm.v2
              this.ruleForm.value3 = this.setKeyruleForm.v3
              this.ruleForm.value4 = this.setKeyruleForm.v4
              this.ruleForm.value5 = this.setKeyruleForm.v5
              this.ruleForm.value6 = this.setKeyruleForm.v6
              this.ruleForm.value7 = this.setKeyruleForm.v7
              this.ruleForm.value8 = this.setKeyruleForm.v8
              this.ruleForm.value9 = this.setKeyruleForm.v9
              this.ruleForm.value10 = this.setKeyruleForm.v10
              te.crud.do('sysAdmin_bdd_updateSubItem', this.ruleForm, data => {
                this.$message.success(data.__brief)
                this.visible.subItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
              }, err => {
                this.$message.warning(err.__msg)
              })
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
        this.setKeyruleForm.key = this.SubItembackupsruleForm.key;
        this.setKeyruleForm.title = this.SubItembackupsruleForm.title;
        this.setKeyruleForm.description = this.SubItembackupsruleForm.description;
        this.setKeyruleForm.v1 = this.SubItembackupsruleForm.v1;
        this.setKeyruleForm.v2 = this.SubItembackupsruleForm.v2;
        this.setKeyruleForm.v3 = this.SubItembackupsruleForm.v3;
        this.setKeyruleForm.v4 = this.SubItembackupsruleForm.v4;
        this.setKeyruleForm.v5 = this.SubItembackupsruleForm.v5;
        this.setKeyruleForm.v6 = this.SubItembackupsruleForm.v6;
        this.setKeyruleForm.v7 = this.SubItembackupsruleForm.v7;
        this.setKeyruleForm.v8 = this.SubItembackupsruleForm.v8;
        this.setKeyruleForm.v9 = this.SubItembackupsruleForm.v9;
        this.setKeyruleForm.v10 = this.SubItembackupsruleForm.v10;
      },
    }
  }

</script>
