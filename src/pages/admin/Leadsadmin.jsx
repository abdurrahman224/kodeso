import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  EllipsisVertical,
  Eye,
  Trash2,
} from "lucide-react";
import { Pagination, usePagination } from "../../components/Pagination";

const STATUS_STYLES = {
  processing: {
    pill: "bg-[#FFF2DC] text-[#D97706]",
    dot: "bg-[#F59E0B]",
    bgColor: "bg-[#FFF2DC]",
    textColor: "text-[#D97706]",
  },
  active: {
    pill: "bg-[#E7F0FF] text-[#3B82F6]",
    dot: "bg-[#60A5FA]",
    bgColor: "bg-[#E7F0FF]",
    textColor: "text-[#3B82F6]",
  },
  contacted: {
    pill: "bg-[#F1E8FF] text-[#8B5CF6]",
    dot: "bg-[#A78BFA]",
    bgColor: "bg-[#F1E8FF]",
    textColor: "text-[#8B5CF6]",
  },
  quoted: {
    pill: "bg-[#E8EDFF] text-[#4F46E5]",
    dot: "bg-[#818CF8]",
    bgColor: "bg-[#E8EDFF]",
    textColor: "text-[#4F46E5]",
  },
  closed: {
    pill: "bg-[#EEF2F7] text-[#64748B]",
    dot: "bg-[#94A3B8]",
    bgColor: "bg-[#EEF2F7]",
    textColor: "text-[#64748B]",
  },
};

const STATUS_HOVER_CLASS = {
  processing: "hover:bg-[#FEF3C7]",
  active: "hover:bg-[#DBEAFE]",
  contacted: "hover:bg-[#F1E8FF]",
  quoted: "hover:bg-[#E8EDFF]",
  closed: "hover:bg-[#EEF2F7]",
};

const StatusDropdown = ({
  options,
  rowId,
  onStatusChange,
  isOpen,
  onClose,
  buttonRect,
}) => {
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: -100 });

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
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      if (buttonRect) {
        const menuWidth = 144;
        const menuHeight = 132;
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
          : Math.min(
              window.innerHeight - menuHeight - gap,
              buttonRect.bottom + gap,
            );

        setDropdownStyle({ top, left: boundedLeft });
      }
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
      className="fixed w-36 rounded-lg border border-[#F485251A] bg-white shadow-2xl z-[9999] overflow-hidden"
    >
      {options.map((option, index) => {
        const statusStyle = STATUS_STYLES[option.key] || STATUS_STYLES.closed;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => {
              onStatusChange(rowId, option.key);
              onClose();
            }}
            className={`w-full px-2 py-2 text-center flex items-center justify-center gap-2 cursor-pointer ${
              STATUS_HOVER_CLASS[option.key] || STATUS_HOVER_CLASS.closed
            } ${
              index < options.length - 1 ? "border-b border-[#E5E7EB]" : ""
            }`}
          >
            <span className={`text-base font-semibold ${statusStyle.textColor}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Leadsadmin = () => {
  const { t } = useTranslation();
  const data = t("admin.leads", { returnObjects: true });
  const { header, actions, table, statusOptions, mobileLabels } = data;
  const { currentPage, totalPages, paginatedData, handlePageChange } =
    usePagination(table.rows, 6);
  const [rows, setRows] = useState(table.rows);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [buttonRect, setButtonRect] = useState(null);

  const handleStatusChange = (rowId, newStatusKey) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              statusTone: newStatusKey,
              status:
                statusOptions.find((option) => option.key === newStatusKey)
                  ?.label || row.status,
            }
          : row,
      ),
    );
  };

  const handleMenuClick = (e, rowId) => {
    setOpenMenuId(openMenuId === rowId ? null : rowId);
    if (openMenuId !== rowId) {
      setButtonRect(e.currentTarget.getBoundingClientRect());
    }
  };

  const handleExport = () => {
    const csvHeaders = data.csvHeaders;
    const csvRows = rows.map((row) => [
      row.name,
      row.email,
      row.service,
      row.receivedDate,
      row.receivedTime,
      row.status,
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${data.exportFileNamePrefix}-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F485251A] pb-4">
        <div>
          <h1 className="text-2xl md:text-4xl leading-[1.05] font-black text-[#111827]">
            {header.title}
          </h1>
          <p className="mt-3 text-base  text-[#64748B]">{header.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-8 w-full md:w-auto justify-center items-center gap-1 rounded-md border border-[#F485251A] bg-white px-2 text-sm font-semibold text-[#334155] md:h-10 md:gap-2 md:px-4 py-5 md:text-base cursor-pointer"
          >
            <Download size={18} className="md:w-[22px] md:h-[22px]" />
            <span>{actions.export}</span>
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-[#F485251A] bg-white shadow-[0_1px_0_0_rgba(15,23,42,0.02)]">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-y-auto overflow-x-auto">
          <table className="min-w-280 w-full">
            <thead>
              <tr className="bg-[#fef9f4] border-b border-[#F485251A]">
                {table.columns.map((column) => (
                  <th
                    key={column}
                    className={`px-6 py-4 text-base text-[#6B7C93] font-semibold ${
                      column === table.columns[table.columns.length - 1]
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
              {paginatedData.map((row) => {
                const status =
                  STATUS_STYLES[row.statusTone] || STATUS_STYLES.closed;

                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#F485251A] last:border-b-0 "
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-[#1F2937]"
                          style={{ backgroundColor: row.avatar.background }}
                        >
                          {row.avatar.initials}
                        </div>
                        <div>
                          <p className="text-base font-semibold  text-[#111827]">
                            {row.name}
                          </p>
                          <p className="text-sm  text-[#8191A6]">{row.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3.5">
                      <span className="inline-flex rounded bg-[#EEF2F7] px-2.5 py-1 text-base  text-[#607086]">
                        {row.service}
                      </span>
                    </td>

                    <td className="px-6 py-3.5">
                      <p className="text-base  text-[#475569]">
                        {row.receivedDate}
                      </p>
                      <p className="text-base leading-4 text-[#94A3B8]">
                        {row.receivedTime}
                      </p>
                    </td>

                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-base  ${status.pill}`}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-lg ${status.dot}`}
                          aria-hidden="true"
                        />
                        {row.status}
                      </span>
                    </td>

                    <td className="px-4 py-6 flex-shrink-0 relative flex justify-center items-center">
                      <button
                        type="button"
                        className="text-[#94A3B8] hover:text-[#0F172A] transition-colors flex items-center justify-center cursor-pointer"
                        onClick={(e) => handleMenuClick(e, row.id)}
                      >
                        <EllipsisVertical size={18} />
                      </button>
                      {openMenuId === row.id && (
                        <StatusDropdown
                          options={statusOptions}
                          rowId={row.id}
                          onStatusChange={handleStatusChange}
                          isOpen={true}
                          onClose={() => setOpenMenuId(null)}
                          buttonRect={buttonRect}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 p-4">
          {paginatedData.map((row) => {
            const status =
              STATUS_STYLES[row.statusTone] || STATUS_STYLES.closed;

            return (
              <div
                key={row.id}
                className="rounded-lg border border-[#F485251A] bg-[#FCFDFE] p-4 relative shadow-lg"
              >
                <div className="flex items-center justify-between gap-3 mb-3 ">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[#1F2937] "
                      style={{ backgroundColor: row.avatar.background }}
                    >
                      {row.avatar.initials}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#111827]">
                        {row.name}
                      </p>
                      <p className="text-sm text-[#8191A6]">{row.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                    onClick={(e) => handleMenuClick(e, row.id)}
                  >
                    <EllipsisVertical size={20} />
                  </button>
                  {openMenuId === row.id && (
                    <StatusDropdown
                      options={statusOptions}
                      rowId={row.id}
                      onStatusChange={handleStatusChange}
                      isOpen={true}
                      onClose={() => setOpenMenuId(null)}
                      buttonRect={buttonRect}
                    />
                  )}
                </div>

                <div className="space-y-2.5 border-t border-[#F485251A] pt-3">
                  <div className="flex flex-row gap-2  justify-between items-center">
                    <p className="text-sm text-[#6B7C93]">{mobileLabels.serviceType}</p>
                    <span className="inline-flex rounded bg-[#EEF2F7] px-2.5 py-1 text-sm font-semibold text-[#607086] mt-1">
                      {row.service}
                    </span>
                  </div>

                  <div className="">
                    <div className="flex flex-row gap-2  justify-between items-center">
                      <p className="text-sm text-[#6B7C93]">{mobileLabels.receivedDate}</p>
                      <div>
                        <p className="text-[14px] font-semibold text-[#111827] mt-1">
                          {row.receivedDate}
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                          {row.receivedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2  justify-between items-center pt-3">
                      <p className="text-sm text-[#6B7C93]">{mobileLabels.status}</p>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold mt-1 ${status.pill}`}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`}
                          aria-hidden="true"
                        />
                        {row.status}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full rounded bg-[#F1F5F9] py-2 text-sm font-semibold text-[#F58626] cursor-pointer"
                  >
                    {row.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={table.rows.length}
          itemsPerPage={6}
        />
      </div>
    </section>
  );
};

export default Leadsadmin;
