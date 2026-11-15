"use client";
import { useState } from "react";
import Link from "next/link";
import { FileCheck2, ChevronRight, Search, ArrowUpRight } from "lucide-react";
import { ui, verdicts, coverage, markets } from "@/content/site";
import { articles, articleTopics, readingMinutes } from "@/content/articles";
import { href, type Locale } from "@/lib/config";
import { Wordmark } from "./ui";
export function AssessmentExplorer({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const v = verdicts[selected];
  return (
    <div className="assessment-explorer">
      <div className="assessment-top">
        <Wordmark locale={locale} />
        <span className="assessment-label">{ui.assessment[locale]}</span>
      </div>
      <div className="assessment-main">
        <div className="verdict-wheel">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle
              cx="100"
              cy="100"
              r="78"
              stroke="#e6ece8"
              strokeWidth="13"
              fill="none"
            />
            {verdicts.map((x, i) => (
              <circle
                key={x.id}
                className={`ring-${x.id}`}
                cx="100"
                cy="100"
                r="78"
                strokeWidth={selected === i ? 17 : 11}
                fill="none"
                strokeDasharray="105 490"
                strokeDashoffset={-i * 122.5}
                transform="rotate(-88 100 100)"
                opacity={selected === i ? 1 : 0.3}
              />
            ))}
          </svg>
          <div className="wheel-centre">
            <FileCheck2 size={30} strokeWidth={1} />
            <span>{ui.finding[locale]}</span>
            <strong>{String(selected + 1).padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="verdict-options">
          <p className="overline">{ui.graphHint[locale]}</p>
          {verdicts.map((x, i) => (
            <button
              key={x.id}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
              className={`verdict-option ${i === selected ? "selected" : ""}`}
            >
              <i className={`verdict-dot ${x.id}`} />
              {x.title[locale]}
              <ChevronRight size={14} className="directional" />
            </button>
          ))}
        </div>
      </div>
      <div className="finding-panel" aria-live="polite">
        <span className={`pill ${v.id}`}>{v.title[locale]}</span>
        <p>{v.text[locale]}</p>
        <small>
          {ui.evidence[locale]}
          <span>{v.evidence[locale]}</span>
        </small>
      </div>
      <div className="assessment-foot">
        <span className="small-square" />
        {ui.illustration[locale]}
      </div>
    </div>
  );
}
export function CoverageTable({
  locale,
  market,
}: {
  locale: Locale;
  market?: string;
}) {
  const [filter, setFilter] = useState(market || "all");
  const rows = coverage.filter((r) => filter === "all" || r.market === filter);
  return (
    <div className="coverage-panel">
      {!market && (
        <div className="filter-row">
          <label htmlFor="coverage-market">{ui.market[locale]}</label>
          <select
            id="coverage-market"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{ui.allMarkets[locale]}</option>
            {markets.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name[locale]}
              </option>
            ))}
          </select>
          <span className="result-count" aria-live="polite">
            {rows.length.toLocaleString(locale)} /{" "}
            {coverage.length.toLocaleString(locale)}
          </span>
        </div>
      )}
      <p className="table-hint">{ui.tableHint[locale]}</p>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label={ui.coverage[locale]}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">{ui.market[locale]}</th>
              <th scope="col">{ui.regulator[locale]}</th>
              <th scope="col">{ui.status[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  {markets.find((m) => m.slug === r.market)?.name[locale]}
                </td>
                <th scope="row">{r.name[locale]}</th>
                <td>
                  <span className="coverage-status">
                    <span className="status-dot" />
                    {ui[r.status][locale]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="coverage-note">{ui.coverageNote[locale]}</p>
    </div>
  );
}
export function InsightsList({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const [market, setMarket] = useState("all"),
    [topic, setTopic] = useState("all");
  let result = articles.filter(
    (a) =>
      a.status === "published" &&
      (market === "all" || a.market === market) &&
      (topic === "all" || a.topic === topic),
  );
  if (compact) result = result.slice(0, 3);
  return (
    <>
      {!compact && (
        <div className="filter-row insights-filters">
          <label>
            {ui.market[locale]}
            <select value={market} onChange={(e) => setMarket(e.target.value)}>
              <option value="all">{ui.allMarkets[locale]}</option>
              {markets.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name[locale]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {ui.topic[locale]}
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="all">{ui.allTopics[locale]}</option>
              {Object.entries(articleTopics).map(([key, v]) => (
                <option key={key} value={key}>
                  {v[locale]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div aria-live="polite">
        {result.length ? (
          <div className="insight-grid">
            {result.map((a) => (
              <Link
                className="article-card"
                key={a.slug}
                href={href(locale, `insights/${a.slug}`)}
              >
                <span className="overline">
                  {articleTopics[a.topic][locale]}
                </span>
                <h3>{a.title[locale]}</h3>
                <p>{a.description[locale]}</p>
                <small>
                  <time dateTime={a.date}>
                    {new Date(a.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>{" "}
                  · {readingMinutes(a, locale)} {ui.minuteRead[locale]}
                </small>
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="insights-empty">
            <div className="empty-icon">
              <Search size={26} strokeWidth={1} />
            </div>
            <div>
              <h3>{ui.insightsEmpty[locale]}</h3>
              <p>{ui.insightsEmptyBody[locale]}</p>
            </div>
            <Link className="text-link" href={href(locale, "contact")}>
              {ui.talk[locale]}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
