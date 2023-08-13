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

const knex = Knex({
    client: 'postgres',
    connection
});

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
            body: JSON.stringify({ status: "ERROR", message: "User does not exist", data: null }),
        };
    }

    console.log('existing user:', JSON.stringify(existingUser));

    const work = await knex('work').where({
        user_id: existingUser.id
    });

    let work_formatted = [];
    for (const job of work) {
        work_formatted.push({
            id: job.id,
            company: job.company,
            position: job.position,
            start_date: job.start_date,
            end_date: job.end_date,
            description: job.description,
            order_id: job.order_id,
            image: job.image
        });
    }

    const projects = await knex('projects').where({
        user_id: existingUser.id
    });
    let project_formatted = [];
    let slug_list = [];
    for (const project of projects){
        const languages = await knex('languages').where({
            project_id: project.id,
            user_id: existingUser.id
        });
        const project_content = await knex('project_content').where({
            project_id: project.id,
            user_id: existingUser.id
        });

        project_formatted.push({
            name: project.name,
            description: project.description,
            languages: languages,
            updated_at: project.updated_at,
            image: project.image,
            id: project.id,
            slug: project.slug
        });

        slug_list.push({
            slug: project.slug,
            header: project_content.header,
            description: project_content.description,
            about: project_content.about,
            image: project_content.image,
            overview: project_content.overview,
            platforms: project_content.platforms,
            link: project_content.link
        });

    }

    const skills = await knex('skills').where({
        user_id: existingUser.id
    });

    const services = await knex('services').where({
        user_id: existingUser.id
    });

    const user_data = {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        company: existingUser.company,
        location: existingUser.location,
        about: existingUser.about,
        website: existingUser.website,
        skills: skills,
        projects: project_formatted,
        work: work_formatted,
        role: existingUser.role,
        profession: existingUser.profession,
        services: services,
        slugs: slug_list
    };

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "OK",
            message: "User data retrieved successfully",
            data: user_data
        })
    };

};

export { handler }