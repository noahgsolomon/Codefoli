import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const handler = async (event) => {
    const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "****",
        AuthParameters: {
            USERNAME: event.username,
            PASSWORD: event.password
        }
    });

    try {
        const response = await client.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({
                idToken: response.AuthenticationResult.IdToken,
                accessToken: response.AuthenticationResult.AccessToken
            }),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
};

export { handler };