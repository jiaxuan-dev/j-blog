<template>
  <div>
    <BlogHeader />
    <BlogSidebar> <slot /></BlogSidebar>
    <BlogFooter />
  </div>
</template>

<script>
import BlogHeader from "./Header";
import BlogFooter from "./Footer";
import BlogSidebar from "./Sidebar";
export default {
  name: "DefaultLayout",
  components: { BlogHeader, BlogFooter, BlogSidebar },
};
</script>

<style>
</style>