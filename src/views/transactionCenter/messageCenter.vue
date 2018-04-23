<template>
  <div id="messageCenter">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>事务中心</el-breadcrumb-item>
        <el-breadcrumb-item>消息中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <el-row>
        <el-col :span="16">
          <div class="search-form">
            <el-form :model="listQuery" ref="listQuery" label-position="left" label-width="80px">
              <el-form-item style="margin:0 0 0 -80px">
                <el-col :span="6">
                  <el-form-item label="重要性:">
                     <el-select v-model="listQuery.significance" placeholder="请选择重要性" size="small">
                        <el-option v-for="item in significancelists" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-form-item>
                    <el-button type="danger" @click="search">查询</el-button>
                  </el-form-item>
                </el-col>
                 <el-col :span="2" >
                  <el-form-item>
                    <el-button type="danger" @click="empty">清空</el-button>
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
                <el-form-item style="margin:0 0 0 -80px" v-show="condition==true">
                  <el-col :span="6">
                    <el-form-item label="标题:">
                      <el-input v-model="listQuery.loginName" size="small" placeholder="请输标题"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" >
                    <el-form-item label="类别:">
                       <el-cascader expand-trigger="hover" :options="categorylists" v-model="listQuery.category"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="发送时间:">
                      <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                      end-placeholder="结束日期" :picker-options="pickerOptions2" style="width:300px;margin-top: 3px;height:35px"  format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </transition>
            </el-form>
            <el-button type="danger" icon="el-icon-circle-plus-outline" style="margin:10px 0;width:100px" @click="addNews">发送消息</el-button>
            <el-table :data="tableData" style="width: 100%" v-loading="listLoading" max-height="650" highlight-current-row size="mini"
              @row-click="handleSelectionChange">
              <el-table-column prop="time" label="发送时间" align="center" sortable>
              </el-table-column>
               <el-table-column prop="sender" label="发送人" align="center">
              </el-table-column>
              <el-table-column prop="section" label="类别" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.section | sections}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="headline" label="标题" align="center">
              </el-table-column>
              <el-table-column prop="significance" label="重要性" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.significance | states}}</span>
                </template>
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
            <el-form-item label="接收员工" prop="staff">
              <el-select v-model="dialogForm.staff" multiple filterable allow-create default-first-option placeholder="请选择接收员工" style="width:100%;" size="small">
                <el-option v-for="item in options5" :key="item.value"  :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接收咨询师" prop="counselor">
              <el-select v-model="dialogForm.counselor" multiple filterable allow-create default-first-option placeholder="请选择接收咨询师" style="width:100%" size="small">
                <el-option v-for="item in options5" :key="item.value"  :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="headline">
              <el-input v-model="dialogForm.headline" placeholder="请输入标题" size="small" style="width:32.7%"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="matter">
               <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="dialogForm.matter"></el-input>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" v-model="dialogForm.dialogImageUrl" list-type="picture-card"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="重要性:" prop="significance">
              <el-select v-model="dialogForm.significance" placeholder="请选择重要性" size="small">
                <el-option v-for="item in significancelists" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
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
  import {categorylists,messageList} from '@/api/transactionCenter'
  import {staff,counselor,select,headline} from '@/views/transactionCenter/roleFrom'
  import messagForm from "./messagForm";
  const statesOptions = [
  { key: 0, label: '全部' },
  { key: 1, label: '普通' },
  { key: 2, label: '重要' },
  { key: 3, label: '紧急' }
  ]
  const sectionsOptions=[
    {value: '1-1',label: '新任务'},
    {value: '1-2',label: '任务暂停'},
    {value: '1-3',label: '即将逾期'}, 
    {value: '1-4',label: '任务逾期'}, 
    {value: '1-5',label: '任务取消'}, 
    {value: '1-6',label: '任务完成(按时)'}, 
    {value: '1-7',label: '任务完成(超时)'},
    {value: '2-1',label: '客户分配'}, 
    {value: '2-2',label: '客户收回'}, 
    {value: '2-3',label: '售前状态评估变更'}, 
    {value: '2-4',label: '客户销售领用申请'}, 
    {value: '2-5',label: '销售任务放弃申请'}, 
    {value: '2-6',label: '销售任务延期申请'}, 
    {value: '2-7',label: '方案预报价(申请)'}, 
    {value: '2-8',label: '销售合同申请'}, 
    {value: '2-9',label: '立项申请'}, 
    {value: '2-10',label: '销售任务即将逾期'}, 
    {value: '2-11',label: '客户已实施认证即将逾期'}, 
    {value: '2-12',label: '立项交接'},
    {value: '3-1',label: '任务已分配'}, 
    {value: '3-2',label: '策划完成'}, 
    {value: '3-3',label: '策划审核'}, 
    {value: '3-4',label: '现场实施'}, 
    {value: '3-5',label: '产品实施完成'}, 
    {value: '3-6',label: '产品实施即将逾期'}, 
    {value: '3-7',label: '产品实施已逾期'}, 
    {value: '3-8',label: '项目交接'},
    {value: '4-1',label: '任务已分配'}, 
    {value: '4-2',label: '策划完成'}, 
    {value: '4-3',label: '商机转告'}, 
    {value: '4-4',label: '产品客服完成'}, 
    {value: '4-5',label: '项目客服完成'}, 
    {value: '4-6',label: '产品客服项目逾期'}, 
    {value: '4-7',label: '产品客服项目即将开始'}, 
    {value: '4-8',label: '结案'},
    {value: '5-1',label: '结案',},
    {value: 6,label: '个人发送',}
  ]
  const statesKeyValue = statesOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.label
    return acc
  }, {})
  const sectionsKeyValue= sectionsOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    return acc
  }, {})
  export default {
    name: "messageCenter",
    data() {
      const significancelists = [
        { key: 0, label: '全部' },
        { key: 1, label: '普通' },
        { key: 2, label: '重要' },
        { key: 3, label: '紧急' }
        ]
        const genderLists=[
        {key: '1',label: '男'},
        {key: '2',label: '女'},
        ]
      return {
          options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        condition: true, //展开收起状态
        listQuery: {},
        dialogForm: {
          staff:[],
          counselor:[],
          headline:'',
          matter:'',
          dialogImageUrl:[],
          significance:''
        },
        messageForm: {},
        rules: {
          staff: [{required: true,trigger: 'blur',validator: staff}],
          counselor: [{required: true,trigger: 'blur',validator: counselor}],
          headline: [{required: true,trigger: 'blur',validator: headline}],
          significance: [{required: true,trigger: 'change',validator: select}]
        },
        significancelists, //状态下拉框数组
        categorylists:[], //部门下拉框数组
        genderLists, //性别
        listLoading: false, //表格loading
        tableData: [],
        dialogFormVisible: false,
        getoptionsList: [], //默认模块列表\
        dialogFormVisibleTitle: "发送新消息", //模态框title
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: ''
      };
    },
    created() {
      this.getList();
      this.getcategorylists()
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
        this.$refs['dialogForm'].resetFields()//重置表单
        this.dialogFormVisible = true;
        this.dialogFormVisibleTitle = "修改消息";
        this.getoptionsLists()
      },
      deleteRow(row) { //表单中的删除
        console.log(row);
        this.$confirm('此操作将删除此消息, 是否继续?', '提示', {
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
        messageList().then(res => {
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
            if (this.dialogFormVisibleTitle == "发送新消息") {
              console.log("发送新消息")
            } else {
              console.log("修改消息")
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
      getcategorylists(){//获取类别
        categorylists().then(res => {
          this.categorylists = res.data.categorylists
        })
      },
      addNews() { //点击新增的时候
        this.dialogFormVisible = true;
        this.$refs['dialogForm'].resetFields()//重置表单
        this.dialogFormVisibleTitle = "发送新消息";
        this.getoptionsLists()
      },
      empty(){//清除消息
        this.$confirm('此操作将清空消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '清空成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清空'
          });
        });
      }
    },
    components: {
      messagForm
    },
    filters: {
      states(type) {
        return statesKeyValue[type]
      },
      sections(type){
        return sectionsKeyValue[type]
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
