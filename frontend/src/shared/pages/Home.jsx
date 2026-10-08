import React from "react";
import {
  ArrowRight,
  Brain,
  Target,
  Route,
  Code2,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Clock3,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-100 blur-3xl" />
        <div className="absolute -left-32 top-96 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <Sparkles size={16} />
                AI-Powered Career Roadmapping
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
                Build the career path
                <span className="text-green-600"> made for you.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Stop following generic career roadmaps. Tell us your current
                skills, target role, industry, experience and available time.
                Our AI analyzes your profile and creates a personalized path
                to help you reach your career goal.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={()=> navigate('/create')} className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700">
                  Create My Roadmap
                  <ArrowRight size={18} />
                </button>

                <button className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50">
                  Learn More
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />
                  Personalized
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />
                  AI Generated
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />
                  Goal Oriented
                </div>
              </div>
            </div>

            {/* RIGHT - ROADMAP CARD */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm text-slate-500">
                      Your Personalized Roadmap
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Full Stack Developer
                    </h3>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3 text-green-600">
                    <Route size={23} />
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Career Progress
                    </span>

                    <span className="font-semibold text-green-600">
                      32%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[32%] rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Roadmap */}
                <div className="mt-7 space-y-3">
                  <RoadmapItem
                    number="01"
                    title="Advanced React"
                    status="Completed"
                    completed
                  />

                  <RoadmapItem
                    number="02"
                    title="API Security"
                    status="In Progress"
                  />

                  <RoadmapItem
                    number="03"
                    title="Docker & DevOps"
                    status="Upcoming"
                  />

                  <RoadmapItem
                    number="04"
                    title="Cloud Deployment"
                    status="Upcoming"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-green-600">
              Why This Platform?
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Generic career advice doesn't know you.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Everyone starts from a different place and has a different
              destination. Your career roadmap should reflect that.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ProblemCard
              icon={<Target />}
              title="Different Starting Points"
              description="Your existing skills determine what you need to learn next. You shouldn't waste time relearning what you already know."
            />

            <ProblemCard
              icon={<Clock3 />}
              title="Limited Time"
              description="Your roadmap is designed around the number of hours you can actually dedicate every week."
            />

            <ProblemCard
              icon={<Briefcase />}
              title="Different Goals"
              description="Your target role and industry determine the skills, projects and preparation you need."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-green-600">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              From where you are to where you want to be.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Our AI works backwards from your career goal and creates a
              practical learning path based on your current situation.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            <Step
              number="01"
              icon={<Target />}
              title="Define Your Goal"
              description="Tell us your target role, industry and timeline."
            />

            <Step
              number="02"
              icon={<Code2 />}
              title="Tell Us Your Skills"
              description="Add your current technologies, education and experience."
            />

            <Step
              number="03"
              icon={<BarChart3 />}
              title="AI Finds Your Gaps"
              description="The AI identifies the skills you need to develop."
            />

            <Step
              number="04"
              icon={<Route />}
              title="Get Your Roadmap"
              description="Receive a personalized step-by-step career plan."
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-green-600">
              What You Get
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to become job-ready.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-600">
              Your roadmap doesn't stop at learning technologies. It covers
              the complete journey toward your target career.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Target />}
              title="Skill Gap Analysis"
              description="Understand exactly which skills are missing between your current profile and your target role."
            />

            <Feature
              icon={<Route />}
              title="Personalized Roadmap"
              description="Get a month-by-month plan based on your available time and career timeline."
            />

            <Feature
              icon={<Code2 />}
              title="Practical Projects"
              description="Build projects that demonstrate the skills required for your target career."
            />

            <Feature
              icon={<BarChart3 />}
              title="Interview Preparation"
              description="Prepare for technical and behavioral interviews with role-specific topics."
            />

            <Feature
              icon={<Briefcase />}
              title="Job Strategy"
              description="Discover what types of companies and opportunities you should target."
            />

            <Feature
              icon={<Brain />}
              title="AI Analysis"
              description="Every roadmap is generated from your personal profile instead of a generic template."
            />
          </div>
        </div>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-green-600">
                Real Example
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Your information becomes an actionable career plan.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Imagine you're a BCA fresher with Java, Spring Boot, SQL and
                React skills. You want to become a Full Stack Developer in the
                Climate Tech industry within six months and can study 10 hours
                every week.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Analyze your existing skills",
                  "Identify missing skills",
                  "Prioritize skill gaps",
                  "Create a 6-month roadmap",
                  "Suggest practical projects",
                  "Prepare you for interviews",
                  "Build a job strategy",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-green-600"
                    />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* JSON */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />

                <span className="ml-3 text-xs text-slate-500">
                  career-profile.json
                </span>
              </div>

              <pre className="overflow-x-auto p-6 text-sm leading-7 text-slate-300">
{`{
  "targetRole": "Full Stack Developer",
  "industry": "Climate Tech",

  "currentSkills": [
    "Java",
    "Spring Boot",
    "SQL",
    "React"
  ],

  "experienceLevel": "Fresher",
  "hoursPerWeek": 10,
  "timeline": "6 months",
  "education": "BCA"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-600 px-6 py-16 text-center shadow-xl shadow-green-600/20 sm:px-12">
          <Sparkles className="mx-auto text-white" size={32} />

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Stop guessing what to learn next.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-green-50">
            Tell us where you are, where you want to go, and how much time you
            have. Let AI build the path between them.
          </p>

          <button onClick={()=> navigate('/create')} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-green-700 transition hover:bg-green-50">
            Create Your Roadmap
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
              <Brain size={18} />
            </div>

            <span className="font-bold text-slate-900">
              Career<span className="text-green-600">AI</span>
            </span>
          </div>

          <p className="text-sm text-slate-500">
            AI-powered personalized career planning.
          </p>

          <p className="text-sm text-slate-500">
            © 2026 CareerAI
          </p>
        </div>
      </footer>
    </div>
  );
};


/* ================= COMPONENTS ================= */

const ProblemCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
};


const Step = ({ number, icon, title, description }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        <span className="text-sm font-bold text-slate-300">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
};


const Feature = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
};


const RoadmapItem = ({
  number,
  title,
  status,
  completed = false,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-sm font-bold text-green-600">
        {number}
      </div>

      <div className="flex-1">
        <p className="font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {status}
        </p>
      </div>

      {completed && (
        <CheckCircle2
          size={20}
          className="text-green-600"
        />
      )}
    </div>
  );
};

export default Home;