import { ModuleCard, ComparisonRow } from './types';
import { latestGitTag } from './git-info.generated';

export interface NavItem {
  title: string;
  path: string;
  icon: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const SIDEBAR_NAV: NavSection[] = [
  {
    section: "DOCUMENTATION",
    items: [
      { title: "Introduction", path: "introduction", icon: "menu_book" },
      { title: "Core Concepts", path: "core-concepts", icon: "layers" },
      { title: "Rules Overview", path: "rules-overview", icon: "rule" },
      { title: "Best Practices", path: "best-practices", icon: "checklist" },
      { title: "Gradual Adoption", path: "gradual-adoption", icon: "trending_up" },
      { title: "Annotations", path: "annotations", icon: "tag" },
      { title: "Detekt Rules", path: "detekt-rules", icon: "verified_user" },
      { title: "IntelliJ Plugin", path: "intellij-plugin", icon: "extension" },
      { title: "Gradle Plugin", path: "gradle-plugin", icon: "build_circle" },
      { title: "Lint Rules", path: "lint-rules", icon: "visibility" },
      { title: "Compiler Plugin", path: "compiler", icon: "memory" },
      { title: "Kotlin Coroutines Skill", path: "kotlin-coroutines-skill", icon: "smart_toy" },
    ]
  },
  {
    section: "REFERENCE",
    items: [
      { title: "API Reference", path: "api", icon: "code" },
      { title: "Changelog", path: "changelog", icon: "change_history" },
    ]
  }
];

export const MODULES: ModuleCard[] = [
  {
    title: "Annotations",
    description: "Mark your coroutine scopes for clarity. Define explicit boundaries for concurrency.",
    icon: "tag",
    path: "/docs/annotations"
  },
  {
    title: "Detekt Rules",
    description: "40 CI-friendly rules with import-based guards so only Kotlin files that use kotlinx.coroutines are analyzed—fewer false positives.",
    icon: "verified_user",
    path: "/docs/detekt-rules"
  },
  {
    title: "Gradle Plugin",
    description: "Compiler plugin integration, profiles (Android Compose, KMP, Ktor, Spring backend), Detekt baseline, exclusions, and structuredCoroutinesReport with Learning Path for CI audits.",
    icon: "build_circle",
    path: "/docs/gradle-plugin"
  },
  {
    title: "Lint Rules",
    description: "35 Android Lint detectors with real-time feedback in Android Studio—Compose lifecycle, side effects, and JVM interop quick fixes.",
    icon: "visibility",
    path: "/docs/lint-rules"
  },
  {
    title: "IntelliJ Plugin",
    description: "35 inspections (28+ quick fixes), Flow Chain Analyzer intention, tool window, project-wide scan, and gutter icons.",
    icon: "extension",
    path: "/docs/intellij-plugin"
  },
  {
    title: "Compiler Plugin",
    description: "K2/FIR Compiler Plugin with 14 rules. Enforces structured concurrency at compile time (9 errors, 5 warnings).",
    icon: "memory",
    path: "/docs/compiler"
  },
  {
    title: "Kotlin Coroutines Skill",
    description: "Agent Skill v3.0.0 for AI coding tools. 51 documented patterns, 65+ triage entries, strict rules — Compose, testing, Flow, interop, KMP, backend JVM, and debugging.",
    icon: "smart_toy",
    path: "/docs/kotlin-coroutines-skill"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: "GlobalScope Usage", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "RunBlocking in Suspend", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Unstructured Launch", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Job/SupervisorJob in Builders", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Async without Await", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Dispatchers.Unconfined", compiler: "warning", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "Suspend in Finally (NonCancellable)", compiler: "warning", detekt: "check", lint: "check", ide: "check" },
  { feature: "CancellationException Swallowed", compiler: "warning", detekt: "check", lint: "check", ide: "check" },
  { feature: "Loop without Yield (CANCEL_001)", compiler: "warning", detekt: "check", lint: "check", ide: "check" },
  { feature: "Scope Reuse After Cancel", compiler: "none", detekt: "check", lint: "check", ide: "check" },
  { feature: "Channel not Closed (CHANNEL_001)", compiler: "none", detekt: "check", lint: "check", ide: "none" },
  { feature: "ConsumeEach Multiple Consumers (CHANNEL_002)", compiler: "none", detekt: "check", lint: "check", ide: "none" },
  { feature: "Flow Blocking Call (FLOW_001)", compiler: "none", detekt: "check", lint: "check", ide: "none" },
  { feature: "Lifecycle-Aware Flow Collection (Android)", compiler: "none", detekt: "none", lint: "check", ide: "check" },
  { feature: "MainDispatcherMisuse (Android)", compiler: "none", detekt: "none", lint: "check", ide: "check" },
  { feature: "WithTimeout Scope Cancellation (CANCEL_006)", compiler: "none", detekt: "check", lint: "none", ide: "check" },
  { feature: "SuspendCoroutine without Cancellation (INTEROP_001)", compiler: "check", detekt: "check", lint: "none", ide: "check" },
  { feature: "CallbackFlow without awaitClose (INTEROP_002)", compiler: "check", detekt: "check", lint: "none", ide: "check" },
  { feature: "Mutable Flow Exposed (FLOW_010)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "Missing catch in Flow chain (FLOW_005)", compiler: "none", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "Sequential async/await (CONCUR_003)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "runBlocking instead of runTest (TEST_004)", compiler: "none", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "collectAsState without Lifecycle (COMPOSE_001)", compiler: "none", detekt: "none", lint: "warning", ide: "warning" },
  { feature: "Dispatchers.IO in commonMain (KMP_001)", compiler: "none", detekt: "check", lint: "check", ide: "check" },
  { feature: "synchronized in coroutine (CONCUR_001)", compiler: "none", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "Shared mutable state in coroutines (CONCUR_002)", compiler: "none", detekt: "warning", lint: "none", ide: "none" },
  { feature: "Redundant withContext (CONCUR_004)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "stateIn with Eagerly (FLOW_006)", compiler: "none", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "launchIn unstructured scope (FLOW_007)", compiler: "none", detekt: "none", lint: "warning", ide: "warning" },
  { feature: "Side effects in Flow map (FLOW_008)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "runBlocking in commonMain (KMP_002)", compiler: "none", detekt: "check", lint: "check", ide: "none" },
  { feature: "MainScope without cancel (KMP_003)", compiler: "none", detekt: "warning", lint: "none", ide: "none" },
  { feature: "Blocking calls in backend coroutines (BACKEND_001)", compiler: "none", detekt: "warning", lint: "none", ide: "none" },
  { feature: "ThreadLocal / MDC not propagated (BACKEND_002)", compiler: "none", detekt: "warning", lint: "none", ide: "none" },
  { feature: "rememberCoroutineScope for init (COMPOSE_002)", compiler: "none", detekt: "none", lint: "warning", ide: "warning" },
  { feature: "Side effects in Composable body (COMPOSE_003)", compiler: "none", detekt: "none", lint: "warning", ide: "none" },
  { feature: "Hardcoded Dispatcher in class (TEST_005)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "Missing advanceUntilIdle in runTest (TEST_006)", compiler: "none", detekt: "none", lint: "none", ide: "warning" },
  { feature: "FlatMap operator choice (FLOW_009)", compiler: "none", detekt: "none", lint: "none", ide: "warning" },
  { feature: "SharedFlow for one-shot events (FLOW_011)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "channelFlow vs callbackFlow (INTEROP_003)", compiler: "none", detekt: "warning", lint: "none", ide: "warning" },
  { feature: "Blocking Future.get in coroutine (INTEROP_004)", compiler: "none", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "Missing CoroutineName (DEBUG_001, opt-in)", compiler: "none", detekt: "warning", lint: "none", ide: "none" },
  { feature: "Quick Fixes / Auto-Correction", compiler: "none", detekt: "none", lint: "check", ide: "check" },
];

export const DOCS_CONTENT: Record<string, string> = {
  "introduction": `
# Introduction

**Structured Coroutines** is a comprehensive toolkit for enforcing **structured concurrency** in Kotlin Coroutines, inspired by Swift Concurrency. It provides multiple layers of protection through compile-time checks and static analysis.

[![Kotlin 2.3.0](https://img.shields.io/badge/Kotlin-2.3.0-blue.svg)](https://kotlinlang.org) [![Toolkit 1.0.0](https://img.shields.io/badge/Toolkit-1.0.0-purple.svg)](https://github.com/santimattius/structured-coroutines/releases) [![Coroutines 1.11.0](https://img.shields.io/badge/kotlinx--coroutines-1.11.0-blue.svg)](https://github.com/Kotlin/kotlinx.coroutines) [![Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://github.com/santimattius/structured-coroutines/blob/main/LICENSE) [![Multiplatform](https://img.shields.io/badge/Multiplatform-Supported-orange.svg)](https://kotlinlang.org/docs/multiplatform.html)

## Why This Toolkit?

Kotlin Coroutines are powerful but can be misused, leading to:

- **Resource leaks** from orphaned coroutines
- **Uncontrolled lifecycle** with \`GlobalScope\`
- **Difficult debugging** due to scattered coroutine launches
- **Deadlocks** from \`runBlocking\` in suspend functions
- **Broken cancellation** from swallowed \`CancellationException\`
- **Thread starvation** from blocking calls in coroutines

This toolkit enforces structured concurrency best practices through:

1. **Compiler Plugin** — Errors at compile time (K2/FIR)
2. **Detekt Rules** — 40 static analysis rules for CI and KMP
3. **Android Lint Rules** — 35 detectors with Android/Compose-specific quick fixes
4. **IntelliJ/Android Studio Plugin** — 35 inspections, Flow Chain Analyzer, and tool window
5. **Kotlin Coroutines Skill v3.0.0** — Agent Skill for AI tools (Claude, ChatGPT, Cursor) covering **51 documented patterns**

## Toolkit Components

| Module | Purpose | When |
|--------|---------|------|
| \`compiler\` | K2/FIR Compiler Plugin | Compile-time errors |
| \`detekt-rules\` | Detekt custom rules | Static analysis |
| \`lint-rules\` | Android Lint rules | Android projects |
| \`intellij-plugin\` | IntelliJ/Android Studio Plugin | Real-time IDE analysis |
| \`annotations\` | \`@StructuredScope\` annotation | Runtime/Compile |
| \`gradle-plugin\` | Gradle integration | Build configuration |
| \`kotlin-coroutines-skill\` | Agent Skill for AI coding tools | Code review, refactoring, migrations |

## Getting Started

1. Read [Core Concepts](/docs/core-concepts) for structured concurrency best practices.
2. Follow [Gradle Plugin](/docs/gradle-plugin) for installation (Compiler Plugin + annotations).
3. Use [Annotations](/docs/annotations) to mark scopes with \`@StructuredScope\` where needed.
4. Optionally add [Detekt Rules](/docs/detekt-rules), [Lint Rules](/docs/lint-rules) (Android), the [IntelliJ Plugin](/docs/intellij-plugin), and the [Kotlin Coroutines Skill](/docs/kotlin-coroutines-skill) (for AI-assisted review) for full coverage.

For a high-level view of all rules, see [Rules Overview](/docs/rules-overview). For adoption in existing projects, see [Gradual Adoption](/docs/gradual-adoption). For the full checklist and rule codes, see [Best Practices](/docs/best-practices). A **Decision Guide** (decision tables and trees for launch vs async, which scope, withTimeout, Flow, etc.) is available in the repository (\`DECISION_GUIDE.md\`).
`,
  "core-concepts": `
# Core Concepts

Structured concurrency means every coroutine is tied to a scope with a clear lifetime: when the scope is cancelled, all its children are cancelled; when a child fails, the parent can react.

## The Parent-Child Relationship

Children inherit context from their parent. Cancelling the parent cancels all children. A child’s failure can be handled or propagated. Breaking this tree (e.g. with \`GlobalScope\`) makes cancellation and reasoning about lifetimes much harder.

## Key Practices

- **Use meaningful scopes:** Prefer \`viewModelScope\`, \`lifecycleScope\`, \`rememberCoroutineScope\`, or injected scopes annotated with \`@StructuredScope\`. Avoid \`GlobalScope\` in production.
- **Use \`async\` only when you need a result:** If you never call \`await\`, use \`launch\` instead.
- **Keep structure inside suspend functions:** Use \`coroutineScope { }\` + \`launch\`/\`async\` for subtasks; avoid launching in external scopes unless you explicitly need fire-and-forget.
- **No \`runBlocking\` inside suspend functions:** Use \`withContext(Dispatchers.IO)\` for blocking work and \`runBlocking\` only at entry points (e.g. \`main\`, tests).
- **Handle \`CancellationException\` separately:** Don't catch \`Exception\` without rethrowing \`CancellationException\`.
- **Use \`withContext(NonCancellable)\` in \`finally\`:** If you need to call suspend functions in \`finally\`, wrap them in \`withContext(NonCancellable)\`.

\`\`\`kotlin
class MyFeature(@StructuredScope val scope: CoroutineScope) {
    fun doWork() = scope.launch {
        // Managed child—cancelled when scope is cancelled
    }
}
\`\`\`

## Framework Scopes (Auto-recognized)

The compiler and IDE plugins automatically recognize: \`viewModelScope\`, \`lifecycleScope\`, \`rememberCoroutineScope()\` (see [Annotations](/docs/annotations)). For the full checklist, see [Best Practices](/docs/best-practices) and the [Kotlin Coroutines Skill](/docs/kotlin-coroutines-skill).
`,
  "best-practices": `
# Best Practices

A concise reference for **Kotlin Coroutines** and **structured concurrency** when using the Structured Coroutines toolkit. Each practice has a **rule code** (e.g. \`SCOPE_001\`) used in compiler/IDE messages and tool documentation.

## Rule Codes Reference

| Code | Practice |
|------|----------|
| \`SCOPE_001\` | Using GlobalScope in production code |
| \`SCOPE_002\` | Using async without calling await |
| \`SCOPE_003\` | Breaking structured concurrency |
| \`SCOPE_004\` | awaitAll and exception propagation |
| \`CONCUR_001\` | synchronized in suspend / coroutine (use Mutex) |
| \`CONCUR_002\` | Shared mutable state updated from parallel launches |
| \`CONCUR_003\` | Sequential async/await without parallelism |
| \`CONCUR_004\` | Redundant nested withContext (same dispatcher) |
| \`RUNBLOCK_001\` | Redundant launch on last line of coroutineScope |
| \`RUNBLOCK_002\` | Using runBlocking inside suspend functions |
| \`DISPATCH_001\` | Blocking code on wrong dispatchers |
| \`DISPATCH_002\` | Main-safe suspend functions |
| \`DISPATCH_003\` | Abusing Dispatchers.Unconfined |
| \`DISPATCH_004\` | Passing Job() directly to builders |
| \`DISPATCH_005\` | Injecting Dispatchers for testability |
| \`BACKEND_001\` | Blocking calls in coroutines without Dispatchers.IO (JVM backend) |
| \`BACKEND_002\` | MDC / ThreadLocal not propagated across withContext |
| \`CANCEL_001\` | Ignoring cancellation in intensive loops |
| \`CANCEL_002\` | Periodic or repeating work without cooperation |
| \`CANCEL_003\` | Swallowing CancellationException |
| \`CANCEL_004\` | Suspendable cleanup without NonCancellable |
| \`CANCEL_005\` | Reusing a cancelled CoroutineScope |
| \`CANCEL_006\` | withTimeout and scope cancellation |
| \`CANCEL_007\` | withTimeout and resource cleanup |
| \`EXCEPT_001\` | SupervisorJob as argument in single builder |
| \`EXCEPT_002\` | Extending CancellationException for domain errors |
| \`EXCEPT_003\` | CoroutineExceptionHandler and launch vs async |
| \`TEST_001\` | Slow tests with real delays |
| \`TEST_002\` | Uncontrolled fire-and-forget in tests |
| \`TEST_003\` | Replacing Dispatchers.Main in tests |
| \`TEST_004\` | runBlocking instead of runTest in tests |
| \`TEST_005\` | Hardcoded Dispatchers in production classes (testability) |
| \`TEST_006\` | Coroutine work not completed before assertions in runTest |
| \`CHANNEL_001\` | Forgetting to close manual channels |
| \`CHANNEL_002\` | Sharing consumeEach among multiple consumers |
| \`ARCH_001\` | General architecture recommendations |
| \`ARCH_002\` | Lifecycle-aware Flow collection (Android) |
| \`COMPOSE_001\` | collectAsState without lifecycle awareness (Compose) |
| \`COMPOSE_002\` | rememberCoroutineScope for initialization in Composable |
| \`COMPOSE_003\` | Side effects in Composable body without SideEffect |
| \`FLOW_001\` | Blocking code in flow { } builder |
| \`FLOW_002\` | Cold vs hot flows (StateFlow / SharedFlow) |
| \`FLOW_003\` | collectLatest cancels previous work |
| \`FLOW_004\` | SharedFlow configuration |
| \`FLOW_005\` | Missing .catch in Flow chain before terminal operator |
| \`FLOW_006\` | stateIn with SharingStarted.Eagerly in ViewModel/lifecycle scope |
| \`FLOW_007\` | launchIn with GlobalScope or inline CoroutineScope |
| \`FLOW_008\` | Side effects inside Flow map operator |
| \`FLOW_009\` | Wrong flatMapLatest / flatMapMerge / flatMapConcat choice |
| \`FLOW_010\` | Exposing MutableStateFlow / MutableSharedFlow publicly |
| \`FLOW_011\` | SharedFlow for one-shot events (navigation, snackbars) |
| \`INTEROP_001\` | suspendCoroutine without cancellation support |
| \`INTEROP_002\` | callbackFlow without awaitClose |
| \`INTEROP_003\` | channelFlow vs callbackFlow misuse |
| \`INTEROP_004\` | Blocking Future.get in coroutines (use await) |
| \`KMP_001\` | Dispatchers.IO in commonMain (KMP) |
| \`KMP_002\` | runBlocking in commonMain / commonTest (KMP) |
| \`KMP_003\` | MainScope without cancel in lifecycle cleanup |
| \`DEBUG_001\` | Missing CoroutineName for debugging (opt-in) |

## Key Practices by Category

**1. Scopes and builders:** Use framework or injected scopes; avoid \`GlobalScope\`. Use \`async\` only when you need a return value; otherwise use \`launch\`. Keep structured concurrency: inside suspend functions use \`coroutineScope { }\` + \`launch\`/\`async\`. Avoid sequential \`async { }.await()\` in the same statement — launch deferreds first, then await in parallel (\`CONCUR_003\`).

**2. runBlocking:** Use only at entry points (main, tests). Never use \`runBlocking\` inside suspend functions; use \`withContext(Dispatchers.IO)\` for blocking work.

**3. Dispatchers:** Use \`Dispatchers.Default\` for CPU-bound work, \`Dispatchers.Main\` for UI, \`withContext(Dispatchers.IO)\` for blocking I/O. Avoid \`Dispatchers.Unconfined\` in production. Do not pass \`Job()\` or \`SupervisorJob()\` to builders; use \`supervisorScope { }\` or a scope with \`SupervisorJob\`. Avoid redundant nested \`withContext\` with the same dispatcher (\`CONCUR_004\`). On JVM backend services, wrap blocking JDBC/IO in \`withContext(Dispatchers.IO)\` (\`BACKEND_001\`) and propagate MDC with \`MDCContext()\` (\`BACKEND_002\`).

**4. Cancellation:** Add cooperation points (\`yield()\`, \`ensureActive()\`, \`delay()\`) in long loops. Never swallow \`CancellationException\` in catch blocks. For suspend calls in \`finally\`, use \`withContext(NonCancellable) { }\`. Do not reuse a scope after \`scope.cancel()\`; use \`cancelChildren()\` if you need to keep the scope.

**5. Exceptions:** Use \`SupervisorJob\` at scope level or \`supervisorScope { }\`, not as an argument to a single builder. Use normal \`Exception\`/ \`RuntimeException\` for domain errors, not \`CancellationException\`.

**6. Testing:** Use \`runTest\`, virtual time, and \`TestDispatcher\`; avoid real \`delay()\` with \`runBlocking\`. Prefer \`runTest\` over bare \`runBlocking\` in \`@Test\` methods (\`TEST_004\`). Inject \`CoroutineDispatcher\` in production classes instead of hardcoding \`Dispatchers.IO\`/\`Main\`/\`Default\` (\`TEST_005\`). Call \`advanceUntilIdle()\` before assertions when code under test launches internal coroutines (\`TEST_006\`).

**7. Channels:** Prefer \`produce { }\`; if using manual \`Channel\`, define when \`close()\` is called. Do not share \`consumeEach\` across multiple consumers.

**8. Architecture (Android):** Collect Flow with \`repeatOnLifecycle(Lifecycle.State.STARTED)\` or \`flowWithLifecycle\`. In Jetpack Compose, prefer \`collectAsStateWithLifecycle()\` over \`collectAsState()\` (\`COMPOSE_001\`). Use \`LaunchedEffect\` for initialization, not \`rememberCoroutineScope().launch\` in the Composable body (\`COMPOSE_002\`). Wrap analytics/logging side effects in \`SideEffect { }\` (\`COMPOSE_003\`).

**9. Flow:** Do not perform blocking calls inside \`flow { }\`; use \`flowOn(Dispatchers.IO)\` or suspend APIs. Use StateFlow for state; prefer \`Channel(BUFFERED)\` + \`receiveAsFlow()\` for one-shot events over \`MutableSharedFlow(replay=0)\` (\`FLOW_011\`). Choose \`flatMapLatest\`, \`flatMapMerge\`, or \`flatMapConcat\` deliberately (\`FLOW_009\`). Expose \`StateFlow\`/\`SharedFlow\` read-only types, not \`MutableStateFlow\`/\`MutableSharedFlow\` (\`FLOW_010\`). Add \`.catch { }\` upstream of terminal operators (\`collect\`, \`collectLatest\`, \`launchIn\`) when the chain has intermediate operators (\`FLOW_005\`). Prefer \`SharingStarted.WhileSubscribed\` over \`Eagerly\` in \`viewModelScope\`/\`lifecycleScope\` (\`FLOW_006\`). Never use \`.launchIn(GlobalScope)\` or inline scopes (\`FLOW_007\`). Keep \`.map\` pure — use \`.onEach\` for side effects (\`FLOW_008\`).

**10. Interop (callbacks):** Use \`suspendCancellableCoroutine\` with \`invokeOnCancellation\` instead of \`suspendCoroutine\` (\`INTEROP_001\`). In \`callbackFlow { }\`, always call \`awaitClose { }\` to unregister listeners (\`INTEROP_002\`). Use \`callbackFlow\` for external callbacks with cleanup; \`channelFlow\` for internal multi-coroutine emission (\`INTEROP_003\`). Replace \`Future.get()\` with \`.await()\` from \`kotlinx-coroutines-jdk8\` or \`kotlinx-coroutines-guava\` (\`INTEROP_004\`).

**11. Kotlin Multiplatform:** Do not use \`Dispatchers.IO\` in \`commonMain\` — inject a platform dispatcher (\`@IoDispatcher\`) or use \`expect\`/\`actual\` (\`KMP_001\`). No \`runBlocking\` in \`commonMain\`/\`commonTest\` (\`KMP_002\`). Cancel \`MainScope()\` in lifecycle cleanup (\`KMP_003\`).

**12. Concurrency:** Prefer \`Mutex.withLock\` over \`synchronized\` in suspend code (\`CONCUR_001\`). Avoid unsynchronized shared \`var\`/mutable collections from parallel \`launch\` in the same scope — use \`async\`/\`awaitAll\` or proper synchronization (\`CONCUR_002\`).

**14. Debugging (opt-in):** Add \`CoroutineName\` to \`launch\`/\`async\` for readable stack traces and Coroutines Debugger (\`DEBUG_001\`); enable via verbose Detekt profile.

## Quick Reference Checklist

- No \`GlobalScope\`; use framework or injected scopes
- \`async\` has corresponding \`await\`
- Structured concurrency maintained; no \`runBlocking\` in suspend
- Blocking I/O on \`Dispatchers.IO\`; suspend functions main-safe
- No \`Dispatchers.Unconfined\` in production
- No \`Job()\`/\`SupervisorJob()\` passed to builders
- Loops have cancellation checks; \`CancellationException\` not swallowed
- Suspend cleanup uses \`withContext(NonCancellable)\`
- Cancelled scopes not reused
- Tests use \`runTest\` and virtual time (not bare \`runBlocking\`)
- Channels closed; \`consumeEach\` single consumer only
- (Android) Flow collection with \`repeatOnLifecycle(STARTED)\`
- (Compose) \`collectAsStateWithLifecycle()\` instead of \`collectAsState()\`
- (Compose) \`LaunchedEffect\` for init; \`SideEffect\` for analytics/logging
- Tests use injected dispatchers; \`advanceUntilIdle()\` before assertions
- One-shot events via \`Channel\`, not default \`MutableSharedFlow\`
- \`callbackFlow\` + \`awaitClose\` for external callbacks; \`Future.await()\` not \`.get()\`
- \`callbackFlow\` always ends with \`awaitClose { }\`
- Mutable flows not exposed as public API
- Flow chains with operators have \`.catch\` before terminal collect
- No \`Dispatchers.IO\` or \`runBlocking\` in KMP \`commonMain\`
- \`Mutex\` instead of \`synchronized\` in coroutines
- \`stateIn\` uses \`WhileSubscribed\`, not \`Eagerly\`, in ViewModels
- Flow \`.map\` is pure; side effects in \`.onEach\`
- JVM backend: blocking I/O on \`Dispatchers.IO\`; MDC via \`MDCContext()\`

## Tool Coverage

The **Compiler Plugin**, **Detekt**, **Android Lint**, and **IntelliJ Plugin** implement subsets of these practices. Rule codes appear in diagnostics and link to this reference. **Detekt** and the **IntelliJ plugin** (v0.6.0+) only run coroutine-specific checks in files that import \`kotlinx.coroutines\`, which reduces false positives from unrelated APIs with similar names. See [Rules Overview](/docs/rules-overview) and each tool's documentation for which rules are enforced.
`,
  "gradual-adoption": `
# Gradual Adoption Guide

This guide helps you adopt the Structured Coroutines plugin in an existing codebase **without breaking the build**. It covers **profiles** (relaxed → gradual → strict), **excluding** source sets or projects, and **suppression** best practices.

## Step-by-step path: Relaxed → Gradual → Strict

| Step | Profile | Goal |
|------|---------|------|
| **1. Relaxed / Gradual** | \`useGradualProfile()\` or \`useRelaxedProfile()\` | Enable the plugin with **all rules as warnings**. Build succeeds; you see findings in IDE and CI. |
| **2. Fix and suppress** | Same | Fix violations where possible; use \`@Suppress\` for justified exceptions. |
| **3. Strict** | \`useStrictProfile()\` | Once the codebase is clean, switch to strict so new violations fail the build. |
| **4. Platform** | \`useAndroidComposeProfile()\` or \`useKmpCommonProfile()\` | Strict + INTEROP_001/002 as **error**; use when Android Compose or KMP \`commonMain\` is in scope. |
| **5. Backend** | \`useKtorBackendProfile()\` or \`useSpringBackendProfile()\` | Strict preset for Ktor/Spring JVM services; pair with \`ktor-backend-detekt.yml\` or \`spring-backend-detekt.yml\`. |
| **6. Baseline** | \`baseline { }\` + \`generateCoroutinesBaseline\` | Track existing Detekt debt; report only new violations (\`REPORT_NEW_ONLY\`). |

**Enable without breaking the build:**

\`\`\`kotlin
plugins {
    kotlin("jvm") version "2.3.0"
    id("io.github.santimattius.structured-coroutines") version "1.0.0"
}
structuredCoroutines {
    useGradualProfile()  // All warnings; no build failure
}
\`\`\`

**Move to strict when ready:**

\`\`\`kotlin
structuredCoroutines {
    useStrictProfile()   // 9 rules error, 5 warning; violations block the build
}
\`\`\`

**Android Compose or KMP commonMain (v0.8.0+):**

\`\`\`kotlin
structuredCoroutines {
    useAndroidComposeProfile()  // Strict + suspendCoroutineWithoutCancellation & callbackFlowWithoutAwaitClose as error
    // useKmpCommonProfile()  // Same as Android Compose (Lint Compose rules are no-op off Android)
}
\`\`\`

**Ktor / JVM backend (v0.9.0+):**

\`\`\`kotlin
structuredCoroutines {
    useKtorBackendProfile()
}
\`\`\`

**Spring / JVM backend (v1.0.0+):**

\`\`\`kotlin
structuredCoroutines {
    useSpringBackendProfile()  // Strict + INTEROP_001/002 as error; spring-backend-detekt.yml preset
}
\`\`\`

**Detekt baseline for large monorepos (v0.9.0+):**

\`\`\`kotlin
structuredCoroutines {
    baselineFile.set(rootProject.file("coroutines-baseline.xml"))
    baselineEnabled.set(true)
    baselineMode.set("REPORT_NEW_ONLY")
    baselineAutoUpdate.set(false)
}
// ./gradlew generateCoroutinesBaseline  — refresh baseline from detekt.xml
\`\`\`

## Excluding legacy code

**Exclude source sets:** \`excludeSourceSets("legacyMain", "test")\` — names match compilation names (\`main\`, \`test\`, \`jvmMain\`, \`commonMain\`).

**Exclude projects:** \`excludeProjects(":legacy-app", ":experimental")\` — use Gradle project paths.

Use exclusions when you cannot fix or suppress yet. Prefer fixing or suppressing so the whole codebase stays under the same rules; document why a module is excluded.

## Suppression best practices

- Suppress at the **narrowest scope** and **document why**.
- Use the correct suppression ID per tool (see repository \`SUPPRESSING_RULES.md\` when available).
- Avoid blanket or multi-rule suppression when a single targeted suppress would suffice.

## Checklist for migration

- [ ] Apply the plugin with \`useGradualProfile()\` (or \`useRelaxedProfile()\`).
- [ ] Optionally exclude legacy modules or source sets with \`excludeSourceSets\` / \`excludeProjects\`.
- [ ] Run the build; fix or suppress reported violations and document suppressions.
- [ ] Align Detekt / Android Lint with the same rules and severities if you use them.
- [ ] When ready, switch to \`useStrictProfile()\` so new violations fail the build.
- [ ] For Android Compose or KMP, consider \`useAndroidComposeProfile()\` or \`useKmpCommonProfile()\` after the baseline is clean.
- [ ] For Ktor/Spring services, use \`useKtorBackendProfile()\` or \`useSpringBackendProfile()\` and the packaged Detekt preset.
- [ ] In monorepos, generate a Detekt baseline before raising severities; use \`generateCoroutinesBaseline\` / \`applyCoroutinesBaseline\`.

See [Gradle Plugin](/docs/gradle-plugin) for full configuration (profiles, baseline, and exclusions).
`,
  "rules-overview": `
# Rules Overview

This page summarizes all rules provided by the Structured Coroutines toolkit. For installation and configuration, see each module's documentation.

## Compiler Plugin (Compile-time)

**Errors (block compilation):** \`GLOBAL_SCOPE_USAGE\`, \`INLINE_COROUTINE_SCOPE\`, \`UNSTRUCTURED_COROUTINE_LAUNCH\`, \`RUN_BLOCKING_IN_SUSPEND\`, \`JOB_IN_BUILDER_CONTEXT\`, \`CANCELLATION_EXCEPTION_SUBCLASS\`, \`UNUSED_DEFERRED\`, \`SUSPEND_COROUTINE_WITHOUT_CANCELLATION\` (INTEROP_001), \`CALLBACK_FLOW_WITHOUT_AWAIT_CLOSE\` (INTEROP_002).

**Warnings (allow compilation):** \`DISPATCHERS_UNCONFINED_USAGE\`, \`SUSPEND_IN_FINALLY_WITHOUT_NON_CANCELLABLE\`, \`CANCELLATION_EXCEPTION_SWALLOWED\`, \`REDUNDANT_LAUNCH_IN_COROUTINE_SCOPE\`, \`LOOP_WITHOUT_YIELD\` (CANCEL_001; configurable via Gradle \`loopWithoutYield\`).

**Total: 14 rules** (9 errors, 5 warnings). Configured via [Gradle Plugin](/docs/gradle-plugin).

## Gradle Plugin — Configuration report (CI)

From **v0.6.0**, the cacheable \`structuredCoroutinesReport\` task (Gradle group **reporting**) writes HTML and/or plain-text reports of the active compiler-plugin configuration under \`build/reports/structured-coroutines/\` by default: project name, plugin version, severity counts, a per-rule table with codes (\`SCOPE_001\`, etc.) and links into [Best Practices](/docs/best-practices), plus exclusion details when configured. Use \`reportOutputDir\` and \`reportFormat\` (\`"html"\`, \`"text"\`, or \`"all"\`). See [Gradle Plugin](/docs/gradle-plugin).

## Detekt Rules (Static Analysis)

**Compiler Plugin parity (10):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, CancellationExceptionSwallowed, JobInBuilderContext, RedundantLaunchInCoroutineScope, SuspendInFinally, UnusedDeferred.

**Detekt-only (30):** BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield, ScopeReuseAfterCancel, ChannelNotClosed (CHANNEL_001), ConsumeEachMultipleConsumers (CHANNEL_002), FlowBlockingCall (FLOW_001), WithTimeoutScopeCancellation (CANCEL_006), SuspendCoroutineWithoutCancellation (INTEROP_001), CallbackFlowWithoutAwaitClose (INTEROP_002), MutableFlowExposed (FLOW_010), MissingCatchInFlow (FLOW_005), SequentialAsyncAwait (CONCUR_003), RunBlockingInsteadOfRunTest (TEST_004), DispatchersIOInCommonMain (KMP_001), SynchronizedInCoroutine (CONCUR_001), SharedMutableStateInCoroutine (CONCUR_002), RedundantWithContext (CONCUR_004, opt-in), StateInWithEagerlyStrategy (FLOW_006), SideEffectInMapOperator (FLOW_008, opt-in), RunBlockingInCommonMain (KMP_002), MainScopeWithoutCancel (KMP_003), BlockingCallInCoroutineBackend (BACKEND_001), ThreadLocalNotPropagated (BACKEND_002), **HardcodedDispatcherInClass** (TEST_005), **SharedFlowForOneshotEvents** (FLOW_011), **ChannelFlowVsCallbackFlow** (INTEROP_003), **BlockingFutureGet** (INTEROP_004), **MissingCoroutineName** (DEBUG_001, opt-in).

**Total: 40 rules.** All rules apply an **import guard**: files without a \`kotlinx.coroutines\` import are skipped, avoiding false positives from unrelated \`launch\`/\`async\` names. See [Detekt Rules](/docs/detekt-rules).

## Android Lint Rules (Static Analysis)

**Compiler Plugin rules (9):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait.

**Android-specific (3):** MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.

**Additional (23):** UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel, ChannelNotClosed (CHANNEL_001), ConsumeEachMultipleConsumers (CHANNEL_002), FlowBlockingCall (FLOW_001), LifecycleAwareFlowCollection (ARCH_002), MissingCatchInFlow (FLOW_005), CollectAsStateWithoutLifecycle (COMPOSE_001), RunBlockingInsteadOfRunTest (TEST_004), DispatchersIOInCommonMain (KMP_001), SynchronizedInCoroutine (CONCUR_001), StateInWithEagerlyStrategy (FLOW_006), LaunchInWithUnstructuredScope (FLOW_007), RunBlockingInCommonMain (KMP_002), **RememberScopeForInit** (COMPOSE_002), **SideEffectInComposable** (COMPOSE_003), **BlockingFutureGet** (INTEROP_004).

**Total: 35 issues.** See [Lint Rules](/docs/lint-rules).

## IntelliJ/Android Studio Plugin (Real-time)

**35 inspections** (32 enabled by default; **RedundantWithContext**, **SideEffectInMapOperator**, and **MissingCoroutineName** opt-in/disabled by default), **28+ quick fixes**, **8+ intentions** (including **Flow Chain Analyzer**), **gutter icons**, and the **Structured Coroutines tool window**—including **Scan Project for Coroutine Issues**. New in v1.0.0: COMPOSE_002/003, TEST_005/006, FLOW_009/011, INTEROP_003/004, COMPOSE_001 quick fix, AnalyzeFlowChainIntention. Inspections use the same **import guard** as Detekt. See [IntelliJ Plugin](/docs/intellij-plugin).

## Comparison

| Approach | When | Errors | Warnings | CI | Real-time |
|----------|------|--------|----------|-----|-----------|
| Compiler Plugin | Compile | ✅ 9 | ✅ 5 | ✅ | ❌ |
| Detekt Rules | Analysis | — | ✅ 40 | ✅ | ❌ |
| Android Lint | Analysis | — | ✅ 35 | ✅ | ❌ |
| IDE Plugin | Editing | — | ✅ 35 | ❌ | ✅ |
| Gradle report | CI / local | — | — | ✅ | ❌ |

**Documented patterns:** **51** rule codes in \`rule-codes.yml\`; **~119** individual implementations (rule × layer) across compiler, Detekt, Lint, and IntelliJ.

For adoption in existing projects without breaking the build, see [Gradual Adoption](/docs/gradual-adoption). For rule codes and a full checklist, see [Best Practices](/docs/best-practices).
`,
  "annotations": `
# Annotations

Multiplatform annotations for marking structured coroutine scopes and injecting dispatchers. The \`@StructuredScope\` annotation makes scope boundaries explicit and is recognized by the **Compiler Plugin**, **Detekt**, **Lint**, and **IntelliJ plugin**. From **v0.8.0**, dispatcher qualifier annotations support KMP-safe dispatcher injection.

## Installation

\`\`\`kotlin
// build.gradle.kts
dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:1.0.0")
}

// Kotlin Multiplatform (commonMain)
kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation("io.github.santimattius:structured-coroutines-annotations:1.0.0")
            }
        }
    }
}
\`\`\`

## Usage

Mark function parameters, constructor parameters (with \`@property:StructuredScope\` when needed), or class properties that hold a \`CoroutineScope\`:

\`\`\`kotlin
import io.github.santimattius.structured.annotations.StructuredScope

// Function parameter
fun loadData(@StructuredScope scope: CoroutineScope) {
    scope.launch { fetchData() }
}

// Constructor injection
class UserService(
    @property:StructuredScope
    private val scope: CoroutineScope
) {
    fun fetchUser(id: String) {
        scope.launch { /* ... */ }
    }
}

// Class property
class Repository {
    @StructuredScope
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    fun fetchData() {
        scope.launch { /* ... */ }
    }
}
\`\`\`

## Recognition by Compiler and IDE

The compiler plugin and IntelliJ plugin recognize \`@StructuredScope\` on **function parameters**, **class properties**, and **primary constructor parameters** (e.g. \`@property:StructuredScope private val ioScope\`). For example, \`fun foo(@StructuredScope scope: CoroutineScope) { scope.launch { } }\` is not reported as an unstructured launch. The IDE resolves the scope to the parameter, property, or constructor-injected scope and checks for the annotation.

## Framework Scopes (Auto-recognized)

No annotation needed for: \`viewModelScope\` (Android ViewModel), \`lifecycleScope\` (Android Lifecycle), \`rememberCoroutineScope()\` (Jetpack Compose).

## Dispatcher Qualifier Annotations (v0.8.0)

KMP-safe dispatcher injection for \`commonMain\` — avoids \`Dispatchers.IO\` which is unavailable on Kotlin/Native and JS (\`KMP_001\`):

\`\`\`kotlin
import io.github.santimattius.structured.annotations.IoDispatcher
import io.github.santimattius.structured.annotations.MainDispatcher
import io.github.santimattius.structured.annotations.DefaultDispatcher

class DataRepository(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher
) {
    suspend fun fetch(): Data = withContext(ioDispatcher) { /* ... */ }
}
\`\`\`

Platform modules provide \`actual\` bindings (e.g. \`Dispatchers.IO\` on JVM/Android, \`Dispatchers.Default\` on Native). In tests, inject \`UnconfinedTestDispatcher\` or \`StandardTestDispatcher\`.

## Supported Platforms

JVM, JS, iOS, macOS, watchOS, tvOS, Linux, Windows, WASM. Use the \`annotations\` multiplatform artifact; the Gradle plugin resolves the correct variant per target.
`,
  "detekt-rules": `
# Detekt Rules

Custom Detekt rules for enforcing structured concurrency in Kotlin Coroutines. **Total: 40 rules** (10 compiler-plugin parity + 30 Detekt-only). Use for multiplatform projects and CI/CD. Three rules are **opt-in** by default: \`RedundantWithContext\` (CONCUR_004), \`SideEffectInMapOperator\` (FLOW_008), and \`MissingCoroutineName\` (DEBUG_001).

From **v0.6.0**, every rule applies an **import guard** (\`CoroutinesImportFilter\`): if a \`.kt\` file has no import starting with \`kotlinx.coroutines\`, the rule returns immediately. That cuts false positives when unrelated APIs reuse names like \`launch\`, \`async\`, or \`Dispatchers\` (for example Android instrumented tests using \`ActivityScenario.launch\`).

## Installation

\`\`\`kotlin
plugins {
    id("io.gitlab.arturbosch.detekt") version "1.23.7"
}
dependencies {
    detektPlugins("io.github.santimattius:structured-coroutines-detekt-rules:1.0.0")
}
\`\`\`

## Rules Overview

**Compiler Plugin parity (10):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, CancellationExceptionSwallowed, JobInBuilderContext, RedundantLaunchInCoroutineScope, SuspendInFinally, UnusedDeferred.

**Detekt-only (30):** … (see [Rules Overview](/docs/rules-overview) for full list). **v1.0.0 adds:** HardcodedDispatcherInClass (TEST_005), SharedFlowForOneshotEvents (FLOW_011), ChannelFlowVsCallbackFlow (INTEROP_003), BlockingFutureGet (INTEROP_004), MissingCoroutineName (DEBUG_001, opt-in).

| Rule | Category | Description |
|------|----------|-------------|
| GlobalScopeUsage | Compiler Plugin | \`GlobalScope.launch/async\` |
| InlineCoroutineScope | Compiler Plugin | \`CoroutineScope(...).launch/async\` |
| RunBlockingInSuspend | Compiler Plugin | \`runBlocking\` in suspend |
| DispatchersUnconfined | Compiler Plugin | \`Dispatchers.Unconfined\` |
| CancellationExceptionSubclass | Compiler Plugin | Extending \`CancellationException\` |
| CancellationExceptionSwallowed | Compiler Plugin | \`catch(Exception)\` swallowing cancellation |
| JobInBuilderContext | Compiler Plugin | \`Job()\`/\`SupervisorJob()\` in builders |
| RedundantLaunchInCoroutineScope | Compiler Plugin | Single \`launch\` in \`coroutineScope\`/\`supervisorScope\` (skips forEach/for/while) |
| SuspendInFinally | Compiler Plugin | Suspend in \`finally\` without NonCancellable |
| UnusedDeferred | Compiler Plugin | \`async\` without \`await\` (excludes \`awaitAll\`) |
| BlockingCallInCoroutine | Detekt-Only | Thread.sleep, JDBC, sync HTTP in coroutines |
| RunBlockingWithDelayInTest | Detekt-Only | \`runBlocking\` + \`delay\` in tests |
| ExternalScopeLaunch | Detekt-Only | Launch on external scope from suspend |
| LoopWithoutYield | Detekt-Only | Loops without cooperation points |
| ScopeReuseAfterCancel | Detekt-Only | \`scope.cancel()\` then \`scope.launch\`/\`async\` |
| ChannelNotClosed | Detekt-Only | Manual \`Channel()\` without \`close()\` (CHANNEL_001) |
| ConsumeEachMultipleConsumers | Detekt-Only | Same Channel with \`consumeEach\` from multiple coroutines (CHANNEL_002) |
| FlowBlockingCall | Detekt-Only | Blocking calls inside \`flow { }\` (FLOW_001) |
| WithTimeoutScopeCancellation | Detekt-Only | \`withTimeout\` without try/catch for \`TimeoutCancellationException\` (CANCEL_006) |
| SuspendCoroutineWithoutCancellation | Detekt-Only | \`suspendCoroutine\` without cancellation (INTEROP_001) |
| CallbackFlowWithoutAwaitClose | Detekt-Only | \`callbackFlow\` without \`awaitClose\` (INTEROP_002) |
| MutableFlowExposed | Detekt-Only | Public \`MutableStateFlow\`/\`MutableSharedFlow\` (FLOW_010) |
| MissingCatchInFlow | Detekt-Only | Flow chain with operators but no \`.catch\` before terminal (FLOW_005) |
| SequentialAsyncAwait | Detekt-Only | \`async { }.await()\` in same statement (CONCUR_003) |
| RunBlockingInsteadOfRunTest | Detekt-Only | \`runBlocking\` in \`@Test\` where \`runTest\` is appropriate (TEST_004) |
| DispatchersIOInCommonMain | Detekt-Only | \`Dispatchers.IO\` in \`commonMain\`/\`commonTest\` (KMP_001) |
| SynchronizedInCoroutine | Detekt-Only | \`synchronized\` in suspend/coroutine (CONCUR_001) |
| SharedMutableStateInCoroutine | Detekt-Only | Unsynchronized shared mutable state from parallel launches (CONCUR_002, info) |
| RedundantWithContext | Detekt-Only | Nested \`withContext\` with same dispatcher (CONCUR_004, opt-in) |
| StateInWithEagerlyStrategy | Detekt-Only | \`stateIn(..., Eagerly)\` in viewModelScope/lifecycleScope (FLOW_006) |
| SideEffectInMapOperator | Detekt-Only | Side effects inside \`.map { }\` (FLOW_008, opt-in) |
| RunBlockingInCommonMain | Detekt-Only | \`runBlocking\` in \`commonMain\`/\`commonTest\` (KMP_002) |
| MainScopeWithoutCancel | Detekt-Only | \`MainScope()\` without \`cancel()\` in cleanup (KMP_003) |
| BlockingCallInCoroutineBackend | Detekt-Only | Blocking JDBC/IO without \`withContext(IO)\` (BACKEND_001) |
| ThreadLocalNotPropagated | Detekt-Only | MDC not propagated across \`withContext\` (BACKEND_002; requires SLF4J on classpath) |
| HardcodedDispatcherInClass | Detekt-Only | \`Dispatchers.IO\`/\`Main\`/\`Default\` literals in production classes (TEST_005) |
| SharedFlowForOneshotEvents | Detekt-Only | \`MutableSharedFlow(replay=0)\` for one-shot events (FLOW_011) |
| ChannelFlowVsCallbackFlow | Detekt-Only | \`channelFlow\` vs \`callbackFlow\` misuse (INTEROP_003) |
| BlockingFutureGet | Detekt-Only | \`.get()\` on Future/CompletableFuture in suspend (INTEROP_004) |
| MissingCoroutineName | Detekt-Only | \`launch\`/\`async\` without \`CoroutineName\` (DEBUG_001, opt-in) |

Run: \`./gradlew detekt\`. Full config and per-rule details: [Detekt Rules](/docs/detekt-rules) and repository [detekt-rules/README.md](https://github.com/santimattius/structured-coroutines/blob/main/detekt-rules/README.md).
`,
  "intellij-plugin": `
# IntelliJ / Android Studio Plugin

Real-time inspections, quick fixes, intentions, gutter icons, and a **Structured Coroutines tool window** for structured concurrency. Full K1 and K2 Kotlin mode support.

From **v0.6.0**, use **Analyze → Scan Project for Coroutine Issues** (or the **Scan Project** button in the tool window toolbar) to run every inspection across Kotlin sources under content roots—skipping typical build/generated paths—with a **background progress** indicator and **aggregated results** in the tool window; the scan is **cancellable**. Double-click a row to jump to the source. Inspections use the same **import guard** as Detekt: files without a \`kotlinx.coroutines\` import are skipped to avoid false positives. **Suspend in finally** relies on suspend-call resolution instead of a fragile name blocklist.

## Installation

- **Marketplace:** Settings/Preferences → Plugins → search "Structured Coroutines" → Install.
- **From disk:** Download ZIP from [Releases](https://github.com/santimattius/structured-coroutines/releases) → Plugins → Install Plugin from Disk.
- **Build locally:** \`./gradlew :intellij-plugin:buildPlugin\` then install the ZIP from \`intellij-plugin/build/distributions/\`. Run sandbox: \`./gradlew :intellij-plugin:runIde\`.

## Inspections (35)

The inspection list is the single source of truth for the project-wide scan: new inspections registered in the plugin are included automatically.

| Inspection | Severity | Description |
|------------|----------|-------------|
| GlobalScopeUsage | ERROR | \`GlobalScope.launch/async\` |
| MainDispatcherMisuse | WARNING | Blocking code on \`Dispatchers.Main\` |
| ScopeReuseAfterCancel | WARNING | Scope cancelled then reused (CANCEL_005; quick fix: cancelChildren) |
| RunBlockingInSuspend | ERROR | \`runBlocking\` in suspend |
| UnstructuredLaunch | WARNING | Launch without structured scope (recognizes \`@StructuredScope\` on params/properties) |
| AsyncWithoutAwait | WARNING | \`async\` without \`await()\` (excludes \`awaitAll\`) |
| InlineCoroutineScope | ERROR | \`CoroutineScope(...).launch\` |
| JobInBuilderContext | ERROR | \`Job()\`/\`SupervisorJob()\` in builders |
| SuspendInFinally | WARNING | Suspend in finally without NonCancellable |
| CancellationExceptionSwallowed | WARNING | \`catch(Exception)\` swallowing cancellation |
| CancellationExceptionSubclass | ERROR | Classes extending \`CancellationException\` (quick fix: change superclass to Exception) |
| DispatchersUnconfined | WARNING | \`Dispatchers.Unconfined\` |
| LoopWithoutYield | WARNING | Loops in suspend without cooperation points (CANCEL_001); quick fixes: ensureActive, yield, delay(0) |
| LifecycleAwareFlowCollection | WARNING | Flow collection in \`lifecycleScope.launch\` without \`repeatOnLifecycle\`/\`flowWithLifecycle\` (ARCH_002) |
| WithTimeoutScopeCancellation | WARNING | \`withTimeout\` without try/catch for timeout/cancellation (CANCEL_006); quick fix: replace with \`withTimeoutOrNull\` |
| SuspendCoroutineWithoutCancellation | ERROR | \`suspendCoroutine\` without cancellation (INTEROP_001); quick fix: replace with \`suspendCancellableCoroutine\` |
| CallbackFlowWithoutAwaitClose | ERROR | \`callbackFlow\` without \`awaitClose\` (INTEROP_002); quick fix: add \`awaitClose { }\` |
| MutableFlowExposed | WARNING | Public \`MutableStateFlow\`/\`MutableSharedFlow\` (FLOW_010); quick fix: backing property pattern |
| MissingCatchInFlow | WARNING | Flow chain missing \`.catch\` before terminal (FLOW_005); quick fix: insert \`.catch\` |
| SequentialAsyncAwait | WARNING | Sequential \`async { }.await()\` (CONCUR_003); quick fix: parallelize with \`coroutineScope\` |
| RunBlockingInsteadOfRunTest | WARNING | \`runBlocking\` in test where \`runTest\` is better (TEST_004); intention: Convert to runTest |
| CollectAsStateWithoutLifecycle | WARNING | \`collectAsState()\` in Composable (COMPOSE_001); QF: \`collectAsStateWithLifecycle()\` |
| DispatchersIOInCommonMain | ERROR | \`Dispatchers.IO\` in \`commonMain\` (KMP_001) |
| SynchronizedInCoroutine | WARNING | \`synchronized\` in coroutine (CONCUR_001); QF: Mutex.withLock |
| StateInWithEagerlyStrategy | WARNING | \`stateIn(..., Eagerly)\` in ViewModel scope (FLOW_006); QF: WhileSubscribed |
| LaunchInWithUnstructuredScope | WARNING | \`.launchIn(GlobalScope)\` / inline scope (FLOW_007); QF: viewModelScope/lifecycleScope |
| RedundantWithContext | WARNING | Nested \`withContext\` same dispatcher (CONCUR_004, **disabled by default**) |
| SideEffectInMapOperator | WARNING | Side effects in \`.map\` (FLOW_008, **disabled by default**) |
| **RememberScopeForInit** | WARNING | \`rememberCoroutineScope().launch\` for init (COMPOSE_002); QF: ReplaceWithLaunchedEffect |
| **HardcodedDispatcherInClass** | WARNING | Hardcoded \`Dispatchers.*\` in production class (TEST_005) |
| **CoroutineNotCompletedInTest** | WARNING | Assertions in \`runTest\` without \`advanceUntilIdle()\` (TEST_006) |
| **FlatMapOperatorChoice** | INFO | Contextual guide for \`flatMapLatest\`/\`flatMapMerge\`/\`flatMapConcat\` (FLOW_009) |
| **SharedFlowForOneshotEvents** | WARNING | \`MutableSharedFlow\` for one-shot events (FLOW_011); QF: Channel + receiveAsFlow |
| **ChannelFlowVsCallbackFlow** | WARNING | \`channelFlow\` vs \`callbackFlow\` misuse (INTEROP_003) |
| **BlockingFutureGet** | WARNING | \`.get()\` on Future in suspend (INTEROP_004); QF: \`.await()\` |

## Structured Coroutines Tool Window

**View → Tool Windows → Structured Coroutines.** Lists findings for the **current file** (refresh) and, after **Scan Project**, **all issues** collected from the project scan. Columns: Severity | Location | Inspection | **What to do** (action summary per finding). Detail bar shows full "What to do" text and **"See guide →"** link to the best-practices guide. Use **Refresh** for the open file; use **Scan Project** for a full-repo pass; **double-click** a row to jump to the issue. Correctly recognizes \`@StructuredScope\` on parameters, properties, and **primary constructor parameters** (\`@property:StructuredScope\`).

## Quick Fixes

Replace with viewModelScope/lifecycleScope/coroutineScope; wrap with Dispatchers.IO; replace cancel with cancelChildren; remove runBlocking; add await / convert to launch; wrap with NonCancellable; add CancellationException handling; supervisorScope for Job in builder; cooperation points in loops; change superclass to Exception; replace with withTimeoutOrNull; replace suspendCoroutine with suspendCancellableCoroutine (INTEROP_001); add awaitClose (INTEROP_002); backing property for Mutable flows (FLOW_010); insert .catch (FLOW_005); parallelize async/await (CONCUR_003); replace synchronized with Mutex.withLock (CONCUR_001); Eagerly → WhileSubscribed (FLOW_006); remove redundant withContext (CONCUR_004); **collectAsStateWithLifecycle** (COMPOSE_001); **ReplaceWithLaunchedEffect** (COMPOSE_002); **SharedFlow → Channel** (FLOW_011); **.get() → .await()** (INTEROP_004).

## Intentions (8+)

Migrate to viewModelScope/lifecycleScope; wrap with coroutineScope; convert launch to async; extract suspend function; **Convert to runTest** (runBlocking + delay in tests → runTest, TEST_001); **Convert to runTest** for bare \`runBlocking\` in \`@Test\` (TEST_004); **AnalyzeFlowChainIntention** — with the cursor on a Flow operator, summarizes the chain (catch, flatMap semantics, side effects, suggestions).

## Gutter Icons

Scope type (viewModelScope, lifecycleScope, GlobalScope, etc.) and dispatcher context (Main, IO, Default, Unconfined).

## Compatibility

- IntelliJ IDEA 2026.1+ / Android Studio (plugin **1.0.0**, builds 243–261.*)
- K1 and K2 mode supported
`,
  "gradle-plugin": `
# Gradle Plugin

Integrates the Structured Coroutines **K2/FIR Compiler Plugin** so you can enforce structured concurrency at compile time. **14 rules** (9 errors, 5 warnings) are configurable. From **v0.3.0** you can use **profiles** and **exclude** source sets or projects; from **v0.4.0** the **LoopWithoutYield** (CANCEL_001) checker can be enabled/disabled via \`loopWithoutYield\`. From **v0.6.0**, the **structuredCoroutinesReport** task generates **HTML** and/or **plain-text** configuration reports for CI and audits. From **v0.8.0**, **platform profiles** (\`useAndroidComposeProfile\`, \`useKmpCommonProfile\`) and INTEROP compiler options are available. From **v0.9.0**, **\`useKtorBackendProfile()\`**, **Detekt baseline** DSL, packaged \`ktor-backend-detekt.yml\`, and a **Learning Path** section in HTML reports. From **v1.0.0**, **\`useSpringBackendProfile()\`** and packaged \`spring-backend-detekt.yml\`.

## Installation

\`\`\`kotlin
// settings.gradle.kts
pluginManagement {
    repositories {
        mavenLocal()
        gradlePluginPortal()
        mavenCentral()
        google()
    }
}

// build.gradle.kts
plugins {
    kotlin("jvm") version "2.3.0"   // Kotlin 2.3+ (K2) required
    id("io.github.santimattius.structured-coroutines") version "1.0.0"
}

dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:1.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
}
\`\`\`

## Configuration report task (\`structuredCoroutinesReport\`)

A **cacheable** task in the **reporting** group that materializes the active plugin configuration for humans and CI:

\`\`\`bash
./gradlew structuredCoroutinesReport
# Default output:
#   build/reports/structured-coroutines/structured-coroutines-report.html
#   build/reports/structured-coroutines/structured-coroutines-report.txt
\`\`\`

The HTML report is **self-contained** (no external CSS/JS). Content includes project name, plugin version, timestamp, error/warning counts, a table of all **14** compiler rules with severities and anchors into the best-practices guide, **exclusions** when configured, and (v0.9.0+) a **Learning Path** section ordered by impact (\`LearningPathGenerator\`).

\`\`\`kotlin
structuredCoroutines {
    reportFormat.set("html")   // "html" | "text" | "all"
    reportOutputDir.set(layout.buildDirectory.dir("reports/coroutines"))
}
\`\`\`

Pair this with \`compileKotlin\`, Detekt, and Lint in CI; archive reports as artifacts or post the text summary in PR comments. The upstream repo ships an internal CI reference (\`docs-local/CI_INTEGRATION.md\`) with a sample GitHub Actions workflow.

## Profiles (strict / gradual / relaxed / platform)

Apply a preset with one line:

\`\`\`kotlin
structuredCoroutines {
    useStrictProfile()   // Default: 9 error, 5 warning (greenfield)
    // useGradualProfile()  // All 14 rules warning (migration)
    // useRelaxedProfile()   // Same as gradual
    // useAndroidComposeProfile()  // Strict + INTEROP_001/002 as error (v0.8.0)
    // useKmpCommonProfile()       // Same as Android Compose (v0.8.0)
    // useKtorBackendProfile()     // Strict for Ktor JVM (v0.9.0)
    // useSpringBackendProfile()   // Strict for Spring JVM (v1.0.0)
}
\`\`\`

| Profile | When to use | Effect |
|---------|--------------|--------|
| **Strict** | New projects or fail build on violations | 9 rules → error, 5 → warning |
| **Gradual** / **Relaxed** | Migrating; build must not fail | All **14** rules → **warning** |
| **Android Compose** | Android + Compose / callback interop | Strict + \`suspendCoroutineWithoutCancellation\` & \`callbackFlowWithoutAwaitClose\` → **error** |
| **KMP Common** | Multiplatform \`commonMain\` modules | Same as Android Compose (Lint Compose rules no-op off Android) |
| **Ktor Backend** | Ktor JVM services | Strict preset; use packaged \`ktor-backend-detekt.yml\` for Detekt |
| **Spring Backend** | Spring / JVM services | Strict + INTEROP as error; use packaged \`spring-backend-detekt.yml\` (v1.0.0) |

## Detekt baseline (v0.9.0+)

\`\`\`kotlin
structuredCoroutines {
    baselineFile.set(rootProject.file("coroutines-baseline.xml"))
    baselineEnabled.set(true)
    baselineMode.set("REPORT_NEW_ONLY")
    baselineAutoUpdate.set(false)
}
\`\`\`

Tasks: \`generateCoroutinesBaseline\` (from \`build/reports/detekt/detekt.xml\`), \`applyCoroutinesBaseline\` (post-process report for new violations only).

See [Gradual Adoption](/docs/gradual-adoption) for the full migration path.

## Excluding source sets and projects

\`\`\`kotlin
structuredCoroutines {
    useGradualProfile()
    excludeSourceSets("legacyMain", "test")
    excludeProjects(":legacy-module", ":app:oldFeature")
}
\`\`\`

Source set names match compilation names (\`main\`, \`test\`, \`jvmMain\`, \`commonMain\`). Project paths use Gradle format (\`:subproject\`, \`:app:lib\`).

## Per-rule configuration

\`\`\`kotlin
structuredCoroutines {
    globalScopeUsage.set("error")
    inlineCoroutineScope.set("error")
    unstructuredLaunch.set("error")
    runBlockingInSuspend.set("error")
    jobInBuilderContext.set("error")
    cancellationExceptionSubclass.set("error")
    unusedDeferred.set("error")
    dispatchersUnconfined.set("warning")
    suspendInFinally.set("warning")
    cancellationExceptionSwallowed.set("warning")
    redundantLaunchInCoroutineScope.set("warning")
    loopWithoutYield.set("warning")  // v0.4.0: CANCEL_001, loops without cooperation points
    suspendCoroutineWithoutCancellation.set("error")  // v0.8.0: INTEROP_001
    callbackFlowWithoutAwaitClose.set("error")        // v0.8.0: INTEROP_002
}
\`\`\`

## Rules Summary

| Severity | Count | Examples |
|----------|-------|----------|
| Error (default) | 9 | GlobalScope, inline scope, unstructured launch, runBlocking in suspend, Job() in builders, CancellationException subclass, async without await, **suspendCoroutine without cancellation**, **callbackFlow without awaitClose** |
| Warning (default) | 5 | Dispatchers.Unconfined, suspend in finally, CancellationException swallowed, redundant launch in coroutineScope, loop without yield (CANCEL_001) |

Supports **JVM** and **Kotlin Multiplatform**. For KMP, apply \`kotlin(\"multiplatform\")\` and add annotations in \`commonMain\`. See [gradle-plugin/README.md](https://github.com/santimattius/structured-coroutines/blob/main/gradle-plugin/README.md) for KMP setup and troubleshooting.
`,
  "lint-rules": `
# Android Lint Rules

Custom Android Lint rules for structured concurrency and **Android-specific** detection. **Total: 35 issues** (9 from Compiler Plugin + 3 Android-specific + 23 additional). Run with \`./gradlew lint\`; integrate with Android Studio for real-time feedback and quick fixes.

## Installation

\`\`\`kotlin
// build.gradle.kts (Android module)
dependencies {
    lintChecks("io.github.santimattius:structured-coroutines-lint-rules:1.0.0")
}
\`\`\`

**Note:** Android Lint is Android-only. For multiplatform, use the [Compiler Plugin](/docs/compiler) or [Detekt Rules](/docs/detekt-rules).

## Rules Overview

| Category | Count | Examples |
|----------|-------|----------|
| Compiler Plugin | 9 | GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait |
| Android-Specific | 3 | **MainDispatcherMisuse** (blocking on Main → ANRs), **ViewModelScopeLeak**, **LifecycleAwareScope** |
| Additional | 23 | UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel, ChannelNotClosed (CHANNEL_001), ConsumeEachMultipleConsumers (CHANNEL_002), FlowBlockingCall (FLOW_001), LifecycleAwareFlowCollection (ARCH_002), MissingCatchInFlow (FLOW_005), CollectAsStateWithoutLifecycle (COMPOSE_001), RunBlockingInsteadOfRunTest (TEST_004), DispatchersIOInCommonMain (KMP_001), SynchronizedInCoroutine (CONCUR_001), StateInWithEagerlyStrategy (FLOW_006), LaunchInWithUnstructuredScope (FLOW_007), RunBlockingInCommonMain (KMP_002), **RememberScopeForInit** (COMPOSE_002), **SideEffectInComposable** (COMPOSE_003), **BlockingFutureGet** (INTEROP_004) |

Configure severity per issue id in \`lint.xml\`.

## Example: MainDispatcherMisuse

\`\`\`kotlin
// ❌ BAD — blocks Main thread
viewModelScope.launch(Dispatchers.Main) {
    Thread.sleep(1000)
    inputStream.read()
}

// ✅ GOOD — blocking work on IO
viewModelScope.launch(Dispatchers.Main) {
    updateUI()
    withContext(Dispatchers.IO) {
        inputStream.read()
    }
}
\`\`\`

Run: \`./gradlew lint\`. Reports: \`app/build/reports/lint-results.html\`. Full docs: [lint-rules/README.md](https://github.com/santimattius/structured-coroutines/blob/main/lint-rules/README.md).
`,
  "compiler": `
# Compiler Plugin

The **K2/FIR Kotlin Compiler Plugin** enforces structured concurrency at compile time. **14 rules** (9 errors, 5 warnings). Severity is configured via the [Gradle Plugin](/docs/gradle-plugin).

## Overview

The plugin uses the K2/FIR API to detect:

- \`GlobalScope\` usage and inline \`CoroutineScope(...)\` creation
- Unstructured launch (requires \`@StructuredScope\` or framework scopes)
- \`runBlocking\` inside suspend functions
- \`Job()\` / \`SupervisorJob()\` passed to builders
- \`Dispatchers.Unconfined\` usage
- Classes extending \`CancellationException\`
- Suspend calls in \`finally\` without \`NonCancellable\`
- \`catch(Exception)\` that may swallow \`CancellationException\` (including inside **suspend lambdas**, e.g. \`scope.launch { try { } catch (e: Exception) { } }\`)
- \`async\` without \`await\`
- Redundant \`launch\` in \`coroutineScope\` (skips when launch is inside \`forEach\`/for/while)
- **Loops without cooperation points** (CANCEL_001): \`while\`/\`for\` in suspend functions with no \`yield\`/\`ensureActive\`/\`delay\` (configurable via \`loopWithoutYield\`)
- **suspendCoroutine without cancellation** (INTEROP_001): use \`suspendCancellableCoroutine\` + \`invokeOnCancellation\`
- **callbackFlow without awaitClose** (INTEROP_002): \`callbackFlow { }\` must call \`awaitClose { }\`

## Checkers (14 Rules)

| Checker | Default | Description |
|---------|---------|-------------|
| UnstructuredLaunchChecker | Error | GlobalScope, inline scope, unstructured launch |
| RunBlockingInSuspendChecker | Error | runBlocking in suspend |
| JobInBuilderContextChecker | Error | Job()/SupervisorJob() in builders |
| DispatchersUnconfinedChecker | Warning | Dispatchers.Unconfined |
| CancellationExceptionSubclassChecker | Error | Extending CancellationException |
| SuspendInFinallyChecker | Warning | Suspend in finally |
| CancellationExceptionSwallowedChecker | Warning | catch(Exception) in suspend context |
| UnusedDeferredChecker | Error | async without await (excludes Deferred in awaitAll) |
| RedundantLaunchInCoroutineScopeChecker | Warning | Redundant launch in coroutineScope |
| LoopWithoutYieldChecker | Warning | Loops in suspend without cooperation points (CANCEL_001) |
| SuspendCoroutineWithoutCancellationChecker | Error | suspendCoroutine without cancellation (INTEROP_001) |
| CallbackFlowWithoutAwaitCloseChecker | Error | callbackFlow without awaitClose (INTEROP_002) |

## Requirements

- Kotlin 2.3.0+ (K2)
- Gradle 8.0+

The **sample** project includes a \`compilation\` package with one example per compiler rule (9 errors, 5 warnings) for testing. See [compiler/README.md](https://github.com/santimattius/structured-coroutines/blob/main/compiler/README.md).
`,
  "kotlin-coroutines-skill": `
# Kotlin Coroutines Skill

Expert guidance for **any AI coding tool** that supports Agent Skills or custom instructions — **safe structured concurrency**, performance, and Kotlin 1.9/2.0+ best practices for Coroutines. **v3.0.0** aligns with toolkit **v1.0.0**: **51 documented patterns**, **65+ triage entries**, and references for §§8.4–8.5 (Compose), §§6.5–6.6 (testing), §§9.10–9.11 (Flow), §§10.3–10.4 (interop), §14.1 (debugging). **Toolkit v0.8.0** adds interop (§10), KMP dispatchers (§11.1), Flow safety (§9.5–9.6), Compose (§8.3). **Toolkit v0.9.0** adds concurrency (§12), backend JVM (§13.1), redundant withContext / MDC (§3.6–3.7), Flow ViewModel patterns (§9.7–9.9), and KMP runBlocking/MainScope (§11.2–11.3).

This skill is part of the [Structured Coroutines](https://github.com/santimattius/structured-coroutines) project. **SKILL.md** is the single entry point: it consolidates agent identity, strict rules, the triage playbook, and the required output format; **references/** holds one markdown file per practice (32 in v2.0.0) with Bad / Recommended / Why / Quick fix. Together they encode scopes, dispatchers, exceptions, cancellation, testing, channels, Flow, and Android lifecycle so that **Claude, ChatGPT, Cursor, or other agents** give **consistent, correct** advice on Kotlin Coroutines. Inspired by the [Swift Concurrency Agent Skill](https://github.com/AvdLee/Swift-Concurrency-Agent-Skill) model.

## Why This Skill Exists

- **Structured concurrency is easy to get wrong:** \`GlobalScope\`, wrong Dispatchers, swallowed \`CancellationException\`, and misuse of \`SupervisorJob\` lead to leaks, ANRs, and flaky behavior. Many AI answers repeat these mistakes.
- **One source of truth:** This skill encodes a consistent checklist so every AI tool gives the same aligned recommendations.
- **Faster reviews and migrations:** Teams can point their AI at this skill and get code that follows the same rules — no GlobalScope, proper scopes, \`withContext(IO)\`, virtual-time tests, etc.

## What's Included

\`\`\`text
kotlin-coroutines-skill/
├── SKILL.md
└── references/
\`\`\`

| Asset | Description |
|-------|-------------|
| **SKILL.md** | Triage playbook including the full **Agent Behavior Contract**: identity, strict rules, tone, output format (analysis → erroneous code → optimized code → explanation), and triage table (65+ entries; topic/error → reference file). |
| **references/** | One markdown file per practice. Each has Bad / Recommended / Why / Quick fix. New in v3.0.0: §§8.4–8.5, 6.5–6.6, 9.10–9.11, 10.3–10.4, 14.1. |
| **SYSTEM_PROMPT.md** | Standalone agent prompt with INTEROP_001–004, KMP_001–003, COMPOSE_001–003 rules. |

**References by section (selected):**

| § | Topic |
|---|-------|
| 1.1 | GlobalScope in production |
| 1.2 | async without await |
| 1.3 | Breaking structured concurrency |
| 2.1 | launch on last line of coroutineScope |
| 2.2 | runBlocking in suspend |
| 3.1 | Blocking code with wrong Dispatchers |
| 3.2 | Dispatchers.Unconfined |
| 3.3 | Job()/SupervisorJob() in builders |
| 4.1 | Cancellation in intensive loops |
| 4.2 | Swallowing CancellationException |
| 4.3 | Suspend cleanup without NonCancellable |
| 4.4 | Reusing cancelled scope |
| 5.1 | SupervisorJob in single builder |
| 5.2 | CancellationException for domain errors |
| 6.1 | Slow tests with real delays |
| 6.2 | Uncontrolled fire-and-forget in tests |
| 6.5 | Hardcoded Dispatchers in production classes |
| 6.6 | advanceUntilIdle before assertions in runTest |
| 7.1 | Channel not closed |
| 7.2 | consumeEach with multiple consumers |
| 8 | Architecture patterns |
| 8.3 | collectAsStateWithLifecycle (Compose) |
| 8.4 | rememberCoroutineScope for init → LaunchedEffect |
| 8.5 | Side effects in Composable body |
| 9.5 | Mutable flows exposed publicly |
| 9.6 | Missing .catch in Flow chains |
| 9.10 | flatMapLatest vs flatMapMerge vs flatMapConcat |
| 9.11 | SharedFlow for one-shot events |
| 10.1 | suspendCoroutine without cancellation |
| 10.2 | callbackFlow without awaitClose |
| 10.3 | channelFlow vs callbackFlow |
| 10.4 | Future.get → await |
| 11.1 | Dispatchers.IO in commonMain (KMP) |
| 11.2 | runBlocking in commonMain (KMP) |
| 11.3 | MainScope without cancel |
| 12.1 | synchronized → Mutex in coroutines |
| 12.2 | Shared mutable state in parallel launches |
| 3.6 | Redundant withContext |
| 3.7 | MDC / ThreadLocal propagation |
| 9.7 | stateIn with Eagerly |
| 9.8 | launchIn unstructured scope |
| 9.9 | Side effects in Flow map |
| 13.1 | Blocking calls in backend coroutines |
| 14.1 | Missing CoroutineName (opt-in) |

## Setup

### Option A: Claude Code (Plugin — Recommended)

Claude Code supports this skill as a plugin via the marketplace.

**Install from the marketplace:**

\`\`\`bash
/plugin marketplace add santimattius/structured-coroutines
/plugin install kotlin-coroutines-skill
\`\`\`

**Install from a local directory:**

\`\`\`bash
claude --plugin-dir /path/to/structured-coroutines/kotlin-coroutines-skill
\`\`\`

Once installed, the skill is available when you work on Kotlin/Android code. Claude Code reads **SKILL.md** (Agent Behavior Contract, triage) and **references/ref-*.md** on demand.

### Option B: Claude (Projects — Custom Instructions)

1. In Claude, open **Projects** and create or select a project.
2. Go to **Project settings → Custom instructions**.
3. Paste the **Agent Behavior Contract** section from **SKILL.md**.
4. Optionally add: *"For Kotlin Coroutines questions, always use the structured output format: 1) Analysis, 2) Erroneous code, 3) Optimized code, 4) Technical explanation."*
5. Save.

### Option C: ChatGPT (Custom GPTs)

1. Create a new **Custom GPT** (ChatGPT Plus or Team).
2. In **Configure → Instructions**, paste the **Agent Behavior Contract** section from **SKILL.md**.
3. Optionally upload the \`references/\` files to **Knowledge** so the GPT can reference them.
4. Save and name the GPT (e.g. "Kotlin Coroutines Expert").

### Option D: Cursor (Rules for AI)

1. In your repo, open or create \`.cursor/rules/\`.
2. Create a file \`kotlin-coroutines.mdc\` (or \`.md\`).
3. Paste the **Agent Behavior Contract** section from **SKILL.md**.
4. Add a \`globs\` condition so the rule applies to Kotlin files: \`**/*.kt\`.
5. Reload Cursor rules.

## Example Prompts

Use these to validate that the agent is following the skill:

| Prompt | What it tests |
|--------|----------------|
| *"Refactor this code to avoid GlobalScope and follow structured concurrency."* | Scopes and leaks |
| *"I'm reading a file with \`Dispatchers.Default\`. Is that correct?"* | Dispatchers |
| *"This catch block catches \`Exception\` and logs it. How should I handle CancellationException?"* | Exception handling |
| *"Replace runBlocking and real delay() in this test with kotlinx-coroutines-test and virtual time."* | Testing |
| *"Review this coroutine code: 1) Analysis, 2) Erroneous snippet, 3) Optimized snippet, 4) Explanation."* | Output format |

**Verify installation:** Open a \`.kt\` file with \`GlobalScope.launch { }\` and ask the agent to review it. The response should follow: **Analysis → Erroneous Code → Optimized Code → Technical Explanation**.

## Quick Checklist

The skill enforces these rules in every response:

- No \`GlobalScope\`; use framework (\`viewModelScope\`, \`lifecycleScope\`) or injected/local scopes.
- \`async\` only when you need a return value; otherwise \`launch\`.
- No \`runBlocking\` inside suspend functions — use \`withContext\` or \`coroutineScope\`.
- Blocking I/O always on \`withContext(Dispatchers.IO)\`. Never on \`Default\` or \`Main\`.
- No \`Dispatchers.Unconfined\` in production.
- No \`Job()\` / \`SupervisorJob()\` passed directly to builders; use \`supervisorScope { }\` or a scope-level \`SupervisorJob\`.
- Never swallow \`CancellationException\`; rethrow it in catch.
- Suspend cleanup in \`finally\` → \`withContext(NonCancellable) { }\`.
- Do not reuse a scope after \`scope.cancel()\`; use \`cancelChildren()\` to stop only children.
- Tests use \`runTest\` with virtual time (\`advanceTimeBy\`, \`advanceUntilIdle\`). No real \`delay()\`.
- Channels: prefer \`produce { }\`. Use \`for (x in channel)\` per consumer, not \`consumeEach\` for fan-out.
- Callback bridges: \`suspendCancellableCoroutine\` + \`invokeOnCancellation\`; \`callbackFlow\` + \`awaitClose\`.
- Compose: \`collectAsStateWithLifecycle()\` over \`collectAsState()\`; \`LaunchedEffect\` for init; \`SideEffect\` for logging
- KMP: inject dispatchers via \`@IoDispatcher\`; no \`Dispatchers.IO\` or \`runBlocking\` in \`commonMain\`
- Use \`Mutex.withLock\` instead of \`synchronized\` in suspend code.
- \`stateIn\` with \`WhileSubscribed\`, not \`Eagerly\`, in ViewModels.
- Backend: blocking I/O on \`Dispatchers.IO\`; \`MDCContext()\` when using SLF4J MDC.
- One-shot events: \`Channel(BUFFERED)\` + \`receiveAsFlow()\`, not default \`MutableSharedFlow\`.
- Interop: \`callbackFlow\` + \`awaitClose\`; \`.await()\` instead of \`Future.get()\`.
- Tests: inject dispatchers; \`advanceUntilIdle()\` before assertions in \`runTest\`.

Full agent contract, rules, and triage live in **SKILL.md**; per-practice detail is in \`references/\`. Repository: [kotlin-coroutines-skill](https://github.com/santimattius/structured-coroutines/tree/main/kotlin-coroutines-skill).
`,
  "api": `
# API Reference

Key artifacts and documentation are maintained in the repository:

| Artifact | Description |
|----------|-------------|
| \`io.github.santimattius:structured-coroutines-annotations\` | \`@StructuredScope\`, \`@IoDispatcher\`, \`@MainDispatcher\`, \`@DefaultDispatcher\` (multiplatform) |
| \`io.github.santimattius:structured-coroutines-compiler\` | K2/FIR compiler plugin |
| \`io.github.santimattius.structured-coroutines\` (Gradle) | Gradle plugin |
| \`io.github.santimattius:structured-coroutines-detekt-rules\` | Detekt rules (40) |
| \`io.github.santimattius:structured-coroutines-lint-rules\` | Android Lint rules (35) |

**Module docs** (repository [main](https://github.com/santimattius/structured-coroutines/tree/main)): [Gradle Plugin](https://github.com/santimattius/structured-coroutines/blob/main/gradle-plugin/README.md), [Detekt](https://github.com/santimattius/structured-coroutines/blob/main/detekt-rules/README.md), [Lint](https://github.com/santimattius/structured-coroutines/blob/main/lint-rules/README.md), [IntelliJ](https://github.com/santimattius/structured-coroutines/blob/main/intellij-plugin/README.md), [Annotations](https://github.com/santimattius/structured-coroutines/blob/main/annotations/README.md), [Compiler](https://github.com/santimattius/structured-coroutines/blob/main/compiler/README.md), [Kotlin Coroutines Skill](https://github.com/santimattius/structured-coroutines/blob/main/kotlin-coroutines-skill/README.md).

## External Resources

- [Kotlin Coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)
- [Structured Concurrency](https://kotlinlang.org/docs/coroutines-basics.html#structured-concurrency)
- [Detekt Documentation](https://detekt.dev/)
- [Android Lint API](https://googlesamples.github.io/android-custom-lint-rules/)
- [IntelliJ Plugin SDK](https://plugins.jetbrains.com/docs/intellij/welcome.html)
- [K2 Compiler Guide](https://kotlinlang.org/docs/k2-compiler-migration-guide.html)
`,
  "changelog": `
# Changelog

## Unreleased${latestGitTag ? ` (latest: ${latestGitTag})` : ''}

See repository for ongoing changes.

## v1.0.0 — Production Ready Complete

**Codename:** Production Ready Complete · **Date:** 2026-06-04 · Closes V2 roadmap iteration 3/3.

- **9 new rules:** COMPOSE_002 (\`RememberScopeForInit\`), COMPOSE_003 (\`SideEffectInComposable\`), TEST_005 (\`HardcodedDispatcherInClass\`), TEST_006 (\`CoroutineNotCompletedInTest\`), FLOW_009 (\`FlatMapOperatorChoice\`, info), FLOW_011 (\`SharedFlowForOneshotEvents\`), INTEROP_003 (\`ChannelFlowVsCallbackFlow\`), INTEROP_004 (\`BlockingFutureGet\`), DEBUG_001 (\`MissingCoroutineName\`, opt-in). Compiler unchanged at **14** rules. Detekt **40**, Lint **35**, IntelliJ **35** inspections / **28+** quick fixes. **51** documented patterns; **~119** rule × layer implementations.
- **Flow Chain Analyzer:** \`AnalyzeFlowChainIntention\` summarizes Flow chains (catch, flatMap semantics, side effects).
- **Gradle:** \`useSpringBackendProfile()\` + \`spring-backend-detekt.yml\` for Spring/JVM services.
- **IntelliJ quick fixes:** COMPOSE_001 \`collectAsStateWithLifecycle\`; COMPOSE_002 \`LaunchedEffect\`; FLOW_011 Channel; INTEROP_004 \`.await()\`.
- **Kotlin Coroutines Skill v3.0.0:** references §§8.4–8.5, 6.5–6.6, 9.10–9.11, 10.3–10.4, 14.1; \`SYSTEM_PROMPT.md\` updated.
- **Platform guides:** Compose, KMP, Ktor, Spring; migration guide \`MIGRATION_v0.7_to_v1.0.md\`.
- **Requirements:** Kotlin 2.3.0+ (recommended 2.3.20), kotlinx-coroutines **1.11.0**, IntelliJ plugin **1.0.0** (builds 243–261.*).

## v0.9.0 — Concurrency, KMP & Backend

- **10 new rules:** CONCUR_001 (\`SynchronizedInCoroutine\`), CONCUR_002 (\`SharedMutableStateInCoroutine\`), CONCUR_004 (\`RedundantWithContext\`, opt-in), FLOW_006 (\`StateInWithEagerlyStrategy\`), FLOW_007 (\`LaunchInWithUnstructuredScope\`), FLOW_008 (\`SideEffectInMapOperator\`, opt-in), KMP_002 (\`RunBlockingInCommonMain\`), KMP_003 (\`MainScopeWithoutCancel\`), BACKEND_001 (\`BlockingCallInCoroutineBackend\`), BACKEND_002 (\`ThreadLocalNotPropagated\`). Compiler unchanged at **14** rules. Detekt **35**, Lint **29**, IntelliJ **28** inspections / **21** quick fixes.
- **kotlinx-coroutines 1.10.2 → 1.11.0** — improved \`flowOn\` + \`ThreadContextElement\`; R8 fix for \`stateIn\`/\`shareIn\` on Android release.
- **Gradle:** \`useKtorBackendProfile()\`, \`ktor-backend-detekt.yml\`, baseline DSL (\`baselineFile\`, \`generateCoroutinesBaseline\`, \`applyCoroutinesBaseline\`), **Learning Path** in HTML \`structuredCoroutinesReport\`.
- **IntelliJ \`0.9.0-ALPHA01\`:** 5 new inspections (3 enabled, 2 opt-in disabled); quick fixes for Mutex, WhileSubscribed, RemoveRedundantWithContext.
- **Best practices:** §3.6, §3.7, §9.7–9.9, §11.2–11.3, §12, §13.1.

## v0.8.0 — Interop & Flow Safety

- **8 new rules:** INTEROP_001 (\`SuspendCoroutineWithoutCancellation\`), INTEROP_002 (\`CallbackFlowWithoutAwaitClose\`), FLOW_010 (\`MutableFlowExposed\`), FLOW_005 (\`MissingCatchInFlow\`), CONCUR_003 (\`SequentialAsyncAwait\`), TEST_004 (\`RunBlockingInsteadOfRunTest\`), COMPOSE_001 (\`CollectAsStateWithoutLifecycle\`), KMP_001 (\`DispatchersIOInCommonMain\`). Rule counts: compiler **14** (9 error, 5 warning), Detekt **26**, Lint **25**, IntelliJ **22** inspections / **18** quick fixes.
- **Compiler:** New FIR checkers \`SuspendCoroutineWithoutCancellationChecker\`, \`CallbackFlowWithoutAwaitCloseChecker\`; Gradle options \`suspendCoroutineWithoutCancellation\`, \`callbackFlowWithoutAwaitClose\` (default error).
- **Gradle profiles:** \`useAndroidComposeProfile()\` and \`useKmpCommonProfile()\` — strict + INTEROP rules as error.
- **Annotations:** \`@IoDispatcher\`, \`@MainDispatcher\`, \`@DefaultDispatcher\` qualifier annotations for KMP-safe dispatcher injection.
- **IntelliJ plugin \`0.8.0-ALPHA01\`:** 7 new inspections, 5 new quick fixes; \`ConvertToRunTestIntention\` extended for TEST_004.
- **Best practices:** New sections §6.4, §9.5, §9.6, §10.1, §10.2, §11.1; §1.5 and §8.3 referenced in rule codes.
- **Requirements:** Kotlin 2.3.0+ (recommended 2.3.20), kotlinx-coroutines 1.10.x.

## v0.6.0

- **Gradle — \`structuredCoroutinesReport\`:** Cacheable **reporting**-group task that writes **self-contained HTML** and **plain-text** reports under \`build/reports/structured-coroutines/\` (defaults): project metadata, severity counts, all **12** compiler rules with links into the best-practices guide, and configured exclusions. New DSL: \`reportOutputDir\`, \`reportFormat\` (\`"html"\` | \`"text"\` | \`"all"\`). Plugin \`VERSION\` and published coordinates aligned to **0.6.0**. The main repository adds a maintainer CI guide with a full **GitHub Actions** example (\`compileKotlin\`, \`structuredCoroutinesReport\`, Detekt with SARIF, Lint, artifact upload, optional PR comment).
- **IntelliJ — Project-wide scan:** **Analyze → Scan Project for Coroutine Issues** and tool-window **Scan Project** button run every inspection across Kotlin sources (content roots; skips typical \`build\`/\`.gradle\`/generated paths) on a **background** thread with **progress** and **cancellation**; results aggregate in the tool window; **double-click** navigates to the source. Panel registry uses a per-project weak map so the action does not leak \`Project\` instances.
- **Detekt & IntelliJ — Import guard:** \`CoroutinesImportFilter\` ensures **no rule or inspection runs** on files that do not import \`kotlinx.coroutines\`, eliminating many false positives from name collisions (e.g. Android \`ActivityScenario.launch\`). **SuspendInFinally** (IDE) drops the old name blocklist and uses **suspend-call resolution**; **ScopeAnalyzer** now resolves **primary constructor** parameters annotated with \`@property:StructuredScope\`.
- **No new rule codes** in 0.6.0; rule counts remain compiler **12**, Detekt **19**, Lint **21**, IntelliJ **15**.

## v0.5.0

- **IntelliJ — Tool window "What to do":** Each of the **15 inspections** now has a short action summary ("What to do") and a **"See guide"** link to the relevant section in the best-practices guide. Table columns: Severity | Location | Inspection | What to do; detail bar shows full text and inline "See guide →" link.
- **Decision Guide:** \`DECISION_GUIDE.md\` published with 10 decision sections (tables and trees): launch vs async, which scope to use, viewModelScope vs lifecycleScope, runTest vs runBlocking, which Dispatcher, error handling, cancel vs cancelChildren, loops and cooperation points, withTimeout vs withTimeoutOrNull, cold vs hot Flow. Each section includes ✅/❌ code examples.
- **Detekt — 19 rules:** New **WithTimeoutScopeCancellation** (CANCEL_006): heuristic warning when \`withTimeout\` is not wrapped in try/catch handling \`TimeoutCancellationException\` (or parent). Suppress with \`@Suppress("WithTimeoutScopeCancellation")\` when scope cancellation is intentional.
- **IntelliJ — 15 inspections:** New **WithTimeoutScopeCancellationInspection** with quick fix **Replace with withTimeoutOrNull**. AsyncWithoutAwait description extended with §5.3 EXCEPT_003 (exceptions in \`async\` deferred until \`await()\`; not sent to CoroutineExceptionHandler).
- **Kotlin Coroutines Skill v2.0.0:** 13 new reference files (e.g. §1.4 awaitAll, §3.2 main-safe suspend, §4.6–4.7 withTimeout, §5.3 exception handler vs async, §6.3 setMain/resetMain, §8.2 lifecycle Flow, §9.1–9.4 Flow). **32 practices**, **34 triage entries**, **32 reference files**. SKILL.md and CONFIG.json version aligned to 2.0.0.

## v0.4.0

- **Compiler — LoopWithoutYield (CANCEL_001):** New \`LOOP_WITHOUT_YIELD\` warning for loops in suspend functions without cooperation points (yield, ensureActive, delay). Configurable via Gradle \`loopWithoutYield\`.
- **Detekt — 18 rules:** Added **ChannelNotClosed** (CHANNEL_001), **ConsumeEachMultipleConsumers** (CHANNEL_002), **FlowBlockingCall** (FLOW_001). Channel rules recommend \`produce { }\` or \`for (x in channel)\`; Flow rule reports blocking calls inside \`flow { }\` with link to FLOW_001.
- **Android Lint — 21 issues:** Same channel and Flow rules plus **LifecycleAwareFlowCollection** (ARCH_002): Flow collection in \`lifecycleScope.launch\` without \`repeatOnLifecycle\`/\`flowWithLifecycle\`.
- **IntelliJ — 14 inspections, 6 intentions:** New **LoopWithoutYieldInspection** with quick fixes (ensureActive, yield, delay(0)); **LifecycleAwareFlowCollectionInspection**; **Convert to runTest** intention (TEST_001). **ChangeSuperclassToExceptionQuickFix** for CancellationException subclass. ScopeReuseAfterCancel messages aligned with CANCEL_005 and doc link.
- **Improvements:** SCOPE_002 (UnusedDeferred/AsyncWithoutAwait) no longer triggers when Deferred is used in \`awaitAll\`. RUNBLOCK_001 (RedundantLaunchInCoroutineScope) no longer triggers when the single \`launch\` is inside \`forEach\`/for/while.

## v0.3.0

- **Gradle Plugin — Profiles:** \`useStrictProfile()\`, \`useGradualProfile()\`, \`useRelaxedProfile()\` to apply presets (strict: 7 error, 4 warning; gradual/relaxed: all 11 rules as warning for migration).
- **Gradle Plugin — Exclusions:** \`excludeSourceSets("legacyMain", "test")\` and \`excludeProjects(":legacy-module")\` to disable the compiler plugin for specific compilations or projects.
- **Documentation — Gradual adoption guide:** Step-by-step path (relaxed → gradual → strict), excluding legacy code, suppression best practices.
- **Detekt Rules — 15 rules:** Full parity with compiler plugin (10 rules) plus Detekt-only: BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield, **ScopeReuseAfterCancel**. Full \`detekt.yml\` snippet in docs.
- **Android Lint — 17 issues:** All compiler-parity rules, Android-specific (MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope), and ScopeReuseAfterCancel.
- **IntelliJ Plugin — 12 inspections,** 9 quick fixes, 5 intentions; tool window and line markers; **CancellationExceptionSubclass** inspection added.
- **New module: sample-detekt** — Validates Detekt rules (15 example files, \`./gradlew :sample-detekt:detekt\` for 15 findings).

## v0.1.0

- K2/FIR Compiler Plugin with 11 rules (7 error, 4 warning).
- Gradle Plugin with configurable severity and KMP support.
- Annotations artifact (multiplatform) for \`@StructuredScope\`.
- Detekt ruleset (9 rules) for CI and multiplatform.
- Android Lint rules (17 rules) including MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.
- IntelliJ/Android Studio plugin: 11 inspections, 9 quick fixes, 5 intentions, gutter icons, tool window; K2 compatible.
`
};
