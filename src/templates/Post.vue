<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ $page.post.title }}</span>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ dayjs($page.post.published_at, "YYYY-MM-DD HH:mm:ss") }}
          <br />
          更新 {{ dayjs($page.post.updated_at, "YYYY-MM-DD HH:mm:ss") }}
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
            $page.post.description
          }}</pre>
        </div>
        <div
          v-html="MarkdownIt($page.post.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id:ID!) {
  post:strapiPost (id:$id) {
    title
    content
    description
    published_at
    updated_at
  }
}
</page-query>
<script>
export default {};
</script>

<style>
</style>