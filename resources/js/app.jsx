import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import '@shopify/polaris/build/esm/styles.css'
// import { Provider } from "@shopify/app-bridge-react";
import { AppProvider, Page } from "@shopify/polaris";
import { useState } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import MissingApiKey from '@/components/MissingApiKey';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({


    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const host = new URLSearchParams(location.search).get("host") || window.__SHOPIFY_HOST;
        window.__SHOPIFY_HOST = host;
        const appBridgeConfig = {
                host: new URLSearchParams(location.search).get("host") || window.__SHOPIFY_HOST,
                apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
                forceRedirect: true,
            };
            console.log(appBridgeConfig.apiKey )
        
        root.render(

           !appBridgeConfig.apiKey ? 
                    <AppProvider i18n={enTranslations}>
                        <MissingApiKey />
                    </AppProvider>
            
            
            :
            <AppProvider i18n={enTranslations} config={appBridgeConfig}>
                    <Page>
                        <App {...props} />
                    </Page>
            </AppProvider>
           

        );
    },
    progress: {
        color: '#4B5563',
    },
});
