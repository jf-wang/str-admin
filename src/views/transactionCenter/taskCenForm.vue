<template>
  <div id="messageForm">
    <el-form :model="logo" label-width="105px" ref="logo" class="form">
      <!-- <div class="dialogH">基础</div> -->
      <el-form-item label="标题 :" style="margin-bottom:0">
        <span>{{logo.headline}}</span>
      </el-form-item>
      <el-form-item label="类别 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <div class="dialogH">执行</div>
      <el-form-item label="执行人 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="状态 :" style="margin-bottom:0">
        <span>{{logo.significance | significances}}</span>
      </el-form-item>
      <el-form-item label="当前状态描述 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="状态更新时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="执行人部门 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="实际开始时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="实际结束时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <div class="dialogH">分派</div>
      <el-form-item label="分派人 :" style="margin-bottom:0">
        <span>{{logo.sender}}</span>
      </el-form-item>
      <el-form-item label="描述 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="重要性 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="分派时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="预期开始时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="预期开始时间 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
      <div class="dialogH">日志</div>
      <el-form-item label="任务日志 :" style="margin-bottom:0">
        <span>{{logo.section | sections}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script> 
const sectionsOptions = [
  { value: "1", label: "系统任务" },
  { value: "1-1", label: "营销" },
  { value: "1-1-1", label: "销售任务" },
  { value: "1-2", label: "实施" },
  { value: "1-2-1", label: "项目实施" },
  { value: "1-3", label: "客服" },
  { value: "1-3-1", label: "客服追踪" },
  { value: "2", label: "普通任务" },
  { value: "2-1", label: "行政管理" },
  { value: "2-2", label: "营销" },
  { value: "2-3", label: "实施" },
  { value: "2-4", label: "客服" },
  { value: "2-5", label: "其他" }
];
const conditionlists = [
  { key: 0, label: "全部" },
  { key: 1, label: "已分派(尚未开始)" },
  { key: 2, label: "进行中(期限内)" },
  { key: 3, label: "进行中(已超时)" },
  { key: 4, label: "暂停" },
  { key: 5, label: "已完成(按时)" },
  { key: 6, label: "已完成(超时)" },
  { key: 7, label: "取消(分派人停止)" },
  { key: 8, label: "进行中(执行人放弃)" },
  { key: 9, label: "进行中(其他)" }
];
const sectionsKeyValue = sectionsOptions.reduce((acc, cur) => {
  acc[cur.value] = cur.label;
  return acc;
}, {});
const significancesKeyValue = conditionlists.reduce((acc, cur) => {
  acc[cur.key] = cur.label; 
  return acc;
}, {});
export default {
  name: "messageForm",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  props: ["logo"],
  methods: {},
  components: {},
  filters: {
    sections(type) {
      return sectionsKeyValue[type];
    },
    significances(type) {
      return significancesKeyValue[type];
    }
  } 
};
</script>

<style lang="scss" scoped>
.form {
  span {
    display: block;
    border-bottom: 1px solid #dddddd;
    height: 35px;
  }
}

.dialogH {
  border-left: 3px solid #b20000;
  margin: 15px 0;
  padding-left: 10px;
  font-size: 16px;
  border-bottom: 1px solid #eeeeee;
}

.dialogH:nth-child(1) {
  margin-top: 0;
}
</style>
