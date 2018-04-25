<template>
  <div id="bdd">
    <div style="margin:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统设定</el-breadcrumb-item>
        <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="messageCenter">
      <el-row>
        <!-- --------------------------------------------------------------------ItemSet管理----------------------------------------------------------------- -->
        <el-col :span="12" style="border-right:5px solid #eeeeee;border-bottom:10px solid #eeeeee;">
          <h2>ItemSet管理</h2>
          <el-row style="margin:10px 0">
            <el-col :span="10">
              Set Key
              <el-input v-model="setKey" size="small" placeholder="请输入Set Key" style="width:213px"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" @click="setKeySearch">查询</el-button>
            </el-col>
            <el-col :span="2" :offset="8">
              <el-button type="text" icon="el-icon-circle-plus-outline" @click="setKeyAdd">新增</el-button>
            </el-col>
          </el-row>
          <el-table :data="setKeyTableData" style="width: 100%" v-loading="setKeylistLoading" max-height="650" highlight-current-row
            size="mini" @row-click="setKeyHandleChange" height="290">
            <el-table-column prop="KeyId" label="Key" align="center">
            </el-table-column>
            <el-table-column prop="duty" label="状态" align="center">
            </el-table-column>
            <el-table-column prop="cache" label="缓存类型" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="setKeyvisit(scope.row)" title="游览" type="text" icon="el-icon-view" style="color:#e67f05"></el-button>
                <el-button @click="setKeyhandleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="setKeydeleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页条-->
          <PageItem :handleSizeChange="setKeyhandleSizeChange" :handleCurrentChange="setKeyhandleCurrentChange" :listQuery="setKeylistQuery"
            :total="setKeyTotal"></PageItem>
          <!-- set-key的模态框 -->
          <set-keydialogs @successCBK="getSetLists" :setKeyruleForm="setKeyruleForm" :setKeyTitle='setKeyTitle' :visible='visible'></set-keydialogs>
        </el-col>
        <!-- --------------------------------------------------------------------TopItem管理----------------------------------------------------------------- -->
        <el-col :span="12" style="border-left:5px solid #eeeeee;border-bottom:10px solid #eeeeee;">
          <h2>TopItem管理</h2>
          <el-row style="margin:10px 0">
            <el-col :span="8">
              Key
              <el-input v-model="topItem" size="small" placeholder="请输入Set Key" style="width:213px"></el-input>
            </el-col>
            <el-col :span="8">
              标题
              <el-input v-model="topItemTitle" size="small" placeholder="请输入标题" style="width:213px"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" @click="topItemSearch">查询</el-button>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-button type="text" icon="el-icon-circle-plus-outline" @click="topItemAdd">新增</el-button>
            </el-col>
          </el-row>
          <el-table :data="topItemTableData" style="width: 100%" v-loading="topItemlistLoading" max-height="650" highlight-current-row
            size="mini" @row-click="topItemHandleChange" height="290">
            <el-table-column prop="KeyId" label="TopItem Key" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="topItemvisit(scope.row)" title="游览" type="text" icon="el-icon-view" style="color:#e67f05"></el-button>
                <el-button @click="topItemhandleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="topItemdeleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页条-->
          <PageItem :handleSizeChange="topItemhandleSizeChange" :handleCurrentChange="topItemhandleCurrentChange" :listQuery="topItemlistQuery"
            :total="topItemTotal"></PageItem>
          <!-- set-key的模态框 -->
          <top-itemdialogs @successCBK="getTopItemList" :setKeyruleForm="topItemruleForm" :setKeyTitle='topItemTitle' :visible='visible'></top-itemdialogs>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <h2>SubItem管理</h2>
          <div style="overflow:hidden">
            <el-button style="color:#e67f05;float:right" size="mini" title="新增顶层SubItem" icon="el-icon-circle-plus-outline" @click="addNews">新增顶层SubItem</el-button>
          </div>
          <el-tree :data="SubItemTree" @node-click="nodeClick" node-key="id" default-expand-all :expand-on-click-node="false" draggable>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" style="color:#e67f05" size="mini" title="修改" icon="el-icon-edit" @click="amend(node, data)"></el-button>
                <el-button type="text" style="color:#b20000" size="mini" title="删除" icon="el-icon-delete" @click="remove(node, data)"></el-button>
                <el-button type="text" size="mini" title="新增同级" icon="icon-xinzeng" @click="append(node, data)"></el-button>
                <el-button type="text" style="color:rgb(59, 228, 198)" size="mini" title="新增子级" icon="el-icon-circle-plus-outline" @click="sublevel(node, data)"></el-button>
                <el-button type="text" style="color:#e67f05" size="mini" title="移动" icon="el-icon-rank" @click="shift(node, data)"></el-button>
              </span>
            </span>
          </el-tree>
          <sub-item @successCBK="gettreeLists" :setKeyruleForm="SubItemruleForm" :setKeyTitle='SubItemTitle' :visible='visible'></sub-item>
          <el-dialog title="移动:SubItem" :visible.sync="visible.shiftSubItemdialog" width="40%">
            <el-form :model="setKeyruleForm" ref="setKeyruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="选择移动位置">
                <el-tree :data="SubItemTree" @node-click="nodeselect" node-key="id" default-expand-all :expand-on-click-node="false" draggable></el-tree>
              </el-form-item>
              <el-form-item label="选择移动方式">
                <el-select v-model="shiftType" placeholder="请选择活动区域">
                  <el-option label="移动目标同级" value="shanghai"></el-option>
                  <el-option label="移动目标下级" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="info" @click.native="visible.shiftSubItemdialog=false">取 消</el-button>
              <el-button type="danger" @click.native="shiftSubItemsubmitForm()">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="11">
          <h2>SubItem详情</h2>
          <subItem-particulars :logo="particularsForm"></subItem-particulars>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {itemSetLists,treeLists} from "@/api/bdd";
  import { setKeydialogs,topItemdialogs, subItem,subItemParticulars} from "./components";
  import { PageItem } from '@/views/view-component'
  export default {
    name: "bdd",
    data() {
      return {
        setKey: "", //---------------------------------------------------setKey的搜索内容
        setKeyTableData: [], //setKey的表格
        setKeylistQuery: {
          setKeycurrentPage: 1, //setKey的当前页
        },
        setKeyTotal: 40, //setKey的总页数
        setKeylistLoading: false, //setKey的loading
        visible: {
          setKeydialog: false, //setKey模态框里
          topItemdialogs: false, //topItemy模态框里
          subItemdialog: false,
          shiftSubItemdialog: false //移动模态框
        },
        setKeyTitle: "新增", //setKey模态框里的Title
        setKeyruleForm: {},
        topItem: "", //----------------------------------------------------TopItem的搜索内容
        topItemTitle: "", //TopItem的搜索标题
        topItemTableData: [], //setKey的表格
        topItemlistLoading: false,
        topItemlistQuery: {
          topItemcurrentPage: 1, //topItem的当前页
        },
        topItemTotal: 40, //topItem的总页数
        topItemTitle: "新增", //topItem模态框里的Title
        topItemruleForm: {},
        SubItemTree: [], //-------------------------------------------------SubItem管理
        SubItemTitle: "", //SubItem模态框标题
        SubItemruleForm: {},
        nodeNuber: null,
        selectNuber: null,
        shiftType: "", //移动方式
        particularsForm: {}
      };
    },
    components: {
      setKeydialogs,
      PageItem,
      topItemdialogs,
      subItem,
      subItemParticulars
    },
    created() {
      this.getSetLists();
      this.gettreeLists()
    },
    mounted() {},
    computed: {

    },
    props: [],
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getSetLists() { //请求setKey下的列表-----------------------------setKey
        this.setKeylistLoading = true;
        itemSetLists().then(res => {
          this.setKeyTableData = res.data.lists;
          this.setKeylistLoading = false;
        }).catch((res) => {
          this.setKeylistLoading = false;
        })
      },
      setKeySearch() { //setKey的搜索按钮
        this.setKeylistLoading = true
        setTimeout(() => {
          this.setKeylistLoading = false
        }, 1000);
      },
      setKeyAdd() { //setKey的新增按钮
        this.visible.setKeydialog = true;
        this.setKeyTitle = "新增:ItemSet";
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeyHandleChange(row) { //setKey的某一行被点击时该事件
        console.log(row)
        this.getTopItemList()
      },
      setKeyvisit(row) { //setKey的游览
        this.setKeyruleForm = row; //付过去
        this.visible.setKeydialog = true;
        this.setKeyTitle = "游览:ItemSet";
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeyhandleClick(row) { //setKey的修改
        this.setKeyruleForm = row
        this.visible.setKeydialog = true;
        this.setKeyTitle = "修改:ItemSet";
        this.$refs['setKeyruleForm'].resetFields();
      },
      setKeydeleteRow(row) { //setKey的删除
        this.$confirm('此操作将删除此Set Key, 是否继续?', '提示', {
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
      setKeyhandleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      setKeyhandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getTopItemList() { //------------------------------------------topItem
        this.topItemlistLoading = true;
        itemSetLists().then(res => {
          this.topItemTableData = res.data.lists;
          this.topItemlistLoading = false;
        }).catch((res) => {
          this.topItemTableData = false;
        })
      },
      topItemSearch() {
        this.topItemlistLoading = true
        setTimeout(() => {
          this.topItemlistLoading = false
        }, 1000);
      },
      topItemAdd() { //新增
        this.visible.topItemdialogs = true;
        this.topItemTitle = "新增:TopItem";
        this.$refs['topItemTableData'].resetFields();
      },
      topItemHandleChange(row) { //setKey的某一行被点击时该事件
        console.log(row)
      },
      topItemvisit(row) { //setKey的游览
        this.setKeyruleForm = row; //付过去
        this.visible.topItemdialogs = true;
        this.topItemTitle = "游览:TopItem";
        this.$refs['topItemTableData'].resetFields();
      },
      topItemhandleClick(row) { //setKey的修改
        this.setKeyruleForm = row
        this.visible.topItemdialogs = true;
        this.topItemTitle = "修改:TopItem";
        this.$refs['topItemTableData'].resetFields();
      },
      topItemdeleteRow(row) { //setKey的删除
        this.$confirm('此操作将删除此TopItem, 是否继续?', '提示', {
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
      topItemhandleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      topItemhandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      gettreeLists() { //----------------------------------------------SubItem
        treeLists().then(res => {
          this.SubItemTree = res.data.data;
        }).catch((res) => {

        })
      },
      addNews() { //新增顶层SubItem
        this.visible.subItemdialog = true
        this.SubItemTitle = "新增:顶层SubItem"
      },
      shift(node, data) { //移动
        this.nodeNuber = node.label
        this.visible.shiftSubItemdialog = true
      },
      amend(node, data) { //修改
        // console.log(node, data)
        this.visible.subItemdialog = true
        this.SubItemTitle = "修改:SubItem"
      },
      remove(node, data) { //删除
        // console.log(node, data)
      },
      append(node, data) { //新增同级
        // console.log(node, data)
        this.visible.subItemdialog = true
        this.SubItemTitle = "新增：同级SubItem"
      },
      sublevel(node, data) { //新增子集
        // console.log(node, data)
        this.visible.subItemdialog = true
        this.SubItemTitle = "新增：子级SubItem"
      },
      nodeClick(node, data) { //行点击
        this.particularsForm=node
      },
      nodeselect(node, data) { //选择模态框选择的节点
        this.selectNuber = node.label
      },
      shiftSubItemsubmitForm() { //移动节点模态框的确定
        if (!this.selectNuber) {
          this.$message({
            type: 'warning',
            message: '请选择要移动到的节点'
          });
        } else if (this.shiftType == "") {
          this.$message({
            type: 'warning',
            message: '请选择移动目标同级or下级'
          });
        } else {
          this.visible.shiftSubItemdialog = false
          this.nodeNuber = null
          this.selectNuber = null
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  #bdd {
    &>.messageCenter {
      background: white;
      min-height: 820px;
      margin: 20px;
    }
  }

  .el-col-12,
  .el-col-13,
  .el-col-11 {
    height: 450px;
    overflow: scroll;
    padding: 10px 0 10px 10px;
    &>h2 {
      font-size: 16px;
    }
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
