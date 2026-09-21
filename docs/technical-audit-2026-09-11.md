# Portfolio technical audit — 11 September 2026

## Scope and evidence standard

Reviewed the local source checkouts of all five primary repositories and the Songbook
showcase; fetched GitHub main branches to confirm the starting revisions matched.
Starting revisions: applied-ai-lab `87b6928`, geospatial `7dcaa38`, Water `9cf305d`,
portfolio `f19ca7e`, profile `f286b48`. This is a source/test/operational review, not
a penetration test or an independent replication of every historical experiment.
No commercial traffic, users, savings, Azure deployment or tenant BI publication
is inferred from infrastructure files. Frozen evaluation is evidence of a bounded
experiment, not a guarantee of quality on new data.

Read application entrypoints, inference/model factories, data acquisition and
transforms, contracts, selection/evaluation and artifact metadata, tests, dependency
manifests, GitHub workflows, Dockerfiles, Azure Terraform, semantic-model assets and
runbooks. The interview guide names the critical source files. Baselines were run
before editing each code repository. No final benchmark or sealed test was used
to choose a new model. The existing public Sites deployment and GitHub Pages
configuration were inspected; release verification is in the final report.

## Verdict and ranking

The existing portfolio provides enough breadth to apply now to junior Data, ML and
Applied AI engineering roles. It is materially more defensible than notebook-only
coursework, provided the owner can debug and explain the code without assistance.
It does not establish commercial experience, multi-engineer collaboration, incident
ownership, large-scale cloud operations or a production-grade ML platform.

Overall: **Rail → Geospatial → Tender → Water → Olist**. For ML/CV vacancies lead
with Geospatial; for Applied AI lead with Tender; for Data/Analytics Engineering
lead with Rail. Water is the strongest scientific-reasoning discussion. Olist is
valuable chiefly for point-in-time correctness and serving parity, not model quality.

## EU Tender Intelligence Agent

**A — Proven capabilities.** Official TED ingestion and XML enrichment, lot-level
normalization, SQLite/FTS persistence, local embedding retrieval, deterministic
qualification, bounded tool dispatch, grounding gates and FastAPI. Docker runs as
a non-root user; Terraform declares a private Azure Container App and logs workspace.

**B — Reproducible claims.** The checked-in evaluation has 15 recorded real notices,
30 queries and notice-grouped tuning/holdout separation. CI replays actual recorded
embedding similarities plus adversarial cases. The replay is reproducible; it is
not fresh online inference or independently labelled procurement accuracy. The
deterministic security/qualification tests and cross-language tender tests are real.

**C — Interview value.** Trusted supplier context cannot be rewritten by model tool
arguments; mandatory failure dominates an attractive opportunity score. Evidence
identifiers, lot scope and numeric claims are checked after generation. Explain
why a deterministic fallback is a separate outcome, even when HTTP returns 200.

**D — Artificial/overbuilt risk.** Numerous tools and report layers can look more
ambitious than the small corpus warrants. Curated near-perfect retrieval is not a
production hallucination rate. The public Worker does not expose the local agent.

**E — Missing production skill.** Durable Azure state, managed identity/secret flow,
authenticated private access, pilot load measurements, backup/restore, external
telemetry backend and an operated alert/rollback drill. Existing `/health` mixed
dependency diagnostics with liveness. The time budget is cooperative between calls.
Direct Application Insights integration and actual Azure promotion remain unproven.

**F — Defend personally.** `assessment.py`, `grounding.py`, `tools.py`, `agent.py`,
`storage.py`, `ted.py`, `retrieval.py`, `server.py`, new `telemetry.py` and their tests.
Explain local sensitive evaluation traces versus the strictly allowlisted exported
operational events. A key blacklist or query hash alone is not a privacy guarantee.

**G — Preserve.** Deterministic qualification, limited agency, public/private runtime
separation, honest evaluation classes, bounded TED retries and original evaluation.

**H — ROI.** P0 health semantics and safe operations instrumentation are justified.
Cloud exporter/alert provisioning is P1 until state and credentials are resolved.
A new agent framework, vector database or replacing eligibility with an LLM is DROP.

## Finland Rail Monitoring System

**A.** Real Digitraffic ingestion; reproducible gzip partitions; PySpark/Delta
Bronze/Silver/Gold; departure-date replacement; content-hash watermarks; regional
aggregation; governed publication; DAX and SQL/model specifications. This already
fills most of the proposed new Data Engineering project's competency map.

**B.** Historical snapshot: 403,054 modelled journeys, 400,518 completed final
arrivals and 95.81% within five minutes. Local tests validate denominators and
publication integrity. Spark CI exercises Delta writes, reruns and seven-day
publication. A spec or notebook is not proof of Fabric deployment or a saved PBIP.

**C.** Distinguishing cancelled, completed, measured and scheduled journeys;
late/corrected partition replacement; recomputation of affected complete windows;
quality failures stopping watermark advancement; content hashes on remote publication.

**D.** Fabric/Databricks notebooks, backlog and stakeholder simulation should remain
supporting assets. They do not imply real customers or team requirements. Daily
polling is incremental batch; adding Kafka would be artificial here.

**E.** The registry checks required columns but not a full typed evolution contract;
Delta auto-merge is enabled. Gold has executable journey/regional grains, while the
complete Date/Route/Service star is partly a BI specification. Several marts rescan
history. Source-only watermarks need forced backfills after transform/mapping changes.
Per-table ACID does not guarantee a coherent multi-table snapshot. Single-writer
operation and the publication boundary must be explicit. No measured large-scale
throughput, Direct Lake performance or real tenant semantic-model evidence exists.

**F.** Study `rail/pipeline.py`, `lakehouse/{pipeline,snapshot,planning,spark,transforms,
contracts,quality}.py`, `rail/publication.py`, `lib/rail-publication.ts`, the Spark
integration test and `power-bi/{semantic-model.md,measures.dax}`. Explain business
keys, grains, source correction, partial commits and why rates cannot be summed.

**G.** Preserve departure-date partitioning, explicit KPI denominators, unknown/missing
semantics, content-addressed raw retention, regional facts instead of ambiguous
journey-to-region joins and the existing honest Fabric boundary.

**H.** P0 exact-byte provenance and an injected commit-failure recovery test. P1 typed
schema migrations, transform-version invalidation and a real BI publishing exercise.
Do not add streaming, dbt or Airflow unless the existing workload requires them.

## Olist Delivery Delay Predictor

**A.** Relational source assembly, feature availability rules, chronological model
comparison, fixed test evaluation and portable TypeScript inference. The deployed
logistic artifact includes transformations, histories, domain and version metadata.

**B.** 14,471-order final benchmark: 6.32% PR-AUC, 63.44% ROC-AUC; 107 of 620 late
orders captured in the top risk decile. Python fixtures match built-Worker scoring.
This is weak/modest relative ranking, not a calibrated probability or business lift.

**C.** Outcome history becomes available at delivery, while order counts become
available at purchase; same-day history is excluded. Runtime uses the same feature
contract. Retaining a simple baseline after boosted alternatives is a strong decision.

**D.** Additional tuning or production drift charts with no new labelled traffic
would be misleading. Historical valid input dates intentionally exclude current orders.

**E.** No prospective deployment, operationally collected calibration cohort,
traffic canary or managed registry. Existing feature versioning was already present;
external request/response version negotiation and artifact identification were missing.

**F.** `ml/{build_dataset,temporal_features,model_selection,final_benchmark,parity,
runtime_reference}.py`, `lib/olist-model.ts`, `olist-input-contract.ts` and both API routes.
Know the distinction between calibration, ranking, risk percentiles and causal effects.

**G.** Preserve the final benchmark, chronological boundary, invalid-date rejection,
modest score reporting, logistic baseline and cross-language parity tests.

**H.** P0 serving schema/version/digest evidence is small and useful. P1 batch scoring
only with a real consumption use case. New registry infrastructure, fake drift traffic
or final-test tuning is DROP.

## Finland Geospatial AI

**A.** Official NLS orthophotos/vector supervision, geospatial validation, native
alignment, spatially separated manifests, PyTorch training, MLflow logging,
validation-only selection, hash-locked evaluation and georeferenced inference.

**B.** The selected E3 SegFormer reports 0.6652 mIoU / 0.7742 macro Dice on 96 held-out
patches. The source manifest covers 576 patches across five sheets with 512 m buffers.
Selection checks common dataset/split/class-map identity and candidate weight hashes.
The selected checkpoint hash and strict offline CPU load were verified during this
audit. Headline evaluation was inspected, not rerun for model selection.

**C.** Spatial leakage controls, official-label limitations, boundary ignore policy,
class-specific errors, calibrated uncertainty analysis and loss/metric tests. Strong
interview material is why open-natural IoU is 0.3300 while water is 0.9636.

**D.** Two source trees represent v1/v2, not two interchangeable scores. MLflow and
generated model cards already exist; another registry demo would add little.
The old full-image probability buffer contradicted an unqualified memory-safe claim.

**E.** Serving needed row buffering, decoded-image bounds, overload/cleanup tests and
offline model loading. The training `pretrained` flag caused redundant hub retrieval
before loading final weights. The installed old environment had 84 advisory matches
across 10 packages; this is a dependency finding, not 84 demonstrated exploits.
Public hosting still needs ingress/authentication, GDAL isolation and resource limits.
GPU reproducibility and representative latency/RSS/drift evidence remain unmeasured.

**F.** `datasets/{build,manifest,validate,dataset}.py`, `labels/rasterize.py`,
`geospatial/raster.py`, `training/engine.py`, `evaluation/{selection,run,metrics}.py`,
`models/factory.py`, `inference/predictor.py` and `api.py`. Know why deterministic
seeds do not guarantee identical execution across hardware/library versions.

**G.** Preserve sealed-test discipline, official sources, data hashes, original
checkpoint, model comparison, class limitations and v1/v2 non-comparability.

**H.** P0 serving/resource fixes and vulnerable dependency remediation with fresh
environment, tests and an actual-artifact compatibility check. P1 load benchmarks,
container image scanning and prospective drift strategy. Retraining for prettier
mIoU, another API wrapper or another model-card generator is DROP.

## Helsinki Water forecasting and optimization

**A.** Official source audit/acquisition, panel validation, expanding backtests,
sealed 2018 evaluation, ETS/SARIMA/baselines, conformal uncertainty, residual triage,
CP-SAT allocation and numerical verification with explicit model-specific tolerances.

**B.** 864 observations across eight properties. Development selected ETS; final
property MASE 0.793, empirical nominal-90% coverage 97.92%. SARIMA wins ex post on
property MASE. Base optimization gain is 0%; the eight-hour scenario yields 14.59%
expected-value gain, not realized savings. CI regenerates and compares artifacts.

**C.** Explaining why an optimizer should do nothing when all candidates fit, why
conservative intervals are not automatically good, and why anomalies are not verified
leaks. Honest negative findings and narrow numerical tolerances are strengths.

**D.** Calling eight historical properties a utility production platform would weaken
the work. Typed dataclass/TOML config, manifest and generated figures already exist.

**E.** Config values lacked construction-time semantic checks, allowing an accidental
overlap of development targets and final holdout. No scheduler/operated service is
needed for this historical study. Pytest had one advisory; runtime audit was clean
in the inspected environment. Scientific sample size/generalization remain limited.

**F.** `config.py`, `data.py`, `validation.py`, `backtest.py`, `models.py`,
`uncertainty.py`, `optimization.py`, `experiment.py` and `verification.py`.
Explain how residual calibration avoids future data and which costs are assumptions.

**G.** Preserve datasets, versioned metrics, selected model, zero-gain result,
conformal limitations, SARIMA comparison and reproduction tolerances.

**H.** P0 config invariants and test dependency patch; both are small. Report/lineage
duplication, a scheduler for static history or pretending to run a utility is DROP.

## Portfolio, profile and secondary work

The portfolio already has five flagship cards, direct evidence links, limitations
and static-link/benchmark tests. Keep the simple HTML/CSS/JS structure. The useful
presentation gap is explicit junior engineering positioning and quicker access to
the new operational evidence, not longer READMEs or a redesign. Fifty certificates
are secondary supporting material, not engineering proof.

The Songbook showcase contains tested request-security, SQL-list and line-diff
utilities, an isolated catalog/demo boundary and CI. Retain as secondary full-stack
work, unpinned for Data/ML roles. Do not invest in duplicate Songbook showcases.
The account inventory contains many HOMEWORK/week/project repositories; sampled
`homework` exposes a RAR assignment, and `work-experience` an HTML site. Names are
not commercial experience. De-emphasize old coursework; archive only after confirming
no course/grading or reference links rely on it. No blanket deletion or mass archive
was performed. No collaboration was fabricated.

Recommended pins: `applied-ai-lab`, `finland-geospatial-ai`,
`helsinki-water-forecasting-optimization`, `portfolio`. Do not fill all six slots
merely because GitHub permits it. The profile repository need not consume a pin.

## Cross-portfolio priority register

| Priority | Improvement | Hiring value / complexity decision |
| --- | --- | --- |
| P0 | Fix geospatial resource behavior, offline loading and vulnerable dependencies | Direct evidence of debugging, secure maintenance and serving correctness |
| P0 | Tender independent health and safe operational telemetry | Demonstrates operating an AI service without leaking user data |
| P0 | Rail exact-byte snapshots and real fault-injection recovery | Demonstrates ingestion lineage and failure reasoning |
| P0 | Olist serving identity and schema evolution boundary | Makes tested model/runtime version observable |
| P0 | Water split/config invariants | Prevents invalid scientific execution with little complexity |
| P0 | Learn/defend the existing code; begin applications | More valuable than increasing project count |
| P1 | First genuine reviewed open-source contribution | Fills the solo-work evidence gap; requires human submission |
| P1 | Durable authenticated Azure pilot and restore drill | Useful only with credentials, budget, persistence and an owner |
| P1 | Rail typed schema migration and transform-version invalidation | Strengthens existing pipeline; no new repo needed |
| P1 | Actual Power BI/Fabric publication with reconciliation | Converts design assets into verified tenant evidence |
| P1 | Representative serving load/RSS measurements and CI action SHA pins | Useful hardening after correctness; no fabricated benchmark |
| P2 | More badges, certificates, animation or README prose | Low marginal hiring value |
| DROP | Kafka for a polling source; another generic model/chatbot | Adds maintenance without a missing competency |
| DROP | Test-set tuning; manufactured traffic/collaboration/impact | Destroys credibility |

**New project decision: not needed.** Rail already supports real ingestion → immutable
raw → validation → incremental Delta transforms → facts/marts → governed publication
→ orchestration/quality/CI. Extend its real schema/publication weaknesses instead.

## Engineering references used

- [Sculley et al., Hidden Technical Debt in ML Systems](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf): judge dependencies, consumers and system boundaries, not model code alone.
- [Breck et al., The ML Test Score](https://research.google.com/pubs/archive/aad9f93b86b7addfea4c419b9100c6cdd26cacea.pdf): test data, infrastructure, model behavior and monitoring separately; no numerical maturity score is invented here.
- [OpenTelemetry sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/) and [Python instrumentation](https://opentelemetry.io/docs/languages/python/instrumentation/): manual allowlisted telemetry, no automatic payload/exception capture.
- [Delta batch writes](https://docs.delta.io/delta-batch/) and [concurrency control](https://docs.delta.io/concurrency-control/): per-table transactions and idempotent application behavior are different guarantees.
- [Azure safe deployments](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments) and [Container Apps probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes): health gates, rollback and dependency-aware readiness.
- [FastAPI lifespan](https://fastapi.tiangolo.com/advanced/events/): telemetry provider lifecycle rather than import-time exporter side effects.
- [PyTorch reproducibility](https://docs.pytorch.org/docs/stable/notes/randomness.html) and [supported version pairs](https://pytorch.org/get-started/previous-versions/): preserve scientific provenance and validate runtime upgrades.
- [Transformers v5 migration](https://github.com/huggingface/transformers/blob/main/MIGRATION_GUIDE_V5.md): compatibility must be checked, not assumed from a version bump.
- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use): read-only token defaults, dependency review and immutable action references remain distinct from passing unit tests.
