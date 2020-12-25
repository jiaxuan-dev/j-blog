<template>
  <div>
    <Layout>
      <div style="min-height: 600px">
        <div v-if="$page.projects.edges && $page.projects.edges.length > 0">
          <template v-for="(item, index) in $page.projects.edges">
            <el-card
              shadow="hover"
              :key="'pro' + index"
              style="margin-bottom: 20px"
            >
              <div slot="header">
                <el-row>
                  <el-col :span="16">
                    <span>
                      <g-link
                        :to="`/githubproject/${item.node.id}`"
                        style="text-decoration: none; cursor: pointer"
                      >
                        <i class="el-icon-service"></i>&nbsp;&nbsp;
                        {{ item.node.name }}
                      </g-link>
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <div style="text-align: right">
                      <el-button
                        style="padding: 3px 0"
                        type="text"
                        icon="el-icon-back"
                        ><a
                          :href="item.node.html_url"
                          target="_blank"
                          style="text-decoration: none; cursor: pointer"
                          >前往GitHub</a
                        ></el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
                最近更新
                {{ dayjs(item.node.updated_at, "YYYY-MM-DD HH:mm:ss") }}
              </div>
              <div
                style="
                  font-size: 1.1rem;
                  line-height: 1.5;
                  color: #303133;
                  padding: 10px 0px 0px 0px;
                "
              >
                {{ item.node.description }}
              </div>
              <div
                style="
                  font-size: 1.1rem;
                  color: #303133;
                  padding: 10px 0px 0px 0px;
                "
              >
                <el-row>
                  <el-col :span="16" style="padding-top: 5px">
                    <el-tooltip
                      effect="dark"
                      :content="'star ' + item.node.stargazers_count"
                      placement="bottom"
                    >
                      <i
                        class="el-icon-star-off"
                        style="margin: 0px 5px 0px 0px"
                      ></i>
                    </el-tooltip>
                    {{ item.node.stargazers_count }}
                    <el-tooltip
                      effect="dark"
                      :content="'watch ' + item.node.watchers_count"
                      placement="bottom"
                    >
                      <i
                        class="el-icon-view"
                        style="margin: 0px 5px 0px 15px"
                      ></i>
                    </el-tooltip>
                    {{ item.node.watchers_count }}
                    <el-tooltip
                      effect="dark"
                      :content="'fork ' + item.node.forks_count"
                      placement="bottom"
                    >
                      <i
                        class="el-icon-bell"
                        style="margin: 0px 5px 0px 15px"
                      ></i>
                    </el-tooltip>
                    {{ item.node.forks_count }}
                  </el-col>
                  <el-col :span="8" style="text-align: right">
                    <el-tag
                      size="small"
                      type="danger"
                      v-if="item.node.license"
                      >{{ item.node.license.spdx_id }}</el-tag
                    >
                    <el-tag
                      v-if="item.node.language"
                      size="small"
                      type="success"
                      >{{ item.node.language }}</el-tag
                    >
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </template>
          <div style="text-align: center">
            <Pager :info="$page.projects.pageInfo" />
            <!-- <el-pagination
            @current-change="list"
            background
            layout="prev, pager, next"
            :current-page.sync="$page.postsAll.pageInfo.currentPage"
            :page-size="1"
            :total="$page.postsAll.pageInfo.totalPages"
          >
          </el-pagination> -->
          </div>
        </div>

        <el-card
          shadow="never"
          style="
            margin-bottom: 20px;
            padding: 20px 0px 20px 0px;
            text-align: center;
          "
          v-if="!$page.projects.edges && $page.projects.edges.length <= 0"
        >
          <font style="font-size: 30px; color: #dddddd">
            <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </el-card>
      </div>
    </Layout>
  </div>
</template>
<page-query>
query($page:Int){
  projects: allGitHubProject(perPage:1,page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
        id
        name
        stargazers_count
        watchers_count
        forks_count
        updated_at
        language
        pushed_at
        description
        html_url
        license{
          spdx_id
        },
      }
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome";
export default {
  name: "Project",
  components: { Pager },
  data() {
    return {
      searchKey: "",
    };
  },
  methods: {},
};
</script>

<style>
</style>