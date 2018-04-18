<template>
  <div class="header">
    <div class="header-button is-left">
      <top-logo></top-logo>
    </div>
    <h1 class="header-title">
      <!-- <topMenu></topMenu> -->
      {{userInfo.username}} | {{userInfo.username}}
    </h1>
    <div class="header-button is-right" style="cursor: pointer;color:white">
      <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
        <span class="header-item">
          <el-badge :value="12" :max="10" class="item">
            <img src="../../../assets/img/4xiaoxi.png" alt="" width="15px" height="16px">
          </el-badge>
          <span class="fs16">消息</span>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
        <span class="header-item">
          <img src="../../../assets/img/5mima.png" alt="" width="15px" height="16px">
          <span style="font-size: 14px;line-height: 18px;">修改密码</span>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出" placement="bottom" @click.native="logout">
        <span class="header-item">
          <img src="../../../assets/img/6tuichu.png" alt="" width="15px" height="16px">
          <span style="font-size: 14px;line-height: 18px;">退出</span>
        </span>
      </el-tooltip>
      <!-- <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
        <span class="header-item">
          <top-lock></top-lock>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
        <span class="header-item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'" @click="handleScreen"></i>
        </span>
      </el-tooltip> -->

      <!-- <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
        <img class="header-userImg" :src="userInfo.avatar">
      </el-tooltip> -->
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  import {
    fullscreenToggel,
    listenfullscreen
  } from "@/util/util";
  import topLogo from "./top-logo";
  import topLock from "./top-lock";
  import topMenu from "./top-menu";
  export default {
    components: {
      topLock,
      topLogo,
      topMenu
    },
    name: "top",
    data() {
      return {};
    },
    filters: {},
    created() {},
    mounted() {
      listenfullscreen(this.setScreen);
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      ...mapGetters(["isFullScren"])
    },
    methods: {
      handleScreen() {
        fullscreenToggel();
      },
      setScreen() {
        this.$store.commit("SET_FULLSCREN");
      },
      logout() {
        this.$confirm("是否退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$store.dispatch("LogOut").then(() => {
            this.$router.push({
              path: "/login"
            });
          });
        }).catch(function () {});
      }
    }
  };

</script>

<style lang="scss" scoped>
  .fs16 {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    line-height: 18px;
  }

</style>
