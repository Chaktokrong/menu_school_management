import moment from "moment";

export function getKhmerNumber(number) {
  let numArr = number?.toString()?.split("");

  let numberKh = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  let newArr = [];

  for (let i = 0; i < numArr?.length; i++) {
    if (isNaN(parseFloat(numArr[i]))) {
      newArr.push(numArr[i]);
      continue;
    }
    newArr.push(numberKh[numArr[i]]);
  }
  return newArr?.join("");
}

export const getDateRangeByStartEnd = (start, end) => {
  var dateStart = moment(start);
  var dateEnd = moment(end);
  var timeValues = [];

  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    timeValues.push(dateStart.format("YYYY-MM-DD"));
    dateStart.add(1, "month");
  }
  return timeValues;
};

export function getKhmerMonth(date) {
  if (date === "January") return "មករា";
  if (date === "February") return "កុម្ភៈ";
  if (date === "March") return "មិនា";
  if (date === "April") return "មេសា";
  if (date === "May") return "ឧសភា";
  if (date === "June") return "មិថុនា";
  if (date === "July") return "កក្កដា";
  if (date === "August") return "សីហា";
  if (date === "September") return "កញ្ញា";
  if (date === "October") return "តុលា";
  if (date === "November") return "វិច្ឆិកា";
  if (date === "December") return "ធ្នូ";

  const month = parseFloat(date);

  if (month === 1) return "មករា";
  if (month === 2) return "កុម្ភៈ";
  if (month === 3) return "មិនា";
  if (month === 4) return "មេសា";
  if (month === 5) return "ឧសភា";
  if (month === 6) return "មិថុនា";
  if (month === 7) return "កក្កដា";
  if (month === 8) return "សីហា";
  if (month === 9) return "កញ្ញា";
  if (month === 10) return "តុលា";
  if (month === 11) return "វិច្ឆិកា";
  if (month === 12) return "ធ្នូ";

  return month;
}

export function getKhmerDay(day) {
  let khDay;
  switch (day) {
    case "Monday":
      khDay = "ចន្ទ";
      break;
    case "Tuesday":
      khDay = "អង្គារ";
      break;
    case "Wednesday":
      khDay = "ពុធ";
      break;
    case "Thursday":
      khDay = "ព្រហស្បតិ៍";
      break;
    case "Friday":
      khDay = "សុក្រ";
      break;
    case "Saturday":
      khDay = "សៅរ៍";
      break;
    case "Sunday":
      khDay = "អាទិត្យ";
  }
  return khDay;
}

export function calculateNumberOfDay(borrowing_date, first_payment_date) {
  // console.log(borrowing_date, first_payment_date)
  var Difference_In_Time =
    first_payment_date.getTime() - borrowing_date.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // console.log(Difference_In_Days)

  return Difference_In_Days;
}

export function getFormattedPhoneNum(input) {
  let output = "";
  input.replace(
    /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
    function (match, g1, g2, g3) {
      if (g1.length) {
        output += g1;
        if (g1.length == 3) {
          output += "";
          if (g2.length) {
            output += " " + g2;
            if (g2.length == 3) {
              output += " ";
              if (g3.length) {
                output += g3;
              }
            }
          }
        }
      }
    }
  );
  return output;
}

export function currencyFormat(num) {
  return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function currencyFormatRiel(num) {
  return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function increaseNumber(num) {
  let numFormat = num.split(".");
  // console.log("num::", numFormat);
  return num.toFixed(2);
}

// Khmer month name
const khmerMonths = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

// get Khmer month name
export const getKhmerMonthName = (date) => {
  const monthIndex = date ? new Date(date).getMonth() : 0;
  return khmerMonths[monthIndex];
};

export const getKhmerYear = (date) => {
  if (!date) return "";
  const year = new Date(date).getFullYear().toString();
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return year
    .split("")
    .map((digit) => khmerDigits[digit])
    .join("");
};

export const padStartINV = (num) => {
  const number = num || 0;
  const formatted = "INV" + number?.toString()?.padStart(6, "0");
  return formatted;
};

export function getKhmerDate(date) {
  return (
    getKhmerNumber(new Date(date).getDate()) +
    " " +
    getKhmerMonthName(date) +
    " " +
    getKhmerYear(date)
  );
}

export function generateInvoiceNumber(invNumber) {
  const prefix = "INV";
  const yearCode = new Date().getFullYear().toString().slice(-2); // "25" for 2025
  const number = String(invNumber).padStart(6, "0"); // "00001"
  return `${prefix}${yearCode}${number}`;
}
