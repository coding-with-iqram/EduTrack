import React from "react";

export default function SuggestedVideo() {
  const kotlinVideos = [
    {
      title: "What is Kotlin? Introduction To Kotlin Tutorial | CheezyCode #1",
      url: "https://www.youtube.com/embed/vhfzN69ALpY?si=goOEin9SqGUMLqdR",
    },
    {
      title: "Kotlin - Development Environment Setup | CheezyCode #2",
      url: "https://www.youtube.com/embed/1RuNijeB_yc?si=xLJs6kBBoS4eKYxT",
    },
    {
      title: "Kotlin - Hello World Program | CheezyCode #3",
      url: "https://www.youtube.com/embed/IdeqQE_POXo?si=FhVRHH7lG1rNZjXz",
    },
  ];

  const cppVideos = [
    {
      title: "Lecture 1: Flowchart & Pseudocode | C++ DSA Series",
      url: "https://www.youtube.com/embed/VTLCoHnyACE?si=Q9-CqiqOnQj6V2ZR",
    },
    {
      title: "Lecture 2: Variables, Data Types & Operators | C++ DSA",
      url: "https://www.youtube.com/embed/Dxu7GKtdbnA?si=-j_9ucqlJhQk1KFj",
    },
    {
      title: "Lecture 3: Conditionals & Loops | C++ DSA",
      url: "https://www.youtube.com/embed/qR9U6bKxJ7g?si=v_KhapOgsg3ZEy83",
    },
  ];

  const VideoSection = ({ title, videos }) => (
    <div className="mb-16 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-6 text-center">
        {title}
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-0 pb-[56.25%] relative">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-md font-medium text-gray-800">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Boost your understanding of Kotlin and C++ with these hand-picked videos.
        </p>

        {/* Kotlin Section */}
        <VideoSection title="🚀 Kotlin Tutorials" videos={kotlinVideos} />

        {/* C++ Section */}
        <VideoSection title="🧠 C++ DSA Series" videos={cppVideos} />
      </div>
    </section>
  );
}
