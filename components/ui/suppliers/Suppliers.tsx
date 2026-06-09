"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SupplierStatus = "ACTIVE" | "INACTIVE" | "PENDING";
type SupplierCategory = "Produce" | "Meat & Poultry" | "Dairy" | "Seafood" | "Dry Goods" | "Bakery";

type Supplier = {
  id: string;
  initial: string;
  color: string;
  name: string;
  category: SupplierCategory;
  location: string;
  contact: string;
  email: string;
  rating: number;
  totalOrders: number;
  totalSpend: string;
  lastOrder: string;
  onTimeRate: string;
  status: SupplierStatus;
  tags: string[];
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SUPPLIERS: Supplier[] = [
  {
    id: "SUP-001",
    initial: "M",
    color: "#4a7c3f",
    name: "Milpa Verde del Valle",
    category: "Produce",
    location: "Etla, Oaxaca",
    contact: "Doña Esperanza Ruiz",
    email: "esperanza@milpaverde.mx",
    rating: 4.9,
    totalOrders: 48,
    totalSpend: "$18,240.00",
    lastOrder: "Jun 09, 2026",
    onTimeRate: "98%",
    status: "ACTIVE",
    tags: ["Orgánico", "Local", "Certificado"],
  },
  {
    id: "SUP-002",
    initial: "C",
    color: "#7a5c3a",
    name: "Carnes Selectas Cañada",
    category: "Meat & Poultry",
    location: "Nochixtlán, Oaxaca",
    contact: "Ing. Marcos Velásquez",
    email: "marcos@carnescañada.mx",
    rating: 4.6,
    totalOrders: 32,
    totalSpend: "$42,500.00",
    lastOrder: "Jun 08, 2026",
    onTimeRate: "94%",
    status: "ACTIVE",
    tags: ["Libre Pastoreo", "Premium"],
  },
  {
    id: "SUP-003",
    initial: "Q",
    color: "#e8601c",
    name: "Quesería San Marcos",
    category: "Dairy",
    location: "Tlacolula, Oaxaca",
    contact: "Familia Sánchez Blas",
    email: "queseria@sanmarcos.mx",
    rating: 4.7,
    totalOrders: 27,
    totalSpend: "$9,870.00",
    lastOrder: "Jun 07, 2026",
    onTimeRate: "96%",
    status: "ACTIVE",
    tags: ["Cadena Fría", "Artesanal"],
  },
  {
    id: "SUP-004",
    initial: "P",
    color: "#2a6b8a",
    name: "Pescados y Mariscos Huatulco",
    category: "Seafood",
    location: "Huatulco, Oaxaca",
    contact: "Don Aurelio Pérez",
    email: "aurelio@mariscos-huatulco.mx",
    rating: 4.4,
    totalOrders: 19,
    totalSpend: "$31,100.00",
    lastOrder: "Jun 06, 2026",
    onTimeRate: "89%",
    status: "ACTIVE",
    tags: ["Fresco Diario", "Costa"],
  },
  {
    id: "SUP-005",
    initial: "D",
    color: "#8a4a6b",
    name: "Despensa Zapoteca",
    category: "Dry Goods",
    location: "Ejutla, Oaxaca",
    contact: "Lic. Gabriela Morales",
    email: "gmorales@despensazapoteca.mx",
    rating: 4.2,
    totalOrders: 14,
    totalSpend: "$6,480.00",
    lastOrder: "Jun 01, 2026",
    onTimeRate: "85%",
    status: "INACTIVE",
    tags: ["Importado", "Especialidad"],
  },
  {
    id: "SUP-006",
    initial: "T",
    color: "#6b5a2a",
    name: "Tlayudas & Pan Artesanal",
    category: "Bakery",
    location: "Zimatlán, Oaxaca",
    contact: "Sra. Concepción Ávila",
    email: "conchita@panartesanal-oax.mx",
    rating: 4.8,
    totalOrders: 0,
    totalSpend: "$0.00",
    lastOrder: "—",
    onTimeRate: "—",
    status: "PENDING",
    tags: ["Artesanal", "Local"],
  },
];

const STATUS_CONFIG: Record<SupplierStatus, { bg: string; color: string; dot: string; label: string }> = {
  ACTIVE:   { bg: "#e8f5e4", color: "#2e6b26", dot: "#4a7c3f", label: "Active" },
  INACTIVE: { bg: "#f0f0ee", color: "#888",    dot: "#bbb",    label: "Inactive" },
  PENDING:  { bg: "#eef4ff", color: "#2a4a8a", dot: "#4a6adc", label: "Pending" },
};

const CATEGORY_ICONS: Record<SupplierCategory, string> = {
  "Produce":       "🥦",
  "Meat & Poultry":"🥩",
  "Dairy":         "🧀",
  "Seafood":       "🐟",
  "Dry Goods":     "🫙",
  "Bakery":        "🍞",
};

const TABS = ["All", "Active", "Inactive", "Pending"] as const;
type Tab = (typeof TABS)[number];

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: 11,
            color: i <= Math.round(rating) ? "#f5a623" : "#e0dbd4",
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 11, color: "#888", marginLeft: 2, fontWeight: 600 }}>{rating}</span>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function SupplierDetail({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  const sc = STATUS_CONFIG[supplier.status];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
      <div
        style={{
          position: "relative",
          width: 400,
          height: "100%",
          background: "#fff",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8ede6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, color: "#aaa", margin: 0, letterSpacing: "0.08em", fontWeight: 600 }}>SUPPLIER DETAIL</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "3px 0 0", fontFamily: "'Georgia', serif" }}>
              {supplier.id}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f0ede8", border: "none", borderRadius: "50%",
              width: 32, height: 32, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 56, height: 56, borderRadius: 16,
                background: supplier.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 22, flexShrink: 0,
              }}
            >
              {supplier.initial}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{supplier.name}</p>
              <p style={{ fontSize: 12, color: "#aaa", margin: "2px 0 4px" }}>
                {CATEGORY_ICONS[supplier.category]} {supplier.category} · {supplier.location}
              </p>
              <span style={{
                background: sc.bg, color: sc.color,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                padding: "2px 8px", borderRadius: 20,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                {sc.label}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div style={{ background: "#f8fdf7", border: "1px solid #e8ede6", borderRadius: 12, padding: "14px 16px" }}>
            <p style={{ fontSize: 9, color: "#aaa", fontWeight: 700, letterSpacing: "0.09em", margin: "0 0 6px" }}>PERFORMANCE RATING</p>
            <Stars rating={supplier.rating} />
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "TOTAL ORDERS", value: String(supplier.totalOrders) },
              { label: "TOTAL SPEND",  value: supplier.totalSpend },
              { label: "ON-TIME RATE", value: supplier.onTimeRate },
              { label: "LAST ORDER",   value: supplier.lastOrder },
            ].map((m) => (
              <div key={m.label} style={{ background: "#f8fdf7", border: "1px solid #e8ede6", borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ fontSize: 9, color: "#aaa", fontWeight: 700, letterSpacing: "0.09em", margin: "0 0 4px" }}>{m.label}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 10px" }}>CONTACT</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fdf7", border: "1px solid #e8ede6", borderRadius: 10 }}>
                <span style={{ fontSize: 14 }}>👤</span>
                <span style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 500 }}>{supplier.contact}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fdf7", border: "1px solid #e8ede6", borderRadius: 10 }}>
                <span style={{ fontSize: 14 }}>✉️</span>
                <span style={{ fontSize: 13, color: "#2d5a27", fontWeight: 500 }}>{supplier.email}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 10px" }}>TAGS</p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {supplier.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f0ede8", color: "#555",
                    fontSize: 11, fontWeight: 500,
                    padding: "4px 10px", borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            <button style={{ background: "#2d5a27", border: "none", borderRadius: 10, padding: "11px 0", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Place New Order
            </button>
            <button style={{ background: "#fff", border: "1px solid #e8ede6", borderRadius: 10, padding: "11px 0", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              View Order History
            </button>
            {supplier.status === "ACTIVE" && (
              <button style={{ background: "#fff", border: "1px solid #fdecea", borderRadius: 10, padding: "11px 0", color: "#b91c1c", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Deactivate Supplier
              </button>
            )}
            {supplier.status === "PENDING" && (
              <button style={{ background: "#eef4ff", border: "1px solid #c0d0f8", borderRadius: 10, padding: "11px 0", color: "#2a4a8a", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Approve Supplier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Suppliers() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = SUPPLIERS.filter((s) => {
    const matchTab =
      activeTab === "All" ||
      (activeTab === "Active"   && s.status === "ACTIVE") ||
      (activeTab === "Inactive" && s.status === "INACTIVE") ||
      (activeTab === "Pending"  && s.status === "PENDING");
    const matchSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const activeCount   = SUPPLIERS.filter((s) => s.status === "ACTIVE").length;
  const pendingCount  = SUPPLIERS.filter((s) => s.status === "PENDING").length;
  const totalSpend    = SUPPLIERS
    .filter((s) => s.status === "ACTIVE")
    .reduce((acc, s) => acc + parseFloat(s.totalSpend.replace(/[$,]/g, "")), 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });
  const avgRating = (
    SUPPLIERS.filter((s) => s.status === "ACTIVE").reduce((acc, s) => acc + s.rating, 0) /
    SUPPLIERS.filter((s) => s.status === "ACTIVE").length
  ).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1a1a1a" }}>
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#2d5a27", margin: 0, fontFamily: "'Georgia', serif", letterSpacing: "-0.5px" }}>
              Suppliers
            </h1>
            <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
              Manage your supplier network and track performance.
            </p>
          </div>
          <button
            style={{
              background: "#2d5a27", border: "none", color: "#fff",
              borderRadius: 10, padding: "10px 20px",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            + Add Supplier
          </button>
        </div>

        {/* ── KPI Strip ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "TOTAL SUPPLIERS", value: String(SUPPLIERS.length), icon: "🏪", sub: "In network" },
            { label: "ACTIVE",          value: String(activeCount),       icon: "✅", sub: "Currently supplying" },
            { label: "PENDING APPROVAL",value: String(pendingCount),      icon: "🕐", sub: "Awaiting review" },
            { label: "AVG RATING",      value: avgRating,                 icon: "⭐", sub: "Across active suppliers" },
          ].map((k) => (
            <div
              key={k.label}
              style={{
                background: "#fff", border: "1px solid #e8ede6",
                borderRadius: 14, padding: "16px 18px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: 9, color: "#aaa", fontWeight: 700, letterSpacing: "0.09em", margin: 0 }}>{k.label}</p>
                <span style={{ fontSize: 15 }}>{k.icon}</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "8px 0 3px", fontFamily: "'Georgia', serif" }}>
                {k.value}
              </p>
              <p style={{ fontSize: 10, color: "#aaa", margin: 0 }}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Filters row ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4, background: "#f0ede8", borderRadius: 10, padding: 4 }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  border: "none", borderRadius: 7,
                  padding: "6px 14px", fontSize: 12,
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? "#2d5a27" : "#888",
                  cursor: "pointer",
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Search */}
            <div style={{ background: "#fff", border: "1px solid #e8ede6", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", width: 200 }}>
              <span style={{ color: "#bbb", fontSize: 13 }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search suppliers..."
                style={{ border: "none", outline: "none", fontSize: 12, color: "#1a1a1a", background: "transparent", width: "100%" }}
              />
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", background: "#f0ede8", borderRadius: 10, padding: 4, gap: 2 }}>
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    background: view === v ? "#fff" : "transparent",
                    border: "none", borderRadius: 7,
                    width: 32, height: 32, fontSize: 14,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {v === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid View ── */}
        {view === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {filtered.map((supplier) => {
              const sc = STATUS_CONFIG[supplier.status];
              return (
                <div
                  key={supplier.id}
                  onClick={() => setSelected(supplier)}
                  style={{
                    background: "#fff",
                    border: selected?.id === supplier.id ? "1.5px solid #4a7c3f" : "1px solid #e8ede6",
                    borderRadius: 14,
                    padding: "20px",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(74,124,63,0.10)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: supplier.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
                        {supplier.initial}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{supplier.name}</p>
                        <p style={{ fontSize: 11, color: "#aaa", margin: "2px 0 0" }}>
                          {CATEGORY_ICONS[supplier.category]} {supplier.category}
                        </p>
                      </div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                      {sc.label}
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={{ marginBottom: 14 }}>
                    <Stars rating={supplier.rating} />
                  </div>

                  {/* Stats row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[
                      { label: "Orders", value: String(supplier.totalOrders) },
                      { label: "On-Time", value: supplier.onTimeRate },
                      { label: "Spend", value: supplier.totalSpend.replace(".00", "") },
                    ].map((s) => (
                      <div key={s.label} style={{ textAlign: "center" as const, background: "#f8fdf7", borderRadius: 8, padding: "6px 4px" }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 9, color: "#aaa", margin: "2px 0 0", letterSpacing: "0.05em" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #f0ede8" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                      {supplier.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ background: "#f0ede8", color: "#777", fontSize: 9, fontWeight: 500, padding: "2px 7px", borderRadius: 20 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: 10, color: "#bbb" }}>📍 {supplier.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── List View ── */}
        {view === "list" && (
          <div style={{ background: "#fff", border: "1px solid #e8ede6", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {/* Head */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr 0.6fr", gap: 12, padding: "12px 20px", borderBottom: "1px solid #e8ede6", background: "#fafaf8" }}>
              {["SUPPLIER", "CATEGORY", "LOCATION", "ORDERS", "ON-TIME", "STATUS", ""].map((h) => (
                <span key={h} style={{ fontSize: 9, fontWeight: 700, color: "#bbb", letterSpacing: "0.09em", textTransform: "uppercase" as const }}>
                  {h}
                </span>
              ))}
            </div>
            {filtered.map((supplier, i) => {
              const sc = STATUS_CONFIG[supplier.status];
              return (
                <div
                  key={supplier.id}
                  onClick={() => setSelected(supplier)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr 0.6fr",
                    gap: 12, padding: "13px 20px", alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid #f5f2ee" : "none",
                    cursor: "pointer",
                    background: selected?.id === supplier.id ? "#f8fdf7" : "transparent",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => { if (selected?.id !== supplier.id) (e.currentTarget as HTMLDivElement).style.background = "#fafaf8"; }}
                  onMouseLeave={(e) => { if (selected?.id !== supplier.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: supplier.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      {supplier.initial}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{supplier.name}</p>
                      <Stars rating={supplier.rating} />
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#888" }}>{CATEGORY_ICONS[supplier.category]} {supplier.category}</span>
                  <span style={{ fontSize: 11, color: "#888" }}>📍 {supplier.location}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{supplier.totalOrders}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: supplier.onTimeRate !== "—" && parseInt(supplier.onTimeRate) >= 95 ? "#2e6b26" : "#c45a1a" }}>
                    {supplier.onTimeRate}
                  </span>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" as const }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                    {sc.label}
                  </span>
                  <span style={{ fontSize: 18, color: "#ccc", textAlign: "center" as const }}>›</span>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ fontSize: 11, color: "#bbb", marginTop: 12, textAlign: "right" as const }}>
          Showing {filtered.length} of {SUPPLIERS.length} suppliers
        </p>
      </div>

      {selected && <SupplierDetail supplier={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}