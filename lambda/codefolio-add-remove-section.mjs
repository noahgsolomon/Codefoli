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
    console.log('body: ' + JSON.stringify(body));
    const { page, section, page_order, type } = body;

    try {
        if (type === 'add') {
            // Add section logic
            // Check if section already exists
            const existingSection = await knex('section')
                .where({ user_id: existingUser.id, page: page, type: section })
                .first();
            if (existingSection) {
                return {
                    statusCode: 400,
                    headers: headers,
                    body: JSON.stringify({ status: "BAD", message: "Section already present", data: null }),
                };
            }

            // Update order of existing sections
            await knex('section')
                .where({ user_id: existingUser.id, page })
                .andWhere('page_order', '>=', page_order)
                .increment('page_order', 1);

            // Insert new section
            await knex('section').insert({
                user_id: existingUser.id,
                type: section,
                page,
                page_order
            });

            // Retrieve additional data based on section type
            let data = null;
            switch (section) {
                case 'STORY':
                    const story = await knex('story_section').where('user_id', existingUser.id).first();
                    data = {
                        header_one: story.header_one,
                        description_one: story.description_one,
                        bullet_one: story.bullet_one,
                        bullet_two: story.bullet_two,
                        bullet_three: story.bullet_three,
                        image_one: story.image_one,
                        page_order: page_order
                    };
                    break;
                case 'RESUME':
                    const resume = await knex('resume_section').where('user_id', existingUser.id).first();
                    data = { header_one: resume.header_one, page_order: page_order };
                    break;
                case 'FAQ':
                    const faqSection = await knex('faq_section').where('user_id', existingUser.id).first();
                    const faq = await knex('faq').where('user_id', existingUser.id).select();
                    data = {
                        header_one: faqSection.header_one,
                        description_one: faqSection.description_one,
                        faq: faq.map(f => ({ question: f.question, answer: f.answer, id: f.id })),
                        page_order: page_order
                    };
                    break;
                case 'VALUE':
                    const valueSection = await knex('value_section').where('user_id', existingUser.id).first();
                    const values = await knex('values').where('user_id', existingUser.id).select();
                    data = {
                        header_one: valueSection.header_one,
                        description_one: valueSection.description_one,
                        values: values.map(v => ({ value: v.value })),
                        page_order: page_order
                    };
                    break;
                case 'SKILL':
                    const skillSection = await knex('skill_section').where('user_id', existingUser.id).first();
                    data = { header_one: skillSection.header_one, page_order: page_order };
                    break;
            }

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ status: "OK", message: "Section added successfully", data: data }),
            };
        } else if (type === 'remove') {
            // Remove section logic
            // Find the section to be removed
            const sectionToRemove = await knex('section')
                .where({ user_id: existingUser.id, page: page, type: section })
                .first();
            if (!sectionToRemove) {
                return {
                    statusCode: 400,
                    headers: headers,
                    body: JSON.stringify({ status: "BAD", message: "Section not found", data: null }),
                };
            }

            // Update order of remaining sections
            await knex('section')
                .where({ user_id: existingUser.id, page: page })
                .andWhere('page_order', '>', page_order)
                .decrement('page_order', 1);


            // Delete the section
            await knex('section').where({ id: sectionToRemove.id }).delete();

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ status: "OK", message: "Section deleted successfully", data: null }),
            };
        } else {
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({ status: "BAD", message: "Invalid type", data: null }),
            };
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "Internal server error", data: error }),
        };
    }
};

export { handler };
