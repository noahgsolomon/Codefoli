# Codefolio

Codefolio is a personalized portfolio creation platform designed for programmers. Offering a seamless experience in showcasing your coding skills and projects. Enjoy the balance of a standardized and customizable portfolio creation.

<img width="747" alt="Screenshot 2023-08-20 at 10 27 34 AM" src="https://github.com/noahgsolomon/Codefolio/assets/111200060/f789884e-cf5c-46a0-b7b1-2f8b77d2f5b0">


## Features
- **Customizable Layouts**: Personalize your portfolio layout to match your style and preference with multiple themes (more themes coming soon).
- **Project Highlight**: Choose to feature your best work prominently on your portfolio.
- **Responsive Design**: Your portfolio will look great on desktop, tablet, and mobile devices.
- **Downloadable React Code**: Access and download the React code to have full control over your portfolio and experiment with it locally.
- **One-Click Deployment**: Easily deploy your application with a seamless deployment process integrated within the platform, taking the hassle out of getting your portfolio live.

## Architecture
Codefolio leverages a robust and flexible architecture to provide a seamless experience. Here's an overview of the underlying technologies:

- **Domain Management**: Utilizes AWS Route 53 for intelligent domain routing.
- **Content Distribution**: Amazon CloudFront ensures fast, secure delivery of the website.
- **Website Hosting**: AWS S3 hosts the static website content, offering reliability and scalability.
- **Authentication**: Amazon Cognito User Pools are integrated for secure user authentication.
- **Backend Integration**: AWS API Gateway handles backend integration, enabling dynamic content and functionality.
- **Serverless Functions**: AWS Lambda is used for invocations from API Gateway and performing database operations, ensuring a flexible and efficient backend.
- **User Profile Deployment**: An SQS queue, along with an EC2 instance, manages the deployment of user profiles to individually created buckets. This architecture supports both flexibility and isolation of user data.
