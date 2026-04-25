import React, { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, Shapes, ChevronDown, CloudUpload, MousePointer2, MapPinCheckInside, LockKeyhole, Gauge, BadgeCheck, Wallet, Headset } from 'lucide-react';
import AnnouncementBar from '../home/AnnouncementBar';
import HomeNav from '../home/HomeNav';
import FooterSection from '../home/FooterSection';
import {
  IMG_CONTACT_SERVICE_ICON,
  IMG_CONTACT_LOCATION_ICON,
  IMG_CONTACT_UPLOAD_ICON,
  IMG_CONTACT_SEND_ICON,
  IMG_CONTACT_LOCK_ICON,
  IMG_CONTACT_WHATSAPP_ICON,
  IMG_CONTACT_QUOTE_BTN_ICON,
  IMG_CONTACT_FAST_ICON,
  IMG_CONTACT_EXPERT_ICON,
  IMG_CONTACT_PRICING_ICON,
  IMG_CONTACT_DROPDOWN_ICON,
  IMG_CONTACT_WHATSAPP_FAB,
} from '../home/assets';

const InputField = memo(
  ({ label, id, type, placeholder, Icon, value, onChange }) => (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='font-semibold text-sm text-form-label leading-5'
      >
        {label}
      </label>
      <div className='relative'>
        <div className='absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none'>
          <Icon size={18} className='text-muted' strokeWidth={1.9} />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='w-full bg-surface border border-[rgba(244,133,37,0.2)] rounded-lg py-3.75 pl-10.25 pr-4.25 text-base text-heading placeholder-placeholder outline-none focus:border-primary transition-colors'
        />
      </div>
    </div>
  ),
);
InputField.displayName = 'InputField';

const INFO_CARDS = [
  { Icon: Gauge, titleKey: 'fastTitle', descKey: 'fastDesc' },
  { Icon: Headset, titleKey: 'expertTitle', descKey: 'expertDesc' },
  { Icon: BadgeCheck, titleKey: 'pricingTitle', descKey: 'pricingDesc' },
];

const ContactContent = memo(() => {
  const { t } = useTranslation();
  const serviceOptions = t('contact.serviceOptions', { returnObjects: true });

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    address: '',
    details: '',
  });
  const [dragOver, setDragOver] = useState(false);

  const handleChange = useCallback(
    (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value })),
    [],
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className='bg-surface min-h-screen'>
      <AnnouncementBar />
      <HomeNav />

      <main className='px-4 sm:px-6 md:px-10 xl:px-20 pt-8 sm:pt-12 pb-12'>
        <div className='container mx-auto flex flex-col gap-10'>
          {/* Page Header */}
          <div className='flex flex-col gap-3'>
            <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl text-heading leading-tight'>
              {t('contact.pageHeading')}
            </h1>
            <p className='font-normal text-base text-body leading-7'>
              {t('contact.pageSubtitle')}
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className='bg-white border border-[rgba(244,133,37,0.05)] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4 sm:p-6 md:p-10 flex flex-col gap-6 sm:gap-8'
          >
            {/* Section 1 — Personal info 2×2 grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputField
                label={t('contact.labelFullName')}
                id='fullName'
                type='text'
                placeholder={t('contact.placeholderFullName')}
                Icon={User}
                value={form.fullName}
                onChange={handleChange('fullName')}
              />
              <InputField
                label={t('contact.labelEmail')}
                id='email'
                type='email'
                placeholder={t('contact.placeholderEmail')}
                Icon={Mail}
                value={form.email}
                onChange={handleChange('email')}
              />
              <InputField
                label={t('contact.labelPhone')}
                id='phone'
                type='tel'
                placeholder={t('contact.placeholderPhone')}
                Icon={Phone}
                value={form.phone}
                onChange={handleChange('phone')}
              />

              {/* Service Type select */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='serviceType'
                  className='font-semibold text-sm text-form-label leading-5'
                >
                  {t('contact.labelServiceType')}
                </label>
                <div className='relative'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                    {/* <img
                      src={IMG_CONTACT_SERVICE_ICON}
                      alt=''
                      className='w-4.75 h-5 object-contain'
                    /> */}
                    <samp className='text-[#94A3B8]'><Shapes /></samp>
                  </div>
                  <select
                    id='serviceType'
                    value={form.serviceType}
                    onChange={handleChange('serviceType')}
                    className='w-full appearance-none bg-surface border border-[rgba(244,133,37,0.2)] rounded-lg py-3.75 pl-10.25 pr-10 text-base text-heading outline-none focus:border-primary transition-colors cursor-pointer'
                  >
                    <option value='' disabled>
                      {t('contact.placeholderServiceType')}
                    </option>
                    {Array.isArray(serviceOptions) &&
                      serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                  <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            <samp className='text-[#6B7280]'><ChevronDown /></samp>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 — Project Address */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='address'
                className='font-semibold text-sm text-form-label leading-5'
              >
                {/* {t('contact.labelAddress')} */}
              </label>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                  {/* <img
                    src={IMG_CONTACT_LOCATION_ICON}
                    alt=''
                    className='w-4 h-5 object-contain'
                  /> */}
                  <samp className='text-[#94A3B8]'><MapPinCheckInside /></samp>
                </div>
                <input
                  id='address'
                  type='text'
                  placeholder={t('contact.placeholderAddress')}
                  value={form.address}
                  onChange={handleChange('address')}
                  className='w-full bg-surface border border-[rgba(244,133,37,0.2)] rounded-lg py-3.75 pl-10.25 pr-4.25 text-base text-heading placeholder-placeholder outline-none focus:border-primary transition-colors'
                />
              </div>
            </div>

            {/* Section 3 — Project Details */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='details'
                className='font-semibold text-sm text-form-label leading-5'
              >
                {t('contact.labelDetails')}
              </label>
              <textarea
                id='details'
                placeholder={t('contact.placeholderDetails')}
                value={form.details}
                onChange={handleChange('details')}
                rows={5}
                className='w-full bg-surface border border-[rgba(244,133,37,0.2)] rounded-lg pt-3.25 px-4.25 pb-21.25 text-base text-heading placeholder-placeholder outline-none focus:border-primary transition-colors resize-none leading-6'
              />
            </div>

            {/* Section 4 — File Upload */}
            <div className='flex flex-col gap-2'>
              <span className='font-semibold text-sm text-form-label leading-5'>
                {t('contact.labelUpload')}
              </span>
              <label
                className={`flex flex-col items-center justify-center h-35 bg-[rgba(244,133,37,0.05)] border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  dragOver ? 'border-primary' : 'border-[rgba(244,133,37,0.2)]'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                }}
              >
                <input
                  type='file'
                  accept='.png,.jpg,.jpeg,.pdf'
                  multiple
                  className='hidden'
                />
                {/* <img
                  src={IMG_CONTACT_UPLOAD_ICON}
                  alt=''
                  className='w-8.25 h-6 object-contain mb-3'
                /> */}
                <samp className='text-[#F48525]'><CloudUpload /></samp>
                <div className='flex items-center gap-1'>
                  <span className='font-semibold text-sm text-primary'>
                    {t('contact.uploadCta')}
                  </span>
                  <span className='font-normal text-sm text-body'>
                    {t('contact.uploadOr')}
                  </span>
                </div>
                <p className='font-normal text-xs text-muted mt-1'>
                  {t('contact.uploadHint')}
                </p>
              </label>
            </div>

            {/* Section 5 — Submit */}
            <div className='flex flex-col gap-4 pt-4'>
              <button
                type='submit'
                className='w-full bg-primary hover:bg-primary-700 transition-colors rounded-lg py-4 flex items-center justify-center gap-2 shadow-[0_10px_15px_-3px_rgba(244,133,37,0.2),0_4px_6px_-4px_rgba(244,133,37,0.2)]'
              >
                <span className='font-bold text-lg text-white leading-7'>
                  {t('contact.submitButton')}
                </span>
                {/* <img
                  src={IMG_CONTACT_SEND_ICON}
                  alt=''
                  className='w-6 h-6 object-contain'
                /> */}
                <span className='text-white rotate-90'><MousePointer2 /></span>
              </button>
              <div className='flex items-center justify-center gap-1.5'>
        

                <samp className='text-[#64748B]'><LockKeyhole size={12} /></samp>
                <p className='font-normal text-sm text-muted text-center leading-5'>
                  {t('contact.securityNote')}
                </p>
              </div>
            </div>
          </form>

          {/* 3-col info strip */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[rgba(244,133,37,0.1)] pt-10 sm:pt-14 pb-8 sm:pb-12'>
            {INFO_CARDS.map(({ Icon, titleKey, descKey }) => (
              <div key={titleKey} className='flex flex-col'>
                <div className='w-12.5 h-12.5 bg-[rgba(244,133,37,0.1)] rounded-full flex items-center justify-center mb-4'>
                  <Icon size={24} className='text-primary' strokeWidth={1.9} />
                </div>
                <h3 className='font-bold text-base text-heading leading-6 mb-2'>
                  {t(`contact.${titleKey}`)}
                </h3>
                <p className='font-normal text-sm text-body leading-5'>
                  {t(`contact.${descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* WhatsApp FAB */}
      <a
        href='https://wa.me/'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-8 right-8 w-15 h-15 z-50'
        aria-label='WhatsApp'
      >
        <img
          src={IMG_CONTACT_WHATSAPP_FAB}
          alt='WhatsApp'
          className='w-full h-full object-contain drop-shadow-lg'
        />
      </a>

      <FooterSection />
    </div>
  );
});

ContactContent.displayName = 'ContactContent';

export default ContactContent;
