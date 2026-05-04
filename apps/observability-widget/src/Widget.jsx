import React from "react";
import { latencySloColor, summarizeWidgetHealth } from "@mfe/widget-core";

const rows = [
    { name: "Retriever", p95Ms: 420, status: "healthy" },
    { name: "Ranker", p95Ms: 730, status: "healthy" },
    { name: "Responder", p95Ms: 1380, status: "degraded" }
];

export default function Widget() {
    const summary = summarizeWidgetHealth(rows);

    return (
        <div>
            <div style={{ marginBottom: 8 }}>
                Healthy services: {summary.healthy}/{summary.total}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th align="left">Service</th>
                        <th align="left">p95 (ms)</th>
                        <th align="left">SLO</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.p95Ms}</td>
                            <td style={{ color: latencySloColor(item.p95Ms), fontWeight: 700 }}>{latencySloColor(item.p95Ms)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
