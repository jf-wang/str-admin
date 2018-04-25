<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.setKeydialog" width="30%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Set Key" prop="setkey">
        <el-input v-model="setKeyruleForm.setkey" size="small" placeholder="请输入et Key"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="setKeyruleForm.state" placeholder="请选择状态" size="small">
          <el-option label="正常" value="1"></el-option>
          <el-option label="暂停使用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缓存类型" prop="cache">
        <el-select v-model="setKeyruleForm.cache" placeholder="请选择缓存类型" size="small">
          <el-option label="常住缓存" value="1"></el-option>
          <el-option label="按需加载" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="setKeyruleForm.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注内容" v-model="setKeyruleForm.remark"></el-input>
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
    props: ['setKeyTitle','setKeyruleForm', 'visible'],
    data() {
      return {
        setKeyrules: {
          setkey: [{required: true,message: '请输入Set Key',trigger: 'blur'}],
          state: [{required: true,message: '请选择状态',trigger: 'change'}],
          cache: [{required: true,message: '请选择缓存类型',trigger: 'change'}],
          title: [{required: true,message: '请输入标题',trigger: 'blur'}]
        }
      }
    },
    created() {},
    methods: {
      handleClose() {
        this.visible.setKeydialog = false
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeysubmitForm(formName) {
        if (this.setKeyTitle == "游览:ItemSet") { //如果是游览，点击确定的时候直接关闭模态框
          this.visible.setKeydialog = false
          this.$refs['setKeyruleForm'].resetFields();
        } else { //不是的话进行表单验证
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.setKeyTitle == "新增:ItemSet") { //如果是新增的表单
                console.log("新增:ItemSet")
                this.visible.setKeydialog = false;//模态框消失
                this.$refs['setKeyruleForm'].resetFields();//清空表单
                this.$emit('successCBK');//调取父组件重新获取列表
              } else { //如果是修改的表单
                console.log("修改:ItemSet")
                this.visible.setKeydialog = false;//模态框消失
                this.$refs['setKeyruleForm'].resetFields();//清空表单
                this.$emit('successCBK');//调取父组件重新获取列表
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
