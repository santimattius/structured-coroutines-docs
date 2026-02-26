# Changelog — Version 0.4.0

This document is the **version log (bitácora)** for release **0.4.0**, covering iteration weeks 5–10 (new rules and tooling reinforcement).

---

## Summary

- **Weeks 5–6:** Channel rules (7.1 ChannelNotClosed, 7.2 ConsumeEachMultipleConsumers) in Detekt and Android Lint.
- **Week 7:** LoopWithoutYield (4.1 CANCEL_001) in Compiler + IDE quick fixes (ensureActive / currentCoroutineContext().ensureActive() / yield / delay).
- **Week 8:** ScopeReuseAfterCancel (4.5 CANCEL_005) reinforced in Detekt, Lint, and IDE; IDE quick fix and messages aligned.
- **Week 9:** FlowBlockingCall (9.1 FLOW_001) in Detekt and Android Lint; blocking calls inside `flow { }` reported with doc link.
- **Week 10:** LifecycleAwareFlowCollection (8.2 ARCH_002) in Android Lint and IntelliJ; Convert to runTest intention (6.1 TEST_001) in IntelliJ.
- **Improvements:** SCOPE_002 (UnusedDeferred/AsyncWithoutAwait) no longer triggers when Deferred is used in `awaitAll` (e.g. `list.awaitAll()`); RUNBLOCK_001 (RedundantLaunchInCoroutineScope) no longer triggers when the single `launch` is inside `forEach`/for/while (repeating context).

---

## Weeks 5–6 — Channel rules (7.1 ChannelNotClosed, 7.2 ConsumeEachMultipleConsumers)

**Objective:** Implement **ChannelNotClosed** (§7.1 CHANNEL_001) and **ConsumeEachMultipleConsumers** (§7.2 CHANNEL_002) in Detekt and Android Lint.

### Deliverables

1. **Detekt** — `ChannelNotClosedRule`:
   - Detects manual `Channel()` creation without a corresponding `close()` call; recommends `produce { }` or documenting when/where channels are closed.
   - Issue and message include rule reference and doc link; registered in `StructuredCoroutinesRuleSetProvider`.

2. **Detekt** — `ConsumeEachMultipleConsumersRule`:
   - Detects the same Channel used with `consumeEach` from multiple coroutines; recommends `for (value in channel)` per consumer for fan-out.
   - Issue and message include rule reference and doc link; registered in `StructuredCoroutinesRuleSetProvider`.

3. **Android Lint** — `ChannelNotClosedDetector` and `ConsumeEachMultipleConsumersDetector`:
   - Same semantics as Detekt rules; registered in `StructuredCoroutinesIssueRegistry`.

4. **Tests** — `ChannelNotClosedRuleTest`, `ConsumeEachMultipleConsumersRuleTest` (Detekt); `ChannelNotClosedDetectorTest`, `ConsumeEachMultipleConsumersDetectorTest` (Lint).

5. **Samples** — `ChannelNotClosedExample.kt`, `ConsumeEachMultipleConsumersExample.kt` in sample-detekt; detekt.yml and READMEs updated.

### Criterion of done

- Both tools report CHANNEL_001 and CHANNEL_002; docs and samples aligned.

---

## Week 7 — LoopWithoutYield (4.1 CANCEL_001) in Compiler and IDE

**Objective:** Implement **LoopWithoutYield** (§4.1 CANCEL_001): detect loops in suspend functions without cooperation points (yield, ensureActive, delay). Compiler warning + IDE quick fixes.

### Deliverables

1. **Compiler plugin** — `LoopWithoutYieldChecker` (FirSimpleFunctionChecker):
   - Detects `while`/`do-while` (and for) in suspend functions when the loop body has no cooperation point.
   - Reports `LOOP_WITHOUT_YIELD` diagnostic (warning); EN/ES messages in `CompilerBundle.properties`.
   - `PluginConfiguration` and Gradle option `loopWithoutYield` to enable/disable.

2. **IntelliJ plugin** — `LoopWithoutYieldInspection` and quick fixes:
   - Inspection for loops in suspend functions without cooperation points.
   - **Quick fixes** (via `AddCooperationPointInLoopQuickFix` and `AddEnsureActiveInLoopQuickFix`): insert at loop start one of: `ensureActive()`, `currentCoroutineContext().ensureActive()`, `yield()`, or `delay(0)`.

3. **Sample** — `LoopWithoutYieldExample.kt` in sample/compilation; compilation README updated.

4. **IntelliJ (related)** — `ChangeSuperclassToExceptionQuickFix` for CancellationException subclass inspection: replaces superclass `CancellationException` with `Exception` so domain errors are not treated as cancellation (best practice 4.2).

### Criterion of done

- Compiler reports LOOP_WITHOUT_YIELD when enabled; IDE offers quick fixes; sample demonstrates the rule.

---

## Week 9 — FlowBlockingCall (9.1) in Detekt and Lint

**Objective:** Implement **FlowBlockingCall** (§9.1 FLOW_001): detect blocking calls (Thread.sleep, synchronous I/O, JDBC, etc.) inside `flow { }` builder. Severity warning in Detekt and Android Lint.

### Deliverables

1. **Detekt** — `FlowBlockingCallRule`:
   - Uses `CoroutineDetektUtils.isBlockingCall()` and new `isInsideFlowBuilder()` to report only when a blocking call is inside a `flow { }` lambda.
   - Issue and message include `[FLOW_001]` and link to §9.1; recommends `flowOn(Dispatchers.IO)` or suspend APIs.
   - Registered in `StructuredCoroutinesRuleSetProvider`.

2. **Android Lint** — `FlowBlockingCallDetector`:
   - Visits `flow` method calls, gets the lambda body, scans for blocking calls via `AndroidLintUtils.containsBlockingCall()`, reports each with `[FLOW_001]` and doc link.
   - Registered in `StructuredCoroutinesIssueRegistry`.

3. **Utils** — `CoroutineDetektUtils.isInsideFlowBuilder(KtElement)` and `CoroutineLintUtils.isInsideFlowBuilder(UElement)` to detect when code is inside a `flow { }` block.

4. **Tests** — `FlowBlockingCallRuleTest` (Detekt) and `FlowBlockingCallDetectorTest` (Lint); Lint stubs extended with `kotlinxCoroutinesFlow` and `coroutinesAndFlow()`.

5. **Documentation** — Tool Implementation Matrix row 9.1 updated; SUPPRESSING_RULES.md updated with FLOW_001 / FlowBlockingCall.

### Criterion of done

- Both tools report blocking code inside `flow { }`; documentación alineada.

---

## Week 8 — ScopeReuseAfterCancel and IDE reinforcement

**Objective:** Reinforce **ScopeReuseAfterCancel** (§4.5 CANCEL_005) in Detekt, Android Lint, and IntelliJ so that scope reuse after cancel is detected consistently and the IDE message guides users to the quick fix.

### Deliverables

1. **Detekt** — `ScopeReuseAfterCancelRule` already had CANCEL_005 and doc link; no code change. Confirmed message: scope cancelled and then reused; use cancelChildren() instead of cancel().
2. **Android Lint** — `ScopeReuseAfterCancelDetector`:
   - Comment updated from “4.4” to “4.5 (CANCEL_005)”.
   - Report message now includes `[CANCEL_005]` and the doc link:  
     `[CANCEL_005] Scope 'X' is cancelled and then reused. Use cancelChildren() ... See: <BEST_PRACTICES#45-cancel_005--...>`.
3. **IntelliJ plugin** — `ScopeReuseAfterCancelInspection` and quick fix:
   - **Inspection description** (EN/ES): Clarified that a cancelled Job doesn’t accept new children; added explicit guidance to apply the quick fix to replace `scope.cancel()` with `scope.coroutineContext.job.cancelChildren()`.
   - **Error message** (EN/ES): Added “Use the quick fix to replace cancel() with cancelChildren().” so the message clearly guides to the fix.
   - **Quick fix** `ReplaceCancelWithCancelChildrenQuickFix`: Unchanged; replaces `scope.cancel()` with `scope.coroutineContext.job.cancelChildren()`.

### Documentation

- **BEST_PRACTICES_COROUTINES.md** — Tool Implementation Matrix row 4.5 updated: Detekt/Lint/IDE explicitly named; note that messages include CANCEL_005 and doc link, and that the IDE quick fix replaces cancel() with cancelChildren().
- **README.md** — “Recent changes” updated with Week 8 (ScopeReuseAfterCancel reinforcement); link to this changelog added.
- **CHANGELOG_0.4.0.md** — This file (bitácora for 0.4.0).

### Criterion of done

- All three tools (Detekt, Lint, IDE) detect scope reuse after cancel consistently.
- Report/inspection messages include rule code CANCEL_005 and reference to the best-practices doc.
- IDE quick fix applies correctly and the inspection/error text directs the user to it.

---

## Week 10 — LifecycleAwareFlowCollection (8.2) + Convert to runTest intention (6.1)

**Objective:** Implement **LifecycleAwareFlowCollection** (§8.2 ARCH_002) in Android Lint and in the IntelliJ plugin, and the **Convert to runTest** intention (TEST_001 / §6.1) in the IntelliJ plugin.

### Deliverables

1. **Android Lint** — `LifecycleAwareFlowCollectionDetector`:
   - Visits `launch`, `launchWhenStarted`, `launchWhenCreated`, `launchWhenResumed` when receiver is `lifecycleScope` and the call is inside a LifecycleOwner (Activity, Fragment, etc.).
   - If the lambda body contains Flow collection (`collect`, `collectLatest`, `collectIndexed`) and does **not** contain `repeatOnLifecycle` or `flowWithLifecycle`, reports with ARCH_002 and doc link to §8.2.
   - Registered in `StructuredCoroutinesIssueRegistry`.

2. **IntelliJ plugin** — `LifecycleAwareFlowCollectionInspection`:
   - Same semantics as Lint: detects Flow collection in `lifecycleScope.launch` (and variants) without `repeatOnLifecycle` or `flowWithLifecycle`; guides to use repeatOnLifecycle/flowWithLifecycle.
   - Registered in `StructuredCoroutinesInspectionProvider`.

3. **IntelliJ plugin** — `ConvertToRunTestIntention`:
   - Available when the cursor is inside a `runBlocking { }` call whose body contains `delay()`.
   - Replaces `runBlocking` with `runTest` so tests use virtual time (kotlinx-coroutines-test).
   - Registered in `plugin.xml`; bundle keys `intention.convert.to.runtest` (EN/ES).

4. **Documentation** — Tool Implementation Matrix rows 6.1 and 8.2 updated in BEST_PRACTICES_COROUTINES.md; CHANGELOG_0.4.0.md (this section).

### Criterion of done

- Lint and IDE inspection report lifecycleScope + flow collect without repeatOnLifecycle/flowWithLifecycle.
- Intention "Convert to runTest" appears on runBlocking+delay and applies correctly.
- Docs and changelog reflect Week 10 deliverables.

---

## Improvements and fixes (post Weeks 5–10)

**Objective:** Reduce false positives in existing rules (SCOPE_002, RUNBLOCK_001).

### SCOPE_002 — UnusedDeferred / AsyncWithoutAwait (#25)

- **Problem:** Rule triggered when using `awaitAll` on a `List<Deferred>` (e.g. `deferredList.awaitAll()`), treating the Deferreds as "unused" even though they are awaited collectively.
- **Change:** Detekt `UnusedDeferredRule`, Lint `AsyncWithoutAwaitDetector`, and IntelliJ `ScopeAnalyzer` now consider a Deferred "used" when it is passed to `awaitAll` (or used in a collection that is awaited). Tests added in `UnusedDeferredRuleTest`.

### RUNBLOCK_001 — RedundantLaunchInCoroutineScope (#26)

- **Problem:** Rule could report a single `launch` inside `coroutineScope` as redundant when that `launch` was inside a `forEach`/for/while loop, where the launch runs multiple times and the scope correctly waits for all.
- **Change:** Compiler `RedundantLaunchInCoroutineScopeChecker`, Detekt `RedundantLaunchInCoroutineScopeRule`, and Lint `RedundantLaunchInCoroutineScopeDetector` now skip reporting when the single launch/async is inside a repeating context (`forEach`, `for`, `while`). Tests added in `RedundantLaunchInCoroutineScopeRuleTest`.
