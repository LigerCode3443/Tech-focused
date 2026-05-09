import React from "react";
import { useNavigate } from "react-router-dom";
import { useJob } from "../contexts/JobContext";

const wishes = [
  "Lose weight",
  "Gain muscle",
  "Improve fitness",
  "Better health",
  "Other",
];

const Step1: React.FC = () => {
  const { selectedWish, setSelectedWish } = useJob();
  const navigate = useNavigate();

  const handleSelect = (wish: string) => {
    setSelectedWish(wish);
  };

  const handleContinue = () => {
    if (selectedWish) {
      navigate("/step-2");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-900">
        What is your main wish?
      </h1>
      <div className="space-y-3">
        {wishes.map((wish) => (
          <button
            key={wish}
            onClick={() => handleSelect(wish)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all active:scale-95 ${
              selectedWish === wish
                ? "border-[#6DBFB8] bg-[#6DBFB8]/10 text-[#6DBFB8]"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            {wish}
          </button>
        ))}
      </div>
      <button
        onClick={handleContinue}
        disabled={!selectedWish}
        className={`w-full py-3 rounded-xl font-semibold transition-all active:scale-95 ${
          selectedWish
            ? "bg-[#6DBFB8] text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default Step1;
