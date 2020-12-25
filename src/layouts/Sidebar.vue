<template>
  <div class="main-content">
    <el-row>
      <el-col :span="6" style="padding-right: 10px">
        <el-card shadow="never">
          <el-menu>
            <el-menu-item
              v-for="item in constantRouterMap"
              :key="item.path"
              :index="item.path"
            >
              <i :class="item.icon"></i>
              <g-link :to="item.path" slot="title">{{ item.title }}</g-link>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="18" style="padding-left: 10px">
        <slot />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      constantRouterMap: [
        {
          title: "最新动态",
          icon: "el-icon-star-off",
          path: "/",
        },
        {
          title: "社交圈",
          icon: "el-icon-mobile-phone",
          path: "/social",
        },
        {
          title: "博客列表",
          icon: "el-icon-edit-outline",
          path: "/postList",
        },
        {
          title: "开源项目",
          icon: "el-icon-service",
          path: "/projects",
        },
      ],
    };
  },
};
</script>

<style>
.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
}
</style>