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
          <el-table :data="setKeyTableData" ref="supplierTable" style="width: 100%" v-loading="setKeylistLoading" max-height="650" highlight-current-row
            size="mini" @row-click="setKeyHandleChange" height="290">
            <el-table-column prop="setKey" label="Key" align="center">
            </el-table-column>
            <bdd-SetStatus :prop="bdd_key.setStatus" :indexes="bdd_key.setStatus" :bddItem='bdd_item.setStatus' :label='label.setStatus'></bdd-SetStatus>
            <bdd-SetStatus :prop="bdd_key.cacheType" :indexes="bdd_key.cacheType" :bddItem='bdd_item.cacheType' :label='label.cacheType'></bdd-SetStatus>
            <el-table-column prop="setTitle" label="标题" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="setKeyvisit(scope.row)" title="浏览" type="text" icon="el-icon-view" style="color:#e67f05"></el-button>
                <el-button @click="setKeyhandleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="setKeydeleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页条-->
          <PageItem :handleSizeChange="setKeyhandleSizeChange" :handleCurrentChange="setKeyhandleCurrentChange" :listQuery="setKeylistQuery"
            :total="setKeyTotal"></PageItem>
          <!-- set-key的模态框 -->
          <set-keydialogs :genre="genre" @successCBK="getSetLists" :backupsruleForm="backupsruleForm" :setKeyruleForm="setKeyruleForm"
            :setKeyTitle='setKeyTitle' :visible='visible'></set-keydialogs>
          <visit-setKey :genre="genre" @successCBK="getSetLists" :backupsruleForm="backupsruleForm" :setKeyruleForm="setKeyruleForm"
            :setKeyTitle='setKeyTitle' :visible='visible'></visit-setKey>
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
          <el-table :data="topItemTableData" ref="topItemsupplierTable" style="width: 100%" v-loading="topItemlistLoading" max-height="650" highlight-current-row
            size="mini" @row-click="topItemHandleChange" height="290">
            <el-table-column prop="itemKey" label="TopItem Key" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="topItemvisit(scope.row)" title="浏览" type="text" icon="el-icon-view" style="color:#e67f05"></el-button>
                <el-button @click="topItemhandleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="topItemdeleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页条-->
          <PageItem :handleSizeChange="topItemhandleSizeChange" :handleCurrentChange="topItemhandleCurrentChange" :listQuery="topItemlistQuery"
            :total="topItemTotal"></PageItem>
          <!-- set-key的模态框 -->
          <top-itemdialogs :genre="genre" @successCBK="getTopItemList" :setKeyruleForm="topItemruleForm" :setKeyTitle='topItemTitles'
            :visible='visible' :teBddItemSetId="teBddItemsetKey" :topItembackupsruleForm="topItembackupsruleForm"></top-itemdialogs>
          <visitTopItem :genre="genre" @successCBK="getTopItemList" :setKeyruleForm="topItemruleForm" :setKeyTitle='topItemTitles'
            :visible='visible' :teBddItemSetId="teBddItemsetKey" :topItembackupsruleForm="topItembackupsruleForm"></visitTopItem>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <h2>SubItem管理</h2>
          <div style="overflow:hidden">
            <el-button type="text" style="float:right" size="mini" title="新增顶层SubItem" icon="el-icon-circle-plus-outline" @click="addNews">新增顶层SubItem</el-button>
          </div>
          <el-tree :data="SubItemTree" ref="SubItemTable" :props="SubItemTreeprops" :label="SubItemTree.title" @node-click="nodeClick" node-key="key" default-expand-all
            :expand-on-click-node="false"  highlight-current >
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
          <addNew-subitem @successCBK="gettreeLists" :TopItemPath="TopItemPath" :genre="genre" :setKeyruleForm="AddSubItemruleForm"
            :targetPath="targetPath" :setKeyTitle='SubItemTitle' :visible='visible'></addNew-subitem>
          <sub-item @successCBK="gettreeLists" :SubItembackupsruleForm="SubItembackupsruleForm" :TopItemPath="TopItemPath" :genre="genre"
            :setKeyruleForm="SubItemruleForm" :setKeyTitle='SubItemTitle' :visible='visible'></sub-item>
          <el-dialog title="移动:SubItem" :visible.sync="visible.shiftSubItemdialog" width="40%">
            <el-form :model="setKeyruleForm" ref="setKeyruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="选择移动位置">
                <el-tree :data="SubItemTree" :props="SubItemTreeprops" @node-click="nodeselect" node-key="key" default-expand-all :expand-on-click-node="false"
                  draggable></el-tree>
              </el-form-item>
              <el-form-item label="选择移动方式">
                <el-select v-model="shiftType" placeholder="请选择活动区域">
                  <el-option label="移动目标同级" value="POSITION_BROTHER"></el-option>
                  <el-option label="移动目标下级" value="POSITION_UNDER"></el-option>
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
  import { setKeydialogs,topItemdialogs, subItem,subItemParticulars,addNewSubitem,visitSetKey,visitTopItem } from "./components";
  import { PageItem ,bddSetStatus} from '@/views/view-component'
  export default {
    name: "bdd",
    data() {
      return {
        setKey: "", //---------------------------------------------------setKey的搜索内容
        setKeyTableData: [], //setKey的表格
        setKeylistQuery: {},
        setKeyTotal: 40, //setKey的总页数
        setKeyPageSize: 0, //一页多少条
        setKeycurrentPage: 1, //当前第几页
        setKeylistLoading: false, //setKey的loading
        visible: {
          setKeydialog: false, //setKey模态框里
          topItemdialogs: false, //topItemy模态框里
          subItemdialog: false,
          shiftSubItemdialog: false, //移动模态框
          addSubItemdialog: false, //新增SubItem
          visitSetKey:false,//游览setkey模态框
          visitTopItem:false
        },
        supplierTable:{},//表格用来默认选中亮的
        topItemsupplierTable:{},//表格用来默认选中亮的
        SubItemTable: {},//表格用来默认选中亮的
        setKeyTitle: "", //setKey模态框里的Title
        setKeyruleForm: {},
        backupsruleForm: {}, //setKey重置的备份表单
        topItem: "", //----------------------------------------------------TopItem的搜索内容
        teBddItemSetId: null, //当setKey点击时候存储的id
        teBddItemsetKey: null,
        topItemTitle: "", //TopItem的搜索标题
        topItemTableData: [], //setKey的表格
        topItemlistLoading: false,
        topItemlistQuery: {},
        topItemTotal: 0, //topItem的总页数
        topItemPageSize: 0, //一页多少条
        topItemcurrentPage: 1, //当前第几页
        topItemTitles: "", //topItem模态框里的Title
        topItemruleForm: {},
        topItembackupsruleForm: {}, //topItem重置的备份表单
        SubItemTree: [], //-------------------------------------------------SubItem管理
        SubItemTitle: "", //SubItem模态框标题
        SubItemruleForm: {}, //编辑模态框表单
        SubItembackupsruleForm: {}, //SubItem重置的备份表单
        AddSubItemruleForm: {}, //新增模态框表单
        nodeNuber: null,
        selectNuber: null,
        shiftType: "", //移动方式
        particularsForm: {},
        bdd_item: {
          setStatus: 'TE:bdd_item_set_status',
          cacheType: "TE:bdd_item_cache_type",
        },
        label: {
          setStatus: "状态",
          cacheType: "缓存类型"
        },
        bdd_key: {
          setStatus: "setStatus",
          cacheType: "cacheType"
        },
        genre: 0,
        SubItemTreeprops: {
          children: 'subItems',
          label: 'title'
        },
        TopItemPath: "", //TopItemPath,
        targetPath: "", //同级子集
      };
    },
    components: {
      setKeydialogs,
      PageItem,
      topItemdialogs,
      subItem,
      subItemParticulars,
      bddSetStatus,
      addNewSubitem,
      visitSetKey,
      visitTopItem
    },
    created() {
      this.getSetLists();
    },
    mounted() {},
    computed: {

    },
    props: [],
    methods: {
      getSetLists() { //请求setKey下的列表------------------------------------------ok
        this.setKeylistLoading = true;
        te.pagination.queryPage('pagingTeBddItemSet', data => { //获取默认列表
          this.setKeyTableData = data.currentPageData;
          this.setKeyTotal = data.rowCount; //总页数
          this.setKeylistQuery.setKeycurrentPage = data.beginRow; //当前页
          this.setKeylistQuery.pageSize = data.pageCapacity; //一页多少条
          this.setKeylistLoading = false;
          this.$nextTick(function () {
            this.checked(); //每次更新了数据，触发这个函数即可。
          });
        }, err => {
          this.$message.warning(err.__msg)
          this.setKeylistLoading = false;
        })
      },
      checked() { //默认选中第一行数据
        this.setKeyHandleChange(this.setKeyTableData[0])
        this.$refs.supplierTable.setCurrentRow(this.setKeyTableData[0]);
      },
      setKeySearch() { //setKey的搜索按钮---------------------------------------------OK
        const zz = /^[a-zA-Z0-9_\s]*$/
        if (!zz.test(this.setKey)) {
          this.setKey = "";
          this.$message.warning('不允许特殊字符进行搜索');
        } else {
          this.setKeylistLoading = true;
          te.pagination.queryPage('pagingTeBddItemSet', data => {
            this.setKeyTableData = data.currentPageData;
            this.setKeyTotal = data.rowCount; //总页数
            this.setKeylistQuery.setKeycurrentPage = data.beginRow; //当前页
            this.setKeylistQuery.pageSize = data.pageCapacity; //一页多少条
            this.setKeylistLoading = false;
          }, {
            setKey: this.setKey
          }, 1, null, 30)
        }
      },
      setKeyAdd() { //setKey的新增按钮-------------------------------------------------ok
        this.visible.setKeydialog = true; //模态框显示
        this.setKeyTitle = "新增:ItemSet"; //模态框名标题
        this.genre = 1; //清空显示
        this.setKeyruleForm = {}; //清空表单
        this.$refs['setKeyruleForm'].resetFields(); //重置下表单验证
      },
      setKeyHandleChange(row) { //setKey的某一行被点击时该事件--------------------------ok
        this.teBddItemsetKey = row.setKey; //存储上级id
        this.teBddItemSetId = row.teBddItemSetId; //存储上级id
        this.topItemlistLoading = true; //加载
        te.pagination.queryPage('pagingTeBddTopItem', data => { //获取默认列表
          this.topItemTableData = data.currentPageData; //赋值
          this.topItemlistLoading = false; //加载结束
          this.topItemTotal = data.rowCount; //总页数
          this.topItemlistQuery.setKeycurrentPage = data.beginRow; //当前页
          this.topItemlistQuery.pageSize = data.pageCapacity; //一页多少条
          this.$nextTick(function () {
            this.topItemchecked(); //每次更新了数据，触发这个函数即可。
          });
        }, {
          teBddItemSetId: row.teBddItemSetId
        }, null, null)
      },
      topItemchecked() {
        this.topItemHandleChange(this.topItemTableData[0])
        this.$refs.topItemsupplierTable.setCurrentRow(this.topItemTableData[0]);
      },
      setKeyvisit(row) { //setKey的游览-------------------------------------------------ok
        this.setKeyruleForm = Object.assign({}, row); //赋值
        this.setKeyruleForm.setStatus = row.setStatus;
        this.setKeyruleForm.cacheType = row.cacheType;
        this.visible.visitTopItem = true; //模态框显示
        this.setKeyTitle = "浏览:ItemSet"; //模态框名标题
        this.genre = 0; //清空重置都不显示
        this.$refs['setKeyruleForm'].resetFields(); //重置下表单验证
      },
      setKeyhandleClick(row) { //setKey的修改-------------------------------------------------ok
        this.setKeyruleForm = Object.assign({}, row); //赋值
        this.setKeyruleForm.setStatus = row.setStatus;
        this.setKeyruleForm.cacheType = row.cacheType;
        this.setKeyruleForm.originalKey = row.setKey; //后台需要把就得setKey赋值到originalKey上
        this.backupsruleForm = Object.assign({}, row); //备份个表单，重置用
        this.visible.setKeydialog = true; //模态框显示
        this.setKeyTitle = "修改:ItemSet"; //模态框名标题
        this.genre = 2; //重置显示
        this.$refs['setKeyruleForm'].resetFields(); //重置下表单验证
      },
      setKeydeleteRow(row) { //setKey的删除---------------------------------------------------ok
        this.$confirm('此操作将删除此Set Key, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          te.crud.do('sysAdmin_bdd_deleteItemSet', {
            setKey: row.setKey
          }, data => {
            this.$message.success(data.__msg);
            this.getSetLists();
          }, err => {
            this.$message.warning(err.__msg);
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      setKeyhandleSizeChange(val) { //-------------------------------------------------------OK
        this.setKeyPageSize = val;
        te.pagination.queryPage('pagingTeBddItemSet', data => {
          this.setKeyTableData = data.currentPageData;
          this.setKeyTotal = data.rowCount; //总页数
          this.setKeylistQuery.setKeycurrentPage = data.beginRow; //当前页
          this.setKeylistQuery.pageSize = data.pageCapacity; //一页多少条
          this.setKeylistLoading = false;
        }, {
          setKey: this.setKey
        }, this.setKeyPageSize, null, val)
      },
      setKeyhandleCurrentChange(val) { //-------------------------------------------------------OK
        this.setKeycurrentPage = val;
        te.pagination.queryPage('pagingTeBddItemSet', data => {
          this.setKeyTableData = data.currentPageData;
          this.setKeyTotal = data.rowCount; //总页数
          this.setKeylistQuery.setKeycurrentPage = data.beginRow; //当前页
          this.setKeylistQuery.pageSize = data.pageCapacity; //一页多少条
          this.setKeylistLoading = false;
        }, {
          setKey: this.setKey
        }, val, null, this.setKeyPageSize)
      },
      topItemhandleSizeChange(val) { //--------------------------------------------------------ok
        this.topItemPageSize = val;
        te.pagination.queryPage('pagingTeBddTopItem', data => {
          this.topItemTableData = data.currentPageData;
          this.topItemTotal = data.rowCount; //总页数
          this.topItemlistQuery.topItemcurrentPage = data.beginRow; //当前页
          this.topItemlistQuery.pageSize = data.pageCapacity; //一页多少条
          this.topItemlistLoading = false;
        }, {
          itemKey: this.topItem,
          title: this.topItemTitle
        }, this.topItemPageSize, null, val)
      },
      topItemhandleCurrentChange(val) { //----------------------------------------------------ok
        this.topItemcurrentPage = val;
        te.pagination.queryPage('pagingTeBddTopItem', data => {
          this.topItemTableData = data.currentPageData;
          this.topItemTotal = data.rowCount; //总页数
          this.topItemlistQuery.topItemcurrentPage = data.beginRow; //当前页
          this.topItemlistQuery.pageSize = data.pageCapacity; //一页多少条
          this.topItemlistLoading = false;
        }, {
          itemKey: this.topItem,
          title: this.topItemTitle
        }, val, null, this.topItemPageSize)
      },
      getTopItemList() { //-----------topItem------------------------------------------------ok
        te.pagination.queryPage('pagingTeBddTopItem', data => { //获取默认列表
          this.topItemTableData = data.currentPageData; //赋值
          this.topItemlistLoading = false; //加载结束
          this.topItemTotal = data.rowCount; //总页数
          this.topItemlistQuery.setKeycurrentPage = data.beginRow; //当前页
          this.topItemlistQuery.pageSize = data.pageCapacity; //一页多少条
        }, {
          teBddItemSetId: this.teBddItemSetId
        }, null, null);
      },
      topItemSearch() { //搜索------------------------------------------------------ok
        const zz = /^[a-zA-Z0-9_\s]*$/
        if (!zz.test(this.topItem)) {
          this.topItem = "";
          this.$message.warning('不允许特殊字符进行搜索');
        } else {
          this.topItemlistLoading = true;
          te.pagination.queryPage('pagingTeBddTopItem', data => {
            this.topItemTableData = data.currentPageData;
            this.topItemTotal = data.rowCount; //总页数
            this.setKeylistQuery.topItemcurrentPage = data.beginRow; //当前页
            this.setKeylistQuery.topItemPageSize = data.pageCapacity; //一页多少条
            this.topItemlistLoading = false;
          }, {
            teBddItemSetId: this.teBddItemSetId,
            itemKey: this.topItem,
            title: this.topItemTitle
          }, 1, null, 30)
        }
      },
      topItemAdd() { //新增--------------------------------------------ok
        if (this.teBddItemSetId) {
          this.visible.topItemdialogs = true;
          this.topItemTitles = "新增:TopItem";
          this.genre = 1;
          this.$refs['topItemTableData'].resetFields();
        } else {
          this.$message.warning("未取到Set Key");
        }
      },
      topItemvisit(row) { //setKey的游览-----------------------------------ok
        this.topItemruleForm = row; //付过去
        this.visible.visitTopItem = true;
        this.topItemTitles = "浏览:TopItem";
        this.genre = 0;
        this.$refs['topItemTableData'].resetFields();
      },
      topItemhandleClick(row) { //setKey的修改
        this.topItemruleForm = Object.assign({}, row);
        this.topItembackupsruleForm = Object.assign({}, row);
        this.genre = 2;
        this.visible.topItemdialogs = true;
        this.topItemTitles = "修改:TopItem";
        this.$refs['topItemTableData'].resetFields();
      },
      topItemdeleteRow(row) { //setKey的删除----------------------------ok
        this.$confirm('此操作将删除此TopItem, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          te.crud.do('sysAdmin_bdd_deleteTopItem', {
            teBddTopItemId: row.teBddTopItemId
          }, data => {
            this.$message.success(data.__msg);
            this.getTopItemList()
          }, err => {
            this.$message.warning(err.__msg);
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      topItemHandleChange(row) { //setKey的某一行被点击时该事件---------------ok
        this.TopItemPath = this.teBddItemsetKey + ":" + row.itemKey;
        te.bdd.queryItem('' + this.teBddItemsetKey + ":" + row.itemKey + '', data => { //获取默认列表
          if (data.subItems) {
            var datas = Object.assign({}, data); //赋值
            this.SubItemTree = datas.subItems;
          } else {
            this.SubItemTree = [];
          }
        }, false)
      },
      particularsFormchecked() { //默认触发
        this.nodeClick(this.SubItemTree[0]);
        this.$refs.SubItemTable.getCheckedKeys(this.SubItemTable[1]);
      },
      gettreeLists() { //---------------SubItem---------------------------------ok
        te.bdd.loadData('' + this.TopItemPath + '', data => { //获取默认列表
          if (data[0].subItems) {
            var datas = Object.assign({}, data); //赋值
            this.SubItemTree = datas[0].subItems;
             this.$nextTick(function () {
              this.particularsFormchecked(); //每次更新了数据，触发这个函数即可。
            });
          } else {
            this.SubItemTree = [];
          }
        }, false)
      },
      addNews() { //新增顶层SubItem-----------------------ok
        this.visible.addSubItemdialog = true;
        this.SubItemTitle = "新增:顶层SubItem";
        this.AddSubItemruleForm = {};
        this.genre = 1;
      },
      shift(node, data) { //移动
        this.nodeNuber = node.label;
        this.visible.shiftSubItemdialog = true;
      },
      amend(node, data) { //修改---------------ok
        this.genre = 2;
        this.visible.subItemdialog = true;
        this.SubItemTitle = "修改:SubItem";
        this.SubItemruleForm = Object.assign({}, data);
        this.SubItembackupsruleForm = Object.assign({}, data);
      },
      remove(node, data) { //删除------------------------ok
        this.$confirm('此操作将删除此SubItem, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          te.crud.do('sysAdmin_bdd_deleteSubItem', {
            path: data.path
          }, data => {
            this.$message.success(data.__msg);
            this.gettreeLists()
          }, err => {
            this.$message.warning(err.__msg)
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      append(node, data) { //新增同级--------------ok
        this.targetPath = data.path;
        this.genre = 1;
        this.visible.addSubItemdialog = true;
        this.SubItemTitle = "新增：同级SubItem";
      },
      sublevel(node, data) { //新增子集------------ok
        this.targetPath = data.path;
        this.genre = 1;
        this.visible.addSubItemdialog = true;
        this.SubItemTitle = "新增：子级SubItem";
      },
      nodeClick(node, data) { //行点击-----------------------------ok
        this.particularsForm = node;
      },
      nodeselect(node, data) { //选择模态框选择的节点---------------ok
        this.selectNuber = node.path; //把选到的附上去
      },
      shiftSubItemsubmitForm() { //移动节点模态框的确定
        if (!this.selectNuber) { //如果为选取节点
          this.$message.warning('请选择要移动到的节点'); //报错提示
        } else if (this.shiftType == "") {
          this.$message.warning('请选择移动目标同级or下级'); //报错提示
        } else {
          const ruleForm = {} //声明参数
          ruleForm.path = this.particularsForm.path; //赋值
          ruleForm.newPath = this.selectNuber; //赋值
          if (this.shiftType == 'POSITION_BROTHER') { //如果是这个参数
            ruleForm.position = te.bdd.constants.POSITION_BROTHER; //选取te.js里面的值
          } else {
            ruleForm.position = te.bdd.constants.POSITION_UNDER; //选取te.js里面的值
          }
          te.crud.do("sysAdmin_bdd_moveSubItem", ruleForm, data => { //请求接口
            this.visible.shiftSubItemdialog = false; //模态框消失
            this.nodeNuber = null; //清空
            this.selectNuber = null; //请空
            this.$message.success(data.__msg); //成功提示
            this.gettreeLists(); //从新请求列表
          }, err => {
            this.$message.warning(err.__msg); //报错提示
          })

        }
      },
    },
    watch: {

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
    {
    height: 450px;
    overflow: scroll;
    padding: 10px 0 10px 10px;
    &>h2 {
      font-size: 16px;
    }
  }

  .el-col-13,
  .el-col-11 {
    height: 390px;
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
