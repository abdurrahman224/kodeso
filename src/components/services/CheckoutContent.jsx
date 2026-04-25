import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnnouncementBar from '../home/AnnouncementBar';
import HomeNav from '../home/HomeNav';
import FooterSection from '../home/FooterSection';
import { ROUTES } from '../../config';
import {
  IMG_CHECKOUT_TICKET_ICON,
  IMG_CHECKOUT_CLOSE_ICON,
  IMG_CHECKOUT_RADIO_SELECTED,
  IMG_CHECKOUT_CHECK_GREEN,
  IMG_CHECKOUT_STRIPE_ICON,
  IMG_CHECKOUT_ARROW_ICON,
} from '../home/assets';
import { ArrowRight, CircleDot, Ticket, Wallet, X } from 'lucide-react';

const TICKET_OPTIONS = [
  {
    id: 1,
    labelKey: 'ticket1Label',
    priceKey: 'ticket1Price',
    badge: null,
    price: 5,
  },
  {
    id: 5,
    labelKey: 'ticket5Label',
    priceKey: 'ticket5Price',
    badgeKey: 'ticket5Badge',
    price: 20,
  },
  {
    id: 10,
    labelKey: 'ticket10Label',
    priceKey: 'ticket10Price',
    badgeKey: 'ticket10Badge',
    price: 35,
  },
  {
    id: 20,
    labelKey: 'ticket20Label',
    priceKey: 'ticket20Price',
    badgeKey: 'ticket20Badge',
    price: 60,
  },
];

// ── Admin promo code config ─────────────────────────────────────────
// Add / remove / edit codes here. discount = euro amount off.
const PROMO_CODES = {
  SAVE10: { discount: 0.5, labelKey: 'promoApplied' },
  WELKOM5: { discount: 0.25, labelKey: 'promoApplied' },
  MTS20: { discount: 1.0, labelKey: 'promoApplied' },
};
// ─────────────────────────────────────────────────────────────────────

const CheckoutContent = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedPromoKey, setAppliedPromoKey] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    instagramUsername: '',
  });

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectedOption = TICKET_OPTIONS.find((o) => o.id === selectedTicket);
  const basePrice = selectedOption ? selectedOption.price : 5;
  const discount = promoApplied ? promoDiscount : 0;
  const total = (basePrice - discount).toFixed(2);

  const handleApplyPromo = () => {
    const key = promoCode.trim().toUpperCase();
    const match = PROMO_CODES[key];
    if (match) {
      setPromoApplied(true);
      setAppliedPromoKey(key);
      setPromoDiscount(match.discount);
      setPromoError(false);
    } else {
      setPromoApplied(false);
      setPromoError(true);
    }
  };

  return (
    <div className='bg-surface min-h-screen'>
      <AnnouncementBar />
      <HomeNav />

      <main className='px-4 sm:px-6 md:px-10 xl:px-20 py-5'>
        <div className='container mx-auto'>
          {/* ── Card ──────────────────────────────────────────────── */}
          <div className='bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(244,133,37,0.05)]'>
            {/* Card header */}
            <div className='flex items-center justify-between px-5 sm:px-8 md:px-10 py-4 sm:py-6 border-b border-[rgba(244,133,37,0.1)]'>
              <div className='flex items-center gap-4'>
                <div className='w-7 h-6 shrink-0'>
                  {/* <img
                    src={IMG_CHECKOUT_TICKET_ICON}
                    alt=''
                    className='w-full h-full object-contain'
                  /> */}
                  <samp className='text-[#F48525]'><Ticket /></samp>
                </div>
                <div>
                  <p className='font-bold text-base sm:text-xl text-heading leading-tight'>
                    {t('checkout.cardTitle')}
                  </p>
                  <p className='font-medium text-xs text-muted leading-4'>
                    {t('checkout.cardSubtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(ROUTES.GIVEAWAY)}
                className='w-10 h-10 bg-[#F485251A] rounded-lg flex items-center justify-center hover:bg-[rgba(244,133,37,0.2)] transition-colors'
              >
                <samp className='text-[#F48525]'><X /></samp>
              </button>
            </div>

            {/* Card body */}
            <div className='px-5 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 flex flex-col gap-6 sm:gap-8'>
              {/* ── Step 1: Ticket quantity ───────────────────────── */}
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <h1 className='font-bold text-2xl sm:text-3xl text-heading leading-tight'>
                    {t('checkout.step1Heading')}
                  </h1>
                  <p className='font-normal text-base text-muted leading-6'>
                    {t('checkout.step1Desc')}
                  </p>
                </div>

                {/* Ticket grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {TICKET_OPTIONS.map((option) => {
                    const isSelected = selectedTicket === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedTicket(option.id)}
                        className={`flex items-center gap-3 p-4 sm:p-5 rounded-xl border-2 text-left transition-colors ${
                          isSelected
                            ? 'bg-[rgba(244,133,37,0.05)] border-primary'
                            : 'bg-white border-[#f1f5f9] hover:border-[rgba(244,133,37,0.3)]'
                        }`}
                      >
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-0.5'>
                            <span className='font-bold text-lg text-heading leading-7'>
                              {t(`checkout.${option.labelKey}`)}
                            </span>
                            {option.badgeKey && (
                              <span className='bg-primary text-white text-xs font-bold uppercase px-2 py-0.5 rounded-full leading-4'>
                                {t(`checkout.${option.badgeKey}`)}
                              </span>
                            )}
                          </div>
                          <p className='font-medium text-base text-muted leading-6'>
                            <span className='font-bold'>€ </span>
                            {t(`checkout.${option.priceKey}`).replace('€ ', '')}
                          </p>
                        </div>
                        {/* Radio */}
                        <div
                          className={`w-6 h-6 rounded-full shrink-0 border-2 flex items-center justify-center ${
                            isSelected ? 'text-primary' : 'border-[#cbd5e1]'
                          }`}
                        >
                          {isSelected && (
                            // <img
                            //   src={IMG_CHECKOUT_RADIO_SELECTED}
                            //   alt=''
                            //   className='w-6 h-6'
                            // />
                            <span><CircleDot /></span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Step 2: Personal details ─────────────────── */}
              <div>
                <h2 className='font-bold text-xl sm:text-2xl text-heading leading-tight mb-4 sm:mb-6'>
                  {t('checkout.step2Heading')}
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {[
                    'fullName',
                    'emailAddress',
                    'phoneNumber',
                    'instagramUsername',
                  ].map((key) => (
                    <div key={key} className='flex flex-col gap-1.5'>
                      <label className='font-semibold text-sm text-heading leading-5'>
                        {t(`checkout.${key}`)}
                      </label>
                      <input
                        type={
                          key === 'emailAddress'
                            ? 'email'
                            : key === 'phoneNumber'
                              ? 'tel'
                              : 'text'
                        }
                        name={key}
                        value={formData[key]}
                        onChange={handleFormChange}
                        placeholder={t(`checkout.${key}`)}
                        className='bg-[#f8fafc] border border-border rounded-lg h-11 px-3 text-base font-normal text-heading placeholder:text-slate-300 placeholder:font-normal outline-none focus:border-primary transition-colors'
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Step 3: Promo code ────────────────────────────── */}
              <div className='border-t border-[#f1f5f9] pt-6 sm:pt-8 flex flex-col gap-4'>
                <h2 className='font-bold text-lg sm:text-xl text-heading leading-7'>
                  {t('checkout.promoTitle')}
                </h2>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                    placeholder={t('checkout.promoPlaceholder')}
                    className={`flex-1 border rounded-lg h-12 px-3 text-base font-normal text-heading placeholder:text-slate-300 placeholder:font-normal outline-none transition-colors ${
                      promoError
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-border focus:border-primary'
                    }`}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className='bg-heading text-white font-bold text-base px-6 rounded-lg hover:bg-[#1e293b] transition-colors'
                  >
                    {t('checkout.promoApply')}
                  </button>
                </div>
                {promoError && (
                  <p className='text-sm text-red-500 font-medium'>
                    {t('checkout.promoInvalid') || 'Ongeldige promotiecode.'}
                  </p>
                )}
                {promoApplied && (
                  <div className='bg-[#f0fdf4] border border-[#dcfce7] rounded-lg px-4 py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <img
                        src={IMG_CHECKOUT_CHECK_GREEN}
                        alt=''
                        className='w-4 h-4'
                      />
                      <span className='font-bold text-sm text-[#15803d] uppercase tracking-wide'>
                        {appliedPromoKey} {t('checkout.promoApplied')}
                      </span>
                    </div>
                    <span className='font-bold text-base text-[#15803d]'>
                      -
                      {promoDiscount.toLocaleString('nl-NL', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Step 4: Payment method ────────────────────────── */}
              <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-lg sm:text-xl text-heading leading-7'>
                  {t('checkout.paymentTitle')}
                </h2>
                <div className='flex gap-4'>
                  {[
                    {
                      id: 'stripe',
                      Icon: Wallet,
                      labelKey: 'payStripe',
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center justify-center gap-3 w-full sm:w-auto sm:px-24 md:px-32 py-4 rounded-xl border-2 transition-colors ${
                        selectedPayment === method.id
                          ? 'border-primary bg-[rgba(244,133,37,0.05)]'
                          : 'border-[#f1f5f9] bg-white hover:border-[rgba(244,133,37,0.3)]'
                      }`}
                    >
                      <method.Icon size={20} className='text-[#2563EB]' />
                      <span className='font-bold text-base text-form-label leading-6'>
                        {t(`checkout.${method.labelKey}`)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Summary & CTA ─────────────────────────────────── */}
              <div className='pt-4'>
                <div className='border-t border-[#f1f5f9] pt-4 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                  <div>
                    <p className='font-medium text-sm text-muted leading-5'>
                      {t('checkout.totalLabel')}
                    </p>
                    <p className='font-black text-2xl sm:text-3xl text-heading leading-tight'>
                      € {total}
                    </p>
                  </div>
                  <button className='bg-primary hover:bg-primary-700 text-white font-black text-base sm:text-lg leading-7 w-full sm:w-auto px-6 sm:px-10 py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_15px_-3px_rgba(244,133,37,0.2),0_4px_6px_-4px_rgba(244,133,37,0.2)] transition-colors'>
                    {t('checkout.ctaButton')}
                    {/* <img
                      src={IMG_CHECKOUT_ARROW_ICON}
                      alt=''
                      className='w-4 h-4'
                    /> */}
                    <ArrowRight />
                  </button>
                </div>
                <p className='text-xs text-subtle text-center leading-4 px-4 sm:px-10'>
                  {t('checkout.disclaimer')}
                </p>
              </div>
            </div>

            {/* Footer links */}
            <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-6 sm:py-8 border-t border-[#f1f5f9]'>
              {['footerRules', 'footerPrivacy', 'footerSupport'].map((key) => (
                <a
                  key={key}
                  href='#'
                  className='font-medium text-sm text-subtle hover:text-primary transition-colors leading-5'
                >
                  {t(`checkout.${key}`)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
});

CheckoutContent.displayName = 'CheckoutContent';

export default CheckoutContent;
