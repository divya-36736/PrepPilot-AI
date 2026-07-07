// const {GoogleGenAI} = require("@google/genai")
// const {z} = require("zod")
// const {zodToJsonSchema} = require("zod-to-json-schema");
// delete jsonSchema.$schema;

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })



// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-1.5-flash", // Switching to flash for testing to avoid 429s
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: jsonSchema,
//             }
//         });

//         return JSON.parse(response.text);

//     } catch (error) {
//         // Catch the specific 429 error
//         if (error.status === 429) {
//             console.error("⚠️ AI API Rate Limit Exceeded. Please wait 1 minute before trying again.");
//             // If this is connected to an Express route, you should return a 429 to your frontend:
//             // res.status(429).json({ error: "Too many requests. Please try again in a minute." });
//         } else {
//             console.error("❌ An unexpected error occurred:", error.message);
//         }
        
//         // Throw the error so the calling function knows it failed, 
//         // but the try/catch prevents the whole Node process from asserting and crashing.
//         throw error; 
//     }
//     console.log(JSON.parse(response.text));

// }

// module.exports = generateInterviewReport;

// const {GoogleGenAI} = require("@google/genai");
// const {z} = require("zod");
// const {zodToJsonSchema} = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// const interviewReportSchema = z.object({
//   matchScore: z.number().describe(
//     "An integer score between 0 and 100 representing how closely the candidate's resume matches the job description. Consider technical skills, projects, experience, education, tools, and domain knowledge."
//   ),

//   technicalQuestions: z.array(
//     z.object({
//       question: z.string().describe(
//         "A realistic technical interview question tailored to the job description, required skills, and candidate profile."
//       ),
//       intention: z.string().describe(
//         "Explain why the interviewer is asking this question and what skill, concept, or competency is being evaluated."
//       ),
//       answer: z.string().describe(
//         "A detailed interview-ready answer guide. Include key concepts, approach, examples, best practices, and points the candidate should mention to give a strong response."
//       )
//     })
//   ).describe(
//     "Generate 5-10 highly relevant technical interview questions customized to the job description and candidate profile."
//   ),

//   behavioralQuestions: z.array(
//     z.object({
//       question: z.string().describe(
//         "A realistic behavioral or HR interview question relevant to the role and candidate background."
//       ),
//       intention: z.string().describe(
//         "Explain what personality trait, soft skill, leadership quality, communication ability, teamwork skill, or problem-solving ability the interviewer wants to assess."
//       ),
//       answer: z.string().describe(
//         "Provide a strong sample answer using a professional structure such as STAR (Situation, Task, Action, Result) whenever applicable."
//       )
//     })
//   ).describe(
//     "Generate 5-10 behavioral interview questions that are likely to be asked for this role."
//   ),

//   skillGaps: z.array(
//     z.object({
//       skill: z.string().describe(
//         "A specific missing or weak skill identified by comparing the candidate profile with the job requirements."
//       ),
//       severity: z.enum(["low", "medium", "high"]).describe(
//         "How critical this skill gap is for the target role. High means it may significantly reduce interview or hiring chances."
//       )
//     })
//   ).describe(
//     "List the candidate's missing skills, weak areas, technologies, concepts, or experiences compared to the job requirements."
//   ),

//   preparationPlan: z.array(
//     z.object({
//       day: z.number().describe(
//         "Sequential day number starting from 1."
//       ),
//       focus: z.string().describe(
//         "The primary learning objective for the day such as DSA, System Design, JavaScript, React, Backend Development, Database Design, Behavioral Preparation, or Mock Interviews."
//       ),
//       tasks: z.array(z.string()).describe(
//         "Specific actionable tasks the candidate should complete on that day. Tasks should be practical, measurable, and directly related to interview preparation."
//       )
//     })
//   ).describe(
//     "A structured day-by-day interview preparation roadmap customized to the candidate's skill gaps and job requirements."
//   ),

//   title: z.string().describe(
//     "The exact job title extracted from the job description, such as Frontend Developer, Full Stack Developer, Data Analyst, Machine Learning Engineer, Software Engineer, etc."
//   )
// });

// // 2. Generate the jsonSchema and delete the $schema property AFTER the Zod object is defined
// // const jsonSchema = zodToJsonSchema(interviewReportSchema);
// // delete jsonSchema.$schema;
// const jsonSchema = zodToJsonSchema(interviewReportSchema);
// delete jsonSchema.$schema;
// delete jsonSchema.additionalProperties;

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     // 3. Added instruction to strictly follow the schema
//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
                        
//                         Return the result strictly as a JSON object matching the provided schema.`;

//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash", 
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: jsonSchema, 
                
//             }
//         });

//         // 4. Return the parsed JSON directly
//         const parsedResponse = JSON.parse(response.text);
//         console.log(parsedResponse); // Log it here to see it in your terminal
//         return parsedResponse;

//     } catch (error) {
//         if (error.status === 429) {
//             console.error("⚠️ AI API Rate Limit Exceeded. Please wait 1 minute before trying again.");
//         } else {
//             console.error("❌ An unexpected error occurred:", error.message);
//         }
//         throw error; 
//     }
// }

// module.exports = generateInterviewReport;


const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// 1. Define the schema natively using Google's Type enum
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "An integer score between 0 and 100 representing how closely the candidate's resume matches the job description. Consider technical skills, projects, experience, education, tools, and domain knowledge."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Generate 5-10 highly relevant technical interview questions customized to the job description and candidate profile.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "A realistic technical interview question tailored to the job description, required skills, and candidate profile." },
                    intention: { type: Type.STRING, description: "Explain why the interviewer is asking this question and what skill, concept, or competency is being evaluated." },
                    answer: { type: Type.STRING, description: "A detailed interview-ready answer guide. Include key concepts, approach, examples, best practices, and points the candidate should mention to give a strong response." }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Generate 5-10 behavioral interview questions that are likely to be asked for this role.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "A realistic behavioral or HR interview question relevant to the role and candidate background." },
                    intention: { type: Type.STRING, description: "Explain what personality trait, soft skill, leadership quality, communication ability, teamwork skill, or problem-solving ability the interviewer wants to assess." },
                    answer: { type: Type.STRING, description: "Provide a strong sample answer using a professional structure such as STAR (Situation, Task, Action, Result) whenever applicable." }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List the candidate's missing skills, weak areas, technologies, concepts, or experiences compared to the job requirements.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "A specific missing or weak skill identified by comparing the candidate profile with the job requirements." },
                    severity: { type: Type.STRING, description: "How critical this skill gap is for the target role. (low, medium, high)" ,
                      enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A structured day-by-day interview preparation roadmap customized to the candidate's skill gaps and job requirements.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "Sequential day number starting from 1." },
                    focus: { type: Type.STRING, description: "The primary learning objective for the day." },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Specific actionable tasks the candidate should complete on that day.",
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description: "The exact job title extracted from the job description."
        }
    },
    // 2. Explicitly define required fields so the model doesn't skip them
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
    
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;
    const maxAttempts = 3
    const baseDelayMs = 2500
    let lastErr = null

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: interviewReportSchema,
                }
            })

            const parsedResponse = JSON.parse(response.text)
            console.log("✅ Successfully parsed strict JSON:")
            console.log(JSON.stringify(parsedResponse, null, 2))
            return parsedResponse

        } catch (error) {
            lastErr = error
            const status = error && error.status ? error.status : null

            // Retry on transient errors: 429 (rate limit), 503 (service unavailable), or network issues
            const isTransient = status === 429 || status === 503 || /network error/i.test(error.message || '') || /high demand/i.test(error.message || '')

            console.warn(`AI request failed (attempt ${attempt}/${maxAttempts})`, error.message || error)

            if (attempt < maxAttempts && isTransient) {
                const delay = baseDelayMs * attempt
                console.log(`Retrying AI call in ${delay}ms...`)
                // eslint-disable-next-line no-await-in-loop
                await new Promise(r => setTimeout(r, delay))
                continue
            }

            // If not transient or retries exhausted, throw a clear error with status if present
            if (status) {
                const err = new Error(error.message || 'AI service error')
                err.status = status
                throw err
            }
            throw error
        }
    }

    // Should not reach here, but throw last error defensively
    throw lastErr
}

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generatePdfFromHtml(htmlContent) {
//     // Cloud server (Render) par Puppeteer chalane ke liye args dena bahut zaroori hai
//     const browser = await puppeteer.launch({
//     // 👇 Yeh line Docker ke liye sabse zaroori hai
//     executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
//     headless: "new",
//     args: [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage' // Ye low-RAM servers ko crash hone se bachata hai
//     ]
    
// });
//     // 2. SMART CHECK: Kahan chal raha hai code?
//     if (process.env.PUPPETEER_EXECUTABLE_PATH) {
//         // ✅ Agar Render/Docker par hai, toh unka path use karega
//         launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
//     } else {
//         // ✅ Agar Localhost par hai, toh aapke laptop ka asli Chrome use karega
//         launchOptions.channel = 'chrome'; 
//     }

//     // 3. Browser launch karein
//     const browser = await puppeteer.launch(launchOptions);

//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" });

//     const pdfBuffer = await page.pdf({
//         format: "A4", 
//         margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
//     });

//     await browser.close();

//     return pdfBuffer;
// }

async function generatePdfFromHtml(htmlContent) {
    // 1. Basic configurations
    const launchOptions = {
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote'
        ]
    };

    // 2. SMART CHECK: Kahan chal raha hai code?
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        // Agar Render/Docker par hai
        launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    } else {
        // Agar Localhost par hai
        launchOptions.channel = 'chrome'; 
    }

    console.log("🚀 Launching Puppeteer with options:", JSON.stringify(launchOptions));

    // 3. Browser launch karein (Yahan sirf ek baar 'const browser' hai)
    const browser = await puppeteer.launch(launchOptions);
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4", 
        margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    });

    await browser.close();

    return pdfBuffer;
}

// Normalize links in HTML so PDFs created by Puppeteer have proper link annotations.
function normalizeLinksInHtml(html) {
    if (!html || typeof html !== 'string') return html;

    // 1) Ensure all anchor hrefs have a protocol (skip mailto:)
    html = html.replace(/href="(?!https?:|mailto:)([^"]+)"/gi, (m, p1) => {
        // prepend https if missing
        return `href="https://${p1.replace(/^\/+/, '')}"`;
    });

    // 2) Convert bare URLs (github.com, leetcode.com, www., http(s)://) into anchor tags
    // This will skip existing anchors because they contain href=" which we've already handled above.
    const urlRegex = /(?:(https?:\/\/)?(www\.|github\.com\/|leetcode\.com\/)[\w\-._~:\/?#\[\]@!$&'()*+,;=%]+)/gi;
    html = html.replace(urlRegex, (match) => {
        // if already inside an anchor tag, leave it (simple heuristic)
        // (This regex replacement runs on HTML string; it's possible it may wrap inside tags in edge cases.)
        const href = match.match(/^https?:\/\//i) ? match : `https://${match}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });

    return html;
}

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })


//     const jsonContent = JSON.parse(response.text)

//     // Normalize links added by the AI so they become clickable in the generated PDF
//     const safeHtml = normalizeLinksInHtml(jsonContent.html)

//     const pdfBuffer = await generatePdfFromHtml(safeHtml)

//     return pdfBuffer

// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         The response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        
//                         CRITICAL INSTRUCTION FOR LINKS: Make sure all URLs, emails, and profile links (like LinkedIn, GitHub, LeetCode, Portfolios) are wrapped in proper HTML anchor tags. 
//                         Example: <a href="https://github.com/username">GitHub</a>. Do not just output raw text URLs.

//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: zodToJsonSchema(resumePdfSchema),
//             }
//         });

//         const jsonContent = JSON.parse(response.text);

//         // Normalize links added by the AI so they become clickable in the generated PDF
//         const safeHtml = normalizeLinksInHtml(jsonContent.html);

//         const pdfBuffer = await generatePdfFromHtml(safeHtml);

//         return pdfBuffer;

//     } catch (error) {
//         // Handle Gemini 503 High Demand Error gracefully
//         if (error.status === 503 || (error.message && error.message.includes("high demand"))) {
//             console.error("⚠️ AI is currently busy:", error.message);
//             throw new Error("AI is currently very busy due to high demand. Please wait a few minutes and try downloading again.");
//         } 
        
//         // Log other unexpected errors
//         console.error("❌ An unexpected error occurred during PDF generation:", error.message);
//         throw error;
//     }
// }

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    // 1. NAYA PROMPT (Strict CSS aur Formatting ke sath)
    const prompt = `Generate a highly professional, ATS-friendly resume for a candidate based on the following details:
                    Resume Data: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

                    The response MUST be a JSON object with a single field "html". This field should contain the COMPLETE and well-formatted HTML content of the resume.
                    
                    CRITICAL HTML & STYLING INSTRUCTIONS (DO NOT IGNORE):
                    1. INJECT INLINE CSS: Use a clean, modern, and professional font family (like 'Inter', 'Segoe UI', Arial, sans-serif). 
                    2. Add proper padding and margins between sections (Education, Skills, Experience). 
                    3. Make section headings bold, slightly larger, and give them a professional accent color (e.g., dark blue #1e3a8a or dark grey #333) with a subtle bottom border.
                    4. Use standard <ul> and <li> tags for all bullet points. Add slight margin-bottom to <li> elements for readability.
                    5. The overall layout should be structured and visually appealing, using <div> and <span> tags with inline styles.
                    
                    CRITICAL INSTRUCTION FOR LINKS (READ CAREFULLY - DO NOT HALLUCINATE): 
                    1. STRICTLY EXTRACT the ACTUAL URLs (LinkedIn, GitHub, LeetCode, Portfolios, Email, etc.) provided in the "Resume Data" above.
                    2. DO NOT make up, guess, or use placeholder links (like "github.com/username").
                    3. Wrap these exact extracted URLs in proper HTML anchor tags. 
                    Example format: <a href="[INSERT EXACT EXTRACTED URL HERE]" style="color: #2563eb; text-decoration: none;">GitHub</a>

                    Keep the resume to 1-2 pages maximum. Highlight relevant skills and experiences to maximize the ATS score.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // Ekdum sahi model!
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema),
            }
        });

        const jsonContent = JSON.parse(response.text);

        // 2. MAIN FIX: Yahan se normalizeLinksInHtml HATA DIYA HAI!
        // Ab hum direct Gemini ka banaya hua clean HTML use karenge.
        const safeHtml = jsonContent.html;

        const pdfBuffer = await generatePdfFromHtml(safeHtml);

        return pdfBuffer;

    } catch (error) {
        if (error.status === 503 || (error.message && error.message.includes("high demand"))) {
            console.error("⚠️ AI is currently busy:", error.message);
            throw new Error("AI is currently very busy due to high demand. Please wait a few minutes and try downloading again.");
        } 
        
        console.error("❌ An unexpected error occurred during PDF generation:", error.message);
        throw error;
    }
}



module.exports = { generateInterviewReport, generateResumePdf };