<template>
  <div class="pagination-container" style="float:right;margin-top:10px">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currentPage"
 :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total,sizes, prev, pager, next, jumper" :total="total">

    </el-pagination>
  </div>
</template>

<script>
  export default{
    props: [ 'handleSizeChange', 'handleCurrentChange', 'listQuery', 'total']
  }
</script>
