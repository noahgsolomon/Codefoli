import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import jwt from 'jsonwebtoken';

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const handler = async (event) => {
    const idToken = event.headers.Authorization.replace('Bearer ', '');
    const refreshToken = event.headers.Refresh;

    const decodedToken = jwt.decode(idToken);

    if (isTokenExpired(decodedToken)) {
        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            ClientId: "5et40k0da1hoosqmjf5peo0i8j",
            AuthParameters: {
                REFRESH_TOKEN: refreshToken
            }
        });

        try {
            const response = await client.send(command);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    status: "OK",
                    message: "Token refreshed successfully",
                    data: {
                        idToken: response.AuthenticationResult.IdToken
                    }
                })
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 400,
                body: JSON.stringify({ status: "ERROR", message: "Failed to refresh token", data: null })
            };
        }
    }

    else if (!validToken(decodedToken)){
        return {
            statusCode: 400,
            body: JSON.stringify({ status: "ERROR", message: "Invalid id token", data: null })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "OK",
            message: "Token is valid",
            data: null
        })
    };
};

export { handler };

function validToken(decodedToken){
    if (decodedToken && decodedToken.exp){
        return true;
    }

    return false;
}

function isTokenExpired(decodedToken) {

    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp < now;
}