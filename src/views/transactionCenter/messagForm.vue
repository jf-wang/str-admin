<template>
  <div id="messageForm">
    <el-form :model="logo" label-width="105px" ref="logo" class="form">
      <el-form-item label="标题 :" style="margin-bottom:0">
        <span>{{logo.headline}}</span>
      </el-form-item>
      <el-form-item label="内容 :" style="margin-bottom:0">
        <span>{{logo.matter}}</span>
      </el-form-item>
      <el-form-item label="附件 :" style="margin-bottom:0">
        <img :src="logo.dialogImageUrl" alt="" width="60px" height="60px">
      </el-form-item>
      <el-form-item label="重要性 :" style="margin-bottom:0">
        <span>{{logo.significance}}</span>
      </el-form-item>
      <el-form-item label="来源 :" style="margin-bottom:0">
        <span>{{logo.gender}}</span>
      </el-form-item>
      <el-form-item label="类别 :" style="margin-bottom:0" >
          <span>{{logo.section | sections}}</span>
      </el-form-item>
      <el-form-item label="发送人 :" style="margin-bottom:0">
        <span>{{logo.sender}}</span>
      </el-form-item>
      <el-form-item label="发送时间 :" style="margin-bottom:0">
        <span>{{logo.time}}</span>
      </el-form-item>
      <el-form-item label="邮件通知状态 :" style="margin-bottom:0">
        <span>{{logo.phone}}</span>
      </el-form-item>
      <el-form-item label="邮件发送时间 :" style="margin-bottom:0">
        <span>{{logo.nativePlace}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const sectionsOptions = [
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
    {value: '5-1',label: '结案'},
    {value: 6,label: '个人发送'}
  ]
  const sectionsKeyValue = sectionsOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label
      return acc
    }, {})
  export default {
    name: "messageForm",
    data() {
      return {

      };
    },
    created() {},
    mounted() {},
    computed: {

    },
    props: [
      'logo'
    ],
    methods: {

    },
    components: {},
    filters: {
      sections(type) {
        return sectionsKeyValue[type]
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

</style>
