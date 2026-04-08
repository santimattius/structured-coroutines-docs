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
    description: "19 CI-friendly rules with import-based guards so only Kotlin files that use kotlinx.coroutines are analyzed—fewer false positives.",
    icon: "verified_user",
    path: "/docs/detekt-rules"
  },
  {
    title: "Gradle Plugin",
    description: "Compiler plugin integration, profiles, exclusions, and the cacheable structuredCoroutinesReport task for HTML/text CI configuration audits.",
    icon: "build_circle",
    path: "/docs/gradle-plugin"
  },
  {
    title: "Lint Rules",
    description: "Real-time feedback directly in Android Studio. Fix issues as you type with quick-fixes.",
    icon: "visibility",
    path: "/docs/lint-rules"
  },
  {
    title: "IntelliJ Plugin",
    description: "Real-time inspections, tool window, project-wide scan (Analyze → Scan Project for Coroutine Issues), quick fixes, and gutter icons.",
    icon: "extension",
    path: "/docs/intellij-plugin"
  },
  {
    title: "Compiler Plugin",
    description: "K2/FIR Compiler Plugin with 12 rules. Enforces structured concurrency at compile time (7 errors, 5 warnings).",
    icon: "memory",
    path: "/docs/compiler"
  },
  {
    title: "Kotlin Coroutines Skill",
    description: "Agent Skill v2.0.0 for AI coding tools. 32 practices, strict rules, triage playbook — scopes, dispatchers, cancellation, testing, Flow, Android lifecycle.",
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
  { feature: "Quick Fixes / Auto-Correction", compiler: "none", detekt: "none", lint: "check", ide: "check" },
];

export const DOCS_CONTENT: Record<string, string> = {
  "introduction": `
# Introduction

**Structured Coroutines** is a comprehensive toolkit for enforcing **structured concurrency** in Kotlin Coroutines, inspired by Swift Concurrency. It provides multiple layers of protection through compile-time checks and static analysis.

[![Kotlin 2.3.0](https://img.shields.io/badge/Kotlin-2.3.0-blue.svg)](https://kotlinlang.org) [![Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://github.com/santimattius/structured-coroutines/blob/main/LICENSE) [![Multiplatform](https://img.shields.io/badge/Multiplatform-Supported-orange.svg)](https://kotlinlang.org/docs/multiplatform.html)

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
2. **Detekt Rules** — Static analysis warnings
3. **Android Lint Rules** — Android-specific static analysis with quick fixes
4. **IntelliJ/Android Studio Plugin** — Real-time IDE analysis, quick fixes, and tool window
5. **Kotlin Coroutines Skill** — Agent Skill for AI tools (Claude, ChatGPT, Cursor) for consistent code review and refactoring advice

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
| \`RUNBLOCK_001\` | Redundant launch on last line of coroutineScope |
| \`RUNBLOCK_002\` | Using runBlocking inside suspend functions |
| \`DISPATCH_001\` | Blocking code on wrong dispatchers |
| \`DISPATCH_002\` | Main-safe suspend functions |
| \`DISPATCH_003\` | Abusing Dispatchers.Unconfined |
| \`DISPATCH_004\` | Passing Job() directly to builders |
| \`DISPATCH_005\` | Injecting Dispatchers for testability |
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
| \`CHANNEL_001\` | Forgetting to close manual channels |
| \`CHANNEL_002\` | Sharing consumeEach among multiple consumers |
| \`ARCH_001\` | General architecture recommendations |
| \`ARCH_002\` | Lifecycle-aware Flow collection (Android) |
| \`FLOW_001\` | Blocking code in flow { } builder |
| \`FLOW_002\` | Cold vs hot flows (StateFlow / SharedFlow) |
| \`FLOW_003\` | collectLatest cancels previous work |
| \`FLOW_004\` | SharedFlow configuration |

## Key Practices by Category

**1. Scopes and builders:** Use framework or injected scopes; avoid \`GlobalScope\`. Use \`async\` only when you need a return value; otherwise use \`launch\`. Keep structured concurrency: inside suspend functions use \`coroutineScope { }\` + \`launch\`/\`async\`.

**2. runBlocking:** Use only at entry points (main, tests). Never use \`runBlocking\` inside suspend functions; use \`withContext(Dispatchers.IO)\` for blocking work.

**3. Dispatchers:** Use \`Dispatchers.Default\` for CPU-bound work, \`Dispatchers.Main\` for UI, \`withContext(Dispatchers.IO)\` for blocking I/O. Avoid \`Dispatchers.Unconfined\` in production. Do not pass \`Job()\` or \`SupervisorJob()\` to builders; use \`supervisorScope { }\` or a scope with \`SupervisorJob\`.

**4. Cancellation:** Add cooperation points (\`yield()\`, \`ensureActive()\`, \`delay()\`) in long loops. Never swallow \`CancellationException\` in catch blocks. For suspend calls in \`finally\`, use \`withContext(NonCancellable) { }\`. Do not reuse a scope after \`scope.cancel()\`; use \`cancelChildren()\` if you need to keep the scope.

**5. Exceptions:** Use \`SupervisorJob\` at scope level or \`supervisorScope { }\`, not as an argument to a single builder. Use normal \`Exception\`/ \`RuntimeException\` for domain errors, not \`CancellationException\`.

**6. Testing:** Use \`runTest\`, virtual time, and \`TestDispatcher\`; avoid real \`delay()\` with \`runBlocking\`.

**7. Channels:** Prefer \`produce { }\`; if using manual \`Channel\`, define when \`close()\` is called. Do not share \`consumeEach\` across multiple consumers.

**8. Architecture (Android):** Collect Flow with \`repeatOnLifecycle(Lifecycle.State.STARTED)\` or \`flowWithLifecycle\`.

**9. Flow:** Do not perform blocking calls inside \`flow { }\`; use \`flowOn(Dispatchers.IO)\` or suspend APIs. Use StateFlow for state and SharedFlow for events with appropriate replay/buffer.

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
- Tests use \`runTest\` and virtual time
- Channels closed; \`consumeEach\` single consumer only
- (Android) Flow collection with \`repeatOnLifecycle(STARTED)\`

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

**Enable without breaking the build:**

\`\`\`kotlin
plugins {
    kotlin("jvm") version "2.3.0"
    id("io.github.santimattius.structured-coroutines") version "0.6.0"
}
structuredCoroutines {
    useGradualProfile()  // All warnings; no build failure
}
\`\`\`

**Move to strict when ready:**

\`\`\`kotlin
structuredCoroutines {
    useStrictProfile()   // 7 rules error, 5 warning; violations block the build
}
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

See [Gradle Plugin](/docs/gradle-plugin) for full configuration (profiles and exclusions).
`,
  "rules-overview": `
# Rules Overview

This page summarizes all rules provided by the Structured Coroutines toolkit. For installation and configuration, see each module's documentation.

## Compiler Plugin (Compile-time)

**Errors (block compilation):** \`GLOBAL_SCOPE_USAGE\`, \`INLINE_COROUTINE_SCOPE\`, \`UNSTRUCTURED_COROUTINE_LAUNCH\`, \`RUN_BLOCKING_IN_SUSPEND\`, \`JOB_IN_BUILDER_CONTEXT\`, \`CANCELLATION_EXCEPTION_SUBCLASS\`, \`UNUSED_DEFERRED\`.

**Warnings (allow compilation):** \`DISPATCHERS_UNCONFINED_USAGE\`, \`SUSPEND_IN_FINALLY_WITHOUT_NON_CANCELLABLE\`, \`CANCELLATION_EXCEPTION_SWALLOWED\`, \`REDUNDANT_LAUNCH_IN_COROUTINE_SCOPE\`, \`LOOP_WITHOUT_YIELD\` (CANCEL_001; configurable via Gradle \`loopWithoutYield\`).

**Total: 12 rules** (7 errors, 5 warnings). Configured via [Gradle Plugin](/docs/gradle-plugin).

## Gradle Plugin — Configuration report (CI)

From **v0.6.0**, the cacheable \`structuredCoroutinesReport\` task (Gradle group **reporting**) writes HTML and/or plain-text reports of the active compiler-plugin configuration under \`build/reports/structured-coroutines/\` by default: project name, plugin version, severity counts, a per-rule table with codes (\`SCOPE_001\`, etc.) and links into [Best Practices](/docs/best-practices), plus exclusion details when configured. Use \`reportOutputDir\` and \`reportFormat\` (\`"html"\`, \`"text"\`, or \`"all"\`). See [Gradle Plugin](/docs/gradle-plugin).

## Detekt Rules (Static Analysis)

**Compiler Plugin parity (10):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, CancellationExceptionSwallowed, JobInBuilderContext, RedundantLaunchInCoroutineScope, SuspendInFinally, UnusedDeferred.

**Detekt-only (9):** BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield, ScopeReuseAfterCancel, **ChannelNotClosed** (CHANNEL_001), **ConsumeEachMultipleConsumers** (CHANNEL_002), **FlowBlockingCall** (FLOW_001), **WithTimeoutScopeCancellation** (CANCEL_006).

**Total: 19 rules.** All rules apply an **import guard**: files without a \`kotlinx.coroutines\` import are skipped, avoiding false positives from unrelated \`launch\`/\`async\` names. See [Detekt Rules](/docs/detekt-rules).

## Android Lint Rules (Static Analysis)

**Compiler Plugin rules (9):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait.

**Android-specific (3):** MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.

**Additional (9):** UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel, **ChannelNotClosed** (CHANNEL_001), **ConsumeEachMultipleConsumers** (CHANNEL_002), **FlowBlockingCall** (FLOW_001), **LifecycleAwareFlowCollection** (ARCH_002).

**Total: 21 issues.** See [Lint Rules](/docs/lint-rules).

## IntelliJ/Android Studio Plugin (Real-time)

**15 inspections** (including LoopWithoutYield, LifecycleAwareFlowCollection, WithTimeoutScopeCancellation), **quick fixes**, **6 intentions** (including **Convert to runTest** for TEST_001), **gutter icons**, and the **Structured Coroutines tool window**—including **Scan Project for Coroutine Issues** (Analyze menu and tool window toolbar) for aggregated results across Kotlin sources with progress and cancellation. Inspections use the same **import guard** as Detekt. See [IntelliJ Plugin](/docs/intellij-plugin).

## Comparison

| Approach | When | Errors | Warnings | CI | Real-time |
|----------|------|--------|----------|-----|-----------|
| Compiler Plugin | Compile | ✅ 7 | ✅ 5 | ✅ | ❌ |
| Detekt Rules | Analysis | — | ✅ 19 | ✅ | ❌ |
| Android Lint | Analysis | — | ✅ 21 | ✅ | ❌ |
| IDE Plugin | Editing | — | ✅ 15 | ❌ | ✅ |
| Gradle report | CI / local | — | — | ✅ | ❌ |

For adoption in existing projects without breaking the build, see [Gradual Adoption](/docs/gradual-adoption). For rule codes and a full checklist, see [Best Practices](/docs/best-practices).
`,
  "annotations": `
# Annotations

Multiplatform annotations for marking structured coroutine scopes. The \`@StructuredScope\` annotation makes scope boundaries explicit and is recognized by the **Compiler Plugin**, **Detekt**, **Lint**, and **IntelliJ plugin**.

## Installation

\`\`\`kotlin
// build.gradle.kts
dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:0.6.0")
}

// Kotlin Multiplatform (commonMain)
kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation("io.github.santimattius:structured-coroutines-annotations:0.6.0")
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

## Supported Platforms

JVM, JS, iOS, macOS, watchOS, tvOS, Linux, Windows, WASM. Use the \`annotations\` multiplatform artifact; the Gradle plugin resolves the correct variant per target.
`,
  "detekt-rules": `
# Detekt Rules

Custom Detekt rules for enforcing structured concurrency in Kotlin Coroutines. **Total: 19 rules** (10 compiler-plugin parity + 9 Detekt-only). Use for multiplatform projects and CI/CD.

From **v0.6.0**, every rule applies an **import guard** (\`CoroutinesImportFilter\`): if a \`.kt\` file has no import starting with \`kotlinx.coroutines\`, the rule returns immediately. That cuts false positives when unrelated APIs reuse names like \`launch\`, \`async\`, or \`Dispatchers\` (for example Android instrumented tests using \`ActivityScenario.launch\`).

## Installation

\`\`\`kotlin
plugins {
    id("io.gitlab.arturbosch.detekt") version "1.23.7"
}
dependencies {
    detektPlugins("io.github.santimattius:structured-coroutines-detekt-rules:0.6.0")
}
\`\`\`

## Rules Overview

**Compiler Plugin parity (10):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, CancellationExceptionSwallowed, JobInBuilderContext, RedundantLaunchInCoroutineScope, SuspendInFinally, UnusedDeferred.

**Detekt-only (9):** BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield, ScopeReuseAfterCancel, **ChannelNotClosed** (CHANNEL_001), **ConsumeEachMultipleConsumers** (CHANNEL_002), **FlowBlockingCall** (FLOW_001), **WithTimeoutScopeCancellation** (CANCEL_006).

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
| WithTimeoutScopeCancellation | Detekt-Only | \`withTimeout\` without try/catch for \`TimeoutCancellationException\` (CANCEL_006); heuristic; suppress when intentional |

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

## Inspections (15)

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
| **LoopWithoutYield** | WARNING | Loops in suspend without cooperation points (CANCEL_001); quick fixes: ensureActive, yield, delay(0) |
| **LifecycleAwareFlowCollection** | WARNING | Flow collection in \`lifecycleScope.launch\` without \`repeatOnLifecycle\`/\`flowWithLifecycle\` (ARCH_002) |
| **WithTimeoutScopeCancellation** | WARNING | \`withTimeout\` without try/catch for timeout/cancellation (CANCEL_006); quick fix: replace with \`withTimeoutOrNull\` |

## Structured Coroutines Tool Window

**View → Tool Windows → Structured Coroutines.** Lists findings for the **current file** (refresh) and, after **Scan Project**, **all issues** collected from the project scan. Columns: Severity | Location | Inspection | **What to do** (action summary per finding). Detail bar shows full "What to do" text and **"See guide →"** link to the best-practices guide. Use **Refresh** for the open file; use **Scan Project** for a full-repo pass; **double-click** a row to jump to the issue. Correctly recognizes \`@StructuredScope\` on parameters, properties, and **primary constructor parameters** (\`@property:StructuredScope\`).

## Quick Fixes

Replace with viewModelScope/lifecycleScope/coroutineScope; wrap with Dispatchers.IO; **replace cancel with cancelChildren** (ScopeReuseAfterCancel); remove runBlocking; add await / convert to launch; wrap with NonCancellable; add CancellationException handling; supervisorScope for Job in builder; **add cooperation point in loop** (ensureActive, yield, delay(0)); **change superclass to Exception** (CancellationException subclass); **replace with withTimeoutOrNull** (WithTimeoutScopeCancellation, CANCEL_006).

## Intentions (6)

Migrate to viewModelScope/lifecycleScope; wrap with coroutineScope; convert launch to async; extract suspend function; **Convert to runTest** (runBlocking + delay in tests → runTest, TEST_001).

## Gutter Icons

Scope type (viewModelScope, lifecycleScope, GlobalScope, etc.) and dispatcher context (Main, IO, Default, Unconfined).

## Compatibility

- IntelliJ IDEA 2024.3+ / Android Studio Ladybug+
- K1 and K2 mode supported
`,
  "gradle-plugin": `
# Gradle Plugin

Integrates the Structured Coroutines **K2/FIR Compiler Plugin** so you can enforce structured concurrency at compile time. **12 rules** (7 errors, 5 warnings) are configurable. From **v0.3.0** you can use **profiles** and **exclude** source sets or projects; from **v0.4.0** the **LoopWithoutYield** (CANCEL_001) checker can be enabled/disabled via \`loopWithoutYield\`. From **v0.6.0**, the **structuredCoroutinesReport** task generates **HTML** and/or **plain-text** configuration reports for CI and audits.

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
    id("io.github.santimattius.structured-coroutines") version "0.6.0"
}

dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:0.6.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")
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

The HTML report is **self-contained** (no external CSS/JS). Content includes project name, plugin version, timestamp, error/warning counts, a table of all **12** compiler rules with severities and anchors into the best-practices guide, and **exclusions** when \`excludeSourceSets\` / \`excludeProjects\` are set.

\`\`\`kotlin
structuredCoroutines {
    reportFormat.set("html")   // "html" | "text" | "all"
    reportOutputDir.set(layout.buildDirectory.dir("reports/coroutines"))
}
\`\`\`

Pair this with \`compileKotlin\`, Detekt, and Lint in CI; archive reports as artifacts or post the text summary in PR comments. The upstream repo ships an internal CI reference (\`docs-local/CI_INTEGRATION.md\`) with a sample GitHub Actions workflow.

## Profiles (strict / gradual / relaxed)

Apply a preset with one line:

\`\`\`kotlin
structuredCoroutines {
    useStrictProfile()   // Default: 7 error, 5 warning (greenfield)
    // useGradualProfile()  // All 12 rules warning (migration)
    // useRelaxedProfile()   // Same as gradual
}
\`\`\`

| Profile | When to use | Effect |
|---------|--------------|--------|
| **Strict** | New projects or fail build on violations | 7 rules → error, 5 → warning |
| **Gradual** / **Relaxed** | Migrating; build must not fail | All **12** rules → **warning** |

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
}
\`\`\`

## Rules Summary

| Severity | Count | Examples |
|----------|-------|----------|
| Error (default) | 7 | GlobalScope, inline scope, unstructured launch, runBlocking in suspend, Job() in builders, CancellationException subclass, async without await |
| Warning (default) | 5 | Dispatchers.Unconfined, suspend in finally, CancellationException swallowed, redundant launch in coroutineScope, **loop without yield** (CANCEL_001) |

Supports **JVM** and **Kotlin Multiplatform**. For KMP, apply \`kotlin(\"multiplatform\")\` and add annotations in \`commonMain\`. See [gradle-plugin/README.md](https://github.com/santimattius/structured-coroutines/blob/main/gradle-plugin/README.md) for KMP setup and troubleshooting.
`,
  "lint-rules": `
# Android Lint Rules

Custom Android Lint rules for structured concurrency and **Android-specific** detection. **Total: 21 issues** (9 from Compiler Plugin + 3 Android-specific + 9 additional). Run with \`./gradlew lint\`; integrate with Android Studio for real-time feedback and quick fixes.

## Installation

\`\`\`kotlin
// build.gradle.kts (Android module)
dependencies {
    lintChecks("io.github.santimattius:structured-coroutines-lint-rules:0.6.0")
}
\`\`\`

**Note:** Android Lint is Android-only. For multiplatform, use the [Compiler Plugin](/docs/compiler) or [Detekt Rules](/docs/detekt-rules).

## Rules Overview

| Category | Count | Examples |
|----------|-------|----------|
| Compiler Plugin | 9 | GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait |
| Android-Specific | 3 | **MainDispatcherMisuse** (blocking on Main → ANRs), **ViewModelScopeLeak**, **LifecycleAwareScope** |
| Additional | 9 | UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel, **ChannelNotClosed** (CHANNEL_001), **ConsumeEachMultipleConsumers** (CHANNEL_002), **FlowBlockingCall** (FLOW_001), **LifecycleAwareFlowCollection** (ARCH_002) |

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

The **K2/FIR Kotlin Compiler Plugin** enforces structured concurrency at compile time. **12 rules** (7 errors, 5 warnings). Severity is configured via the [Gradle Plugin](/docs/gradle-plugin).

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

## Checkers (12 Rules)

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

## Requirements

- Kotlin 2.3.0+ (K2)
- Gradle 8.0+

The **sample** project includes a \`compilation\` package with one example per compiler rule (7 errors, 5 warnings) for testing. See [compiler/README.md](https://github.com/santimattius/structured-coroutines/blob/main/compiler/README.md).
`,
  "kotlin-coroutines-skill": `
# Kotlin Coroutines Skill

Expert guidance for **any AI coding tool** that supports Agent Skills or custom instructions — **safe structured concurrency**, performance, and Kotlin 1.9/2.0+ best practices for Coroutines. **v2.0.0** includes **32 practices**, **34 triage entries**, and **32 reference files** (including §1.4 awaitAll, §3.2 main-safe suspend, §4.6–4.7 withTimeout, §5.3 exception handler vs async, §6.3 setMain/resetMain, §8.2 lifecycle Flow, §9.1–9.4 Flow).

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
| **SKILL.md** | Triage playbook including the full **Agent Behavior Contract**: identity, strict rules, tone, output format (analysis → erroneous code → optimized code → explanation), and triage table (topic/error → reference file). |
| **references/** | 32 markdown files, one per practice. Each has Bad / Recommended / Why / Quick fix. |

**References by section:**

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
| 7.1 | Channel not closed |
| 7.2 | consumeEach with multiple consumers |
| 8 | Architecture patterns |

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

Full agent contract, rules, and triage live in **SKILL.md**; per-practice detail is in \`references/\`. Repository: [kotlin-coroutines-skill](https://github.com/santimattius/structured-coroutines/tree/main/kotlin-coroutines-skill).
`,
  "api": `
# API Reference

Key artifacts and documentation are maintained in the repository:

| Artifact | Description |
|----------|-------------|
| \`io.github.santimattius:structured-coroutines-annotations\` | \`@StructuredScope\`, multiplatform |
| \`io.github.santimattius:structured-coroutines-compiler\` | K2/FIR compiler plugin |
| \`io.github.santimattius.structured-coroutines\` (Gradle) | Gradle plugin |
| \`io.github.santimattius:structured-coroutines-detekt-rules\` | Detekt rules (19) |
| \`io.github.santimattius:structured-coroutines-lint-rules\` | Android Lint rules (21) |

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
