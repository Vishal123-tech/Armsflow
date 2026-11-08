# Step 7 — local integration and responsive checks

Completed 8 November 2026. Deployment is Step 8 and has not started.

## Fixes

- Wrapped mobile heading/filter controls and constrained narrow cards to prevent horizontal overflow.
- Added a visible recipient-country label and initial India source-precision note.
- Guarded asynchronous map and equipment updates against an obsolete recipient request.
- Cleared old supplier, ML and similarity results while new selections load.
- Applied supplier colors before rendering ranking bars so charts agree.
- Restored the explorer browser title when navigating back from another page.

## Verification

- `python -m unittest discover -s tests -v`: all 32 tests passed (pipeline, metrics, ML, similarity and web).
- Integration sweep: 87 overview responses (3 recipients × 29 periods) and 149 equipment detail responses passed. Overview volumes and shares reconciled; equipment histories were present.
- `npm run build`: passed after frontend fixes.
- All six main routes checked in a 390 × 844 browser viewport; document width did not exceed viewport width.
- Mobile equipment search and Apache details dialog checked, including loaded photograph and Escape dismissal.
- Country selection checked with US metrics and map agreeing; zoom reached 135% and reset returned to 100%.
- Desktop map at 1265px content width had no horizontal document overflow. Captured browser console had no errors.

## Evidence and limits

[Mobile full-page capture](step7-mobile.png) · [Desktop full-page capture](step7-desktop.png)

These checks use a desktop browser with a narrow viewport, not a physical phone. Touch gestures, pinch zoom, iOS/Safari and production hosting have not been validated. Automated tests do not establish the accuracy of upstream SIPRI records. Data scope and ML limitations documented in earlier stages still apply.
