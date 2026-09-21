# Genuine collaboration opportunities

Rechecked through GitHub on 21 September 2026. All four issues below were open and
unassigned at inspection. Recheck discussion and linked PRs before starting; an old
open issue is not a reservation or assurance that maintainers still want the change.
No issue comment, claim of assignment or PR has been submitted.

| Rank | Repository / specific issue | Bounded contribution and acceptance criterion |
| --- | --- | --- |
| 1 | [GeoPandas #529 — gallery examples](https://github.com/geopandas/geopandas/issues/529) | Add an executable rasterio + GeoPandas sampling example using a tiny licensed fixture; explicitly reproject points to the raster CRS and handle nodata/out-of-bounds. Build the documentation and test expected sample values. Raster/vector examples remain unchecked in the issue; updated August 2026. Best fit with NLS work. |
| 2 | [Apache Sedona #2392 — GeoPandas edge cases](https://github.com/apache/sedona/issues/2392) | Take one requested geometry family, preferably empty geometries or CRS behavior. Add parameterized parity cases against GeoPandas, reproduce any mismatch, then make the smallest implementation fix if needed. The maintainer explicitly requests one edge case per PR. This directly matches PySpark and geospatial Python work. |
| 3 | [MLflow #20703 — artifact comparison sizing](https://github.com/mlflow/mlflow/issues/20703) | Generate two runs with differently sized plot artifacts, fix the owning artifact-view component's layout, and add a UI regression at narrow and wide widths. Avoid a global CSS override. Updated September 2026; concrete small bug, but more frontend work than Python ML tooling. |
| 4 | [Pandera #178 — tutorial examples](https://github.com/unionai-oss/pandera/issues/178) | Propose a narrow API-ingestion contract example with nullable fields, invalid rows and explicit coercion behavior. Include executable tests and document failure cases. This is a broad old request last updated in 2021: ask maintainers for current scope before writing a tutorial. Do not submit another untested prose page. |

Choose one, not four simultaneous PRs. Read CONTRIBUTING and the test commands,
check for an active implementation, reproduce locally, agree on scope in your own
message, submit the smallest patch with tests, and respond to review. The valuable
evidence is the review discussion and accepted change, not a count of opened PRs.
