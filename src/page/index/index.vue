<template>
  <div class="pull-height animated" :class="{'zoomOutUp': isLock}">
    <top></top>
    <div class="index">
      <!-- <sidebar class="left pull-chheight"></sidebar> -->
      <el-menu unique-opened :default-active="tag.value" class="left pull-chheight el-menu-vertical-demo" background-color="#444444"
        text-color="#eeeeee" active-text-color="#fff" :collapse="isCollapse">
        <div class="menu-wrapper">
          <template v-for="(item,index) in menu">
            <el-menu-item v-if="item.children.length===0 " :index="filterPath(item.href,index)" @click="open(item)" :key="item.label">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu v-else :index="filterPath(item.name,index)" :key="item.name">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
              </template>
              <template v-for="(child,cindex) in item.children">
                <el-menu-item :index="filterPath(child.href,cindex)" @click="open(child)" v-if="child.children.length==0" :key="cindex">
                  <i :class="child.icon"></i>
                  <span slot="title">{{child.label}}</span>
                </el-menu-item>
                <el-menu-item :index="filterPath(child.href,cindex)" @click="open(child)" v-else :key="cindex">
                  <i :class="child.icon"></i>
                  <span slot="title">{{child.label}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </div>
      </el-menu>
      <el-menu unique-opened :default-active="tag.value" v-if="fangkai" class="levelMenu pull-chheight el-menu-vertical-demo"
        background-color="#eeeeee" text-color="#363636" active-text-color="#363636" :collapse="isCollapse" style="position: relative;width:12px;border-right:none">
        <img src="../../assets/img/19xiangyoushouqi.png" alt="" width="12px" height="53px" class="shou" @click="fang">
      </el-menu>
      <el-menu unique-opened :default-active="tag.value" v-if="levelMenuTrue" class="levelMenu pull-chheight el-menu-vertical-demo"
        background-color="#dddddd" text-color="#363636" active-text-color="#363636" :collapse="isCollapse" style="position: relative;">
        <div class="menu-wrapper">
          <template v-for="(item,index) in levelMenu">
            <el-menu-item :index="filterPath(item.href,index)" @click="open2(item)" :key="item.label">
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </template>
        </div>
        <img src="../../assets/img/18xiangzuoshouqi.png" alt="" width="12px" height="53px" class="shou" @click="shou">
      </el-menu>
      <div class="right">
        <!-- <tags ref="nav" class="nav"></tags> -->
        <router-view class="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import tags from "./tags";
  import top from "./top/";
  import sidebar from "./sidebar/";
  import MENU from "@/mock/menu";
  import { setUrlPath } from "@/util/util";
  import {resolveUrlPath} from "@/util/util";
  export default {
    components: {
      top,
      tags,
      sidebar
    },
    name: "index",
    data() {
      return {
        levelMenu: [],
        levelMenuTrue: false,
        fangkai:false
      };
    },
    created() {
      this.$store.dispatch("GetMenu").then(data => {});
    },
    mounted() {},
    computed: {
      ...mapGetters(["isLock", "menu", "tag", "isCollapse"]),
      nowTagValue: function () {
        return setUrlPath(this.$route);
      }
    },
    props: [],
    methods: {
      filterPath(path, index) {
        return path == null ? index + "" : path;
      },
      open(item) {//二级菜单点击的时候
        if (item.children.length == 0) {//如果没有三级菜单的
          this.levelMenu = [];//三级菜单设为空
          this.levelMenuTrue = false;//三级菜单不显示
          this.$router.push({//跳转路由
            path: resolveUrlPath(item.href, item.label),
            query: item.query
          });
        } else {//如果有三级菜单
          this.levelMenu = item.children;//付给三级菜单数组
          this.levelMenuTrue = true;//三级菜单菜单显示出来
          this.fangkai=false;//放开按钮消失掉
        }
      },
      open2(item) {//三级菜单的点击事件，直接跳转路有
        this.$router.push({
          path: resolveUrlPath(item.href, item.label),
          query: item.query
        });
      },
      shou(){//点击收起三级菜单
        this.levelMenuTrue=false;//三级菜单消失
        this.fangkai=true;//放开按钮显示出来
      },
      fang(){//点击放开三级菜单
        this.levelMenuTrue=true;//三级菜单显示出了
        this.fangkai=false;//放开按钮消失
      }
    }
  };

</script>

<style lang="scss" scoped>
  .display,
  .display+.el-submenu__icon-arrow {
    display: none;
  }

  .index {
    display: flex;
    height: calc(100% - 60px);
    padding: 0 0 20px 0;
    position: relative;
    min-height: 100%;
    background: #fff;
    overflow: hidden;
    .left:not(.el-menu--collapse) {
      width: 200px;
      overflow-y: auto;
    }
    .levelMenu:not(.el-menu--collapse) {
      width: 200px;
      overflow-y: auto;
    }
    .right {
      position: relative;
      background: #eeeeee;
      flex: 1;
      box-sizing: border-box;
       overflow: scroll;
    }
    .main {
      // overflow-y: scroll;
    }
    .nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
    }
    .is-active {
      background-color: #555555 !important;
    }
    .levelMenu .is-active {
      background-color: #eeeeee !important;
    }
    .levelMenu .el-menu-item {
      height: 36px;
      line-height: 36px;
    }
    .shou{
      position: absolute;
      right: 0;
      top: 45%;
      cursor: pointer;
    }
  }

</style>
