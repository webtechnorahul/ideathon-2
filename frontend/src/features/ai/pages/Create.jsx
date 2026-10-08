import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  Target,
  Clock3,
  GraduationCap,
  Briefcase,
  Sparkles,
  X,
  LoaderCircle,
} from "lucide-react";
import { useAi } from "../hooks/useAi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Create = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleCreateRoadmap } = useAi();
  const { handleGetMe } = useAuth();

  const [formData, setFormData] = useState({
    targetRole: "",
    industry: "",
    currentSkills: [],
    experienceLevel: "",
    hoursPerWeek: "",
    timeline: "",
    education: "",
  });

  const [skillInput, setSkillInput] = useState("");

  // =========================
  // Handle input changes
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Add skill
  // =========================
  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (formData.currentSkills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      currentSkills: [...prev.currentSkills, skill],
    }));

    setSkillInput("");
  };

  // =========================
  // Remove skill
  // =========================
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  // =========================
  // Skill Enter key
  // =========================
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate request
    if (isLoading) return;

    const roadmapData = {
      ...formData,
      hoursPerWeek: Number(formData.hoursPerWeek),
    };

    console.log("Roadmap Data:", roadmapData);

    try {
      // Start local loading
      setIsLoading(true);

      await handleCreateRoadmap(roadmapData);
      toast.success("Roadmap created successfully!");
      await handleGetMe();
      navigate('/roadmaps');

    } catch (error) {
      console.error("Create Roadmap Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create roadmap"
      );

    } finally {
      // Stop loading whether success or error
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ================= HERO ================= */}
      <section className="px-6 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI-Powered Career Planning
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Build a Career Roadmap

            <span className="block text-green-600">
              Made for You
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">
            Tell us where you want to go, what you already know, and how much
            time you have. Our AI will analyze your profile and create a
            personalized roadmap to help you reach your career goal.
          </p>

          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-sm"
            >
              Create My Roadmap
              <ArrowRight size={19} />
            </button>
          )}

        </div>
      </section>

      {/* ================= WHAT AI DOES ================= */}
      {!showForm && (
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">

            <div className="grid md:grid-cols-3 gap-6">

              <InfoCard
                icon={<Target size={22} />}
                title="Understand Your Goal"
                description="Your target role and industry help the AI understand exactly where you want to go."
              />

              <InfoCard
                icon={<Brain size={22} />}
                title="Find Your Skill Gaps"
                description="Your current skills are compared with the skills required for your target career."
              />

              <InfoCard
                icon={<Clock3 size={22} />}
                title="Create a Realistic Plan"
                description="Your available time and timeline are used to build a practical step-by-step roadmap."
              />

            </div>

          </div>
        </section>
      )}

      {/* ================= FORM ================= */}
      {showForm && (
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">

            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-sm font-medium text-green-600 mb-1">
                  Step 1
                </p>

                <h2 className="text-3xl font-bold text-slate-900">
                  Tell us about yourself
                </h2>

                <p className="mt-2 text-slate-500">
                  This information will help AI build your personalized
                  career roadmap.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={isLoading}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Close"
              >
                <X size={22} />
              </button>

            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
            >

              {/* ================= Target Role ================= */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Role
                </label>

                <div className="relative">

                  <Target
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />

                </div>

              </div>

              {/* ================= Industry ================= */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Industry
                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Climate Tech"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />

                </div>

              </div>

              {/* ================= Current Skills ================= */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Skills
                </label>

                <div className="flex gap-2">

                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. Java"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    onClick={addSkill}
                    disabled={isLoading}
                    className="px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>

                </div>

                {/* Skills */}
                {formData.currentSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">

                    {formData.currentSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm font-medium"
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          disabled={isLoading}
                          className="text-green-600 hover:text-red-500 disabled:opacity-50"
                        >
                          <X size={15} />
                        </button>

                      </div>
                    ))}

                  </div>
                )}

                <p className="text-xs text-slate-400 mt-2">
                  Add the technologies or skills you already know.
                </p>

              </div>

              {/* ================= Experience ================= */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    Select experience level
                  </option>

                  <option value="Student">
                    Student
                  </option>

                  <option value="Fresher">
                    Fresher
                  </option>

                  <option value="Junior">
                    Junior
                  </option>

                  <option value="Mid-Level">
                    Mid-Level
                  </option>

                  <option value="Senior">
                    Senior
                  </option>

                </select>

              </div>

              {/* ================= Hours + Timeline ================= */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">

                {/* Hours */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Hours Per Week
                  </label>

                  <input
                    type="number"
                    name="hoursPerWeek"
                    value={formData.hoursPerWeek}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    min="1"
                    max="168"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />

                </div>

                {/* Timeline */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Timeline
                  </label>

                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      Select timeline
                    </option>

                    <option value="3 months">
                      3 months
                    </option>

                    <option value="6 months">
                      6 months
                    </option>

                    <option value="9 months">
                      9 months
                    </option>

                    <option value="12 months">
                      12 months
                    </option>

                    <option value="18 months">
                      18 months
                    </option>

                  </select>

                </div>

              </div>

              {/* ================= Education ================= */}
              <div className="mb-8">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Education
                </label>

                <div className="relative">

                  <GraduationCap
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. BCA"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />

                </div>

              </div>

              {/* ================= Submit ================= */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed"
              >

                {isLoading ? (
                  <>
                    <LoaderCircle
                      size={20}
                      className="animate-spin"
                    />

                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles size={19} />

                    Generate My Roadmap

                    <ArrowRight size={19} />
                  </>
                )}

              </button>

            </form>

          </div>
        </section>
      )}

      {/* ================= EXAMPLE ================= */}
      {!showForm && (
        <section className="px-6 pb-20">

          <div className="max-w-4xl mx-auto">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">

              <p className="text-sm font-semibold text-green-600 mb-3">
                Example
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                From your profile to a clear career path
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                <div>

                  <p className="text-sm text-slate-500 mb-2">
                    Your profile
                  </p>

                  <div className="space-y-2 text-sm">

                    <p>
                      <strong>Role:</strong>{" "}
                      Full Stack Developer
                    </p>

                    <p>
                      <strong>Industry:</strong>{" "}
                      Climate Tech
                    </p>

                    <p>
                      <strong>Skills:</strong>{" "}
                      Java, Spring Boot, SQL, React
                    </p>

                    <p>
                      <strong>Experience:</strong>{" "}
                      Fresher
                    </p>

                  </div>

                </div>

                <div>

                  <p className="text-sm text-slate-500 mb-2">
                    AI roadmap
                  </p>

                  <div className="space-y-2 text-sm text-slate-700">

                    <p>✓ Identify missing skills</p>
                    <p>✓ Prioritize what to learn</p>
                    <p>✓ Create a 6-month learning plan</p>
                    <p>✓ Recommend practical projects</p>
                    <p>✓ Prepare for interviews</p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  );
};


/* ================= INFO CARD ================= */

const InfoCard = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition">

      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-slate-500">
        {description}
      </p>

    </div>
  );
};

export default Create;