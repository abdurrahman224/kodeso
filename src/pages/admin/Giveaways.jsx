import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CalendarClock,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Gauge,
  Mail,
  MessageCircle,
  MoreVertical,
  Plus,
  Rocket,
  Share2,
  Ticket,
  Trash2,
  Trophy,
  Upload,
  UserCircle2,
  Users,
  Wallet,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Forward,
  CornerUpLeft,
  Edit3,
  Award,
  ChevronRight,
  ArrowLeft,
  SquarePen,
  ImagePlus,
  Calculator,
  RefreshCw,
} from "lucide-react";
import { ROUTES } from "../../config";

const ICON_MAP = {
  Wallet,
  Ticket,
  Clock3,
  TrendingUp,
};

const TREND_TONE_CLASS = {
  positive: "text-[#08A045]",
  alert: "text-[#E11D48]",
};

const StatCard = ({ item }) => {
  const Icon = ICON_MAP[item.icon] || Gauge;
  const TrendIcon = ICON_MAP[item.trendIcon];

  return (
    <article className="rounded-xl border border-[#F485251A] bg-white px-4 py-4.5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-medium text-[#64748B]">{item.label}</p>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF1E3] text-[#F48924]">
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>

      <p className="mt-3 text-3xl leading-none font-bold tracking-[-0.02em] text-[#0F172A]">
        {item.value}
        {item.suffix ? (
          <span className="ml-1   text-[24px] font-semibold text-[#94A3B8]">
            {item.suffix}
          </span>
        ) : null}
      </p>

      <p
        className={`mt-3 text-[14px] font-semibold flex items-center gap-1 ${
          TREND_TONE_CLASS[item.trendTone] || "text-[#08A045]"
        }`}
      >
        {TrendIcon ? <TrendIcon size={14} aria-hidden="true" /> : null}
        {item.trend}
      </p>
    </article>
  );
};

const CreateGiveawayPage = ({ onBack }) => {
  const { t } = useTranslation();
  const data = t("admin.createGiveaway", { returnObjects: true });
  const giveawaysHeader = t("admin.giveaways.header", { returnObjects: true });
  const [previewImage, setPreviewImage] = useState("");
  const [previewImageName, setPreviewImageName] = useState("");
  const previewInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handlePreviewUploadClick = () => {
    previewInputRef.current?.click();
  };

  const handlePreviewImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage((prevImage) => {
      if (prevImage?.startsWith("blob:")) {
        URL.revokeObjectURL(prevImage);
      }
      return imageUrl;
    });
    setPreviewImageName(file.name);
  };

  return (
    <div className=" mt-">
   
    

      {/* Header Section - Breadcrumb Style */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 border-b border-[#F485251A] pb-4">
        <div className="flex-1">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <button
              onClick={onBack}
              className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[#F48924]">
                <CornerUpLeft size={18} />
              </span>
              <span>Giveaway Management</span>
            </button>
            <span className="text-sm md:text-base text-[#F48924] font-bold">
              <ChevronRight size={16} />
            </span>
            <span className="text-sm  md:text-base text-[#F48924] ">
              {data.header.title}
            </span>
          </div>

          {/* Subtitle */}
          <span className="text-2xl md:text-4xl font-bold text-[#0F172A] ">
            {data.header.title}
          </span>
          <p className="text-[#64748B] text-base  mt-3">
            {data.header.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button className="w-full sm:w-auto px-5 py-2.5 bg-[#F48525] text-white rounded-xl text-base font-bold shadow-lg shadow-orange-500/20  transition-colors flex items-center gap-2 justify-center cursor-pointer">
            <Rocket size={16} />
            {data.header.publishButton}
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
              <label className="block text-sm   font-semibold uppercase  text-[#64748B] mb-2">
                {data.campaignDetails.titleLabel}
              </label>
              <input
                className="w-full bg-[#F8F7F5] border border-[#F485251A] placeholder-[#64748B66] rounded-lg p-3.5 text-sm outline-none focus:ring-2 focus:ring-[#F48525]"
                placeholder={data.campaignDetails.titlePlaceholder}
              />
            </div>

            <div>
              <label className="block text-sm  font-semibold uppercase  text-[#64748B] mb-2">
                {data.campaignDetails.descriptionLabel}
              </label>
              <div className="border border-[#F485251A] rounded-lg  overflow-hidden bg-[#F8FAFC]">
                <textarea
                  rows={6}
                  className="w-full p-4 bg-[#F8F7F5] text-sm  resize-none placeholder-[#64748B66] outline-none "
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
                  <label className="block text-xs md:text-sm font-semibold uppercase  text-[#64748B] mb-2">
                    {data.ticketSales.priceLabel}
                  </label>
                  <input
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-sm font-semibold placeholder-[#64748B66] outline-none focus:ring-2 focus:ring-[#F48525]"
                    placeholder={data.ticketSales.priceValue}
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase  text-[#64748B] mb-2">
                    {data.ticketSales.totalTicketsLabel}
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
                {data.timeline.title}{" "}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase  text-[#64748B] mb-2">
                    {data.timeline.drawDateLabel}
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#F8F7F5] border border-[#F485251A] rounded-xl p-3.5 text-base outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold uppercase  text-[#64748B] mb-2">
                    {data.timeline.drawTimeLabel}
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
            <h3 className="text-base font-bold uppercase  text-slate-800 mb-4">
              {data.preview.title}
            </h3>

            <button
              type="button"
              onClick={handlePreviewUploadClick}
              className="w-full border border-dashed border-[#E2E8F0] rounded-lg p-4 md:p-6 bg-[#F8F7F5] flex flex-col items-center justify-center hover:bg-[#f5f3f0] transition-colors cursor-pointer"
            >
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Giveaway preview"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                  <span className="mt-3 text-sm font-semibold text-[#334155] break-all">
                    {previewImageName}
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus size={22} className="text-[#64748B] mb-2" />
                  <span className="text-base font-semibold text-slate-700">
                    {data.preview.uploadLabel}
                  </span>
                  <span className="text-sm text-[#64748B] mt-1">
                    {data.preview.uploadHint}
                  </span>
                </>
              )}
            </button>
            <input
              ref={previewInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePreviewImageChange}
            />
          </div>

          <div className="bg-[#334155] border border-[#F485251A] p-4 rounded-lg text-white shadow-xl">
            <h3 className="text-sm font-bold uppercase  text-[#E2E8F0] mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-[#FDBA74]" />
              {data.preview.forecast.title}
            </h3>

            <div className="flex justify-between items-start mb-4 border-b border-[#FFFFFF1A] pb-2">
              <div className="text-base uppercase font-semibold tracking-wider text-[#CBD5E1]">
                {data.preview.forecast.maxBruttowinst}
              </div>
              <div className="text-3xl font-bold text-[#FED7AA]">
                {data.preview.forecast.maxValue}
              </div>
            </div>

            <div className="mb-1 flex justify-between text-base text-[#CBD5E1]">
              <span>{data.preview.forecast.breakEvenLabel}</span>
              <span className="text-white">
                {data.preview.forecast.breakEvenValue}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
              <div
                style={{ width: `${data.preview.forecast.progress}%` }}
                className="h-full bg-[#F48525]"
              />
            </div>

            <p className="text-base text-[#CBD5E1B2] mt-3 leading-relaxed">
              {data.preview.forecast.note}
            </p>
          </div>

          <div className="bg-[#DDDCDA4D] border border-[#F485251A] p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-bold uppercase tracking-[0.14em] text-[#1E293B] mb-5 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#1E293B]" />
              {data.preview.audit.title}
            </h3>

            <div className="space-y-4">
              {data.preview.audit.items.map((item) => {
                const statusIconProps = {
                  completed: { icon: CheckCircle2, color: "text-[#22C55E]" },
                  warning: { icon: AlertCircle, color: "text-[#F97316]" },
                  pending: { icon: Circle, color: "text-[#94A3B8]" },
                };
                const iconConfig =
                  statusIconProps[item.status] || statusIconProps.pending;
                const IconComponent = iconConfig.icon;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-start  gap-3 text-[#64748B]"
                  >
                    <IconComponent
                      size={16}
                      className={`${iconConfig.color} mt-0.5 shrink-0`}
                    />
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

const Circle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const ActionDropdown = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const triggerRef = useRef(null);

  const updateMenuPosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 140;
    const menuHeight = 46;
    const spacing = 6;
    const canOpenDownward = window.innerHeight - rect.bottom >= menuHeight + spacing;

    const top = canOpenDownward
      ? rect.bottom + spacing
      : Math.max(spacing, rect.top - menuHeight - spacing);
    const left = Math.min(
      Math.max(spacing, rect.right - menuWidth),
      window.innerWidth - menuWidth - spacing
    );

    setOpenUpward(!canOpenDownward);
    setMenuPosition({ top, left });
  };

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const handleViewportChange = () => updateMenuPosition();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open]);

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
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center text-[#999] hover:text-[#0F172A] transition-colors cursor-pointer p-1"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className={`fixed z-50 rounded-lg border border-[#E2E8F0] bg-white shadow-lg overflow-hidden min-w-[140px] ${
            openUpward ? "origin-bottom-right" : "origin-top-right"
          }`}
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
        >
          <button
            type="button"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

const LaunchGiveawayPage = ({ onBack }) => {
  const { t } = useTranslation();
  const data = t("admin.launchGiveaway", { returnObjects: true });
  const [drawingState, setDrawingState] = useState("idle"); // idle, drawing, completed
  const [rollingNumber, setRollingNumber] = useState(".........");
  const [ticketNumber, setTicketNumber] = useState("#0582");
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyRows, setHistoryRows] = useState(data?.history?.rows || []);
  const winnerData = selectedWinner || data.winner;
  const primaryAction = winnerData.buttons?.[0];
  const secondaryAction = winnerData.buttons?.[1];

  // Filter recent entries based on search query
  const filteredEntries =
    data?.recentEntries?.rows?.filter((row) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        row.number?.toLowerCase().includes(query) ||
        row.name?.toLowerCase().includes(query) ||
        row.date?.toLowerCase().includes(query) ||
        row.entries?.toLowerCase().includes(query) ||
        row.status?.toLowerCase().includes(query)
      );
    }) || [];

  const handleDrawWinner = () => {
    if (drawingState !== "idle") return;

    setDrawingState("drawing");

    // Rolling animation - 3 seconds with random numbers 1-9
    const duration = 3000; // 3 seconds
    const intervalTime = 100; // Update every 100ms
    const iterations = duration / intervalTime;
    let counter = 0;

    const interval = setInterval(() => {
      // Generate random number with digits 1-9
      let randomNum = "";
      for (let i = 0; i < 9; i++) {
        randomNum += Math.floor(Math.random() * 9) + 1; // Random 1-9
      }
      setRollingNumber(randomNum);
      counter++;

      if (counter >= iterations) {
        clearInterval(interval);
        // Show winner after animation - end with zeros
        setRollingNumber("000000000");

        // Generate random ticket number
        const randomTicket = Math.floor(Math.random() * 9000) + 1000; // Random 1000-9999
        setTicketNumber(`#${randomTicket}`);

        setDrawingState("completed");
        setSelectedWinner(data.winner);
      }
    }, intervalTime);
  };

  const handleDrawAgain = () => {
    setDrawingState("idle");
    setSelectedWinner(null);
    setRollingNumber(".........");
    setTicketNumber("#0582");
  };

  const handleDeleteHistory = (id) => {
    setHistoryRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <section className="w-full">
 

      {/* Header Section - Breadcrumb Style */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 pb-4  mb-3">
        <div className="flex-1">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-2 ">
            <button
              onClick={onBack}
              className="text-sm md:text-base text-[#64748B] hover:text-[#F48924] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[#F48924]">
                <CornerUpLeft size={14} />
              </span>
              <span>{data?.header?.backButton}</span>
            </button>
            <span className="text-sm md:text-base text-[#F48924] font-bold">
              <ChevronRight size={14} />
            </span>
            <span className="text-sm text-[#F48924] ">
              {data?.header?.title}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl md:text-4xl  font-black text-[#0F172A] mb-2  leading-tight">
            {data?.header?.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#64748B] font-medium">
            {data?.header?.subtitle}
          </p>
        </div>

        {/* Stats Boxes */}
        <div className="flex gap-3 md:gap-4 flex-shrink-0">
          {data?.stats?.map((stat) => (
            <div
              key={stat.id}
              className="bg-white border border-[#F485251A] rounded-lg px-4 md:px-5 py-3 md:py-4  min-w-fit"
            >
              <p className="text-xs  font-bold text-[#F48924] uppercase ">
                {stat.label}
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-bold text-[#0F172A] mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-6 md:gap-8">
        {/* Top: Randomizer and Winner Card */}

        <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-6">
          {/* Left: Randomizer Engine */}
          <div className="flex-1 min-w-[280px] bg-[#0B0F1A] rounded-lg sm:rounded-xl border border-gray-800 p-4 md::p-8  flex flex-col items-center justify-center relative">
            {/* Title */}
            <h3 className="text-[#F48924] text-xs sm:text-sm md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-8">
              {data?.randomizer?.title || "RANDOMIZER ENGINE ACTIVE"}
            </h3>

            {/* Input/Rolling Area */}
            <div className="w-full max-w-md flex flex-col items-center">
              {drawingState === "idle" ? (
                <>
                  <div className="w-full border-t border-b border-[#F485254D] py-4 sm:py-6 mb-6 sm:mb-8 flex justify-center">
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      {rollingNumber}
                    </p>
                  </div>
                </>
              ) : drawingState === "drawing" ? (
                <div className="w-full border-t border-b border-[#F485254D] py-4  mb-6 sm:mb-8">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.3em] text-center">
                    {rollingNumber}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                    {data.randomizer.drawingText}
                  </p>
                  <div className="w-full border-t border-b border-[#F485254D] py-4 sm:py-6 mb-6 sm:mb-8 text-center">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.3em]">
                      {rollingNumber}
                    </p>
                  </div>
                </>
              )}

              {/* Main Draw Button */}
              <button
                onClick={handleDrawWinner}
                className="bg-[#F48924] hover:bg-[#e07b1f] text-white font-bold py-2 sm:py-3 px-3 sm:px-5 rounded-full text-base shadow-[0_0_20px_rgba(244,137,36,0.3)] transition-all uppercase  mb-3 sm:mb-4 cursor-pointer"
              >
                {drawingState === "completed"
                  ? data.randomizer.completedText
                  : data.randomizer.winnaarTrekken}
              </button>

              {/* Manual Link */}
              <button className="text-[#F48924] text-xs sm:text-base font-medium  mb-6 sm:mb-8 cursor-pointer">
                {drawingState === "idle"
                  ? data.randomizer.drawingText
                  : data.randomizer.completedText}
              </button>

              {/* Bottom Disclaimer */}
              <p className="text-[#475569] text-sm  text-center px-2">
                {data.randomizer.disclaimer}
              </p>
            </div>
          </div>

          {/* Right: Winner Announcement Card */}
          <div className="w-full md:w-[320px] lg:w-[340px] flex flex-col gap-3 sm:gap-4">
            <div className="border-[3px] border-[#f48924] rounded-xl sm:rounded-2xl shadow-xl h-full">
              <div className="bg-white rounded-lg sm:rounded-[14px] overflow-hidden flex flex-col h-full">
                {/* Orange Header */}
                <div className="bg-[#F48924] py-2 sm:py-3 text-center">
                  <span className="text-white text-sm  md:text-base font-bold uppercase tracking-widest">
                    {winnerData.title}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center flex-1">
                  {/* Trophy Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFF7ED] rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#F48924]" />
                  </div>

                  {/* Winner Details */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-1">
                    {winnerData.name}
                  </h2>
                  <div className="flex items-center gap-2 text-[#F48924] font-bold text-sm mb-4 sm:mb-6">
                    <div className="w-4 h-3  rounded-sm flex items-center justify-center">
                      <Ticket />
                    </div>
                    {winnerData.ticketLabel} {ticketNumber}
                  </div>

                  {/* Handle Badge */}
                  <div className="bg-[#F1F5F9] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8">
                    <span className="text-[#64748B] font-semibold text-sm">
                      {winnerData.handle}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mt-auto">
                    <button className="bg-[#F48924] text-white rounded-lg py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 sm:font-bold text-sm hover:bg-[#e07b1f] transition-colors cursor-pointer">
                      <Mail size={14} className="sm:w-4 sm:h-4" />{" "}
                      <span className="hidden sm:inline">{primaryAction?.label}</span>
                      <span className="sm:hidden">{primaryAction?.shortLabel || primaryAction?.label}</span>
                    </button>
                    <button className="bg-[#1E293B] text-white rounded-lg py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 sm:font-bold text-sm hover:bg-[#0F172A] transition-colors cursor-pointer">
                      <Share2 size={14} className="sm:w-4 sm:h-4" />{" "}
                      <span className="hidden sm:inline">{secondaryAction?.label}</span>
                      <span className="sm:hidden">{secondaryAction?.shortLabel || secondaryAction?.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Bottom Button */}
            <button
              onClick={handleDrawAgain}
              className="w-full bg-[#F8FAFC] border border-gray-200 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <RefreshCw size={14} className="sm:w-4 sm:h-4" />{" "}
              <span className="hidden sm:inline">{winnerData.noteBelow}</span>
              <span className="sm:hidden">{winnerData.noteBelowShort}</span>
            </button>
          </div>
        </div>

        {/* Middle: Full Width Recent Entries Table */}
        <div className="bg-[#ffffff] rounded-2xl border border-[#F485251A] overflow-hidden">
          <div className="px-4 md:px-6 py-5 border-b border-[#F485250D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg md:text-xl font-black text-[#0F172A]">
              {data?.recentEntries?.title}
            </h3>
            <input
              type="text"
              placeholder={data?.recentEntries?.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs md:text-sm bg-[#F8F7F5]  rounded-lg px-4 py-2.5 w-full sm:w-56 focus:outline-none focus:border-[#F48924] focus:ring-1 focus:ring-[#F48924]/20"
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F485250D] border-b border-[#F485250D]">
                  {data?.recentEntries?.columns?.map((col, index) => (
                    <th
                      key={col}
                      className={`${index === 3 ? "text-center" : "text-left"} font-semibold text-[#64748B] uppercase px-5 md:px-8 py-4 md:py-5 text-[10px] md:text-sm `}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F485250D]">
                {filteredEntries?.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-white/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-4  font-bold text-[#0F172A] text-sm md:text-base">
                      {row.number}
                    </td>
                    <td className="px-5 md:px-6 py-4  text-[#475569] text-sm md:text-base">
                      {row.name}
                    </td>
                    <td className="px-5 md:px-6 py-4  text-[#64748B] whitespace-nowrap text-sm md:text-base">
                      {row.date}
                    </td>
                    <td className="px-5 md:px-6 py-4  text-[#0F172A] font-black text-sm md:text-base text-center">
                      {row.entries}
                    </td>
                    <td className="px-5 md:px-6 py-4 ">
                      <span
                        className={`text-[10px] md:text-sm font-bold px-3 md:px-4 py-1.5 rounded-lg  inline-block ${
                          row.statusTone === "verified"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : row.statusTone === "won"
                              ? "bg-[#FEE2E2] text-[#DC2626]"
                              : "bg-[#FEF08A] text-[#92400e]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 p-4">
            {filteredEntries?.map((row) => (
              <div
                key={row.id}
                className="bg-white rounded-lg border border-[#F485250D] shadow-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className=" flex flex-row gap-2 ">
                    <p className="text-sm  text-[#64748B] uppercase  mb-1">{data.recentEntries.mobileLabels.id}</p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {row.number}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1.5 rounded-full uppercase ${
                      row.statusTone === "verified"
                        ? "bg-[#D1FAE5] text-[#047857]"
                        : row.statusTone === "won"
                          ? "bg-[#FEE2E2] text-[#DC2626]"
                          : "bg-[#FEF08A] text-[#92400e]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="border-t border-[#F485250D] pt-3 space-y-2">
                  <div className=" flex flex-row gap-2">
                    <p className="text-sm  text-[#64748B] uppercase  mb-1">{data.recentEntries.mobileLabels.name} :</p>
                    <p className="text-sm font-semibold text-[#475569]">
                      {"  "}
                      {row.name}
                    </p>
                  </div>
                  <div className=" flex flex-row gap-2">
                    <p className="text-sm  text-[#64748B] uppercase  mb-1">{data.recentEntries.mobileLabels.date} :</p>
                    <p className="text-sm text-[#64748B] font-semibold">
                      {row.date}
                    </p>
                  </div>
                  <div className=" flex flex-row gap-2">
                    <p className="text-sm  text-[#64748B] uppercase  mb-1">{data.recentEntries.mobileLabels.entries} :</p>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {row.entries}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Full Width History Table */}
        <div className="bg-white rounded-lg border border-[#F485250D] overflow-hidden">
          <div className="px-5 md:px-6 py-4  border-b  border-[#F485250D]">
            <h3 className="text-lg md:text-xl font-black text-[#0F172A]">
              {data?.history?.title}
            </h3>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#fef9f4] border-b border-[#F485251A] ">
                  {data?.history?.columns?.map((col, index) => (
                    <th
                      key={col}
                      className={`${index === data.history.columns.length - 1 ? "text-center" : "text-left"} font-semibold text-[#64748B] uppercase px-5 md:px-8 py-4 md:py-5 text-sm `}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y border-[#F485251A] bg-white">
                {historyRows?.map((row) => (
                  <tr
                    key={row.id}
                    className=" transition-colors border border-[#F485251A]"
                  >
                    <td className="px-5 md:px-6 py-4  font-bold text-[#0F172A] text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#E8D5C4] flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-[#8B6F47]">
                            {row.name.charAt(0)}
                          </span>
                        </div>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4 ">
                      <span
                        className={`text-sm font-bold px-2.5 py-1 rounded inline-block ${
                          row.status === "VICTORIE"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "bg-[#FEF08A] text-[#92400e]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 md:px-6 py-4  text-[#0F172A] text-sm">
                      <div className="flex items-center gap-2">
                        <Trophy
                          size={14}
                          className="text-[#F48924] flex-shrink-0"
                        />
                        <span className="font-bold">{row.winner}</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4  font-bold text-[#0F172A] text-sm">
                      {row.winnings}
                    </td>
                    <td className="px-5 md:px-6 py-4  text-center align-middle">
                      <ActionDropdown
                        onDelete={() => handleDeleteHistory(row.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 p-4">
            {historyRows?.map((row) => (
              <div
                key={row.id}
                className="bg-white rounded-lg border border-[#F485250D] p-4 space-y-3 shadow-lg"
              >
                {/* Header with Avatar and Name */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-[#E8D5C4] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[#8B6F47]">
                        {row.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">
                        {row.name}
                      </p>
                      <p className="text-xs text-[#94A3B8]">{row.winner}</p>
                    </div>
                  </div>
                  <ActionDropdown
                    onDelete={() => handleDeleteHistory(row.id)}
                  />
                </div>

                {/* Service Type / Status Label */}
                <div className="pt-2 flex flex-row justify-between items-center gap-2">
                  <p className="text-sm font-bold text-[#64748B] uppercase tracking-wide mb-1.5">{data.history.mobileLabels.status}</p>
                  <span
                    className={`text-xs font-bold px-2.5 py-1.5 rounded inline-block ${
                      row.status === "VICTORIE"
                        ? "bg-[#D1FAE5] text-[#047857]"
                        : "bg-[#FEF08A] text-[#92400e]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>

                {/* Details Section */}
                <div className="border-t border-[#F485250D] pt-3 space-y-2.5">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">{data.history.mobileLabels.winnings}</p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {row.winnings}
                    </p>
                  </div>
                  <div>
                    <div className=" flex flex-row justify-between items-center gap-2">
                      <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">{data.history.mobileLabels.winner}</p>

                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-[#F48924]" />
                        <p className="text-sm font-bold text-[#0F172A]">
                          {row.winner}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Link */}
                <div className="border-t border-[#F485250D] pt-3">
                  <button className="text-[#F48924] text-sm font-bold hover:underline cursor-pointer text-center">
                    {data.history.mobileLabels.detailsButton} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style> */}
    </section>
  );
};

const Giveaways = ({ onNavigate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("main");
  const data = t("admin.giveaways", { returnObjects: true });

  const handleSetPage = (newPage) => {
    setCurrentPage(newPage);
  };

  if (currentPage === "create") {
    return <CreateGiveawayPage onBack={() => handleSetPage("main")} />;
  }

  if (currentPage === "launch") {
    return <LaunchGiveawayPage onBack={() => handleSetPage("main")} />;
  }
  //Beheer van weggeefacties
  return (
    <section className="h-screen ">
     

      <div className=" flex flex-wrap items-start justify-between gap-4 border-b border-[#F485251A] pb-3">
        <div>
          <h1 className="text-2xl md:text-4xl  font-black text-[#0F172A]">
            {data.header.title}
          </h1>
          <p className="mt-1 text-base  text-[#708399]">
            {data.header.subtitle}
          </p>
        </div>

        <button
          onClick={() => handleSetPage("create")}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-[#EF8226] bg-[#F48924] px-4 text-[16px] font-semibold text-white hover:bg-[#ea6c0a] transition-colors cursor-pointer"
        >
          <Plus size={20} aria-hidden="true" />
          <span className="text-white">{data.header.createButton}</span>
        </button>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {data.stats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-[#F485251A] bg-white ">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#F485251A] px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="relative h-12 sm:h-16 w-12 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[#D8E0EA] bg-[#F6F9FC]">
              <img
                src="/Waarde.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-xs sm:text-[10px] font-bold text-[#047857] flex-shrink-0">
                  {data.campaign.badge}
                </span>
                <h2 className="text-lg md:text-xl leading-tight sm:leading-[1.05] font-semibold md:font-bold text-[#0F172A] break-words">
                  {data.campaign.title}
                </h2>
              </div>
              <p className="mt-1 text-base  text-[#64748B]">
                <span className="font-semibold">
                  {data.campaign.valuePrefix}
                </span>{" "}
                {data.campaign.value}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSetPage("launch")}
            type="button"
            aria-label={data.aria.pickWinner}
            className="w-full sm:w-auto inline-flex h-10 sm:h-12 items-center justify-center sm:justify-start gap-2 rounded-lg border border-[#EF8226] bg-[#F48525] px-4 sm:px-5 text-base font-semibold text-white hover:bg-[#ea6c0a] transition-colors flex-shrink-0 cursor-pointer"
          >
            <Trophy size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
            <span>{data.campaign.winnerCta}</span>
          </button>
        </div>

        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <span className="text-lg  font-semibold text-[#1E293B]">
              {data.campaign.progressTitle}
            </span>
            <span className="text-base sm:text-lg md:text-[18px] text-[#F48924] font-bold">
              {data.campaign.progressPercentLabel}
            </span>
          </div>

          <div className="mt-2 h-3  rounded-full bg-[#E8EEF5]">
            <div
              className="h-3  rounded-full bg-[#F48924]"
              style={{ width: `${data.campaign.progress}%` }}
            />
          </div>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-base text-[#94A3B8]">
            <span>{data.campaign.started}</span>
            <span>{data.campaign.soldMeta}</span>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 lg:gap-5 xl:grid-cols-[1fr_1fr]">
            <div className="rounded-lg sm:rounded-xl">
              <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-[#0F172A]">
                <Users
                  size={18}
                  className="sm:w-5 sm:h-5"
                  className="text-[#F48924]"
                  aria-hidden="true"
                />
                <span>{data.recentBuyers.title}</span>
              </h3>

              <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-5">
                {data.recentBuyers.buyers.map((buyer) => (
                  <div
                    key={buyer.id}
                    className="flex items-center justify-between rounded-lg border border-[#F485251A] bg-[#F8FAFC] px-2 sm:px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                      <div className="flex h-9 sm:h-12 w-9 sm:w-12 items-center justify-center rounded-full text-sm sm:text-[11px] font-semibold md:font-bold text-[#9A3412] bg-[#F4852533] flex-shrink-0">
                        {buyer.avatar.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-semibold md:font-bold md:leading-5 text-[#0F172A] truncate">
                          {buyer.name}
                        </p>
                        <p className="text-sm font-semibold text-[#F48924] truncate">
                          {buyer.handle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm font-semibold text-[#94A3B8]">
                        {buyer.ticketsLabel}
                      </p>
                      <p className="text-lg sm:text-xl font-bold leading-5 text-[#1E293B]">
                        {buyer.ticketRange}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_ORDERS)}
                className="mt-3 sm:mt-4 inline-flex h-10 sm:h-12.5 w-full items-center justify-center rounded-lg border border-dotted border-[#F8D9BC] text-base font-semibold text-[#F48924] cursor-pointer"
              >
                {data.recentBuyers.viewAll}
              </button>
            </div>

            <div className="rounded-lg sm:rounded-xl border border-[#F485251A] bg-[#F485250D] p-3 sm:p-4">
              <h3 className="text-xl md:text-2xl font-semibold md:font-bold leading-8 text-[#0F172A]">
                {data.quickStats.title}
              </h3>

              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 border-b border-[#F485251A] pb-3 sm:pb-4">
                {data.quickStats.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 sm:gap-3"
                  >
                    <p className="text-base text-[#475569]">
                      {item.label}
                    </p>
                    <p
                      className={`text-base sm:text-lg md:text-xl font-bold ${
                        item.tone === "accent"
                          ? "text-[#F48924]"
                          : "text-[#0F172A]"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-12 text-base  text-[#8191A6]">
                {data.quickStats.note}
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Giveaways;
