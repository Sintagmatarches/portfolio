# Project Portfolio

![Portfolio projects overview](docs/screenshots/portfolio-overview-v20260803.png?v=20260803)

Static portfolio for web applications, machine-learning work, analytical case studies, and data visualizations.

[Open the live site](https://sintagmatarches.github.io/portfolio/)

## Selected work

### Web applications

- [Applied AI Lab](https://applied-ai-lab.smjlw.chatgpt.site/) — an interactive machine-learning site with a working Olist delivery-delay risk predictor. [Source code](https://github.com/Sintagmatarches/applied-ai-lab).
- [European Songbook](https://european-songbook-portfolio.pages.dev/) — a public demo of a multilingual historical-song catalog with search, filters, map navigation, and isolated administration simulations. [Source code](https://github.com/Sintagmatarches/european-songbook-showcase).

### Analytical case studies

- [Olist Delivery Reliability and Customer Reviews](https://sintagmatarches.github.io/portfolio/assets/olist-delivery-reliability-v2.pdf) — an analysis of late-delivery routes, customer reviews, and where delays accumulate.
- [Estonia County Economic Livability](https://sintagmatarches.github.io/portfolio/assets/estonia-county-economic-livability-v1.pdf) — a comparison of income, housing affordability, and labour-market conditions across 15 counties.

### Visualizations

- Estonian district-heating price comparison by county.
- Estonian median salary comparison and quarterly trends by county.

## Key decisions

- **Metric:** I use decision-relevant measures instead of headline accuracy. For the imbalanced delivery-risk problem, PR-AUC and late-order capture in the top-risk 10% show whether the ranking can support a review queue; the analytical reports use transparent rates and comparable indicators that readers can trace back to source data.
- **Model:** I selected logistic regression after comparing it with XGBoost and CatBoost across sequential backtests. It produced the strongest stability-adjusted PR-AUC and remains explainable and portable enough for server-side inference.
- **Time split:** I kept model selection, calibration, and the newest final test in chronological order. This matches the real task of predicting future orders and avoids the optimistic leakage that a random split would introduce.
- **Architecture:** I kept the portfolio as framework-free HTML, CSS, and JavaScript for a fast, low-maintenance GitHub Pages deployment, while the trained model runs behind a separate server-side API so model logic and validation are not delegated to the browser.

## Implementation

The site uses semantic HTML, CSS, and JavaScript without a frontend framework. Project cards are grouped by work type, and one-page reports and charts open in a full-size viewer.

## Repository structure

- `index.html` — content and page structure;
- `styles.css` — responsive layout and visual design;
- `script.js` — filtering and full-size media viewing;
- `assets/` — project previews, reports, and visualizations;
- `docs/screenshots/` — versioned production screenshots used in repository documentation.

## Validation

Open `index.html` locally or use any static file server. Production is deployed from `main` through GitHub Pages.
