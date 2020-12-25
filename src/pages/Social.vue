<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane
          :label="'粉丝 ' + $page.followers.edges.length"
          name="followers"
          style="padding: 5px"
        >
          <div>
            <div v-if="$page.followers.edges.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in $page.followers.edges"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="`githubuser/${item.node.id}`"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.login }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <!-- <div style="text-align: center; margin-top: 10px">
                <Pager :info="$page.followings.pageInfo" />
              </div> -->
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="'关注 ' + $page.followings.edges.length"
          name="following"
          style="padding: 5px"
        >
          <div>
            <div v-if="$page.followings.edges.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in $page.followings.edges"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="`githubuser/${item.node.id}`"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.login }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <!-- <div style="text-align: center; margin-top: 10px">
                <Pager :info="$page.followers.pageInfo" />
              </div> -->
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>

<page-query>
query{
  followings:allGitHubFollowing{
    edges{
      node{
        id
        login
        node_id
        avatar_url
        gravatar_id
        url
        html_url
        followers_url
        following_url
        gists_url
        starred_url
        subscriptions_url
        organizations_url
        repos_url
        events_url
        type
        site_admin
      }
    }
  }
  
 followers: allGitHubFollowers{
    edges{
      node{
        id
        login
        node_id
        avatar_url
        gravatar_id
        url
        html_url
        followers_url
        following_url
        gists_url
        starred_url
        subscriptions_url
        organizations_url
        repos_url
        events_url
        type
        site_admin
      }
   }
  }
}

</page-query>

<script>
// import { Pager } from "gridsome";
export default {
  // components: { Pager },
  metaInfo: {
    title: "Social",
  },
  data() {
    return {
      activeTab: "following",
    };
  },
};
</script>
