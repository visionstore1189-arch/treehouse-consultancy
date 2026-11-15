-- Requires the existing ENQUIRIES D1 database and private R2 bucket.
CREATE TABLE IF NOT EXISTS sample_report_requests (
  id TEXT PRIMARY KEY,
  locale TEXT NOT NULL CHECK(locale IN ('en','ar')),
  name TEXT NOT NULL,
  organisation TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  email_status TEXT NOT NULL CHECK(email_status IN ('pending','sent','failed')),
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS sample_report_requests_created ON sample_report_requests(created_at);
CREATE INDEX IF NOT EXISTS sample_report_requests_email_status ON sample_report_requests(email_status);
