<template>
  <div id="user">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <div class="search-form">
        <el-form :model="listQuery" ref="listQuery" label-position="left" label-width="80px">
          <el-form-item style="margin:0 0 0 -100px">
            <el-col :span="3">
              <el-form-item label="姓名:">
                <el-input v-model="listQuery.name" size="small" placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="登录名:">
                <el-input v-model="listQuery.loginName" size="small" placeholder="请输登录名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="用户类别:">
                <el-select v-model="listQuery.type" placeholder="请选择用户类别" size="small">
                  <el-option v-for="item in sectionLists" :key="item.key" :label="item.label" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="状态:">
                <el-select v-model="listQuery.type" placeholder="请选择状态" size="small">
                  <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-col :span="3">
                <el-form-item>
                  <el-button type="danger" @click="search">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-form-item>
                  <el-button type="danger" @click="search">全部</el-button>
                </el-form-item>
              </el-col>
            </el-col>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" v-loading="listLoading" max-height="650" highlight-current-row size="mini" style="padding:10px 5px 0 7px ">
          <el-table-column prop="loginName" label="登录名" align="center" sortable>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="usersCategory" label="用户类别" align="center" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.usersCategory | scaleFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.state | states}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="systemID" label="系统用户ID" align="center">
          </el-table-column>
          <el-table-column prop="unifyID" label="同一用户ID" align="center">
          </el-table-column>
          <el-table-column prop="relevanceID" label="关联ID" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" title="状态变更" icon="icon-alter" type="text" style="color:#e67f05"></el-button>
              <el-button @click="deletePwd(scope.row)" title="重置密码" icon="icon-qiehuanjiaose" type="text" style="color:#409EFF"></el-button>
              <el-button @click="deleteRow(scope.row)" title="指定角色" icon="icon-tubiao202" type="text" style="color:#cb0000"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="float:right">共{{tableData.length}}条</div>
      </div>
    </div>
    <!-- ------------------------------------------------------------------------------------------------------------变更用户状态 -->
    <el-dialog title="变更用户状态" :visible.sync="dialogState" width="30%">
      <el-form :model="dialogForm" label-width="100px" ref="dialogForm" class="form">
        <el-form-item label="变更对象：" style="margin-bottom:10px">
          <span style="height:35px">{{dialogForm.name}}</span>
        </el-form-item>
        <el-form-item label="当前状态：" style="margin-bottom:10px">
          <template slot-scope="scope">
              <span>{{scope.row.state | states}}</span>
            </template>
        </el-form-item>
        <el-form-item label="设定新状态" style="margin-bottom:10px">
          <el-select v-model="dialogForm.type" placeholder="请选择状态" size="small">
            <el-option v-for="item in optiontypes" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogState = false">取 消</el-button>
        <el-button type="danger" @click="dialogState = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ------------------------------------------------------------------------------------------------------------重置密码 -->
    <el-dialog title="重置密码" :visible.sync="dialogPwd" width="30%">
      重置后新密码：<el-input v-model="dialogPwdinput" placeholder="请输入重置后新密码：" size="mini" style="width:60%"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogPwd = false">取 消</el-button>
        <el-button type="danger" @click="dialogPwd = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ------------------------------------------------------------------------------------------------------------指定角色 -->
    <el-dialog title="指定角色" :visible.sync="dialogRole" width="40%">
      <div class="dialogH">用户</div>
      <el-row>
        <el-col :span="12"><span>姓名：</span><span style="display: inline-block;border-bottom: 1px solid #eeeeee;width: 70%;">{{name}}</span></el-col>
        <el-col :span="12"><span>登录名：</span><span style="display: inline-block;border-bottom: 1px solid #eeeeee;width: 70%;">{{loginName}}</span></el-col>
      </el-row>
      <div class="dialogH">选择类别</div>
      <el-row>
        <el-col :span="24"><span>选择角色类别：</span> 
          <el-select v-model="roleCategory" placeholder="请选择"  size="small">
            <el-option v-for="item in roleCtegorList" :key="item.key" :label="item.label" :value="item.key"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="dialogH">角色指定</div>
      <el-row>
        <el-transfer  :titles="['可指定的角色', '已指定的角色']"  :button-texts="['移除', '指定']" v-model="transferItem" :data="transferdata"></el-transfer>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogRole = false">取 消</el-button>
        <el-button type="danger" @click="dialogRole = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getstaffList,gettransferdataList} from '@/api/admin'
  const scaleOptions = [
    { key: 1, label: '员工' },
    { key: 2, label: '培训师' }
  ]
   const statesOptions = [
    { key: 1, label: '正常' },
    { key: 2, label: '冻结' }
  ]
  const sectionLists = [
    { key: 0, label: '全部' },
    { key:1, label: '员工' },
    { key: 2, label: '培训师' }
    ]
    const options=[
    {key: '0',label: '全部'},
    {key: '1',label: '正常'},
    {key: '2',label: '冻结'}
    ]
    const optiontypes=[
    {key: '1',label: '正常'},
    {key: '2',label: '冻结'}
    ]
    const roleCtegorList=[
      {key: '0',label: '全部'},
      {key: '1',label: '系统管理'},
      {key: '2',label: '公司职能'},
      {key: '3',label: '其他'}
    ]
  const scaleKeyValue = scaleOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.label
    return acc
  }, {})
  const statesKeyValue = statesOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.label
    return acc
  }, {})
  export default {
    name: "user",
    data() {
      return {
        sectionLists,
        options,
        optiontypes,
        roleCtegorList,
        listLoading: false,
        condition: true, //展开收起状态
        listQuery: {}, //搜索框表单
        dialogForm: {
          name:"三瓦地卡",
          type: '正常'
        },
        tableData: [],
        dialogState: false, //变更状态模态框
        dialogPwd: false, //重置密码模态框
        dialogRole: false, //指定角色模态框
        dialogPwdinput:"",//重置后新密码
        name:"指定角色里的名字",//指定角色里的名字
        loginName:"指定角色里的登录名",//指定角色里的登录名
        roleCategory:"123",//指定角色里角色类别
        transferdata:[],//所有角色
        transferItem:[1,2],//已有角色
      };
    },
    created() {
      this.getList();
    },
    mounted() {},
    computed: {

    },
    props: [],
    methods: { //方法
      changeState() { //展开收起
        this.condition = !this.condition
      },
      search() { //查询
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 2000);
      },
      handleClick(row) { //变更状态模态框
        console.log(row);
        this.dialogState = true;
      },
      deletePwd(row) { //重置密码模态框
        console.log(row);
        this.dialogPwd = true;
      },
      deleteRow(row) { //指定角色模态框
        console.log(row);
        this.dialogRole = true;
        gettransferdataList().then(res => {
         this.transferdata=res.data.tableData
        })
      },
      getList() { //请求列表数据
        this.listLoading = true;
        getstaffList().then(res => {
          this.listLoading = false;
          this.tableData = res.data.tableData
        })
      },
    },
    filters: {
      scaleFilter(type) {
        return scaleKeyValue[type]
      },
      states(type) {
        return statesKeyValue[type]
      }
    }
  };

</script>

<style lang="scss" scoped>
  #user {
    &>.messageCenter {
      background: white;
      min-height: 820px;
      margin: 20px;
    }
  }

  .search-form {
    background: white;
    padding: 10px;
    min-height: 820px;
  }

  .form {
    span {
      display: block;
      border-bottom: 1px solid #dddddd;
      height: 40px;
      width: 200px
    }
  }
.dialogH{
  border-left: 3px solid #b20000;
  margin: 15px 0;
  padding-left: 10px;
  font-size: 16px;
  border-bottom: 1px solid #eeeeee;
}
.dialogH:nth-child(1){
  margin-top: 0;
}

</style>
