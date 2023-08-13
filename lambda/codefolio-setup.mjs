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
                    role: 'USER'

                });

            for (const skill of body.skills) {
                await trx('skills').insert({
                    skill: skill,
                    user_id: existingUser.id
                });
            }
            let workOrder = 1;
            for (const work of body.work){
                await trx('work').insert({
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

                const [projectRow] = await trx('projects').insert({
                    name: project.name,
                    description: project.description,
                    updated_at: project.updatedAt,
                    image: 'https://picsum.photos/400/400',
                    user_id: existingUser.id,
                    slug: createSlug(project.name)
                }).returning('*');

                const projectId = projectRow.id;

                for (const language of project.languages){
                    await trx('languages').insert({
                        user_id: existingUser.id,
                        project_id: projectId,
                        language: language
                    });
                }

                await trx('project_content').insert({
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
                await trx('services').insert({
                    service: service,
                    user_id: existingUser.id
                });
            }

            await trx('faq').insert({
                user_id: existingUser.id,
                question: "What is your design process?",
                answer: "My design process starts with understanding the client's needs, then moving onto research, ideation, prototyping, and finally, implementation."
            });

            await trx('faq').insert({
                user_id: existingUser.id,
                question: "How long does a project usually take?",
                answer: "The duration of a project varies depending on its complexity and scope, but typically it ranges from a few weeks to a few months."
            });

            await trx('faq').insert({
                user_id: existingUser.id,
                question: "Do you collaborate with other designers?",
                answer: "Yes, I often collaborate with other designers and believe that teamwork can lead to more innovative and comprehensive solutions."
            });

            await trx('faq').insert({
                user_id: existingUser.id,
                question: "What types of projects do you work on?",
                answer: "I work on a wide range of projects, from website and app design to branding and graphic design. Each project brings its own unique challenges and opportunities."
            });

            await trx('faq').insert({
                user_id: existingUser.id,
                question: "How can I contact you for a project?",
                answer: "You can reach out to me via the contact form on this website, or directly through email. I look forward to discussing how we can work together."
            });

            await trx('home').insert({
                user_id: existingUser.id,
                header_one: "I'm " + body.name + ", a " + body.profession + " from " + body.location,
                description_one: body.about,
                header_two: "My broad set of services and skills",
                profile_image: "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/63407fbdc2d4ac5270385fd4_home-hero-image-paperfolio-webflow-template.svg"
            });

            await trx('about').insert({
                user_id: existingUser.id,
                header_one: "Hello, I'm " + body.name,
                icon_one: "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b443e2bb8e12b5faf51a7_about-hero-rigth-image-paperfolio-webflow-template.png",
                icon_two: "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b440128f648585c383865_about-hero-left-image-paperfolio-webflow-template.png",
                icon_three: "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b52d3639fb5250039e574_my-story-image-paperfolio-webflow-template.png",
                header_two: "My story as a designer",
                description_one: body.about,
                description_two: "Embarking on a journey fueled by curiosity and passion, I found solace in the world of code. From solving complex problems to creating user-friendly interfaces, every project has been a stepping stone in my development career. Continually learning and adapting, I've embraced new technologies and methodologies to build robust and efficient solutions. My path as a developer is more than a career; it's a lifelong pursuit of innovation, creativity, and technological advancement."
            });

            await trx('contact').insert({
                user_id: existingUser.id,
                header_one: 'Contact Me',
                description_one:"Don't hesitate to get in touch! Whether you're looking for a design consult, interested in a collaboration, or just want to say hello, I'd be delighted to hear from you. I strive to respond promptly and look forward to our potential correspondence!"
            });

            await trx('projects_page').insert({
                user_id: existingUser.id,
                header_one: "Projects",
                description_one: "Here are some of my recent projects. I've worked on a wide range of projects, from website and app design to branding and graphic design. Each project brings its own unique challenges and opportunities."
            });

            await trx('story_section').insert({
                user_id: existingUser.id,
                header_one: "Designing since I was ? years old",
                description_one: "I started designing when I was ? years old. My first designs were for my school projects. I was fascinated by the idea of creating something that people can interact with. I studied design for 5 years in college and have been working as a designer for 3 years.",
                bullet_one: "Passionate about design from a young age.",
                bullet_two: "Five years of design education, three professionally.",
                bullet_three: "Strong advocate of user-centered design.",
                image_one: "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png"
            });

            await trx('resume_section').insert({
                user_id: existingUser.id,
                header_one: "Take a look at my resume"
            });

            await trx('value_section').insert({
                user_id: existingUser.id,
                header_one: "the core values that drive my work.",
                description_one: "Steering the helm of my career is a deeply ingrained set of core values. These principles not only guide my work ethic but also shape the way I view and approach design. Let's delve into the convictions that drive my professional journey."
            });

            await trx('faq_section').insert({
                user_id: existingUser.id,
                header_one: "Frequently Asked Questions",
                description_one: "From understanding my design process to discussing project timelines, I've gathered responses to questions often asked by clients and collaborators. If you can't find your answer here, feel free to reach out!"
            });

            await trx('skill_section').insert({
                user_id: existingUser.id,
                header_one: "My broad set of services and skills"
            });

            await trx('section').insert({
                user_id: existingUser.id,
                type: 'STORY',
                page: 'ABOUT',
                page_order: 1
            });

            await trx('section').insert({
                user_id: existingUser.id,
                type: 'RESUME',
                page: 'ABOUT',
                page_order: 2
            });

            await trx('section').insert({
                user_id: existingUser.id,
                type: 'VALUE',
                page: 'ABOUT',
                page_order: 3
            });

            await trx('section').insert({
                user_id: existingUser.id,
                type: 'SKILL',
                page: 'HOME',
                page_order: 1
            });

            await trx('section').insert({
                user_id: existingUser.id,
                type: 'FAQ',
                page: 'CONTACT',
                page_order: 1
            });

            await trx('values').insert({
                user_id: existingUser.id,
                value: 'HARD_WORK'
            });

            await trx('values').insert({
                user_id: existingUser.id,
                value: 'TRANSPARENCY'
            });

            await trx('values').insert({
                user_id: existingUser.id,
                value: 'INNOVATION'
            });

            await trx('values').insert({
                user_id: existingUser.id,
                value: 'GROWTH'
            });


            console.log("User profile setup successfully");

            return {
                statusCode: 200,
                body: JSON.stringify({ status: "OK", message: "User details updated successfully", data: null }),
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

