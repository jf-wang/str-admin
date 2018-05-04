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
            <el-form :model="seachFrom" ref="seachFrom" label-position="left" label-width="80px">
              <el-form-item style="margin:0 0 0 -60px">
                <el-col :span="6">
                  <el-form-item label="角色名:">
                    <el-input v-model="seachFrom.roleName" size="small" placeholder="请输角色名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="局部Key:">
                    <el-input v-model="seachFrom.roleKey" size="small" placeholder="请输局部Key"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-form-item>
                    <el-form-item>
                      <el-button type="danger" @click="seach">查询</el-button>
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
                    <el-form-item label="角色类别:">
                      <el-cascader change-on-select :props="sectioprops" :options="sectionLists" v-model="seachFrom.roleTypeDdb" size="small" style="width:100%"></el-cascader>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </transition>
            </el-form>
            <div style="overflow:hidden">
              <el-button type="text" icon="el-icon-circle-plus-outline" style="margin:10px 0;color:#409EFF;float:right" @click="addNews(dialogForm)">新增</el-button>
            </div>
            <el-row style="margin-left:20px;">
              <el-col :span="6">类别</el-col>
              <el-col :span="6">局部Key</el-col>
              <el-col :span="6">角色名</el-col>
              <el-col :span="6">操作</el-col>
            </el-row>
            <el-tree :data="userRoleTree" :props="dataTreeprops" @node-click="nodeClick" node-key="id" default-expand-all :expand-on-click-node="false"
              draggable>
              <span class="custom-tree-node" slot-scope="{ node, data }" style="display:block;width:100%">
                <el-row style="display:block;width:100%">
                  <el-col :span="6">
                    <span v-for="item in sectionLists" v-if="item.key==data.roleTypeDdb">{{ item.title }}</span>
                  </el-col>
                  <el-col :span="6">{{ data.roleKey }}</el-col>
                  <el-col :span="6">{{ data.roleName }}</el-col>
                  <el-col :span="6">
                    <el-button type="text" style="color:#e67f05" size="mini" title="修改" icon="el-icon-edit" @click="amend(node, data)"></el-button>
                    <el-button type="text" style="color:#b20000" size="mini" title="删除" icon="el-icon-delete" @click="remove(node, data)"></el-button>
                    <el-button type="text" size="mini" title="分配权限" icon="icon-xinzeng" @click="append(node, data)"></el-button>
                  </el-col>
                </el-row>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-dialog :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" width="30%" @close="cancel('dialogForm')">
          <el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
            <el-form-item label="角色类别:" prop="roleTypeDdb">
              <el-cascader change-on-select :props="sectioprops" :options="sectionLists" v-model="dialogForm.roleTypeDdb" size="small"
                style="width:215px"></el-cascader>
            </el-form-item>
            <el-form-item label="局部Key" prop="roleKey">
              <el-input v-model="dialogForm.roleKey" placeholder="请输入局部Key" size="small" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="角色名" prop="roleName">
              <el-input v-model="dialogForm.roleName" placeholder="请输入角色名" size="small" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="roleDesc">
              <el-input v-model="dialogForm.roleDesc" placeholder="请输入说明" size="small" style="width:215px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="cancel('dialogForm')">取 消</el-button>
            <el-button type="info" @click="resetForm('dialogForm')">清 空</el-button>
            <el-button type="danger" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- -------------------------------------------------------------------------------------------------------指定角色- -->
        <el-dialog title="管理角色权限" :visible.sync="dialogRole" width="50%">
          <div style="padding:10px;border:1px solid #eeeeee;margin-bottom:10px;">
            <div class="dialogH">当前角色</div>
            <el-row>
              <el-col :span="8">
                <span>角色类别:</span>
                <span style="display: inline-block;border-bottom: 1px solid #eeeeee;width: 70%;">{{RoleroleTypeDdb}}</span>
              </el-col>
              <el-col :span="8">
                <span>局部Key:</span>
                <span style="display: inline-block;border-bottom: 1px solid #eeeeee;width: 70%;">{{RoleroleKey}}</span>
              </el-col>
              <el-col :span="8">
                <span>角色名:</span>
                <span style="display: inline-block;border-bottom: 1px solid #eeeeee;width: 70%;">{{RoleroleName}}</span>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="8" :offset="2" class="treesss">
              <el-row style="margin-left:20px;">
                <el-col :span="8">类别</el-col>
                <el-col :span="8">局部Key</el-col>
                <el-col :span="8">权限名</el-col>
              </el-row>
              <el-tree :data="transferdata1" :props="transfer" @node-click="nodeClickAdd" node-key="id" default-expand-all :expand-on-click-node="false"
              draggable >
              <span class="custom-tree-node" slot-scope="{ node, data }" style="display:block;width:100%">
                <el-row style="display:block;width:100%">
                  <el-col :span="8">{{ data.auTypeDdb }}</el-col>
                  <el-col :span="8">{{ data.auKey }}</el-col>
                  <el-col :span="8">{{ data.auName }}</el-col>
                </el-row>
              </span>
            </el-tree>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button style="margin-top:120px" @click="allocation">分配<i class="el-icon-arrow-left"></i></el-button>
              <br>
              <el-button style="margin-top:80px">解除<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
            <el-col :span="8"  class="treesss">
               <el-row style="margin-left:20px;">
                <el-col :span="8">类别</el-col>
                <el-col :span="8">局部Key</el-col>
                <el-col :span="8">权限名</el-col>
              </el-row>
              <el-tree :data="transferdata2" :props="transfer" @node-click="nodeClickremoe" node-key="id" default-expand-all :expand-on-click-node="false"
              draggable>
              <span class="custom-tree-node" slot-scope="{ node, data }" style="display:block;width:100%">
                <el-row style="display:block;width:100%">
                  <el-col :span="8">{{ data.auTypeDdb }}</el-col>
                  <el-col :span="8">{{ data.auKey }}</el-col>
                  <el-col :span="8">{{ data.auName }}</el-col>
                </el-row>
              </span>
            </el-tree>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="dialogRole = false">取 消</el-button>
            <el-button type="danger" @click="dialogRole = false">确 定</el-button>
          </span>
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
  import {roleName,select,roleKey} from '@/views/view-component/validationRule'
  import {userRoleMessag} from "./components";
  export default {
    name: "userRole",
    data() {
      return {
        condition: true, //展开收起状态
        seachFrom: {},
        dialogForm: {},
        messageForm: {},
        rules: {
          roleTypeDdb: [{required: true,trigger: 'change',validator: select}],
          roleKey: [{required: true,trigger: 'blur',validator: roleKey}],
          roleName: [{required: true,trigger: 'blur',validator: roleName}],       
        },
        listLoading: false, //表格loading
        tableData: [],
        dialogFormVisible: false,
        userRoleTree: [], //-------------------------------------------------SubItem管理
        dialogFormVisibleTitle: "新增:角色", //模态框title
        sectionLists: [], //部门下拉框数组
        dataTreeprops: { //属性转换
          children: 'subItems',
          label: 'auKey'
        },
        transfer:{
          key:"teAuthorityId",
          label:"auName"
        },
        sectioprops: {
          children: 'subItems',
          label: 'title',
          value: 'key'
        },
        dialogRole: false, //模态框
        transferdata1: [], //未分配角色
        transferdata2: [], //已分配角色
        transferItem: [1, 2], //已有角色
        roleCategory: "",
        RoleroleTypeDdb: "", //模态框角色类别
        RoleroleKey: "", //模态框局部Key
        RoleroleName: "" //模态框角色名
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
      getList() { //请求列表接口
        te.crud.querySinglePage("sysAdmin_urm_paginateRole", data => {
          this.userRoleTree = data.currentPageData;
        })
        te.bdd.queryItem('TE:urm_role_type', data => { //下拉框列表
          this.sectionLists = data.subItems;
        });
      },
      seach() { //搜索------------------------------ok
        const ruleForm = Object.assign({}, this.seachFrom)
        ruleForm.roleTypeDdb = ruleForm.roleTypeDdb[0];
        te.crud.querySinglePage("sysAdmin_urm_paginateRole", data => {
          this.userRoleTree = data.currentPageData;
        }, ruleForm)
      },
      changeState() { //展开收起------------------------ok
        this.condition = !this.condition
      },
      nodeClick(node, data) { //行点击-----------------ok
        this.messageForm = node
      },
      submitForm(formName) { //提交新增表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const ruleForm = Object.assign({}, this.dialogForm)
            if (this.dialogFormVisibleTitle == "新增:角色") { //-----------新增
              te.crud.do("sysAdmin_urm_createRole", ruleForm, data => {
                this.dialogFormVisible = false;
                this.$message.success(data.__msg);
                this.getList();  
              }, err => {
                this.$message.warning(err.__msg)
              })
            } else { //---------------------------修改
              te.crud.do("sysAdmin_urm_updateRole", ruleForm, data => {
                this.dialogFormVisible = false;
                this.$message.success(data.__msg);
                this.getList();
              }, err => {
                this.$message.warning(err.__msg)
              })
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) { //清空新增表单
        this.$refs[formName].resetFields();
      },
      addNews(dialogForm) { //点击新增的时候-------ok
        this.dialogFormVisible = true;
        this.$refs['dialogForm'].resetFields()
        this.dialogFormVisibleTitle = "新增:角色";
      },
      cancel(formName) { //取消
        this.$refs[formName].resetFields();
        this.$nextTick(function () {
          this.dialogFormVisible = false; //模态框显示
        });
      },
      amend(node, data) { //点击编辑的时候------------------ok
        this.dialogFormVisibleTitle = "修改:角色";
        this.dialogFormVisible = true;
        this.$nextTick(function () {
          this.dialogForm = Object.assign({}, data);
          this.dialogForm.roleTypeDdb = this.dialogForm.roleTypeDdb.split();
        });
      },
      remove(node, data) { //点击删除的时候---------------ok
        console.log(data)
        this.$confirm('此操作将删除此角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          te.crud.do('sysAdmin_urm_deleteRole', {
            teRoleId: data.teRoleId
          }, data => {
            this.$message.success(data.__msg);
            this.getList();
          }, err => {
            this.$message.warning(err.__msg); 
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      append(node, data) { //分配权限
        this.dialogRole = true; //模态框显示
        this.RoleroleTypeDdb=data.roleTypeDdb;
        this.RoleroleKey=data.roleKey;
        this.RoleroleName=data.roleName;
        te.crud.querySinglePage("sysAdmin_urm_paginateUnspecifiedAuthorityOfRole",data=>{//未分配权限
          this.transferdata1=data.currentPageData
        },data)
        te.crud.querySinglePage("sysAdmin_urm_paginateAuthorityOfRole",data=>{//已分配权限
          this.transferdata2=data.currentPageData
        },data)
      },
      nodeClickAdd(){//分配权限左侧菜单栏点击的时候

      },
      nodeClickremoe(){//分配权限右侧菜单栏点击的时候

      },
      allocation(){//点击分配触发的事件

      }
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

  .el-col-6 {
    text-align: center;
    line-height: 42px;
  }
  .el-col-8 {
    text-align: center;
  }
  .treesss{
    border: 1px solid #eeeeee;
    height: 400px;
    overflow: scroll;
  }
</style>
