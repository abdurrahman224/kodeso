import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import AnnouncementBar from '../home/AnnouncementBar';
import HomeNav from '../home/HomeNav';
import FooterSection from '../home/FooterSection';
import {
  IMG_DETAIL_HERO,
  IMG_DETAIL_GALLERY_BEFORE,
  IMG_DETAIL_GALLERY_AFTER,
  IMG_DETAIL_STEPS_DIVIDER,
  IMG_DETAIL_STAR,
  IMG_DETAIL_CHECK,
  IMG_DETAIL_WHATSAPP_ICON,
  IMG_DETAIL_QUOTE_ICON,
} from '../home/assets';

const STEPS = [
  { num: '1', titleKey: 'step1Title', descKey: 'step1Desc' },
  { num: '2', titleKey: 'step2Title', descKey: 'step2Desc' },
  { num: '3', titleKey: 'step3Title', descKey: 'step3Desc' },
  { num: '4', titleKey: 'step4Title', descKey: 'step4Desc' },
];

const WHY_KEYS = ['why1', 'why2', 'why3'];

const StarRow = memo(() => (
  <div className='flex gap-1 items-center'>
    {[1, 2, 3, 4, 5].map((i) => (
      <img key={i} src={IMG_DETAIL_STAR} alt='' className='size-3 block' />
    ))}
  </div>
));
StarRow.displayName = 'StarRow';

const ServiceDetailContent = memo(() => {
  const { t } = useTranslation();

  return (
    <div className='bg-surface min-h-screen'>
      <AnnouncementBar />
      <HomeNav />

      <main className='px-4 sm:px-6 md:px-10 xl:px-20 pt-6 pb-16 sm:pb-20'>
        <div className='container mx-auto'>
          {/* ── Hero Banner ──────────────────────────────────────────── */}
          <div className='mb-6 sm:mb-8'>
            <div className='overflow-hidden rounded-2xl relative'>
              {/* Background photo */}
              <img
                src={IMG_DETAIL_HERO}
                alt=''
                className='absolute inset-0 w-full h-full object-cover'
              />
              {/* Dark gradient overlay */}
              <div className='absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.55)] to-[rgba(0,0,0,0.15)]' />

              {/* Centered text */}
              <div className='relative z-10 p-5 sm:p-8 xl:p-10 min-h-64 sm:min-h-72 md:min-h-80 xl:min-h-96 flex flex-col justify-center gap-3'>
                {/* Category tag */}
                <div className='bg-[rgba(30,30,30,0.75)] border border-[rgba(255,255,255,0.15)] px-3 py-1 rounded-full self-start backdrop-blur-sm'>
                  <span className="font-['Work_Sans',sans-serif] font-semibold text-xs text-white tracking-widest uppercase">
                    {t('serviceDetail.heroTag')}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-['Work_Sans',sans-serif] font-bold text-2xl sm:text-3xl xl:text-4xl text-white leading-tight max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-2xl">
                  {t('serviceDetail.heroHeading')}
                </h1>

                {/* Sub-description */}
                <p className="font-['Work_Sans',sans-serif] font-normal text-[rgba(255,255,255,0.75)] text-base leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-2xl">
                  {t('serviceDetail.heroDescription')}
                </p>

                {/* CTA buttons */}
                <div className='flex flex-wrap items-center gap-3 pt-1'>
                  <a
                    href='https://wa.me/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className="btn inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors rounded-lg px-4 sm:px-5 py-2.5 font-['Work_Sans',sans-serif] font-bold text-white text-sm"
                  >
                    <img
                      src={IMG_DETAIL_WHATSAPP_ICON}
                      alt=''
                      className='w-4 h-4'
                    />
                    {t('serviceDetail.ctaWhatsapp')}
                  </a>
                  <a
                    href='#'
                    className="btn inline-flex items-center gap-2 bg-primary hover:bg-[#e07418] transition-colors rounded-lg px-4 sm:px-5 py-2.5 font-['Work_Sans',sans-serif] font-bold text-white text-sm"
                  >
                    <img
                      src={IMG_DETAIL_QUOTE_ICON}
                      alt=''
                      className='w-4 h-4'
                    />
                    {t('serviceDetail.ctaQuote')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Overview + Sidebar (2/3 + 1/3 grid) ─────────────────── */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            {/* ── Left column (spans 2 of 3) ───────────────────────── */}
            <div className='lg:col-span-2 flex flex-col gap-4'>
              {/* Serviceoverzicht */}
              <h2 className="font-['Work_Sans',sans-serif] font-bold text-xl md:text-2xl text-heading leading-tight">
                {t('serviceDetail.overviewTitle')}
              </h2>
              <p className="font-['Work_Sans',sans-serif] font-normal text-body text-base leading-relaxed">
                {t('serviceDetail.overviewText')}
              </p>
              <p className="font-['Work_Sans',sans-serif] italic font-normal text-body text-base leading-relaxed">
                {t('serviceDetail.overviewItalic')}
              </p>

              {/* Projectgalerij */}
              <div className='flex flex-col gap-4 sm:gap-6 pt-6 sm:pt-8'>
                <h2 className="font-['Work_Sans',sans-serif] font-bold text-xl md:text-2xl text-heading leading-tight">
                  {t('serviceDetail.galleryTitle')}
                </h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                  {/* Before photo */}
                  <div className='bg-[#f1f5f9] rounded-xl relative overflow-hidden'>
                    <div className='h-52 sm:h-64 relative opacity-60'>
                      <img
                        src={IMG_DETAIL_GALLERY_BEFORE}
                        alt=''
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                      {/* Grayscale overlay */}
                      <div className='absolute inset-0 bg-white mix-blend-saturation' />
                    </div>
                    <div className='absolute top-4 left-4 bg-[rgba(15,23,42,0.8)] px-2 py-1 rounded'>
                      <span className="font-['Work_Sans',sans-serif] font-bold text-xs text-white uppercase leading-4">
                        {t('serviceDetail.galleryBefore')}
                      </span>
                    </div>
                  </div>

                  {/* After photo */}
                  <div className='bg-[#f1f5f9] border-2 border-[rgba(244,133,37,0.2)] rounded-xl relative overflow-hidden p-0.5'>
                    <div className='h-52 sm:h-64 relative'>
                      <img
                        src={IMG_DETAIL_GALLERY_AFTER}
                        alt=''
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                    </div>
                    <div className='absolute top-4 left-4 bg-primary px-2 py-1 rounded'>
                      <span className="font-['Work_Sans',sans-serif] font-bold text-xs text-white uppercase leading-4">
                        {t('serviceDetail.galleryAfter')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hoe wij werken */}
              <div className='flex flex-col gap-6 sm:gap-8 pt-10 sm:pt-12'>
                <h2 className="font-['Work_Sans',sans-serif] font-bold text-xl md:text-2xl text-heading leading-tight">
                  {t('serviceDetail.workTitle')}
                </h2>

                {/* Steps with vertical connector line */}
                <div className='relative flex flex-col gap-6 sm:gap-8'>
                  {/* Vertical divider image */}
                  <div className='absolute left-5 top-0 bottom-0 w-0.5 pointer-events-none'>
                    <img
                      src={IMG_DETAIL_STEPS_DIVIDER}
                      alt=''
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                  </div>

                  {STEPS.map(({ num, titleKey, descKey }) => (
                    <div
                      key={num}
                      className='flex gap-4 sm:gap-6 items-start relative'
                    >
                      {/* Numbered circle */}
                      <div className='bg-primary rounded-full size-11 flex items-center justify-center shrink-0 relative'>
                        <div className='absolute inset-0 rounded-full shadow-[0px_0px_0px_8px_#f8f7f5]' />
                        <span className="font-['Work_Sans',sans-serif] font-bold text-base text-white leading-6 relative">
                          {num}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className='flex flex-col gap-1'>
                        <h3 className="font-['Work_Sans',sans-serif] font-bold text-base sm:text-lg text-heading leading-7">
                          {t(`serviceDetail.${titleKey}`)}
                        </h3>
                        <p className="font-['Work_Sans',sans-serif] font-normal text-body text-base leading-6">
                          {t(`serviceDetail.${descKey}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right sidebar ────────────────────────────────────── */}
            <div className='flex flex-col gap-6 sm:gap-8'>
              {/* Reviews card */}
              <div className='bg-white border border-[rgba(244,133,37,0.1)] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-5 sm:p-6 flex flex-col gap-4'>
                <h3 className="font-['Work_Sans',sans-serif] font-bold text-lg md:text-xl text-heading leading-7">
                  {t('serviceDetail.reviewsTitle')}
                </h3>

                <div className='flex flex-col gap-6'>
                  {/* Review 1 */}
                  <div className='border-b border-[rgba(244,133,37,0.05)] pb-4 flex flex-col gap-2'>
                    <StarRow />
                    <p className="font-['Work_Sans',sans-serif] font-normal text-body text-sm leading-5">
                      {t('serviceDetail.review1Quote')}
                    </p>
                    <p className="font-['Work_Sans',sans-serif] font-bold text-heading text-xs leading-4">
                      {t('serviceDetail.review1Author')}
                    </p>
                  </div>

                  {/* Review 2 */}
                  <div className='flex flex-col gap-2'>
                    <StarRow />
                    <p className="font-['Work_Sans',sans-serif] font-normal text-body text-sm leading-5">
                      {t('serviceDetail.review2Quote')}
                    </p>
                    <p className="font-['Work_Sans',sans-serif] font-bold text-heading text-xs leading-4">
                      {t('serviceDetail.review2Author')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us card */}
              <div className='bg-[rgba(244,133,37,0.1)] rounded-xl p-6 flex flex-col gap-2'>
                <h3 className="font-['Work_Sans',sans-serif] font-bold text-lg text-primary leading-7">
                  {t('serviceDetail.whyTitle')}
                </h3>

                <div className='flex flex-col gap-3 mt-1'>
                  {WHY_KEYS.map((key) => (
                    <div key={key} className='flex gap-2 items-center'>
                      <img
                        src={IMG_DETAIL_CHECK}
                        alt=''
                        className='size-3.5 shrink-0 block'
                      />
                      <span className="font-['Work_Sans',sans-serif] font-normal text-heading text-sm leading-5">
                        {t(`serviceDetail.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
});

ServiceDetailContent.displayName = 'ServiceDetailContent';

export default ServiceDetailContent;
