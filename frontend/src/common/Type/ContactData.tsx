type ContactData = {
  headerOne: string;
  descriptionOne: string;
  email: string;
  phone: string;
  headerTwo: string;
  descriptionTwo: string;
  faq: [
    {
      question: string;
      answer: string;
    }
  ];
};

export default ContactData;
