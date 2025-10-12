import { Kafka } from 'kafkajs';


const kafka = new Kafka({
  clientId: 'issuance_service',
  brokers: ["localhost:9092"],
});

export { kafka };
