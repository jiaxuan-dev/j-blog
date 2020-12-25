<template>
  <div class="foot">
    <div
      style="
        border-top: 1px #e1e4e8 solid !important;
        padding: 45px 0px 45px 0px;
      "
    >
      <el-row>
        <el-col :span="10">
          <div>
            © 2020 jiaxuan-dev&emsp;&emsp;
            <a href="https://github.com/jiaxuan-dev" target="_blank">Profile</a
            >&emsp;&emsp;
            <!-- <a href="https://github.com/jiaxuan-dev/j-blog" target="_blank"
              >j-blog</a
            > -->
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: center; font-size: 18px">
            <i class="el-icon-location-outline"></i>
          </div>
        </el-col>
        <el-col :span="10">
          <div style="float: right">
            <a href="https://www.gridsome.cn/" target="_blank">Gridsome</a
            >&emsp;&emsp;
            <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a
            >&emsp;&emsp;
            <a href="http://element.eleme.io/" target="_blank">Element</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
a {
  text-decoration: none;
  color: #1e6bb8;
}
</style>