// components/CustomIcon.js
import * as LucideIcons from "lucide-react";

const CustomIcon = ({
  name,
  className = "",
  size = 24,
  color = "currentColor",
  ...props
}) => {
  // Get the icon component based on the provided name, or use a fallback
  const IconComponent = LucideIcons[name] || LucideIcons.AlertCircle;

  return (
    <IconComponent className={className} size={size} color={color} {...props} />
  );
};

export default CustomIcon;
