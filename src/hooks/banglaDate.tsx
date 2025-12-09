// banglaDate.ts

const bnDigits: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const bnMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

// number → bangla number
const toBanglaNumber = (value: string | number): string =>
  value.toString().replace(/\d/g, digit => bnDigits[digit]);

// ✅ MAIN FUNCTION
// supports: DD-MM-YYYY
export const formatBanglaDate = (dateStr: string): string => {
  if (!dateStr) return '';

  const [day, month, year] = dateStr.split('-');

  if (!day || !month || !year) return '';

  const bnDay = toBanglaNumber(parseInt(day, 10));
  const bnMonth = bnMonths[parseInt(month, 10) - 1];
  const bnYear = toBanglaNumber(year);

  return `${bnDay} ${bnMonth} ${bnYear}`;
};
