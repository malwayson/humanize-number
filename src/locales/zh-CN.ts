import { LocaleConfig } from "../types";

export const zhCN: LocaleConfig = {
  code: "zh-CN",
  decimal: ".",
  thousands: ",",
  units: {},
  suffixes: {
    thousand: "千",
    million: "百万",
    billion: "十亿",
    trillion: "万亿",
  },
};

export default zhCN;
