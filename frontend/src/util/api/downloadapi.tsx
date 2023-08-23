import { STAGE } from "../../config.ts";

const download = async () => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/download`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    if (
      response.ok &&
      response.headers.get("Content-Type") === "application/zip"
    ) {
      const base64Response = await response.text();
      const binaryData = atob(base64Response); // Decode base64
      const len = binaryData.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([bytes.buffer], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user-files.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      const responseJson = await response.json();
      console.log(responseJson.message);
      return responseJson;
    }
  } catch (e) {
    console.log(e);
  }
};

export { download };
