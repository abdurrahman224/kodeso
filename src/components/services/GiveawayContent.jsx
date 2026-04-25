import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ticket, Users, CalendarDays, TicketX, Flame, BadgeCheck, ShoppingCart, Radio, Palette, RefreshCw } from 'lucide-react';
import AnnouncementBar from '../home/AnnouncementBar';
import HomeNav from '../home/HomeNav';
import FooterSection from '../home/FooterSection';
import { ROUTES } from '../../config';
import {
  IMG_GIVEAWAY_HERO_BG,
  IMG_GIVEAWAY_TICKET_ICON,
  IMG_GIVEAWAY_TOTAL_ICON,
  IMG_GIVEAWAY_DATE_ICON,
  IMG_GIVEAWAY_URGENCY_ICON,
  IMG_GIVEAWAY_STEP1_ICON,
  IMG_GIVEAWAY_STEP2_ICON,
  IMG_GIVEAWAY_STEP3_ICON,
  IMG_GIVEAWAY_STEP4_ICON,
  IMG_GIVEAWAY_BUY_ICON,
  IMG_GIVEAWAY_TERMS_ICON,
  IMG_GIVEAWAY_GALLERY_1,
  IMG_GIVEAWAY_GALLERY_2,
  IMG_GIVEAWAY_GALLERY_3,
  IMG_GIVEAWAY_GALLERY_4,
} from '../home/assets';

const STAT_CARDS = [
  { Icon: Ticket, labelKey: 'ticketPriceLabel', valueKey: 'ticketPrice' },
  { Icon: Users, labelKey: 'totalTicketsLabel', valueKey: 'totalTickets' },
  { Icon: CalendarDays, labelKey: 'drawDateLabel', valueKey: 'drawDate' },
];

const STEPS = [
  {
    Icon: ShoppingCart,
    titleKey: 'step1Title',
    descKey: 'step1Desc',
  },
  {
    Icon: Radio,
    titleKey: 'step2Title',
    descKey: 'step2Desc',
  },
  {
    Icon: Palette,
    titleKey: 'step3Title',
    descKey: 'step3Desc',
  },
  {
    Icon: RefreshCw,
    titleKey: 'step4Title',
    descKey: 'step4Desc',
  },
];

const GALLERY_IMGS = [
  IMG_GIVEAWAY_GALLERY_1,
  IMG_GIVEAWAY_GALLERY_2,
  IMG_GIVEAWAY_GALLERY_3,
  IMG_GIVEAWAY_GALLERY_4,
];

const ICON_MAP = {
  ticket: IMG_GIVEAWAY_TICKET_ICON,
  total: IMG_GIVEAWAY_TOTAL_ICON,
  date: IMG_GIVEAWAY_DATE_ICON,
  step1: IMG_GIVEAWAY_STEP1_ICON,
  step2: IMG_GIVEAWAY_STEP2_ICON,
  step3: IMG_GIVEAWAY_STEP3_ICON,
  step4: IMG_GIVEAWAY_STEP4_ICON,
};

const TERM_KEYS = ['term1', 'term2', 'term3', 'term4'];

const GiveawayContent = memo(() => {
  const { t } = useTranslation();

  return (
    <div className='bg-surface min-h-screen'>
      <AnnouncementBar />
      <HomeNav />

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <div className='px-4 sm:px-6 md:px-10 xl:px-20 pt-4 sm:pt-6 pb-0'>
        <div className='container mx-auto'>
          <div className='mb-6 sm:mb-8'>
            <div className='overflow-hidden rounded-xl relative bg-border'>
              <img
                src={IMG_GIVEAWAY_HERO_BG}
                alt=''
                className='absolute inset-0 w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.2)] to-transparent' />

              <div className='relative z-10 p-5 sm:p-8 md:p-10 min-h-64 sm:min-h-72 md:min-h-80 flex flex-col justify-end gap-3'>
                {/* Tag pill */}
                <div className='bg-[rgba(244,133,37,0.2)] px-3 py-1 rounded-full self-start'>
                  <span className='font-bold text-xs text-white tracking-widest uppercase'>
                    {t('giveaway.heroTag')}
                  </span>
                </div>

                {/* Heading */}
                <h1 className='font-black text-2xl sm:text-3xl xl:text-4xl leading-tight text-white'>
                  {t('giveaway.heroHeading')}
                </h1>

                {/* Description */}
                <p className='text-base leading-relaxed text-[rgba(255,255,255,0.85)] max-w-sm sm:max-w-lg xl:max-w-2xl'>
                  {t('giveaway.heroDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className='px-4 sm:px-6 md:px-10 xl:px-20 pb-16 sm:pb-20'>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            {/* ── Left column (2/3) ────────────────────────────────────── */}
            <div className='flex-1 lg:w-0 min-w-0'>
              {/* Stat cards row */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8'>
                {STAT_CARDS.map(({ Icon, labelKey, valueKey }) => (
                  <div
                    key={labelKey}
                    className='bg-white border border-[rgba(244,133,37,0.2)] rounded-xl p-5 sm:p-6 flex flex-col gap-3'
                  >
                    <div className='w-10 h-10 bg-[rgba(244,133,37,0.1)] rounded-lg flex items-center justify-center'>
                      <Icon
                        className='w-5 h-5 text-primary'
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs font-semibold uppercase tracking-wide text-muted'>
                        {t(`giveaway.${labelKey}`)}
                      </p>
                      <p className='font-black text-2xl sm:text-3xl leading-none text-heading'>
                        {t(`giveaway.${valueKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress section */}
              <div className='bg-white border border-[rgba(244,133,37,0.2)] rounded-xl p-5 sm:p-6 mb-6 sm:mb-8'>
                <div className='flex items-center justify-between mb-3'>
                  <span className='text-sm font-bold text-heading'>
                    {t('giveaway.soldLabel')}
                  </span>
                  <span className='text-sm font-black text-primary'>
                    {t('giveaway.soldCount')}
                  </span>
                </div>

                {/* Progress bar */}
                <div className='bg-[rgba(244,133,37,0.1)] h-4 rounded-full overflow-hidden mb-3'>
                  <div
                    className='bg-primary h-full rounded-full'
                    style={{ width: '65%' }}
                  />
                </div>

                {/* Urgency row */}
                <div className='flex items-center gap-2'>
                  <div className='shrink-0'>
                    {/* <img
                      src={IMG_GIVEAWAY_URGENCY_ICON}
                      alt=''
                      className='w-full h-full object-contain'
                    /> */}
                       <span className='text-muted'><Flame /></span>
                  </div>
                  <p className='text-sm text-muted'>
                    {t('giveaway.urgencyText')}
                
                  </p>
                </div>
              </div>

              {/* How it works */}
              <div className='bg-white border border-[rgba(244,133,37,0.2)] rounded-xl p-5 sm:p-6'>
                <h2 className='font-black text-xl md:text-2xl text-heading mb-4 sm:mb-5'>
                  {t('giveaway.howWorksTitle')}
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {STEPS.map(({ Icon, titleKey, descKey }) => (
                    <div
                      key={titleKey}
                      className='bg-[rgba(244,133,37,0.05)] border border-[rgba(244,133,37,0.08)] p-4 sm:p-5 rounded-lg flex gap-3'
                    >
                      <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5'>
                        <Icon size={18} className='text-white' />
                      </div>
                      <div>
                        <p className='font-bold text-base text-heading mb-1'>
                          {t(`giveaway.${titleKey}`)}
                        </p>
                        <p className='text-base leading-relaxed text-body'>
                          {t(`giveaway.${descKey}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right sidebar (1/3) ──────────────────────────────────── */}
            <div className='lg:w-80 xl:w-96 shrink-0'>
              <div className='bg-white border-2 border-primary rounded-xl p-5 sm:p-6 lg:p-8 shadow-[0_8px_32px_rgba(244,133,37,0.12)] lg:sticky lg:top-24'>
                <h2 className='font-black text-xl md:text-2xl text-heading mb-4 sm:mb-6'>
                  {t('giveaway.sidebarTitle')}
                </h2>

                {/* Single entry option */}
                <div className='border border-border rounded-lg p-3 sm:p-4 flex items-center justify-between mb-3'>
                  <span className='text-sm sm:text-base font-medium text-heading'>
                    {t('giveaway.singleEntry')}
                  </span>
                  <span className='text-sm sm:text-base font-black text-heading'>
                    {t('giveaway.singlePrice')}
                  </span>
                </div>

                {/* Bundle option */}
                <div className='bg-[rgba(244,133,37,0.05)] border-2 border-primary rounded-lg p-3 sm:p-4 flex items-center justify-between mb-4 sm:mb-6'>
                  <div>
                    <span className='text-sm sm:text-base font-bold text-heading'>
                      {t('giveaway.bundleLabel')}
                    </span>
                    <span className='ml-2 bg-primary text-white text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full'>
                      {t('giveaway.bundleBadge')}
                    </span>
                  </div>
                  <span className='text-sm sm:text-base font-black text-primary'>
                    {t('giveaway.bundlePrice')}
                  </span>
                </div>

                {/* CTA button */}
                <Link
                  to={ROUTES.CHECKOUT}
                  className='btn w-full bg-primary hover:bg-primary-700 transition-colors rounded-lg py-4 flex items-center justify-center gap-2 sm:gap-3 mb-4'
                >
                  {/* <img src={IMG_GIVEAWAY_BUY_ICON} alt='' className='w-5 h-5' /> */}
                  <p className='text-white'><TicketX /></p>
                  <span className='font-black text-lg text-white tracking-[0.5px]'>
                    {t('giveaway.ctaButton')}
                  </span>
                </Link>

                {/* Secure note */}
                <p className='text-xs text-muted text-center leading-relaxed mb-4 sm:mb-6'>
                  {t('giveaway.ctaSecure')}
                </p>

                {/* Separator */}
                <div className='border-t border-[#f1f5f9] mb-5' />

                {/* Terms section */}
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 shrink-0 mt-0.5'>
                    {/* <img
                      src={IMG_GIVEAWAY_TERMS_ICON}
                      alt=''
                      className='w-full h-full object-contain'
                    /> */}
                       <span className='text-[#F48525]'> <BadgeCheck /></span>
                  </div>
                  <div>
                    <p className='text-sm font-bold text-heading mb-2'>
                      {t('giveaway.termsTitle')}
                    </p>
                    <ul className='pl-4 text-xs text-muted leading-loose list-disc'>
                      {TERM_KEYS.map((key) => (
                        <li key={key}>{t(`giveaway.${key}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Gallery Section ───────────────────────────────────────────────── */}
      <section className='px-4 sm:px-6 md:px-10 xl:px-20 pb-16 sm:pb-20'>
        <div className='container mx-auto'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h2 className='font-black text-2xl md:text-3xl text-heading'>
              {t('giveaway.galleryTitle')}
            </h2>
            <a
              href='#portfolio'
              className='text-sm font-semibold text-primary hover:underline'
            >
              {t('giveaway.galleryLink')}
            </a>
          </div>

          {/* Photo grid */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {GALLERY_IMGS.map((src, i) => (
              <div
                key={i}
                className='h-44 sm:h-52 md:h-56 rounded-lg bg-border overflow-hidden'
              >
                <img src={src} alt='' className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
});

GiveawayContent.displayName = 'GiveawayContent';

export default GiveawayContent;
