import { CreateTableCommand, DynamoDBClient, ListTablesCommand, QueryCommand, ScanCommand, type CreateTableCommandOutput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, type ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

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
    try {
        const command = new CreateTableCommand({
            TableName: 'Users',
            AttributeDefinitions: [
                { AttributeName: 'UserId', AttributeType: 'N' }
            ],
            KeySchema: [
                { AttributeName: 'UserId', KeyType: 'HASH' }
            ],
            BillingMode: 'PAY_PER_REQUEST'
        });
        const response: CreateTableCommandOutput = await client.send(command);
        console.log('Table status:', response?.TableDescription?.TableStatus);
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

export async function insertItem(): Promise<void> {
    const command = new PutCommand({
        TableName: 'Users',
        Item: {
            UserId: 1,
            Username: 'gcao',
            Email: 'gcc2018@gmail.com'
        }
    });

    try {
        await db.send(command);
        console.log('Item inserted successfully!');
    } catch (error) {
        console.error('Error inserting item:', error);
    }
}

export async function viewAllItemsScan(): Promise<void> {
    const command: ScanCommand = new ScanCommand({ TableName: 'Users' });
    try {
        const response: ScanCommandOutput = await db.send(command);
        console.log('Query Results:', response.Items);
    } catch (error) {
        console.error('Error querying table:', error);
    }
}

export async function viewItemsByQuery(): Promise<void> {
    const command = new QueryCommand({
        TableName: 'Users',
        KeyConditionExpression: 'UserId = :id',
        ExpressionAttributeValues: {
            ':id': { N: '1' }
        }
    });

    try {
        const response = await db.send(command);
        console.log('Query Results:', response.Items);
    } catch (error) {
        console.error('Error querying table:', error);
    }
}

// createUsersTable();
// insertItem();
// viewAllItemsScan();
viewItemsByQuery();
// testConnection();

export default db;