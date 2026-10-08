import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Target,
  BookOpen,
  Map,
  FolderKanban,
  MessageSquare,
  Briefcase,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function Roadmap() {
  const { roadmaps } = useSelector((state) => state.ai);

  // Currently selected roadmap
  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState(0);

  // =========================
  // Empty
  // =========================
  if (!roadmaps || roadmaps.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No roadmap found.</p>
      </div>
    );
  }

  // =========================
  // Selected roadmap
  // =========================
  const roadmapItem = roadmaps[selectedRoadmapIndex];

  const roadmapData = roadmapItem?.result;
  const input = roadmapItem?.input;

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Invalid roadmap data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          ROADMAP SELECTOR
      ===================================================== */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Your Roadmaps
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select a roadmap to view its complete details.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {roadmaps.length} roadmap
              {roadmaps.length > 1 ? "s" : ""}
            </span>

          </div>

          {/* Roadmap Buttons */}
          <div className="flex gap-3 overflow-x-auto pb-2">

            {roadmaps.map((roadmap, index) => {

              const item = roadmap?.result;
              const roadmapInput = roadmap?.input;

              const isSelected =
                selectedRoadmapIndex === index;

              return (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedRoadmapIndex(index)
                  }
                  className={`
                    min-w-[230px]
                    text-left
                    p-4
                    rounded-xl
                    border
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "bg-green-600 text-white border-green-600 shadow-md"
                        : "bg-white text-gray-900 border-gray-200 hover:border-green-400 hover:shadow-sm"
                    }
                  `}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          isSelected
                            ? "text-green-100"
                            : "text-green-600"
                        }`}
                      >
                        Roadmap {index + 1}
                      </p>

                      <h3 className="font-bold mt-1 line-clamp-2">
                        {item?.targetRole ||
                          roadmapInput?.targetRole ||
                          "Career Roadmap"}
                      </h3>

                    </div>

                    {isSelected && (
                      <CheckCircle
                        size={20}
                        className="shrink-0 mt-1"
                      />
                    )}

                  </div>

                  {roadmapInput?.industry && (
                    <p
                      className={`text-sm mt-2 ${
                        isSelected
                          ? "text-green-100"
                          : "text-gray-500"
                      }`}
                    >
                      {roadmapInput.industry}
                    </p>
                  )}

                </button>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          HERO / HEADER
      ===================================================== */}
      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">
                Your Career Roadmap
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                {roadmapData.targetRole ||
                  input?.targetRole}
              </h1>

              <p className="mt-4 text-gray-600 max-w-3xl text-lg leading-7">

                {input?.industry && `${input.industry} • `}

                Personalized career roadmap designed according
                to your current skills, experience and career goal.

              </p>

            </div>

            {/* Weekly Hours */}
            <div className="flex items-center gap-4 bg-green-50 border border-green-100 px-6 py-5 rounded-2xl shrink-0">

              <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                <Clock size={24} />
              </div>

              <div>

                <p className="text-sm text-green-700">
                  Weekly Commitment
                </p>

                <p className="text-xl font-bold text-gray-900">
                  {input?.hoursPerWeek || "N/A"} hours/week
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* =================================================
            OVERVIEW
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={Target}
            title="Roadmap Overview"
            description="Understand your career goal and the journey ahead."
          />

          <div className="bg-white border rounded-2xl p-6 md:p-8">

            <p className="text-gray-600 leading-8 text-lg">
              {roadmapData.summary ||
                "No summary available."}
            </p>

          </div>

        </section>

        {/* =================================================
            YOUR GOAL
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={Target}
            title="Your Goal"
            description="The career information used to create your roadmap."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <InfoCard
              title="Target Role"
              value={input?.targetRole}
            />

            <InfoCard
              title="Industry"
              value={input?.industry}
            />

            <InfoCard
              title="Experience"
              value={input?.experienceLevel}
            />

            <InfoCard
              title="Timeline"
              value={input?.timeline}
            />

          </div>

        </section>

        {/* =================================================
            CURRENT SKILLS
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={BookOpen}
            title="Current Skills"
            description="Skills you already have before starting this roadmap."
          />

          <div className="bg-white border rounded-2xl p-6">

            {input?.currentSkills?.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {input.currentSkills.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="text-gray-500">
                No current skills provided.
              </p>

            )}

          </div>

        </section>

        {/* =================================================
            SKILL GAPS
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={AlertTriangle}
            title="Skill Gaps"
            description="Skills you need to develop to reach your target role."
          />

          {roadmapData.skillGaps?.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {roadmapData.skillGaps.map(
                (item, index) => (

                  <div
                    key={index}
                    className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-lg font-bold text-gray-900">
                          {item.skill}
                        </h3>

                        <p className="mt-3 text-gray-600 leading-7">
                          {item.reason}
                        </p>

                      </div>

                      <PriorityBadge
                        priority={item.priority}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <EmptyState
              message="No skill gaps available."
            />

          )}

        </section>

        {/* =================================================
            ROADMAP
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={Map}
            title="Month-by-Month Roadmap"
            description="Follow these learning phases step by step."
          />

          {roadmapData.roadmap?.length > 0 ? (

            <div className="space-y-6">

              {roadmapData.roadmap.map(
                (month, index) => (

                  <MonthCard
                    key={month.month || index}
                    month={month}
                    index={index}
                  />

                )
              )}

            </div>

          ) : (

            <EmptyState
              message="No roadmap phases available."
            />

          )}

        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={FolderKanban}
            title="Recommended Projects"
            description="Build these projects to strengthen your portfolio."
          />

          {roadmapData.projects?.length > 0 ? (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {roadmapData.projects.map(
                (project, index) => (

                  <div
                    key={index}
                    className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >

                    <div className="flex items-center gap-3 mb-4">

                      <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                        <FolderKanban size={22} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {project.name}
                      </h3>

                    </div>

                    <p className="text-gray-600 leading-7">
                      {project.description}
                    </p>

                    {project.skills?.length > 0 && (

                      <div className="mt-6">

                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          Skills Used
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {project.skills.map(
                            (skill, skillIndex) => (

                              <span
                                key={skillIndex}
                                className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
                              >
                                {skill}
                              </span>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

          ) : (

            <EmptyState
              message="No projects available."
            />

          )}

        </section>

        {/* =================================================
            INTERVIEW PREPARATION
        ================================================= */}
        <section className="mb-14">

          <SectionHeader
            icon={MessageSquare}
            title="Interview Preparation"
            description="Prepare these areas before applying for jobs."
          />

          {roadmapData.interviewPreparation?.length > 0 ? (

            <div className="bg-white border rounded-2xl p-6">

              <div className="space-y-4">

                {roadmapData.interviewPreparation.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                    >

                      <div className="p-2 bg-green-100 text-green-700 rounded-lg shrink-0">
                        <CheckCircle size={18} />
                      </div>

                      <p className="text-gray-700 leading-7">
                        {item}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          ) : (

            <EmptyState
              message="No interview preparation details available."
            />

          )}

        </section>

        {/* =================================================
            JOB STRATEGY
        ================================================= */}
        <section className="mb-10">

          <SectionHeader
            icon={Briefcase}
            title="Job Strategy"
            description="How to target companies and present yourself."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Companies */}
            <div className="bg-white border rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Companies to Target
              </h3>

              {roadmapData.jobStrategy?.companiesToTarget?.length > 0 ? (

                <div className="space-y-4">

                  {roadmapData.jobStrategy.companiesToTarget.map(
                    (company, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle
                          size={19}
                          className="text-green-600 mt-1 shrink-0"
                        />

                        <p className="text-gray-700">
                          {company}
                        </p>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-500">
                  No company recommendations available.
                </p>

              )}

            </div>

            {/* Portfolio */}
            <div className="bg-white border rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Portfolio Advice
              </h3>

              <p className="text-gray-600 leading-7">
                {roadmapData.jobStrategy?.portfolioAdvice ||
                  "No portfolio advice available."}
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="mb-6">

      <div className="flex items-center gap-3">

        <div className="p-2.5 bg-green-100 text-green-700 rounded-xl">
          <Icon size={22} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>

      </div>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

    </div>
  );
}

/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-5">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 font-bold text-gray-900">
        {value || "N/A"}
      </p>

    </div>
  );
}

/* =====================================================
   PRIORITY BADGE
===================================================== */

function PriorityBadge({ priority }) {
  const styles = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
        styles[priority] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {priority || "N/A"}
    </span>
  );
}

/* =====================================================
   MONTH CARD
===================================================== */

function MonthCard({ month, index }) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gray-900 text-white p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-green-400 text-sm font-semibold">
              MONTH {month.month || index + 1}
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {month.focus || "Learning Phase"}
            </h3>

          </div>

          {month.weeklyHours && (

            <div className="flex items-center gap-2 text-sm">

              <Clock size={18} />

              <span>
                {month.weeklyHours} hours/week
              </span>

            </div>

          )}

        </div>

      </div>

      <div className="p-6">

        {/* Topics */}
        <div>

          <h4 className="font-bold text-lg mb-4">
            Topics to Learn
          </h4>

          {month.topics?.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {month.topics.map(
                (topic, topicIndex) => (

                  <div
                    key={topicIndex}
                    className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
                  >

                    <CheckCircle
                      size={19}
                      className="text-green-600 mt-0.5 shrink-0"
                    />

                    <span className="text-gray-700">
                      {topic}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="text-gray-500">
              No topics available.
            </p>

          )}

        </div>

        {/* Project */}
        {month.project && (

          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">

            <p className="text-sm font-semibold text-green-700 mb-2">
              MONTHLY PROJECT
            </p>

            <p className="text-gray-800 leading-7">
              {month.project}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState({ message }) {
  return (
    <div className="bg-white border rounded-2xl p-8 text-center">

      <p className="text-gray-500">
        {message}
      </p>

    </div>
  );
}

export default Roadmap;






























// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   Target,
//   BookOpen,
//   Map,
//   FolderKanban,
//   MessageSquare,
//   Briefcase,
//   Clock,
//   CheckCircle,
//   AlertTriangle,
//   ArrowRight,
// } from "lucide-react";

// function Roadmap() {
//   const { roadmaps} = useSelector((state) => state.ai);

//   // =========================
//   // Loading
//   // =========================
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
// //           <p className="text-gray-600">Loading roadmap...</p>
// //         </div>
// //       </div>
// //     );
// //   }

//   // =========================
//   // Error
//   // =========================
// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// //         <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
// //           {error}
// //         </div>
// //       </div>
// //     );
// //   }

//   // =========================
//   // Empty
//   // =========================
//   if (!roadmaps || roadmaps.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500">No roadmap found.</p>
//       </div>
//     );
//   }

//   /*
//     Expected API structure:

//     [
//       {
//         input: {
//           targetRole,
//           industry,
//           experienceLevel,
//           timeline,
//           currentSkills,
//           hoursPerWeek
//         },

//         result: {
//           targetRole,
//           summary,
//           skillGaps,
//           roadmap,
//           projects,
//           interviewPreparation,
//           jobStrategy
//         }
//       }
//     ]
//   */

//   const roadmapItem = roadmaps[0];
//   const roadmapData = roadmapItem?.result;
//   const input = roadmapItem?.input;

//   if (!roadmapData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500">Invalid roadmap data.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* =====================================================
//           HERO / HEADER
//       ===================================================== */}
//       <section className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

//             <div>
//               <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">
//                 Your Career Roadmap
//               </p>

//               <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
//                 {roadmapData.targetRole || input?.targetRole}
//               </h1>

//               <p className="mt-4 text-gray-600 max-w-3xl text-lg leading-7">
//                 {input?.industry && `${input.industry} • `}
//                 Personalized career roadmap designed according to your
//                 current skills, experience and career goal.
//               </p>
//             </div>

//             {/* Weekly Hours */}
//             <div className="flex items-center gap-4 bg-green-50 border border-green-100 px-6 py-5 rounded-2xl shrink-0">
//               <div className="p-3 bg-green-100 text-green-700 rounded-xl">
//                 <Clock size={24} />
//               </div>

//               <div>
//                 <p className="text-sm text-green-700">
//                   Weekly Commitment
//                 </p>

//                 <p className="text-xl font-bold text-gray-900">
//                   {input?.hoursPerWeek || "N/A"} hours/week
//                 </p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

//         {/* =================================================
//             OVERVIEW
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={Target}
//             title="Roadmap Overview"
//             description="Understand your career goal and the journey ahead."
//           />

//           <div className="bg-white border rounded-2xl p-6 md:p-8">
//             <p className="text-gray-600 leading-8 text-lg">
//               {roadmapData.summary || "No summary available."}
//             </p>
//           </div>

//         </section>

//         {/* =================================================
//             YOUR GOAL
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={Target}
//             title="Your Goal"
//             description="The career information used to create your roadmap."
//           />

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

//             <InfoCard
//               title="Target Role"
//               value={input?.targetRole}
//             />

//             <InfoCard
//               title="Industry"
//               value={input?.industry}
//             />

//             <InfoCard
//               title="Experience"
//               value={input?.experienceLevel}
//             />

//             <InfoCard
//               title="Timeline"
//               value={input?.timeline}
//             />

//           </div>

//         </section>

//         {/* =================================================
//             CURRENT SKILLS
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={BookOpen}
//             title="Current Skills"
//             description="Skills you already have before starting this roadmap."
//           />

//           <div className="bg-white border rounded-2xl p-6">

//             {input?.currentSkills?.length > 0 ? (
//               <div className="flex flex-wrap gap-3">

//                 {input.currentSkills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
//                   >
//                     {skill}
//                   </span>
//                 ))}

//               </div>
//             ) : (
//               <p className="text-gray-500">
//                 No current skills provided.
//               </p>
//             )}

//           </div>

//         </section>

//         {/* =================================================
//             SKILL GAPS
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={AlertTriangle}
//             title="Skill Gaps"
//             description="Skills you need to develop to reach your target role."
//           />

//           {roadmapData.skillGaps?.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {roadmapData.skillGaps.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow"
//                 >

//                   <div className="flex items-start justify-between gap-4">

//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {item.skill}
//                       </h3>

//                       <p className="mt-3 text-gray-600 leading-7">
//                         {item.reason}
//                       </p>
//                     </div>

//                     <PriorityBadge priority={item.priority} />

//                   </div>

//                 </div>
//               ))}

//             </div>
//           ) : (
//             <EmptyState message="No skill gaps available." />
//           )}

//         </section>

//         {/* =================================================
//             ROADMAP
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={Map}
//             title="Month-by-Month Roadmap"
//             description="Follow these learning phases step by step."
//           />

//           {roadmapData.roadmap?.length > 0 ? (
//             <div className="space-y-6">

//               {roadmapData.roadmap.map((month, index) => (
//                 <MonthCard
//                   key={month.month || index}
//                   month={month}
//                   index={index}
//                 />
//               ))}

//             </div>
//           ) : (
//             <EmptyState message="No roadmap phases available." />
//           )}

//         </section>

//         {/* =================================================
//             PROJECTS
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={FolderKanban}
//             title="Recommended Projects"
//             description="Build these projects to strengthen your portfolio."
//           />

//           {roadmapData.projects?.length > 0 ? (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//               {roadmapData.projects.map((project, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow"
//                 >

//                   <div className="flex items-center gap-3 mb-4">

//                     <div className="p-3 bg-green-100 text-green-700 rounded-xl">
//                       <FolderKanban size={22} />
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900">
//                       {project.name}
//                     </h3>

//                   </div>

//                   <p className="text-gray-600 leading-7">
//                     {project.description}
//                   </p>

//                   {project.skills?.length > 0 && (
//                     <div className="mt-6">

//                       <p className="text-sm font-semibold text-gray-700 mb-3">
//                         Skills Used
//                       </p>

//                       <div className="flex flex-wrap gap-2">

//                         {project.skills.map((skill, skillIndex) => (
//                           <span
//                             key={skillIndex}
//                             className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
//                           >
//                             {skill}
//                           </span>
//                         ))}

//                       </div>

//                     </div>
//                   )}

//                 </div>
//               ))}

//             </div>
//           ) : (
//             <EmptyState message="No projects available." />
//           )}

//         </section>

//         {/* =================================================
//             INTERVIEW PREPARATION
//         ================================================= */}
//         <section className="mb-14">

//           <SectionHeader
//             icon={MessageSquare}
//             title="Interview Preparation"
//             description="Prepare these areas before applying for jobs."
//           />

//           {roadmapData.interviewPreparation?.length > 0 ? (
//             <div className="bg-white border rounded-2xl p-6">

//               <div className="space-y-4">

//                 {roadmapData.interviewPreparation.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
//                   >

//                     <div className="p-2 bg-green-100 text-green-700 rounded-lg shrink-0">
//                       <CheckCircle size={18} />
//                     </div>

//                     <p className="text-gray-700 leading-7">
//                       {item}
//                     </p>

//                   </div>
//                 ))}

//               </div>

//             </div>
//           ) : (
//             <EmptyState message="No interview preparation details available." />
//           )}

//         </section>

//         {/* =================================================
//             JOB STRATEGY
//         ================================================= */}
//         <section className="mb-10">

//           <SectionHeader
//             icon={Briefcase}
//             title="Job Strategy"
//             description="How to target companies and present yourself."
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//             {/* Companies */}
//             <div className="bg-white border rounded-2xl p-6">

//               <h3 className="text-xl font-bold text-gray-900 mb-5">
//                 Companies to Target
//               </h3>

//               {roadmapData.jobStrategy?.companiesToTarget?.length > 0 ? (
//                 <div className="space-y-4">

//                   {roadmapData.jobStrategy.companiesToTarget.map(
//                     (company, index) => (
//                       <div
//                         key={index}
//                         className="flex items-start gap-3"
//                       >
//                         <CheckCircle
//                           size={19}
//                           className="text-green-600 mt-1 shrink-0"
//                         />

//                         <p className="text-gray-700">
//                           {company}
//                         </p>
//                       </div>
//                     )
//                   )}

//                 </div>
//               ) : (
//                 <p className="text-gray-500">
//                   No company recommendations available.
//                 </p>
//               )}

//             </div>

//             {/* Portfolio */}
//             <div className="bg-white border rounded-2xl p-6">

//               <h3 className="text-xl font-bold text-gray-900 mb-5">
//                 Portfolio Advice
//               </h3>

//               <p className="text-gray-600 leading-7">
//                 {roadmapData.jobStrategy?.portfolioAdvice ||
//                   "No portfolio advice available."}
//               </p>

//             </div>

//           </div>

//         </section>

//       </main>
//     </div>
//   );
// }

// /* =====================================================
//    SECTION HEADER
// ===================================================== */

// function SectionHeader({
//   icon: Icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="mb-6">

//       <div className="flex items-center gap-3">

//         <div className="p-2.5 bg-green-100 text-green-700 rounded-xl">
//           <Icon size={22} />
//         </div>

//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//           {title}
//         </h2>

//       </div>

//       <p className="mt-3 text-gray-600">
//         {description}
//       </p>

//     </div>
//   );
// }

// /* =====================================================
//    INFO CARD
// ===================================================== */

// function InfoCard({ title, value }) {
//   return (
//     <div className="bg-white border rounded-xl p-5">

//       <p className="text-sm text-gray-500">
//         {title}
//       </p>

//       <p className="mt-2 font-bold text-gray-900">
//         {value || "N/A"}
//       </p>

//     </div>
//   );
// }

// /* =====================================================
//    PRIORITY BADGE
// ===================================================== */

// function PriorityBadge({ priority }) {
//   const styles = {
//     HIGH: "bg-red-100 text-red-700",
//     MEDIUM: "bg-yellow-100 text-yellow-700",
//     LOW: "bg-green-100 text-green-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
//         styles[priority] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {priority || "N/A"}
//     </span>
//   );
// }

// /* =====================================================
//    MONTH CARD
// ===================================================== */

// function MonthCard({ month, index }) {
//   return (
//     <div className="bg-white border rounded-2xl overflow-hidden">

//       {/* Header */}
//       <div className="bg-gray-900 text-white p-6">

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <div>

//             <p className="text-green-400 text-sm font-semibold">
//               MONTH {month.month || index + 1}
//             </p>

//             <h3 className="text-2xl font-bold mt-1">
//               {month.focus || "Learning Phase"}
//             </h3>

//           </div>

//           {month.weeklyHours && (
//             <div className="flex items-center gap-2 text-sm">
//               <Clock size={18} />

//               <span>
//                 {month.weeklyHours} hours/week
//               </span>
//             </div>
//           )}

//         </div>

//       </div>

//       <div className="p-6">

//         {/* Topics */}
//         <div>

//           <h4 className="font-bold text-lg mb-4">
//             Topics to Learn
//           </h4>

//           {month.topics?.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

//               {month.topics.map((topic, topicIndex) => (
//                 <div
//                   key={topicIndex}
//                   className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
//                 >

//                   <CheckCircle
//                     size={19}
//                     className="text-green-600 mt-0.5 shrink-0"
//                   />

//                   <span className="text-gray-700">
//                     {topic}
//                   </span>

//                 </div>
//               ))}

//             </div>
//           ) : (
//             <p className="text-gray-500">
//               No topics available.
//             </p>
//           )}

//         </div>

//         {/* Project */}
//         {month.project && (
//           <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">

//             <p className="text-sm font-semibold text-green-700 mb-2">
//               MONTHLY PROJECT
//             </p>

//             <p className="text-gray-800 leading-7">
//               {month.project}
//             </p>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// /* =====================================================
//    EMPTY STATE
// ===================================================== */

// function EmptyState({ message }) {
//   return (
//     <div className="bg-white border rounded-2xl p-8 text-center">
//       <p className="text-gray-500">
//         {message}
//       </p>
//     </div>
//   );
// }

// export default Roadmap;
