
import { CareerRoadmap } from "../models/carrier.model.js";
import { generateCareerRoadmap } from "../services/ai.service.js";

// CREATE ROADMAP
export const createCareerRoadmap = async (req, res) => {
    console.log("Hello:", req.body);
    console.log(req.user);
    
  try {
    const userId = req.user.id;

    const {
      targetRole,
      industry,
      currentSkills,
      experienceLevel,
      hoursPerWeek,
      timeline,
      education,
    } = req.body;

    // Basic validation
    if (
      !targetRole ||
      !industry ||
      !currentSkills ||
      !experienceLevel ||
      !hoursPerWeek ||
      !timeline ||
      !education
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Data that will be sent to AI Agent
    const userData = {
      targetRole,
      industry,
      currentSkills,
      experienceLevel,
      hoursPerWeek,
      timeline,
      education,
    };

    // Generate roadmap using AI Agent
    const aiResult = await generateCareerRoadmap(userData);

    // Save input + AI result
    const roadmap = await CareerRoadmap.create({
      userId,

      input: userData,

      result: aiResult,
    });

    return res.status(201).json({
      message: "Career roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Create Career Roadmap Error:", error);

    return res.status(500).json({
      message: "Failed to generate career roadmap",
      error: error.message,
    });
  }
};


// GET ALL ROADMAPS OF LOGGED-IN USER
export const getMyCareerRoadmaps = async (req, res) => {
  try {
    const userId = req.user.id;

    const roadmaps = await CareerRoadmap.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Career roadmaps fetched successfully",
      roadmaps,
    });
  } catch (error) {
    console.error("Get Career Roadmaps Error:", error);

    return res.status(500).json({
      message: "Failed to fetch career roadmaps",
      error: error.message,
    });
  }
};


// GET ONE ROADMAP
// export const getCareerRoadmapById = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { roadmapId } = req.params;

//     const roadmap = await CareerRoadmap.findOne({
//       _id: roadmapId,
//       userId,
//     });

//     if (!roadmap) {
//       return res.status(404).json({
//         message: "Career roadmap not found",
//       });
//     }

//     return res.status(200).json({
//       message: "Career roadmap fetched successfully",
//       roadmap,
//     });
//   } catch (error) {
//     console.error("Get Career Roadmap Error:", error);

//     return res.status(500).json({
//       message: "Failed to fetch career roadmap",
//       error: error.message,
//     });
//   }
// };


// DELETE ROADMAP
// export const deleteCareerRoadmap = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { roadmapId } = req.params;

//     const roadmap = await CareerRoadmap.findOneAndDelete({
//       _id: roadmapId,
//       userId,
//     });

//     if (!roadmap) {
//       return res.status(404).json({
//         message: "Career roadmap not found",
//       });
//     }

//     return res.status(200).json({
//       message: "Career roadmap deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Career Roadmap Error:", error);

//     return res.status(500).json({
//       message: "Failed to delete career roadmap",
//       error: error.message,
//     });
//   }
// };