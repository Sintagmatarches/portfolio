# Project Portfolio

Static portfolio for evidence-backed data, BI, machine-learning and applied-AI work.

[Open the live portfolio](https://sintagmatarches.github.io/portfolio/)

## Flagship projects

| Project | Evidence | Public result |
| --- | --- | --- |
| [EU Tender Intelligence Agent](https://github.com/Sintagmatarches/applied-ai-lab#eu-tender-intelligence-agent) | Official TED ingestion, lot-level qualification, a versioned 15-notice/30-query recorded-real corpus, holdout retrieval evaluation, CI eval gates and privacy-safe agent tracing | [Live Tender dashboard](https://applied-ai-lab.smjlw.chatgpt.site/eu-tender-intelligence-agent) |
| [Finland Rail Monitoring System](https://github.com/Sintagmatarches/applied-ai-lab#finland-rail-monitoring-system) | Live Digitraffic monitoring, geospatial analytics and an executable PySpark/Delta Bronze–Silver–Gold pipeline | [Live Rail monitor](https://applied-ai-lab.smjlw.chatgpt.site/finland-rail-reliability-monitor) |
| [Olist Delivery Delay Predictor](https://github.com/Sintagmatarches/applied-ai-lab#olist-delivery-delay-predictor) | Leakage-safe chronological ML evaluation and server inference with Python/TypeScript parity | [Live predictor](https://applied-ai-lab.smjlw.chatgpt.site/olist-delivery-delay-predictor) |
| [Finland Geospatial AI](https://github.com/Sintagmatarches/finland-geospatial-ai) | PyTorch semantic segmentation of real Sentinel-2 imagery, held-out-AOI validation, error/calibration analysis and GeoTIFF inference | [Experiment report](https://github.com/Sintagmatarches/finland-geospatial-ai/blob/main/reports/experiment-report.md) |
| [Helsinki Water — Forecasting + Optimization](https://github.com/Sintagmatarches/helsinki-water-forecasting-optimization) | Real Helsinki water-meter data, expanding backtests, conformal uncertainty, residual anomaly triage, CP-SAT inspection planning and a peer-reviewed method reproduction | [Scientific report](https://github.com/Sintagmatarches/helsinki-water-forecasting-optimization/blob/main/reports/scientific-report.md) |

The deployed Olist baseline is documented against the 14,471-order final benchmark: **6.32% PR-AUC**, **63.44% ROC-AUC**, and **107 of 620** late orders found in the highest-risk 10%. The modest result is presented as relative ranking evidence rather than a calibrated probability claim.

Finland Geospatial AI reports **0.3982 held-out Oulu mIoU** and **0.4743 macro Dice** across six classes. Temperature scaling worsened geographic calibration and is documented as a negative result rather than an improvement.

Helsinki Water reports development-selected ETS at **0.793 MASE** on the sealed 2018 property panel and **97.92% coverage** for nominal 90% intervals. It preserves two important negative results: SARIMA performed better ex post on property MASE, while the base optimized policy improved 0% because all three candidates fit the resource budget; a binding eight-hour scenario produced a 14.59% gain.

## Implementation

The site deliberately remains framework-free HTML, CSS and JavaScript. GitHub Pages deploys `main`; the Applied AI Lab owns the model and data-product runtimes.

Run the deterministic validation suite with:

```bash
npm test
```

The checks cover required live/source links, local asset integrity, current benchmark claims, core accessibility invariants and cache-versioning.

`npm run verify:evidence` separately fetches current public evidence from the Water, Geospatial and Olist repositories and the GitHub profile. It checks seven source-derived headline values against the matching project cards, profile sections and this README. It requires network access and fails on unavailable evidence or drift; it does not replace the offline tests or validate every narrative claim.

The gallery's Helsinki Water benchmark is regenerated with that repository's `python -m helsinki_water.cli report` command from versioned `artifacts/v1.0.0/metrics.json`, then copied to `assets/water-forecast-benchmark.png`. It preserves both development selection and the sealed holdout comparison. Keep the source figure and its portfolio copy identical when updating evidence.

## Additional work

- [European Historical Songbook](https://european-songbook-portfolio.pages.dev/) — multilingual catalog search and map navigation.
- [Olist Delivery Reliability report](https://sintagmatarches.github.io/portfolio/assets/olist-delivery-reliability-v2.pdf) — SQL / Power BI case study.
- [Estonia County Economic Livability report](https://sintagmatarches.github.io/portfolio/assets/estonia-county-economic-livability-v1.pdf) — county-level affordability and labour-market analysis.
