# Project Portfolio

Static portfolio for evidence-backed data, BI, machine-learning and applied-AI work.

[Open the live portfolio](https://sintagmatarches.github.io/portfolio/)

## Flagship projects

| Project | Evidence | Public result |
| --- | --- | --- |
| [EU Tender Intelligence Agent](https://github.com/Sintagmatarches/applied-ai-lab#eu-tender-intelligence-agent) | Official TED ingestion, lot-level qualification, a versioned 15-notice/30-query recorded-real corpus, holdout retrieval evaluation, CI eval gates and privacy-safe agent tracing | [Live Tender dashboard](https://applied-ai-lab.smjlw.chatgpt.site/eu-tender-intelligence-agent) |
| [Finland Rail Monitoring System](https://github.com/Sintagmatarches/applied-ai-lab#finland-rail-monitoring-system) | Live Digitraffic monitoring, geospatial analytics and an executable PySpark/Delta Bronze–Silver–Gold pipeline | [Live Rail monitor](https://applied-ai-lab.smjlw.chatgpt.site/finland-rail-reliability-monitor) |
| [Olist Delivery Delay Predictor](https://github.com/Sintagmatarches/applied-ai-lab#olist-delivery-delay-predictor) | Leakage-safe chronological ML evaluation and server inference with Python/TypeScript parity | [Live predictor](https://applied-ai-lab.smjlw.chatgpt.site/olist-delivery-delay-predictor) |

The deployed Olist baseline is documented against the 14,471-order final benchmark: **6.32% PR-AUC**, **63.44% ROC-AUC**, and **107 of 620** late orders found in the highest-risk 10%. The modest result is presented as relative ranking evidence rather than a calibrated probability claim.

## Implementation

The site deliberately remains framework-free HTML, CSS and JavaScript. GitHub Pages deploys `main`; the Applied AI Lab owns the model and data-product runtimes.

Run the deterministic validation suite with:

```bash
npm test
```

The checks cover required live/source links, local asset integrity, current benchmark claims, core accessibility invariants and cache-versioning.

## Additional work

- [European Historical Songbook](https://european-songbook-portfolio.pages.dev/) — multilingual catalog search and map navigation.
- [Olist Delivery Reliability report](https://sintagmatarches.github.io/portfolio/assets/olist-delivery-reliability-v2.pdf) — SQL / Power BI case study.
- [Estonia County Economic Livability report](https://sintagmatarches.github.io/portfolio/assets/estonia-county-economic-livability-v1.pdf) — county-level affordability and labour-market analysis.
