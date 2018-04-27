<template>
  <el-table-column :prop="bdd_key" :indexes="bdd_key" :bddItem="bddItem" :label="label" align="center" :formatter="formatter"></el-table-column>
</template>
<script>
  export default {
    props: ['bddItem', 'label', 'bdd_key', 'indexes'],
    data() {
      return {
        sectionsKeyValue: []
      }
    },
    created() {
      this.gelist()
    },
    methods: {
      gelist() { 
        //获取对照数组
        te.bdd.loadData(this.bddItem, data => {
          this.sectionsKeyValue = data[0].subItems
        });
      },
      formatter(row, column) {
        if (row[this.indexes]) {
          for (var i = 0; i < this.sectionsKeyValue.length; i++) {
            if (row[this.indexes] == this.sectionsKeyValue[i].key) {
              return this.sectionsKeyValue[i].title
            }
          }
        } else {
          return "-"
        }
      },
    },
  }
</script>
