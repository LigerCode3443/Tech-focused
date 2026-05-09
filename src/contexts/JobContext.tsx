import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface JobContextType {
  selectedWish: string;
  weight: number;

  jobId: string;
  setJobId: (id: string) => void;
  setSelectedWish: (wish: string) => void;
  setWeight: (weight: number) => void;

  reset: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobId, setJobId] = useState<string>("");
  const [selectedWish, setSelectedWish] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);

  const reset = () => {
    setSelectedWish("");
    setWeight(0);
    setJobId("");
  };

  return (
    <JobContext.Provider
      value={{
        selectedWish,
        weight,
        jobId,
        setJobId,
        setSelectedWish,
        setWeight,
        reset,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};
