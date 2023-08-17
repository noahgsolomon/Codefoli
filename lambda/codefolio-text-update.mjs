import Knex from 'knex';
import jwt from 'jsonwebtoken';
import { user, password, host, database } from '/opt/db.mjs';

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    user,
    password,
    database
};

console.log("Attempting to connect to the database...");
const knex = Knex({
    client: 'postgres',
    connection
});
console.log("Connected to the database.");

const headers = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Content-Type": "application/json"
};


const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const idToken = event.headers.Authorization.replace('Bearer ', '');
    const decodedToken = jwt.decode(idToken);
    const cognitoUserId = decodedToken['sub'];

    const existingUser = await knex('users')
        .where('cognito_user_id', cognitoUserId)
        .first();

    if (existingUser === undefined) {
        console.error("User does not exist");
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "User does not exist", data: null }),
        };
    }

    const body = JSON.parse(event.body);

    try {
        if (body.table !== 'users') {
            await knex(body.table).where({
                user_id: existingUser.id
            }).update({
                [body.type]: body.text
            });
        }
        else {
            await knex('users').where({
                id: existingUser.id
            }).update({
                [body.type]: body.text
            });
        }


        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({
                status: "OK",
                message: "Text data updated successfully",
                data: null
            })
        };
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "An error occurred while updating text", data: error }),
        };
    }
};

export { handler };