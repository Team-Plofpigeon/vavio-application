from fabric.api import cd, env, local, lcd, run, sudo
from fabric.contrib.files import exists
from fabric.operations import put

env.roledefs = {
    'production': ['root@178.62.202.159']
}

def deploy():
    """Deploying node application to remote"""
    # Build frontend
    local('npm install')

    # Distribute release package
    local('tar zcvf release.tar.gz index.js package.json')

    # Stop existing application
    # run('forever stop vavio')

    with cd('/var/node/vavio'):
        run('mkdir -p build')
        put('release.tar.gz', 'build/release.tar.gz')
        run('rm -rf app');
        run('mkdir -p app')
        run('tar -xvzf build/release.tar.gz -C app')
        run('rm build/release.tar.gz')
        with cd('app'):
            run('npm install --ignore-scripts')

    # Start application
    with cd('/var/node/vavio'):
        run('forever -a -o app/out.log --uid vavio start app/index.js')
