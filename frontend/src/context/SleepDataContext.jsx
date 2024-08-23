import { createContext, useState } from "react";

const SleepDataContext = createContext();

export const SleepDataContextProvider = ({ children }) => {
  const [sleepData, setSleepData] = useState([]);

  function handleAddSleepRecord(sleepRecord) {
    console.log(sleepRecord);
    setSleepData((prevSleepRecords) => [...prevSleepRecords, sleepRecord]);
  }

  const ctxValue = {
    sleepRecords: sleepData,
    addSleepData: handleAddSleepRecord,
  };

  return (
    <SleepDataContext.Provider value={ctxValue}>
      {children}
    </SleepDataContext.Provider>
  );
};

export default SleepDataContext;
