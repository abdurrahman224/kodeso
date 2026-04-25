import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Gift,
  Ticket,
  Pen,
  Trash2,
  Search,
  Info,
  Image as ImageIcon,
  ImagePlus,
  Eye,
  ArrowLeft,
  Save,
  Send,
  Calendar,
  CalendarClock,
  Clock,
  Link2,
  List,
  ArrowRight,
  Wallet,
  HousePlus,
  WalletCards,
  SquarePen,
  Shield,
  CheckCircle2,
  AlertCircle,
  CircleCheck,
  AlertTriangle,
  Circle,
  UserCheck,
  User,
  TrendingUp,
  ChevronRight,
  CornerUpLeft,
  RotateCw,
  Rocket,
  Calculator,
  AlarmClockMinus,
} from "lucide-react";

const buildServiceDraft = (service) => {
  const safeService = service || {};

  return {
    id: safeService.id || "",
    name: safeService.name || "",
    category: safeService.category || "",
    description: safeService.description || "",
    price: safeService.price || "",
    status: safeService.status || "LIVE",
  };
};

// --- Sub-Components ---

const StatCard = ({
  icon: Icon,
  title,
  desc,
  actionText,
  colorClass,
  bgColor,
  onClick,
}) => (
  <div
    className="bg-[#FFFFFF] p-4 rounded-lg border border-[#F485251A] shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:shadow-md flex flex-col h-full"
    onClick={onClick}
  >
    <div
      className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}
    >
      <Icon className={colorClass} size={24} />
    </div>
    <h3 className="text-lg md:text-xl font-bold mb-1 text-slate-800">
      {title}
    </h3>
    <p className="text-[#64748B] text-base mb-3 leading-relaxed flex-1">
      {desc}
    </p>
    <button
      className={`${colorClass}  flex items-center gap-2 text-sm md:text-base uppercase rounded-lg mt-auto w-full justify-start overflow-hidden text-ellipsis cursor-pointer`}
      style={{ minHeight: 40 }}
    >
      {actionText}
      <ArrowRight size={16} />
    </button>
    <div
      className={`absolute -top-10 -right-10 w-30 h-30 ${bgColor} rounded-full opacity-30 group-hover:scale-110 transition-transform`}
    />
  </div>
);

const ServiceRow = ({ name, id, cat, status, onEdit, onDelete }) => (
  <tr className="group bg-white  transition-colors">
    <td className="px-6 py-5">
      <div className="text-base font-semibold text-[#1E293B]">{name}</div>
      <div className="text-sm text-[#94A3B8] uppercase font-medium mt-0.5">
        ID : {id}
      </div>
    </td>
    <td className="px-6 py-5 text-base font-semibold text-[#64748B]">{cat}</td>
    <td className="px-6 py-5">
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === "LIVE"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-orange-50 text-orange-600"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-5">
      <div className="flex justify-end gap-3 text-gray-300">
        <button
          type="button"
          onClick={onEdit}
          className="text-[#94A3B8] cursor-pointer hover:text-slate-600 transition-colors"
          aria-label={`Edit ${name}`}
        >
          <Pen size={16} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-[#94A3B8] cursor-pointer hover:text-red-500 transition-colors"
          aria-label={`Delete ${name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </td>
  </tr>
);

// --- Main Pages ---

const Dashboard = ({ setPage, services, onCreateService, onEditService, onDeleteService }) => {
  const { t } = useTranslation();
  const data = t("admin.settings.dashboard", { returnObjects: true });
  const common = t("admin.settings.common", { returnObjects: true });

  return (
    <div className="">
      <div className="mb- border-b border-[#F485251A] pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
          {data.header.title}
        </h1>
        <p className="text-gray-500 text-base  mt-2">{data.header.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8 ">
        {data.actions.map((action, idx) => {
          const IconMap = {
            HousePlus,
            Gift,
            Wallet,
          };
          const IconComponent = IconMap[action.icon] || HousePlus;
          
          return (
            <StatCard
              key={idx}
              icon={IconComponent}
              title={action.title}
              colorClass={action.colorClass}
              bgColor={action.bgColor}
              desc={action.description}
              actionText={action.actionText}
              onClick={() => {
                if (action.id === "service") {
                  onCreateService();
                  return;
                }

                setPage(
                  action.id === "giveaway" ? "create-voucher" : "launch-giveaway",
                );
              }}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service List Overview */}
        <div className="lg:col-span-2 md:bg-white rounded-xl md:border border-[#F485251A] md:shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-white pb-4">
            <h2 className="text-lg md:text-2xl font-bold text-slate-800">
              {data.serviceOverview.title}
            </h2>
      
          </div>
          {/* Desktop Table */}
          <table className="w-full text-left hidden md:table">
            <thead>
              <tr className="text-base bg-[#f8f7f5] uppercase text-[#64748B] border-b border-[#F485251A] ">
                <th className="px-6 py-4">{data.serviceTable.columns[0]}</th>
                <th className="px-6 py-4">{data.serviceTable.columns[1]}</th>
                <th className="px-6 py-4">{data.serviceTable.columns[2]}</th>
                <th className="px-6 py-4 text-right">{data.serviceTable.columns[3]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F485251A]">
              {services.map((row) => (
                <ServiceRow
                  key={row.id}
                  name={row.name}
                  id={row.id}
                  cat={row.category}
                  status={row.status}
                  onEdit={() => onEditService(row)}
                  onDelete={() => onDeleteService(row.id)}
                />
              ))}
            </tbody>
          </table>
          {/* Mobile Cards */}
          <div className="md:hidden">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#F485251A] shadow-sm p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-slate-700 text-base">
                    {service.name}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm  font-semibold ${service.status === "LIVE" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase mb-1">
                  {common.idLabel}: {service.id}
                </div>
                <div className="text-sm text-gray-500 mb-2">{service.category}</div>
                <div className="flex justify-end gap-3 text-gray-300">
                  <button
                    type="button"
                    onClick={() => onEditService(service)}
                    className="text-[#94A3B8] cursor-pointer hover:text-slate-600 transition-colors"
                    aria-label={`Edit ${service.name}`}
                  >
                    <Pen size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteService(service.id)}
                    className="text-[#94A3B8] cursor-pointer hover:text-red-500 transition-colors"
                    aria-label={`Delete ${service.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Vouchers */}
        <div className="bg-white rounded-xl border border-[#F973161A] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              {data.activeVouchers.title}
            </h2>
            <button
              type="button"
              onClick={() => setPage("create-voucher")}
              className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
              aria-label={data.activeVouchers.addButton}
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-4">
            {data.activeVouchers.items.map((v, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] p-4 rounded-xl flex items-center gap-4 border border-transparent hover:border-gray-100 transition-all"
              >
                <div className={`w-1.5 h-10 rounded-full ${v.color}`} />
                <div>
                  <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">
                    {v.label}
                  </div>
                  <div className="text-sm font-bold text-[#1E293B] tracking-widest">
                    {v.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage("create-voucher")}
            className="w-full mt-6 py-3.5 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-orange-100 transition-colors cursor-pointer"
          >
            {data.activeVouchers.batchManagement}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddServicePage = ({ setPage, initialService, onSave }) => {
  const { t } = useTranslation();
  const data = t("admin.settings.addService", { returnObjects: true });
  const fileInputRef = useRef(null);
  const [portfolioPreviews, setPortfolioPreviews] = useState([]);
  const [formValues, setFormValues] = useState(() => buildServiceDraft(initialService));

  useEffect(() => {
    setFormValues(buildServiceDraft(initialService));
  }, [initialService]);

  useEffect(() => {
    return () => {
      for (const preview of portfolioPreviews) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [portfolioPreviews]);

  const handlePickedFiles = (fileList) => {
    const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
    const files = Array.from(fileList || []);
    const accepted = files
      .filter((file) => file && file.type && file.type.startsWith("image/"))
      .filter((file) => file.size <= MAX_IMAGE_BYTES)
      .slice(0, 2)
      .map((file) => ({ url: URL.createObjectURL(file), name: file.name }));

    setPortfolioPreviews(accepted);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const preview1 = portfolioPreviews[0];
  const preview2 = portfolioPreviews[1];

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    const trimmedName = formValues.name.trim();
    const trimmedCategory = formValues.category.trim();

    if (!trimmedName || !trimmedCategory) {
      return;
    }

    onSave({
      ...formValues,
      name: trimmedName,
      category: trimmedCategory,
      description: formValues.description.trim(),
      price: formValues.price.trim(),
    });
    setPage("dashboard");
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPage('dashboard')}
          className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[#F48924]">
            {/* <ArrowLeft size={14} /> */}
            <CornerUpLeft size={14} />
          </span>
          <span>{data.breadcrumb.settings}</span>
        </button>
        <span className="text-sm  text-[#F48924] font-bold">
          <ChevronRight size={14} />
        </span>
        <span className="text-base  text-[#F48924] ">
          {data.breadcrumb.title}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-9 border-b border-[#F485251A] pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-2">
            {data.header.title}
          </h1>
          <p className="text-[#64748B] text-base mt-1 ">
            {data.header.description}
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-2 py-2.5 bg-[#F48525] text-white rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 transition-colors flex items-center gap-2 justify-center cursor-pointer"
          >
            <Rocket size={16} />
            {data.buttons.publish}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#F485251A]">
            <div className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Info className="text-[#F48525]" size={20} />{' '}
              {data.specification.title}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.specification.serviceName}
                </label>
                <input
                  className="placeholder-gray-400 w-full bg-[#F8F7F5] border-[#F485251A] rounded-lg p-4 text-sm focus:ring-2 ring-[#F485251A] outline-none"
                  placeholder={data.specification.serviceNamePlaceholder}
                  value={formValues.name}
                  onChange={handleChange("name")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.specification.displayName}
                </label>
                <input
                  className="placeholder-gray-400 w-full bg-[#F8F7F5] border-[#F485251A] rounded-lg p-4 text-sm focus:ring-2 ring-[#F485251A] outline-none"
                  placeholder={data.specification.displayNamePlaceholder}
                  value={formValues.category}
                  onChange={handleChange("category")}
                />
              </div>
            </div>
            <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
              {data.specification.description}
            </label>
            <textarea
              rows={5}
              className=" placeholder-gray-400 w-full bg-[#F8F7F5] border-[#F485251A] rounded-xl p-4 text-sm focus:ring-2 ring-[#F485251A] outline-none resize-none"
              placeholder={data.specification.descriptionPlaceholder}
              value={formValues.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#F485251A]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 font-bold text-lg text-slate-800 pb-1">
                  <ImageIcon className="text-orange-500" size={20} />
                  <h2>{data.portfolio.title}</h2>
                </div>
                <p className="text-base text-[#64748B]">
                  {data.portfolio.description}
                </p>
              </div>

              <span className="text-sm font-bold text-[orange-500] bg-[#FFEDD5] px-2 py-1 rounded">
                {data.portfolio.maxSize}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className="border-2 border-dashed border-[#F485251A] rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors"
                onClick={openFilePicker}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openFilePicker();
                  }
                }}
                onDragOver={e => {
                  e.preventDefault();
                }}
                onDrop={e => {
                  e.preventDefault();
                  handlePickedFiles(e.dataTransfer?.files);
                }}
                role="button"
                tabIndex={0}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => {
                    handlePickedFiles(e.target.files);
                    e.target.value = '';
                  }}
                />
                {preview1 ? (
                  <div className="w-full">
                    <img
                      src={preview1.url}
                      className="w-full h-35 object-cover rounded-lg"
                      alt={preview1.name || data.portfolio.imageAlt}
                    />
                    <p className="text-sm font-semibold text-[#64748B] text-center mt-3 break-all">
                      {preview1.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                      <ImageIcon size={18} className="text-orange-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 text-center uppercase leading-tight">
                      {data.portfolio.dropzoneText}
                    </p>
                    <p className="text-sm text-[#64748B] text-center uppercase leading-tight">
                      {data.portfolio.dropzoneFormat}
                    </p>
                  </>
                )}
              </div>
              <div className="bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517028267-bcc3eba7474c?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover opacity-80"
                  alt={data.portfolio.imageAlt}
                />
              </div>
              <div className="bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover opacity-80"
                  alt={data.portfolio.imageAlt}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#F485251A]">
            <div className="flex items-center gap-2 font-bold text-lg  text-slate-800 mb-6 text-base">
              <span className="text-orange-500">
                <WalletCards />
              </span>{' '}
              {data.pricing.title}
            </div>
            <label className="block text-base font-semibold text-[#64748B] uppercase mb-2">
              {data.pricing.basePrice}
            </label>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                €
              </span>
              <input
                className="placeholder-gray-400 w-full bg-[#F8F7F5] border-none rounded-xl p-4 pl-8 text-sm outline-none"
                placeholder={data.pricing.pricePlaceholder}
                value={formValues.price}
                onChange={handleChange("price")}
              />
            </div>
            <div className="bg-[#FFEDD54D] p-4 rounded-xl flex gap-3 items-center">
              <Info size={20} className="text-[#7C2D12] shrink-0" />
              <p className="text-base text-[#7C2D12] leading-relaxed font-medium">
                {data.pricing.info}
              </p>
            </div>
          </div>

          <div className="bg-[#0D1B2A] rounded-xl p-4 md:p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm font-semibold text-[#F48525] uppercase  mb-1">
                  {data.preview.label}
                </p>
                <h3 className="text-xl font-semibold">
                  {data.preview.serviceName}
                </h3>
              </div>
              <Eye size={50} className="opacity-20 " />
            </div>
            <p className="text-base text-[#94A3B8] mb-6  leading-relaxed">
              {data.preview.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">{formValues.price || data.preview.price}</div>
              {/* <button className="text-xs font-semibold uppercase tracking-widest bg-[#FFFFFF1A] px-4 py-2 rounded-sm hover:bg-white/20 transition-colors cursor-pointer">
                {data.preview.startingFrom}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateVoucherPage = ({ setPage }) => {
  const { t } = useTranslation();
  const data = t("admin.settings.createVoucher", { returnObjects: true });
  const [code, setCode] = useState(data.voucherData.codePlaceholder || "AMBER-FALL-24");
  const [pct, setPct] = useState("20");
  const [discountType, setDiscountType] = useState(data.voucherData.percentageOption || "");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState(
    (data.influencer.handlePlaceholder || "alex_builds").replace(/^@/, ""),
  );
  const [limit, setLimit] = useState(data.usageAndLimits.usageLimitValue || "02");
  const [expires, setExpires] = useState(data.usageAndLimits.expirationValue || "12/31/2026");

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pick = () => chars[Math.floor(Math.random() * chars.length)];
    const words = ["FALL", "SALE", "WIN", "DEAL", "SAVE", "PROMO"];
    const word = words[Math.floor(Math.random() * words.length)];
    setCode(
      `${pick()}${pick()}${pick()}-${word}-${new Date().getFullYear().toString().slice(-2)}`,
    );
  };

  const cardCode = (code || "AMBER-FALL-24").toUpperCase();
  const [firstCodePart = "AMBER", ...restCodeParts] = cardCode.split("-");
  const secondCodePart = restCodeParts.length ? restCodeParts.join("-") : "FALL-24";

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPage("dashboard")}
          className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[#F48924]">
            <CornerUpLeft size={14} />
          </span>
          <span>{data.breadcrumb.dashboard}</span>
        </button>
        <span className="text-sm md:text-base text-[#F48924] font-bold">
          <ChevronRight size={14} />
        </span>
        <span className="text-sm  text-[#F48924]  ">
          {data.breadcrumb.title}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-8 border-b border-[#F485251A] pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] uppercase tracking-tight">
            {data.header.title}
          </h1>
          <p className="text-[#64748B] text-sm md:text-base mt-1">
            {data.header.description}
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button className="w-full sm:w-auto px-5 py-2.5 bg-[#F48525] text-white rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 transition-colors flex items-center gap-2 justify-center cursor-pointer">
            <Rocket size={16} />
            {data.buttons.create}
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
                  onChange={(e) => setCode(e.target.value)}
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
                  className="placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  placeholder={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
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
                    onChange={(e) => setPct(e.target.value)}
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
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.usageAndLimits.expirationDate}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold outline-none"
                  placeholder={expires}
                  onChange={(e) => setExpires(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl border border-[#F485251A]">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-slate-900 text-lg ">
              <UserCheck className="text-[#F48525]" size={16} /> {data.influencer.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.influencer.name}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  placeholder={data.influencer.namePlaceholder}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748B] uppercase mb-2">
                  {data.influencer.handle}
                </label>
                <input
                  className=" placeholder-gray-400 w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm outline-none"
                  placeholder={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-xs md:text-sm font-semibold  uppercase  text-[#64748B] px-1">
            {data.preview.title}
          </div>

          <div className="relative overflow-hidden rounded-[18px] bg-[#07173B] shadow-[0_20px_35px_rgba(7,23,59,0.25)]">
            <div className="pointer-events-none absolute -right-10 -top-14 h-50 w-50 rounded-full border-22 border-[#7D503D]/35" />

            <div className="relative z-10 px-9 pb-6 pt-6">
              <div className="mb-3 flex items-start justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7F90AD]">
                  {data.preview.badge}
                </span>
                <span className="rounded-md bg-[#273651] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-[#F3F7FF]">
                  {data.preview.status}
                </span>
              </div>

              <p className="mb-4 text-2xl font-bold uppercase italic leading-none text-[#F48525]">
                {name ? name.toUpperCase() : "AMBER SCHREEUW"}
              </p>

              <div className="text-center">
                <p className="text-5xl font-bold leading-none text-[#ECF3FF]">{pct || "20"}%</p>
                <p className="mx-auto mt-3 max-w-72.5 font-bold uppercase leading-[1.35] tracking-[0.30em] text-[#94A3B8]">
                  {data.preview.discountDescription}
                </p>
              </div>

              <div className="mt-9 rounded-2xl border border-[#304469] bg-[#1A2745] px-6 py-4 text-center">
                <p className="mb-5 text-xs font-semibold uppercase text-[#60708F]">
                  {data.preview.codeLabel}
                </p>
                <p className="text-2xl font-bold uppercase leading-tight tracking-[0.12em] text-[#EEF3FF]">
                  {firstCodePart} - {secondCodePart}
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
                    PARTNER
                  </p>
                  <p className="text-lg font-semibold mt-1 leading-none text-[#F1F6FF]">
                    @{handle || "alex_builds"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7A8CA9]">
                  GELDIG TOT
                </p>
                <p className="text-lg font-semibold leading-none text-[#F1F6FF] mt-1">
                  {data.preview.validThru}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-xl border border-[#FED7AA] p-4">
            <h4 className="text-base font-bold flex items-center justify-center gap-2 text-[#F97316] uppercase mb-3">
              <TrendingUp size={16} />
              {data.projection.title}
            </h4>

            <div className="mb-3">
              <div className="flex justify-between items-center text-xs md:text-sm  font-semibold text-[#64748B] uppercase mb-1">
                <span>{data.projection.conversions}</span>
                <span>{data.projection.conversionsValue}</span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-[#F97316]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs md:text-sm  font-semibold text-[#64748B] uppercase mb-1">
                <span>{data.projection.budget}</span>
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
};

const LaunchGiveawayPage = ({ setPage }) => {
  const { t } = useTranslation();
  const data = t("admin.settings.launchGiveaway", { returnObjects: true });
  const mediaInputRef = useRef(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const auditItems = [
    { id: "completed", label: data.auditRequirements.requirement1, status: "completed" },
    { id: "warning", label: data.auditRequirements.requirement2, status: "warning" },
    { id: "pending", label: data.auditRequirements.requirement3, status: "pending" },
  ];

  useEffect(() => {
    return () => {
      if (mediaPreview?.url) {
        URL.revokeObjectURL(mediaPreview.url);
      }
    };
  }, [mediaPreview]);

  const handleMediaPick = (fileList) => {
    const [file] = Array.from(fileList || []);
    if (!file || !file.type || !file.type.startsWith("image/")) {
      return;
    }

    setMediaPreview((current) => {
      if (current?.url) {
        URL.revokeObjectURL(current.url);
      }

      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 border-b border-[#F485251A] pb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <button
              onClick={() => setPage("dashboard")}
              className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[#F48924]">
                <CornerUpLeft size={18} />
              </span>
              <span>{data.breadcrumb.dashboard}</span>
            </button>
            <span className="text-sm md:text-base text-[#F48924] font-bold">
              <ChevronRight size={16} />
            </span>
            <span className="text-sm md:text-base text-[#F48924] ">
              {data.breadcrumb.title}
            </span>
          </div>

          <span className="text-2xl md:text-4xl font-bold text-[#0F172A] ">
            {data.header.title}
          </span>
          <p className="text-[#64748B] text-base mt-3">{data.header.description}</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button className="w-full sm:w-auto px-5 py-2.5 bg-[#F48525] text-white rounded-xl text-base font-bold shadow-lg shadow-orange-500/20 transition-colors flex items-center gap-2 justify-center cursor-pointer">
            <Rocket size={16} />
            {data.buttons.publish}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border border-[#F485251A]">
            <h3 className="font-semibold flex text-xl items-center gap-2 mb-5 text-slate-900">
              <span className="flex items-center justify-center w-fit">
                <SquarePen size={22} className="text-[#F48525]" />
              </span>
              {data.campaignDetails.title}
            </h3>

            <div className="mb-5">
              <label className="block text-sm font-semibold uppercase text-[#64748B] mb-2">
                {data.campaignDetails.campaignTitle}
              </label>
              <input
                className="w-full bg-[#F8F7F5] border border-[#F485251A] placeholder-[#64748B66] rounded-lg p-3.5 text-sm outline-none focus:ring-2 focus:ring-[#F48525]"
                placeholder={data.campaignDetails.campaignTitlePlaceholder}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-[#64748B] mb-2">
                {data.campaignDetails.description}
              </label>
              <div className="border border-[#F485251A] rounded-lg overflow-hidden bg-[#F8FAFC]">
                <textarea
                  rows={6}
                  className="w-full p-4 bg-[#F8F7F5] text-sm resize-none placeholder-[#64748B66] outline-none"
                  placeholder={data.campaignDetails.descriptionPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F485251A]">
              <h3 className="font-semibold flex text-xl items-center gap-2 mb-5 text-slate-900">
                <span className="flex items-center justify-center w-fit">
                  <Ticket size={22} className="text-[#F48525]" />
                </span>
                {data.ticketSales.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase text-[#64748B] mb-2">
                    {data.ticketSales.price}
                  </label>
                  <input
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold placeholder-[#64748B66] outline-none focus:ring-2 focus:ring-[#F48525]"
                    placeholder={data.ticketSales.priceValue}
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase text-[#64748B] mb-2">
                    {data.ticketSales.totalTickets}
                  </label>
                  <input
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold placeholder-[#64748B66] outline-none focus:ring-2 focus:ring-[#F48525]"
                    placeholder={data.ticketSales.totalTicketsValue}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F485251A]">
              <h3 className="font-semibold flex text-xl items-center gap-2 mb-5 text-slate-900">
                <span className="flex items-center justify-center w-fit">
                  <CalendarClock size={22} className="text-[#F48525]" />
                </span>
                {data.timeline.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase text-[#64748B] mb-2">
                    {data.timeline.drawDate}
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-base outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase text-[#64748B] mb-2">
                    {data.timeline.drawTime}
                  </label>
                  <input
                    type="time"
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-base outline-none placeholder-[#64748B66]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F485251A]">
            <h3 className="text-base font-bold uppercase text-slate-800 mb-4">{data.media.title}</h3>

            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              className="w-full border border-dashed border-[#E2E8F0] rounded-lg p-4 md:p-6 bg-[#F8F7F5] flex flex-col items-center justify-center hover:bg-[#f5f3f0] transition-colors cursor-pointer"
            >
              <input
                ref={mediaInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleMediaPick(e.target.files);
                  e.target.value = "";
                }}
              />

              {mediaPreview ? (
                <div className="w-full flex flex-col items-center">
                  <img
                    src={mediaPreview.url}
                    alt={mediaPreview.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <span className="text-sm font-semibold text-slate-700 mt-3 break-all">
                    {mediaPreview.name}
                  </span>
                </div>
              ) : (
                <>
                  <ImagePlus size={22} className="text-[#64748B] mb-2" />
                  <span className="text-base font-semibold text-slate-700">{data.media.uploadText}</span>
                  <span className="text-sm text-[#64748B] mt-1">{data.media.uploadHint}</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#334155] border border-[#F485251A] p-4 rounded-lg text-white shadow-xl">
            <h3 className="text-sm font-bold uppercase text-[#E2E8F0] mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-[#FDBA74]" />
              {data.revenueProjection.title}
            </h3>

            <div className="flex justify-between items-start mb-4 border-b border-[#FFFFFF1A] pb-2">
              <div className="text-base uppercase font-semibold tracking-wider text-[#CBD5E1]">
                {data.revenueProjection.maxProfit}
              </div>
              <div className="text-3xl font-bold text-[#FED7AA]">
                {data.revenueProjection.maxProfitValue}
              </div>
            </div>

            <div className="mb-1 flex justify-between text-base text-[#CBD5E1]">
              <span>{data.revenueProjection.breakEven}</span>
              <span className="text-white">{data.revenueProjection.breakEvenTickets}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
              <div className="h-full bg-[#F48525]" style={{ width: "28%" }} />
            </div>

            <p className="text-base text-[#CBD5E1B2] mt-3 leading-relaxed">{data.revenueProjection.note}</p>
          </div>

          <div className="bg-[#DDDCDA4D] border border-[#F485251A] p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-bold uppercase tracking-[0.14em] text-[#1E293B] mb-5 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#1E293B]" />
              {data.auditRequirements.title}
            </h3>

            <div className="space-y-4">
              {auditItems.map((item) => {
                const statusIconProps = {
                  completed: { icon: CheckCircle2, color: "text-[#22C55E]" },
                  warning: { icon: AlertCircle, color: "text-[#F97316]" },
                  pending: { icon: Circle, color: "text-[#94A3B8]" },
                };
                const iconConfig = statusIconProps[item.status] || statusIconProps.pending;
                const IconComponent = iconConfig.icon;

                return (
                  <div key={item.id} className="flex items-start gap-3 text-[#64748B]">
                    <IconComponent size={16} className={`${iconConfig.color} mt-0.5 shrink-0`} />
                    <p className="text-sm md:text-base">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Controller ---

export default function Settings() {
  const { t } = useTranslation();
  const dashboardData = t("admin.settings.dashboard", { returnObjects: true });
  const [page, setPage] = useState("dashboard");
  const [services, setServices] = useState(() =>
    dashboardData.serviceTable.rows.map((service) => buildServiceDraft(service)),
  );
  const [editingService, setEditingService] = useState(null);

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  const handleEditService = (service) => {
    setEditingService(buildServiceDraft(service));
    handleSetPage("add-service");
  };

  const handleDeleteService = (serviceId) => {
    setServices((current) => current.filter((service) => service.id !== serviceId));
  };

  const handleCreateService = () => {
    setEditingService(null);
    handleSetPage("add-service");
  };

  const handleSaveService = (serviceDraft) => {
    setServices((current) => {
      if (serviceDraft.id) {
        return current.map((service) =>
          service.id === serviceDraft.id ? { ...service, ...serviceDraft } : service,
        );
      }

      const nextId = `SRV-${String(Date.now()).slice(-4)}`;
      return [...current, { ...serviceDraft, id: nextId }];
    });
    setEditingService(null);
  };

  return (
    <div className=" text-slate-900 font-sans selection:bg-orange-100 ">
      {/* Sidebar / Sidebar Navigation can be added here */}
      <main className="">
        {page === "dashboard" && (
          <Dashboard
            setPage={handleSetPage}
            services={services}
            onCreateService={handleCreateService}
            onEditService={handleEditService}
            onDeleteService={handleDeleteService}
          />
        )}
        {page === "add-service" && (
          <AddServicePage
            setPage={handleSetPage}
            initialService={editingService}
            onSave={handleSaveService}
          />
        )}
        {page === "create-voucher" && (
          <CreateVoucherPage setPage={handleSetPage} />
        )}
        {page === "launch-giveaway" && (
          <LaunchGiveawayPage setPage={handleSetPage} />
        )}
      </main>
    </div>
  );
}
