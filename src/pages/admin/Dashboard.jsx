import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CirclePlus,
  Clock3,
  Download,
  EllipsisVertical,
  ExternalLink,
  Ticket,
  TrendingUp,
  WalletCards,
} from 'lucide-react';

const ICON_MAP = {
  ChartNoAxesColumnIncreasing,
  WalletCards,
  CalendarDays,
  Ticket,
  CirclePlus,
  Download,
  TrendingUp,
};

const STATUS_TONE_CLASS = {
  warning: 'bg-[#FEF3C7] text-[#D97706]',
  info: 'bg-[#E6EEFF] text-[#3B82F6]',
  success: 'bg-[#DCFCE7] text-[#22C55E]',
};

const ACTION_VARIANT_CLASS = {
  primary:
    'bg-[#F48525] text-white border-[#F58626] ',
  secondary:
    'bg-[#F485251A] text-[#F48525] border-[#FBD7AF] hover:bg-[#FFEFD9] active:bg-[#FFE4BF]',
  ghost:
    'bg-white text-[#374151] border-[#E6EAF0] hover:bg-gray-50 active:bg-gray-100',
};

const STATUS_HOVER_CLASS = {
  warning: 'hover:bg-[#FEF3C7]',
  info: 'hover:bg-[#DBEAFE]',
  success: 'hover:bg-[#D1FAE5]',
};

const StatCard = ({ label, value, trend, icon, trendIcon }) => {
  const Icon = ICON_MAP[icon];
  const TrendIcon = ICON_MAP[trendIcon];

  return (
    <article className='rounded-sm border border-[#F485251A] bg-white px-4 py-4.5'>
      <div className='flex items-start justify-between gap-3'>
        <p className='text-base leading-4 md:font-medium text-[#64748B]'>{label}</p>
        <div className='flex h-8 w-8 items-center justify-center rounded-md bg-[#F485251A]'>
          {Icon ? <Icon size={22} className='text-[#F48525]' aria-hidden='true' /> : null}
        </div>
      </div>
      <p className='mt-3 text-3xl leading-none font-semibold md:font-bold tracking-[-0.02em] text-[#111827]'>
        {value}
      </p>
      <p className={`mt-2.5 text-sm font-semibold flex items-center gap-1 ${TrendIcon ? 'text-[#22C55E]' : 'text-[#94A3B8]'}`}>
        {TrendIcon ? <TrendIcon size={14} aria-hidden='true' /> : null}
        {trend}
      </p>
    </article>
  );
};

const ActionButton = ({ label, icon, variant, onClick }) => {
  const Icon = ICON_MAP[icon];

  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-3 text-base font-semibold cursor-pointer ${
        ACTION_VARIANT_CLASS[variant] || ACTION_VARIANT_CLASS.ghost
      }`}
    >
      <span className=''>{label}</span>
      {Icon ? <Icon size={15} aria-hidden='true' /> : null}
    </button>
  );
};

const CampaignPanel = ({ campaign, onAnalyticsClick }) => (
  <section className='rounded-sm border border-[#F485251A] bg-white overflow-hidden'>
    <div className='grid grid-cols-1 lg:grid-cols-[200px_2fr]'>
      <div className='h-48 sm:h-56 md:h-93  w-full relative overflow-hidden'>
        <img src="/Image.png" alt={campaign.image?.alt || ''} className='w-full h-full object-cover' />
      </div>

      <div className='px-4 py-4 sm:px-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h2 className=' text-xl md:text-2xl  font-bold text-[#111827]'>
              {campaign.title}
            </h2>
            <p className='mt-2 md:max-w-165 text-base text-[#6B7280]'>
              {campaign.description}
            </p>
          </div>
          <span className='rounded-full bg-[#F485251A] px-2.5 py-1 text-sm md:font-semibold tracking-[0.04em] text-[#F48525]'>
            {campaign.status}
          </span>
        </div>

        <div className='mt-10'>
          <div className='flex items-center justify-between text-base font-semibold text-[#374151]'>
            <span className=' text-[#0F172A]'>{campaign.soldLabel}</span>
            <span className='font-bold'>{campaign.soldPercent}</span>
          </div>
          <div className='mt-2 h-2 md:h-3 rounded-full bg-[#F3F4F6]'>
            <div
              className='h-2 md:h-3 rounded-full bg-[#F58626]'
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
          <p className='mt-2 text-right text-sm md:text-base text-[#64748B]'>
            {campaign.soldMeta}
          </p>
        </div>

        <div className='mt-6 md:mt-28 flex items-center justify-between border-t border-[#F485251A] pt-3.5'>
          <div className='flex items-center gap-2 text-sm md:text-base text-[#475569]'>
            <Clock3 size={20} className='text-[#F48525]' aria-hidden='true' />
            <span>{campaign.daysLeft}</span>
          </div>
          <button
            type='button'
            onClick={onAnalyticsClick}
            className='inline-flex items-center justify-end gap-2 text-sm md:text-base  text-[#F58626] hover:text-[#e97814] hover:underline transition-colors cursor-pointer'
          >
            <span>{campaign.analyticsCta}</span>
            <ArrowRight size={18} aria-hidden='true' className='flex-shrink-0' />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const StatusDropdown = ({
  options,
  rowId,
  onStatusChange,
  isOpen,
  onClose,
  buttonRect,
}) => {
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });

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

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);

      if (buttonRect) {
        const menuWidth = 144;
        const menuHeight = 132;
        const gap = 8;

        const centeredLeft =
          buttonRect.left + buttonRect.width / 2 - menuWidth / 1;
        const boundedLeft = Math.min(
          Math.max(gap, centeredLeft),
          window.innerWidth - menuWidth - gap
        );

        const openUpward = buttonRect.bottom + menuHeight + gap > window.innerHeight;
        const top = openUpward
          ? Math.max(gap, buttonRect.top - menuHeight - gap)
          : Math.min(window.innerHeight - menuHeight - gap, buttonRect.bottom + gap);

        setDropdownStyle({ top, left: boundedLeft });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose, buttonRect]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className='fixed w-36 rounded-lg border border-[#F485251A] bg-white shadow-2xl z-[9999] overflow-hidden'
    >
      {(options || []).map((option, index) => (
        <button
          key={option.value}
          type='button'
          onClick={() => {
            onStatusChange(rowId, option.value);
            onClose();
          }}
          className={`w-full px-2 py-2 text-center flex items-center justify-center gap-2 cursor-pointer ${
            STATUS_HOVER_CLASS[option.tone] || STATUS_HOVER_CLASS.info
          } ${
            index < options.length - 1 ? 'border-b border-[#E5E7EB]' : ''
          }`}
        >
          <span className={`text-base font-semibold ${option.textColor}`}>
            {option.value}
          </span>
        </button>
      ))}
    </div>
  );
};

const LeadsTable = ({ leadsTable, statusOptions }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(leadsTable.rows);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [buttonRect, setButtonRect] = useState(null);
  const tableRef = useRef(null);

  const handleStatusChange = (rowId, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, status: newStatus, statusTone: getStatusTone(newStatus) }
          : row
      )
    );
  };

  const getStatusTone = (status) => {
    const matchedOption = statusOptions.find((option) => option.value === status);
    if (matchedOption?.tone) return matchedOption.tone;
    return 'info';
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const handleMenuClick = (e, rowId) => {
    setOpenMenuId(openMenuId === rowId ? null : rowId);
    if (openMenuId !== rowId) {
      setButtonRect(e.currentTarget.getBoundingClientRect());
    }
  };

  return (
    <section className='rounded-sm border border-[#F485251A] bg-white ' ref={tableRef}>
      <div className='flex items-center justify-between px-4 py-4 border-b border-[#F485251A]'>
        <h2 className='text-lg md:text-2xl font-semibold  text-[#111827]'>
          {leadsTable.title}
        </h2>
        <button
          type='button'
          onClick={() => navigate('/admin/leads')}
          className='text-sm md:text-base font-semibold text-[#F58626] hover:text-[#e97814] hover:underline transition-colors cursor-pointer'
        >
          {leadsTable.viewAll}
        </button>
      </div>

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full min-w-[900px]'>
          <thead>
            <tr className='bg-[#fef9f4] border-b border-[#F485251A] '>
              {leadsTable.columns.map((column) => (
                <th
                  key={column}
                  className={`px-4 py-4 text-base font-medium text-[#64748B] whitespace-nowrap ${
                    column === leadsTable.columns[leadsTable.columns.length - 1]
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className='border-b border-[#F485250D] last:border-b-0 '>
                <td className='px-4 py-3.5'>
                  <div className='flex items-center gap-2 min-w-[150px]'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#FFEAD0] text-[10px] font-bold text-[#D97706] flex-shrink-0'>
                      {row.initials}
                    </div>
                    <span className='text-base font-semibold text-[#475569] truncate'>
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-3.5 text-base text-[#475569] min-w-[160px] truncate'>{row.service}</td>
                <td className='px-4 py-3.5 text-base text-[#475569] min-w-[140px] whitespace-nowrap'>{row.date}</td>
                <td className='px-4 py-3.5 min-w-[130px]'>
                  <span
                    className={`inline-flex rounded px-2.5 py-1 text-base  ${
                      STATUS_TONE_CLASS[row.statusTone] || STATUS_TONE_CLASS.info
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className='px-4 py-6 flex-shrink-0 relative flex justify-center items-center'>
                  <button
                    type='button'
                    className='text-[#94A3B8] hover:text-[#0F172A] transition-colors flex items-center justify-center cursor-pointer'
                    onClick={(e) => handleMenuClick(e, row.id)}
                  >
                    <EllipsisVertical size={18} aria-hidden='true' />
                  </button>
                  {openMenuId === row.id && (
                    <StatusDropdown
                      options={statusOptions}
                      rowId={row.id}
                      onStatusChange={handleStatusChange}
                      isOpen={true}
                      onClose={handleMenuClose}
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
      <div className='md:hidden space-y-3 p-4'>
        {rows.map((row) => (
          <div key={row.id} className='rounded-lg border border-[#F485251A] bg-[#FAFAFA] p-4 relative shadow-lg'>
            <div className='flex items-center justify-between gap-3 mb-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#FFEAD0] text-sm font-bold text-[#D97706]'>
                  {row.initials}
                </div>
                <div>
                  <p className='text-base font-semibold text-[#111827]'>{row.name}</p>
                  <p className='text-sm text-[#6B7280]'>{row.service}</p>
                </div>
              </div>
              <button
                type='button'
                className='text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer'
                onClick={(e) => handleMenuClick(e, row.id)}
              >
                <EllipsisVertical size={18} aria-hidden='true' />
              </button>
              {openMenuId === row.id && (
                <StatusDropdown
                  options={statusOptions}
                  rowId={row.id}
                  onStatusChange={handleStatusChange}
                  isOpen={true}
                  onClose={handleMenuClose}
                  buttonRect={buttonRect}
                />
              )}
            </div>

            <div className='space-y-2 border-t border-[#F485251A] pt-3'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-[#6B7280] text-sm'>{leadsTable.mobileLabels.date} : </span>
                <span className='font-semibold text-[#111827]'>{row.date}</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-[#6B7280]'>{leadsTable.mobileLabels.status} : </span>
                <span
                  className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${
                    STATUS_TONE_CLASS[row.statusTone] || STATUS_TONE_CLASS.info
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dashboardData = t('admin.dashboard', { returnObjects: true });
  const [leadsData, setLeadsData] = useState(dashboardData.leadsTable.rows);

  const handleAnalyticsClick = () => {
    navigate('/admin/giveaways');
  };

  const handleCreateGiveaway = () => {
    navigate('/admin/giveaways');
  };

  const handleCoupons = () => {
    navigate('/admin/coupons');
  };

  const handleExport = () => {
    const csvHeaders = dashboardData.export.csvHeaders;
    const csvRows = leadsData.map(row => [
      row.name,
      row.email,
      row.service,
      row.date,
      row.status
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${dashboardData.export.fileNamePrefix}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='space-y-5 text-[#1F2937] '>
      <header className='border-b border-[#F485251A] pb-3' >
        <h1 className='text-2xl md:text-4xl  font-black text-[#0F172A]'>
          {dashboardData.header.title}
        </h1>
        <p className='mt-1 text-base  text-[#64748B]  pt-2'>
          {dashboardData.header.subtitle}
        </p>
      </header>

      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6  pt-3'>
        {dashboardData.stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            trendIcon={stat.trendIcon}
          />
        ))}
      </section>

      <section className='grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_1fr] gap-6 items-start pt-3 pb-3'>
        <CampaignPanel campaign={dashboardData.campaign} onAnalyticsClick={handleAnalyticsClick} />

        <aside className='rounded-[10px] border border-[#F485251A] bg-white p-4 h-fit'>
          <h2 className='text-lg md:text-2xl leading-7 font-bold text-[#111827]'>
            {dashboardData.quickActions.title}
          </h2>
          <div className='mt-3.5 space-y-3'>
            {dashboardData.quickActions.items.map((item) => (
              <ActionButton
                key={item.id}
                label={item.label}
                icon={item.icon}
                variant={item.variant}
                onClick={() => {
                  if (item.id === 'create') {
                    handleCreateGiveaway();
                  } else if (item.id === 'voucher') {
                    handleCoupons();
                  } else if (item.id === 'export') {
                    handleExport();
                  }
                }}
              />
            ))}
          </div>

          <div className='mt-6  rounded-lg bg-[#F8F7F5] border border-[#F485251A] p-3.5'>
            <p className='text-sm  md:font-bold  text-[#94A3B8]'>
              {dashboardData.quickActions.tip.label}
            </p>
            <p className='mt-2 text-base  text-[#64748B]'>
              {dashboardData.quickActions.tip.text}
            </p>
          </div>
        </aside>
      </section>

      <LeadsTable
        leadsTable={dashboardData.leadsTable}
        statusOptions={dashboardData.statusOptions}
      />
    </div>
  );
};

export default Dashboard;
