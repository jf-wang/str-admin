<template>
  <el-dialog :title="setKeyTitle" :visible.sync="visible.visitSetKey" width="30%" :before-close="handleClose">
    <el-form :model="setKeyruleForm" :rules="setKeyrules" ref="setKeyruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="ItemSet Key" prop="setKey">
        <el-input v-model="setKeyruleForm.setKey"  :disabled="true" size="small" placeholder="请输入Ket Key"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="setStatus">
        <el-select v-model="setKeyruleForm.setStatus" :disabled="true" placeholder="请选择状态" size="small">
          <el-option v-for="item in setStatusList"   :key="item.key" :label="item.title" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缓存类型" prop="cacheType">
        <el-select v-model="setKeyruleForm.cacheType" :disabled="true"  placeholder="请选择缓存类型" size="small">
          <el-option v-for="item in cacheTypeList"  :key="item.key" :label="item.title" :value="item.key"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="标题" prop="setTitle">
        <el-input v-model="setKeyruleForm.setTitle"  :disabled="true" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="margin-top:20px">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  :disabled="true" placeholder="请输入备注内容" v-model="setKeyruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click.native="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['setKeyTitle', 'setKeyruleForm', 'visible', 'backupsruleForm', 'genre'],
    data() {
      const setKey = (rule, value, callback) => {
        const zz = /^[a-zA-Z0-9_-]+$/
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
        this.visible.visitSetKey = false
        this.$refs['setKeyruleForm'].resetFields();
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
