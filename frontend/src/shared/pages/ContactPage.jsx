
import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  HelpCircle,
  Lightbulb,
  Bug,
  Clock,
} from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // API call will be added later
      console.log("Contact Data:", formData);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-3">
              Contact & Support
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              We're here to help
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Have a question about your career roadmap, found an issue,
              or have an idea that could make the platform better?
              Send us a message and let us know.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* =================================================
              LEFT SIDE
          ================================================= */}
          <div className="lg:col-span-1 space-y-5">

            <ContactCard
              icon={HelpCircle}
              title="Need Help?"
              description="Having trouble creating or understanding your career roadmap?"
            />

            <ContactCard
              icon={Lightbulb}
              title="Have a Suggestion?"
              description="Share ideas that could make career planning easier for students and developers."
            />

            <ContactCard
              icon={Bug}
              title="Report a Problem"
              description="Found a bug or something that isn't working as expected?"
            />

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                  <Clock size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Response Time
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    We aim to respond within 24–48 hours.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <div className="lg:col-span-2">

            <div className="bg-white border rounded-2xl p-6 md:p-8">

              <div className="flex items-center gap-4 mb-8">

                <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                  <MessageSquare size={23} />
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Send us a message
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Tell us how we can help.
                  </p>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* NAME + EMAIL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                </div>

                {/* SUBJECT */}
                <div>

                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >

                    <option value="">
                      Select a topic
                    </option>

                    <option value="Roadmap Help">
                      Career Roadmap Help
                    </option>

                    <option value="Roadmap Feedback">
                      Roadmap Feedback
                    </option>

                    <option value="Technical Issue">
                      Technical Issue
                    </option>

                    <option value="Bug Report">
                      Bug Report
                    </option>

                    <option value="Feature Request">
                      Feature Request
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* MESSAGE */}
                <div>

                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your question, issue, or suggestion..."
                    rows={7}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </main>

      {/* =====================================================
          SUPPORT CTA
      ===================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="bg-gray-900 rounded-2xl p-8 md:p-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Build your career with confidence
              </h2>

              <p className="mt-2 text-gray-400">
                Use your personalized roadmap to turn your career goal
                into an actionable learning journey.
              </p>

            </div>

            <div className="flex items-center gap-3 text-green-400 shrink-0">

              <Mail size={20} />

              <span className="font-medium">
                We're listening
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

/* =====================================================
   CONTACT CARD
===================================================== */

function ContactCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6">

      <div className="flex items-start gap-4">

        <div className="p-3 bg-green-100 text-green-700 rounded-xl shrink-0">
          <Icon size={21} />
        </div>

        <div>

          <h3 className="font-bold text-gray-900">
            {title}
          </h3>

          <p className="text-sm text-gray-600 leading-6 mt-2">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ContactPage;