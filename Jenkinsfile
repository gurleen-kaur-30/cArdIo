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
                    sh 'yarn test --verbose'
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
    }
}