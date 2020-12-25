<template>
  <Layout>
    <div style="min-height: 600px">
      <div v-if="$page.postsAll.edges && $page.postsAll.edges.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in $page.postsAll.edges"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link
                    style="text-decoration: none; cursor: pointer"
                    :to="`/post/${item.node.id}`"
                  >
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </g-link>
                </span>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ dayjs(item.node.updated_at, "YYYY-MM-DD HH:mm:ss") }}
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
        </el-card>

        <div style="text-align: center">
          <Pager :info="$page.postsAll.pageInfo" />
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
        v-if="!$page.postsAll.edges || $page.postsAll.edges.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query ($page:Int) {
  postsAll:allStrapiPost(perPage:1,page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
        id
        title
        content
        published_at
        updated_at
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  name: "PostList",
  components: { Pager },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>