import { Kafka } from 'kafkajs';

const brokerEnv = process.env.KAFKA_BROKER;
if (!brokerEnv) {
  throw new Error('❌ KAFKA_BROKER environment variable is not set!');
}
console.log('Kafka Broker:', brokerEnv);

const kafka = new Kafka({
  clientId: 'issuance_service',
  brokers: [brokerEnv],
});

export { kafka };
