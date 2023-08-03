import { FC, useEffect } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import SectionsP from "../../common/Components/Sections/SectionsP.tsx";
import ContactMainP from "./ContactMainP.tsx";

const ContactP: FC<{
  pageData: ContactData;
  userData: UserData;
}> = ({ pageData, userData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
        <ContactMainP
            pageData={pageData}
            userData={userData}
        />
        <SectionsP
            userData={userData}
            pageData={pageData}
        />
        <ModeButtonsP />
      </>
  );
};

export default ContactP;
