import React from "react";
import { ArrowRight, MessageSquare, Zap, Globe } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  iconBgColor: string;
  onExploreMore?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  borderColor,
  iconBgColor,
  onExploreMore,
}) => {
  return (
    <div
      className={`relative p-8 rounded-3xl bg-black text-white backdrop-blur-sm border-2 ${borderColor} hover:scale-101 transition-all duration-300 group`}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}
          >
            {icon}
          </div>

          <button
            onClick={onExploreMore}
            className="flex items-center gap-2 text-white font-medium text-sm hover:gap-3 transition-all duration-200 group-hover:translate-x-1"
          >
            <span className="tracking-wider">EXPLORE MORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC = () => {
  const features = [
    {
      title: "Ask anything",
      description:
        "Lets users quickly find answers to their questions without having to search through multiple sources.",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      borderColor: "border-cyan-400",
      iconBgColor: "bg-purple-600",
    },
    {
      title: "Improve everyday",
      description:
        "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      icon: <Zap className="w-6 h-6 text-white" />,
      borderColor: "border-orange-400",
      iconBgColor: "bg-orange-500",
    },
    {
      title: "Connect everywhere",
      description:
        "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      icon: <Globe className="w-6 h-6 text-white" />,
      borderColor: "border-purple-400",
      iconBgColor: "bg-green-500",
    },
    {
      title: "Connect everywhere",
      description:
        "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      icon: <Globe className="w-6 h-6 text-white" />,
      borderColor: "border-purple-400",
      iconBgColor: "bg-green-500",
    },
    {
      title: "Connect everywhere",
      description:
        "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      icon: <Globe className="w-6 h-6 text-white" />,
      borderColor: "border-purple-400",
      iconBgColor: "bg-green-500",
    },
    {
      title: "Connect everywhere",
      description:
        "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      icon: <Globe className="w-6 h-6 text-white" />,
      borderColor: "border-purple-400",
      iconBgColor: "bg-green-500",
    },
  ];

  const handleExploreMore = (title: string) => {
    console.log(`Exploring more about: ${title}`);
  };

  return (
    <div className="min-h-screen  py-16 mt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              borderColor={feature.borderColor}
              iconBgColor={feature.iconBgColor}
              onExploreMore={() => handleExploreMore(feature.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
