pipeline {
    agent any
    tools {
        maven 'maven'
    }
    options {
        skipDefaultCheckout(true)
    }
 
    stages {
        stage('Checkout SCM') {
            steps {
                echo '> Checking out the source control ...'
                checkout scm
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