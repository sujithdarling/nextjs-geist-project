'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { YouTubeVideo } from '@/types/youtube';

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const [videoInfo, setVideoInfo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      router.push('/');
      return;
    }

    // Try to get video info from the API
    fetchVideoInfo();
  }, [videoId, router]);

  const fetchVideoInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/youtube-feed');
      const data = await response.json();
      
      if (data.videos) {
        const video = data.videos.find((v: YouTubeVideo) => v.id === videoId);
        setVideoInfo(video || null);
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  if (!videoId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Video</h1>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">YouTube App</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading video...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Information */}
            {videoInfo ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {videoInfo.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                  {videoInfo.channelTitle && (
                    <span className="font-medium">{videoInfo.channelTitle}</span>
                  )}
                  {videoInfo.publishedAt && (
                    <span>
                      Published: {new Date(videoInfo.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                {videoInfo.description && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {videoInfo.description}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Video Player
                </h2>
                <p className="text-gray-600">
                  Video information not available. The video should still play above.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
