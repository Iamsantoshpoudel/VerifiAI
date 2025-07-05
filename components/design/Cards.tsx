import React from "react";
import {
  ArrowRight,
  MessageSquare,
  Zap,
  Video,
  File,
  Mic,
  ScanLine,
} from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  iconBgColor: string;
  button?: string;
  onExploreMore?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  borderColor,
  iconBgColor,
  button,
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
            <span className="tracking-wider">{button}</span>
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
      icon: (
        <Link href="/chat">
          <MessageSquare className="w-6 h-6 text-white" />
        </Link>
      ),
      borderColor: "border-cyan-400",
      iconBgColor: "bg-purple-600",
      button:"Explore more",
    },
    {
      title: "Image Authenticity Checker",
      description:
        "Upload an image and let VerifiAI tell you if it's real or AI-generated with precision and speed.",

      icon: (
        <Link href="/detecti">
          <Zap className="w-6 h-6 text-white" />
        </Link>
      ),
      borderColor: "border-orange-400",
      iconBgColor: "bg-orange-500",
      button:"Explore more",
    },
    {
      title: "Video Detection",
      description:
        "Identify deepfakes and AI-generated videos. Ensure video content integrity with advanced analysis tools.",
      icon: <Video className="w-6 h-6 text-white" />,
      borderColor: "border-red-400",
      iconBgColor: "bg-red-500",
      button:"Comming soon",
    },
    {
      title: "File Analysis",
      description:
        "Upload documents, images, or media files and get instant AI authenticity checks across formats.",
      icon: <File className="w-6 h-6 text-white" />,
      borderColor: "border-yellow-400",
      iconBgColor: "bg-yellow-500",
      button:"Comming soon",
    },
    {
      title: "Audio Detection",
      description:
        "Detect AI-generated or cloned voices. Analyze speech patterns to verify if audio is human or synthetic.",
      icon: <Mic className="w-6 h-6 text-white" />,
      borderColor: "border-pink-400",
      iconBgColor: "bg-pink-500",
      button:"Comming soon",
    },
    {
      title: "Multi-Format AI Detection",
      description:
        "Scan and verify content across text, image, audio, and video formats — all in one unified platform.",
      icon: <ScanLine className="w-6 h-6 text-white" />,
      borderColor: "border-indigo-400",
      iconBgColor: "bg-indigo-500",
      button:"Comming soon",
    },
  ];

  const handleExploreMore = (title: string) => {
    console.log(`Exploring more about: ${title}`);
  };

  return (
    <div className="h-auto  py-16 mt-20 px-4">
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
              button={feature.button ?? "Explore"}
              onExploreMore={() => handleExploreMore(feature.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
