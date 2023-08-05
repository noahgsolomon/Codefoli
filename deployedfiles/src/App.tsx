import { FC, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/Header/Header.tsx";
import Home from "./pages/Home/Home.tsx";
import "./App.css";

const App: FC = () => {
  //
  // const ProjectOr404 = () => {
  //     const { slug } = useParams();
  //                 //should be project slug list
  //     if (slug && ['', ''].some((s) => s === slug)) {
  //         return <Project/>;
  //     } else {
  //         return <NotFound/>;
  //     }
  // };

  const userData = useMemo(
    () => ({
      name: "Noah Solomon",
      email: "noahsolomon2003@gmail.com",
      phone: "678-314-3294",
      company: "University of Georgia",
      location: "Athens, GA",
      about: "Something about me",
      skills: [
        "JAVA",
        "PYTHON",
        "AWS",
        "JAVASCRIPT",
        "TYPESCRIPT",
        "REACT_NATIVE",
        "EXPRESS_JS",
        "NEXT_JS",
      ],
      projects: [
        {
          name: "Google",
          description: "Built an app called google",
          languages: ["TypeScript", "Chromium"],
          updatedAt: "2023-08-02T17:05:12Z",
          image: "https://codefolioimagebucket.s3.amazonaws.com/26-project-256",
          id: "256",
          slug: "google",
        },
        {
          name: "Connectify",
          description:
            "a diverse social media and gaming platform. It provides the user interface to interact with the extensive features and services offered by Connectify.",
          languages: ["TypeScript"],
          updatedAt: "2023-06-11T15:19:37Z",
          image: "https://codefolioimagebucket.s3.amazonaws.com/26-project-257",
          id: "257",
          slug: "connectify",
        },
      ],
      work: [
        {
          id: 72,
          company: "Antoon's World",
          position: "Founder",
          startDate: "12/12/21",
          endDate: "current",
          description: "nothing.",
          orderId: 1,
          image: "https://codefolioimagebucket.s3.amazonaws.com/26-job-72",
        },
        {
          id: 73,
          company: "Google",
          position: "Software Engineer",
          startDate: "June 2021",
          endDate: "Present",
          description: "Description...",
          orderId: 2,
          image: "https://codefolioimagebucket.s3.amazonaws.com/26-job-73",
        },
      ],
      role: "USER",
      profession: "Cloud engineer",
      services: [
        "WEB_DEVELOPMENT",
        "CLOUD_COMPUTING",
        "MACHINE_LEARNING",
        "CYBER_SECURITY",
      ],
      slugs: [
        {
          slug: "google",
          header: "Google",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum dolore unde saepe qui sint. Neque aliquid quam corrupti voluptas nam magni sed, temporibus delectus suscipit illum repellendus modi! Fuga, nemo.\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate vitae vel tempore, nobis odit quos ipsum accusantium doloremque atque nihil molestias deleniti obcaecati expedita earum commodi doloribus ex delectus culpa magni id. Ab culpa nam, optio fugiat libero quia illum nihil vitae, placeat, eligendi est a blanditiis nemo \n iusto.",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ex similique fuga beatae officia nam unde, velit accusantium et inventore.",
          image: "https://picsum.photos/2000",
          overview: "Overview",
          platforms: "Web, Android, iOS",
          link: "https://google.com",
        },
        {
          slug: "connectify",
          header: "Connectify",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum dolore unde saepe qui sint. Neque aliquid quam corrupti voluptas nam magni sed, temporibus delectus suscipit illum repellendus modi! Fuga, nemo.\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate vitae vel tempore, nobis odit quos ipsum accusantium doloremque atque nihil molestias deleniti obcaecati expedita earum commodi doloribus ex delectus culpa magni id. Ab culpa nam, optio fugiat libero quia illum nihil vitae, placeat, eligendi est a blanditiis nemo \n iusto.",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ex similique fuga beatae officia nam unde, velit accusantium et inventore.",
          image:
            "https://codefolioimagebucket.s3.amazonaws.com/26-project-content-99",
          overview: "Overview",
          platforms: "Web, Android, iOS",
          link: "https://github.com/noahgsolomon/Connectify",
        },
      ],
    }),
    []
  );

  const homeData = useMemo(
    () => ({
      headerOne: "My name is Walter Hartwell White",
      descriptionOne:
        "I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead, murdered by my brother-in-law Hank Schrader. Hank has been building a meth empire for over a year now...",
      headerTwo: "My broad set of services and skills",
      profileImage:
        "https://codefolioimagebucket.s3.amazonaws.com/26-profile-image",
      sections: [
        {
          details: {
            headerOne: "My broad set of services and skills",
            order: 1,
          },
          type: "SKILL",
        },
      ],
    }),
    []
  );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home userData={userData} pageData={homeData} />}
        />
        {/*<Route*/}
        {/*    path="/contact"*/}
        {/*    element={<Contact />}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*    path="/projects"*/}
        {/*    element={*/}
        {/*        <Projects />*/}
        {/*    }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*    path="/about"*/}
        {/*    element={<About />}*/}
        {/*/>*/}
        {/*<Route path="/:slug" element={<ProjectOr404 />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
