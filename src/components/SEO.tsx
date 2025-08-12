import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

export const SEOProvider = ({ children }: PropsWithChildren) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export const SEO = ({ title, description }: SEOProps) => {
  const { pathname } = useLocation();
  const url = typeof window !== "undefined" ? window.location.origin + pathname : pathname;
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
