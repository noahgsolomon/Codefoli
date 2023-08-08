import { CognitoIdentityProviderClient, SignUpCommand } from
        "@aws-sdk/client-cognito-identity-provider";
import Knex from 'knex';

const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const client = new CognitoIdentityProviderClient({ region: "us-east-1"
    });

    const params = {
        ClientId: '****',
        Username: event.email,
        Password: event.password,
        UserAttributes: [
            {
                Name: 'email',
                Value: event.email
            }
        ]
    };

    try {
        const result = await client.send(new SignUpCommand(params));
        console.log("SignUpCommand result:", result);

        const user = '****';
        const password = '****';
        const host = '****';
        const database = 'codefolio';

        const connection = {
            ssl: { rejectUnauthorized: false },
            host,
            user,
            password,
            database
        };
        // Connect to the RDS database
        console.log("Attempting to connect to the database...");
        const knex = Knex({
            client: 'postgres',
            connection
        });
        console.log("Connected to the database.");

        await knex('users').insert({
            name: event.name,
            email: event.email,
            password: event.password,
            role: 'NEWBIE',
            phone: '(123)-456-7890',
            cognito_user_id: result.UserSub
        });
        console.log("User data inserted successfully.");

        return {
            statusCode: 200,
            body: JSON.stringify({
                username: result.UserSub,
                userConfirmed: result.UserConfirmed,
            }),
        };
    } catch (err) {
        console.error("Error occurred:", err);
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
};

export { handler };
