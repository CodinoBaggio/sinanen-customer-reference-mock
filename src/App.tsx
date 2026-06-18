import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Clock3,
  Database,
  Gauge,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Search,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type TabKey = "summary" | "meter" | "devices" | "payments" | "sales";
type ViewMode = "search" | "detail";

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

type Customer = {
  code: string;
  name: string;
  kana: string;
  status: string;
  hint: string;
  flag: string;
  address: string;
  phone: string;
  email: string;
  contract: string;
  area: string;
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

const customers: Customer[] = [
  {
    code: "C-204581",
    name: "サンプル 太郎",
    kana: "サンプル タロウ",
    status: "供給中",
    hint: "港区芝浦 / 供給中",
    flag: "訪問予定",
    address: "東京都港区芝浦 1-2-3 サンプルハイツ 305",
    phone: "090-0000-0000",
    email: "sample.customer@example.jp",
    contract: "LPガス家庭用 / 20kg容器",
    area: "首都圏 第3ブロック",
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
    code: "C-204588",
    name: "デモ 花子",
    kana: "デモ ハナコ",
    status: "供給中",
    hint: "品川区東品川 / 供給中",
    flag: "定期点検",
    address: "東京都品川区東品川 4-5-6 デモレジデンス 1202",
    phone: "090-1111-2222",
    email: "demo.hanako@example.jp",
    contract: "LPガス家庭用 / バルク供給",
    area: "湾岸 第1ブロック",
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
    code: "C-204590",
    name: "見本 一郎",
    kana: "ミホン イチロウ",
    status: "休止中",
    hint: "大田区蒲田 / 休止中",
    flag: "要確認",
    address: "東京都大田区蒲田 7-8-9 見本ハイム 101",
    phone: "090-3333-4444",
    email: "mihon.ichiro@example.jp",
    contract: "LPガス休止中 / 再開確認対象",
    area: "城南 第2ブロック",
    lastSync: "2026/06/17 07:50",
    visitTitle: "再開確認 11:00",
    visitNote: "休止中契約のため、供給状態と未収状況を確認",
    meterHighlight: "0.0㎥",
    meterDelta: "休止中のため使用量なし",
    deviceAlertTitle: "供給再開前の確認が必要",
    deviceAlertNote: "閉栓状態と機器状態を訪問時に確認",
    meters: [
      { month: "2026年6月", date: "06/09", current: "498.0", previous: "498.0" },
      { month: "2026年5月", date: "05/09", current: "498.0", previous: "498.0" },
      { month: "2026年4月", date: "04/09", current: "498.0", previous: "493.2" },
    ],
    devices: [
      { name: "ガス給湯器", model: "GT-OLD16", installed: "2015/05/10", note: "再開前点検対象" },
      { name: "ガスコンロ", model: "GC-SAMPLE01", installed: "2018/12/08", note: "動作確認待ち" },
      { name: "ガス警報器", model: "AL-2018", installed: "2018/08/30", note: "交換期限超過" },
    ],
    payments: [
      { month: "2026年6月", amount: "1,980円", status: "未入金", date: "未確認" },
      { month: "2026年5月", amount: "1,980円", status: "入金確認済", date: "05/20" },
      { month: "2026年4月", amount: "6,420円", status: "入金確認済", date: "04/18" },
    ],
    sales: [
      { label: "当月売上", value: "1,980円", memo: "基本料金" },
      { label: "直近3か月", value: "10,380円", memo: "平均 3,460円" },
      { label: "未収", value: "1,980円", memo: "訪問時に案内対象" },
    ],
  },
];

const tabs: { key: TabKey; label: string; icon: typeof UserRound }[] = [
  { key: "summary", label: "顧客", icon: UserRound },
  { key: "meter", label: "検針", icon: Gauge },
  { key: "devices", label: "機器", icon: Wrench },
  { key: "payments", label: "入金", icon: ReceiptText },
  { key: "sales", label: "売上", icon: Database },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [query, setQuery] = useState("C-204");
  const [selectedCode, setSelectedCode] = useState(customers[0].code);
  const [view, setView] = useState<ViewMode>("search");

  useEffect(() => {
    const update = () => {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const customer = useMemo(
    () => customers.find((item) => item.code === selectedCode) ?? customers[0],
    [selectedCode],
  );

  const filteredCandidates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return customers;
    return customers.filter((item) =>
      `${item.code} ${item.name} ${item.hint}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="app-shell">
      <main className="app-stage" aria-label="顧客情報照会システム Mock">
        {view === "search" ? (
          <SearchView
            customers={filteredCandidates}
            query={query}
            selectedCode={customer.code}
            onQueryChange={setQuery}
            onSelect={(code) => {
              setSelectedCode(code);
              setActiveTab("summary");
              setView("detail");
            }}
          />
        ) : (
          <DetailView
            activeTab={activeTab}
            customer={customer}
            onBack={() => setView("search")}
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
  selectedCode,
  onQueryChange,
  onSelect,
}: {
  customers: Customer[];
  query: string;
  selectedCode: string;
  onQueryChange: (value: string) => void;
  onSelect: (code: string) => void;
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
        <label htmlFor="customer-search">顧客コード・氏名・住所で検索</label>
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            id="customer-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="顧客コード・電話・メール"
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
            <SearchResultCard
              customer={item}
              isActive={item.code === selectedCode}
              key={item.code}
              onSelect={() => onSelect(item.code)}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

function SearchResultCard({
  customer,
  isActive,
  onSelect,
}: {
  customer: Customer;
  isActive: boolean;
  onSelect: () => void;
}) {
  const unpaid = customer.sales.find((sale) => sale.label === "未収")?.value ?? "0円";

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
        <em>{customer.flag}</em>
      </span>
      <span className="result-meta">
        <span>{customer.code}</span>
        <span>{customer.status}</span>
        <span>{customer.area}</span>
      </span>
      <span className="result-address">
        <MapPin size={16} aria-hidden="true" />
        {customer.address}
      </span>
      <span className="result-detail-grid">
        <span>
          <Phone size={15} aria-hidden="true" />
          <strong>{customer.phone}</strong>
        </span>
        <span>
          <ReceiptText size={15} aria-hidden="true" />
          <strong>{customer.contract}</strong>
        </span>
        <span>
          <AlertTriangle size={15} aria-hidden="true" />
          <strong>{unpaid}</strong>
        </span>
        <span>
          <Clock3 size={15} aria-hidden="true" />
          <strong>{customer.lastSync}</strong>
        </span>
      </span>
      <span className="result-action">
        詳細を確認
        <ChevronRight size={17} aria-hidden="true" />
      </span>
    </button>
  );
}

function DetailView({
  activeTab,
  customer,
  onBack,
  onTabChange,
}: {
  activeTab: TabKey;
  customer: Customer;
  onBack: () => void;
  onTabChange: (tab: TabKey) => void;
}) {
  return (
    <section className="detail-view" aria-label="顧客詳細">
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
          <div className="status-pill">{customer.status}</div>
          <h2>{customer.name} 様</h2>
          <p>{customer.kana}</p>
        </div>
        <div className="readonly-badge">参照専用</div>
      </section>

      <section className="sync-strip" aria-label="連携状態">
        <Clock3 size={16} aria-hidden="true" />
        <span>最終連携 {customer.lastSync}</span>
        <Database size={16} aria-hidden="true" />
        <span>ヘリオス連携</span>
      </section>

      <nav className="tab-bar" aria-label="顧客情報タブ">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => onTabChange(tab.key)}
              type="button"
            >
              <Icon size={18} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <section className="content-area">{renderTab(activeTab, customer)}</section>
    </section>
  );
}

function renderTab(tab: TabKey, customer: Customer) {
  switch (tab) {
    case "meter":
      return <MeterTab customer={customer} />;
    case "devices":
      return <DevicesTab customer={customer} />;
    case "payments":
      return <PaymentsTab customer={customer} />;
    case "sales":
      return <SalesTab customer={customer} />;
    default:
      return <SummaryTab customer={customer} />;
  }
}

function SummaryTab({ customer }: { customer: Customer }) {
  return (
    <div className="tab-content">
      <div className="notice-card">
        <Smartphone size={18} aria-hidden="true" />
        <div>
          <strong>{customer.visitTitle}</strong>
          <span>{customer.visitNote}</span>
        </div>
      </div>
      <InfoRow icon={MapPin} label="住所" value={customer.address} />
      <InfoRow icon={Phone} label="電話" value={customer.phone} />
      <InfoRow icon={Mail} label="メール" value={customer.email} />
      <div className="two-column">
        <Metric label="顧客コード" value={customer.code} />
        <Metric label="担当エリア" value={customer.area} />
      </div>
      <Metric label="契約" value={customer.contract} wide />
    </div>
  );
}

function MeterTab({ customer }: { customer: Customer }) {
  return (
    <div className="tab-content">
      <div className="metric-feature">
        <span>直近使用量</span>
        <strong>{customer.meterHighlight}</strong>
        <p>{customer.meterDelta}</p>
      </div>
      <div className="timeline-list">
        {customer.meters.map((item) => (
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

function DevicesTab({ customer }: { customer: Customer }) {
  return (
    <div className="tab-content">
      <div className="warning-card">
        <AlertTriangle size={18} aria-hidden="true" />
        <div>
          <strong>{customer.deviceAlertTitle}</strong>
          <span>{customer.deviceAlertNote}</span>
        </div>
      </div>
      {customer.devices.map((device) => (
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

function PaymentsTab({ customer }: { customer: Customer }) {
  return (
    <div className="tab-content">
      {customer.payments.map((payment) => (
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

function SalesTab({ customer }: { customer: Customer }) {
  return (
    <div className="tab-content">
      <div className="two-column">
        {customer.sales.map((sale) => (
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
