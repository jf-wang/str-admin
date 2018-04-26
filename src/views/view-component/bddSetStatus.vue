<template>
  <el-table-column :prop="setKeyTableData" :bddItem="bddItem" :label="label" align="center" :formatter="formatter"></el-table-column>
</template>

<script>
  export default {
    // props: ['setKeyTableData', 'bddItem', 'label'],
    props: {
      setKeyTableData: {
        type: Array
      },
      bddItem: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        sectionsKeyValue: []
      }
    },
    created() {
      this.gelist()
    },
    computed: {

    },
    methods: {
      sss() {
        console.log(1)
      },
      gelist() {
        //获取对照数组
        te.bdd.loadData(this.bddItem, data => {
          this.sectionsKeyValue = data[0].subItems
        });
      },
      formatter(row, column, cellValue, index) {
         console.log(this.props)
        if (column.label == '状态') {
          if (row.setStatus) {
            for (var i = 0; i < this.sectionsKeyValue.length; i++) {
              if (row.setStatus == this.sectionsKeyValue[i].key) {
                return this.sectionsKeyValue[i].title
              }
            }
          } else {
            return "-"
          }
        } else if (column.label == '缓存类型') {
          if (row.cacheType) {
            for (var i = 0; i < this.sectionsKeyValue.length; i++) {
              if (row.cacheType == this.sectionsKeyValue[i].key) {
                return this.sectionsKeyValue[i].title
              }
            }
          } else {
            return "-"
          }
        }
      },

    },
  }

</script>
