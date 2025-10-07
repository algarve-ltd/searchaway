"use client";
import React from 'react';
import { generateSocialShareUrl } from '@/utils/seo';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  url, 
  title, 
  description, 
  className = "" 
}) => {
  const shareLinks = [
    {
      platform: 'facebook' as const,
      icon: 'fab fa-facebook-f',
      label: 'Share on Facebook',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      platform: 'twitter' as const,
      icon: 'fab fa-twitter',
      label: 'Share on Twitter',
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      platform: 'linkedin' as const,
      icon: 'fab fa-linkedin-in',
      label: 'Share on LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      platform: 'pinterest' as const,
      icon: 'fab fa-pinterest-p',
      label: 'Share on Pinterest',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      platform: 'whatsapp' as const,
      icon: 'fab fa-whatsapp',
      label: 'Share on WhatsApp',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const handleShare = (platform: typeof shareLinks[0]['platform']) => {
    const shareUrl = generateSocialShareUrl(platform, url, title, description);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`social-share ${className}`}>
      <span className="share-label text-sm font-medium text-gray-600 mr-3">
        Share:
      </span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <button
            key={link.platform}
            onClick={() => handleShare(link.platform)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-colors ${link.color}`}
            title={link.label}
            aria-label={link.label}
          >
            <i className={link.icon}></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;