// import axios from "axios";

// // const api = axios.create({
// //     baseURL: "http://localhost:3000",
// //     withCredentials: true,
// // })


// // Sirf root URL set karein, kyunki functions ke andar "/api/..." already likha hai
// const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const api = axios.create({
//     baseURL: backendUrl, 
//     withCredentials: true,
// });

// // ... baaki ka poora code (generateInterviewReport, getInterviewReportById, etc.) bilkul same rahega

// /**
//  * @description Service to generate interview report based on user self description, resume and job description.
//  */
// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

//     const formData = new FormData()
//     formData.append("jobDescription", jobDescription)
//     formData.append("selfDescription", selfDescription)
//     formData.append("resume", resumeFile)

//     const response = await api.post("/api/interview/", formData, {
//         headers: {
//             "Content-Type": "multipart/form-data"
//         }
//     })

//     return response.data

// }


// /**
//  * @description Service to get interview report by interviewId.
//  */
// export const getInterviewReportById = async (interviewId) => {
//     const response = await api.get(`/api/interview/report/${interviewId}`)

//     return response.data
// }


// /**
//  * @description Service to get all interview reports of logged in user.
//  */
// export const getAllInterviewReports = async () => {
//     const response = await api.get("/api/interview/")

//     return response.data
// }


// /**
//  * @description Service to generate resume pdf based on user self description, resume content and job description.
//  */
// export const generateResumePdf = async ({ interviewReportId }) => {
//     const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
//         responseType: "blob"
//     })

//     return response.data
// }

import axios from "axios";

// Sirf root URL set karein
const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: backendUrl, 
    withCredentials: true,
});

// ====================================================================
// 🛠 HELPER FUNCTION: Clean error messages nikalne ke liye
// ====================================================================
const getErrorMessage = (err) => {
    if (err.response && err.response.data && err.response.data.message) {
        return err.response.data.message;
    }
    return err.message || "Something went wrong. Please try again.";
};

// ====================================================================
// 🚀 API SERVICES
// ====================================================================

/**
 * @description Service to generate interview report
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resume", resumeFile);

        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        const exactError = getErrorMessage(error);
        console.error("Generate Report Error:", exactError);
        throw new Error(exactError); // Taki UI component catch kar sake
    }
};

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return response.data;
    } catch (error) {
        const exactError = getErrorMessage(error);
        console.error("Get Report By ID Error:", exactError);
        throw new Error(exactError);
    }
};

/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/");
        return response.data;
    } catch (error) {
        const exactError = getErrorMessage(error);
        console.error("Get All Reports Error:", exactError);
        throw new Error(exactError);
    }
};

/**
 * @description Service to generate resume pdf
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    try {
        const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
            responseType: "blob"
        });
        return response.data;
    } catch (error) {
        // Blob type requests ke errors thode alag aate hain, par helper unhe handle kar lega
        const exactError = getErrorMessage(error);
        console.error("Generate PDF Error:", exactError);
        throw new Error(exactError);
    }
};