"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ShipmentStatus = "DELIVERED" | "IN TRANSIT" | "DELAYED" | "PENDING";

type DeliveryCard = {
  id: string;
  date: string;
  orderId: string;
  total: string;
  weight: string;
  suppliers: string[];
  suppliersExtra: number;
  tempRange: string;
  tempNote: string;
  deliveredTime: string;
  deliveredNote: string;
  signature: string;
  hasAlert?: boolean;
  alertMsg?: string;
  status: ShipmentStatus;
};

type RecentShipment = {
  icon: string;
  name: string;
  sub: string;
  amount: string;
  status: "delivered" | "transit" | "yesterday";
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { label: "Warehouse Pick", time: "04:30 AM", done: true },
  { label: "Consolidated", time: "06:15 AM", done: true },
  { label: "In Transit", time: "Expected 10:45 AM", done: true, active: true },
  { label: "Delivered", time: "---", done: false },
];

const DELIVERIES: DeliveryCard[] = [
  {
    id: "oct24",
    date: "Oct 24, 2023 Delivery",
    orderId: "#GX-9921-A",
    total: "$1,420.50",
    weight: "482 kg total weight",
    suppliers: ["🥦", "🥩", "🧀"],
    suppliersExtra: 2,
    tempRange: "2°C – 4°C",
    tempNote: "Consistent",
    deliveredTime: "09:12 AM",
    deliveredNote: "12 min Early",
    signature: "M. Chef Rossi",
    status: "DELIVERED",
  },
  {
    id: "oct21",
    date: "Oct 21, 2023 Delivery",
    orderId: "#GX-9855-B",
    total: "$2,105.00",
    weight: "",
    suppliers: [],
    suppliersExtra: 0,
    tempRange: "",
    tempNote: "",
    deliveredTime: "",
    deliveredNote: "",
    signature: "",
    hasAlert: true,
    alertMsg: "Italian Truffles delayed at consolidation point. Rescheduled for Oct 24.",
    status: "DELAYED",
  },
];

const RECENT_SHIPMENTS: RecentShipment[] = [
  { icon: "🚚", name: "Green Valley Farms", sub: "Delivered Today", amount: "$450", status: "delivered" },
  { icon: "🚛", name: "Northwest Seafood", sub: "In Transit", amount: "$820", status: "transit" },
  { icon: "🚐", name: "Central Bakery Co.", sub: "Yesterday", amount: "$125", status: "yesterday" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ShipmentStatus }) {
  const map: Record<ShipmentStatus, { bg: string; color: string; label: string }> = {
    DELIVERED: { bg: "#e8f5e4", color: "#2e6b26", label: "DELIVERED" },
    "IN TRANSIT": { bg: "#fff3e0", color: "#c45a1a", label: "IN TRANSIT" },
    DELAYED: { bg: "#fdecea", color: "#b91c1c", label: "1 DELAYED ITEM" },
    PENDING: { bg: "#f0f0f0", color: "#666", label: "PENDING" },
  };
  const s = map[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.07em",
        padding: "3px 10px",
        borderRadius: 6,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function MetaChip({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: "#f8fdf7",
        border: "1px solid #e8ede6",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 110,
      }}
    >
      <p style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", margin: "0 0 4px" }}>
        {label}
      </p>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 10, color: "#4a7c3f", margin: "2px 0 0", fontWeight: 500 }}>{sub}</p>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LogisticsHistory() {
  const [activeTab, setActiveTab] = useState<"history" | "active">("history");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: "#1a1a1a",
      }}
    >
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1a1a1a",
                margin: 0,
                fontFamily: "'Georgia', serif",
              }}
            >
              Logistics History
            </h1>
            <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
              Monitor active pipelines and track historical delivery data.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                background: "#fff",
                border: "1px solid #ddd8d0",
                color: "#555",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ⚙ Filter
            </button>
            <button
              style={{
                background: "#fff",
                border: "1px solid #ddd8d0",
                color: "#555",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ⬇ Export
            </button>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Active Pipeline Card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8ede6",
                borderRadius: 14,
                padding: "20px 24px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🚜</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>
                    Active Pipeline: Fresh Produce Batch #892
                  </span>
                </div>
                <StatusPill status="IN TRANSIT" />
              </div>

              {/* Stepper */}
              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                {/* connector line */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: "calc(12.5%)",
                    right: "calc(12.5%)",
                    height: 3,
                    background: "#e8ede6",
                    borderRadius: 99,
                    zIndex: 0,
                  }}
                />
                {/* active fill */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: "calc(12.5%)",
                    width: "60%",
                    height: 3,
                    background: "#4a7c3f",
                    borderRadius: 99,
                    zIndex: 1,
                  }}
                />

                {PIPELINE_STEPS.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      zIndex: 2,
                      width: "25%",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: step.done ? "#4a7c3f" : "#f0f0ee",
                        border: step.active ? "3px solid #2d5a27" : step.done ? "none" : "2px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: step.done ? "#fff" : "#bbb",
                        boxShadow: step.active ? "0 0 0 4px rgba(74,124,63,0.15)" : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {i === 0 ? "📋" : i === 1 ? "📦" : i === 2 ? "🚚" : "✓"}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: step.done ? 600 : 400,
                          color: step.done ? "#1a1a1a" : "#bbb",
                          margin: 0,
                        }}
                      >
                        {step.label}
                      </p>
                      <p style={{ fontSize: 10, color: "#aaa", margin: "2px 0 0" }}>{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Cards */}
            {DELIVERIES.map((delivery) => (
              <div
                key={delivery.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e8ede6",
                  borderRadius: 14,
                  padding: "20px 24px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20, color: "#aaa" }}>📅</span>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{delivery.date}</p>
                      <p style={{ fontSize: 12, color: "#aaa", margin: "2px 0 0" }}>ORDER ID: {delivery.orderId}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{delivery.total}</p>
                    {delivery.weight && (
                      <p style={{ fontSize: 11, color: "#aaa", margin: "2px 0 0" }}>{delivery.weight}</p>
                    )}
                    {delivery.hasAlert && <StatusPill status="DELAYED" />}
                  </div>
                </div>

                {/* Alert row */}
                {delivery.hasAlert && (
                  <div
                    style={{
                      background: "#fef9f0",
                      border: "1px solid #f5dfc0",
                      borderRadius: 10,
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                      <p style={{ fontSize: 12, color: "#7a4a10", margin: 0, lineHeight: 1.5 }}>
                        {delivery.alertMsg}
                      </p>
                    </div>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#4a7c3f",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        padding: 0,
                      }}
                    >
                      View Claim
                    </button>
                  </div>
                )}

                {/* Meta chips */}
                {!delivery.hasAlert && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" as const }}>
                      {/* Suppliers chip */}
                      <div
                        style={{
                          background: "#f8fdf7",
                          border: "1px solid #e8ede6",
                          borderRadius: 10,
                          padding: "10px 14px",
                          minWidth: 110,
                        }}
                      >
                        <p style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", margin: "0 0 6px" }}>
                          SUPPLIERS
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {delivery.suppliers.map((s, i) => (
                            <span
                              key={i}
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                background: "#e8ede6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                border: "2px solid #fff",
                                marginLeft: i > 0 ? -6 : 0,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                          {delivery.suppliersExtra > 0 && (
                            <span
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                background: "#4a7c3f",
                                color: "#fff",
                                fontSize: 9,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid #fff",
                                marginLeft: -6,
                              }}
                            >
                              +{delivery.suppliersExtra}
                            </span>
                          )}
                        </div>
                      </div>

                      <MetaChip
                        icon="🌡"
                        label="TEMP RANGE"
                        value={delivery.tempRange}
                        sub={delivery.tempNote}
                      />
                      <MetaChip
                        icon="✅"
                        label="DELIVERED"
                        value={delivery.deliveredTime}
                        sub={delivery.deliveredNote}
                      />
                      {/* Signature chip */}
                      <div
                        style={{
                          background: "#f8fdf7",
                          border: "1px solid #e8ede6",
                          borderRadius: 10,
                          padding: "10px 14px",
                          minWidth: 110,
                        }}
                      >
                        <p style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", margin: "0 0 4px" }}>
                          SIGNATURE
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: "#4a7c3f",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a" }}>{delivery.signature}</span>
                        </div>
                      </div>
                    </div>

                    {/* Photo + Map row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div
                        style={{
                          borderRadius: 10,
                          overflow: "hidden",
                          position: "relative",
                          height: 100,
                          background: "#e8ede6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 28 }}>🥦</span>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 8,
                            left: 10,
                            background: "rgba(0,0,0,0.55)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: 6,
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          Arrival Photo
                        </div>
                      </div>
                      <div
                        style={{
                          borderRadius: 10,
                          overflow: "hidden",
                          position: "relative",
                          height: 100,
                          background: "#c8dfc4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 28 }}>🗺️</span>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "rgba(0,0,0,0.55)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "3px 12px",
                            borderRadius: 6,
                            backdropFilter: "blur(4px)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ↺ Replay Route
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Monthly Summary */}
            <div
              style={{
                background: "#2d5a27",
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Monthly Summary
              </p>
              {[
                { label: "Deliveries", value: "14" },
                { label: "On-Time Rate", value: "96.4%" },
                { label: "Total Spend", value: "$18.2k" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>
                  Supplier Health Score
                </p>
                <div
                  style={{
                    height: 6,
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "82%",
                      background: "#a8d5a2",
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Shipments */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8ede6",
                borderRadius: 14,
                padding: "20px 22px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  margin: "0 0 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                📦 Recent Shipments
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {RECENT_SHIPMENTS.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: i < RECENT_SHIPMENTS.length - 1 ? "1px solid #f0ede8" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: s.status === "delivered" ? "#e8f5e4" : s.status === "transit" ? "#fff3e0" : "#f0f0ee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{s.name}</p>
                      <p
                        style={{
                          fontSize: 10,
                          color: s.status === "delivered" ? "#4a7c3f" : s.status === "transit" ? "#c45a1a" : "#aaa",
                          margin: "1px 0 0",
                        }}
                      >
                        {s.sub}
                      </p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{s.amount}</span>
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  marginTop: 12,
                  background: "#fff",
                  border: "1px solid #e8ede6",
                  borderRadius: 10,
                  padding: "9px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                View All Shipments
              </button>
            </div>

            {/* Logistics Support */}
            <div
              style={{
                background: "#f8fdf7",
                border: "1px solid #d4e8d0",
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 6px" }}>
                Logistics Support
              </p>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 14px", lineHeight: 1.5 }}>
                Having trouble with a recent delivery or missing items?
              </p>
              <button
                style={{
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #e8ede6",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2d5a27",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                🎫 Open Support Ticket
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}