import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import Knex from 'knex';
import { user, password, host, database } from '/opt/db.mjs';

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    user,
    password,
    database
};
const knex = Knex({
    client: 'postgres',
    connection
});
console.log("Connected to the database.");

const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const params = {
        ClientId: '5et40k0da1hoosqmjf5peo0i8j',
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

        const authParams = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '5et40k0da1hoosqmjf5peo0i8j',
            AuthParameters: {
                USERNAME: event.email,
                PASSWORD: event.password
            }
        };
        const authResult = await client.send(new InitiateAuthCommand(authParams));
        console.log("InitiateAuthCommand result:", authResult);

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
            body: {
                status: "OK",
                message: "User registered successfully",
                data: {
                    username: result.UserSub,
                    userConfirmed: result.UserConfirmed,
                    accessToken: authResult.AuthenticationResult.AccessToken,
                    idToken: authResult.AuthenticationResult.IdToken,
                    refreshToken: authResult.AuthenticationResult.RefreshToken // Include the refresh token
                }
            },
        };
    } catch (err) {
        console.error("Error occurred:", err);
        return {
            statusCode: 400,
            body: {
                status: "ERROR",
                message: err.message,
                data: null
            },
        };
    }
};

export { handler };
