<template>
  <div id="counselor">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>资源</el-breadcrumb-item>
        <el-breadcrumb-item>咨询师</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <el-row>
        <el-col :span="16">
          <div class="search-form">
            <el-form :model="listQuery" ref="listQuery" label-position="left" label-width="60px">
              <el-form-item style="margin:0 0 0 -60px">
                <el-col :span="6">
                  <el-form-item label="姓名:">
                    <el-input v-model="listQuery.name" size="small" placeholder="请输入员工姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="状态:">
                    <el-select v-model="listQuery.type" placeholder="请选择状态" size="small">
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
                    <el-form-item label="登录名:">
                      <el-input v-model="listQuery.loginName" size="small" placeholder="请输登录名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <el-form-item label="专兼职:">
                      <el-select v-model="listQuery.section" placeholder="请选择" size="small">
                        <el-option v-for="item in sectionLists" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </transition>
            </el-form>
            <el-button type="text" icon="el-icon-circle-plus-outline" style="color:#409EFF;float:right;color:#b20000" @click="addNews">新增</el-button>
            <el-button type="text" icon="el-icon-refresh" style="margin:0 20px;color:#409EFF;float:right" @click="getList">刷新</el-button>
            <el-table :data="tableData" style="width: 100%" v-loading="listLoading" max-height="650" highlight-current-row size="mini"
              @row-click="handleSelectionChange">
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="section" label="专兼职" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.section | states}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="loginName" label="登录名" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                  <el-button @click="deleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="float:right">共{{tableData.length}}条</div>
          </div>
        </el-col>
        <el-dialog :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" width="42%">
          <el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="dialogForm.name" placeholder="请输入姓名" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="dialogForm.loginName" placeholder="请输入登录名" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <span>新建咨询师默认登录密码为登录名,新建成功后，可点击菜单“系统管理”>“用户管理”，修改密码。</span>
            </el-form-item>
            <el-form-item label="照片">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" v-model="dialogForm.dialogImageUrl" list-type="picture-card"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="履历">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入履历内容" v-model="dialogForm.record"></el-input>
            </el-form-item>
            <el-form-item label="经典案例">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入经典案例" v-model="dialogForm.classicCase"></el-input>
            </el-form-item>
            <el-form-item label="专兼职" prop="section">
              <el-select v-model="dialogForm.section" placeholder="请选择" size="small">
                <el-option v-for="item in sectionLists" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="dialogForm.gender" placeholder="请选择性别" size="small">
                <el-option v-for="item in genderLists" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月">
              <el-date-picker type="date" placeholder="选择出生年月" v-model="dialogForm.establishedTime" size="small" style="width:32.7%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="dialogForm.IDNumber" placeholder="请输入身份证号" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="座机">
              <el-input v-model="dialogForm.specialPane" placeholder="请输入座机号码" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="dialogForm.phone" placeholder="请输入手机号码" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input v-model="dialogForm.nativePlace" placeholder="请输入籍贯" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="兴趣爱好">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入兴趣爱好" v-model="dialogForm.interests"></el-input>
            </el-form-item>
            <el-form-item label="性格特征">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入性格特征" v-model="dialogForm.character"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" v-model="dialogForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="默认模块">
              <el-cascader v-model="dialogForm.default" :options="getoptionsList" change-on-select></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="resetForm('dialogForm')">清 空</el-button>
            <el-button type="danger" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-col :span="8">
          <div class="search_right">
            <messag-form :logo="messageForm"></messag-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
   import {getoptionsLists} from '@/api/admin'
   import {counselorlists} from '@/api/counselor'
   import {name,loginName,select,phone} from '@/views/view-component/validationRule'
   import messagForm from "./messagForm";
    const statesOptions = [
      { key: 1, label: '专职' },
      { key: 2, label: '兼职' }
    ]
    const statesKeyValue = statesOptions.reduce((acc, cur) => {
      acc[cur.key] = cur.label
      return acc
    }, {})
  export default {
    name: "counselor",
    data() {
      const sectionLists = [
        { key: 0, label: '全部' },
        { key:1, label: '专职' },
        { key: 2, label: '兼职' }
        ]
       const options=[
        {key: '0',label: '全部'},
        {key: '1',label: '在职'},
        {key: '2',label: '已离职'}
        ]
        const genderLists=[
        {key: '1',label: '男'},
        {key: '2',label: '女'},
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
        sectionLists, //部门下拉框数组
        genderLists, //性别
        listLoading: false, //表格loading
        tableData: [],
        dialogFormVisible: false,
        getoptionsList: [], //默认模块列表\
        dialogFormVisibleTitle: "新增咨询师", //模态框title
      };
    },
    created() {
      this.getList()
    },
    watch: {},
    mounted() {},
    computed: {

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
      handleClick(row) { //表单中的编辑
        console.log(row);
        this.dialogFormVisible = true;
        this.dialogForm={}
        this.dialogFormVisibleTitle = "修改咨询师";
        this.getoptionsLists()
      },
      deleteRow(row) { //表单中的删除
        console.log(row);
        this.$confirm('此操作将删除咨询师, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(row) { //当某一行被点击时会触发该事件
        this.messageForm = row
      },
      getList() { //请求列表数据
        this.listLoading = true;
        counselorlists().then(res => {
          this.listLoading = false;
          this.tableData = res.data.tableData
        })
      },
      handleRemove(file, fileList) { //照片删除时间
        console.log(file, fileList);
      },
      submitForm(formName) { //提交新增表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            if (this.dialogFormVisibleTitle == "新增咨询师") {
              console.log("新增咨询师")
            } else {
              console.log("修改咨询师")
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
      getoptionsLists() { //获取模态框中默认模块
        getoptionsLists().then(res => {
          this.getoptionsList = res.data.optionsLists
        })
      },
      addNews() { //点击新增的时候
        this.dialogFormVisible = true;
        this.dialogForm={}
        this.dialogFormVisibleTitle = "新增咨询师";
        this.getoptionsLists()
      },
    },
    components: {
      messagForm
    },
    filters: {
      states(type) {
        return statesKeyValue[type]
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

</style>
