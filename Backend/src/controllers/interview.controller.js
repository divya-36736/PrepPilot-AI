// const pdfParse = require("pdf-parse")
// const generateInterviewReport = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model");


// async function generateInterViewReportController(req, res){
//     const resumeFile = req.file

//     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
//     const {selfDescription, jobDescription} = req.body

//     const interViewReportByAi = await generateInterviewReport({
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription
//     })

//     const interviewReport = await interviewReportModel.create({
//         user: req.user.id,
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription,
//         ...interViewReportByAi
//     })

//     res.status(201).jsom({
//         massage: "Interview report generated successfully",
//         interviewReport
//     })

// }
// module.exports = {generateInterViewReportController};


const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description controller to generate interview report based on user self description, resume and job description
 */
async function generateInterViewReportController(req, res){
    try {
        const resumeFile = req.file;

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const {selfDescription, jobDescription} = req.body;

        // 1. Get the raw response from the AI
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // =====================================================================
        // 2. SANITIZE THE DATA HERE (Before saving to MongoDB)
        // =====================================================================
        if (interViewReportByAi.skillGaps && Array.isArray(interViewReportByAi.skillGaps)) {
            interViewReportByAi.skillGaps = interViewReportByAi.skillGaps.map(gap => ({
                ...gap,
                severity: gap.severity ? gap.severity.toLowerCase() : 'low'
            }));
        }
        // =====================================================================

        // 3. Save the sanitized data to the database
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        // 4. Send the response
        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error('Interview report generation failed:', error);
        res.status(503).json({
            message: 'Interview service unavailable. Please try again later.',
            error: error.message || 'Service unavailable'
        });
    }
}


// /**
//  * @description controller to generate interview report based on user self description, resume and job description
//  */
// async function generateInterViewReportController(req, res){
//     try {
//         const resumeFile = req.file;

//         const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
//         const {selfDescription, jobDescription} = req.body;

//         // 1. Get the raw response from the AI
//         const interViewReportByAi = await generateInterviewReport({
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription
//         });

//         // =====================================================================
//         // 2. SANITIZE THE DATA HERE (Before saving to MongoDB)
//         // =====================================================================
//         if (interViewReportByAi.skillGaps && Array.isArray(interViewReportByAi.skillGaps)) {
//             interViewReportByAi.skillGaps = interViewReportByAi.skillGaps.map(gap => ({
//                 ...gap,
//                 severity: gap.severity ? gap.severity.toLowerCase() : 'low'
//             }));
//         }
//         // =====================================================================

//         // 3. Save the sanitized data to the database
//         const interviewReport = await interviewReportModel.create({
//             user: req.user.id,
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription,
//             ...interViewReportByAi
//         });

//         // 4. Send the response
//         res.status(201).json({
//             message: "Interview report generated successfully",
//             interviewReport
//         });

//     } catch (error) {
//         console.error('❌ Interview report generation failed:', error);
        
//         // YAHAN CHANGE HUA HAI: Ab yahan fix 503 ki jagah dynamic status aayega 
//         // aur frontend ko crash hone se bachayega
//         const statusCode = error.status || 500;
        
//         res.status(statusCode).json({
//             success: false,
//             message: error.message || 'Interview service unavailable. Please try again later.'
//         });
//     }
// }

/**
 * @description controller to get interview report by interviewId.
 */

async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found."
        })
    }

    res.status(200).json({
        message:"Interview report fetched successfully.",
        interviewReport
    })
}

/**
 * @description controller to get all interview reports of logged in user.
 */

async function getAllInterviewReportController(req, res) {
    const interviewReports = await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message:"Interview reports fetched successfully.",
        interviewReports
    });
}

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportController, generateResumePdfController };