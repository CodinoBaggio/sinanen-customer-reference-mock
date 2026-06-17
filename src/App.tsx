import {
  AlertTriangle,
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
import { useMemo, useState } from "react";

type TabKey = "summary" | "meter" | "devices" | "payments" | "sales";

type Customer = {
  code: string;
  name: string;
  kana: string;
  status: string;
  address: string;
  phone: string;
  email: string;
  contract: string;
  area: string;
  lastSync: string;
};

const customer: Customer = {
  code: "C-204581",
  name: "サンプル 太郎",
  kana: "サンプル タロウ",
  status: "供給中",
  address: "東京都港区芝浦 1-2-3 サンプルハイツ 305",
  phone: "090-0000-0000",
  email: "sample.customer@example.jp",
  contract: "LPガス家庭用 / 20kg容器",
  area: "首都圏 第3ブロック",
  lastSync: "2026/06/17 08:00",
};

const candidates = [
  { code: customer.code, name: customer.name, hint: "港区芝浦 / 供給中", flag: "訪問予定" },
  { code: "C-204588", name: "デモ 花子", hint: "品川区東品川 / 供給中", flag: "通常" },
  { code: "C-204590", name: "見本 一郎", hint: "大田区蒲田 / 休止中", flag: "確認" },
];

const meters = [
  { month: "2026年6月", date: "06/10", current: "1,284.6", previous: "1,251.8", usage: "32.8 m3" },
  { month: "2026年5月", date: "05/10", current: "1,251.8", previous: "1,221.1", usage: "30.7 m3" },
  { month: "2026年4月", date: "04/10", current: "1,221.1", previous: "1,187.0", usage: "34.1 m3" },
];

const devices = [
  { name: "ガス給湯器", model: "GT-SAMPLE24", installed: "2021/11/18", note: "次回点検: 2026/11" },
  { name: "ビルトインコンロ", model: "GC-DEMO03", installed: "2023/03/04", note: "異常履歴なし" },
  { name: "ガス警報器", model: "AL-2019", installed: "2021/07/22", note: "交換目安: 2026/07" },
];

const payments = [
  { month: "2026年6月", amount: "9,840円", status: "入金確認済", date: "06/15" },
  { month: "2026年5月", amount: "9,210円", status: "入金確認済", date: "05/15" },
  { month: "2026年4月", amount: "10,230円", status: "入金確認済", date: "04/15" },
];

const sales = [
  { label: "当月売上", value: "9,840円", memo: "LPガス利用料" },
  { label: "直近3か月", value: "29,280円", memo: "平均 9,760円" },
  { label: "未収", value: "0円", memo: "訪問時の確認不要" },
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
  const [query, setQuery] = useState("C-204581");

  const filteredCandidates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return candidates;
    return candidates.filter((item) =>
      `${item.code} ${item.name} ${item.hint}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="app-shell">
      <aside className="presentation-panel" aria-label="プレゼン補足">
        <div className="panel-kicker">Estimate Mock</div>
        <h1>現場担当者が、訪問前に必要情報を確認するためのスマホWebアプリ</h1>
        <p>
          React/Viteで作成したGitHub Pages用のデモです。データはすべてサンプルで、実顧客情報や社内情報は含みません。
        </p>
        <div className="panel-points">
          <span>EntraID SSO想定</span>
          <span>参照専用</span>
          <span>スマホ主軸</span>
        </div>
      </aside>

      <main className="phone-stage" aria-label="顧客情報照会システム Mock">
        <section className="device-frame">
          <header className="top-bar">
            <div>
              <p className="micro-label">顧客情報照会</p>
              <strong>訪問前確認</strong>
            </div>
            <div className="sso-chip">
              <ShieldCheck size={14} aria-hidden="true" />
              SSO済
            </div>
          </header>

          <section className="search-card" aria-label="顧客検索">
            <label htmlFor="customer-search">顧客検索</label>
            <div className="search-field">
              <Search size={18} aria-hidden="true" />
              <input
                id="customer-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="顧客コード・電話・メール"
              />
            </div>
            <div className="candidate-list" aria-label="検索候補">
              {filteredCandidates.slice(0, 2).map((item) => (
                <button key={item.code} className="candidate" type="button">
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.code} / {item.hint}</small>
                  </span>
                  <em>{item.flag}</em>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>

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
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <section className="content-area">{renderTab(activeTab)}</section>
        </section>
      </main>
    </div>
  );
}

function renderTab(tab: TabKey) {
  switch (tab) {
    case "meter":
      return <MeterTab />;
    case "devices":
      return <DevicesTab />;
    case "payments":
      return <PaymentsTab />;
    case "sales":
      return <SalesTab />;
    default:
      return <SummaryTab />;
  }
}

function SummaryTab() {
  return (
    <div className="tab-content">
      <div className="notice-card">
        <Smartphone size={18} aria-hidden="true" />
        <div>
          <strong>訪問予定 14:30</strong>
          <span>住所・契約・直近状況を確認してから出発</span>
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

function MeterTab() {
  return (
    <div className="tab-content">
      <div className="metric-feature">
        <span>直近使用量</span>
        <strong>32.8 m3</strong>
        <p>前月比 +2.1 m3</p>
      </div>
      <div className="timeline-list">
        {meters.map((item) => (
          <article key={item.month} className="timeline-item">
            <div>
              <strong>{item.month}</strong>
              <span>検針日 {item.date}</span>
            </div>
            <dl>
              <dt>今回</dt>
              <dd>{item.current}</dd>
              <dt>前回</dt>
              <dd>{item.previous}</dd>
              <dt>使用量</dt>
              <dd>{item.usage}</dd>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function DevicesTab() {
  return (
    <div className="tab-content">
      <div className="warning-card">
        <AlertTriangle size={18} aria-hidden="true" />
        <div>
          <strong>警報器の交換目安が近い</strong>
          <span>訪問時に設置状況を確認</span>
        </div>
      </div>
      {devices.map((device) => (
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

function PaymentsTab() {
  return (
    <div className="tab-content">
      {payments.map((payment) => (
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

function SalesTab() {
  return (
    <div className="tab-content">
      <div className="two-column">
        {sales.map((sale) => (
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
