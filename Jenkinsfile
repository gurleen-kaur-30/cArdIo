pipeline {
    agent any
 
    stages {
        stage('Checkout SCM') {
            steps {
                echo '> Checking out the source control ...'
                git branch: 'main', url: 'https://github.com/gurleen-kaur-30/cardio'
            }
        }
        stage('Setting up env variables'){
            steps{
                
                script{
                    withCredentials([file(credentialsId: 'env-var', variable: 'env_var')]) {
                    sh 'rm .env.local'
                    sh "cp \$env_var .env.local"
                    }
                }
            }
        }
        
        stage('Running tests'){
            steps{
                script{
                    sh 'npm install && yarn test'
                }
            }

          post {
        always {
          publishHTML target: [
            allowMissing         : false,
            alwaysLinkToLastBuild: false,
            keepAll             : true,
            reportDir            : 'output/coverage/jest',
            reportFiles          : 'index.html',
            reportName           : 'Test Report'
          ]
        }
      }
            
        }
        
         stage('Docker build'){
            steps{
                script{
                    dockerImage = docker.build "gurleenk/cardio:latest"
                }
            }
        }

        stage('Push Image to docker hub'){
            steps{
                script{
                    docker.withRegistry('', 'docker-jenkins'){
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploying using Ansible') {
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', 
                inventory: 'docker_deployment/inventory', playbook: 'docker_deployment/deploy_image.yml', sudoUser: null
            }
        }
    }
}