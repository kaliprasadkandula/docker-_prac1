const { Kafka } = require('node-rdkafka');

// Define the Kafka consumer configuration
const consumerConfig = {
  'group.id': 'my-group',
  'kafka1': 'localhost:9092', // Replace with your broker(s)
};

// Create a Kafka consumer instance
const consumer = new Kafka.KafkaConsumer(consumerConfig);

// Connect to the Kafka broker
consumer.connect();

// Wait for the consumer to be ready
consumer.on('ready', () => {
  console.log('Consumer is ready');

  // Subscribe to the topic
  consumer.subscribe(['my-topic']);

  // Start consuming messages
  consumer.consume();
});

// Handle any errors
consumer.on('event.error', (error) => {
  console.error(error);
});

// Handle incoming messages
consumer.on('data', (message) => {
  console.log(`Consumed message: ${message.value.toString()}`);
});
