import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const SITE_TITLE = 'JUK Data - Išmanūs duomenų sprendimai kasdieniam verslui.'
const SITE_DESCRIPTION =
  'Nuo proceso audito iki įdiegimo ir palaikymo. JUK Data kuria duomenų sprendimus, kurie padeda verslui augti ir dirbti sklandžiau.'
const SITE_URL = 'https://jukdata.lt'

// Both values are build-time settings, not secrets: they are published in the
// rendered page either way. Kept in env so a fork or a demo build does not
// carry the owner's live form endpoint or Tag Manager container.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 628,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  other: {
    title: SITE_TITLE,
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0d0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.0/silktide-consent-manager.css"
          integrity="sha384-IO1E/jCrQXyH5rwcI0SXP7OXw47JFqQNDQcKhbFvqnL2IunBxxwE2Ne5XyAmCqKs"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-sans antialiased">
        <Script
          src="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.0/silktide-consent-manager.js"
          integrity="sha384-j4NIMOecmtzMWe9GJADIIe5hTlHG63aiTQ/2XorW10RNyQJg+IU+xwFVDy45wBah"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script id="google-consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("consent", "default", {
              analytics_storage:
                localStorage.getItem("stcm.consent.analytics") === "true"
                  ? "granted"
                  : "denied",
              ad_storage:
                localStorage.getItem("stcm.consent.marketing") === "true"
                  ? "granted"
                  : "denied",
              ad_user_data:
                localStorage.getItem("stcm.consent.marketing") === "true"
                  ? "granted"
                  : "denied",
              ad_personalization:
                localStorage.getItem("stcm.consent.marketing") === "true"
                  ? "granted"
                  : "denied",
              functionality_storage:
                localStorage.getItem("stcm.consent.essential") === "true"
                  ? "granted"
                  : "denied",
              // Granted by default: this covers security features such as
              // anti-fraud and authentication, not tracking.
              security_storage: "granted",
            });
          `}
        </Script>
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", ${JSON.stringify(GTM_ID)});
          `}
          </Script>
        )}
        <Script id="silktide-accessibility-labels" strategy="afterInteractive">
          {`
            (function () {
              var labels = {
                "consent-analytics": "Analitikos slapukai",
                "consent-marketing": "Rinkodaros slapukai",
                "consent-essential": "Būtinieji slapukai"
              };

              function applyConsentLabels() {
                Object.keys(labels).forEach(function (id) {
                  var input = document.getElementById(id);
                  if (!input) return;

                  input.setAttribute("aria-label", labels[id]);
                  input.setAttribute("title", labels[id]);
                });
              }

              applyConsentLabels();

              var observer = new MutationObserver(applyConsentLabels);
              observer.observe(document.documentElement, {
                childList: true,
                subtree: true
              });
            })();
          `}
        </Script>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  )
}
