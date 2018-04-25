<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.subItemdialog" width="40%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="SubItem Key" prop="subItemkey">
        <el-input v-model="setKeyruleForm.subItemkey" size="small" placeholder="请输入SubItem Key"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="setKeyruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述内容" v-model="setKeyruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="附属值1" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值1内容" v-model="setKeyruleForm.anicount1"></el-input>
      </el-form-item>
      <el-form-item label="附属值2" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值2内容" v-model="setKeyruleForm.anicount2"></el-input>
      </el-form-item>
      <el-form-item label="附属值3" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值3内容" v-model="setKeyruleForm.anicount3"></el-input>
      </el-form-item>
      <el-form-item label="附属值4" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值4内容" v-model="setKeyruleForm.anicount4"></el-input>
      </el-form-item>
      <el-form-item label="附属值5" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值5内容" v-model="setKeyruleForm.anicount5"></el-input>
      </el-form-item>
      <el-form-item label="附属值6" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值6内容" v-model="setKeyruleForm.anicount6"></el-input>
      </el-form-item>
      <el-form-item label="附属值7" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值7内容" v-model="setKeyruleForm.anicount7"></el-input>
      </el-form-item>
      <el-form-item label="附属值8" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值8内容" v-model="setKeyruleForm.anicount8"></el-input>
      </el-form-item>
      <el-form-item label="附属值9" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值9内容" v-model="setKeyruleForm.anicount9"></el-input>
      </el-form-item>
      <el-form-item label="附属值10" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入附属值10内容" v-model="setKeyruleForm.anicount10"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click.native="handleClose">取 消</el-button>
      <el-button type="info" @click.native="resetForm('setKeyruleForm')">清 空</el-button>
      <el-button type="danger" @click.native="setKeysubmitForm('setKeyruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['setKeyTitle', 'setKeyruleForm', 'visible'],
    data() {
      return {
        setKeyrules: {
          subItemkey: [{required: true,message: '请输入SubItem Key',trigger: 'blur'}],
          title: [{required: true,message: '请输入标题',trigger: 'blur'}]
        }
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
              if (this.setKeyTitle == "新增:顶层SubItem") { //如果是新增的表单
                console.log("新增:顶层SubItem")
                this.visible.subItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
              } else if(this.setKeyTitle == "修改:SubItem") { //如果是修改的表单
                console.log("修改:SubItem")
                this.visible.subItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
              }else if(this.setKeyTitle == "新增：同级SubItem") { //如果是修改的表单
                console.log("新增：同级SubItem")
                this.visible.subItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
              }else { //如果是修改的表单
                console.log("新增：子级SubItem")
                this.visible.subItemdialog = false; //模态框消失
                this.$refs['setKeyruleForm'].resetFields(); //清空表单
                this.$emit('successCBK'); //调取父组件重新获取列表
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
      }
    }
  }

</script>
