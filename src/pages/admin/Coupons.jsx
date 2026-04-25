import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Copy,
  ChevronDown,
  ListFilter,
  Mail,
  MoreVertical,
  Phone,
  Tag,
  Ticket,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Pagination, usePagination } from "../../components/Pagination";

const DUTCH_MONTH_MAP = {
  jan: 0,
  januari: 0,
  feb: 1,
  februari: 1,
  mrt: 2,
  maart: 2,
  apr: 3,
  april: 3,
  mei: 4,
  jun: 5,
  juni: 5,
  jul: 6,
  juli: 6,
  aug: 7,
  augustus: 7,
  sep: 8,
  sept: 8,
  september: 8,
  okt: 9,
  oktober: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

const ICON_MAP = {
  Ticket,
  Users,
  Wallet,
};

const STATUS_CLASS = {
  paid: "bg-[#DCFCE7] text-[#166534]",
  refunded: "bg-[#F1F5F9] text-[#1E293B]",
};

const normalizeLabel = (value = "") => String(value).trim().toLowerCase();

const parsePurchaseDate = (purchaseDate) => {
  const match = String(purchaseDate)
    .trim()
    .match(/^(\d{1,2})\s+([^.\s]+)\.?\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/i);

  if (!match) {
    return null;
  }

  const [, day, monthToken, year, hours = "0", minutes = "0"] = match;
  const monthIndex = DUTCH_MONTH_MAP[normalizeLabel(monthToken)];

  if (monthIndex === undefined) {
    return null;
  }

  return new Date(
    Number(year),
    monthIndex,
    Number(day),
    Number(hours),
    Number(minutes)
  );
};

const getRowDateValue = (purchaseDate) => {
  const parsedDate = parsePurchaseDate(purchaseDate);

  if (!parsedDate) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
};

const getRowTimeValue = (purchaseDate) => {
  const parsedDate = parsePurchaseDate(purchaseDate);

  if (!parsedDate) {
    return "";
  }

  return `${String(parsedDate.getHours()).padStart(2, "0")}:${String(
    parsedDate.getMinutes()
  ).padStart(2, "0")}`;
};

const formatShortDate = (purchaseDate) => {
  const parsed = parsePurchaseDate(purchaseDate);
  if (!parsed) return "";
  const day = parsed.getDate();
  const monthNames = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  return `${day} ${monthNames[parsed.getMonth()]}.`;
};

const generateCouponCodes = (couponNo, qty, purchaseDate) => {
  const raw = couponNo.replace("#", "");
  const match = raw.match(/^([A-Z]+-)(\d+)$/);
  const count = Math.min(Math.max(parseInt(qty, 10) || 1, 1), 4);
  const shortDate = formatShortDate(purchaseDate);

  if (!match) {
    return Array.from({ length: count }, () => ({ code: raw, date: shortDate }));
  }

  const prefix = match[1];
  const baseNum = parseInt(match[2], 10);

  return Array.from({ length: count }, (_, i) => ({
    code: `${prefix}${String(baseNum + i).padStart(4, "0")}`,
    date: shortDate,
  }));
};

const CouponDetailModal = ({ row, onClose }) => {
  const coupons = generateCouponCodes(row.couponNo, row.qty, row.purchaseDate);
  const [copiedCoupon, setCopiedCoupon] = useState("");
  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    row.participant.name
  )}&background=DAE2FF&color=0040A2&size=128`;

  const handleCopyCoupon = async (couponCode) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(couponCode);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = couponCode;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "absolute";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      setCopiedCoupon(couponCode);
      window.setTimeout(() => {
        setCopiedCoupon((prev) => (prev === couponCode ? "" : prev));
      }, 1200);
    } catch (error) {
      setCopiedCoupon("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluiten"
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full  hover:bg-[#F1F5F9] text-[#0F172A] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Profile section */}
          <div className="flex items-center gap-4">
            <div className="h-18 w-18 shrink-0 overflow-hidden rounded-full border border-[#F485251A] bg-[#E2E8F0]">
              <img
                src={avatarSrc}
                alt={row.participant.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  {row.participant.name}
                </h2>
                <span className="rounded-full bg-[#FFF2E5] px-2.5 py-0.5 text-xs font-semibold text-[#F48525]">
                  Nieuw
                </span>
              </div>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 text-sm text-[#5C5F60]">
                  <Mail size={13} className="shrink-0" />
                  {row.instagram.replace("@", "") + "@mail.com"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#5C5F60]">
                  <Phone size={13} className="shrink-0" />
                  {row.instagram}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-[#F485251A] p-4 md:p-6">
            {/* Active coupons */}
            <div>
              <p className="text-lg leading-none font-semibold  text-[#0F172A]">
                Actieve kortingsbonnen
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {coupons.map((coupon, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-[#F485251A] bg-[#FCFDFE] px-3 md:px-5 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <Tag size={22} className="text-[#98A5B5]" strokeWidth={1.8} />

                      <div>
                        <p className="text-sm  md:text-base leading-none font-semibold text-[#F4A460]">
                          #{coupon.code}
                        </p>
                        <p className="mt-1 text-sm  md:text-base leading-none font-semibold uppercase text-[#BCC6D2]">
                          VERLOPEN OP
                        </p>
                        <p className="mt-1 text-sm  md:text-base leading-none font-medium uppercase text-[#AEB8C5]">
                          {coupon.date}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Kopieer ${coupon.code}`}
                      onClick={() => handleCopyCoupon(coupon.code)}
                      className={`inline-flex h-6 md:h-8 w-6 md:w-8 items-center justify-center transition-colors cursor-pointer ${
                        copiedCoupon === coupon.code
                          ? "text-[#F4A460]"
                          : "text-[#D4DCE5] hover:text-[#BFCAD8]"
                      }`}
                    >
                      <Copy size={22} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment status */}
            <div className="mt-6 flex items-center gap-3">
              <p className="text-base leading-none font-semibold text-[#5B6166]">
                Betalingsstatus:
              </p>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base leading-none  ${
                  STATUS_CLASS[row.statusTone] || STATUS_CLASS.paid
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-current" aria-hidden="true" />
                {row.status}
              </span>
            </div>

            {/* Purchase date */}
            <div className="mt-7">
              <p className="text-base leading-none font-semibold text-[#5B6166]">Aankoopdatum</p>
              <div className="mt-4 rounded-2xl border border-[#F485251A] bg-[#F3F5F7] px-5 py-4">
                <p className="text-base leading-none font-medium text-[#4B5563]">
                  {row.purchaseDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ stat }) => {
  const Icon = ICON_MAP[stat.icon] || Ticket;

  return (
    <article className="rounded-xl border border-[#F485251A] bg-white px-5 py-5">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-[#64748B]">{stat.label}</p>
        <span className="inline-flex h-7 md:h-10 w-7  md:w-10 items-center justify-center rounded-md bg-[#FFF2E5] text-[#F58626]">
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-2xl md:text-3xl leading-none font-bold text-[#0F172A]">
          {stat.value}
        </p>
        <span className="pt-1 text-[13px] font-bold text-[#16A34A]">
          {stat.trend}
        </span>
      </div>

      {stat.progress ? (
        <div className="mt-4 h-2.5 rounded-full bg-[#EAF0F6]">
          <div
            className="h-2.5 rounded-full bg-[#F58626]"
            style={{ width: `${stat.progress}%` }}
          />
        </div>
      ) : null}

      {stat.avatars ? (
        <div className="mt-4 flex items-center gap-[-5.5]">
          {stat.avatars.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="h-4 w-4 rounded-full border border-[#F485251A]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="rounded-full bg-[#FFE4CC] px-1.5 py-0.5 text-[10px] font-bold text-[#EA7A1C]">
            {"2k"}
          </span>
        </div>
      ) : null}

      {stat.meta ? (
        <p className="mt-4 text-sm text-[#94A3B8]">{stat.meta}</p>
      ) : null}
    </article>
  );
};

const FilterButton = ({ item, value, options = [], onValueChange, onDateChange, dateValue }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (item.type === "date") {
    return (
      <div className="inline-flex items-center gap-2">
        <input
          type="date"
          value={dateValue?.startDate || ""}
          onChange={(e) =>
            onDateChange({ ...dateValue, startDate: e.target.value })
          }
          className="h-10 rounded-lg border border-[#F485251A] bg-[#F8FAFC] px-3 text-[14px] md:text-base text-[#0F172A]"
        />
        <input
          type="time"
          value={dateValue?.endDate || ""}
          onChange={(e) =>
            onDateChange({ ...dateValue, endDate: e.target.value })
          }
          className="h-10 rounded-lg border border-[#F485251A] bg-[#F8FAFC] px-3 text-[14px] md:text-base text-[#0F172A]"
        />
      </div>
    );
  }

  const selectedLabel = value === item.label ? item.label : value;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-2 h-10 w-45 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[14px] md:text-base font-medium text-[#0F172A]  hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`text-[#64748B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && options.length > 0 && (
        <div className="absolute left-0 top-full mt-1 z-50 min-w-full rounded-xl border border-[#E2E8F0] bg-white shadow-lg overflow-hidden">
          <button
            type="button"
            onClick={() => { onValueChange(item.id, item.label); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#FFF7ED] hover:text-[#F48525] ${value === item.label ? "text-[#F48525] bg-[#FFF7ED]" : "text-[#0F172A]"}`}
          >
            {item.label}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onValueChange(item.id, option); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#FFF7ED] hover:text-[#F48525] ${value === option ? "text-[#F48525] bg-[#FFF7ED]" : "text-[#0F172A]"}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Coupons = () => {
  const { t } = useTranslation();
  const data = t("admin.coupons", { returnObjects: true });
  const { mobileLabels } = data.table;
  const rows = data.table.rows;
  const filterItems = data.filters.items;
  const [filterValues, setFilterValues] = useState(() =>
    Object.fromEntries(
      filterItems
        .filter((item) => item.type !== "date")
        .map((item) => [item.id, item.label])
    )
  );
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedRow, setSelectedRow] = useState(null);

  const filterOptions = Object.fromEntries(
    filterItems
      .filter((item) => item.type !== "date")
      .map((item) => {
        if (item.id === "status") {
          return [item.id, [...new Set(rows.map((row) => row.status))]];
        }

        return [item.id, []];
      })
  );

  const filteredRows = rows.filter((row) => {
    const selectedStatus = filterValues.status;
    const statusLabel = filterItems.find((item) => item.id === "status")?.label;

    if (selectedStatus && selectedStatus !== statusLabel && row.status !== selectedStatus) {
      return false;
    }

    if (dateRange.startDate) {
      const rowDateValue = getRowDateValue(row.purchaseDate);

      if (!rowDateValue || rowDateValue < dateRange.startDate) {
        return false;
      }
    }

    if (dateRange.endDate) {
      const rowTimeValue = getRowTimeValue(row.purchaseDate);

      if (!rowTimeValue || rowTimeValue < dateRange.endDate) {
        return false;
      }
    }

    return true;
  });

  const pagination = usePagination(filteredRows, 6);
  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;
  const handlePageChange = pagination.handlePageChange;
  const visibleRows = pagination["paginatedData"];

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
    handlePageChange(1);
  };

  const handleFilterValueChange = (filterId, nextValue) => {
    setFilterValues((previousValues) => ({
      ...previousValues,
      [filterId]: nextValue,
    }));
    handlePageChange(1);
  };

  const handleClearFilters = () => {
    setFilterValues(
      Object.fromEntries(
        filterItems
          .filter((item) => item.type !== "date")
          .map((item) => [item.id, item.label])
      )
    );
    setDateRange({ startDate: "", endDate: "" });
    handlePageChange(1);
  };

  return (
    <section className="w-full">
      <header className="border-b border-[#F485251A] pb-3">
        <h1 className="text-2xl md:text-4xl leading-none font-black text-[#0F172A]">
          {data.header.title}
        </h1>
        <p className="mt-2  text-base  md:text-lg leading-7 text-[#708399]">
          {data.header.subtitle}
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="mt-5 rounded-xl border border-[#F485251A] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 text-base font-bold text-[#0F172A]">
              <ListFilter
                size={18}
                className="text-[#94A3B8]"
                aria-hidden="true"
              />
              <span>{data.filters.title}</span>
            </p>

            {data.filters.items.map((item) => (
              <FilterButton
                key={item.id}
                item={item}
                value={filterValues[item.id] || item.label}
                options={filterOptions[item.id] || []}
                onValueChange={handleFilterValueChange}
                onDateChange={handleDateChange}
                dateValue={dateRange}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-[14px] font-semibold leading-4 text-[#F48525] hover:underline cursor-pointer"
          >
            {data.filters.clear}
          </button>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-xl border border-[#F485251A] bg-white">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-280 w-full">
            <thead>
              <tr className="border-b border-[#F485251A] bg-[#fef9f4]">
                {data.table.columns.map((column) => (
                  <th
                    key={column}
                    className={`px-4 py-4 text-base font-semibold text-[#667A92] ${
                      String(column).trim().toUpperCase() === "AANTAL"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F485251A] last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <span className="text-[16px] font-bold text-[#F48525]">
                      {row.couponNo}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5 -3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9]  text-[10px] font-bold text-slate-700">
                        {row.participant.initials}
                      </span>
                      <span className="text-[16px] font-semibold text-[#0F172A]">
                        {row.participant.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[16px] text-[#475569]">
                    {row.instagram}
                  </td>
                  <td className="px-4 py-4 text-[16px] text-[#475569]">
                    {row.purchaseDate}
                  </td>
                  <td className="px-4 py-4 text-[16px] font-semibold text-[#0F172A] text-center">
                    {row.qty}
                  </td>
                  <td className="px-4 py-4 text-base font-semibold text-[#0F172A]">
                    {row.total}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                        STATUS_CLASS[row.statusTone] || STATUS_CLASS.paid
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-current"
                        aria-hidden="true"
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      aria-label={row.actionAria}
                      onClick={() => setSelectedRow(row)}
                      className="text-[#F48525]  font-semibold text-base hover:underline cursor-pointer"
                    >
                      {data.table.detailButton}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3 p-3">
          {visibleRows.map((row) => (
            <div
              key={row.id}
              className="rounded-lg border border-[#F485251A] bg-[#FCFDFE] p-4 relative shadow-lg"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-bold text-[#334155]">
                    {row.participant.initials}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-[#111827]">
                      {row.participant.name}
                    </p>
                    <p className="text-sm text-[#8191A6]">{row.instagram}</p>
                  </div>
                </div>

                <button className="text-[#94A3B8] cursor-pointer">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-3 border-t border-[#F485251A] pt-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#6B7C93]">{mobileLabels.couponNo}</p>
                  <p className="text-sm font-bold text-[#F58626]">
                    {row.couponNo}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#6B7C93]">{mobileLabels.purchaseDate}</p>
                  <p className="text-sm font-semibold text-[#111827] text-right">
                    {row.purchaseDate}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#6B7C93]">{mobileLabels.qty}</p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {row.qty}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#6B7C93]">{mobileLabels.total}</p>
                  <p className="text-base font-bold text-[#0F172A]">
                    {row.total}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#6B7C93]">{mobileLabels.status}</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                      STATUS_CLASS[row.statusTone] || STATUS_CLASS.paid
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {row.status}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={row.actionAria}
                  onClick={() => setSelectedRow(row)}
                  className="mt-2 w-full rounded bg-[#F1F5F9] py-2 text-sm font-semibold text-[#F58626] cursor-pointer"
                >
                  {data.table.detailButton}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredRows.length}
          itemsPerPage={6}
        />
      </section>

      {selectedRow && (
        <CouponDetailModal row={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </section>
  );
};

export default Coupons;
