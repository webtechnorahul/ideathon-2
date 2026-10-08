import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      required: true,
    },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
    },

    focus: {
      type: String,
      required: true,
    },

    topics: {
      type: [String],
      required: true,
    },

    weeklyHours: {
      type: Number,
      required: true,
    },

    project: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

const jobStrategySchema = new mongoose.Schema(
  {
    companiesToTarget: {
      type: [String],
      required: true,
    },

    portfolioAdvice: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const careerRoadmapSchema = new mongoose.Schema(
  {
    // 👤 Owner of this roadmap
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // User's input
    input: {
      targetRole: {
        type: String,
        required: true,
      },

      industry: {
        type: String,
        required: true,
      },

      currentSkills: {
        type: [String],
        required: true,
      },

      experienceLevel: {
        type: String,
        required: true,
      },

      hoursPerWeek: {
        type: Number,
        required: true,
      },

      timeline: {
        type: String,
        required: true,
      },

      education: {
        type: String,
        required: true,
      },
    },

    // AI generated result
    result: {
      targetRole: {
        type: String,
        required: true,
      },

      summary: {
        type: String,
        required: true,
      },

      skillGaps: {
        type: [skillGapSchema],
        required: true,
      },

      roadmap: {
        type: [roadmapSchema],
        required: true,
      },

      projects: {
        type: [projectSchema],
        required: true,
      },

      interviewPreparation: {
        type: [String],
        required: true,
      },

      jobStrategy: {
        type: jobStrategySchema,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const CareerRoadmap = mongoose.model(
  "CareerRoadmap",
  careerRoadmapSchema
);