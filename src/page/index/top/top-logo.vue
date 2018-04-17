<template>
  <div class="pull-auto">
    <div class="logo">
      <span class="logo_title is-bold">思特瑞管理平台</span>
      <span class="logo_subtitle">这里放logo</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-logo",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.logo {
  display: flex;
  align-items: center;
}
.logo_title {
  padding: 0 8px 0 0;
  color: #409eff;
  font-size: 28px;
  font-style: italic;
  &.is-bold {
    font-weight: 700;
  }
}
.logo_subtitle {
  padding-top: 5px;
}
</style>