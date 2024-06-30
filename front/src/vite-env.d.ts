/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVENT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
