import Footer from "Components/Footer/Footer";
import React from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import ContactSections from "./ContactSections.tsx";
import ContactMain from "./ContactMain.tsx";

const Contact: React.FC<{
  pageData: ContactData;
  setPageData: React.Dispatch<React.SetStateAction<ContactData>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
}> = ({ pageData, setPageData, userData, setUserData }) => {
  return (
    <>
      <ContactMain pageData={pageData} />
      <ContactSections
        pageData={pageData}
        setPageData={setPageData}
        userData={userData}
        setUserData={setUserData}
      />
      <Footer />
    </>
  );
};

export default Contact;
