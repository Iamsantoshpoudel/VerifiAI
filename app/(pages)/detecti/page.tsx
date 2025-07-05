"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  FileImage,
  X,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Clock,
  Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

interface DetectionResult {
  timestamp: number;
  result: {
    predictions: Array<{
      label: string;
      score: number;
    }>;
    overallVerdict: string;
    confidence: number;
    isAIGenerated: boolean;
    analysis: {
      aiScore: number;
      humanScore: number;
      topPrediction: {
        label: string;
        score: number;
      };
    };
  };
  fileName: string;
  fileSize: number;
}

interface AIProvider {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

export default function Detecti() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<DetectionResult[]>([]);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ai_image_history");
    if (stored) {
      try {
        const parsed: DetectionResult[] = JSON.parse(stored);
        const now = Date.now();
        const fresh = parsed.filter(
          (entry) => now - entry.timestamp < 3 * 24 * 60 * 60 * 1000
        );
        setHistory(fresh);
        localStorage.setItem("ai_image_history", JSON.stringify(fresh));
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
  }, []);

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image file (PNG, JPEG, JPG, or WebP)";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/detecti", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await res.json();
      console.log("API Response:", data); // Debug log

      // Check if the response has the expected structure
      if (!data.result || !data.result.analysis) {
        console.error("Unexpected API response structure:", data);
        throw new Error("Invalid response format from API");
      }

      const detectionResult: DetectionResult = {
        timestamp: Date.now(),
        result: data.result,
        fileName: file.name,
        fileSize: file.size,
      };

      setResult(detectionResult);

      const newHistory = [detectionResult, ...history];
      setHistory(newHistory);
      localStorage.setItem("ai_image_history", JSON.stringify(newHistory));
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAIProviders = (result: DetectionResult["result"]): AIProvider[] => {
    // Safety check for analysis object
    if (!result.analysis) {
      console.error("Missing analysis object in result:", result);
      return [
        {
          name: "Analysis Error",
          percentage: 0,
          color: "from-gray-500 to-gray-600",
          icon: "⚠️",
        },
      ];
    }

    const providers: AIProvider[] = [
      {
        name: "AI Generated",
        percentage: Math.round((result.analysis.aiScore || 0) * 100),
        color: "from-red-500 to-orange-500",
        icon: "🤖",
      },
      {
        name: "Human Created",
        percentage: Math.round((result.analysis.humanScore || 0) * 100),
        color: "from-green-500 to-emerald-500",
        icon: "👤",
      },
    ];

    // Add specific AI tool predictions if available
    if (result.predictions && Array.isArray(result.predictions)) {
      result.predictions.forEach((pred) => {
        const label = pred.label.toLowerCase();
        if (label.includes("midjourney") || label.includes("mj")) {
          providers.push({
            name: "Midjourney",
            percentage: Math.round(pred.score * 100),
            color: "from-purple-500 to-pink-500",
            icon: "🎨",
          });
        } else if (label.includes("dall") || label.includes("dalle")) {
          providers.push({
            name: "DALL-E",
            percentage: Math.round(pred.score * 100),
            color: "from-blue-500 to-cyan-500",
            icon: "🤖",
          });
        } else if (label.includes("stable") || label.includes("diffusion")) {
          providers.push({
            name: "Stable Diffusion",
            percentage: Math.round(pred.score * 100),
            color: "from-green-500 to-emerald-500",
            icon: "⚡",
          });
        }
      });
    }

    return providers.sort((a, b) => b.percentage - a.percentage);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 ">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                AI Image Detector
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload any image to detect if it was generated by AI tools like
                Midjourney, DALL-E, or Stable Diffusion
              </p>
            </div>

            {/* Main Content Grid - Desktop Layout */}
            <div className="grid lg:grid-cols-2 gap-20 mb-8">
              {/* Left Side - Upload Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg navbar">
                <div
                  ref={dropRef}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {!preview ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Drop your image here
                        </h3>
                        <p className="text-gray-600 mb-4">
                          or click to browse files
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                          Choose File
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Supports PNG, JPEG, JPG, WebP (max 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        {preview && (
                          <Image
                            width={100}
                            height={100}
                            src={preview}
                            alt="Preview"
                            className="max-w-full max-h-64 rounded-xl shadow-lg"
                          />
                        )}
                        <button
                          onClick={clearFile}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {file?.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {formatFileSize(file?.size || 0)}
                        </p>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-600">{error}</span>
                  </div>
                )}

                {file && !loading && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleUpload}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <BarChart3 className="w-5 h-5 inline mr-2" />
                      Analyze Image
                    </button>
                  </div>
                )}
              </div>

              {/* Right Side - Results Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg navbar">
                {/* Loading State */}
                {loading && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      Analyzing Image...
                    </h3>
                    <p className="text-gray-600">
                      Our AI is examining your image for signs of AI generation
                    </p>
                  </div>
                )}

                {/* Results */}
                {result && !loading && (
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-800">
                        Analysis Results
                      </h2>
                    </div>

                    {/* AI Detection Results */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        AI Detection Breakdown
                      </h3>
                      {getAIProviders(result.result).map((provider) => (
                        <div key={provider.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{provider.icon}</span>
                              <span className="text-gray-800 font-medium">
                                {provider.name}
                              </span>
                            </div>
                            <span className="text-blue-600 font-bold text-lg">
                              {provider.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`bg-gradient-to-r ${provider.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${provider.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overall Verdict */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        {result.result.isAIGenerated ? (
                          <AlertCircle className="w-6 h-6 text-orange-500" />
                        ) : (
                          <CheckCircle className="w-6 w-6 text-green-500" />
                        )}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {result.result.overallVerdict ||
                              "Analysis Complete"}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Confidence:{" "}
                            {Math.round((result.result.confidence || 0) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Analyzed Image
                      </h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        {preview && (
                          <Image
                            width={100}
                            height={100}
                            src={preview}
                            alt="Analyzed"
                            className="w-full rounded-lg shadow-lg"
                          />
                        )}
                        <div className="mt-3 text-sm text-gray-400">
                          <p>
                            <strong>File:</strong> {result.fileName}
                          </p>
                          <p>
                            <strong>Size:</strong>{" "}
                            {formatFileSize(result.fileSize)}
                          </p>
                          <p>
                            <strong>Analyzed:</strong>{" "}
                            {new Date(result.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!result && !loading && (
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Analysis Yet
                    </h3>
                    <p>Upload an image on the left to start analyzing</p>
                  </div>
                )}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className=" rounded-2xl p-8 shadow-lg navabr">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Recent Detections
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem("ai_image_history");
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Clear History"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {history.slice(0, 5).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FileImage className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-800 font-medium truncate">
                            {item.fileName}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">AI Generated</span>
                          <span className="text-blue-600 font-medium">
                            {Math.round(
                              (item.result.analysis?.aiScore || 0) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Human Created</span>
                          <span className="text-blue-600 font-medium">
                            {Math.round(
                              (item.result.analysis?.humanScore || 0) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
