import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import appCss from "../styles.css?url";
import { company } from "@/config/company";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { organizationGraph, siteUrl, siteLogo } from "@/config/schema";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[color:var(--color-brand-navy)]">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-brand-orange)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-brand-navy)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const siteTitle = `${company.name} | ${company.tagline}`;
const siteDescription =
  "Milestone Consultancy delivers expert project management, civil engineering, highway infrastructure, and QA/QC consultancy across Kalyan, Mumbai & Maharashtra.";
const siteImage = siteLogo;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },

      { title: siteTitle },

      {
        name: "description",
        content: siteDescription,
      },

      {
        name: "author",
        content: company.name,
      },

      {
        name: "theme-color",
        content: "#0B2D5B",
      },

      {
        name: "robots",
        content: "index, follow",
      },

      // Bing Webmaster Tools verification
      {
        name: "msvalidate.01",
        content: "AB99620C50FAA6ABE6312C4ACE173613",
      },

      {
        name: "googlebot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },

      {
        name: "bingbot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },

      {
        name: "keywords",
        content:
          "Project Management Consultancy, PMC, Engineering Consultancy, Civil Engineering, Construction Management, Infrastructure Consultancy, Highway Engineering, Road Engineering, Bridge Engineering, Building Consultancy, Industrial Consultancy, Commercial Consultancy, Residential Consultancy, Quantity Surveying, Billing Engineering, Tender Consultancy, Cost Estimation, Project Planning, Project Monitoring, Quality Assurance, Quality Control, QA QC, Government Infrastructure, Private Infrastructure, Engineering Solutions, Civil Engineering, Kalyan West, Kalyan, Thane, Mumbai Metropolitan Region, Maharashtra, India",
      },

      {
        name: "application-name",
        content: company.name,
      },

      {
        name: "referrer",
        content: "strict-origin-when-cross-origin",
      },

      {
        name: "creator",
        content: company.name,
      },

      {
        name: "publisher",
        content: company.name,
      },

      {
        name: "format-detection",
        content: "telephone=no",
      },

      {
        name: "geo.region",
        content: "IN-MH",
      },

      {
        name: "geo.placename",
        content: "Kalyan West",
      },

      {
        name: "mobile-web-app-capable",
        content: "yes",
      },

      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },

      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },

      // Open Graph
      {
        property: "og:title",
        content: siteTitle,
      },

      {
        property: "og:description",
        content: siteDescription,
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        property: "og:url",
        content: siteUrl,
      },

      {
        property: "og:site_name",
        content: company.name,
      },

      {
        property: "og:locale",
        content: "en_IN",
      },

      {
        property: "og:image",
        content: siteImage,
      },

      {
        property: "og:image:width",
        content: "1200",
      },

      {
        property: "og:image:height",
        content: "630",
      },

      {
        property: "og:image:alt",
        content: `${company.name} - Project Management Consultancy in Kalyan West, Maharashtra`,
      },

      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        name: "twitter:title",
        content: siteTitle,
      },

      {
        name: "twitter:description",
        content: siteDescription,
      },

      {
        name: "twitter:image",
        content: siteImage,
      },

      {
        name: "twitter:image:alt",
        content: `${company.name} - Project Management Consultancy`,
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },

      // Global canonical intentionally omitted.
      // Individual pages define their own canonical URL.

      // Modern SVG favicon
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },

      // PNG fallbacks
      {
        rel: "icon",
        href: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },

      {
        rel: "icon",
        href: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },

      {
        rel: "icon",
        href: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },

      // Legacy ICO fallback
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "any",
      },

      // Apple Touch Icon
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },

      // PWA Manifest
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },

      // Performance
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],

    scripts: [
      // Google Analytics
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-QL19PTRRR6",
        async: true,
      },

      {
        children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QL19PTRRR6');
          `,
      },

      // Microsoft Clarity
      {
        children: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xwleu3732v");
          `,
      },

      // Centralized Schema.org JSON-LD
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationGraph),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      delay: 0,
      disable: window.innerWidth < 768 ? true : false,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />

      <WhatsAppButton
        phoneNumber={company.contact.whatsappNumber}
        message={company.contact.whatsappMessage}
        position="bottom-right"
      />
    </QueryClientProvider>
  );
}
