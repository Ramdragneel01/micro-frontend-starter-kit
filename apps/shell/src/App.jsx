import React, { Suspense } from "react";

const fallbackStyle = {
    border: "1px dashed #94a3b8",
    borderRadius: 12,
    padding: 16,
    background: "#f8fafc",
    color: "#334155"
};

function RemoteMissing({ title }) {
    return (
        <div style={fallbackStyle}>
            <strong>{title}</strong>
            <div>Remote unavailable. Start all apps with `npm run dev`.</div>
        </div>
    );
}

function lazyRemote(loader, title) {
    return React.lazy(() => loader().catch(() => ({ default: () => <RemoteMissing title={title} /> })));
}

const ChatWidget = lazyRemote(() => import("aiChatWidget/Widget"), "AI Chat Widget");
const ObservabilityWidget = lazyRemote(
    () => import("observabilityWidget/Widget"),
    "Observability Widget"
);
const CostWidget = lazyRemote(() => import("costWidget/Widget"), "Cost Widget");

function Card({ title, children }) {
    return (
        <section className="card">
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    );
}

export default function App() {
    return (
        <main className="shell">
            <header>
                <h1>Micro Frontend Starter Kit</h1>
                <p>Webpack 5 Module Federation shell with three AI-focused widgets.</p>
            </header>
            <div className="grid">
                <Card title="Assistant Widget">
                    <Suspense fallback={<RemoteMissing title="Loading Assistant Widget" />}>
                        <ChatWidget />
                    </Suspense>
                </Card>
                <Card title="Observability Widget">
                    <Suspense fallback={<RemoteMissing title="Loading Observability Widget" />}>
                        <ObservabilityWidget />
                    </Suspense>
                </Card>
                <Card title="Cost Widget">
                    <Suspense fallback={<RemoteMissing title="Loading Cost Widget" />}>
                        <CostWidget />
                    </Suspense>
                </Card>
            </div>
        </main>
    );
}
