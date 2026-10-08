import app from './src/app.js';
import connectDB from './src/config/db.js';
import { generateCareerRoadmap} from './src/services/ai.service.js';

// Connect to DB
await connectDB();

// const userData = {
//   targetRole: "Ai Developer",
//   industry: "Climate Tech",
//   currentSkills: [
//     "Java",
//     "Spring Boot",
//     "SQL",
//     "React"
//   ],
//   experienceLevel: "Fresher",
//   hoursPerWeek: 10,
//   timeline: "6 months",
//   education: "BCA"
// };

// console.log(await generateCareerRoadmap(userData));

// Listening ot the port
app.listen(3000, ()=>{
    console.log("Server is running on port: 3000");
});

