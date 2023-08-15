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
    const type = body.type;

    try {
        if (type === 'header_one'){
            await knex('about').where({
                user_id: existingUser.id
            }).update({
                header_one: body.text
            });
        }
        else if (type === 'description_one'){
            await knex('about').where({
                user_id: existingUser.id
            }).update({
                description_one: body.text
            });
        }
        else if (type === 'description_two'){
            await knex('about').where({
                user_id: existingUser.id
            }).update({
                description_two: body.text
            });
        }
        else if (type === 'header_two'){
            await knex('about').where({
                user_id: existingUser.id
            }).update({
                header_two: body.text
            });
        }

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({
                status: "OK",
                message: "About data updated successfully",
                data: null
            })
        };
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "An error occurred while updating about", data: error }),
        };
    }
};

export { handler };