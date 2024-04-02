import amqp, { Channel } from "amqplib";
import { setTimeout, clearTimeout } from "timers"; 

class MessageBroker {
  private static instance: MessageBroker | null = null;
  private connection: amqp.Connection | null = null;
  private channel: Channel | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  public static async connect(connectionString: string, queue?: string): Promise<MessageBroker> {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
      await MessageBroker.instance.connectRabbitMQ(connectionString, queue);
    }
    return MessageBroker.instance;
  }

  private async connectRabbitMQ(connectionString: string, queue?: string) {
    if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout); 
        this.reconnectTimeout = null;
    }

    try {
        this.connection = await amqp.connect(connectionString);
        this.channel = await this.connection.createChannel();
        if (queue) {
            await this.channel.assertQueue(queue);
        }
        console.log("RabbitMQ connected");
    } catch (error: any) {
        console.error("Failed to connect to RabbitMQ:", error.message);
        this.reconnectTimeout = setTimeout(() => this.connectRabbitMQ(connectionString, queue), 5000);
        throw error; 
    }
}
  public async publishMessage(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      throw new Error("No RabbitMQ channel available");
    }
    try {
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error: any) {
      console.error("Failed to publish message:", error.message);
      throw error;
    }
  }

  public async consumeMessage(queue: string, callback: (message: any) => void): Promise<void> {
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      throw new Error("No RabbitMQ channel available");
    }
    try {
      await this.channel.consume(queue, (message) => {
        if (message) {
          const content = message.content.toString();
          const parsedContent = JSON.parse(content);
          callback(parsedContent);
          this.channel?.ack(message);
        }
      });
    } catch (error: any) {
      console.error("Failed to consume message:", error.message);
      throw error;
    }
  }
}

export default MessageBroker;
