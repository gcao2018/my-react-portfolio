import { CreateTableCommand, DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client: DynamoDBClient = new DynamoDBClient({
    endpoint: process.env.DYNAMODB_ENDPOINT || '',
    region: process.env.AWS_REGION || '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});
const db: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client);

export async function testConnection(): Promise<boolean> {
    try {
        const response = await client.send(new ListTablesCommand({}));
        console.log('Success! Local tables:', response.TableNames);
        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Connection failed:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
        return false;
    }
}

export async function createUsersTable(): Promise<void> {
    const command = new CreateTableCommand({
        TableName: 'Users',
        AttributeDefinitions: [
            { AttributeName: 'UserId', AttributeType: 'S' },
            { AttributeName: 'Email', AttributeType: 'S' },
            { AttributeName: 'Username', AttributeType: 'S' },
            { AttributeName: 'PasswordHash', AttributeType: 'S' }
        ],
        KeySchema: [
            { AttributeName: 'UserId', KeyType: 'HASH' },
            { AttributeName: 'Email', KeyType: 'RANGE' },
            { AttributeName: 'Username', KeyType: 'RANGE' },
            { AttributeName: 'PasswordHash', KeyType: 'RANGE' }
        ],
        BillingMode: 'PAY_PER_REQUEST'
    });
}

testConnection();

export default db;