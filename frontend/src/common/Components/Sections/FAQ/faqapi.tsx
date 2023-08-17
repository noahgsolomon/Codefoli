const changeFaq = async (faq: ({text:string, type: 'title' | 'content', id:string} | {title: string, content: string, operation:'add', type:'faq'} | {id: string, operation:'remove', type:'faq'})) => {
  try {
    const response = await fetch(
        "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/faq",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Id"),
          },
          body: JSON.stringify(faq),
        }
    );

    const responseJson = await response.json();
    if (responseJson.status === "OK") {
      return responseJson;
    } else {
      console.log(responseJson.message);
      return responseJson;
    }
  } catch (e) {
    console.log(e);
  }
};



export { changeFaq };
