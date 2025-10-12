
containerName="kafka_instance"
bootstrapServer="localhost:9092"


topics=(
  "kafka.cred.issued:1:1"
)

for topic in "${topics[@]}"; do
  IFS=':' read -r name partitions replication <<< "$topic"
  echo "Creating topic: $name..."

  docker exec -i "$containerName" /opt/kafka/bin/kafka-topics.sh \
    --create \
    --topic "$name" \
    --bootstrap-server "$bootstrapServer" \
    --partitions "$partitions" \
    --replication-factor "$replication"
done
