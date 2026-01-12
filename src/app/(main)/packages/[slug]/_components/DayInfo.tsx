// components/DayInfo.tsx

import React from 'react';

interface DayInfoProps {
  day: string;
  description: string;
}

const DayInfo: React.FC<DayInfoProps> = ({ day, description }) => {
  return (
    <div className="flex flex-row rounded p-2 bg-wild-sand-100 items-center gap-4">
      <span className="py-2 px-4 rounded bg-red-500 text-white">{day}</span>
      <p className="text-lg text-wild-sand-700 flex-1">{description}</p>
    </div>
  );
};

export default DayInfo;
