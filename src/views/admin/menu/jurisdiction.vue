<template>
  <div id="jurisdiction">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统设定</el-breadcrumb-item>
        <el-breadcrumb-item>权限点管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <el-row>
        <el-col :span="16">
          <div class="search-form">
            <el-form :model="seachFrom" ref="seachFrom" label-position="left" label-width="80px">
              <el-form-item style="margin:0 0 0 -70px">
                <el-col :span="6">
                  <el-form-item label="权限名:">
                    <el-input v-model="seachFrom.auName" size="small" placeholder="请输入权限名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="局部Key:">
                    <el-input v-model="seachFrom.auKey" size="small" placeholder="请输入局部Key"></el-input>
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
                <el-form-item style="margin:0 0 0 -70px" v-show="condition==true">
                  <el-col :span="6">
                    <el-form-item label="权限类别:">
                      <el-cascader change-on-select :props="sectioprops" :options="sectionLists" v-model="seachFrom.auTypeDdb" size="small" style="width:100%"></el-cascader>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </transition>
            </el-form>
            <el-button type="text" icon="el-icon-circle-plus-outline" style="color:#409EFF;float:right;color:#b20000" @click="addNews(dialogForm)">新增</el-button>
            <el-button type="text" icon="el-icon-refresh" style="margin:0 20px;color:#409EFF;float:right" @click="getList">刷新</el-button>
            <div class="treeTltle">
              <div class="item">类别</div>
              <div class="item">局部Key</div>
              <div class="item">权限名</div>
              <div class="item">操作</div>
            </div>
            <el-tree :data="dataTree" ref="SubItemTable" :props="dataTreeprops" :label="dataTree.auName" @node-click="nodeClick" node-key="auKey"
              default-expand-all :expand-on-click-node="false" highlight-current style="margin-top:10px">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="aut">{{ data.auTypeDdb }}</span>
                <span class="aut">{{ data.auKey }}</span>
                <span class="aut">{{ data.auName }}</span>
                <span class="aut">
                  <el-button type="text" style="color:#e67f05" size="mini" title="修改" icon="el-icon-edit" @click="amend(node, data)"></el-button>
                  <el-button type="text" style="color:#b20000" size="mini" title="删除" icon="el-icon-delete" @click="remove(node, data)"></el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-dialog :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" width="42%" @close="cancel('dialogForm')">
          <el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
            <el-form-item label="权限点类别" prop="auTypeDdb">
              <el-cascader change-on-select :props="sectioprops" :options="sectionLists" v-model="dialogForm.auTypeDdb" size="small" style="width:32.7%"></el-cascader>
            </el-form-item>
            <el-form-item label="局部Key" prop="auKey">
              <el-input v-model="dialogForm.auKey" placeholder="请输入局部Key" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="权限名" prop="auName">
              <el-input v-model="dialogForm.auName" placeholder="请输入权限名" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="auDesc">
              <el-input type="textarea" style="margin-top:5px;" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入说明内容" v-model="dialogForm.auDesc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="cancel('dialogForm')">取 消</el-button>
            <el-button type="info" v-if="green==1" @click="resetForm('dialogForm')">清 空</el-button>
            <el-button type="info" v-if="green==2" @click="reset('dialogForm')">重 置</el-button>
            <el-button type="danger" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-col :span="8">
          <div class="search_right">
            <jurisdiction-message :logo="messageForm"></jurisdiction-message>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  import {getrololists} from '@/api/admin'
  import {auKey,auName,select} from '@/views/admin/role/roleFrom'
  import {jurisdictionMessage} from "./components";
  export default {
    name: "jurisdiction",
    data() {
      return {
        condition: true, //展开收起状态
        seachFrom: {}, //所搜对象
        dialogForm: {
          auTypeDdb: [],
          auKey: "",
          auName: "",
          auDesc: ""
        }, //模态框表单
        messageForm: {}, //详细内容对象
        rules: {
          auTypeDdb: [{required: true,trigger: 'change',validator: select}],
          auKey: [{required: true,trigger: 'blur',validator: auKey}],
          auName: [{required: true,trigger: 'blur',validator: auName}],
        },
        dataTree: [], //表格树
        sectionLists: [], //部门下拉框数组
        listLoading: false, //表格loading
        dialogFormVisible: false, //模态框状态
        dialogFormVisibleTitle: "新增:权限点", //模态框title
        dataTreeprops: { //属性转换
          children: 'subItems',
          label: 'auKey'
        },
        sectioprops: {
          children: 'subItems',
          label: 'title',
          value: 'key'
        },
        green: 1,
        standbyFrom: {}, //备用表单重置时候使用
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
      jurisdictionMessage
    },
    props: [],
    methods: {
      changeState() { //展开收起------------------------------ok
        this.condition = !this.condition
      },
      search() { //查询------------------------------------ok
        this.getList()
      },
      nodeClick(node, data) { //行点击-----------------------------ok
        this.messageForm = node;
      },
      getList() { //请求列表数据-----------------------------------ok
        this.listLoading = true;
        const ruleForm = Object.assign({}, this.seachFrom)
        te.crud.querySinglePage("sysAdmin_urm_paginateAuthority", data => { //列表接口
          this.dataTree = data.currentPageData;
        }, ruleForm)
        te.bdd.queryItem('TE:urm_authority_type', data => { //下拉框列表
          this.sectionLists = data.subItems;
        });
      },
      submitForm(formName) { //提交新增表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogFormVisibleTitle == "新增:权限点") {
              console.log("新增:权限点")
            } else {
              console.log("修改:权限点")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      amend(node, data) { //修改权限点
        this.dialogFormVisible = true; //模态框显示
        this.green = 2; //重置按钮显示
        this.dialogFormVisibleTitle = "修改:权限点";
        this.$nextTick(function () {
          this.dialogForm = Object.assign({}, data); //模态框表单
          this.dialogForm.auTypeDdb = this.dialogForm.auTypeDdb.split();
          this.standbyFrom = Object.assign({}, data); //备用表单
          this.standbyFrom.auTypeDdb = this.standbyFrom.auTypeDdb.split();
        });
      },
      remove(node, data) { //删除权限点
        console.log(node, data)
        this.$confirm('此操作将删除员工, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功');
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      addNews(dialogForm) { //点击新增的时候
        this.dialogFormVisibleTitle = "新增:权限点";
        this.dialogFormVisible = true; //模态框显示
        this.green = 1; //清空按钮显示
        this.$refs[dialogForm].resetFields(); //清除表单
      },
      cancel(formName) { //取消
        this.$refs[formName].resetFields();
        this.$nextTick(function () {
          this.dialogFormVisible = false; //模态框显示
        });
      },
      reset(dialogForm) { //重置表单
        this.dialogForm = Object.assign({}, this.standbyFrom)
      },
      resetForm(formName) { //清空新增表单
        this.$refs[formName].resetFields();
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

  .treeTltle {
    // background: red;
    margin-top: 40px;
    overflow: hidden;
    &>.item {
      float: left;
      display: inline-block;
      width: 270px;
      text-align: center;
    }
  }

  .aut:nth-child(1) {
    width: 220px;
  }

  .aut:nth-child(2) {
    width: 300px;
  }

  .aut:nth-child(3) {
    width: 270px;
  }

  .aut:nth-child(4) {
    width: 250px;
  }

  .aut {
    display: inline-block;
    text-align: center;
  }

</style>
