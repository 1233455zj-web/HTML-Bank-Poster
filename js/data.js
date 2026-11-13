/**
 * 排期表配置与产品数据（与 text.md 同步，可按周更新）
 */

const SCHEDULE_CONFIG = {
  titleMonth: 7,
  titleLine1: "湖南银行代销",
  titleLine2: "资管信托7月排期表",
  rangeStart: { month: 7, day: 20 },
  rangeEnd: { month: 7, day: 26 },
  /** 每两周固定产品：每周必展示；交易时间取当周范围内最近开放日（见 formatter.js） */
  biweeklyFixed: {
    name: "湘赢14D001号集合资产管理计划",
    manager: "华安资管",
    openDays: [
      { month: 7, day: 13 },
      { month: 7, day: 27 },
      { month: 8, day: 10 },
    ],
  },
};

const TABLE_COLUMNS = [
  { key: "term", label: "期限", className: "col-term" },
  { key: "name", label: "产品名称", className: "col-name" },
  { key: "manager", label: "产品管理人", className: "col-manager" },
  { key: "risk", label: "风险等级", className: "col-risk" },
  { key: "minAmount", label: "起购金额", className: "col-amount" },
  { key: "tradeTime", label: "交易时间", className: "col-time" },
  { key: "benchmark", label: "业绩报酬计提基准", className: "col-benchmark" },
  { key: "lastReturn", label: "上期兑付收益", className: "col-return" },
];

/** 纯债产品（2026年7月20日-7月26日） */
const pureBondProducts = [
  { term: "每两周", name: "湘赢14D001号集合资产管理计划", manager: "华安资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7月27日", benchmark: "1.70%-2.20%", lastReturn: "1.57%" },
  { term: "1个月", name: "湘赢1M001号集合资产管理计划", manager: "华安资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/14 - 7/20", benchmark: "1.90%-2.40%", lastReturn: "1.61%" },
  { term: "3个月", name: "湘赢3M003号集合资产管理计划", manager: "华安资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/20 - 7/24", benchmark: "2.10%-2.60%", lastReturn: "2.32%" },
  { term: "6个月", name: "湘赢6M001号集合资产管理计划", manager: "华安资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/20 - 7/24", benchmark: "2.40%", lastReturn: "2.81%" },
  { term: "6个月", name: "财富6个月定期开放(001期)集合资产管理计划", manager: "财信证券", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/24 - 7/31", benchmark: "2.20%", lastReturn: "1.76%" },
  { term: "9个月", name: "开元湘盛5号集合资金信托计划（第2期）（到期）", manager: "华鑫信托", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7月21日（到期日）", benchmark: "/", lastReturn: "首期运作中" },
  { term: "9个月", name: "财富9个月定期开放(002期)集合资产管理计划", manager: "财信证券", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/14 - 7/20", benchmark: "2.20%", lastReturn: "2.70%" },
  { term: "1年", name: "湘信聚财1号集合资金信托计划", manager: "财信信托", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/15 - 7/21", benchmark: "2.40%", lastReturn: "3.38%" },
  { term: "1年", name: "年年鑫5号集合资产管理计划", manager: "财信证券", risk: "R3（中等风险)", minAmount: "40 万元", tradeTime: "7/21 - 7/27", benchmark: "2.40%", lastReturn: "3.25%" },
  { term: "1年半", name: "创融31号集合资产管理计划", manager: "首创证券", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/21 - 7/27", benchmark: "2.60%", lastReturn: "5.70%" },
  { term: "2年", name: "中粮信托-国元元赢3号集合资金信托计划（第1期）", manager: "中粮信托", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/14 - 7/20", benchmark: "3.00%", lastReturn: "首发" },
  { term: "2年", name: "创融35号集合资产管理计划", manager: "首创证券", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/16 - 7/22", benchmark: "2.70%", lastReturn: "4.86%" },
];

/** 固收增强产品 */
const fixedIncomeEnhancedProducts = [
  { term: "12个月", name: "国联鑫湘联7号集合资产管理计划", manager: "国联资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/23 - 7/29", benchmark: "2.50%-3.00%", lastReturn: "首发" },
  { term: "36个月", name: "湘赢36M045号集合资产管理计划", manager: "华安资管", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/16 - 7/22", benchmark: "3.15%-3.55%", lastReturn: "首发" },
];

/** 固收+产品 */
const fixedIncomePlusProducts = [
  { term: "12个月", name: "创赢优势策略精选103号集合资产管理计划", manager: "首创证券", risk: "R3（中等风险)", minAmount: "100 万元", tradeTime: "7/14 - 7/20", benchmark: "1.80%-5.25%", lastReturn: "3.34%" },
  { term: "12个月", name: "创赢优势策略精选110号集合资产管理计划", manager: "首创证券", risk: "R3（中等风险)", minAmount: "100 万元", tradeTime: "7/21 - 7/27", benchmark: "1.80%-5.25%", lastReturn: "3.77%" },
  { term: "24个月", name: "湘信金鹏HN24M001号集合资金信托计划（第二期）", manager: "财信信托", risk: "R3（中等风险)", minAmount: "30 万元", tradeTime: "7/14 - 7/20", benchmark: "2.70%-5.00%", lastReturn: "首发" },
];

const PRODUCT_SECTIONS = [
  { id: "pure-bond", title: "纯债产品", products: pureBondProducts },
  { id: "fixed-enhanced", title: "固收增强产品", products: fixedIncomeEnhancedProducts },
  { id: "fixed-plus", title: "固收+产品", products: fixedIncomePlusProducts },
];

const TIPS_ITEMS = [
  {
    red: true,
    text: "本材料所示资管信托产品均为私募产品，仅供合格投资者参阅，为保证服务质量、控制投资风险，请勿在朋友圈等公开渠道转发。合格投资者认定标准为具有不少于2年投资经历，家庭金融资产不低于500万元，或家庭金融净资产不低于300万元或个人近3年年均收入不低于40万元的投资者。",
  },
  {
    red: true,
    text: "业绩报酬计提基准仅是计算管理人业绩报酬的依据，不作为管理人保证投资本金不受损失或取得最低收益的承诺。",
  },
  "资管信托产品由相应的证券（子）公司、信托公司发行和管理，湖南银行作为代销机构不承担产品的投资、兑付责任。",
  "最终发行安排以发行通知为准，具体产品要素以产品合同约定为准。",
  "市场有风险，投资须谨慎。",
];

const CARD_NOTE =
  "注：产品过往业绩不代表其未来表现，不等于产品实际收益，投资须谨慎。";
