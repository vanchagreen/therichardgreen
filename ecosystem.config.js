module.exports = {
  apps: [{
    name: 'therichardgreen-server',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-52-11-196-70.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/TheRichardInstance.pem',
      ref: 'origin/master',
      repo: 'git@github.com:vanchagreen/therichardgreen.git',
      path: '/home/ec2-user/therichardgreen',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}