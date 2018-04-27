<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.setKeydialog" width="30%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Set Key" prop="setKey">
        <el-input v-model="setKeyruleForm.setKey" size="small" placeholder="请输入Ket Key"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="setStatus">
        <el-select v-model="setKeyruleForm.setStatus" placeholder="请选择状态" size="small">
          <el-option v-for="item in setStatusList" :key="item.key" :label="item.title" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缓存类型" prop="cacheType">
        <el-select v-model="setKeyruleForm.cacheType" placeholder="请选择缓存类型" size="small">
          <el-option v-for="item in cacheTypeList" :key="item.key" :label="item.title" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="setTitle">
        <el-input v-model="setKeyruleForm.setTitle" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注内容" v-model="setKeyruleForm.remark"></el-input>
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
    props: ['setKeyTitle', 'setKeyruleForm', 'visible', 'backupsruleForm', 'genre'],
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
          setKey: [{required: true,trigger: 'blur',validator: setKey}],
          setStatus: [{required: true,message: '请选择状态',trigger: 'change'}],
          cacheType: [{required: true,message: '请选择缓存类型',trigger: 'change'}],
          setTitle: [{required: true,message: '请输入标题',trigger: 'blur'}]
        },
        setStatusList: [],
        cacheTypeList: [],
        ruleForm: {},
        backupsForm: {}
      }
    },
    created() {
      this.getlist();
    },
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
              this.ruleForm = Object.assign({}, this.setKeyruleForm)
              if (this.setKeyTitle == "新增:ItemSet") { //如果是新增的表单
                te.crud.do('sysAdmin_bdd_createItemSet', this.ruleForm, data => {
                  this.$message.success(data.__msg)
                  this.visible.setKeydialog = false; //模态框消失
                  this.$refs['setKeyruleForm'].resetFields(); //清空表单
                  this.$emit('successCBK'); //调取父组件重新获取列表
                }, err => {
                  this.$message.warning(err.__msg)
                })
              } else { //如果是修改的表单

                te.crud.do('sysAdmin_bdd_updateItemSet', this.ruleForm, data => {
                  this.$message.success(data.__msg)
                  this.visible.setKeydialog = false; //模态框消失
                  this.$refs['setKeyruleForm'].resetFields(); //清空表单
                  this.$emit('successCBK'); //调取父组件重新获取列表
                }, err => {
                  this.$message.warning(err.__msg)
                })
              }
            } else {
              return false;
            }
          });
        }
      },
      resetForm(formName) { //清空
        this.$refs[formName].resetFields();
      },
      replacement(formName) { //重置
        this.setKeyruleForm.setKey = this.backupsruleForm.setKey
        this.setKeyruleForm.setStatus = this.backupsruleForm.setStatus
        this.setKeyruleForm.cacheType = this.backupsruleForm.cacheType
        this.setKeyruleForm.setTitle = this.backupsruleForm.setTitle
        this.setKeyruleForm.remark = this.backupsruleForm.remark
      },
      getlist() {
        te.bdd.loadData('TE:bdd_item_set_status', data => {
          this.setStatusList = data[0].subItems
        });
        te.bdd.loadData('TE:bdd_item_cache_type', data => {
          this.cacheTypeList = data[0].subItems
        });
      },
    }
  }

</script>
