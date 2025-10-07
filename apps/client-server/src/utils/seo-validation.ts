/**
 * SEO Validation Utilities
 * 
 * This file contains utilities to validate SEO implementation
 * and ensure proper HTML structure and meta tag placement.
 */

import { siteConfig } from '@/config/seo';

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates page title for SEO best practices
 */
export function validateTitle(title: string): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check title length
  if (title.length === 0) {
    errors.push('Title is empty');
  } else if (title.length > 60) {
    warnings.push(`Title is ${title.length} characters, recommended max is 60`);
  } else if (title.length < 30) {
    warnings.push(`Title is ${title.length} characters, recommended min is 30`);
  }

  // Check if title includes site name
  if (!title.includes(siteConfig.name.split(' - ')[0])) {
    warnings.push('Title should include site name for branding');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates meta description for SEO best practices
 */
export function validateDescription(description: string): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check description length
  if (description.length === 0) {
    errors.push('Description is empty');
  } else if (description.length > 160) {
    warnings.push(`Description is ${description.length} characters, recommended max is 160`);
  } else if (description.length < 120) {
    warnings.push(`Description is ${description.length} characters, recommended min is 120`);
  }

  // Check for duplicate words (basic check)
  const words = description.toLowerCase().split(' ');
  const duplicates = words.filter((word, index) => words.indexOf(word) !== index);
  if (duplicates.length > 2) {
    warnings.push('Description may have too many repeated words');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates canonical URL format
 */
export function validateCanonicalUrl(url: string): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const parsedUrl = new URL(url);
    
    // Check protocol
    if (parsedUrl.protocol !== 'https:') {
      warnings.push('Canonical URL should use HTTPS');
    }

    // Check for trailing slash consistency
    if (url.endsWith('/') && url !== siteConfig.url + '/') {
      warnings.push('Canonical URL has trailing slash, ensure consistency');
    }

    // Check domain matches site config
    if (parsedUrl.origin !== siteConfig.url) {
      warnings.push('Canonical URL domain differs from site config');
    }

  } catch {
    errors.push('Invalid canonical URL format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates robots meta tag configuration
 */
export function validateRobots(robots: string): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const validDirectives = [
    'index', 'noindex', 'follow', 'nofollow', 
    'max-snippet', 'max-image-preview', 'max-video-preview',
    'noarchive', 'nosnippet', 'noimageindex', 'notranslate'
  ];

  const directives = robots.toLowerCase().split(',').map(d => d.trim());

  // Check for conflicting directives
  if (directives.includes('index') && directives.includes('noindex')) {
    errors.push('Conflicting robots directives: index and noindex');
  }

  if (directives.includes('follow') && directives.includes('nofollow')) {
    errors.push('Conflicting robots directives: follow and nofollow');
  }

  // Check for unknown directives
  directives.forEach(directive => {
    const baseDirective = directive.split(':')[0];
    if (!validDirectives.includes(baseDirective)) {
      warnings.push(`Unknown robots directive: ${directive}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Comprehensive SEO validation for a page
 */
export function validatePageSEO(pageData: {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
}): SEOValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // Validate title
  const titleResult = validateTitle(pageData.title);
  allErrors.push(...titleResult.errors);
  allWarnings.push(...titleResult.warnings);

  // Validate description
  const descResult = validateDescription(pageData.description);
  allErrors.push(...descResult.errors);
  allWarnings.push(...descResult.warnings);

  // Validate canonical URL
  const canonicalResult = validateCanonicalUrl(pageData.canonical);
  allErrors.push(...canonicalResult.errors);
  allWarnings.push(...canonicalResult.warnings);

  // Validate robots if provided
  if (pageData.robots) {
    const robotsResult = validateRobots(pageData.robots);
    allErrors.push(...robotsResult.errors);
    allWarnings.push(...robotsResult.warnings);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}

/**
 * Development helper to log SEO validation results
 */
export function logSEOValidation(pageName: string, result: SEOValidationResult): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`SEO Validation: ${pageName}`);
    
    if (result.isValid) {
      console.log('✅ SEO validation passed');
    } else {
      console.log('❌ SEO validation failed');
    }

    if (result.errors.length > 0) {
      console.group('Errors:');
      result.errors.forEach(error => console.error(`❌ ${error}`));
      console.groupEnd();
    }

    if (result.warnings.length > 0) {
      console.group('Warnings:');
      result.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
      console.groupEnd();
    }

    console.groupEnd();
  }
}