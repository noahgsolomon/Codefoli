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

    try {
        const home = await knex('home').where({
            user_id: existingUser.id
        }).first();

        const home_sections = await knex('section')
            .where({
                user_id: existingUser.id,
                page: 'HOME'
            });

        const sectionDetails = [];

        const handlers = {
            VALUE: async (section) => {
                const valueSection = await knex('value_section').where('user_id', existingUser.id).first();
                if (valueSection) {
                    const values = await knex('values').where('user_id', existingUser.id);
                    const valuesList = values.map(value => ({ value: value.value }));
                    return {
                        type: "VALUE",
                        details: {
                            header_one: valueSection.header_one,
                            description_one: valueSection.description_one,
                            values: valuesList,
                            page_order: section.page_order
                        }
                    };
                }
            },
            STORY: async (section) => {
                const storySection = await knex('story_section').where('user_id', existingUser.id).first();
                if (storySection) {
                    return {
                        type: "STORY",
                        details: {
                            header_one: storySection.header_one,
                            description_one: storySection.description_one,
                            bullet_one: storySection.bullet_one,
                            bullet_two: storySection.bullet_two,
                            bullet_three: storySection.bullet_three,
                            image_one: storySection.image_one,
                            page_order: section.page_order
                        }
                    };
                }
            },
            SKILL: async (section) => {
                const skillSection = await knex('skill_section').where('user_id', existingUser.id).first();
                if (skillSection) {
                    return {
                        type: "SKILL",
                        details: {
                            header_one: skillSection.header_one,
                            page_order: section.page_order
                        }
                    };
                }
            },
            RESUME: async (section) => {
                const resumeSection = await knex('resume_section').where('user_id', existingUser.id).first();
                if (resumeSection) {
                    return {
                        type: "RESUME",
                        details: {
                            header_one: resumeSection.header_one,
                            page_order: section.page_order
                        }
                    };
                }
            },
            FAQ: async (section) => {
                const faqSection = await knex('faq_section').where('user_id', existingUser.id).first();
                if (faqSection) {
                    const faqs = await knex('faq').where('user_id', existingUser.id);
                    const faqList = faqs.map(faq => ({ question: faq.question, answer: faq.answer, id: faq.id }));
                    return {
                        type: "FAQ",
                        details: {
                            header_one: faqSection.header_one,
                            description_one: faqSection.description_one,
                            faqs: faqList,
                            page_order: section.page_order
                        }
                    };
                }
            }
        };
        for (const section of home_sections) {
            const handler = handlers[section.type];
            if (handler) {
                const detail = await handler(section);
                if (detail) {
                    sectionDetails.push(detail);
                }
            }
        }

        const home_data = {
            header_one: home.header_one,
            header_two: home.header_two,
            description_one: home.description_one,
            profile_image: home.profile_image,
            sections: sectionDetails
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "OK",
                message: "Home data retrieved successfully",
                data: home_data
            })
        };
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "ERROR", message: "An error occurred while getting home", data: error }),
        };
    }
};

export { handler };

