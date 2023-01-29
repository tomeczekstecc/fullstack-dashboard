docker build -t registry-server.homelab.tslab.live/dashboard:latest .
docker run --name dashboard -p 3000:3000 registry-server.homelab.tslab.live/dashboard:latest
#docker push registry-server.homelab.tslab.live/dashboard:latest
