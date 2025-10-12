
$containerName = "kafka_instance"

$bootstrapServer = "localhost:9092"

$topics = @(
    @{ Name = "kafka.cred.issued"; Partitions = 1; ReplicationFactor = 1 },
)

foreach ($topic in $topics) {
    Write-Host "Creating topic: $($topic.Name)..."

    docker exec -i $containerName /opt/kafka/bin/kafka-topics.sh `
        --create `
        --topic $($topic.Name) `
        --bootstrap-server $bootstrapServer `
        --partitions $($topic.Partitions) `
        --replication-factor $($topic.ReplicationFactor)
}
