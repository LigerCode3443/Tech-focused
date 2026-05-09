import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobProgress } from "../hooks/useJobProgress";
import { useJob } from "../contexts/JobContext";
import { Star } from "lucide-react";

const Step3: React.FC = () => {
  const { reset, jobId } = useJob();
  const { progress, status, trackJob, connected } = useJobProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId || !connected) return;
    const cleanup = trackJob(jobId);
    return cleanup;
  }, [jobId, trackJob, connected]);

  const handleReset = () => {
    reset();
    navigate("/step-1");
  };

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col gap-12">
      {/* Progress Section */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <svg width="220" height="220" className="transform -rotate-90">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#6DBFB8"
              strokeWidth="6"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <p className="text-5xl font-bold text-gray-900 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            {progress}%
          </p>
        </div>

        <div className="text-center">
          <p>{status}</p>
          {progress < 100 ? (
            <>
              <p className="text-gray-600 text-lg mt-4">
                Creating something good for you...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This will only take a moment — your item is almost ready.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-lg mt-4">
                All done — your item is ready.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                You can start a new request now.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-green-50 rounded-xl p-6 flex flex-col gap-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-gray-700 text-sm">
          "I love this website! It makes practicing so easy and relaxing."
        </p>
        <p className="text-gray-800 font-semibold text-right">John</p>
      </div>

      {/* New Button with Animation */}
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#6DBFB8] text-white rounded-xl font-semibold hover:bg-[#5aaca5] transition-all active:scale-95 animate-pulse hover:animate-none fixed right-10 bottom-10"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default Step3;
