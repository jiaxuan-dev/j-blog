<template>
  <div>
    <Layout>
      <el-card
        shadow="never"
        style="min-height: 400px; margin-bottom: 20px"
      >
        <div slot="header" class="clearfix">
          <span>{{$page.gitHubUser.login }}</span>
          <el-button
            @click="$router.go(-1)"
            style="float: right; padding: 3px 0"
            type="text"
            icon="el-icon-d-arrow-left"
            >返回</el-button
          >
        </div>
        <el-row>
          <el-col :span="9" style="padding: 0px 10px 20px 0px">
            <img
              :src="$page.gitHubUser.avatar_url"
              style="width: 100%; border-radius: 5px"
            />
            <div style="padding: 10px">
              <font
                style="font-size: 26px; line-height: 40px; font-weight: 600"
                >{{ $page.gitHubUser.name }}
                <br />
              </font>
              <font
                style="
                  font-size: 20px;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 35px;
                  color: #666;
                "
                >{{ $page.gitHubUser.login }}
                <br />
              </font>
              <font
                style="font-size: 14px; line-height: 20px; color: #606266"
              >
                <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{
                  $page.gitHubUser.location
                }}
                <br />
              </font>
              <font
                style="font-size: 14px; line-height: 20px; color: #606266"
              >
                <i class="el-icon-message"></i>&nbsp;&nbsp;{{ $page.gitHubUser.email }}
                <br />
              </font>
              <font
                style="font-size: 14px; color: #606266"
              >
                <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                <a :href="addHttp($page.gitHubUser.blog)" target="_blank">{{
                  $page.gitHubUser.blog
                }}</a>
                <br />
              </font>
            </div>
          </el-col>
          <el-col :span="15" style="padding: 0px 20px 20px 10px">
            <div
              style="
                width: 100%;
                min-height: 300px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
                padding: 10px;
                font-size: 16px;
                color: #6a737d;
              "
              v-if="$page.gitHubUser.bio"
            >
              {{ $page.gitHubUser.bio }}
            </div>
            <div
              style="
                width: 100%;
                min-height: 300px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
                padding: 30px;
                text-align: center;
                font-size: 30px;
                color: #dddddd;
              "
              v-else
            >
              <b>◔ ‸◔？没有简介</b>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </Layout>
  </div>
</template>
<page-query>
query($id:ID!){
  gitHubUser(id:$id){
    id
    login
    location
    avatar_url
    name
    location
    blog
    bio
    email
  }
}

</page-query>
<script>
export default {
  name: "GitHubUser",
  data() {
    return {
      // userInfo: null,
      // loading: false,
    };
  },
  // async mounted() {
  //   // console.log(this.$route.query.username);
  //   this.loading = true;
  //   const { data: thisUserInfo } = await axios.get(
  //     `https://api.github.com/users/${this.$route.query.username}`
  //   );
  //   // console.log()
  //   this.userInfo = thisUserInfo;

  //   this.loading = false;
  // },
  methods: {
    addHttp(url) {
      return (url.match(/https?:\/\//i) ? "" : "https://") + url;
    },
  },
};
</script>

<style>
</style>