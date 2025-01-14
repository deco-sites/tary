import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
export default defineApp(async (_req, ctx) => {
    const revision = await Context.active().release?.revision();
    return (<>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any"/>

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
        }}/>

        {/* Tailwind v3 CSS file */}
        <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet"/>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")}/>

        {/* Crisp Chat Script */}
        <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="3faea995-193b-4312-b2f3-4774d7dad88f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
        
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />
    </>);
});
