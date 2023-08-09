import Knex from 'knex';
import jwt from 'jsonwebtoken';

const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const idToken = event.headers.Authorization.replace('Bearer ', '');
    const decodedToken = jwt.decode(idToken);
    const cognitoUserId = decodedToken['sub'];

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

    const existingUser = await knex('users')
        .where('cognito_user_id', cognitoUserId)
        .first();

    if (existingUser.role !== 'NEWBIE') {
        console.error("User role is not 'NEWBIE'");
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "User role is not 'NEWBIE'" }),
        };
    }

    const body = JSON.parse(event.body);

    await knex('users')
        .where('cognito_user_id', cognitoUserId)
        .update({
            company: body.company,
            location: body.location,
            about: body.about,
            name: body.name,
            profession: body.profession,
            role: 'USER'
        });

    for (const skill of body.skills) {
        await knex('Skills').insert({
            skill: skill,
            user_id: existingUser.id
        });
    }

    console.log("User details updated successfully");

    const updatedUser = await knex('users')
        .where('cognito_user_id', cognitoUserId)
        .first();
    console.log("Updated user details:", updatedUser);

    return {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
    };
};

export { handler };
