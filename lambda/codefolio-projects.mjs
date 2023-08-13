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
const knex = await Knex({
    client: 'postgres',
    connection
});

console.log("Connected to the database.");


const handler = async(event) => {

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
            body: JSON.stringify({ status: "ERROR", message: "User does not exist", data: null }),
        };
    }

    console.log('existing user:', JSON.stringify(existingUser));

    try {
        const projects_page = await knex('projects_page').where({
            user_id: existingUser.id
        }).first();

        const projects_page_data = {
            header_one: projects_page.header_one,
            description_one: projects_page.description_one,
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "OK",
                message: "Projects page data retrieved successfully",
                data: projects_page_data
            })
        };
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "ERROR", message: "An error occurred while getting projects page", data: error }),
        };
    }
}

export { handler }