"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "DELIVERED" | "IN TRANSIT" | "PENDING" | "CANCELLED";

type OrderItem = {
  name: string;
  qty: string;
  price: string;
};

type Order = {
  id: string;
  supplier: string;
  supplierInitial: string;
  supplierColor: string;
  category: string;
  date: string;
  eta: string;
  total: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: "Paid" | "Pending" | "Overdue";
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "#ORD-4821",
    supplier: "Valley Fresh Organics",
    supplierInitial: "V",
    supplierColor: "#4a7c3f",
    category: "Produce",
    date: "Jun 09, 2026",
    eta: "Today, 10:45 AM",
    total: "$1,240.00",
    items: [
      { name: "Roma Tomatoes", qty: "20 kg", price: "$180.00" },
      { name: "Baby Spinach", qty: "10 kg", price: "$220.00" },
      { name: "Heirloom Carrots", qty: "15 kg", price: "$160.00" },
      { name: "Fresh Basil", qty: "5 kg", price: "$680.00" },
    ],
    status: "IN TRANSIT",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-4820",
    supplier: "Midwest Meats Co.",
    supplierInitial: "M",
    supplierColor: "#7a5c3a",
    category: "Meat & Poultry",
    date: "Jun 08, 2026",
    eta: "Jun 10, 2:00 PM",
    total: "$3,850.00",
    items: [
      { name: "Prime Beef Tenderloin", qty: "12 kg", price: "$2,100.00" },
      { name: "Free-Range Chicken", qty: "25 kg", price: "$1,250.00" },
      { name: "Lamb Rack", qty: "8 kg", price: "$500.00" },
    ],
    status: "PENDING",
    paymentStatus: "Pending",
  },
  {
    id: "#ORD-4819",
    supplier: "Dairy Direct Logistics",
    supplierInitial: "D",
    supplierColor: "#e8601c",
    category: "Dairy",
    date: "Jun 07, 2026",
    eta: "Delivered Jun 08",
    total: "$620.50",
    items: [
      { name: "Aged Parmesan", qty: "6 kg", price: "$340.00" },
      { name: "Burrata Fresh", qty: "4 kg", price: "$180.50" },
      { name: "Heavy Cream", qty: "10 L", price: "$100.00" },
    ],
    status: "DELIVERED",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-4818",
    supplier: "Oceanic Seafood Supply",
    supplierInitial: "O",
    supplierColor: "#2a6b8a",
    category: "Seafood",
    date: "Jun 06, 2026",
    eta: "Delivered Jun 07",
    total: "$2,105.00",
    items: [
      { name: "Atlantic Salmon", qty: "18 kg", price: "$1,080.00" },
      { name: "Tiger Prawns", qty: "10 kg", price: "$750.00" },
      { name: "Sea Bass Fillet", qty: "8 kg", price: "$275.00" },
    ],
    status: "DELIVERED",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-4817",
    supplier: "Artisan Pantry Co.",
    supplierInitial: "A",
    supplierColor: "#8a4a6b",
    category: "Dry Goods",
    date: "Jun 05, 2026",
    eta: "—",
    total: "$480.00",
    items: [
      { name: "Arborio Rice", qty: "30 kg", price: "$210.00" },
      { name: "Extra Virgin Olive Oil", qty: "12 L", price: "$270.00" },
    ],
    status: "CANCELLED",
    paymentStatus: "Overdue",
  },
];

const STATUS_CONFIG: Record<OrderStatus, { bg: string; color: string; dot: string; label: string }> = {
  DELIVERED:    { bg: "#e8f5e4", color: "#2e6b26", dot: "#4a7c3f", label: "Delivered" },
  "IN TRANSIT": { bg: "#fff3e0", color: "#c45a1a", dot: "#e8601c", label: "In Transit" },
  PENDING:      { bg: "#eef4ff", color: "#2a4a8a", dot: "#4a6adc", label: "Pending" },
  CANCELLED:    { bg: "#fdecea", color: "#b91c1c", dot: "#dc2626", label: "Cancelled" },
};

const PAYMENT_CONFIG: Record<string, { color: string }> = {
  Paid:    { color: "#2e6b26" },
  Pending: { color: "#c45a1a" },
  Overdue: { color: "#b91c1c" },
};

const TABS = ["All Orders", "In Transit", "Pending", "Delivered", "Cancelled"] as const;
type Tab = (typeof TABS)[number];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.06em",
        padding: "3px 10px",
        borderRadius: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {c.label}
    </span>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }}
      />

      {/* Panel */}
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
        {/* Panel header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e8ede6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: 11, color: "#aaa", margin: 0, letterSpacing: "0.08em", fontWeight: 600 }}>
              ORDER DETAIL
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "3px 0 0", fontFamily: "'Georgia', serif" }}>
              {order.id}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f0ede8",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Supplier + status */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: order.supplierColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {order.supplierInitial}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{order.supplier}</p>
                <p style={{ fontSize: 11, color: "#aaa", margin: "2px 0 0" }}>{order.category}</p>
              </div>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Meta grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "ORDER DATE", value: order.date },
              { label: "ETA", value: order.eta },
              { label: "TOTAL", value: order.total },
              {
                label: "PAYMENT",
                value: order.paymentStatus,
                valueColor: PAYMENT_CONFIG[order.paymentStatus].color,
              },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  background: "#f8fdf7",
                  border: "1px solid #e8ede6",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <p style={{ fontSize: 9, color: "#aaa", fontWeight: 700, letterSpacing: "0.09em", margin: "0 0 4px" }}>
                  {m.label}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: (m as any).valueColor || "#1a1a1a", margin: 0 }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div>
            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 10px" }}>
              ITEMS ({order.items.length})
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "11px 0",
                    borderBottom: i < order.items.length - 1 ? "1px solid #f0ede8" : "none",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: "#aaa", margin: "2px 0 0" }}>{item.qty}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{item.price}</span>
                </div>
              ))}
            </div>

            {/* Total row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0 0",
                borderTop: "2px solid #e8ede6",
                marginTop: 4,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#2d5a27", fontFamily: "'Georgia', serif" }}>
                {order.total}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {order.status === "PENDING" && (
              <button
                style={{
                  background: "#2d5a27",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px 0",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Confirm Order
              </button>
            )}
            {order.status === "IN TRANSIT" && (
              <button
                style={{
                  background: "#2d5a27",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px 0",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Mark as Received
              </button>
            )}
            <button
              style={{
                background: "#fff",
                border: "1px solid #e8ede6",
                borderRadius: 10,
                padding: "11px 0",
                color: "#555",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Download Invoice
            </button>
            {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
              <button
                style={{
                  background: "#fff",
                  border: "1px solid #fdecea",
                  borderRadius: 10,
                  padding: "11px 0",
                  color: "#b91c1c",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Orders() {
  const [activeTab, setActiveTab] = useState<Tab>("All Orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter((o) => {
    const matchTab =
      activeTab === "All Orders" ||
      (activeTab === "In Transit" && o.status === "IN TRANSIT") ||
      (activeTab === "Pending" && o.status === "PENDING") ||
      (activeTab === "Delivered" && o.status === "DELIVERED") ||
      (activeTab === "Cancelled" && o.status === "CANCELLED");
    const matchSearch =
      search === "" ||
      o.supplier.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // Summary KPIs
  const totalSpend = ORDERS.filter((o) => o.status !== "CANCELLED")
    .reduce((acc, o) => acc + parseFloat(o.total.replace(/[$,]/g, "")), 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });
  const inTransitCount = ORDERS.filter((o) => o.status === "IN TRANSIT").length;
  const pendingCount = ORDERS.filter((o) => o.status === "PENDING").length;
  const deliveredCount = ORDERS.filter((o) => o.status === "DELIVERED").length;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1a1a1a" }}>
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#2d5a27", margin: 0, fontFamily: "'Georgia', serif", letterSpacing: "-0.5px" }}>
              Orders
            </h1>
            <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
              Manage and track all your supplier purchase orders.
            </p>
          </div>
          <button
            style={{
              background: "#2d5a27",
              border: "none",
              color: "#fff",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            + New Order
          </button>
        </div>

        {/* ── KPI Strip ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "TOTAL SPEND", value: totalSpend, icon: "💰", sub: "This month" },
            { label: "IN TRANSIT", value: String(inTransitCount), icon: "🚚", sub: "Active shipments" },
            { label: "PENDING", value: String(pendingCount), icon: "🕐", sub: "Awaiting confirmation" },
            { label: "DELIVERED", value: String(deliveredCount), icon: "✅", sub: "This month" },
          ].map((k) => (
            <div
              key={k.label}
              style={{
                background: "#fff",
                border: "1px solid #e8ede6",
                borderRadius: 14,
                padding: "16px 18px",
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
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, background: "#f0ede8", borderRadius: 10, padding: 4 }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  border: "none",
                  borderRadius: 7,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? "#2d5a27" : "#888",
                  cursor: "pointer",
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e8ede6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              width: 220,
            }}
          >
            <span style={{ color: "#bbb", fontSize: 13 }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              style={{
                border: "none",
                outline: "none",
                fontSize: 12,
                color: "#1a1a1a",
                background: "transparent",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* ── Orders Table ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e8ede6",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Table head */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr 1fr 0.6fr",
              gap: 12,
              padding: "12px 20px",
              borderBottom: "1px solid #e8ede6",
              background: "#fafaf8",
            }}
          >
            {["ORDER ID", "SUPPLIER", "CATEGORY", "DATE", "TOTAL", "STATUS", ""].map((h) => (
              <span key={h} style={{ fontSize: 9, fontWeight: 700, color: "#bbb", letterSpacing: "0.09em", textTransform: "uppercase" as const }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#bbb", fontSize: 13 }}>
              No orders found.
            </div>
          ) : (
            filtered.map((order, i) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr 1fr 0.6fr",
                  gap: 12,
                  padding: "14px 20px",
                  alignItems: "center",
                  borderBottom: i < filtered.length - 1 ? "1px solid #f5f2ee" : "none",
                  cursor: "pointer",
                  transition: "background 0.12s",
                  background: selectedOrder?.id === order.id ? "#f8fdf7" : "transparent",
                }}
                onMouseEnter={(e) => { if (selectedOrder?.id !== order.id) (e.currentTarget as HTMLDivElement).style.background = "#fafaf8"; }}
                onMouseLeave={(e) => { if (selectedOrder?.id !== order.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2d5a27", fontFamily: "monospace" }}>
                  {order.id}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: order.supplierColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0,
                    }}
                  >
                    {order.supplierInitial}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{order.supplier}</span>
                </div>

                <span style={{ fontSize: 11, color: "#888" }}>{order.category}</span>
                <span style={{ fontSize: 11, color: "#888" }}>{order.date}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{order.total}</span>
                <StatusBadge status={order.status} />

                <span style={{ fontSize: 18, color: "#ccc", textAlign: "center" as const }}>›</span>
              </div>
            ))
          )}
        </div>

        {/* Footer count */}
        <p style={{ fontSize: 11, color: "#bbb", marginTop: 12, textAlign: "right" as const }}>
          Showing {filtered.length} of {ORDERS.length} orders
        </p>
      </div>

      {/* ── Slide-in Detail Panel ── */}
      {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}