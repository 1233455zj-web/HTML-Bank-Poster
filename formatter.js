/**
 * 银行海报 · 字段格式化与排序规范
 *
 * 供数据录入、校验与渲染时参照；规范条文不可擅自改动。
 * @see text.md 原始表格数据
 */

const FORMATTER_CONFIG = {
  /** 规范空格：相对普通空格缩小 20%（显示宽度 80%） */
  spacing: {
    scale: 0.8,
    rules: ["含空格的内容使用 fmt-space，显示宽度为普通空格的 80%"],
  },

  /** 产品名称 */
  productName: {
    description: "产品名称",
    rules: [
      "产品代号与「号」前后加空格，如：湘赢 3M006 号",
      "含「集合资产管理计划」：在「号」后换行，整段计划名称在下一行",
      "含「集合资金信托计划」：在「资金信托计划」前断行，「集合」留在代号行（见图1）",
      "特例「开元湘盛…号集合资金信托计划」且后缀含多个括号（如（第1期）（到期））：号后、计划名后各换行，括号段单独成行；括号段使用半角括号，段间一个空格（如 (第1期) (到期)）",
      "特例「华福安泰福湘…号集合资金信托计划」：「集合」与代号同一行，在「资金信托计划」前断行",
      "信托计划且代号含字母：品牌名单独一行；代号仅数字：品牌与代号同一行",
      "「首创证券创赢…」类名称去掉首部「首创证券」，保留创赢…主体",
      "名称中产品管理人不显示：先去掉首部「管理人-」（可重复），再去掉紧接的重复管理人名称（如「财信证券-财信证券年年鑫」→「年年鑫」）",
    ],
    examples: [
      { input: "湘赢3M006号", output: "湘赢 3M006 号" },
      { input: "财信证券年年鑫1号", output: "财信证券年年鑫 1 号" },
      { input: "湘信聚合SG24M004号", output: "湘信聚合 SG24M004 号" },
      {
        input: "融享12M005号集合资产管理计划",
        output: "融享 12M005 号\n集合资产管理计划",
      },
      {
        input: "万融添利12号集合资产管理计划",
        output: "万融添利 12 号\n集合资产管理计划",
      },
      {
        input: "首创证券创赢优势策略精选102号集合资产管理计划",
        output: "创赢优势策略精选 102 号\n集合资产管理计划",
      },
      {
        input: "湘信聚合ZX24M002号集合资金信托计划",
        output: "湘信聚合\nZX24M002 号集合\n资金信托计划",
      },
      {
        input: "湘信金鹏HN18M003号集合资金信托计划（第七期）",
        output: "湘信金鹏\nHN18M003 号集合\n资金信托计划（第七期）",
      },
      {
        input: "开元湘盛4号集合资金信托计划（第1期）（到期）",
        output: "开元湘盛 4 号\n集合资金信托计划\n(第1期) (到期)",
      },
      {
        input: "华鑫信托-开元湘盛4号集合资金信托计划（第1期）（到期）",
        manager: "华鑫信托",
        output: "开元湘盛 4 号\n集合资金信托计划\n(第1期) (到期)",
      },
      {
        input: "华福安泰福湘1号集合资金信托计划（第6期）",
        output: "华福安泰福湘 1 号集合\n资金信托计划（第6期）",
      },
      {
        input: "中粮信托-中粮信托-华福安泰福湘1号集合资金信托计划（第6期）",
        manager: "中粮信托",
        output: "华福安泰福湘 1 号集合\n资金信托计划（第6期）",
      },
      {
        input: "中粮信托-中粮信托-国元元赢2号集合资金信托计划（第1期）",
        manager: "中粮信托",
        output: "国元元赢 2 号\n集合资金信托计划（第1期）",
      },
      {
        input: "财信证券-财信证券年年鑫1号集合资产管理计划",
        manager: "财信证券",
        output: "年年鑫 1 号\n集合资产管理计划",
      },
    ],
  },

  /** 1. 期限字段 */
  term: {
    description: "期限字段",
    allowedValues: [
      "每两周",
      "1个月",
      "3个月",
      "6个月",
      "9个月",
      "1年",
      "1年半",
      "2年",
      "3年",
    ],
    rules: ["统一格式为：1个月、3个月、6个月、9个月、1年、1年半、2年、3年", "不要带括号和英文"],
  },

  /** 2. 风险等级字段 */
  riskLevel: {
    description: "风险等级字段",
    examples: ["R2(中低风险)", "R3(中等风险)", "R4(中高风险)", "R5(高风险)"],
    rules: [
      "统一格式为：R2(中低风险)、R3(中等风险)、R4(中高风险)、R5(高风险)",
      "格式要求：R数字（中文风险等级) — 英文半角括号，右括号前无空格，一行显示，不换行",
    ],
  },

  /** 3. 起购金额 */
  minAmount: {
    description: "起购金额",
    example: "30 万元",
    rules: [
      "统一格式为：30 万元（数字与“万元”之间加空格）",
      "空格显示宽度为普通空格的 80%（缩小 20%）",
      "整数不加小数点",
    ],
  },

  /** 4. 交易时间 */
  tradeTime: {
    description: "交易时间",
    variants: {
      normal: {
        name: "普通格式",
        pattern: "月/日 - 月/日",
        example: "5/12 - 5/18",
        rules: [
          "去除年份",
          "去掉月份和日期的前导零",
          "横线两侧加空格",
          "空格显示宽度为普通空格的 80%（缩小 20%）",
        ],
      },
      singleDay: {
        name: "单日格式",
        pattern: "月/日",
        example: "5/18",
        rules: ["不加横线"],
      },
      maturity: {
        name: "到期日格式",
        pattern: "X月X日（到期日）",
        example: "5月18日（到期日）",
        display: {
          lines: 2,
          line1: "X月X日",
          line2: "（到期日）",
        },
        rules: ["需两行显示，第一行显示X月X日，第二行显示（到期日）"],
      },
      liquidation: {
        name: "清盘日格式",
        pattern: "X月X日（清盘日）",
        example: "4月27日（清盘日）",
        display: {
          lines: 2,
          line1: "X月X日",
          line2: "（清盘日）",
        },
        rules: ["需两行显示，第一行显示X月X日，第二行显示（清盘日）"],
      },
      biweekly: {
        name: "每两周格式",
        pattern: "X月X日",
        example: "6月1日",
        rules: [
          "期限字段为「每两周」时使用",
          "统一为中文日期：月与日之间不加前导零，如 6月1日、12月24日",
          "单日显示，不加横线",
          "湘赢14D001号集合资产管理计划为纯债区块固定行，每周海报必展示，不受交易区间筛选影响",
          "其交易时间取排期表当周日期范围内最近的开放日：区间内有开放日则用该日；区间内无开放日则取与区间距离最小的开放日（如 6月8日-6月14日 对应 6月15日）",
        ],
        fixedProduct: {
          name: "湘赢14D001号集合资产管理计划",
          manager: "华安资管",
          term: "每两周",
        },
      },
    },
  },

  /** 5. 业绩报酬计提基准（单元格内容单行；表头仍为双行） */
  performanceBenchmark: {
    description: "业绩报酬计提基准",
    display: { lines: 1, scope: "cell" },
    rules: ["单元格内容一行显示，不换行"],
    variants: {
      range: {
        name: "区间格式",
        pattern: "X.XX% - X.XX%",
        rules: [
          "保留两位小数",
          "横线两侧加空格",
          "空格显示宽度为普通空格的 80%（缩小 20%）",
        ],
      },
      fixed: {
        name: "固定值格式",
        pattern: "X.XX%",
        rules: ["保留两位小数"],
      },
      pending: {
        name: "待定格式",
        value: "待定",
        rules: ["保持原样"],
      },
    },
  },

  /** 6. 上期兑付收益（单元格内容单行；表头仍为双行） */
  lastReturn: {
    description: "上期兑付收益",
    display: { lines: 1, scope: "cell" },
    rules: ["单元格内容一行显示，不换行"],
    variants: {
      percentage: {
        name: "数字格式",
        pattern: "X.XX%",
        rules: ["必须保留两位小数"],
      },
      firstIssue: {
        name: "首发",
        value: "首发",
        rules: ["保持不变", "颜色为红色"],
      },
      firstOperation: {
        name: "首期运作中",
        value: "首期运作中",
        rules: ["加粗"],
      },
    },
  },

  /** 7. 排序规则 */
  sortRules: {
    description: "排序规则",
    blocks: {
      pureBond: {
        name: "纯债产品区块排序规则",
        levels: [
          {
            layer: "第一层（期限）",
            rule: "按期限从短到长排列",
            order: ["每两周", "1个月", "3个月", "6个月", "9个月", "1年", "1年半", "2年", "3年"],
          },
          {
            layer: "第二层（同期限内）",
            rule: "按交易开始日期从早到晚排列",
          },
        ],
      },
      fixedEnhanced: {
        name: "固收增强产品区块排序规则",
        levels: [
          {
            layer: "第一层（期限）",
            rule: "按期限从短到长排列",
            order: ["12个月", "18个月", "24个月", "36个月"],
          },
          {
            layer: "第二层（同期限内）",
            rule: "按交易开始日期从早到晚排列",
          },
        ],
      },
      fixedPlus: {
        name: "固收+产品区块排序规则",
        levels: [
          {
            layer: "第一层（期限）",
            rule: "按期限从短到长排列",
            order: ["12个月", "18个月", "24个月", "36个月"],
          },
          {
            layer: "第二层（同期限内）",
            rule: "按交易开始日期从早到晚排列",
          },
        ],
      },
    },
  },
};

/** 区块标题 → sortRules.blocks 键名 */
const SECTION_SORT_KEYS = {
  纯债产品: "pureBond",
  固收增强产品: "fixedEnhanced",
  "固收+产品": "fixedPlus",
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const RANGE_SEP = " - ";
const RANGE_SEP_RE = /\s+-\s+/;

/** 横线两侧统一为「空格 + - + 空格」（解析用普通空格，输出时再收紧） */
function spaceAroundDash(str) {
  return String(str)
    .replace(/\s*[-－—–~至到]\s*/g, RANGE_SEP)
    .replace(/\s+-\s+/g, RANGE_SEP)
    .trim();
}

/** 将已转义文本中的普通空格替换为缩窄 20% 的 fmt-space */
function applyTightSpaces(escapedText) {
  if (!escapedText.includes(" ")) return escapedText;
  return escapedText.replace(/ /g, '<span class="fmt-space" aria-hidden="true"></span>');
}

function stripLeadingZerosInSlashDate(part) {
  const m = String(part)
    .trim()
    .replace(/^\d{4}[./-]/, "")
    .match(/^(\d{1,2})[./](\d{1,2})$/);
  if (!m) return part.trim();
  return `${parseInt(m[1], 10)}/${parseInt(m[2], 10)}`;
}

function formatPercent(num, decimals) {
  const n = parseFloat(String(num).replace(/%/g, ""));
  if (Number.isNaN(n)) return null;
  return `${n.toFixed(decimals)}%`;
}

/** 单元格内容单行展示（不换行、不插入 <br>；表头排版不受影响） */
function wrapSingleLine(html) {
  return `<span class="cell-single-line">${html}</span>`;
}

/** 将日期片段格式化为「X月X日」（去前导零） */
function formatCnMonthDay(month, day) {
  return `${parseInt(month, 10)}月${parseInt(day, 10)}日`;
}

/** 每两周：交易时间统一为「X月X日」单日格式 */
function formatBiweeklyTradeTime(value) {
  const v = String(value).trim().replace(/^\d{4}[./-]/, "");

  const cn = v.match(/^(\d{1,2})月(\d{1,2})日$/);
  if (cn) return formatCnMonthDay(cn[1], cn[2]);

  const slash = v.match(/^(\d{1,2})[./](\d{1,2})$/);
  if (slash) return formatCnMonthDay(slash[1], slash[2]);

  return null;
}

function parseTradeStartSortKey(tradeTime) {
  const v = String(tradeTime).trim();
  const first = spaceAroundDash(v).split(RANGE_SEP)[0];

  const slash = first.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (slash) {
    return parseInt(slash[1], 10) * 100 + parseInt(slash[2], 10);
  }

  const cn = first.match(/^(\d{1,2})月(\d{1,2})日/);
  if (cn) {
    return parseInt(cn[1], 10) * 100 + parseInt(cn[2], 10);
  }

  return 99999;
}

function effectiveTermAt(products, index) {
  for (let i = index; i >= 0; i -= 1) {
    if (products[i].term) return products[i].term;
  }
  return "";
}

function rebuildTermRowspan(rows) {
  if (!rows.length) return [];

  const groups = [];
  let group = [];
  let groupTerm = null;

  rows.forEach((row) => {
    const term = row.term || groupTerm;
    if (group.length && term !== groupTerm) {
      groups.push({ term: groupTerm, items: group });
      group = [];
    }
    groupTerm = term;
    const copy = { ...row };
    delete copy.term;
    delete copy.termRowspan;
    group.push(copy);
  });
  if (group.length) groups.push({ term: groupTerm, items: group });

  const out = [];
  groups.forEach(({ term, items }) => {
    items.forEach((item, idx) => {
      if (idx === 0) {
        const head = { ...item, term };
        if (items.length > 1) head.termRowspan = items.length;
        out.push(head);
      } else {
        out.push(item);
      }
    });
  });
  return out;
}

const TRUST_PLAN_CORE = "集合资金信托计划";
const AM_PLAN_CORE = "集合资产管理计划";
const PRODUCT_PLAN_SUFFIXES = [AM_PLAN_CORE, TRUST_PLAN_CORE];

/** 去掉首部「首创证券」（仅当后接「创赢」时） */
function stripChuangtouPrefix(name) {
  return String(name).replace(/^首创证券(?=创赢)/, "");
}

/**
 * 去掉名称中的产品管理人展示段
 * 1. 首部「管理人-」可重复去除
 * 2. 去横线后仍以管理人名称开头则再剥一层（如财信证券-财信证券年年鑫）
 */
function stripManagerPrefix(name, manager) {
  if (!manager) return String(name).trim();
  let n = String(name).trim();
  const m = String(manager).trim();
  if (!m) return n;
  const hyphenPrefix = `${m}-`;
  while (n.startsWith(hyphenPrefix)) {
    n = n.slice(hyphenPrefix.length);
  }
  while (n.startsWith(m)) {
    n = n.slice(m.length);
    if (n.startsWith("-")) n = n.slice(1);
  }
  return n;
}

/** 解析「…前缀…代号…号（可选括号）」 */
function parseProductNameHead(head) {
  const m = String(head)
    .trim()
    .match(/^(.+?)([A-Za-z]*\d+[A-Za-z0-9]*)\s*号(\s*（[^）]*）)?\s*$/);
  if (!m) return null;
  return { prefix: m[1].trim(), code: m[2], paren: m[3] || "" };
}

/** 无计划后缀的单行名称 */
function formatProductNameSingle(parsed) {
  const { prefix, code, paren } = parsed;
  return `${escapeHtml(prefix)} <span class="nobreak">${escapeHtml(`${code} 号${paren}`)}</span>`;
}

/** 集合资产管理计划：号后换行，计划名称独占一行 */
function formatProductNameAmPlan(parsed, planLine) {
  const { prefix, code, paren } = parsed;
  return `${escapeHtml(prefix)} <span class="nobreak">${escapeHtml(`${code} 号${paren}`)}</span><br>${escapeHtml(planLine)}`;
}

/**
 * 集合资金信托计划（图1）：断行在「资金信托计划」前，「集合」与代号同行
 * 代号含字母 → 三行（品牌 / 代号 号集合 / 资金信托计划…）
 * 代号纯数字 → 两行（品牌 代号 号集合 / 资金信托计划…）
 */
function formatProductNameTrustPlan(parsed, planTail) {
  const { prefix, code, paren } = parsed;
  const planLine = `集合资金信托计划${planTail}`;
  const codeWithJihe = `${code} 号集合`;

  if (/[A-Za-z]/.test(code)) {
    return (
      `${escapeHtml(prefix)}<br>` +
      `<span class="nobreak">${escapeHtml(codeWithJihe)}</span><br>` +
      escapeHtml(`资金信托计划${planTail}`)
    );
  }

  return (
    `${escapeHtml(prefix)} <span class="nobreak">${escapeHtml(`${code} 号${paren}`)}</span><br>` +
    escapeHtml(planLine)
  );
}

/** 多个括号段：半角括号，段间一个空格（fmt-space 缩窄 20%） */
function formatParenSegments(suffix) {
  const normalized = String(suffix)
    .replace(/（/g, "(")
    .replace(/）/g, ")");
  const segments = normalized.match(/\([^)]*\)/g);
  if (!segments || !segments.length) return escapeHtml(normalized);
  return applyTightSpaces(escapeHtml(segments.join(" ")));
}

/** 产品名称排版特例（优先于通用信托/资管规则） */
function tryProductNameSpecialCase(text) {
  const t = String(text).trim();

  const kaiyuan = t.match(/^开元湘盛(\d+)\s*号集合资金信托计划((?:[（(][^）)]*[）)])+)$/);
  if (kaiyuan) {
    const [, num, suffix] = kaiyuan;
    return (
      `${escapeHtml("开元湘盛")} <span class="nobreak">${escapeHtml(`${num} 号`)}</span><br>` +
      `${escapeHtml("集合资金信托计划")}<br>` +
      formatParenSegments(suffix)
    );
  }

  const huafu = t.match(/^华福安泰福湘(\d+)\s*号集合资金信托计划(.*)$/);
  if (huafu) {
    const [, num, tail] = huafu;
    return (
      `${escapeHtml("华福安泰福湘")} <span class="nobreak">${escapeHtml(`${num} 号集合`)}</span><br>` +
      escapeHtml(`资金信托计划${tail}`)
    );
  }

  return null;
}

function splitProductPlanSuffix(name) {
  for (let i = 0; i < PRODUCT_PLAN_SUFFIXES.length; i += 1) {
    const suffix = PRODUCT_PLAN_SUFFIXES[i];
    const idx = name.indexOf(suffix);
    if (idx !== -1) {
      return {
        head: name.slice(0, idx),
        planType: suffix === TRUST_PLAN_CORE ? "trust" : "am",
        planTail: name.slice(idx + suffix.length),
      };
    }
  }
  return { head: name, planType: "", planTail: "" };
}

const FORMATTERS = {
  escapeHtml,

  /**
   * 产品名称排版
   * @param {string} name
   * @param {string} [manager] 用于去除名称首部重复的管理人前缀
   */
  productName(name, manager) {
    if (name == null || name === "") return "";
    const text = stripManagerPrefix(
      stripChuangtouPrefix(String(name).trim()),
      manager
    );
    const special = tryProductNameSpecialCase(text);
    if (special) return special;

    const { head, planType, planTail } = splitProductPlanSuffix(text);
    const parsed = parseProductNameHead(head);

    if (!planType) {
      return parsed ? formatProductNameSingle(parsed) : escapeHtml(head);
    }
    if (!parsed) {
      const fallback = planType === "trust" ? TRUST_PLAN_CORE : AM_PLAN_CORE;
      return `${escapeHtml(head)}<br>${escapeHtml(fallback + planTail)}`;
    }
    if (planType === "trust") {
      return formatProductNameTrustPlan(parsed, planTail);
    }
    return formatProductNameAmPlan(parsed, AM_PLAN_CORE + planTail);
  },

  /** 1. 期限：去括号/英文，保留规范写法 */
  term(value) {
    if (value == null || value === "") return "";
    return escapeHtml(
      String(value)
        .trim()
        .replace(/[（(][^）)]*[）)]/g, "")
        .replace(/[A-Za-z]+/g, "")
        .trim()
    );
  },

  /** 2. 风险等级：半角括号、右括号前无空格、单行 */
  riskLevel(value) {
    if (value == null || value === "") return "";
    let s = String(value).trim();
    s = s.replace(/（/g, "(").replace(/）/g, ")");
    s = s.replace(/\s+\)/g, ")");
    s = s.replace(/(R\d+)\s*\(/g, "$1(");
    return escapeHtml(s);
  },

  /** 3. 起购金额：数字与「万元」之间加空格，整数无小数 */
  minAmount(value) {
    if (value == null || value === "") return "";
    const m = String(value)
      .trim()
      .replace(/\s+/g, "")
      .match(/^(\d+(?:\.\d+)?)\s*万\s*元$/);
    if (!m) return escapeHtml(String(value).trim());
    const num = parseFloat(m[1]);
    const display = Number.isInteger(num) ? String(Math.round(num)) : String(num);
    return applyTightSpaces(escapeHtml(`${display} 万元`));
  },

  /** 4. 交易时间：区间/单日/到期日/清盘日/每两周 */
  tradeTime(value, term) {
    if (value == null || value === "") return "";
    const v = String(value).trim();

    if (String(term || "").trim() === "每两周") {
      const biweekly = formatBiweeklyTradeTime(v);
      if (biweekly) return escapeHtml(biweekly);
    }

    const maturity = v.match(/^(\d{1,2})月(\d{1,2})日\s*[（(]到期日[）)]\s*$/);
    if (maturity) {
      const m = parseInt(maturity[1], 10);
      const d = parseInt(maturity[2], 10);
      return `${escapeHtml(`${m}月${d}日`)}<br>${escapeHtml("（到期日）")}`;
    }

    const liquidation = v.match(/^(\d{1,2})月(\d{1,2})日\s*[（(]清盘日[）)]\s*$/);
    if (liquidation) {
      const m = parseInt(liquidation[1], 10);
      const d = parseInt(liquidation[2], 10);
      return `${escapeHtml(`${m}月${d}日`)}<br>${escapeHtml("（清盘日）")}`;
    }

    const normalized = spaceAroundDash(v.replace(/^\d{4}[./-]/, ""));
    const parts = normalized.split(RANGE_SEP).filter(Boolean);

    if (parts.length >= 2 && /^\d{1,2}\/\d{1,2}$/.test(parts[0].trim())) {
      const start = stripLeadingZerosInSlashDate(parts[0]);
      const end = stripLeadingZerosInSlashDate(parts[parts.length - 1]);
      return applyTightSpaces(escapeHtml(`${start}${RANGE_SEP}${end}`));
    }

    const slashSingle = normalized.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (slashSingle) {
      return escapeHtml(stripLeadingZerosInSlashDate(normalized));
    }

    const cnSingle = normalized.match(/^(\d{1,2})月(\d{1,2})日$/);
    if (cnSingle) {
      return escapeHtml(
        `${parseInt(cnSingle[1], 10)}月${parseInt(cnSingle[2], 10)}日`
      );
    }

    return escapeHtml(v);
  },

  /** 5. 业绩报酬计提基准（单行） */
  performanceBenchmark(value) {
    if (value == null || value === "") return "";
    const v = String(value).trim();
    if (v === FORMATTER_CONFIG.performanceBenchmark.variants.pending.value || v === "/") {
      return wrapSingleLine(escapeHtml(v));
    }

    const spaced = spaceAroundDash(v);
    const parts = spaced.split(RANGE_SEP).filter(Boolean);

    if (parts.length >= 2) {
      const low = formatPercent(parts[0], 2);
      const high = formatPercent(parts[parts.length - 1], 2);
      if (low && high) {
        return wrapSingleLine(applyTightSpaces(escapeHtml(`${low}${RANGE_SEP}${high}`)));
      }
    }

    const single = formatPercent(parts[0], 2);
    if (single) return wrapSingleLine(escapeHtml(single));

    return wrapSingleLine(escapeHtml(v));
  },

  /**
   * 6. 上期兑付收益（单行）
   * @returns {{ html: string, classSuffix: string }}
   */
  lastReturn(value) {
    const v = String(value == null ? "" : value).trim();
    const firstIssue =
      FORMATTER_CONFIG.lastReturn.variants.firstIssue.value;
    const firstOperation =
      FORMATTER_CONFIG.lastReturn.variants.firstOperation.value;

    if (v === firstIssue) {
      return {
        html: wrapSingleLine(escapeHtml(firstIssue)),
        classSuffix: " is-first-issue",
      };
    }
    if (v === firstOperation) {
      return {
        html: wrapSingleLine(escapeHtml(firstOperation)),
        classSuffix: " is-first-period",
      };
    }

    const pct = formatPercent(v, 2);
    return {
      html: wrapSingleLine(escapeHtml(pct || v)),
      classSuffix: "",
    };
  },

  /** 7. 按区块排序并重建 termRowspan */
  sortProducts(products, blockKey) {
    const block = FORMATTER_CONFIG.sortRules.blocks[blockKey];
    if (!block || !products.length) return products.slice();

    const termOrder = block.levels[0].order;
    const termRank = (term) => {
      const idx = termOrder.indexOf(term);
      return idx === -1 ? termOrder.length : idx;
    };

    const sorted = products
      .map((row, index) => ({
        row,
        term: row.term || effectiveTermAt(products, index),
        tradeStart: parseTradeStartSortKey(row.tradeTime || ""),
      }))
      .sort((a, b) => {
        const byTerm = termRank(a.term) - termRank(b.term);
        if (byTerm !== 0) return byTerm;
        return a.tradeStart - b.tradeStart;
      })
      .map(({ row, term }) => ({ ...row, term: row.term || term }));

    return rebuildTermRowspan(sorted);
  },

  sortKeyForSection(title) {
    return SECTION_SORT_KEYS[title] || null;
  },
};
