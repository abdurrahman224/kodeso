import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IMG_GIVEAWAY } from './assets';

const AVATAR_COLORS = ['bg-[#334155]', 'bg-[#475569]', 'bg-[#64748b]'];

const GiveawaySection = memo(() => {
  const { t } = useTranslation();

  const handleCta = useCallback(() => {
    // Coupon purchase 
  }, []);

  return (
    <section
      id='giveaway'
      className='relative bg-heading px-6 xl:px-20 py-22 overflow-hidden'
    >
      {/* Radial gradient top-right */}
      <div className='absolute top-0 right-0 w-150 h-150 bg-[radial-gradient(circle,rgba(244,133,37,0.2)_0%,transparent_70%)] pointer-events-none' />

      <div className='container mx-auto flex flex-col lg:flex-row gap-13.5 items-center relative z-10'>
        {/* Left: text */}
        <div className='flex-1 flex flex-col gap-8 max-w-xl'>
          {/* Tag */}
          <div className='w-fit bg-[rgba(244,133,37,0.2)] border border-primary rounded-full px-4 py-2'>
            <span className="font-['Work_Sans',sans-serif] font-semibold text-primary text-xs uppercase tracking-[1.2px]">
              {t('home.giveaway.tag')}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-['Work_Sans',sans-serif] font-black text-5xl xl:text-6xl leading-[1.05] text-white">
            {t('home.giveaway.heading1')}
            <br />
            <span className='text-primary'>{t('home.giveaway.heading2')}</span>
          </h2>

          {/* Body */}
          <p className="font-['Work_Sans',sans-serif] font-normal text-subtle text-lg xl:text-xl leading-7">
            {t('home.giveaway.description')}
          </p>

          {/* CTA */}
          <button
            type='button'
            onClick={handleCta}
            className="self-start bg-primary rounded-2xl px-10 py-5 font-['Work_Sans',sans-serif] font-black text-xl text-white hover:bg-[#e07418] transition-colors"
          >
            {t('home.giveaway.cta')}
          </button>

          {/* Entrants stack */}
          <div className='flex items-center gap-3'>
            <div className='flex -space-x-2'>
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-heading`}
                />
              ))}
              <div className='w-8 h-8 rounded-full bg-primary border-2 border-heading flex items-center justify-center'>
                <span className="font-['Work_Sans',sans-serif] font-black text-[8px] text-white leading-none">
                  +450
                </span>
              </div>
            </div>
            <p className="font-['Work_Sans',sans-serif] font-normal text-subtle text-sm">
              {t('home.giveaway.entrants')}
            </p>
          </div>
        </div>

        {/* Right: device mockup */}
        <div className='flex-1 relative flex items-center justify-center'>
          {/* Orange glow */}
          <div className='absolute w-87.5[350px] bg-[rgba(244,133,37,0.35)] rounded-full blur-[48px] pointer-events-none' />

          {/* Tilted device frame */}
          <div className='relative rotate-3 border-8 border-[#1e293b] rounded-[40px] overflow-hidden w-full max-w-95 xl:max-w-105 shadow-2xl z-10'>
            <img
              src={IMG_GIVEAWAY}
              alt={t('home.giveaway.imageAlt')}
              className='w-full block'
            />
            <div className='bg-primary px-6 py-3 text-center'>
              <span className="font-['Work_Sans',sans-serif] font-black text-white text-[11px] xl:text-xs uppercase tracking-[1.6px]">
                {t('home.giveaway.grandPrize')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GiveawaySection.displayName = 'GiveawaySection';

export default GiveawaySection;
