import React, { useEffect, useState } from "react";
import { Sparkles, Sunrise, Moon, Sun, Sunset } from "lucide-react";

const messages = [
  "You are stronger than you think — keep going!",
  "Every small step counts toward your big goal.",
  "Your hard work today builds your tomorrow.",
  "Believe in yourself — you've got this!",
  "Obstacles are just stepping stones in disguise.",
  "Discipline is choosing what you want most over what you want now.",
];

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

const FocusMonitor: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const nextIndex = (messages.indexOf(prev) + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 5000); // Change every 5 seconds

    const timeCheck = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // Check time every minute

    return () => {
      clearInterval(msgInterval);
      clearInterval(timeCheck);
    };
  }, []);

  const greeting =
    timeOfDay === "morning"
      ? "Good Morning 🌅"
      : timeOfDay === "afternoon"
      ? "Good Afternoon ☀️"
      : timeOfDay === "evening"
      ? "Good Evening 🌇"
      : "Good Night 🌙";

  const Icon =
    timeOfDay === "morning"
      ? Sunrise
      : timeOfDay === "afternoon"
      ? Sun
      : timeOfDay === "evening"
      ? Sunset
      : Moon;

  return (
    <section className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-8 rounded-xl shadow-2xl border border-purple-200 max-w-xl mx-auto h-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">
          Stay Motivated
        </h2>
      </div>

      <div className="space-y-4 ">
        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <Icon className="text-purple-600 w-6 h-6 mr-3" />
          <div>
            <p className="font-semibold text-lg text-gray-800">{greeting}</p>
            <p className="text-xl font-bold text-green-700 transition-all duration-500">
              {currentMessage}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          <span className="font-semibold">Tip:</span> A little motivation at the right time can
          completely change your day. Keep going!
        </p>
      </div>
    </section>
  );
};

export default FocusMonitor;
