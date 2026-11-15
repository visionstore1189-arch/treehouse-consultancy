CREATE TABLE IF NOT EXISTS enquiries (
 id TEXT PRIMARY KEY,
 kind TEXT NOT NULL CHECK(kind IN ('contact','demo','coverage')),
 locale TEXT NOT NULL CHECK(locale IN ('en','ar')),
 email TEXT NOT NULL,
 payload TEXT NOT NULL,
 consent_at TEXT NOT NULL,
 consent_version TEXT NOT NULL,
 consent_text TEXT NOT NULL,
 email_status TEXT NOT NULL CHECK(email_status IN ('pending','sent','failed')),
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS enquiries_created ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS enquiries_delivery ON enquiries(email_status);
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS rate_expiry ON rate_limits(expires_at);
