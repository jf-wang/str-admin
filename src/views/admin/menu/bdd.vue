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
            size="mini" @row-click="setKeyHandleChange"  height="290">
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
                <el-button @click="setKeyvisit(scope.row)" title="游览" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="setKeyhandleClick(scope.row)" title="修改" type="text" icon="el-icon-edit" style="color:#e67f05"></el-button>
                <el-button @click="setKeydeleteRow(scope.row)" title="删除" type="text" icon="el-icon-delete" style="color:#b20000"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="setKeyhandleSizeChange" @current-change="setKeyhandleCurrentChange" :current-page="setKeycurrentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="setKeyTotal" style="float:right;margin-top:10px">
          </el-pagination>
        </el-col>
        <el-col :span="12" style="border-left:5px solid #eeeeee;border-bottom:10px solid #eeeeee;">
          <h2>TopItem管理</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h2>SubItem管理</h2>
        </el-col>
        <el-col :span="12">
          <h2>SubItem详情</h2>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    itemSetLists
  } from "@/api/bdd";
  export default {
    name: "bdd",
    data() {
      return {
        setKey: "", //setKey的搜索内容
        setKeyTableData: [],//setKey的表格
        setKeylistLoading: false,//setKey的loading
        setKeycurrentPage: 1,//setKey的当前页
        setKeyTotal:40,//setKey的总页数
      };
    },
    created() {
      this.getSetLists()
    },
    mounted() {},
    computed: {

    },
    props: [],
    methods: {
      getSetLists() { //请求setKey下的列表
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

      },
      setKeyHandleChange(row) { //setKey的某一行被点击时该事件
        console.log(row)
      },
      setKeyvisit(row) { //setKey的游览

      },
      setKeyhandleClick(row) { //setKey的修改

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

  .el-col-12 {
    height: 450px;
    overflow: scroll;
    padding: 10px 0 10px 10px;
    &>h2 {
      font-size: 16px;
    }
  }


</style>
