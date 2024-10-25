import React from "react";
import Image from "next/image";
import WaveSmallPattern from "@/assets/Wave-Small-Pattern.svg";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="mt-3 h-60 sm:h-72 md:h-[400px] flex items-center pb-24 sm:pb-40 md:pb-28 w-full">
      {/* Background Image */}
      <Image src={WaveSmallPattern} alt="" className="absolute inset-0 -z-10 object-cover object-bottom xl:w-[100vw] w-[1440px] h-[350px] sm:h-[400px] md:h-[500px]" />

      {/* Title */}
      <div className="relative z-10 container">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
