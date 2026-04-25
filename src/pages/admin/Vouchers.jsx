import { AlarmClockMinus, ArrowLeft, ChevronDown, EllipsisVertical, Forward, Plus, Rocket, Ticket, TrendingUp, UserCheck, ChevronRight, CornerUpLeft, Eye, Trash2, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pagination, usePagination } from "../../components/Pagination";

function ProgressBar({ used, total }) {
  const pct = Math.round((used / total) * 100);
  const color = pct >= 100 ? "#ef4444" : pct >= 50 ? "#f97316" : "#22c55e";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs text-gray-400">{used}/{total} {pct}%</span>
    </div>
  );
}

function StatusBadge({ status, statusText }) {
  const { t } = useTranslation();
  const badges = t("admin.vouchers.statusBadge", { returnObjects: true });
  
  if (status === (statusText?.active || badges.active)) return (
    <span className="inline-flex items-center gap-1 text-base px-2.5 py-1 rounded-full bg-green-50 text-green-700">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{statusText?.active || badges.active}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />{statusText?.expired || badges.expired}
    </span>
  );
}

function Avatar({ initials, color, size = 30 }) {
  return (
    <div className="rounded-full flex items-center justify-center text-white font-medium shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

const VoucherDropdown = ({ rowId, isOpen, onClose, buttonRect }) => {
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: -100 });
  const { t } = useTranslation();
  const actions = t("admin.actions", { returnObjects: true });

  const handleView = () => {
    console.log("View clicked for voucher:", rowId);
    onClose();
  };

  const handleDelete = () => {
    console.log("Delete clicked for voucher:", rowId);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleScroll = () => {
      onClose();
    };

    const handleResize = () => {
      onClose();
    };

    if (isOpen && buttonRect) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      const menuWidth = 144;
      const menuHeight = 104;
      const gap = 8;

      const centeredLeft =
        buttonRect.left + buttonRect.width / 2 - menuWidth / 1;
      const boundedLeft = Math.min(
        Math.max(gap, centeredLeft),
        window.innerWidth - menuWidth - gap,
      );

      const openUpward =
        buttonRect.bottom + menuHeight + gap > window.innerHeight;
      const top = openUpward
        ? Math.max(gap, buttonRect.top - menuHeight - gap)
        : Math.min(window.innerHeight - menuHeight - gap, buttonRect.bottom + gap);

      setDropdownStyle({ top, left: boundedLeft });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose, buttonRect]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="fixed w-36 rounded-lg border border-[#F485251A] bg-white shadow-2xl z-9999 overflow-hidden"
    >
      <button
        type="button"
        onClick={handleView}
        className="w-full px-4 py-2 text-center flex items-center justify-center hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB] cursor-pointer"
      >
        <span className="text-sm font-semibold text-[#111827]">{actions.view}</span>
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="w-full px-4 py-2 text-center flex items-center justify-center hover:bg-[#FEF2F2] transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-[#EF4444]">{actions.delete}</span>
      </button>
    </div>
  );
};

function LiveVoucherCard({ code, pct, name, handle }) {
  const { t } = useTranslation();
  const data = t("admin.vouchers.liveVoucherCard", { returnObjects: true });
  const defaults = t("admin.vouchers.newVoucherPage.defaults", { returnObjects: true });
  const cardCode = (code || defaults.code).toUpperCase();
  const [firstCodePart = "AMBER", ...restCodeParts] = cardCode.split("-");
  const secondCodePart = restCodeParts.length ? restCodeParts.join("-") : "FALL-24";
  
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[#07173B] shadow-[0_20px_35px_rgba(7,23,59,0.25)]">
      <div className="pointer-events-none absolute -right-10 -top-14 h-50 w-50 rounded-full border-22 border-[#7D503D]/35" />

      <div className="relative z-10 px-9 pb-6 pt-6">
        <div className="mb-3 flex items-start justify-between">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7F90AD]">
            {data.header.type}
          </span>
          <span className="rounded-md bg-[#273651] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-[#F3F7FF]">
            {data.header.status}
          </span>
        </div>

        <p className="mb-4 text-2xl font-bold uppercase italic leading-none text-[#F48525]">
          {name ? name.toUpperCase() : data.fallbackName.toUpperCase()}
        </p>

        <div className="text-center">
          <p className="text-5xl font-bold leading-none text-[#ECF3FF]">{pct || "20"}%</p>
          <p className="mx-auto mt-3 max-w-72.5 text-2xl] font-bold uppercase leading-[1.35] tracking-[0.20em] text-[#94A3B8]">
            {data.subtitle}
          </p>
        </div>

        <div className="mt-9 rounded-2xl border border-[#304469] bg-[#1A2745] px-6 py-4 text-center">
          <p className="mb-4 text-xs font-semibold uppercase  text-[#60708F]">
            {data.codeLabel}
          </p>
          <p className="text-2xl font-bold uppercase leading-tight tracking-[0.10em] text-[#EEF3FF]">
            {firstCodePart} -  {secondCodePart}
          </p>
      
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between border-t border-[#25395F] bg-[#1F2E4A] px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#324665] text-[#AAB8CF]">
            <User size={18} strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7A8CA9]">
              {data.partnerLabel}
            </p>
            <p className="text-lg font-semibold mt-1 leading-none text-[#F1F6FF]">@{handle || data.fallbackHandle}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7A8CA9]">
            {data.validUntilLabel}
          </p>
          <p className="text-lg font-bold leading-none text-[#F1F6FF] mt-1">{data.validUntilValue}</p>
        </div>
      </div>
    </div>
  );
}

// ─── NEW VOUCHER PAGE ────────────────────────────────────────────────────────
function NewVoucherPage({ onBack }) {
  const { t } = useTranslation();
  const data = t("admin.vouchers.newVoucherPage", { returnObjects: true });
  
  const [code, setCode] = useState(data.defaults.code);
  const [pct, setPct] = useState(data.defaults.percentage);
  const [discountType, setDiscountType] = useState(data.voucherData.percentageOption || "");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState(data.defaults.handle);
  const [limit, setLimit] = useState(data.defaults.usageLimit);
  const [expires, setExpires] = useState(data.defaults.expires);

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const r = () => chars[Math.floor(Math.random() * chars.length)];
    const words = ["FALL","SALE","WIN","DEAL","SAVE","PROMO"];
    const w = words[Math.floor(Math.random() * words.length)];
    setCode(`${r()}${r()}${r()}-${w}-${new Date().getFullYear().toString().slice(-2)}`);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[#F48924]">
           
            <CornerUpLeft size={14}  />
          </span>
          <span>Vouchers</span>
        </button>
        <span className="text-sm md:text-base text-[#F48924] font-bold">
          <ChevronRight size={14} />
        </span>
        <span className="text-sm  text-[#F48924] ">
          {data.breadcrumb.title}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-8 border-b border-[#F485251A] pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] uppercase tracking-tight">
            {data.header.title}
          </h1>
          <p className="text-[#64748B] text-sm md:text-base mt-1">
            {data.header.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
       
          <button className="w-full sm:w-auto px-5 py-2.5 bg-[#F48525] text-white rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20  transition-colors flex items-center gap-2 justify-center cursor-pointer">
            <Rocket size={16} />
            {data.header.publishButton}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-white p-4 md:p-6 rounded-xl border border-[#F485251A]">
            <h3 className="font-bold flex items-center text-lg gap-2 mb-5 text-[#0F172A]">
              <Ticket className="text-[#F48525]" size={22} /> {data.voucherData.title}
            </h3>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2 ">
                {data.voucherData.code}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="flex-1 bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-base outline-none focus:ring-2 focus:ring-[#F485251A] placeholder-gray-400"
                  
                  placeholder={code}
                  onChange={e => setCode(e.target.value)}
                />
                <button
                  onClick={generate}
                  className="bg-[#0F172A] text-white px-5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold min-h-11.5 cursor-pointer"
                >
                  <AlarmClockMinus size={14} /> {data.voucherData.generateBtn}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.voucherData.discountType}
                </label>
                <input
                  list="discount-type-options"
                  className="placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  placeholder={discountType}
                  onChange={e => setDiscountType(e.target.value)}
                />
          
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.voucherData.discountValue}
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 pr-8 text-base outline-none placeholder-gray-400"
                    
                    placeholder={pct}
                    onChange={e => setPct(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] font-bold text-sm">
                    {data.voucherData.percentageSymbol}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl border border-[#F485251A]">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-slate-900 text-lg ">
              <AlarmClockMinus className="text-[#F48525]" size={22} /> {data.usageAndLimits.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.usageAndLimits.usageLimit}
                </label>
                <input
                  className="placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold outline-none"
         
                  placeholder={limit}
                  onChange={e => setLimit(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.usageAndLimits.expiryDate}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold outline-none"
               
                  placeholder= {expires}
                  onChange={e => setExpires(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl border border-[#F485251A]">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-slate-900 text-lg ">
              <UserCheck className="text-[#F48525]" size={16} /> {data.influencerProfile.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.influencerProfile.name}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  placeholder={data.influencerProfile.namePlaceholder}
                  // value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.influencerProfile.handle}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  
                  placeholder={handle}
                  onChange={e => setHandle(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-xs md:text-sm font-semibold  uppercase  text-[#64748B] px-1">
            {data.preview.title}
          </div>

          <LiveVoucherCard code={code} pct={pct} name={name} handle={handle} />

          <div className="bg-[#FFF7ED] rounded-xl border border-[#FED7AA] p-4">
            <h4 className="text-base font-bold flex items-center  gap-2 text-[#F97316] uppercase mb-4">
              <TrendingUp size={16}  />{data.projection.title}
            </h4>

            <div className="mb-3">
              <div className="flex justify-between items-center text-sm  font-semibold text-[#64748B] uppercase mb-2">
                <span>{data.projection.conversionsLabel}</span>
                <span>{data.projection.conversionsValue}</span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-[#F97316]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm  font-semibold text-[#64748B] uppercase mb-2">
                <span>{data.projection.budgetLabel}</span>
                <span>{data.projection.budgetValue}</span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full w-[41%] bg-[#1E293B]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoucherDropdownSelect({ value, options, onChange }) {
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-2 h-10 w-55 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[14px] md:text-base font-medium text-[#0F172A] hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>{value}</span>
        <ChevronDown
          size={16}
          className={`text-[#64748B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 min-w-full rounded-xl border border-[#E2E8F0] bg-white shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#FFF7ED] hover:text-[#F48525] ${value === opt ? "text-[#F48525] bg-[#FFF7ED]" : "text-[#0F172A]"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardPage({ onNewVoucher }) {
  const { t } = useTranslation();
  const data = t("admin.vouchers.dashboardPage", { returnObjects: true });
  const mobileLabels = t("admin.vouchers.mobileLabels", { returnObjects: true });
  const statusText = t("admin.vouchers.statusBadge", { returnObjects: true });
  const actions = t("admin.actions", { returnObjects: true });
  const voucherRows = data.table.rows;
  
  const [statusFilter, setStatusFilter] = useState(data.table.statusOptions[0]);
  const [sort, setSort] = useState(data.table.sortOptions[0]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [buttonRect, setButtonRect] = useState(null);

  const filtered = voucherRows.filter(v =>
    statusFilter === data.table.statusOptions[0] || v.status === statusFilter
  );

  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(filtered, 6);

  const handleMenuClick = (e, rowId) => {
    setOpenMenuId(openMenuId === rowId ? null : rowId);
    if (openMenuId !== rowId) {
      setButtonRect(e.currentTarget.getBoundingClientRect());
    }
  };

  return (
    <div className="min-h-screen">
      <div className="  flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#F485251A] gap-4 mb-9">
        <div className="flex-1 md:mb-4 ">
          <div className="text-2xl lg:text-4xl font-bold text-gray-900">
            {data.header.title}
          </div>
          <div className="text-base text-[#64748B] mt-1 md:mt-2">
            {data.header.subtitle}
          </div>
        </div>
        <button
          onClick={onNewVoucher}
          className="flex items-center justify-center md:justify-start gap-1.5 text-base font-semibold text-white   rounded-lg whitespace-nowrap px-4 py-2 cursor-pointer"
          style={{ background: '#f97316' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ea6c0a')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f97316')}
        >
          <Plus size={16} className="md:size-7" /> {data.header.createButton}
        </button>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg  border border-[#F485251A] p-4 md:p-6 shadow-sm "
            >
              <div className="flex items-start justify-between mb-3 md:mb-4 ">
                <div className="flex-1">
                  <p className=" text-sm  md:text-base font-semibold text-[#64748B] tracking-wide mb-0.5 md:mb-1">
                    {stat.title}
                  </p>
                </div>
                {stat.trend && (
                  <span className="inline-flex items-center gap-1 md:gap-1.5 text-[9px] md:text-xs font-bold px-2  py-1 md:py-1 rounded-lg text-green-700 bg-green-50 ml-2 shrink-0">
                    <TrendingUp size={12} className="md:size-6" /> {stat.trend}
                  </span>
                )}
                {stat.trendLabel && !stat.trend && (
                  <span className="inline-flex items-center gap-1 md:gap-1.5 text-[9px] md:text-xs font-bold px-2 py-1 md:py-1 rounded-lg text-[#F48525] bg-[#F485251A] ml-2 shrink-0">
                    <Ticket size={12} className="md:size-6" /> {stat.trendLabel}
                  </span>
                )}
              </div>
              <div className="text-2xl md:text-3xl  font-bold text-gray-900 tracking-tight">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#F485251A] overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-5 md:px-8 py-4 md:py-5 border-b border-[#F485251A] gap-2 md:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <VoucherDropdownSelect
                value={statusFilter}
                options={data.table.statusOptions}
                onChange={setStatusFilter}
              />
              <VoucherDropdownSelect
                value={sort}
                options={data.table.sortOptions}
                onChange={setSort}
              />
            </div>
      
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-y-auto overflow-x-auto">
            <table className="min-w-280 w-full">
              <thead>
                <tr className="bg-[#fef9f4] border-b border-[#F485251A]">
                  {data.table.columns.map((column) => (
                    <th
                      key={column}
                      className={`px-6 py-4 text-base text-[#6B7C93] font-semibold ${
                        ["ACTIE", "ACTIES", "ACTION", "ACTIONS"].includes(
                          String(column).trim().toUpperCase()
                        )
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
                {paginatedData.map((voucher) => (
                  <tr
                    key={voucher.id}
                    className="border-b border-[#F485251A] last:border-b-0"
                  >
                    <td className="px-6 py-3.5">
                      <span
                        className="inline-flex rounded bg-[#FFF7ED] px-2.5 py-1 text-base font-semibold text-[#C2410C]"
                      >
                        {voucher.code}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={voucher.initials} color={voucher.color} size={36} />
                        <div>
                          <p className="text-base font-semibold text-[#111827]">
                            {voucher.influencer}
                          </p>
                          <p className="text-sm text-[#8191A6]">
                            {voucher.code.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex rounded bg-[#FFF7ED] px-2.5 py-1 text-base font-semibold text-[#F58626]">
                        {voucher.discount}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <ProgressBar used={voucher.used} total={voucher.total} />
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={voucher.status} statusText={statusText} />
                    </td>
                    <td className="px-6 py-3.5 text-base text-body">
                      {voucher.expires}
                    </td>
                    <td className="px-4 py-6 shrink-0 relative flex justify-center items-center">
                      <button
                        className="text-[#94A3B8] hover:text-[#0F172A] transition-colors flex items-center justify-center cursor-pointer"
                        onClick={(e) => handleMenuClick(e, voucher.id)}
                      >
                        <EllipsisVertical size={18} />
                      </button>
                      {openMenuId === voucher.id && (
                        <VoucherDropdown
                          rowId={voucher.id}
                          isOpen={true}
                          onClose={() => setOpenMenuId(null)}
                          buttonRect={buttonRect}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 p-3">
            {paginatedData.map((voucher) => (
              <div
                key={voucher.id}
                className="rounded-lg border border-[#F485251A] bg-[#FCFDFE] p-4 relative shadow-lg"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={voucher.initials} color={voucher.color} size={40} />
                    <div>
                      <p className="text-base font-semibold text-[#111827]">
                        {voucher.influencer}
                      </p>
                      <p className="text-sm text-[#8191A6]">{voucher.code}</p>
                    </div>
                  </div>
                  <button
                    className="text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                    onClick={(e) => handleMenuClick(e, voucher.id)}
                  >
                    <EllipsisVertical size={20} />
                  </button>
                  {openMenuId === voucher.id && (
                    <VoucherDropdown
                      rowId={voucher.id}
                      isOpen={true}
                      onClose={() => setOpenMenuId(null)}
                      buttonRect={buttonRect}
                    />
                  )}
                </div>

                <div className="space-y-2.5 border-t border-[#F485251A] pt-3">
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <p className="text-sm text-[#6B7C93]">{mobileLabels.discount}</p>
                    <span className="inline-flex rounded bg-[#FFF7ED] px-2.5 py-1 text-sm font-semibold text-[#F58626]">
                      {voucher.discount}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-row gap-2 justify-between items-center">
                      <p className="text-sm text-[#6B7C93]">{mobileLabels.usageCount}</p>
                      <div className="max-w-40">
                        <ProgressBar used={voucher.used} total={voucher.total} />
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 justify-between items-center pt-3">
                      <p className="text-sm text-[#6B7C93]">{mobileLabels.status}</p>
                      <StatusBadge status={voucher.status} statusText={statusText} />
                    </div>

                    <div className="flex flex-row gap-2 justify-between items-center pt-3">
                      <p className="text-sm text-[#6B7C93]">{mobileLabels.expiryDate}</p>
                      <p className="text-sm font-semibold text-[#111827] text-right">
                        {voucher.expires}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full rounded bg-[#F1F5F9] py-2 text-sm font-semibold text-[#F58626] cursor-pointer"
                  >
                    {actions.view}
                  </button>
                </div>
              </div>
            ))}
          </div>

         

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filtered.length}
            itemsPerPage={6}
          />
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  if (page === "new-voucher") {
    return <NewVoucherPage onBack={() => handleSetPage("dashboard")} />;
  }
  return <DashboardPage onNewVoucher={() => handleSetPage("new-voucher")} />;
}