import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJob } from "../contexts/JobContext";
import api from "../api/api";

const Step2: React.FC = () => {
  const { weight, selectedWish, setWeight, setJobId } = useJob();

  const [inputValue, setInputValue] = useState(
    weight > 0 ? weight.toString() : "",
  );
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      if (num < 20) {
        setError("Weight must be at least 20 kg");
        setWeight(0);
      } else {
        setError("");
        setWeight(num);
      }
    } else if (value === "") {
      setError("");
      setWeight(0);
    } else {
      setError("Please enter a valid number");
      setWeight(0);
    }
  };

  const handleContinue = () => {
    if (!weight) {
      setError("Weight will be must!");
    }
    if (weight >= 20 && !error) {
      createNewJob();
      navigate("/step-3");
    }
  };

  const createNewJob = async () => {
    try {
      const response = await api.post("/jobs", {
        selectedWish,
        weight,
      });
      const newJob = response.data;
      setJobId(newJob.jobId);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-900">
        What is your weight?
      </h1>
      <div className="flex flex-row items-center justify-center gap-2 text-center relative">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter weight"
          className=" text-2xl font-bold py-1 text-center outline-none bg-transparent text-gray-900 placeholder-gray-400 border-[2px] border-[#6DBFB8] rounded-lg w-2/3"
          min="0"
          step="0.1"
        />
        <p className="text-2xl text-gray-500 font-bold">kg</p>
        {error && (
          <p className="text-sm text-red-500 mt-2 absolute bottom-[-20px]">
            {error}
          </p>
        )}
      </div>

      <button
        onClick={handleContinue}
        className={
          "w-full py-3 rounded-xl font-semibold transition-all active:scale-95 bg-[#6DBFB8] text-white"
        }
      >
        Continue
      </button>
    </div>
  );
};

export default Step2;
