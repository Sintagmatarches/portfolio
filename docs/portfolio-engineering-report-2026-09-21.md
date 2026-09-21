# Portfolio engineering report — 2026-09-21

## Portfolio verdict

The portfolio is sufficient to support applications for junior Data Engineer, Analytics Engineer, ML Engineer, Applied AI Engineer, and AI Engineer roles. It provides unusually broad evidence for a candidate without commercial engineering experience: real public data, reproducible pipelines, leakage-aware evaluation, tested APIs, containers, CI, infrastructure code, and explicit negative results. The remaining weakness is operational evidence from systems that have actually run in a shared cloud environment. That gap should be described honestly rather than covered with more architecture diagrams.

## Strongest projects

1. **Finland Rail Monitoring System** — strongest Data/Analytics Engineering evidence: content-addressed source snapshots, Bronze/Silver/Gold Delta processing, deterministic reruns, recovery tests, Spark quality gates, a dimensional Gold model, and Power BI/DAX assets.
2. **Finland Geospatial AI** — strongest ML/CV Engineering evidence: geographic split discipline, hash-locked manifests and artifacts, MLflow, memory-bounded tiled GeoTIFF inference, API failure boundaries, container checks, and model/runtime compatibility tests.
3. **EU Tender Intelligence Agent** — strongest Applied AI evidence: deterministic supplier qualification, bounded tools, hybrid retrieval, security/evaluation gates, and safe operational telemetry. It still lacks a credentialed cloud deployment and measured production history.
4. **Helsinki Water Forecasting + Optimization** — strongest scientific and decision-modelling evidence: expanding-window validation, sealed holdout, conformal intervals, anomaly triage, CP-SAT, and reproducible negative findings.
5. **Olist Delivery Delay Predictor** — useful ML serving evidence: point-in-time features, chronological evaluation, explicit versioned serving contract, runtime parity, and honest modest model performance.

## Hiring gaps

- No verified Azure deployment, rollback exercise, or real alert history for the Tender API.
- Rail has working local/CI lakehouse evidence, but no published Fabric workspace, scheduled run history, or viewable Power BI semantic model.
- Geospatial inference has container and local API evidence, but no deployed service, production latency distribution, or real image-drift history.
- Olist monitoring and canary/rollback are designed contracts rather than observations from production traffic.
- Nearly all engineering evidence is solo work; one reviewed upstream contribution would add more credibility than another repository.

## Changes implemented

### `applied-ai-lab`

- Added allowlisted JSON logs, correlation IDs, OpenTelemetry spans and low-cardinality metrics without raw questions, supplier profiles, request bodies, headers, or secrets.
- Added dependency-free `/live`, dependency-aware `/ready`, TED/tool/retrieval/fallback outcome instrumentation, bounded upstream calls, an operational smoke probe, SLOs, alert queries, failure handling, and rollback instructions.
- Added a versioned Olist request/response contract and a model metadata endpoint exposing the exact artifact digest.
- Added exact-byte Rail source snapshots with atomic publication, hash verification, corrected-source handling, deterministic reruns, and a crash-before-watermark recovery test.

### `finland-geospatial-ai`

- Reworked tiled inference to stream completed output rows and bound blending memory by tile height and raster width.
- Added preflight all-NoData and decoded-size validation, sanitized API errors, serialized model loading, non-blocking overload rejection, and upload/pixel limits.
- Added checkpoint-integrity verification before model construction and an exact, tested Transformers v5 state-key migration with unchanged tensors.
- Updated the runtime, removed known dependency advisories in a clean environment, added `pip check`, `pip-audit`, SBOM generation, a non-root container, and `/live` health checks.

### `helsinki-water-forecasting-optimization`

- Added a typed configuration contract for time ordering, sealed holdout boundaries, horizons, intervals, property identifiers, output paths, and optimization parameters.
- Added focused contract tests and operating documentation while leaving the scientific design and reported results unchanged.

### `portfolio` and profile

- Repositioned the profile as **Junior Data / AI / ML Engineer** and surfaced concrete evidence for the requested stack.
- Reduced project descriptions to problem, system, measurable evidence, source/architecture links, and limitations.
- Added the full technical audit, an interview defence guide with 10 questions per flagship project, and current upstream contribution candidates.
- Updated asset cache keys so the deployed pages fetch the reviewed revision.

## Test evidence

- Applied AI Lab: `npm test` — Next production build, **16 rendered/API checks**, **46 TypeScript tests**, and **56 Tender tests** passed; `python -m pytest rail/lakehouse/tests -q` — **9 passed, 3 Spark tests skipped locally**; `npm audit` and `pip-audit -r requirements-ai.txt` — **0 known vulnerabilities**. The Tender container built successfully; `/live` returned 200, while `/ready` correctly returned 503 without its configured Ollama dependency.
- Geospatial AI, clean Python 3.12 environment: `pytest` — **64 passed, 79.57% coverage**; `ruff check .` — passed; `mypy src` — **53 files passed**; `pip check` — no broken requirements; `pip-audit` — **0 known vulnerabilities** among resolvable PyPI packages. Published checkpoint strict-load passed, and old/new runtime parity measured maximum absolute logit difference `3.81469727e-06` with identical argmax output.
- Water: `pytest` — **35 passed**; `ruff check .` and strict `mypy` — passed; full experiment and report CLIs completed without changing tracked scientific artifacts; `pip-audit` — **0 known vulnerabilities**.
- Portfolio: `npm test` — **8 passed**.
- Geospatial and Tender OCI images built successfully. The geospatial container returned 200 from `/live`, reported the synthetic smoke model ready, and produced a ZIP containing `prediction.tif`, `confidence.tif`, and `summary.json`. Hosted smoke checks and GitHub Actions results are recorded in the deployment history for the associated commits.

## New project decision

**Not needed.** Rail already covers the meaningful ingestion → immutable raw snapshot → validation → incremental Delta transformation → dimensional model → quality gate → BI path. A new generic lakehouse repository would repeat evidence. Publishing or operating the existing pipeline has higher hiring value.

## Manual actions

- Provision an Azure environment and repository secrets, then run the Tender deployment workflow; retain smoke, alert, and rollback evidence. No Azure deployment is claimed today.
- Publish the Rail Fabric/Power BI assets and capture semantic-model relationships, refresh history, and one recovery exercise.
- Pin, in order: `applied-ai-lab`, `finland-geospatial-ai`, `helsinki-water-forecasting-optimization`, `portfolio`, and optionally `european-songbook-showcase` only for frontend breadth.
- Archive or de-emphasize old homework repositories after checking that no CV or application links depend on them.
- Choose one issue from the contribution shortlist, reproduce it, discuss the intended patch with the maintainer when appropriate, and submit the work personally. No contribution was submitted automatically.

## Interview study

Study the exact files listed in [`PORTFOLIO_ENGINEERING_DEFENSE.md`](../PORTFOLIO_ENGINEERING_DEFENSE.md). Be able to explain Rail grain/idempotency/correction semantics; geospatial split leakage, tiled blending and checkpoint integrity; Tender trust boundaries, deterministic qualification and safe telemetry; water holdout/conformal/CP-SAT assumptions; and Olist point-in-time feature construction, calibration, schema versioning, and runtime parity. Do not claim Azure, Fabric, Power BI publication, or production monitoring experience until you can show the corresponding run evidence.

## Next 10 actions by hiring ROI

1. Deploy the Tender API to Azure with real credentials and preserve smoke, readiness, alert, and rollback evidence.
2. Publish the Rail semantic model/dashboard to Fabric or Power BI and show relationships, refresh history, and a failed-run recovery.
3. Make one small reviewed open-source contribution from the documented shortlist.
4. Practise the defence guide from code: explain one flagship project per day without reading the README.
5. Run and document a Rail corrected-source backfill against a larger date range, including runtime and file-size measurements.
6. Benchmark geospatial container latency and peak memory on two realistic raster sizes and publish the reproducible command and hardware context.
7. Exercise Tender rollback in the Azure environment and record which revision, probe, and alert triggered the decision.
8. Add Olist batch-scoring and drift-report artifacts only when there is a real scheduled execution target.
9. Pin the five recommended repositories and remove weak coursework from the first profile screen.
10. Tailor each application around two relevant systems and their limitations instead of listing every technology.
