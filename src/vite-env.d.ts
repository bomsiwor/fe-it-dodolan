/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly DODOLAN_API_BASEURL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
