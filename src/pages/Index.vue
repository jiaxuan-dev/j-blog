<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ lastPost.node.title }}</span>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ dayjs(lastPost.node.published_at, "YYYY-MM-DD HH:mm:ss") }}
          <br />
          更新 {{ dayjs(lastPost.node.updated_at, "YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{
            lastPost.node.description
          }}</pre>
        </div>
        <div
          v-html="MarkdownIt(lastPost.node.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query{
  posts:allStrapiPost(sortBy: "updated_at", order: DESC){
    edges{
      node{
        id
        title
        content
        description
        published_at
        updated_at
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: "贾轩",
  },
  name: "Index",
  computed: {
    lastPost() {
      return this.$page.posts.edges[0];
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
