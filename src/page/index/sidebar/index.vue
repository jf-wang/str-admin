<template>
  <el-menu unique-opened :default-active="tag.value" class="el-menu-vertical-demo" background-color="#495060" text-color="#c9cbd0" active-text-color="#fff" :collapse="isCollapse">
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
</template>

<script>
  import MENU from "@/mock/menu";
  import { setUrlPath } from "@/util/util";
  import { mapGetters } from "vuex";
  import SidebarItem from "./sidebarItem";
  import {resolveUrlPath} from "@/util/util";

  export default {
    data() {
      return {

      };
    },
    created() {
      this.$store.dispatch("GetMenu").then(data => {});
    },
    computed: {
      ...mapGetters(["menu", "tag", "isCollapse"]),
      nowTagValue: function () {
        return setUrlPath(this.$route);
      }
    },
    mounted() {},
    methods: {
      filterPath(path, index) {
        return path == null ? index + "" : path;
      },
      open(item) {
        if (item.children.length == 0) {
          this.$router.push({
            path: resolveUrlPath(item.href, item.label),
            query: item.query
          });
        } else {
          console.log(item.children)
        }
      }
    },
    components: {
      SidebarItem
    }
  };

</script>
<style lang="scss" scoped>
  .display,
  .display+.el-submenu__icon-arrow {
    display: none;
  }

</style>
