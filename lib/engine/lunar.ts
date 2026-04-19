export type SolarDate = {
  day: number;
  month: number;
  year: number;
};

export type LunarDate = {
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarLeap: number;
  jd: number;
};

export type LunarIdentity = {
  solarText: string;
  lunarText: string;
  canChiYear: string;
  canChiMonth: string;
  canChiDay: string;
  napAm: string;
  nguHanh: string;
};

const CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

const NAP_AM_60: Record<string, { napAm: string; nguHanh: string }> = {
  "Giáp Tý": { napAm: "Hải Trung Kim", nguHanh: "Kim" },
  "Ất Sửu": { napAm: "Hải Trung Kim", nguHanh: "Kim" },
  "Bính Dần": { napAm: "Lư Trung Hỏa", nguHanh: "Hỏa" },
  "Đinh Mão": { napAm: "Lư Trung Hỏa", nguHanh: "Hỏa" },
  "Mậu Thìn": { napAm: "Đại Lâm Mộc", nguHanh: "Mộc" },
  "Kỷ Tỵ": { napAm: "Đại Lâm Mộc", nguHanh: "Mộc" },
  "Canh Ngọ": { napAm: "Lộ Bàng Thổ", nguHanh: "Thổ" },
  "Tân Mùi": { napAm: "Lộ Bàng Thổ", nguHanh: "Thổ" },
  "Nhâm Thân": { napAm: "Kiếm Phong Kim", nguHanh: "Kim" },
  "Quý Dậu": { napAm: "Kiếm Phong Kim", nguHanh: "Kim" },
  "Giáp Tuất": { napAm: "Sơn Đầu Hỏa", nguHanh: "Hỏa" },
  "Ất Hợi": { napAm: "Sơn Đầu Hỏa", nguHanh: "Hỏa" },
  "Bính Tý": { napAm: "Giản Hạ Thủy", nguHanh: "Thủy" },
  "Đinh Sửu": { napAm: "Giản Hạ Thủy", nguHanh: "Thủy" },
  "Mậu Dần": { napAm: "Thành Đầu Thổ", nguHanh: "Thổ" },
  "Kỷ Mão": { napAm: "Thành Đầu Thổ", nguHanh: "Thổ" },
  "Canh Thìn": { napAm: "Bạch Lạp Kim", nguHanh: "Kim" },
  "Tân Tỵ": { napAm: "Bạch Lạp Kim", nguHanh: "Kim" },
  "Nhâm Ngọ": { napAm: "Dương Liễu Mộc", nguHanh: "Mộc" },
  "Quý Mùi": { napAm: "Dương Liễu Mộc", nguHanh: "Mộc" },
  "Giáp Thân": { napAm: "Tuyền Trung Thủy", nguHanh: "Thủy" },
  "Ất Dậu": { napAm: "Tuyền Trung Thủy", nguHanh: "Thủy" },
  "Bính Tuất": { napAm: "Ốc Thượng Thổ", nguHanh: "Thổ" },
  "Đinh Hợi": { napAm: "Ốc Thượng Thổ", nguHanh: "Thổ" },
  "Mậu Tý": { napAm: "Tích Lịch Hỏa", nguHanh: "Hỏa" },
  "Kỷ Sửu": { napAm: "Tích Lịch Hỏa", nguHanh: "Hỏa" },
  "Canh Dần": { napAm: "Tùng Bách Mộc", nguHanh: "Mộc" },
  "Tân Mão": { napAm: "Tùng Bách Mộc", nguHanh: "Mộc" },
  "Nhâm Thìn": { napAm: "Trường Lưu Thủy", nguHanh: "Thủy" },
  "Quý Tỵ": { napAm: "Trường Lưu Thủy", nguHanh: "Thủy" },
  "Giáp Ngọ": { napAm: "Sa Trung Kim", nguHanh: "Kim" },
  "Ất Mùi": { napAm: "Sa Trung Kim", nguHanh: "Kim" },
  "Bính Thân": { napAm: "Sơn Hạ Hỏa", nguHanh: "Hỏa" },
  "Đinh Dậu": { napAm: "Sơn Hạ Hỏa", nguHanh: "Hỏa" },
  "Mậu Tuất": { napAm: "Bình Địa Mộc", nguHanh: "Mộc" },
  "Kỷ Hợi": { napAm: "Bình Địa Mộc", nguHanh: "Mộc" },
  "Canh Tý": { napAm: "Bích Thượng Thổ", nguHanh: "Thổ" },
  "Tân Sửu": { napAm: "Bích Thượng Thổ", nguHanh: "Thổ" },
  "Nhâm Dần": { napAm: "Kim Bạch Kim", nguHanh: "Kim" },
  "Quý Mão": { napAm: "Kim Bạch Kim", nguHanh: "Kim" },
  "Giáp Thìn": { napAm: "Phú Đăng Hỏa", nguHanh: "Hỏa" },
  "Ất Tỵ": { napAm: "Phú Đăng Hỏa", nguHanh: "Hỏa" },
  "Bính Ngọ": { napAm: "Thiên Hà Thủy", nguHanh: "Thủy" },
  "Đinh Mùi": { napAm: "Thiên Hà Thủy", nguHanh: "Thủy" },
  "Mậu Thân": { napAm: "Đại Trạch Thổ", nguHanh: "Thổ" },
  "Kỷ Dậu": { napAm: "Đại Trạch Thổ", nguHanh: "Thổ" },
  "Canh Tuất": { napAm: "Thoa Xuyến Kim", nguHanh: "Kim" },
  "Tân Hợi": { napAm: "Thoa Xuyến Kim", nguHanh: "Kim" },
  "Nhâm Tý": { napAm: "Tang Đố Mộc", nguHanh: "Mộc" },
  "Quý Sửu": { napAm: "Tang Đố Mộc", nguHanh: "Mộc" },
  "Giáp Dần": { napAm: "Đại Khê Thủy", nguHanh: "Thủy" },
  "Ất Mão": { napAm: "Đại Khê Thủy", nguHanh: "Thủy" },
  "Bính Thìn": { napAm: "Sa Trung Thổ", nguHanh: "Thổ" },
  "Đinh Tỵ": { napAm: "Sa Trung Thổ", nguHanh: "Thổ" },
  "Mậu Ngọ": { napAm: "Thiên Thượng Hỏa", nguHanh: "Hỏa" },
  "Kỷ Mùi": { napAm: "Thiên Thượng Hỏa", nguHanh: "Hỏa" },
  "Canh Thân": { napAm: "Thạch Lựu Mộc", nguHanh: "Mộc" },
  "Tân Dậu": { napAm: "Thạch Lựu Mộc", nguHanh: "Mộc" },
  "Nhâm Tuất": { napAm: "Đại Hải Thủy", nguHanh: "Thủy" },
  "Quý Hợi": { napAm: "Đại Hải Thủy", nguHanh: "Thủy" },
};

export function parseBirthDate(input: string): SolarDate | null {
  const [dd, mm, yyyy] = input.split("/");
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);

  if (!day || !month || !year) return null;
  if (day < 1 || day > 31) return null;
  if (month < 1 || month > 12) return null;
  if (year < 1900 || year > 2100) return null;

  return { day, month, year };
}

export function isValidBirthDate(input: string) {
  return parseBirthDate(input) !== null;
}

function INT(d: number) {
  return Math.floor(d);
}

function jdFromDate(dd: number, mm: number, yy: number) {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd =
    dd +
    INT((153 * m + 2) / 5) +
    365 * y +
    INT(y / 4) -
    INT(y / 100) +
    INT(y / 400) -
    32045;

  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}

function getNewMoonDay(k: number, timeZone: number) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  let Jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3;

  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr =
    306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F =
    21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M) -
    0.4068 * Math.sin(Mpr * dr) +
    0.0161 * Math.sin(dr * 2 * Mpr) -
    0.0004 * Math.sin(dr * 3 * Mpr) +
    0.0104 * Math.sin(dr * 2 * F) -
    0.0051 * Math.sin(dr * (M + Mpr)) -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M)) -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr)) +
    0.0010 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  let deltaT;
  if (T < -11) {
    deltaT =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltaT =
      -0.000278 +
      0.000265 * T +
      0.000262 * T2;
  }

  const JdNew = Jd1 + C1 - deltaT;
  return INT(JdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn: number, timeZone: number) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;

  const M =
    357.52910 +
    35999.05030 * T -
    0.0001559 * T2 -
    0.00000048 * T * T2;

  const L0 =
    280.46645 +
    36000.76983 * T +
    0.0003032 * T2;

  let DL =
    (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL +=
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.000290 * Math.sin(dr * 3 * M);

  let L = L0 + DL;
  L *= dr;
  L -= Math.PI * 2 * INT(L / (Math.PI * 2));

  return INT((L / Math.PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number) {
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);

  return i - 1;
}

export function convertSolarToLunar(
  dd: number,
  mm: number,
  yy: number,
  timeZone = 7
): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }

  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return {
    lunarDay,
    lunarMonth,
    lunarYear,
    lunarLeap,
    jd: dayNumber,
  };
}

function getCanChiYear(lunarYear: number) {
  return `${CAN[(lunarYear + 6) % 10]} ${CHI[(lunarYear + 8) % 12]}`;
}

function getCanChiMonth(lunarMonth: number, lunarYear: number) {
  return `${CAN[(lunarYear * 12 + lunarMonth + 3) % 10]} ${CHI[(lunarMonth + 1) % 12]}`;
}

function getCanChiDay(jd: number) {
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function getLunarIdentityFromSolarText(input: string): LunarIdentity {
  const parsed = parseBirthDate(input);

  if (!parsed) {
    return {
      solarText: input,
      lunarText: "Chưa rõ",
      canChiYear: "Chưa rõ",
      canChiMonth: "Chưa rõ",
      canChiDay: "Chưa rõ",
      napAm: "Chưa rõ",
      nguHanh: "Chưa rõ",
    };
  }

  const { day, month, year } = parsed;
  const lunar = convertSolarToLunar(day, month, year, 7);

  const canChiYear = getCanChiYear(lunar.lunarYear);
  const canChiMonth = getCanChiMonth(lunar.lunarMonth, lunar.lunarYear);
  const canChiDay = getCanChiDay(lunar.jd);

  const napAmData = NAP_AM_60[canChiYear] || {
    napAm: "Chưa rõ",
    nguHanh: "Chưa rõ",
  };

  const leapText = lunar.lunarLeap ? " (nhuận)" : "";

  return {
    solarText: `${pad2(day)}/${pad2(month)}/${year}`,
    lunarText: `${pad2(lunar.lunarDay)}/${pad2(lunar.lunarMonth)}/${lunar.lunarYear}${leapText}`,
    canChiYear,
    canChiMonth,
    canChiDay,
    napAm: napAmData.napAm,
    nguHanh: napAmData.nguHanh,
  };
}