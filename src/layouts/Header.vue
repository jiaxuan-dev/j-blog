<template>
  <el-header>
    <div>
      <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
        <el-tooltip
          effect="dark"
          :content="fullButton.full ? '退出' : '全屏'"
          placement="bottom-end"
        >
          <el-button
            @click="full"
            :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <h1 class="projectName">贾轩</h1>
      <h2 class="projectTagline">欢迎来到贾轩的个人博客</h2>
      <a class="btn" href="https://github.com/jiaxuan-dev" target="_blank">GitHub主页</a>
      <a class="btn" href="" target="_blank">博客源码</a>
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
          item.top +
          'px; left:' +
          item.left +
          'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
    </div>
    <div
      :style="{
        position: 'relative',
        zIndex: '2',
        margin: 'auto',
        marginTop: '-30px',
        width: '64rem',
        top: '93px',
      }"
    >
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :default-active="topbar.active"
              mode="horizontal"
              menu-trigger="click"
            >
              <el-submenu index="#more">
                <template slot="title">了解博主</template>
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>
              <el-submenu index="#webSites" v-if="webSites.length > 0">
                <template slot="title">其他网站</template>
                <el-menu-item
                  :index="'#webSites-' + index"
                  v-for="(item, index) in webSites"
                  :key="'#webSites' + index"
                  >{{ item.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col
            :span="8"
            style="text-align: center; padding: 12px 0px 0px 10px"
          >
          </el-col>
          <el-col :span="4" style="text-align: right">
            <div style="font-size: 20px; color: #606266; margin-top: 5px">
              <b>{{ githubUsername }}</b>
            </div>
            <div style="color: #606266">
              <i class="el-icon-location"></i>&nbsp;{{
                location ? location : "未填写地址"
              }}
              <br />
            </div>
          </el-col>
          <el-col :span="2" style="text-align: center">
            <img
              v-popover:bigAvatar
              :src="avatarUrl"
              style="
                margin-top: 4px;
                margin-right: 10px;
                width: 52px;
                height: 52px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
              "
            />
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              :title="githubUsername"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;{{ name }}
              <br />
              <i class="el-icon-location"></i>&emsp;{{ location }}
              <br />
              <img :src="avatarUrl" style="width: 200px; height: 200px" />
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      randomIcon: [],
      fullButton: {
        full: false,
      },
      topbar: {
        active: "",
      },
      webSites: [
        {
          name: "realworld",
          url: "117.50.61.66:3000",
        },
      ],
      avatarUrl:
        "https://pic1.zhimg.com/80/v2-cc767b58ef34dc707c8eca2406f41bf3_720w.jpg?source=1940ef5c",
      githubUsername: "jiaxuan-dev",
      name: "贾轩",
      location: "北京",
    };
  },
  mounted() {
    let width = window.innerWidth;
    for (let i = 0; i < 12; i++) {
      let temp = {};
      let left = this.randomInt(10, width - 310);
      if (left > width / 2 - 150) {
        left += 300;
      }
      temp["left"] = left;
      temp["top"] = this.randomInt(20, 300);
      temp["size"] = this.randomInt(20, 40);
      this.randomIcon.push(temp);
    }
  },
  methods: {
    selectTopbar(index) {
      //取消菜单选中状态
      this.topbar.active = this.topbar.active == "" ? " " : "";
      switch (index) {
        case "#githubHome":
          window.open("https://github.com/" + this.githubUsername);
          break;
        case "#blog":
          if (this.blog) {
            window.open(
              (this.blog.match(/https?:\/\//i) ? "" : "https://") + this.blog
            );
          } else {
            this.$message({
              message: "博主没有其他博客",
              type: "info",
            });
          }
          break;
        default:
          if (/#webSites-\d+/.test(index)) {
            let i = parseInt(index.split("-")[1]);
            let url = this.webSites[i].url;
            window.open((url.match(/https?:\/\//i) ? "" : "https://") + url);
          }
          break;
      }
    },
    moveIcon(index) {
      let width = window.innerWidth;
      this.randomIcon[index]["top"] = this.randomInt(20, 300);
      let left = this.randomInt(10, width - 310);
      if (left > width / 2 - 150) {
        left += 300;
      }
      this.randomIcon[index]["left"] = left;
    },
    randomInt(s, e) {
      let d = e - s;
      if (d < 0) {
        return s;
      }
      let r = Math.random() * d + s;
      r = parseInt(r, 10);
      return r;
    },
    full() {
      if (!this.fullButton.full) {
        this.fullScreen();
        this.fullButton.full = true;
      } else {
        this.fullExit();
        this.fullButton.full = false;
      }
    },
    fullScreen() {
      var element = document.documentElement;
      if (window.ActiveXObject) {
        var WsShell = new ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
      } else if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      }
    },
    fullExit() {
      var element = document.documentElement;
      if (window.ActiveXObject) {
        var WsShell = new ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
      } else if (element.requestFullScreen) {
        document.exitFullscreen();
      } else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
      } else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
      } else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      }
    },
  },
};
</script>

<style scope>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
.btn {
  margin-left: 1rem;
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: hsla(0, 0%, 100%, 0.7);
  background-color: hsla(0, 0%, 100%, 0.08);
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}
.projectTagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 400;
  opacity: 0.7;
}
.projectName {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}
.el-header {
  background-image: linear-gradient(
    120deg,
    rgb(38, 144, 249),
    rgb(252, 45, 45)
  );
  color: rgb(255, 255, 255);
  text-align: center;
  height: 22.91rem !important;
  padding: 5rem 6rem !important;
}
</style>
