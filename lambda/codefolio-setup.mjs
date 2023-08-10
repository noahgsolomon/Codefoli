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

    console.log("Attempting to connect to the database...");
    const knex = Knex({
        client: 'postgres',
        connection
    });
    console.log("Connected to the database.");

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

    if (existingUser.role !== 'NEWBIE') {
        console.error("User role is not 'NEWBIE'");
        return {
            statusCode: 400,
            body: JSON.stringify({ status: "BAD", message: "User role is not 'NEWBIE'", data: null }),
        };
    }

    const body = JSON.parse(event.body);

    return knex.transaction(async (trx) => {
        try {
            await trx('users')
                .where('cognito_user_id', cognitoUserId)
                .update({
                    company: body.company,
                    location: body.location,
                    about: body.about,
                    name: body.name,
                    profession: body.profession,
                    role: 'USER'        });

            for (const skill of body.skills) {
                await knex('skills').insert({
                    skill: skill,
                    user_id: existingUser.id
                });
            }
            let workOrder = 1;
            for (const work of body.work){
                await knex('work').insert({
                    company: work.company,
                    position: work.position,
                    start_date: work.startDate,
                    end_date: work.endDate,
                    description: work.description,
                    order_id: workOrder,
                    user_id: existingUser.id
                });
                workOrder++;
            }

            const createSlug = (name) => {
                return name.toLowerCase()
                    .replace(/[':;/.,!@#$%^&*()_+=]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/--+/g, "-");
            };

            for (const project of body.projects){

                const [projectRow] = await knex('projects').insert({
                    name: project.name,
                    description: project.description,
                    updated_at: project.updatedAt,
                    image: 'https://picsum.photos/400/400',
                    user_id: existingUser.id,
                    slug: createSlug(project.name)
                }).returning('*');

                const projectId = projectRow.id;

                for (const language of project.languages){
                    await knex('languages').insert({
                        user_id: existingUser.id,
                        project_id: projectId,
                        language: language
                    });
                }

                await knex('project_content').insert({
                    user_id: existingUser.id,
                    project_id: projectId,
                    header: projectRow.name,
                    about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ex similique fuga beatae officia nam unde, velit accusantium et inventore.",
                    overview: "Overview",
                    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum dolore unde saepe qui sint. Neque aliquid quam corrupti voluptas nam magni sed, temporibus delectus suscipit illum repellendus modi! Fuga, nemo. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate vitae vel tempore, nobis odit quos ipsum accusantium doloremque atque nihil molestias deleniti obcaecati expedita earum commodi doloribus ex delectus culpa magni id. Ab culpa nam, optio fugiat libero quia illum nihil vitae, placeat, eligendi est a blanditiis nemo",
                    image: "https://picsum.photos/2000",
                    platforms: "Web, Android, iOS",
                    link: project.link || 'https://google.com'
                });

            }

            for (const service of body.services){
                await knex('services').insert({
                    service: service,
                    user_id: existingUser.id
                });
            }


            console.log("User details updated successfully");

            const updatedUser = await trx('users')
                .where('cognito_user_id', cognitoUserId)
                .first();
            console.log("Updated user details:", updatedUser);

            return {
                statusCode: 200,
                body: JSON.stringify({ status: "OK", message: "User details updated successfully", data: updatedUser }),
            };
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ status: "ERROR", message: "An error occurred while updating user details", data: error }),
            };
        }
    });
};

export { handler };