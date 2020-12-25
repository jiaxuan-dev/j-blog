// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://117.50.61.66:1337/',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['post'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '15702979536@163.com',
          password: '123456Jx'
        }
      }
    },
  ],
  templates: {
    StrapiPost: [
      {
        path: '/post/:id',
        component: './src/templates/Post.vue'
      },
    ],
    GitHubUser: [
      {
        path: '/githubuser/:id',
        component: "./src/templates/GitHubUser.vue"
      }
    ],
    GitHubProject: [
      {
        path: '/githubproject/:id',
        component: "./src/templates/Project.vue" 
      }
    ]
  }
}
