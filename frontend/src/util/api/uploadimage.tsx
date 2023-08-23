import React, {Dispatch, SetStateAction} from "react";
import AnyPageData from "Type/AnyPageData.tsx";
import UserData from "Type/UserData.tsx";
import {STAGE} from "../../config.ts";
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImageLoading: Dispatch<SetStateAction<boolean>>, setPageData: Dispatch<SetStateAction<AnyPageData>> | Dispatch<SetStateAction<UserData>>, column: string, setShowError: Dispatch<SetStateAction<{visible: boolean, message: string}>>, setCacheBuster: Dispatch<SetStateAction<string>>, table: string, link: string, location: ((prev: AnyPageData) => any) | null = null, id: string | null = null) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImageLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const base64File = reader.result as string;

        try {
            const response = await fetch(
                `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/upload-image?table=${table}&link=${link}&image_column=${column}&id=${id || ''}`,
                {
                    method: "POST",
                    body: JSON.stringify({ file: base64File }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("Id"),
                    },
                }
            );

            const data = await response.json();

            console.log(data)

            if (data.status !== "OK") {
                setImageLoading(false);
                if (data.status === "ERROR") {
                    setShowError({ visible: true, message: data.message });
                    setTimeout(() => setShowError({ visible: false, message: "" }), 3000);
                    return;
                }
                return;
            }

            setTimeout(() => setImageLoading(false), 2500);
            let count = 0;
            const intervalId = setInterval(() => {
                setCacheBuster(new Date().toISOString());
                count += 1;
                if (count >= 10) clearInterval(intervalId);
            }, 1000);
            setPageData((prev: any) => {
                if (location) {
                    return location({
                        ...prev,
                        [column]: data.data.url,
                    });
                } else {
                    return {
                        ...prev,
                        [column]: data.data.url,
                    };
                }
            });
        } catch (error) {
            setImageLoading(false);
            console.error("Error uploading file: ", error);
        }
    };
};

export { handleFileUpload }