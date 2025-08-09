import { toWords } from "number-to-words";

// Khmer language number mappings
const khmerLanguage = {
  units: [
    "សូន្យ", // 0
    "មួយ", // 1
    "ពីរ", // 2
    "បី", // 3
    "បួន", // 4
    "ប្រាំ", // 5
    "ប្រាំមួយ", // 6
    "ប្រាំពីរ", // 7
    "ប្រាំបី", // 8
    "ប្រាំបួន", // 9
  ],
  tens: [
    "", // 0
    "ដប់", // 10
    "ម្ភៃ", // 20
    "សាមសិប", // 30
    "សែសិប", // 40
    "ហាសិប", // 50
    "ហុកសិប", // 60
    "ចិតសិប", // 70
    "ប៉ែតសិប", // 80
    "កៅសិប", // 90
  ],
  hundreds: "រយ",
  thousands: "ពាន់",
  million: "លាន",
};

// Function to convert numbers to Khmer words
function convertNumberToKhmerWords(number) {
  if (number === 0) return khmerLanguage.units[0];

  let words = "";
  let units, tens, hundreds, thousands;

  //  thousands
  if (number >= 1000) {
    thousands = Math.floor(number / 1000);
    words += `${convertNumberToKhmerWords(thousands)}${khmerLanguage.thousands
      }`;
    number %= 1000;
  }

  //  hundreds
  if (number >= 100) {
    hundreds = Math.floor(number / 100);
    words += `${khmerLanguage.units[hundreds]}${khmerLanguage.hundreds}`;
    number %= 100;
  }

  //  tens
  if (number >= 10) {
    tens = Math.floor(number / 10);
    words += `${khmerLanguage.tens[tens]}`;
    number %= 10;
  }

  //  units
  if (number > 0) {
    words += khmerLanguage.units[number];
  }

  return words.trim();
}

export function ConvertToKhmerWordsDollar(amount) {
  const [dollars, cents] = amount?.toFixed(2).split(".");
  return `${convertNumberToKhmerWords(
    parseInt(dollars)
  )}ដុល្លារនិង${convertNumberToKhmerWords(parseInt(cents))}សេនគត់`;
}

export function ConvertToEnglishWordsDollar(amount) {
  const [dollars, cents] = amount?.toFixed(2).split(".");
  return `${toWords(dollars)} USD and ${toWords(cents)} cents only`;
}

export function ConvertToKhmerWordsRiel(amount) {
  const [dollars, cents] = amount?.toFixed(2).split(".");
  return `${convertNumberToKhmerWords(
    parseInt(dollars)
  )} និង ${convertNumberToKhmerWords(parseInt(cents))} រៀល`;
}

export function ConvertToEnglishWordsRiel(amount) {
  const [dollars, cents] = amount?.toFixed(2).split(".");
  return `${toWords(dollars)} and ${toWords(cents)} riel`;
}
