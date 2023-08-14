import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import jwt from 'jsonwebtoken';

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,Refresh",
    "Content-Type": "application/json"
};

const handler = async (event) => {

    console.log("Received event:", JSON.stringify(event)); // Log the received event

    const idToken = event.headers.Authorization.replace('Bearer ', '');
    const refreshToken = event.headers.Refresh;
    const decodedToken = jwt.decode(idToken);

    console.log("Decoded token:", decodedToken); // Log the decoded token

    if (isTokenExpired(decodedToken)) {
        console.log("Token is expired, refreshing..."); // Log token expiration
        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            ClientId: "5et40k0da1hoosqmjf5peo0i8j",
            AuthParameters: {
                REFRESH_TOKEN: refreshToken
            }
        });

        try {
            const response = await client.send(command);
            console.log("Token refreshed successfully:", response); // Log success
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({
                    status: "OK",
                    message: "Token refreshed successfully",
                    data: {
                        idToken: response.AuthenticationResult.IdToken
                    }
                })
            };
        } catch (error) {
            console.error("Error refreshing token:", error); // Log error
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({ status: "ERROR", message: "Failed to refresh token", data: null })
            };
        }
    }

    else if (!validToken(decodedToken)){
        console.log("Invalid token"); // Log invalid token
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "Invalid id token", data: null })
        };
    }

    console.log("Token is valid"); // Log valid token
    return {
        statusCode: 200,
        headers: headers,
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
        console.log("Token is valid"); // Log valid token check
        return true;
    }

    console.log("Token is invalid"); // Log invalid token check
    return false;
}

function isTokenExpired(decodedToken) {
    const now = Math.floor(Date.now() / 1000);
    const expired = decodedToken.exp < now;
    console.log("Token expiration check:", expired); // Log token expiration check
    return expired;
}
