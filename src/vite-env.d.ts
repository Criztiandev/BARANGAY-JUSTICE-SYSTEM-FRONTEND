/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_ENVIRONMENT: string;
  readonly VITE_DEV_BASE_URI: string;
  readonly VITE_DEV_TEST_URI: string;
  readonly VITE_PRODUCTION_BASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
