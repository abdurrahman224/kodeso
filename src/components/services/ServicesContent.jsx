import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config';
import AnnouncementBar from '../home/AnnouncementBar';
import HomeNav from '../home/HomeNav';
import FooterSection from '../home/FooterSection';
import {
  IMG_SVC_CARD_PHOTO_A,
  IMG_SVC_CARD_PHOTO_B,
  IMG_SVC_ICON_PLUMBING,
  IMG_SVC_ICON_ROOFING,
  IMG_SVC_ICON_PLASTERING,
  IMG_SVC_ICON_ELECTRICAL,
  IMG_SVC_ICON_TILING,
  IMG_SVC_ICON_FLOORING,
  IMG_SVC_ICON_CLEANING,
  IMG_SVC_ICON_GENERAL,
  IMG_SVC_ARROW,
} from '../home/assets';
import { Gavel, Hammer, Hospital, Paintbrush, RadioTower, Shovel } from 'lucide-react';

// Card metadata — photo, icon, i18n key, and title font size per Figma
const CARD_META = [
  {
    key: 'card1',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: Hammer,
    iconW: 'w-3.5',
    iconH: 'h-[18px]',
    titleSize: 'text-xl',
    detailPath: ROUTES.SERVICES_SANITAIR,
  },
  {
    key: 'card2',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: Gavel,
    iconW: 'w-5',
    iconH: 'h-5',
    titleSize: 'text-xl',
  },
  {
    key: 'card3',
    photo: IMG_SVC_CARD_PHOTO_B,
    icon: Paintbrush,
    iconW: 'w-5',
    iconH: 'h-5',
    titleSize: 'text-2xl',
  },
  {
    key: 'card4',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: RadioTower,
    iconW: 'w-6',
    iconH: 'h-6',
    titleSize: 'text-xl',
  },
  {
    key: 'card5',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: Hospital,
    iconW: 'w-[19px]',
    iconH: 'h-[19px]',
    titleSize: 'text-xl',
  },
  {
    key: 'card6',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: Gavel,
    iconW: 'w-5',
    iconH: 'h-5',
    titleSize: 'text-xl',
  },
  {
    key: 'card7',
    photo: IMG_SVC_CARD_PHOTO_B,
    icon: Shovel,
    iconW: 'w-5',
    iconH: 'h-5',
    titleSize: 'text-2xl',
  },
  {
    key: 'card8',
    photo: IMG_SVC_CARD_PHOTO_A,
    icon: Gavel,
    iconW: 'w-6',
    iconH: 'h-6',
    titleSize: 'text-xl',
  },
];

const ServiceCard = memo(
  ({ photo, icon, iconW, iconH, titleSize, cardKey, detailPath }) => {
    const { t } = useTranslation();
    const cardContent = (
      <>
        {/* Card image */}
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            src={photo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Card content */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          {/* Category label */}
          <div className="flex items-center gap-2">
            {typeof icon === 'string' ? (
              <img
                src={icon}
                alt=""
                className={`${iconW} ${iconH} shrink-0 object-contain text-[#F48525]`}
              />
            ) : (
              icon &&
              React.createElement(icon, {
                className: `${iconW} ${iconH} shrink-0 object-contain text-[#F48525]`,
              })
            )}
            <span className="font-['Work_Sans',sans-serif] font-light text-primary text-xs tracking-[0.6px] uppercase leading-4">
              {t(`services.${cardKey}.category`)}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-['Work_Sans',sans-serif] font-bold ${titleSize} text-heading leading-7`}
          >
            {t(`services.${cardKey}.title`)}
          </h3>

          {/* Description */}
          <p className="font-['Work_Sans',sans-serif] font-normal text-body text-lg leading-[22.75px] flex-1">
            {t(`services.${cardKey}.description`)}
          </p>

          {/* "Details bekijken" link */}
          <div className="pt-4">
            {detailPath ? (
              <Link
                to={detailPath}
                className="inline-flex items-center gap-2 font-['Work_Sans',sans-serif] font-bold text-primary text-base leading-5 hover:opacity-80 transition-opacity"
              >
                {t('services.viewDetails')}
                <img src={IMG_SVC_ARROW} alt="" className="w-2.25 h-2.25" />
              </Link>
            ) : (
              <a
                href="#"
                className="inline-flex items-center gap-2 font-['Work_Sans',sans-serif] font-bold text-primary text-base leading-5 hover:opacity-80 transition-opacity"
              >
                {t('services.viewDetails')}
                <img src={IMG_SVC_ARROW} alt="" className="w-2.25 h-2.25" />
              </a>
            )}
          </div>
        </div>
      </>
    );

    if (detailPath) {
      return (
        <Link
          to={detailPath}
          className='bg-white border border-[#f1f5f9] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden p-px flex flex-col h-full hover:shadow-[0px_4px_12px_0px_rgba(244,133,37,0.2)] hover:border-[rgba(244,133,37,0.3)] transition-all duration-200 cursor-pointer'
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div className='bg-white border border-[#f1f5f9] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden p-px flex flex-col h-full hover:shadow-[0px_4px_12px_0px_rgba(244,133,37,0.2)] hover:border-[rgba(244,133,37,0.3)] transition-all duration-200 cursor-pointer'>
        {cardContent}
      </div>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

const ServicesContent = memo(() => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-surface'>
      <AnnouncementBar />
      <HomeNav />

      <main>
        {/* ── Services Hero ───────────────────────────────────────── */}
        <section className='bg-[rgba(244,133,37,0.05)] px-6 xl:px-20 py-20'>
          <div className='container mx-auto flex flex-col gap-4'>
            <h1 className="font-['Work_Sans',sans-serif] font-black text-5xl text-heading tracking-[-1.2px] leading-12">
              {t('services.heading')}
            </h1>
            <p className="font-['Work_Sans',sans-serif] font-normal text-body text-lg leading-7 max-w-2xl">
              {t('services.description')}
            </p>
          </div>
        </section>

        {/* ── Services Grid (8 cards, 2 rows × 4 cols) ────────────── */}
        <section className='px-6 xl:px-20 py-20 bg-surface'>
          <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6.25'>
            {CARD_META.map(
              ({ key, photo, icon, iconW, iconH, titleSize, detailPath }) => (
                <ServiceCard
                  key={key}
                  cardKey={key}
                  photo={photo}
                  icon={icon}
                  iconW={iconW}
                  iconH={iconH}
                  titleSize={titleSize}
                  detailPath={detailPath}
                />
              ),
            )}
          </div>
        </section>

        {/* ── CTA Section ─────────────────────────────────────────── */}
        <section className='bg-heading px-6 xl:px-20 py-20'>
          <div className='max-w-180 mx-auto flex flex-col gap-8 items-center text-center'>
            <div className='flex flex-col gap-4 items-center'>
              <h2 className="font-['Work_Sans',sans-serif] font-black text-4xl text-white leading-10">
                {t('services.cta.title')}
              </h2>
              <p className="font-['Work_Sans',sans-serif] font-normal text-subtle text-lg leading-7">
                {t('services.cta.description')}
              </p>
            </div>

            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link
                to={ROUTES.CONTACT}
                className="btn font-['Work_Sans',sans-serif] font-bold text-base text-white bg-primary rounded-lg h-12 min-w-45 px-6.5 inline-flex items-center justify-center hover:bg-[#e07418] transition-colors"
              >
                {t('services.cta.contactButton')}
              </Link>
              <a
                href='#'
                className="btn font-['Work_Sans',sans-serif] font-bold text-base text-primary border-2 border-[rgba(244,133,37,0.5)] rounded-lg h-12 min-w-45 px-6.5 inline-flex items-center justify-center hover:border-primary transition-colors"
              >
                {t('services.cta.browseButton')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />

      {/* WhatsApp floating action button */}
      <a
        href='https://wa.me/'
        aria-label='Chat on WhatsApp'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-6 right-6 z-50 w-14 h-14 drop-shadow-lg hover:scale-110 transition-transform'
      >
        <svg
          viewBox='0 0 48 48'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-full'
        >
          <title>Whatsapp-color</title>
          <desc>Created with Sketch.</desc>
          <g fill='none' fillRule='evenodd'>
            <g transform='translate(-700.000000, -360.000000)' fill='#67C15E'>
              <path d='M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z' />
            </g>
          </g>
        </svg>
      </a>
    </div>
  );
});

ServicesContent.displayName = 'ServicesContent';

export default ServicesContent;
