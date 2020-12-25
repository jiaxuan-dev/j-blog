<template>
  <div>
    <Layout>
      <div style="min-height: 600px">
        <el-card shadow="never" style="min-height: 400px">
          <div slot="header">
            <el-row>
              <el-col :span="12">
                <span>{{ $page.gitHubProject.name }}</span>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <!-- <el-button
                    @click="$share()"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                    >分享</el-button
                  > -->
                  <el-button
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                  >
                    <a
                      :href="addHttp($page.gitHubProject.html_url)"
                      target="_blank"
                      >前往GitHub</a
                    >
                  </el-button>
                  <el-button
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-more-outline"
                  >
                    <g-link to="/projects"> 更多项目 </g-link>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            发布
            {{ dayjs($page.gitHubProject.pushed_at, "YYYY-MM-DD HH:mm:ss") }}
            <br />
            更新
            {{ dayjs($page.gitHubProject.updated_at, "YYYY-MM-DD HH:mm:ss") }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              line-height: 1.5;
              color: #303133;
              padding: 20px 0px 0px 0px;
            "
          >
            {{ $page.gitHubProject.description }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              color: #303133;
              padding: 15px 0px 15px 0px;
              border-bottom: 1px solid #e4e7ed;
            "
          >
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + $page.gitHubProject.stargazers_count"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ $page.gitHubProject.stargazers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + $page.gitHubProject.watchers_count"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ $page.gitHubProject.watchers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + $page.gitHubProject.forks_count"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ $page.gitHubProject.forks_count }}
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-tag
                  size="small"
                  type="danger"
                  v-if="$page.gitHubProject.license"
                  >{{ $page.gitHubProject.license.spdx_id }}</el-tag
                >
                <el-tag size="small" type="success">{{
                  $page.gitHubProject.language
                }}</el-tag>
              </el-col>
            </el-row>
          </div>
          <div
            v-html="htmlStr"
            v-if="$page.gitHubProject.readme"
            class="markdown-body"
            style="padding-top: 20px"
          ></div>
          <div
            v-if="!$page.gitHubProject.readme"
            style="padding: 20px 0px 20px 0px; text-align: center"
          >
            <font style="font-size: 30px; color: #dddddd">
              <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
            </font>
          </div>
        </el-card>
      </div>
    </Layout>
  </div>
</template>

<page-query>
query($id:ID!){
  gitHubProject(id:$id){
    		id
        name
        html_url
        pushed_at
        updated_at
        description
        stargazers_count
        forks_count
        watchers_count
        language
        license{
          spdx_id
        },
        readme{
          type
          content
        }    
  }
}
</page-query>

<script>
export default {
  computed: {
    htmlStr() {
      return this.MarkdownIt(
        this.base64(this.$page.gitHubProject.readme.content)
      )
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
    },
  },
  methods: {
    addHttp(url) {
      return (url.match(/https?:\/\//i) ? "" : "https://") + url;
    },
    base64(base64) {
      return window.atob(base64);
    },
  },
};
</script>

<style>
</style>