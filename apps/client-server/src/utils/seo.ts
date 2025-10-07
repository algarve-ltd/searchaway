import { Metadata } from 'next';
import { siteConfig, PageMetadata, defaultPageMetadata } from '@/config/seo';

/**
 * Generates a complete page title with site name
 * @param pageTitle - The specific page title
 * @param includeSiteName - Whether to include the site name (default: true)
 * @returns Formatted page title
 */
export function generatePageTitle(pageTitle: string, includeSiteName: boolean = true): string {
  if (!includeSiteName) {
    return pageTitle;
  }
  
  // If the page title already includes the site name, don't duplicate it
  if (pageTitle.includes(siteConfig.name)) {
    return pageTitle;
  }
  
  return `${pageTitle} | ${siteConfig.name}`;
}

/**
 * Truncates meta description to optimal length
 * @param description - The description text
 * @param maxLength - Maximum length (default: 160)
 * @returns Truncated description
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  // Find the last space before the max length to avoid cutting words
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Generates keywords string from array
 * @param keywords - Array of keywords
 * @param includeDefaults - Whether to include default site keywords
 * @returns Comma-separated keywords string
 */
export function generateKeywords(keywords: string[] = [], includeDefaults: boolean = true): string {
  const allKeywords = includeDefaults 
    ? [...new Set([...siteConfig.keywords, ...keywords])]
    : keywords;
    
  return allKeywords.join(', ');
}

/**
 * Creates Next.js Metadata object from page metadata
 * @param pageMetadata - Page-specific metadata
 * @returns Next.js Metadata object
 */
export function createMetadata(pageMetadata: PageMetadata): Metadata {
  const title = generatePageTitle(pageMetadata.title);
  const description = truncateDescription(pageMetadata.description);
  const keywords = pageMetadata.keywords 
    ? generateKeywords(pageMetadata.keywords)
    : generateKeywords();
  const image = pageMetadata.image || siteConfig.defaultImage;
  const url = siteConfig.url;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: (pageMetadata.type === 'product' ? 'website' : pageMetadata.type) || 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Gets default metadata for common page types
 * @param pageType - Type of page (home, about, contact, etc.)
 * @returns PageMetadata object
 */
export function getDefaultPageMetadata(pageType: keyof typeof defaultPageMetadata): PageMetadata {
  const defaults = defaultPageMetadata[pageType];
  
  if (!defaults) {
    throw new Error(`No default metadata found for page type: ${pageType}`);
  }
  
  return {
    title: defaults.title,
    description: defaults.description,
    keywords: defaults.keywords,
    type: 'website'
  };
}

/**
 * Creates metadata for dynamic content (tours, blog posts, etc.)
 * @param title - Dynamic title
 * @param description - Dynamic description  
 * @param keywords - Additional keywords
 * @param image - Content-specific image
 * @param type - Content type
 * @returns Metadata object
 */
export function createDynamicMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string,
  type: 'website' | 'article' | 'product' = 'website'
): Metadata {
  const pageMetadata: PageMetadata = {
    title,
    description,
    keywords,
    image,
    type
  };
  
  return createMetadata(pageMetadata);
}

/**
 * Validates metadata for common SEO issues
 * @param metadata - PageMetadata to validate
 * @returns Array of validation warnings
 */
export function validateMetadata(metadata: PageMetadata): string[] {
  const warnings: string[] = [];
  
  // Check title length
  if (metadata.title.length > 60) {
    warnings.push(`Title is ${metadata.title.length} characters, consider keeping under 60 characters`);
  }
  
  if (metadata.title.length < 10) {
    warnings.push('Title is very short, consider making it more descriptive');
  }
  
  // Check description length
  if (metadata.description.length > 160) {
    warnings.push(`Description is ${metadata.description.length} characters, consider keeping under 160 characters`);
  }
  
  if (metadata.description.length < 50) {
    warnings.push('Description is quite short, consider adding more detail');
  }
  
  // Check for duplicate words in title
  const titleWords = metadata.title.toLowerCase().split(' ');
  const duplicateWords = titleWords.filter((word, index) => titleWords.indexOf(word) !== index);
  if (duplicateWords.length > 0) {
    warnings.push(`Title contains duplicate words: ${duplicateWords.join(', ')}`);
  }
  
  return warnings;
}

/**
 * Generates social sharing URL for different platforms
 * @param platform - Social media platform
 * @param url - URL to share
 * @param title - Title of the content
 * @param description - Description of the content
 * @returns Social sharing URL
 */
export function generateSocialShareUrl(
  platform: 'facebook' | 'twitter' | 'linkedin' | 'pinterest' | 'whatsapp',
  url: string,
  title: string,
  description?: string
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${encodedDescription ? `&description=${encodedDescription}` : ''}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription || encodedTitle}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    default:
      return url;
  }
}

/**
 * Creates enhanced metadata with additional social media optimization
 * @param pageMetadata - Page-specific metadata
 * @param socialImage - Optional custom social sharing image
 * @returns Enhanced Next.js Metadata object
 */
export function createEnhancedMetadata(
  pageMetadata: PageMetadata,
  socialImage?: string
): Metadata {
  const title = generatePageTitle(pageMetadata.title);
  const description = truncateDescription(pageMetadata.description);
  const keywords = pageMetadata.keywords 
    ? generateKeywords(pageMetadata.keywords)
    : generateKeywords();
  const image = socialImage || pageMetadata.image || siteConfig.defaultImage;
  const url = siteConfig.url;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: (pageMetadata.type === 'product' ? 'website' : pageMetadata.type) || 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      ...(pageMetadata.publishedTime && { publishedTime: pageMetadata.publishedTime }),
      ...(pageMetadata.modifiedTime && { modifiedTime: pageMetadata.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    other: {
      'pinterest-rich-pin': 'true',
      'fb:app_id': '', // Add Facebook App ID if available
    },
  };
}