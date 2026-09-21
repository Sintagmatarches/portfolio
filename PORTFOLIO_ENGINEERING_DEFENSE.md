# Portfolio engineering defense

Learning notes, not a script for claiming experience. Reproduce the checks, change
a fixture, explain a failure, and locate the relevant implementation before putting
a skill on a CV. Distinguish implemented, tested, deployed and operated. All five
projects use public/historical evidence; none proves commercial impact or team work.

## 1. EU Tender Intelligence Agent

**30 seconds.** I built a procurement evidence system around official TED notices.
It normalizes lots, assesses supplier eligibility with deterministic rules, stores
versioned evidence and lets a bounded local agent retrieve and explain it. A final
gate rejects unsupported claims. The public dashboard offers discovery and deterministic
assessment; the persistent agent runs privately. The evaluation is deliberately small.

**Architecture and data flow.** TED Search/XML → bounded fetch and normalization →
SQLite notices/lots/requirements/evidence/version history → FTS + local embeddings →
tool registry → agent loop → grounding gate → API response. The public Cloudflare
Worker and private FastAPI/Ollama runtime have different trust and deployment boundaries.

**Design decisions and technology.** Python handles extraction and testable business
rules. SQLite provides local transactions and FTS without an unnecessary database
service. Local embeddings avoid sending procurement questions to a hosted model.
FastAPI exposes typed outer requests; Docker packages the private runtime. Terraform
is a reviewed infrastructure scaffold, not proof of deployment. OpenTelemetry is
manual so external telemetry cannot silently collect prompts, bodies or exceptions.

**Trade-off and biggest failure mode.** Exact bounded vector scanning and a small
local model are understandable and cheap, but neither scales arbitrarily. A plausible
answer with mis-scoped evidence is more dangerous than an explicit unknown. The
grounding gate verifies specific structural/numeric/scope properties; it cannot prove
every semantic claim or legal interpretation.

**Testing.** Unit tests cover normalization, lot qualification, version changes,
tool validation and injected/forged claims. Recorded-real retrieval replay is separate
from synthetic security tests. Operational tests check readiness outages, generated
correlation, exception privacy and actual in-memory OTel export. Replay success is
not a real-world hallucination rate.

**Deployment.** Public discovery runs in Sites/Cloudflare. Private runtime is containerized
with separate liveness and readiness. Azure has no verified durable runtime deployment:
the current scaffold leaves SQLite ephemeral. Roll back image plus compatible database
schema; use a SQLite-consistent backup before migrations and test the restore.

**Leakage/security.** Retrieved text is untrusted data. Trusted supplier facts never
come from model tool arguments. Keep notice groups out of both tuning and holdout.
No raw user questions/profiles or exception strings go to operational telemetry;
local evaluation trace files require a separate privacy/retention policy. An API
key, auth layer, network boundary and private model endpoint are deployment concerns.

**Scale and 10× load.** Measure model latency, queueing and SQLite contention first.
Apply admission limits, move ingestion off request paths, batch embeddings and use
an indexed retrieval store only when exact scan measurements justify it. Model work
dominates many requests; adding web replicas alone can overload the same model host.

**In a company.** Agree on the legal meaning and review process for qualification,
obtain independently labelled evaluation cases, enforce tenant access, govern data
retention, choose durable state, set a measured SLO and assign an incident owner.

**10 interview questions and concise answers**

1. Why not let an LLM decide eligibility? Mandatory criteria need predictable,
   inspectable treatment of missing/failed facts. The model explains evidence; it
   cannot override deterministic qualification.
2. What makes hybrid retrieval hybrid? It combines lexical match and embedding
   similarity. Weights are chosen on tuning queries; notice-grouped holdout queries
   check the frozen choice.
3. Does a citation prove an answer? No. A real ID may cite the wrong notice/lot or
   support a different number. The post-generation gate checks more than ID existence.
4. What happens if Ollama fails? Publish no model claim; return a labelled unavailable
   or permitted deterministic result. Record the actual outcome, even on HTTP 200.
5. Are agent time limits strict deadlines? No. Step/tool budgets are explicit, but
   elapsed-time checks occur between blocking calls; each call has its own timeout.
6. Why separate `/live` and `/ready`? A healthy process should not restart because a
   dependency is down. Readiness withholds traffic when required dependencies fail.
7. What are safe metric dimensions? Fixed operation, route template, outcome and
   status class. Request IDs belong in logs/traces, never metric dimensions.
8. What does the evaluation establish? Reproducibility on 15 selected notices and
   30 correlated queries, plus security regressions. It does not establish broad EU
   coverage, independent human agreement or production accuracy.
9. Why is the Azure scaffold not production-ready? The private app lacks a verified
   durable database/restore path and operated authentication/monitoring; max one
   ephemeral replica does not make persistent state durable.
10. How do you roll back? Redeploy the prior immutable application version, verify
    health and a known notice, and handle database compatibility separately. Reverting
    code does not automatically revert data migrations.

**Study these exact files in `applied-ai-lab`:** `tender_ai/assessment.py`,
`tender_ai/domain.py`, `tender_ai/ted.py`, `tender_ai/storage.py`,
`tender_ai/retrieval.py`, `tender_ai/tools.py`, `tender_ai/agent.py`,
`tender_ai/grounding.py`, `tender_ai/server.py`, `tender_ai/telemetry.py`,
`tender_ai/tests/test_operations.py`, `infra/azure-tender/main.tf`.

## 2. Finland Rail Monitoring System

**30 seconds.** I built a reproducible rail data product from Digitraffic. It retains
raw partitions, transforms them into Delta journey and arrival facts, validates
business keys and quality, and publishes daily/regional metrics. Corrected source
dates are reprocessed using hashes. A public monitor consumes governed snapshots;
Power BI/Fabric assets are supplied without claiming tenant publication.

**Architecture and data flow.** Completed-date API polling → validated source cache →
exact-byte immutable Bronze snapshot + manifest → PySpark normalization → Silver
journeys/arrivals → Delta Gold facts and regional/network/route/station marts →
quality/reconciliation → success watermark → governed publication → browser/BI.

**Decisions and technology.** Python handles acquisition and content hashing; Spark
expresses relational transformations and Delta supplies per-table ACID/partition
replacement. Partition by departure date because correction/backfill works at that
grain. DAX expresses measure semantics, while separate regional facts avoid a
many-to-many journey/region relationship. A scheduled batch fits a polling source.

**Trade-off and biggest failure mode.** Full route/station aggregate refreshes are
simple but rescan history. A failed multi-table run can expose mixed table versions;
Delta's table transaction is not a distributed transaction. Governed publication
and successful watermarks are the consumption boundary, under a single writer.

**Testing.** Source/KPI tests, contract/planning tests, publication tamper/freshness
tests and real Spark/Delta integration. The recovery test injects a failure after
Gold writes but before watermark advancement, then retries a corrected partition.
The source snapshot test catches mid-run source replacement and corrupt Bronze bytes.

**Deployment.** GitHub Actions orchestrates acquisition/publication and Spark CI.
The public monitor is a Worker; the lakehouse is not running inside that Worker.
Fabric notebooks and semantic-model specification need a real tenant deployment
and reconciliation. Recover a failed date by rerunning it; force backfills after
transform/mapping changes because source hashes alone cannot identify changed logic.

**Leakage/security.** This is descriptive analytics, not predictive ML. Preserve
event-time/departure-date semantics, as-of source availability and corrected records.
Reject impossible data instead of coercing it into attractive punctuality. Public
source data still needs endpoint allowlists, request budgets and protected publication
credentials. Hash verification is integrity, not proof of trusted publisher identity.

**Scale and 10× load.** Profile shuffle/read/write counts and per-partition runtime.
Avoid excessive tiny files, tune partitions from measurements, persist reused frames,
and recompute only affected aggregates where needed. Do not introduce Kafka to solve
a batch transformation problem. Multi-writer operation requires explicit coordination.

**In a company.** Agree on grain and KPI owners, make typed schema evolution explicit,
track transform/mapping versions in invalidation, publish named Delta versions as a
consistent snapshot, govern access and validate BI relationships with users.

**10 questions and answers**

1. What is the journey fact grain? One modelled passenger journey identified by
   departure date and train number. Arrival facts have a finer stop/time grain.
2. What makes a rerun idempotent? Same successful source hash skips; changed or
   forced dates replace their partitions rather than appending duplicate facts.
3. How is corrected historical data handled? Refresh the source date, preserve a
   new immutable snapshot, replace affected partitions and rebuild affected windows.
4. Why hash copied bytes? Hashing one read and processing another can mix source
   versions. The accepted snapshot, validated JSON and Spark input must be identical.
5. When is the watermark advanced? After the corresponding transformations and
   publication checks. A failure before advancement causes safe reprocessing.
6. Does Delta make the whole pipeline atomic? No. ACID applies per table. Consumers
   need a publication boundary or a manifest of consistent table versions.
7. Can you add daily punctuality percentages? No. Sum eligible numerators and
   denominators, then divide. Cancellation and missing actuals alter the denominator.
8. How do contracts handle schema changes? Required-column and quality checks exist,
   but full typed migrations do not. Automatic schema merge is not schema governance.
9. Why not model region directly on every journey? Journeys cross regions. Regional
   arrival-derived facts and station-region mapping avoid an ambiguous many-to-many join.
10. What happens after transformation code changes? Source hashes may still match,
    so explicitly force a governed backfill. Automatic transform-version invalidation
    is a future improvement, not a current claim.

**Study in `applied-ai-lab`:** `rail/pipeline.py`, `rail/lakehouse/snapshot.py`,
`rail/lakehouse/planning.py`, `rail/lakehouse/pipeline.py`, `rail/lakehouse/spark.py`,
`rail/lakehouse/transforms.py`, `rail/lakehouse/contracts.py`,
`rail/lakehouse/quality.py`, `rail/lakehouse/tests/test_spark_pipeline.py`,
`rail/publication.py`, `lib/rail-publication.ts`, `power-bi/measures.dax`,
`power-bi/semantic-model.md`, `.github/workflows/rail-data-platform.yml`.

## 3. Olist Delivery Delay Predictor

**30 seconds.** I assembled relational Olist data, built only features available at
prediction time, compared models chronologically and retained the simple logistic
baseline. It serves a relative risk score through a TypeScript Worker tested against
Python. The final result is modest: 107 of 620 late orders in the top-risk decile.
The main evidence is leakage discipline and deployable inference, not a high score.

**Architecture/data flow.** Kaggle source tables → relational assembly and validation →
chronological partitions → point-in-time histories/preprocessing → development model
selection → frozen final benchmark → JSON transformations/history/weights → TypeScript
feature construction/inference → versioned prediction response and model metadata API.

**Decisions/technology.** Python/scikit-learn support preprocessing and reproducible
comparison; XGBoost/CatBoost were alternatives, not automatic upgrades. Logistic
parameters and transformations fit an auditable portable artifact. A TypeScript
Worker avoids operating a separate Python server for a small historical scorer.

**Trade-off/failure mode.** Maintaining two implementations risks training-serving
skew; independent fixtures check it. Availability-time mistakes can silently inflate
scores. A frozen historic domain is honest but cannot score today's business orders.

**Testing/deployment.** Test relational assembly, temporal cutoffs and unsupported
requests; compare Python and TS feature/scores, then call the built Worker. Deploy
artifact and runtime together as a saved Sites version. Metadata identifies the
artifact actually bundled; rollback the whole tested version, not coefficients alone.

**Leakage/security.** Delivery outcomes must not enter purchase-time features. Preprocessing
fits on training data, calibration/selection follow chronology, and final results
cannot choose the next model. Input bounds, valid states/payment types and timezone-aware
dates constrain the API. Never label a percentile score as a calibrated probability.

**Scale/10×.** Profile artifact/history memory and request CPU. Cache loaded immutable
artifacts, use prefix/indexed histories where needed, and add a validated batch path
only if there are actual consumers. More compute cannot fix label shift or unavailable
features. The source dataset does not prove performance on a current shop.

**In a company.** Define prediction timing and intervention cost with operations;
collect prospective delayed labels, monitor feature/label drift and ranking/calibration,
register an immutable approved release and evaluate a shadow cohort before promotion.

**10 questions and answers**

1. What is point-in-time correctness? Every feature uses only information available
   at the prediction instant, including when labels became observable.
2. Why different history clocks? An order count is known at purchase; its delivery
   outcome is known later. Treating both as purchase-time data leaks the future.
3. Why exclude same-day records? The exported daily history cannot guarantee intra-day
   order. Strictly earlier UTC days preserve parity and conservative availability.
4. Why chronological validation? Deployment predicts later orders. A random split
   can hide drift and temporal contamination.
5. Why report PR-AUC? Late orders are uncommon; ranking precision/recall is operationally
   relevant. ROC-AUC alone can obscure weak positive-case performance.
6. Is risk score 80 an 80% chance of delay? No. It is a relative score against the
   calibration/reference distribution, not a calibrated event probability.
7. Why retain logistic regression? Alternatives did not justify replacing the simple
   baseline under the frozen evaluation procedure. Complexity needs evidence.
8. How is serving parity tested? Independently generated Python fixtures include
   feature vectors/scores for edge cases, and tests invoke the built TypeScript Worker.
9. What does `/api/olist/model` prove? It identifies model version, feature contract,
   historical domain and a digest of the bundled runtime JSON object. It does not
   prove model quality or registry approval.
10. What can final-test results be used for? Reporting and limitations. New model
    selection requires new untouched evaluation data, not repeated tuning to this test.

**Study in `applied-ai-lab`:** `ml/build_dataset.py`, `ml/common.py`,
`ml/temporal_features.py`, `ml/model_selection.py`, `ml/final_benchmark.py`,
`ml/train_model.py`, `ml/runtime_reference.py`, `ml/parity.py`,
`lib/olist-input-contract.ts`, `lib/olist-model.ts`,
`app/api/olist/predict/route.ts`, `app/api/olist/model/route.ts`,
`tests/model-parity.test.ts`, `tests/model-api.test.mjs`, `artifacts/model-card.md`.

## 4. Finland Geospatial AI

**30 seconds.** I segment official Finnish 0.5 m orthophotos using NLS vector labels.
Map-sheet splits and spatial buffers reduce leakage. Validation chose SegFormer-B0
over U-Net alternatives, then one locked 96-patch test produced 0.6652 mIoU. The
system tracks manifests and experiments and serves georeferenced masks/confidence.
Label mismatch and weak open-natural performance are explicit limitations.

**Architecture/data flow.** Official imagery + vector acquisition → source audit →
aligned raster labels and buffered geographic splits → hash-locked patch manifest →
train-only normalization/augmentation → PyTorch experiments logged in MLflow →
validation selection → sealed test artifacts → metadata + safetensors → row-buffered
overlap inference → GeoTIFF mask/confidence and API summary.

**Decisions/technology.** Rasterio preserves georeferencing and supports window reads;
GeoPandas handles vectors; PyTorch supports explicit models/training. U-Net is a
baseline and pretrained SegFormer tests a stated architecture hypothesis. MLflow
records runs; hash-checked safetensors avoid unpickling v2 model weights. FastAPI and
Docker expose a bounded service surface. Old v1 uses a different data/model contract.

**Trade-off/failure mode.** Geographic separation reduces optimistic evaluation but
limits sample size. Vector labels may be coarse or temporally mismatched with imagery.
Systematically misaligned labels are worse than small metric noise. Confidence can be
high on out-of-distribution input; max softmax is not guaranteed correctness.

**Testing.** Test raster/vector alignment, manifests/spatial overlap, metrics/losses,
train/evaluate pipeline on tiny generated data, checkpoint integrity and API failures.
Compare row-buffer output with the previous dense algorithm on generated boundary
cases. Verify the real selected checkpoint loads offline. A runtime-library upgrade
requires output compatibility checks; it is not permission to rerun model selection.

**Deployment.** CPU Docker CI builds and tests health/model/multipart inference using
smoke weights. A real selected-model hash/load is separate evidence. No production
API traffic or hosted GPU deployment is claimed. Roll back metadata, class map,
normalization and weights together. External access also needs auth, ingress upload
limits, GDAL driver/network isolation and container resource limits.

**Leakage/security.** Adjacent patches share texture and geography, so random splitting
can leak spatial context. Fit normalization on training patches and select on validation.
The sealed test must remain untouched for selection. Weight hashes protect integrity
relative to trusted metadata, not authenticity if an attacker replaces both files.
Do not load arbitrary user checkpoints; retain the v2 safetensors boundary.

**Scale/10×.** Row buffering changes probability memory from full image area to
O(classes × tile size × width). Model activations/GDAL memory remain additional.
The API also bounds decoded pixels and rejects overload. At 10× measure latency/RSS,
batch tiles on suitable hardware, distribute independent rasters through a bounded
queue, and control model replicas. Do not multiply workers until memory is measured.

**In a company.** Expand independently audited geography/season coverage, clarify
label/licensing ownership, authenticate inference, pin approved model/runtime artifacts,
measure drift and abstention usefulness, and assign review of low-confidence outputs.

**10 questions and answers**

1. Why not randomly split patches? Nearby pixels share geography, imagery and label
   structure. Random splits can reward memorization of location-specific patterns.
2. What does a 512 m buffer achieve? It separates selected geographic support and
   reduces local spatial dependence; it does not prove independence across all regions.
3. Why mIoU rather than pixel accuracy? Pixel accuracy can be dominated by common
   classes. Mean IoU gives each class a contribution based on overlap/union.
4. Why is open-natural performance weak? Heterogeneous appearance, class definition,
   label coverage/generalization and confusion need inspection. Do not invent a single
   cause from the score alone.
5. How are overlapping tiles combined? Add per-class probabilities weighted by a
   tapered window, divide by accumulated weight, then choose argmax and max confidence.
6. Why can rows be flushed? Once the next tile-row origin is beyond a row, no later
   tile can affect it. Retain only the still-overlapping rows.
7. Why validate decoded pixels as well as upload bytes? Compression can make a huge
   raster small on disk. Output summaries and buffers depend on decoded dimensions.
8. Why disable pretrained downloads at inference? The trained artifact already contains
   all parameters. Construct the known architecture offline and strictly load its
   weights; training initialization is not a runtime dependency.
9. Are seeds sufficient for numerical reproducibility? No. Kernels, hardware, library
   versions and operations matter. Preserve original environment metadata and check
   compatibility separately from historical metrics.
10. Can v1 and v2 mIoU be compared as progress? No. Sensors, resolution, labels,
    classes and regions differ; they are distinct evaluation problems.

**Study in `finland-geospatial-ai`:** `src/finland_geospatial_ai/acquisition/nls.py`,
`datasets/build.py`, `datasets/manifest.py`, `datasets/validate.py`,
`datasets/dataset.py`, `labels/rasterize.py`, `geospatial/raster.py`,
`training/engine.py`, `models/factory.py`, `evaluation/selection.py`,
`evaluation/run.py`, `inference/predictor.py`, `api.py` (all those module paths are
under `src/finland_geospatial_ai/`), `tests/test_inference_operations.py`,
`artifacts/models/selected-model.json`, `reports/v2/model-card.md`.

## 5. Helsinki Water forecasting and optimization

**30 seconds.** I used real Helsinki municipal-property meter data for monthly
forecasting, uncertainty and inspection triage. Expanding validation selected ETS;
the sealed 2018 property-panel MASE is 0.793. Intervals are over-conservative and
the base optimizer has zero gain because all candidates fit. The project demonstrates
scientific decisions and reproducibility, not live utility operations or savings.

**Architecture/data flow.** Official Nuuka responses → audited source manifest and
validated eight-property monthly panel → fixed expanding backtest design → model
comparison → development-selected forecast + residual calibration → sealed evaluation
and anomaly triage → assumed costs/resources → CP-SAT inspection policy → versioned
metrics/CSV/figures → numerical verification in CI.

**Decisions/technology.** pandas handles a small transparent panel; statsmodels provides
classical time-series models; explicit interval code exposes assumptions; OR-Tools
expresses discrete budget/capacity decisions. TOML/dataclass configuration and a CLI
are enough orchestration for this historical study. No Spark or service layer is needed.

**Trade-off/failure mode.** Eight properties and a limited horizon are weak evidence
for broad generalization. Forecast errors and cost assumptions propagate into the
optimizer. A mathematically optimal solution to unrealistic costs is not operationally
optimal. Statistical signals are not independently confirmed leaks.

**Testing/deployment.** Validate finite numeric data, complete monthly support,
property identity, split boundaries and resource assumptions. Test forecasts, conformal
logic and optimization constraints. CI reruns the frozen experiment and report, then
checks schemas, identities and narrow numerical tolerances. Deploy as a reproducible
batch artifact/repository; no production water service is implied.

**Leakage/security.** Development forecast targets must end before the final holdout
begins. Calibration residuals must come from development, not the sealed future.
Do not choose SARIMA retroactively because it scored better on final data. Official
public-property data still needs provenance/licensing; local API credentials must
stay outside Git. Config version names cannot escape the artifact directory.

**Scale/10×.** Eighty properties still do not justify a distributed platform. Profile
independent model fits, parallelize bounded jobs if needed, store per-site artifacts
and failures, and monitor source completeness. Cross-property correlations and label
quality may matter more than runtime. A live recurring study needs a genuinely new
future evaluation window, not a schedule that reruns old history.

**In a company.** Agree on inspection capacity and false-positive/missed-event costs,
collect confirmed outcomes, evaluate prospective calibration, add human triage and
review equity across properties. Version assumptions and decisions with accountable owners.

**10 questions and answers**

1. What is expanding-window validation? Each forecast origin uses only observations
   up to that origin, then training history grows for the next origin.
2. What is MASE? Absolute forecast error scaled by an in-sample naive/seasonal-naive
   error. Below one indicates improvement over that scaling reference, not universal quality.
3. Why keep ETS when SARIMA wins the final comparison? ETS was selected on development.
   Changing selection from the final result would consume the holdout for model choice.
4. Where do conformal residuals come from? Development forecasts of the selected model;
   the final outcomes must not calibrate their own intervals.
5. Is 97.92% coverage good for a 90% target? It exceeds the target but suggests overly
   wide intervals. Examine width, conditional coverage and decision usefulness.
6. Does conformal coverage automatically hold for time series? Exchangeability is
   problematic under dependence/drift; empirical evaluation and limitations are essential.
7. Why did optimization gain zero? All three candidates fit the base resource budget,
   leaving no binding selection trade-off. Zero gain is a correct result.
8. Is the 14.59% scenario gain a saving? No. It is expected-value improvement under
   assumed costs and a binding eight-hour budget, not observed money saved.
9. What does config validation prevent? Invalid dates/horizons, development/final
   overlap, unavailable final targets, invalid alpha, duplicate properties and unsafe
   resource/version values before acquisition or fitting starts.
10. Why permit numerical tolerances? Floating-point solvers can vary across platforms.
    Tolerances must be narrowly justified by operation/model; do not relax all comparisons
    to make a discrepant result pass.

**Study in `helsinki-water-forecasting-optimization`:** `src/helsinki_water/config.py`,
`data.py`, `validation.py`, `backtest.py`, `models.py`, `uncertainty.py`,
`optimization.py`, `experiment.py`, `verification.py`, `cli.py` (all under
`src/helsinki_water/`), `configs/experiment.toml`, `tests/test_config.py`,
`reports/scientific-report.md`, `reports/numerical-reproducibility.md`.

## Practice before interviews

Explain each diagram without reading it. Reproduce one failure and recovery per
project. For Rail, draw the grains/joins and calculate a KPI manually from a fixture.
For Olist, show which timestamp makes a label available. For Tender, trace a forged
tool argument through rejection. For geospatial, draw tile overlap and CRS alignment.
For Water, calculate a residual interval and explain the zero-gain optimization.
Say clearly which cloud/BI/collaboration steps you have not yet performed personally.
