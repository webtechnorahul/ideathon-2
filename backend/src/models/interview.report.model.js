import mongoose from 'mongoose'

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
});


const behaviourQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behaviour question is required"]
    },
    intention: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillsGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skills is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }

},{
    _id: false
})

const preperationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks:{
        type: String,
        required: [true, "Tasks is required"] 
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    mathchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behaviourQuestionSchema: [behaviourQuestionSchema],
    skillsGap: [skillsGapSchema],
    preperationPlan: [preperationPlanSchema]
}, {
    timestamps: true
});

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);
export default interviewReportModel;