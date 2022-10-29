const path = require('path');

const { SQS, SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const { getBucketName, getEnv, listFiles } = require('./utils');
const { baseDir } = require('./constant');

const sqs = new SQS();
const sqsClient = new SQSClient({ region: 'eu-central-1' });

const getBucket = (bucketName) => ({
    name: bucketName,
    arn: `arn:aws:s3:::${bucketName}`,
});

const getObjectPutEvent = (bucketName, key) => ({
    eventSource: 'aws:s3',
    eventName: 'ObjectCreated:Put',
    s3: {
        bucket: getBucket(bucketName),
        object: {
            key,
        },
    },
});

const invalidateImages = async (keys = []) => {
    const env = getEnv();

    try {
        if (!env) {
            throw new Error('Missing required environment variables');
        }

        if (keys.length === 0) {
            throw new Error('Missing required object keys');
        }

        const notificationEvents = {
            Type: 'Notification',
            Message: {
                Records: keys.map((key) => getObjectPutEvent(getBucketName(), path.basename(key))),
            },
        };

        const QueueName = `image-external-cache-invalidation-${env}`;
        const { QueueUrl } = await sqs.getQueueUrl({ QueueName });

        const command = new SendMessageCommand({
            MessageBody: JSON.stringify(notificationEvents),
            QueueUrl,
        });

        const response = await sqsClient.send(command);
        keys.forEach((key) => {
            console.log(`message sent to queue ${QueueName} for key ${key}`, response);
        });
    } catch (error) {
        console.error(error);
    }
};

listFiles(baseDir)
    .then((files) => invalidateImages(files))
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('PANIC', err);
        process.exit(1);
    });
