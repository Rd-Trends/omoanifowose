import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import LayoutWithNavigation from "../layout/LayoutWithNavigation";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GTM_ID, pageview } from "../lib/gtm";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  // useEffect(() => {
  //   if ("undefined" === typeof window) {
  //     importScripts("https://p1.w-q-f-a.com/sw.js");
  //   }
  // }, []);

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />

      {/* google ads */}
      <Script
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3439563867082351"
        crossOrigin="anonymous"
      ></Script>

      {/* proppeler ads */}
      {/* <Script
        async="async"
        data-cfasync="false"
        src="//upgulpinon.com/1?z=5118000"
      ></Script>

      <Script
        id="propeller1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function(d,z,s){s.src='//'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('oaphoace.net',5118803,document.createElement('script'))
          `,
        }}
      />
      <Script
        id="propeller1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5118794,document.body||document.documentElement)
          `,
        }}
      />

      <Script
        async="async"
        data-cfasync="false"
        src="//upgulpinon.com/1?z=5118000"
      ></Script>

      <Script
        async="async"
        data-cfasync="false"
        src="//upgulpinon.com/1?z=5116255"
      ></Script>

      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5119748,document.body||document.documentElement)
          `,
        }}
      />

      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          <script>(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5139908,document.body||document.documentElement)</script>`,
        }}
      /> */}

      <ApolloProvider client={client}>
        <LayoutWithNavigation>
          <Component {...pageProps} />
        </LayoutWithNavigation>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
