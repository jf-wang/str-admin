<template>
  <div id="userRole">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统设定</el-breadcrumb-item>
        <el-breadcrumb-item>角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <el-row>
        <el-col :span="16">
          <div class="search-form">
            <el-form :model="listQuery" ref="listQuery" label-position="left" label-width="80px">
              <el-form-item style="margin:0 0 0 -60px">
                <el-col :span="6">
                  <el-form-item label="角色类别:">
                    <el-select v-model="listQuery.type" placeholder="请选择角色类别" size="small">
                      <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-form-item>
                    <el-form-item>
                      <el-button type="danger" @click="search">查询</el-button>
                    </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item>
                    <el-button type="text" v-if="condition" @click="changeState">收起
                      <i class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                    <el-button type="text" v-else @click="changeState">展开
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <transition name="el-zoom-in-top">
                <el-form-item style="margin:0 0 0 -60px" v-show="condition==true">
                  <el-col :span="6">
                    <el-form-item label="角色名:">
                      <el-input v-model="listQuery.loginName" size="small" placeholder="请输角色名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="角色Key:">
                      <el-input v-model="listQuery.section" size="small" placeholder="请输角色Key"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </transition>
            </el-form>
            <el-button type="text" icon="el-icon-circle-plus-outline" style="margin:10px 0;color:#409EFF" @click="addNews(dialogForm)">新增</el-button>
            <el-tree :data="SubItemTree" @node-click="nodeClick" node-key="id" default-expand-all :expand-on-click-node="false" draggable>
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" style="color:#e67f05" size="mini" title="修改" icon="el-icon-edit" @click="amend(node, data)"></el-button>
                  <el-button type="text" style="color:#b20000" size="mini" title="删除" icon="el-icon-delete" @click="remove(node, data)"></el-button>
                  <el-button type="text" size="mini" title="分配权限" icon="icon-xinzeng" @click="append(node, data)"></el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-dialog :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" width="42%">
          <el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="dialogForm.name" placeholder="请输入姓名" size="small" style="width:32.7%"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="resetForm('dialogForm')">清 空</el-button>
            <el-button type="danger" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-col :span="8">
          <div class="search_right">
            <userRole-messag :logo="messageForm"></userRole-messag>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getrololists} from '@/api/admin'
  import {name,loginName,select,phone} from '@/views/admin/role/roleFrom'
  import {userRoleMessag} from "./components";
  export default {
    name: "userRole",
    data() {
       const options=[
        {key: '0',label: '全部'},
        {key: '1',label: '系统管理'},
        {key: '2',label: '公司职能'},
        {key: '3',label: '其他'}
        ]
       
      return {
        condition: true, //展开收起状态
        listQuery: {},
        dialogForm: {},
        messageForm: {},
        rules: {
          name: [{required: true,trigger: 'blur',validator: name}],
          loginName: [{required: true,trigger: 'blur',validator: loginName}],
          section: [{required: true,trigger: 'change',validator: select}],
          duty: [{required: true,trigger: 'change',validator: select}]
        },
        options, //状态下拉框数组
        listLoading: false, //表格loading
        tableData: [],
        dialogFormVisible: false,
        SubItemTree: [], //-------------------------------------------------SubItem管理
        dialogFormVisibleTitle: "新增员工", //模态框title
      };
    },
    created() {
      this.getList()
    },
    watch: {},
    mounted() {},
    computed: {

    },
    components: {
      userRoleMessag
    },
    props: [],
    methods: {
      changeState() { //展开收起
        this.condition = !this.condition
      },
      search() { //查询
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 2000);
      },
      nodeClick(node, data) { //行点击
        this.particularsForm = node
      },
      submitForm(formName) { //提交新增表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            if (this.dialogFormVisibleTitle == "新增员工") {
              console.log("新增员工")
            } else {
              console.log("修改员工")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { //清空新增表单
        this.$refs[formName].resetFields();
      },
      addNews(dialogForm) { //点击新增的时候
        this.dialogFormVisible = true;
        this.$refs['dialogForm'].resetFields()
        this.dialogFormVisibleTitle = "新增员工";
      },
    }
  };

</script>

<style lang="scss" scoped>
  .search-form {
    background: white;
    padding: 20px;
    min-height: 820px;
  }

  .search_right {
    min-height: 820px;
    background: white;
    padding: 20px;
    border-left: 10px solid #eeeeee;
  }

  .el-input__inner {
    width: 160px;
    height: 30px;
  }

  .employeeDetailed {
    border-bottom: 1px solid #dddddd;
    color: #363636;
    &>span {
      border-bottom: 2px solid #b20000;
      display: inline-block;
    }
  }

</style>
