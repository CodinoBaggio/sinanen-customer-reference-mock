import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  ChevronRight,
  Clock3,
  Database,
  Gauge,
  Home,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
  UserRound,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

type TabKey = "summary" | "meter" | "devices" | "payments" | "sales";
type ViewMode = "search" | "supplies" | "detail";

type Meter = {
  month: string;
  date: string;
  current: string;
  previous: string;
};

type Device = {
  name: string;
  model: string;
  installed: string;
  note: string;
};

type Payment = {
  month: string;
  amount: string;
  status: string;
  date: string;
};

type Sale = {
  label: string;
  value: string;
  memo: string;
};

type SupplyKind = "home" | "store" | "building";

type Supply = {
  code: string;
  label: string;
  kind: SupplyKind;
  status: string;
  address: string;
  contract: string;
  lastSync: string;
  visitTitle: string;
  visitNote: string;
  meterHighlight: string;
  meterDelta: string;
  deviceAlertTitle: string;
  deviceAlertNote: string;
  meters: Meter[];
  devices: Device[];
  payments: Payment[];
  sales: Sale[];
};

type Customer = {
  id: string;
  name: string;
  kana: string;
  flag: string;
  phone: string;
  email: string;
  area: string;
  supplies: Supply[];
};

const customers: Customer[] = [
  {
    id: "K-10293",
    name: "サンプル 太郎",
    kana: "サンプル タロウ",
    flag: "供給先 3件",
    phone: "090-0000-0000",
    email: "sample.taro@example.jp",
    area: "首都圏 第3ブロック",
    supplies: [
      {
        code: "H-204581",
        label: "自宅",
        kind: "home",
        status: "供給中",
        address: "東京都港区芝浦 1-2-3 サンプルハイツ 305",
        contract: "LPガス家庭用 / 20kg容器",
        lastSync: "2026/06/17 08:00",
        visitTitle: "訪問予定 14:30",
        visitNote: "住所・契約・直近状況を確認してから出発",
        meterHighlight: "32.8㎥",
        meterDelta: "前月比 +2.1㎥",
        deviceAlertTitle: "警報器の交換目安が近い",
        deviceAlertNote: "訪問時に設置状況を確認",
        meters: [
          { month: "2026年6月", date: "06/10", current: "1,284.6", previous: "1,251.8" },
          { month: "2026年5月", date: "05/10", current: "1,251.8", previous: "1,221.1" },
          { month: "2026年4月", date: "04/10", current: "1,221.1", previous: "1,187.0" },
        ],
        devices: [
          { name: "ガス給湯器", model: "GT-SAMPLE24", installed: "2021/11/18", note: "次回点検: 2026/11" },
          { name: "ビルトインコンロ", model: "GC-DEMO03", installed: "2023/03/04", note: "異常履歴なし" },
          { name: "ガス警報器", model: "AL-2019", installed: "2021/07/22", note: "交換目安: 2026/07" },
        ],
        payments: [
          { month: "2026年6月", amount: "9,840円", status: "入金確認済", date: "06/15" },
          { month: "2026年5月", amount: "9,210円", status: "入金確認済", date: "05/15" },
          { month: "2026年4月", amount: "10,230円", status: "入金確認済", date: "04/15" },
        ],
        sales: [
          { label: "当月売上", value: "9,840円", memo: "LPガス利用料" },
          { label: "直近3か月", value: "29,280円", memo: "平均 9,760円" },
          { label: "未収", value: "0円", memo: "訪問時の確認不要" },
        ],
      },
      {
        code: "H-204602",
        label: "店舗（飲食）",
        kind: "store",
        status: "供給中",
        address: "東京都港区芝浦 2-4-1 芝浦フードテラス 1F",
        contract: "LPガス業務用 / 50kg容器×2",
        lastSync: "2026/06/17 08:02",
        visitTitle: "業務用点検 10:00",
        visitNote: "厨房機器の使用量が多い。容器残量を重点確認",
        meterHighlight: "168.4㎥",
        meterDelta: "前月比 +12.6㎥",
        deviceAlertTitle: "業務用コンロの点検期限が近い",
        deviceAlertNote: "厨房の連続使用が多いため早めに確認",
        meters: [
          { month: "2026年6月", date: "06/10", current: "8,420.5", previous: "8,252.1" },
          { month: "2026年5月", date: "05/10", current: "8,252.1", previous: "8,096.7" },
          { month: "2026年4月", date: "04/10", current: "8,096.7", previous: "7,944.0" },
        ],
        devices: [
          { name: "業務用ガスコンロ", model: "GC-PRO80", installed: "2022/02/10", note: "点検期限: 2026/08" },
          { name: "業務用給湯器", model: "GT-PRO50", installed: "2022/02/10", note: "異常履歴なし" },
          { name: "ガス漏れ警報器", model: "AL-2022B", installed: "2022/02/10", note: "交換目安: 2027/02" },
        ],
        payments: [
          { month: "2026年6月", amount: "48,200円", status: "入金確認済", date: "06/20" },
          { month: "2026年5月", amount: "43,900円", status: "入金確認済", date: "05/20" },
          { month: "2026年4月", amount: "41,150円", status: "入金確認済", date: "04/20" },
        ],
        sales: [
          { label: "当月売上", value: "48,200円", memo: "業務用LPガス" },
          { label: "直近3か月", value: "133,250円", memo: "平均 44,416円" },
          { label: "未収", value: "0円", memo: "口座振替" },
        ],
      },
      {
        code: "H-204633",
        label: "別宅（実家）",
        kind: "home",
        status: "休止中",
        address: "千葉県市川市本八幡 5-6-7 サンプル実家",
        contract: "LPガス家庭用 / 休止中",
        lastSync: "2026/06/17 07:55",
        visitTitle: "再開確認 未定",
        visitNote: "休止中。再開連絡が入ったら開栓前点検",
        meterHighlight: "0.0㎥",
        meterDelta: "休止中のため使用量なし",
        deviceAlertTitle: "再開時に機器確認が必要",
        deviceAlertNote: "閉栓状態。長期休止のため設置機器を要確認",
        meters: [
          { month: "2026年6月", date: "06/09", current: "642.0", previous: "642.0" },
          { month: "2026年5月", date: "05/09", current: "642.0", previous: "642.0" },
          { month: "2026年4月", date: "04/09", current: "642.0", previous: "640.8" },
        ],
        devices: [
          { name: "ガス給湯器", model: "GT-OLD18", installed: "2016/03/12", note: "再開前点検対象" },
          { name: "ガスコンロ", model: "GC-OLD02", installed: "2016/03/12", note: "動作確認待ち" },
          { name: "ガス警報器", model: "AL-2017", installed: "2017/01/20", note: "交換期限超過" },
        ],
        payments: [
          { month: "2026年6月", amount: "0円", status: "休止中", date: "—" },
          { month: "2026年5月", amount: "0円", status: "休止中", date: "—" },
          { month: "2026年4月", amount: "1,650円", status: "入金確認済", date: "04/18" },
        ],
        sales: [
          { label: "当月売上", value: "0円", memo: "休止中" },
          { label: "直近3か月", value: "1,650円", memo: "休止前の基本料金" },
          { label: "未収", value: "0円", memo: "確認不要" },
        ],
      },
    ],
  },
  {
    id: "K-10477",
    name: "デモ 花子",
    kana: "デモ ハナコ",
    flag: "供給先 2件",
    phone: "090-1111-2222",
    email: "demo.hanako@example.jp",
    area: "湾岸 第1ブロック",
    supplies: [
      {
        code: "H-204588",
        label: "自宅",
        kind: "home",
        status: "供給中",
        address: "東京都品川区東品川 4-5-6 デモレジデンス 1202",
        contract: "LPガス家庭用 / バルク供給",
        lastSync: "2026/06/17 08:05",
        visitTitle: "定期点検 16:00",
        visitNote: "給湯器と警報器の設置年数を事前確認",
        meterHighlight: "18.6㎥",
        meterDelta: "前月比 -1.4㎥",
        deviceAlertTitle: "給湯器の点検対象",
        deviceAlertNote: "設置から7年経過。型番を訪問時に確認",
        meters: [
          { month: "2026年6月", date: "06/12", current: "774.2", previous: "755.6" },
          { month: "2026年5月", date: "05/12", current: "755.6", previous: "735.6" },
          { month: "2026年4月", date: "04/12", current: "735.6", previous: "713.9" },
        ],
        devices: [
          { name: "ガス給湯器", model: "GT-DEMO20", installed: "2019/09/02", note: "訪問時に型番確認" },
          { name: "浴室暖房乾燥機", model: "BD-SAMPLE11", installed: "2020/01/21", note: "異常履歴なし" },
          { name: "ガス警報器", model: "AL-2022", installed: "2022/06/14", note: "交換目安: 2027/06" },
        ],
        payments: [
          { month: "2026年6月", amount: "7,450円", status: "入金確認済", date: "06/16" },
          { month: "2026年5月", amount: "7,980円", status: "入金確認済", date: "05/16" },
          { month: "2026年4月", amount: "8,210円", status: "入金確認済", date: "04/16" },
        ],
        sales: [
          { label: "当月売上", value: "7,450円", memo: "LPガス利用料" },
          { label: "直近3か月", value: "23,640円", memo: "平均 7,880円" },
          { label: "未収", value: "0円", memo: "点検時の案内不要" },
        ],
      },
      {
        code: "H-204619",
        label: "事務所",
        kind: "store",
        status: "供給中",
        address: "東京都品川区東品川 3-1-8 デモ事務所ビル 2F",
        contract: "LPガス業務用 / 20kg容器",
        lastSync: "2026/06/17 08:06",
        visitTitle: "検針 13:00",
        visitNote: "事務所のため使用量は小さめ。容器交換サイクル確認",
        meterHighlight: "9.2㎥",
        meterDelta: "前月比 +0.3㎥",
        deviceAlertTitle: "特記事項なし",
        deviceAlertNote: "直近の異常・点検期限なし",
        meters: [
          { month: "2026年6月", date: "06/12", current: "312.4", previous: "303.2" },
          { month: "2026年5月", date: "05/12", current: "303.2", previous: "294.5" },
          { month: "2026年4月", date: "04/12", current: "294.5", previous: "286.0" },
        ],
        devices: [
          { name: "給湯器", model: "GT-OFFICE12", installed: "2021/04/05", note: "異常履歴なし" },
          { name: "ガス警報器", model: "AL-2021", installed: "2021/04/05", note: "交換目安: 2026/04" },
        ],
        payments: [
          { month: "2026年6月", amount: "3,640円", status: "入金確認済", date: "06/16" },
          { month: "2026年5月", amount: "3,520円", status: "入金確認済", date: "05/16" },
          { month: "2026年4月", amount: "3,480円", status: "入金確認済", date: "04/16" },
        ],
        sales: [
          { label: "当月売上", value: "3,640円", memo: "業務用LPガス" },
          { label: "直近3か月", value: "10,640円", memo: "平均 3,546円" },
          { label: "未収", value: "0円", memo: "口座振替" },
        ],
      },
    ],
  },
  {
    id: "K-10588",
    name: "見本 一郎",
    kana: "ミホン イチロウ",
    flag: "供給先 1件",
    phone: "090-3333-4444",
    email: "mihon.ichiro@example.jp",
    area: "城南 第2ブロック",
    supplies: [
      {
        code: "H-204590",
        label: "自宅",
        kind: "home",
        status: "供給中",
        address: "東京都大田区蒲田 7-8-9 見本ハイム 101",
        contract: "LPガス家庭用 / 20kg容器",
        lastSync: "2026/06/17 07:50",
        visitTitle: "検針 11:00",
        visitNote: "通常検針。直近の使用量と未収状況を確認",
        meterHighlight: "21.3㎥",
        meterDelta: "前月比 +0.8㎥",
        deviceAlertTitle: "特記事項なし",
        deviceAlertNote: "直近の異常・点検期限なし",
        meters: [
          { month: "2026年6月", date: "06/09", current: "918.4", previous: "897.1" },
          { month: "2026年5月", date: "05/09", current: "897.1", previous: "876.6" },
          { month: "2026年4月", date: "04/09", current: "876.6", previous: "855.0" },
        ],
        devices: [
          { name: "ガス給湯器", model: "GT-STD16", installed: "2020/05/10", note: "次回点検: 2025/05" },
          { name: "ガスコンロ", model: "GC-STD01", installed: "2020/05/10", note: "異常履歴なし" },
          { name: "ガス警報器", model: "AL-2020", installed: "2020/05/10", note: "交換目安: 2025/05" },
        ],
        payments: [
          { month: "2026年6月", amount: "8,120円", status: "入金確認済", date: "06/15" },
          { month: "2026年5月", amount: "7,890円", status: "入金確認済", date: "05/15" },
          { month: "2026年4月", amount: "8,360円", status: "入金確認済", date: "04/15" },
        ],
        sales: [
          { label: "当月売上", value: "8,120円", memo: "LPガス利用料" },
          { label: "直近3か月", value: "24,370円", memo: "平均 8,123円" },
          { label: "未収", value: "0円", memo: "確認不要" },
        ],
      },
    ],
  },
];

const tabs: { key: TabKey; label: string; icon: typeof UserRound }[] = [
  { key: "summary", label: "供給先", icon: UserRound },
  { key: "meter", label: "検針", icon: Gauge },
  { key: "devices", label: "機器", icon: Wrench },
  { key: "payments", label: "入金", icon: ReceiptText },
  { key: "sales", label: "売上", icon: Database },
];

const supplyIcons: Record<SupplyKind, typeof Home> = {
  home: Home,
  store: Store,
  building: Building2,
};

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [query, setQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);
  const [selectedCode, setSelectedCode] = useState(customers[0].supplies[0].code);
  const [view, setView] = useState<ViewMode>("search");

  const customer = useMemo(
    () => customers.find((item) => item.id === selectedCustomerId) ?? customers[0],
    [selectedCustomerId],
  );

  const supply = useMemo(
    () => customer.supplies.find((item) => item.code === selectedCode) ?? customer.supplies[0],
    [customer, selectedCode],
  );

  const filteredCustomers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return customers;
    return customers.filter((item) => {
      const haystack = [
        item.id,
        item.name,
        item.kana,
        item.phone,
        item.email,
        item.area,
        ...item.supplies.map((s) => `${s.code} ${s.address} ${s.label}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  return (
    <div className="app-shell">
      <main className="app-stage" aria-label="顧客情報照会システム Mock">
        {view === "search" && (
          <SearchView
            customers={filteredCustomers}
            query={query}
            selectedId={customer.id}
            onQueryChange={setQuery}
            onSelect={(id) => {
              setSelectedCustomerId(id);
              setView("supplies");
            }}
          />
        )}
        {view === "supplies" && (
          <SuppliesView
            customer={customer}
            onBack={() => setView("search")}
            onSelect={(code) => {
              setSelectedCode(code);
              setActiveTab("summary");
              setView("detail");
            }}
          />
        )}
        {view === "detail" && (
          <DetailView
            activeTab={activeTab}
            customer={customer}
            supply={supply}
            onBack={() => setView("supplies")}
            onTabChange={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}

function SearchView({
  customers,
  query,
  selectedId,
  onQueryChange,
  onSelect,
}: {
  customers: Customer[];
  query: string;
  selectedId: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="search-view" aria-label="顧客検索">
      <header className="top-bar search-top">
        <div>
          <p className="micro-label">顧客情報照会</p>
          <strong>顧客検索</strong>
        </div>
        <div className="sso-chip">
          <ShieldCheck size={14} aria-hidden="true" />
          SSO済
        </div>
      </header>

      <section className="search-panel" aria-label="検索条件">
        <label htmlFor="customer-search">顧客名・電話・メール・ヘリオスコードで検索</label>
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            id="customer-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="顧客名・電話・メール・ヘリオスコード"
          />
        </div>
      </section>

      <section className="search-results" aria-label="検索結果">
        <div className="results-heading">
          <strong>検索結果</strong>
          <span>{customers.length}件</span>
        </div>
        <div className="result-grid">
          {customers.map((item) => (
            <CustomerResultCard
              customer={item}
              isActive={item.id === selectedId}
              key={item.id}
              onSelect={() => onSelect(item.id)}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

function CustomerResultCard({
  customer,
  isActive,
  onSelect,
}: {
  customer: Customer;
  isActive: boolean;
  onSelect: () => void;
}) {
  const supplyCount = customer.supplies.length;
  const primary = customer.supplies[0];

  return (
    <button
      className={isActive ? "result-card active" : "result-card"}
      onClick={onSelect}
      type="button"
    >
      <span className="result-main">
        <span>
          <strong>{customer.name}</strong>
          <small>{customer.kana}</small>
        </span>
        <em className={supplyCount > 1 ? "multi" : ""}>供給先 {supplyCount}件</em>
      </span>
      <span className="result-meta">
        <span>{customer.id}</span>
        <span>{customer.area}</span>
      </span>
      <span className="result-detail-grid">
        <span>
          <Phone size={15} aria-hidden="true" />
          <strong>{customer.phone}</strong>
        </span>
        <span>
          <Mail size={15} aria-hidden="true" />
          <strong>{customer.email}</strong>
        </span>
      </span>
      <span className="result-address">
        <MapPin size={16} aria-hidden="true" />
        {supplyCount > 1
          ? `${primary.address} ほか ${supplyCount - 1}件`
          : primary.address}
      </span>
      <span className="result-action">
        供給先を見る
        <ChevronRight size={17} aria-hidden="true" />
      </span>
    </button>
  );
}

function SuppliesView({
  customer,
  onBack,
  onSelect,
}: {
  customer: Customer;
  onBack: () => void;
  onSelect: (code: string) => void;
}) {
  return (
    <section className="supplies-view" aria-label="供給先一覧">
      <header className="top-bar detail-top">
        <button className="back-button" onClick={onBack} type="button">
          <ArrowLeft size={18} aria-hidden="true" />
          検索へ戻る
        </button>
        <div className="sso-chip">
          <ShieldCheck size={14} aria-hidden="true" />
          SSO済
        </div>
      </header>

      <section className="customer-hero" aria-label="顧客概要">
        <div className="hero-main">
          <div className="status-pill">顧客 {customer.id}</div>
          <h2>{customer.name} 様</h2>
          <p>{customer.kana}</p>
        </div>
        <div className="readonly-badge">参照専用</div>
      </section>

      <section className="customer-contact" aria-label="連絡先">
        <span>
          <Phone size={15} aria-hidden="true" />
          {customer.phone}
        </span>
        <span>
          <Mail size={15} aria-hidden="true" />
          {customer.email}
        </span>
      </section>

      <section className="supplies-area" aria-label="供給先">
        <div className="results-heading">
          <strong>供給先（ヘリオスコード）</strong>
          <span>{customer.supplies.length}件</span>
        </div>
        <div className="supply-grid">
          {customer.supplies.map((item) => (
            <SupplyCard supply={item} key={item.code} onSelect={() => onSelect(item.code)} />
          ))}
        </div>
      </section>
    </section>
  );
}

function SupplyCard({ supply, onSelect }: { supply: Supply; onSelect: () => void }) {
  const Icon = supplyIcons[supply.kind];
  const unpaid = supply.sales.find((sale) => sale.label === "未収")?.value ?? "0円";
  const hasUnpaid = unpaid !== "0円";

  return (
    <button className="supply-card" onClick={onSelect} type="button">
      <span className="supply-head">
        <span className="supply-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="supply-title">
          <strong>{supply.label}</strong>
          <small>{supply.code}</small>
        </span>
        <span className={supply.status === "供給中" ? "supply-status" : "supply-status off"}>
          {supply.status}
        </span>
      </span>
      <span className="supply-address">
        <MapPin size={15} aria-hidden="true" />
        {supply.address}
      </span>
      <span className="supply-meta">
        <span>
          <ReceiptText size={14} aria-hidden="true" />
          {supply.contract}
        </span>
        <span className={hasUnpaid ? "unpaid" : ""}>
          <AlertTriangle size={14} aria-hidden="true" />
          未収 {unpaid}
        </span>
      </span>
      <span className="result-action">
        明細を見る
        <ChevronRight size={17} aria-hidden="true" />
      </span>
    </button>
  );
}

function DetailView({
  activeTab,
  customer,
  supply,
  onBack,
  onTabChange,
}: {
  activeTab: TabKey;
  customer: Customer;
  supply: Supply;
  onBack: () => void;
  onTabChange: (tab: TabKey) => void;
}) {
  const Icon = supplyIcons[supply.kind];

  return (
    <section className="detail-view" aria-label="供給先詳細">
      <header className="top-bar detail-top">
        <button className="back-button" onClick={onBack} type="button">
          <ArrowLeft size={18} aria-hidden="true" />
          供給先一覧へ
        </button>
        <div className="sso-chip">
          <ShieldCheck size={14} aria-hidden="true" />
          SSO済
        </div>
      </header>

      <section className="customer-hero supply-hero" aria-label="供給先概要">
        <div className="hero-main">
          <div className="status-pill">
            <Icon size={13} aria-hidden="true" />
            {customer.name} 様 / {supply.label}
          </div>
          <h2>{supply.code}</h2>
          <p>{supply.address}</p>
        </div>
        <div className="readonly-badge">参照専用</div>
      </section>

      <section className="sync-strip" aria-label="連携状態">
        <Clock3 size={16} aria-hidden="true" />
        <span>最終連携 {supply.lastSync}</span>
        <Database size={16} aria-hidden="true" />
        <span>ヘリオス連携</span>
      </section>

      <nav className="tab-bar" aria-label="供給先情報タブ">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => onTabChange(tab.key)}
              type="button"
            >
              <TabIcon size={18} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <section className="content-area">{renderTab(activeTab, customer, supply)}</section>
    </section>
  );
}

function renderTab(tab: TabKey, customer: Customer, supply: Supply) {
  switch (tab) {
    case "meter":
      return <MeterTab supply={supply} />;
    case "devices":
      return <DevicesTab supply={supply} />;
    case "payments":
      return <PaymentsTab supply={supply} />;
    case "sales":
      return <SalesTab supply={supply} />;
    default:
      return <SummaryTab customer={customer} supply={supply} />;
  }
}

function SummaryTab({ customer, supply }: { customer: Customer; supply: Supply }) {
  return (
    <div className="tab-content">
      <div className="notice-card">
        <Smartphone size={18} aria-hidden="true" />
        <div>
          <strong>{supply.visitTitle}</strong>
          <span>{supply.visitNote}</span>
        </div>
      </div>
      <InfoRow icon={MapPin} label="住所" value={supply.address} />
      <InfoRow icon={Phone} label="電話" value={customer.phone} />
      <InfoRow icon={Mail} label="メール" value={customer.email} />
      <div className="two-column">
        <Metric label="ヘリオスコード" value={supply.code} />
        <Metric label="状態" value={supply.status} />
      </div>
      <Metric label="契約" value={supply.contract} wide />
    </div>
  );
}

function MeterTab({ supply }: { supply: Supply }) {
  return (
    <div className="tab-content">
      <div className="metric-feature">
        <span>直近使用量</span>
        <strong>{supply.meterHighlight}</strong>
        <p>{supply.meterDelta}</p>
      </div>
      <div className="timeline-list">
        {supply.meters.map((item) => (
          <article key={item.month} className="timeline-item">
            <div>
              <strong>{item.month}</strong>
              <span>検針日 {item.date}</span>
            </div>
            <dl className="meter-values">
              <div className="meter-pair">
                <dt>今回</dt>
                <dd>{item.current}</dd>
              </div>
              <div className="meter-pair">
                <dt>前回</dt>
                <dd>{item.previous}</dd>
              </div>
              <div className="meter-pair">
                <dt>使用量</dt>
                <dd>{formatMeterUsage(item.current, item.previous)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function formatMeterUsage(current: string, previous: string) {
  const currentValue = Number.parseFloat(current.replace(/,/g, ""));
  const previousValue = Number.parseFloat(previous.replace(/,/g, ""));

  if (!Number.isFinite(currentValue) || !Number.isFinite(previousValue)) {
    return "-";
  }

  return `${(currentValue - previousValue).toFixed(1)}㎥`;
}

function DevicesTab({ supply }: { supply: Supply }) {
  return (
    <div className="tab-content">
      <div className="warning-card">
        <AlertTriangle size={18} aria-hidden="true" />
        <div>
          <strong>{supply.deviceAlertTitle}</strong>
          <span>{supply.deviceAlertNote}</span>
        </div>
      </div>
      {supply.devices.map((device) => (
        <article className="device-card" key={device.name}>
          <Wrench size={18} aria-hidden="true" />
          <div>
            <strong>{device.name}</strong>
            <span>{device.model}</span>
            <small>設置日 {device.installed} / {device.note}</small>
          </div>
        </article>
      ))}
    </div>
  );
}

function PaymentsTab({ supply }: { supply: Supply }) {
  return (
    <div className="tab-content">
      {supply.payments.map((payment) => (
        <article className="payment-row" key={payment.month}>
          <div>
            <strong>{payment.month}</strong>
            <span>入金日 {payment.date}</span>
          </div>
          <div>
            <strong>{payment.amount}</strong>
            <em>{payment.status}</em>
          </div>
        </article>
      ))}
    </div>
  );
}

function SalesTab({ supply }: { supply: Supply }) {
  return (
    <div className="tab-content">
      <div className="two-column">
        {supply.sales.map((sale) => (
          <Metric key={sale.label} label={sale.label} value={sale.value} note={sale.memo} />
        ))}
      </div>
      <div className="notice-card quiet">
        <Database size={18} aria-hidden="true" />
        <div>
          <strong>売上データは連携済み情報の参照</strong>
          <span>このMockでは登録・編集・削除は行わない</span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="info-row">
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Metric({ label, value, note, wide = false }: { label: string; value: string; note?: string; wide?: boolean }) {
  return (
    <div className={wide ? "metric wide" : "metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <small>{note}</small> : null}
    </div>
  );
}

export default App;
