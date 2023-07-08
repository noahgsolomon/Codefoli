import PageType from "Type/Pages.tsx";
import {SectionType} from "Type/Section.tsx";

const addSection = async (page: PageType, section: SectionType) => {
    const model = {
        page: page,
        section: section,
    };
    try {
        const updateFetch = await fetch(`http://localhost:8080/add-section`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(model),
            credentials: "include",
        });

        const updateFetchJson = await updateFetch.json();

        if (updateFetchJson.status === "OK") {
            return updateFetchJson;
        } else {
            console.log(updateFetchJson.message);
            return updateFetchJson;
        }
    } catch (e) {
        console.log(e);
    }};

export {
    addSection
}