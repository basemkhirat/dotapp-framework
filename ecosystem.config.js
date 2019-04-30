module.exports = {

    apps: [
        {
            name: 'app',
            script: './app.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            interpreter: './node_modules/.bin/babel-node',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    deploy: {
        production: {
            user: 'node',
            // host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@bitbucket.org:dotdevae/cmsjs.git',
            path: '/www/www-data/cmsjs',
            'post-deploy': 'npm install'
        }
    }
};
