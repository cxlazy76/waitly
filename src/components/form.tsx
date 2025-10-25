"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface FormProps {
  onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const promise = new Promise((resolve, reject) => {
        const { email } = formData;

        fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
          .then((mailResponse) => {
            if (!mailResponse.ok) {
              if (mailResponse.status === 429) reject("Rate limited");
              else reject("Email sending failed");
              return null;
            }

            return fetch("/api/notion", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
          })
          .then((notionResponse) => {
            if (!notionResponse) return;
            if (!notionResponse.ok) {
              if (notionResponse.status === 429) reject("Rate limited");
              else reject("Notion insertion failed");
            } else resolve(email);
          })
          .catch((error) => reject(error));
      });

      toast.promise(promise, {
        loading: "Getting you on the waitlist... 🚀",
        success: () => {
          setFormData({ email: "" });
          setSuccess(true);
          onSuccessChange?.(true);
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
              ],
            });
          }, 100);
          return "Thank you for joining the waitlist 🎉";
        },
        error: (error) => {
          if (error === "Rate limited")
            return "You're doing that too much. Please try again later";
          if (error === "Email sending failed")
            return "Failed to send email. Please try again 😢.";
          if (error === "Notion insertion failed")
            return "Failed to save your details. Please try again 😢.";
          return "An error occurred. Please try again 😢.";
        },
      });

      promise.finally(() => setLoading(false));
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ email: "" });
    setSuccess(false);
    onSuccessChange?.(false);
  };

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            className="p-6 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={resetForm}
              className="bg-[#e5ff00] text-black px-6 py-2 rounded-[12px] font-semibold hover:bg-opacity-90 transition-all"
              type="button"
            >
              Join with another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="email-form"
            onSubmit={handleSubmit}
            className="relative w-full flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* ✅ Fixed: one-row layout, no overlap */}
            <div className="flex w-full items-center justify-center gap-2 max-w-[90%] sm:max-w-lg mx-auto">

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="flex-grow bg-background border border-border text-foreground px-3 py-2 rounded-[10px] focus:outline-1 transition-all duration-300 focus:outline-offset-2 focus:outline-[#e5ff00] text-sm"
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="font-semibold bg-[#e5ff00] flex justify-center items-center cursor-pointer text-black px-4 py-2 rounded-[10px] hover:bg-opacity-90 transition-all disabled:opacity-50 text-sm whitespace-nowrap"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  <span>Join waitlist</span>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
