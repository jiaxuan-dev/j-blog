// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
const userUrlArr = []
module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const master = addCollection('masterGitHub')
    const user = addCollection('GitHubUser')
    const project = addCollection('GitHubProject')
    const followers = addCollection('GitHubFollowers')
    const following = addCollection('GitHubFollowing')
    const [masterGitHub, GitHubProjects, GitHubFollowers, GitHubFollowings] = await Promise.all([
      axios.get(`https://api.github.com/users/jiaxuan-dev`),
      axios.get(`https://api.github.com/users/jiaxuan-dev/repos`),
      axios.get(`https://api.github.com/users/jiaxuan-dev/followers`),
      axios.get(`https://api.github.com/users/jiaxuan-dev/following`)
    ])
    master.addNode(masterGitHub.data)
    for (const GitHubProject of GitHubProjects.data) {
      try {
        const { data: readme } = await axios(`https://api.github.com/repos/jiaxuan-dev/${GitHubProject.name}/contents/README.md`)
        GitHubProject.readme = readme
      } catch (error) {

      }

    }
    GitHubProjects.data.forEach(GitHubProject => {
      project.addNode(GitHubProject)
    })
    GitHubFollowers.data.forEach(GitHubFollower => {
      followers.addNode(GitHubFollower)
      userUrlArr.push(GitHubFollower.url)
    })

    GitHubFollowings.data.forEach(GitHubFollowing => {
      following.addNode(GitHubFollowing)
      userUrlArr.push(GitHubFollowing.url)
    })

    for (const userOneUrl of userUrlArr) {
      const { data: othersUser } = await axios.get(userOneUrl)
      if (!othersUser.email) {
        othersUser.email = '暂无'
      }
      user.addNode(othersUser)
    }
    // https://api.github.com/repos/GitHub-Laziji/canvas-utils/contents/README.md
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
