import React, { useMemo, useState } from "react";
import { estimateTokenCost } from "@mfe/widget-core";

export default function Widget() {
    const [promptTokens, setPromptTokens] = useState(2400);
    const [completionTokens, setCompletionTokens] = useState(700);
    const [model, setModel] = useState("gpt-4o-mini");

    const cost = useMemo(
        () => estimateTokenCost(model, promptTokens, completionTokens),
        [model, promptTokens, completionTokens]
    );

    return (
        <div style={{ display: "grid", gap: 10 }}>
            <label>
                Model
                <select value={model} onChange={(e) => setModel(e.target.value)} style={{ marginLeft: 8 }}>
                    <option value="gpt-4o-mini">gpt-4o-mini</option>
                    <option value="gpt-4o">gpt-4o</option>
                    <option value="claude-3.5-sonnet">claude-3.5-sonnet</option>
                </select>
            </label>
            <label>
                Prompt tokens: {promptTokens}
                <input
                    type="range"
                    min="100"
                    max="8000"
                    value={promptTokens}
                    onChange={(e) => setPromptTokens(Number(e.target.value))}
                />
            </label>
            <label>
                Completion tokens: {completionTokens}
                <input
                    type="range"
                    min="50"
                    max="4000"
                    value={completionTokens}
                    onChange={(e) => setCompletionTokens(Number(e.target.value))}
                />
            </label>
            <div style={{ fontWeight: 700 }}>Estimated request cost: ${cost.toFixed(6)}</div>
        </div>
    );
}
