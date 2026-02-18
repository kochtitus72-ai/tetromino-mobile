import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "io.webflow.rainwalker",
    appName: "tetromino",
    webDir: "out",
    server: {
        // This forces the app to use a consistent internal URL
        // so it doesn't get "lost" between restarts.
        androidScheme: "https",
        hostname: "localhost",
        cleartext: true,
    },
    android: {
        // This allows the app to handle "heavy" assets like audio better
        allowMixedContent: true,
    },
};

export default config;
