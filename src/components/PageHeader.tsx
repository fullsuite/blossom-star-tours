import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="relative bg-gray-100 h-72 flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576158113928-4c240eaaf360?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add correct path
        }}
      ></div>

      {/* Title */}
      <div className="relative z-10 container">
        <h1 className="text-3xl lg:text-4xl font-bold text-emerald-700">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
