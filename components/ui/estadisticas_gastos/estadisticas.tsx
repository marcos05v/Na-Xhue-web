"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type SavingsRow = {
  initials: string;
  color: string;
  supplier: string;
  strategy: string;
  date: string;
  saving: string;
  status: "DELIVERED" | "IN TRANSIT" | "PENDING";
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    label: "TOTAL SPENDING",
    value: "$12,482.00",
    sub: "+12.5% vs last month",
    subColor: "#4a7c3f",
    icon: "💳",
  },
  {
    label: "PROJECTED SAVINGS",
    value: "$1,240.50",
    sub: "⊙ Optimization Active",
    subColor: "#4a7c3f",
    icon: "🏷️",
  },
  {
    label: "INVENTORY HEALTH",
    value: "94.2%",
    sub: null,
    bar: 94,
    icon: "📋",
  },
  {
    label: "ACTIVE SUPPLIERS",
    value: "18",
    sub: "3 new this quarter",
    subColor: "#888",
    icon: "👥",
  },
];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];

const CHART_DATA = [
  { actual: 65, budget: 72 },
  { actual: 58, budget: 65 },
  { actual: 80, budget: 75 },
  { actual: 70, budget: 80 },
  { actual: 90, budget: 85 },
  { actual: 85, budget: 88 },
];

const CATEGORY_DATA = [
  { label: "Produce", pct: 45, color: "#4a7c3f" },
  { label: "Meat", pct: 30, color: "#c45a1a" },
  { label: "Dairy", pct: 25, color: "#6b8f5e" },
];

const BUDGET_ITEMS = [
  {
    label: "Fruit & Vegetables",
    spent: 4200,
    total: 5000,
    color: "#4a7c3f",
    note: "16% Remaining",
    noteColor: "#4a7c3f",
    noteIcon: "⊙",
    target: "Target: < $5.5k",
  },
  {
    label: "Poultry & Beef",
    spent: 3850,
    total: 4000,
    color: "#c45a1a",
    note: "⚠ Low Margin",
    noteColor: "#c45a1a",
    noteIcon: "",
    target: "Target: < $4.2k",
  },
  {
    label: "Dairy Products",
    spent: 2100,
    total: 3500,
    color: "#4a7c3f",
    note: "↘ 40% Under",
    noteColor: "#4a7c3f",
    noteIcon: "",
    target: "Target: < $3.5k",
  },
];

const SAVINGS_ROWS: SavingsRow[] = [
  {
    initials: "V",
    color: "#4a7c3f",
    supplier: "Valley Fresh Organics",
    strategy: "Bulk Consolidation (Q3)",
    date: "Oct 12, 2023",
    saving: "$425.00",
    status: "DELIVERED",
  },
  {
    initials: "M",
    color: "#888",
    supplier: "Midwest Meats Co.",
    strategy: "Subscription Lock-in",
    date: "Oct 08, 2023",
    saving: "$180.00",
    status: "DELIVERED",
  },
  {
    initials: "D",
    color: "#e8601c",
    supplier: "Dairy Direct Logistics",
    strategy: "Route Optimization Fee Drop",
    date: "Oct 01, 2023",
    saving: "$95.00",
    status: "IN TRANSIT",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SavingsRow["status"] }) {
  const styles: Record<SavingsRow["status"], { bg: string; color: string }> = {
    DELIVERED: { bg: "#e8f5e4", color: "#2e6b26" },
    "IN TRANSIT": { bg: "#fff3e0", color: "#c45a1a" },
    PENDING: { bg: "#f0f0f0", color: "#666" },
  };
  const s = styles[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.07em",
        padding: "3px 9px",
        borderRadius: 6,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function LineChart() {
  const W = 100;
  const H = 80;
  const pad = 4;

  function toPath(data: { actual: number; budget: number }[], key: "actual" | "budget") {
    return data
      .map((d, i) => {
        const x = pad + (i / (data.length - 1)) * (W - pad * 2);
        const y = H - pad - (d[key] / 100) * (H - pad * 2);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 180 }}>
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line
          key={i}
          x1={pad}
          y1={pad + t * (H - pad * 2)}
          x2={W - pad}
          y2={pad + t * (H - pad * 2)}
          stroke="#e8ede6"
          strokeWidth={0.3}
        />
      ))}
      <path d={toPath(CHART_DATA, "budget")} fill="none" stroke="#c8c0b5" strokeWidth={0.8} strokeDasharray="1.5 1" />
      <path
        d={`${toPath(CHART_DATA, "actual")} L ${100 - pad} ${H - pad} L ${pad} ${H - pad} Z`}
        fill="#4a7c3f"
        opacity={0.08}
      />
      <path d={toPath(CHART_DATA, "actual")} fill="none" stroke="#4a7c3f" strokeWidth={1.2} strokeLinecap="round" />
      {CHART_DATA.map((d, i) => {
        const x = pad + (i / (CHART_DATA.length - 1)) * (W - pad * 2);
        const y = H - pad - (d.actual / 100) * (H - pad * 2);
        return <circle key={i} cx={x} cy={y} r={0.9} fill="#4a7c3f" />;
      })}
    </svg>
  );
}

function DonutChart() {
  const R = 56;
  const cx = 80;
  const cy = 80;
  const stroke = 22;

  function polar(cxp: number, cyp: number, r: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cxp + r * Math.cos(rad), y: cyp + r * Math.sin(rad) };
  }

  let cumPct = 0;
  const slices = CATEGORY_DATA.map((d) => {
    const startAngle = cumPct * 3.6 - 90;
    cumPct += d.pct;
    const endAngle = cumPct * 3.6 - 90;
    const start = polar(cx, cy, R, startAngle);
    const end = polar(cx, cy, R, endAngle);
    const large = d.pct > 50 ? 1 : 0;
    const path = `M ${start.x} ${start.y} A ${R} ${R} 0 ${large} 1 ${end.x} ${end.y}`;
    return { ...d, path };
  });

  return (
    <svg viewBox="0 0 160 160" style={{ width: 160, height: 160 }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e8ede6" strokeWidth={stroke} />
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill="none" stroke={s.color} strokeWidth={stroke} strokeLinecap="butt" />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#999" fontSize={7} fontFamily="'Georgia', serif">
        TOTAL
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#1a1a1a" fontSize={12} fontWeight="bold" fontFamily="'Georgia', serif">
        $12.4k
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OperationalIntelligence() {
  const [_period, _setPeriod] = useState<"30" | "60" | "90">("30");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#1a1a1a",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ── Content ── */}
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#2d5a27",
                margin: 0,
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.5px",
              }}
            >
              Operational Intelligence
            </h1>
            <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
              Real-time spending analysis and supply chain efficiency.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              style={{
                background: "#fff",
                border: "1px solid #ddd8d0",
                color: "#555",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              📅 Last 30 Days
            </button>
            <button
              style={{
                background: "#2d5a27",
                border: "none",
                color: "#fff",
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ⬇ Export Report
            </button>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
          {KPI_CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                background: "#fff",
                border: "1px solid #e8ede6",
                borderRadius: 14,
                padding: "20px 22px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.08em", margin: 0 }}>
                  {card.label}
                </p>
                <span style={{ fontSize: 16 }}>{card.icon}</span>
              </div>
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "10px 0 6px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {card.value}
              </p>
              {card.sub && (
                <p style={{ fontSize: 11, color: card.subColor || "#888", margin: 0, fontWeight: 500 }}>
                  {card.sub}
                </p>
              )}
              {card.bar !== undefined && (
                <div
                  style={{
                    height: 5,
                    background: "#e8ede6",
                    borderRadius: 99,
                    overflow: "hidden",
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${card.bar}%`,
                      background: "#4a7c3f",
                      borderRadius: 99,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 14 }}>
          {/* Line Chart */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e8ede6",
              borderRadius: 14,
              padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                  Monthly Expenditure Trends
                </p>
                <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
                  Analysis across top supply categories
                </p>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a7c3f", display: "inline-block" }} />
                  Actual
                </span>
                <span style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#bbb", display: "inline-block" }} />
                  Budget
                </span>
              </div>
            </div>
            <LineChart />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingLeft: 4, paddingRight: 4 }}>
              {MONTHS.map((m) => (
                <span key={m} style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.06em" }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e8ede6",
              borderRadius: 14,
              padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Spend by Category</p>
            <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 16px" }}>Current Month Portfolio</p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <DonutChart />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CATEGORY_DATA.map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: c.color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#555" }}>{c.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Budget Integrity ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e8ede6",
            borderRadius: 14,
            padding: "22px 24px",
            marginBottom: 14,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Budget Integrity & Tracking</p>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: "#e8f5e4", color: "#2e6b26", padding: "3px 10px", borderRadius: 6, letterSpacing: "0.05em" }}>
                On Track
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, background: "#f0ede8", color: "#888", padding: "3px 10px", borderRadius: 6, letterSpacing: "0.05em" }}>
                FY 2024
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {BUDGET_ITEMS.map((item) => {
              const pct = Math.round((item.spent / item.total) * 100);
              return (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: "#888" }}>
                      ${item.spent.toLocaleString()} / ${item.total.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ height: 6, background: "#e8ede6", borderRadius: 99, overflow: "hidden", marginBottom: 7 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: item.color, borderRadius: 99 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: item.noteColor, fontWeight: 500 }}>
                      {item.noteIcon} {item.note}
                    </span>
                    <span style={{ fontSize: 10, color: "#bbb" }}>{item.target}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Monthly Savings Realization ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e8ede6",
            borderRadius: 14,
            padding: "22px 24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Monthly Savings Realization</p>
            <button style={{ background: "none", border: "none", color: "#4a7c3f", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>
              View All History
            </button>
          </div>

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr",
              gap: 12,
              paddingBottom: 10,
              borderBottom: "1px solid #e8ede6",
              marginBottom: 4,
            }}
          >
            {["SUPPLIER", "STRATEGY APPLIED", "IMPLEMENTATION DATE", "EST. MONTHLY SAVING", "STATUS"].map((h) => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
                {h}
              </span>
            ))}
          </div>

          {SAVINGS_ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr",
                gap: 12,
                alignItems: "center",
                padding: "14px 0",
                borderBottom: i < SAVINGS_ROWS.length - 1 ? "1px solid #f0ede8" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: row.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                  }}
                >
                  {row.initials}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{row.supplier}</span>
              </div>
              <span style={{ fontSize: 12, color: "#888" }}>{row.strategy}</span>
              <span style={{ fontSize: 12, color: "#888" }}>{row.date}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4a7c3f" }}>{row.saving}</span>
              <StatusBadge status={row.status} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}