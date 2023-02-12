const { Kafka } = require('node-rdkafka');

// Define the Kafka producer configuration
const producerConfig = {
  'kafka1': 'localhost:9092', // Replace with your broker(s)
};

// Create a Kafka producer instance
const producer = new Kafka.Producer(producerConfig);

// Connect to the Kafka broker
producer.connect();

// Wait for the producer to be ready
producer.on('ready', () => {
  console.log('Producer is ready');

  // Define the topic name and message payload
  const topic = 'my-topic';
  const message = { value: 'Hello, world!' };

  // Get the current time
  const currentTime = Date.now();

  // Schedule the message to be sent in 20 seconds
  const scheduleTime = currentTime + 20000;

  // Produce the message to the topic with a schedule time
  producer.produce(
    topic,
    null,
    Buffer.from(JSON.stringify(message)),
    null,
    scheduleTime
  );

  console.log(`Message scheduled to be sent in 5 seconds`);
});

// Handle any errors
producer.on('event.error', (error) => {
  console.error(error);
});
