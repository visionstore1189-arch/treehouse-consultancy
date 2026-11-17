// Original protected v5 assets; file bytes remain outside Git and public output.
export const MATERIALS_READY = false; // Enable only after private uploads and live acceptance.
export const protectedMaterials = {
  "tour": {
    "key": "tour.html",
    "contentType": "text/html",
    "bytes": 1879171,
    "sha256": "ede4591079e0264e755bc330ceae176f13b26e00361aaaac2ecfd7aaed0e94c6"
  },
  "sample-report": {
    "key": "sample-report.pdf",
    "contentType": "application/pdf",
    "bytes": 165817,
    "sha256": "58ea24539c7679f7c7a21d1f029f54d90113f6657ff03d22fa593849a4d3940c"
  },
  "requirements-screen": {
    "key": "requirements-screen.png",
    "contentType": "image/png",
    "bytes": 371156,
    "sha256": "44b5f9b6d0dcc90d1710339b0bca60a3791b5189cb91601ad6a7aa7c4d5bafe1"
  },
  "finding-screen": {
    "key": "finding-screen.png",
    "contentType": "image/png",
    "bytes": 360455,
    "sha256": "082368aa0d9fd62ce202b9cdbfe97e34d588b50197eddcbbf4cbe73ae49dfde9"
  },
  "scope-screen": {
    "key": "scope-screen.png",
    "contentType": "image/png",
    "bytes": 239033,
    "sha256": "930d32992a87f604c4e6793a5cd531562f2908ecb23ee5beed285abc509bfbcd"
  },
  "scope-screen-ar": {
    "key": "scope-screen-ar.png",
    "contentType": "image/png",
    "bytes": 210373,
    "sha256": "0772fd39de634a9d6d56c063dd64860ddc0c2a308c35f5ba16ebce7905247fde"
  }
} as const;
export type ProtectedMaterial = {key:string;contentType:string;bytes:number;sha256:string};
