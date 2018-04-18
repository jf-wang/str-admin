<template>
  <div class="pull-auto">
    <div class="logo">
      <span class="logo_subtitle"><img src="../../../assets/img/3xiaologo.png" alt=""></span>
       <span class="logo_title is-bold">在线运维管理系统</span>
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
  margin-left: 30px;
}
.logo_title {
  padding: 0px 8px 0 20px;
  color: white;
  font-size: 18px;
}
.logo_subtitle {
  padding-top: 5px;
}
</style>