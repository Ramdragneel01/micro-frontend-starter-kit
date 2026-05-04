const PRICE_TABLE = {
  "gpt-4o": { inPer1k: 0.005, outPer1k: 0.015 },
  "gpt-4o-mini": { inPer1k: 0.00015, outPer1k: 0.0006 },
  "claude-3.5-sonnet": { inPer1k: 0.003, outPer1k: 0.015 }
};

function estimateTokenCost(model, promptTokens, completionTokens) {
  const price = PRICE_TABLE[model];
  if (!price) return 0;
  const inputCost = (Math.max(0, Number(promptTokens) || 0) / 1000) * price.inPer1k;
  const outputCost = (Math.max(0, Number(completionTokens) || 0) / 1000) * price.outPer1k;
  return Number((inputCost + outputCost).toFixed(6));
}

function latencySloColor(p95Ms) {
  const ms = Number(p95Ms) || 0;
  if (ms <= 600) return "green";
  if (ms <= 1200) return "amber";
  return "red";
}

function summarizeWidgetHealth(items) {
  const total = items.length;
  const healthy = items.filter((item) => item.status === "healthy").length;
  return {
    total,
    healthy,
    ratio: total === 0 ? 1 : healthy / total
  };
}

module.exports = {
  estimateTokenCost,
  latencySloColor,
  summarizeWidgetHealth
};
