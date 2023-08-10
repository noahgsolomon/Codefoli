import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const handler = async (event) => {
    const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "5et40k0da1hoosqmjf5peo0i8j",
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
                status: "OK",
                message: "User logged in successfully",
                data: {
                    idToken: response.AuthenticationResult.IdToken,
                    accessToken: response.AuthenticationResult.AccessToken,
                    refreshToken: response.AuthenticationResult.RefreshToken // Include the refresh token
                }
            }),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: "ERROR",
                message: err.message,
                data: null
            }),
        };
    }
};

export { handler };
