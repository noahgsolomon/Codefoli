import Footer from "Components/Footer/Footer";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import ContactSections from "./ContactSections.tsx";
import ContactMain from "./ContactMain.tsx";
import ModeButtons from "../../ModeButtons.tsx";

const Contact: FC<{
  pageData: ContactData;
  setPageData: Dispatch<SetStateAction<ContactData>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
}> = ({ pageData, setPageData, userData, setUserData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ContactMain
        pageData={pageData}
        setPageData={setPageData}
        userData={userData}
        setUserData={setUserData}
      />
      <ContactSections
        pageData={pageData}
        setPageData={setPageData}
        userData={userData}
        setUserData={setUserData}
      />
      <ModeButtons />
      <Footer />
    </>
  );
};

export default Contact;
