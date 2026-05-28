# 银行海报 · 产品表格设计规格

> **用途**：供 AI / 开发按像素还原「外卡片 + 内表格」组件。  
> **范围**：仅描述表格卡片区域样式，不含海报顶栏、背景、分类标题 PNG。  
> **单位**：未注明均为 `px`；颜色为 `#RRGGBB`（大写）。

---

## 1. 组件层级

```
poster-card（外卡片）
├── border-stack ×5（外描边，3px，多层渐变叠加）
├── poster-card__inner（内卡片 / 表格容器）
│   ├── table-shell（圆角裁切 + 表格外框）
│   │   └── product-grid（8 列 CSS Grid）
│   │       ├── thead → .product-grid__th
│   │       └── tbody → .product-grid__td
│   └── poster-card__note（卡片底部注释）
```

---

## 2. 设计令牌（Design Tokens）

```yaml
# 尺寸
outer_card:
  width: 692
  height: auto          # 随表格行数撑开
  border_radius: 28
  border_width: 3
  fill: "#FFF3D9"

inner_card:
  width: 660            # = 外卡 692 − 左右各 16
  height: auto
  border_radius: 8
  margin:
    horizontal: 16      # 距外卡左右
    vertical: 56        # 距外卡上下

# 字体文件（项目 fonts/ 目录）
fonts:
  regular: "MiSans-Regular"
  semibold: "MiSans-Semibold"
  bold: "MiSans-Bold"
```

---

## 3. 外卡片（outer_card）

| 属性 | 值 | CSS 对应 |
|------|-----|----------|
| 宽度 | `692` | `width: 692px` |
| 高度 | 内容自适应 | `height: auto` |
| 圆角 | `28` | `border-radius: 28px` |
| 描边宽度 | `3` | `padding: 3px` + mask 技巧 |
| 填充色 | `#FFF3D9` | `background: #FFF3D9` |
| 描边实现 | 5 层叠加（见 §3.1） | 4×`linear-gradient` + 1×纯色底 |

### 3.1 五层描边（自顶向下叠加）

> Figma：**Inside** 描边、宽 `3px`。实现时可用 `::before` + `mask-composite: exclude` 只保留边框环。

**图层 5（最底，纯色）**

| 类型 | 颜色 | 不透明度 |
|------|------|----------|
| solid | `#F9D8B0` | 100% |

**图层 1–4（线性渐变）**

每层格式：`linear-gradient`，色标为 `{ location: "30%", color: "#F8D6AD", opacity: 0 }`

#### layer_1

| location | hex | opacity |
|----------|-----|---------|
| 30% | `#F8D6AD` | 0% |
| 58% | `#FFA640` | 100% |
| 81% | `#FFE5C7` | 100% |
| 100% | `#F7AA52` | 100% |

#### layer_2

| location | hex | opacity |
|----------|-----|---------|
| 89% | `#F7D0A1` | 0% |
| 100% | `#F7AA52` | 100% |

#### layer_3

| location | hex | opacity |
|----------|-----|---------|
| 7% | `#F8CFA1` | 0% |
| 27% | `#FFE5C7` | 100% |
| 50% | `#FFA640` | 100% |
| 89% | `#F8D6AD` | 100% |

#### layer_4

| location | hex | opacity |
|----------|-----|---------|
| 11% | `#F7D0A1` | 0% |
| 88% | `#F7AA52` | 100% |

**CSS 参考（叠加顺序：layer1 → layer4 → layer5）**

```css
background:
  linear-gradient(/* layer_1 stops */),
  linear-gradient(/* layer_2 stops */),
  linear-gradient(/* layer_3 stops */),
  linear-gradient(/* layer_4 stops */),
  #F9D8B0; /* layer_5 */
```

---

## 4. 内卡片（inner_card / table-shell）

| 属性 | 值 |
|------|-----|
| 内容区宽度 | `660` |
| 圆角 | `8` |
| 相对外卡内边距 | 左/右 `16`，上/下 `56` |

---

## 5. 表格布局（product-grid）

### 5.1 列定义（8 列，总宽 = 660）

| key | 表头文案 | width |
|-----|----------|-------|
| `term` | 期限 | 48 |
| `product_name` | 产品名称 | 146 |
| `manager` | 产品管理人 | 56 |
| `risk` | 风险等级 | 88 |
| `min_amount` | 起购金额 | 64 |
| `trade_window` | 交易时间 | 82 |
| `benchmark` | 业绩报酬计提基准 | 88 |
| `last_return` | 上期兑付收益 | 88 |

```css
grid-template-columns: 48px 146px 56px 88px 64px 82px 88px 88px;
```

### 5.2 行与区域底色

| 区域 | 背景色 | 高度 / 行高 |
|------|--------|-------------|
| 表头行（thead） | `#E9B58D` | `32` |
| 数据行（tbody） | 默认单元格底 | 行高 `52` |
| 首列「期限」侧栏 | `#F1D2BE` | 同数据行 |

### 5.3 单元格分割线

- 颜色：白色 `#FFFFFF`
- 规则：行内、列间均用分割线分隔
- **约束**：分割线**不占用**列宽/行高（使用 `border` 或 `box-shadow inset`，勿额外增加 grid 轨道尺寸）

---

## 6. 文字样式

### 6.1 卡片底部注释（poster-card__note）

| 属性 | 值 |
|------|-----|
| 对齐 | 左对齐，与 `table-shell` 左缘对齐（外卡内边距 `16` 后不再额外缩进） |
| 宽度 | `660`（同内表） |
| 字号 | `10` |
| 字体 | `MiSans-Regular` |
| 字间距 | `-6%` → `letter-spacing: -0.06em` |
| 颜色 | `#000000` |
| 区域尺寸 | 宽 `385`，高 `16` |

### 6.2 表头文字（.product-grid__th）

| 属性 | 值 |
|------|-----|
| 字体 | `MiSans-Semibold` |
| 字号 | `12` |
| 颜色 | `#744A31` |
| 字间距 | `-5%` → `letter-spacing: -0.05em` |
| 段落上下间距 | `16`（表头区块垂直留白） |

### 6.3 表格正文（.product-grid__td）

| 属性 | 值 |
|------|-----|
| 字体 | `MiSans-Semibold` |
| 字号 | `11` |
| 颜色 | `#030303` |
| 字间距 | `0` |
| 段落上下间距 | `16`（单元格内垂直节奏） |

### 6.4 特殊单元格文案

| 文案示例 | 选择器建议 | 仅变更项 |
|----------|------------|----------|
| `首发` | `.is-first-issue` | `color: #FF0000`（其余同 §6.3） |
| `首期运作中` | `.is-first-period` | `font-family: MiSans-Bold`（`font-weight: 700`）；`color: #030303`（其余同 §6.3） |

---

## 7. 实现检查清单

- [ ] 外卡 `692` = 内表 `660` + 左右各 `16`
- [ ] 八列宽度之和 = `660`
- [ ] 五层描边 + `#FFF3D9` 填充同时存在
- [ ] 表头高 `32`，数据行高 `52`
- [ ] 首列期限列背景 `#F1D2BE`，表头 `#E9B58D`
- [ ] `首发` 红色、`首期运作中` 加粗，不污染其他列默认样式
- [ ] 分割线不计入 grid 列宽

---

## 8. 关联文件

| 文件 | 说明 |
|------|------|
| `index.html` | 海报主实现（含 `.poster-card`、`.product-grid`） |
| `text.md` | 各分类表格原始数据 |
| `fonts/MiSans-*.ttf` | 表格用字体 |
