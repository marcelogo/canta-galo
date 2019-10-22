Marcelo's IP
10.23.113.141

# Server

Get
curl http://ec2-52-65-21-255.ap-southeast-2.compute.amazonaws.com:8080/canta-galo

Post
curl -X POST http://ec2-52-65-21-255.ap-southeast-2.compute.amazonaws.com:8080/canta-galo


## SSH

    ssh -i ~/.ssh/marcelozen.pem ec2-user@ec2-52-65-21-255.ap-southeast-2.compute.amazonaws.com


# Client

## ssh Pi

    ssh pi@10.23.30.51
    pass: zendesk

## Deploy Client

    bin/client-deploy
