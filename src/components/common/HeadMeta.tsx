import React, { useEffect } from 'react';
import { Article } from '../../api/types';

interface HeadMetaProps {
  title?: string;
  description?: string;
  article?: Article;
}

export const HeadMeta: React.FC<HeadMetaProps> = ({ title, description, article }) => {
  useEffect(() => {
    const siteTitle = 'झारखंड स्वतंत्र खबर | सच के साथ, आपके साथ';
    document.title = title ? `${title} | झारखंड स्वतंत्र खबर` : siteTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    let scriptTag: HTMLScriptElement | null = null;
    if (article) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.titleHi,
        description: article.summary,
        image: [article.coverImage],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: [
          {
            '@type': 'Person',
            name: article.authorName,
            jobTitle: article.authorRole || 'संवाददाता',
          },
        ],
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'झारखंड स्वतंत्र खबर',
          url: window.location.origin,
        },
      };

      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.id = 'article-structured-data';
      scriptTag.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && document.head.contains(scriptTag)) {
        document.head.removeChild(scriptTag);
      }
    };
  }, [title, description, article]);

  return null;
};
