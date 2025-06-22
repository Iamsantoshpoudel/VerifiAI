"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase";
import { ref, push, set } from "firebase/database";

interface FormState {
  name: string;
  username: string;
  body: string;
  img: string;
}

interface FormErrors {
  name: string;
  body: string;
}

export default function CommentForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    username: "",
    body: "",
    img: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    body: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Load disabled state from localStorage on component mount
  useEffect(() => {
    const lastSubmitTime = localStorage.getItem("lastCommentSubmitTime");
    if (lastSubmitTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(lastSubmitTime);
      const cooldownPeriod = 3 * 60 * 1000; // 3 min in milliseconds

      if (elapsedTime < cooldownPeriod) {
        setIsButtonDisabled(true);
        const remainingTime = Math.ceil((cooldownPeriod - elapsedTime) / 1000);
        setTimeRemaining(remainingTime);
      } else {
        // Clear the stored time if cooldown has expired
        localStorage.removeItem("lastCommentSubmitTime");
      }
    }
  }, []);

  // Countdown timer for disabled button
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isButtonDisabled && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            localStorage.removeItem("lastCommentSubmitTime");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isButtonDisabled, timeRemaining]);

  // Format remaining time into minutes and seconds
  const formatTimeRemaining = (): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  };

  const validateName = (name: string): string => {
    // Check if name is between 2-13 characters and contains valid characters
    if (!name.trim()) return "Name is required";
    if (name.length > 13) return "Name must be less than 13 characters";
    if (name.length < 2) return "Name must be at least 2 characters";
    // Check for valid name (letters, spaces, common punctuation)
    if (!/^[a-zA-Z\s\-'.]+$/.test(name))
      return "Name contains invalid characters";
    return "";
  };

  const validateBody = (body: string): string => {
    // Check if body is valid and not too long
    if (!body.trim()) return "Comment is required";
    if (body.length > 76) return "Comment must be less than 76 characters";
    if (body.length < 3) return "Comment must be at least 3 characters";
    // Check that the comment isn't just random characters
    if (!/^[a-zA-Z0-9\s.,!?'"()\-;:]+$/.test(body))
      return "Comment contains invalid characters";

    // Check for random text patterns
    const words = body.trim().split(/\s+/);
    if (words.length > 0) {
      // Check for extremely short words or random character sequences
      const randomPattern = words.filter(
        (word) =>
          (word.length > 2 && /^[a-z]{1,2}$/.test(word)) ||
          /([a-z])\1{2,}/.test(word) || // Repeated characters
          /[^a-zA-Z0-9\s.,!?'"()\-;:]+/.test(word) // Strange character combinations
      ).length;

      if (randomPattern > 2) return "Comment appears to contain random text";
    }

    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "name") {
      // Validate name as user types
      const nameError = validateName(value);
      setErrors((prev) => ({ ...prev, name: nameError }));

      // When name changes, automatically update username
      setForm({
        ...form,
        [name]: value,
        username: value.toLowerCase().replace(/\s+/g, ""),
      });
    } else if (name === "body") {
      // Validate body as user types
      const bodyError = validateBody(value);
      setErrors((prev) => ({ ...prev, body: bodyError }));

      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Final validation before submission
    const nameError = validateName(form.name);
    const bodyError = validateBody(form.body);

    setErrors({
      name: nameError,
      body: bodyError,
    });

    if (nameError || bodyError) {
      // Don't submit if there are validation errors
      return;
    }

    setIsSubmitting(true);

    try {
      const initial = form.name ? form.name[0].toUpperCase() : "?";
      const newCommentRef = push(ref(db, "comments"));
      await set(newCommentRef, {
        ...form,
        username: form.username || form.name.toLowerCase().replace(/\s+/g, ""),
        img:
          form.img ||
          `https://avatar.vercel.sh/${encodeURIComponent(
            form.name
          )}?text=${initial}`,
      });

      // Reset the form after successful submission
      setForm({ name: "", username: "", body: "", img: "" });

      // Set 3-minute cooldown
      const currentTime = new Date().getTime();
      localStorage.setItem("lastCommentSubmitTime", currentTime.toString());
      setIsButtonDisabled(true);
      setTimeRemaining(3 * 60); // 3 minutes in seconds

      // Allow the button animation to complete
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error posting comment:", error);
      setIsSubmitting(false);
      alert("Failed to post comment. Please try again.");
    }
  };

  const initial = form.name ? form.name[0].toUpperCase() : "?";

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
              {initial}
            </div>
            <div className="w-full">
              <div className="font-bold text-gray-800 dark:text-gray-200">
                <input
                  type="text"
                  name="name"
                  placeholder="Name (2-13 characters)"
                  className={`w-full p-2 mb-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.name ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  value={form.name}
                  onChange={handleChange}
                  disabled={isButtonDisabled}
                  maxLength={13}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="text-gray-500 text-sm dark:text-gray-400">
                @
                {form.name
                  ? form.name.toLowerCase().replace(/\s+/g, "")
                  : "username"}
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-800 dark:text-gray-200">
            <textarea
              name="body"
              placeholder="Your comment (max 76 characters)"
              className={`w-full p-3 mb-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.body ? "border-red-500 focus:ring-red-500" : ""
              }`}
              rows={3}
              value={form.body}
              onChange={handleChange}
              disabled={isButtonDisabled}
              maxLength={76}
            />
            {errors.body && (
              <p className="text-red-500 text-xs mb-2">{errors.body}</p>
            )}
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {form.body.length}/76 characters
              </div>
              <div className="flex items-center">
                {isButtonDisabled && timeRemaining > 0 && (
                  <span className="text-sm text-amber-500 mr-3">
                    Wait{" "}
                    <span className="font-bold">
                      {formatTimeRemaining()}
                    </span>
                  </span>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isButtonDisabled}
                  className={`px-6 py-2 rounded-full text-white font-semibold shadow-md transition duration-300 ease-in-out
                    ${
                      isSubmitting || isButtonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : isSubmitting
                        ? "bg-green-500"
                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                    }`}
                >
                  {isSubmitting ? "Submitted" : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}