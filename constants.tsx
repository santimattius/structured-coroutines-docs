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
      { title: "Annotations", path: "annotations", icon: "tag" },
      { title: "Detekt Rules", path: "detekt-rules", icon: "verified_user" },
      { title: "IntelliJ Plugin", path: "intellij-plugin", icon: "extension" },
      { title: "Gradle Plugin", path: "gradle-plugin", icon: "build_circle" },
      { title: "Lint Rules", path: "lint-rules", icon: "visibility" },
      { title: "Compiler Plugin", path: "compiler", icon: "memory" },
    ]
  },
  {
    section: "REFERENCE",
    items: [
      { title: "Kotlin Coroutines Skill", path: "kotlin-coroutines-skill", icon: "smart_toy" },
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
    description: "Static analysis for your CI/CD pipeline. Catch common concurrency pitfalls before merge.",
    icon: "verified_user",
    path: "/docs/detekt-rules"
  },
  {
    title: "Gradle Plugin",
    description: "Easy project integration and configuration. Zero-config setup for standard Android projects.",
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
    description: "Enhanced IDE support, gutter icons for scopes, and visual debugging aids.",
    icon: "extension",
    path: "/docs/intellij-plugin"
  },
  {
    title: "Compiler Plugin",
    description: "K2/FIR Compiler Plugin with 11 rules. Enforces structured concurrency at compile time (7 errors, 4 warnings).",
    icon: "memory",
    path: "/docs/compiler"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: "GlobalScope Usage", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "RunBlocking in Suspend", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Unstructured Launch", compiler: "check", detekt: "check", lint: "check", ide: "check" },
  { feature: "Job/SupervisorJob in Builders", compiler: "check", detekt: "none", lint: "check", ide: "check" },
  { feature: "Async without Await", compiler: "check", detekt: "none", lint: "check", ide: "check" },
  { feature: "Dispatchers.Unconfined", compiler: "warning", detekt: "warning", lint: "warning", ide: "warning" },
  { feature: "MainDispatcherMisuse (Android)", compiler: "none", detekt: "none", lint: "check", ide: "check" },
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

## Toolkit Components

| Module | Purpose | When |
|--------|---------|------|
| \`compiler\` | K2/FIR Compiler Plugin | Compile-time errors |
| \`detekt-rules\` | Detekt custom rules | Static analysis |
| \`lint-rules\` | Android Lint rules | Android projects |
| \`intellij-plugin\` | IntelliJ/Android Studio Plugin | Real-time IDE analysis |
| \`annotations\` | \`@StructuredScope\` annotation | Runtime/Compile |
| \`gradle-plugin\` | Gradle integration | Build configuration |

## Getting Started

1. Read [Core Concepts](/docs/core-concepts) for structured concurrency best practices.
2. Follow [Gradle Plugin](/docs/gradle-plugin) for installation (Compiler Plugin + annotations).
3. Use [Annotations](/docs/annotations) to mark scopes with \`@StructuredScope\` where needed.
4. Optionally add [Detekt Rules](/docs/detekt-rules), [Lint Rules](/docs/lint-rules) (Android), and the [IntelliJ Plugin](/docs/intellij-plugin) for full coverage.

For a high-level view of all rules, see [Rules Overview](/docs/rules-overview).
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

The compiler and IDE plugins automatically recognize: \`viewModelScope\`, \`lifecycleScope\`, \`rememberCoroutineScope()\` (see [Annotations](/docs/annotations)). For the full checklist, see the repository's \`docs/BEST_PRACTICES_COROUTINES.md\` and the [Kotlin Coroutines Skill](/docs/kotlin-coroutines-skill).
`,
  "rules-overview": `
# Rules Overview

This page summarizes all rules provided by the Structured Coroutines toolkit. For installation and configuration, see each module's documentation.

## Compiler Plugin (Compile-time)

**Errors (block compilation):** \`GLOBAL_SCOPE_USAGE\`, \`INLINE_COROUTINE_SCOPE\`, \`UNSTRUCTURED_COROUTINE_LAUNCH\`, \`RUN_BLOCKING_IN_SUSPEND\`, \`JOB_IN_BUILDER_CONTEXT\`, \`CANCELLATION_EXCEPTION_SUBCLASS\`, \`UNUSED_DEFERRED\`.

**Warnings (allow compilation):** \`DISPATCHERS_UNCONFINED_USAGE\`, \`SUSPEND_IN_FINALLY_WITHOUT_NON_CANCELLABLE\`, \`CANCELLATION_EXCEPTION_SWALLOWED\`, \`REDUNDANT_LAUNCH_IN_COROUTINE_SCOPE\`.

**Total: 11 rules** (7 errors, 4 warnings). Configured via [Gradle Plugin](/docs/gradle-plugin).

## Detekt Rules (Static Analysis)

**Compiler Plugin rules (5):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass.

**Detekt-only rules (4):** BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield.

**Total: 9 rules.** See [Detekt Rules](/docs/detekt-rules).

## Android Lint Rules (Static Analysis)

**Compiler Plugin rules (9):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait.

**Android-specific (3):** MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.

**Additional (5):** UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel.

**Total: 17 rules.** See [Lint Rules](/docs/lint-rules).

## IntelliJ/Android Studio Plugin (Real-time)

**11 inspections** (4 error, 7 warning), **9 quick fixes**, **5 intentions**, **gutter icons** (scope type and dispatcher context), and the **Structured Coroutines tool window** (View → Tool Windows → Structured Coroutines). See [IntelliJ Plugin](/docs/intellij-plugin).

## Comparison

| Approach | When | Errors | Warnings | CI | Real-time |
|----------|------|--------|----------|-----|-----------|
| Compiler Plugin | Compile | ✅ 7 | ✅ 4 | ✅ | ❌ |
| Detekt Rules | Analysis | ✅ 3 | ✅ 6 | ✅ | ❌ |
| Android Lint | Analysis | ✅ 9 | ✅ 8 | ✅ | ❌ |
| IDE Plugin | Editing | ✅ 4 | ✅ 7 | ❌ | ✅ |
`,
  "annotations": `
# Annotations

Multiplatform annotations for marking structured coroutine scopes. The \`@StructuredScope\` annotation makes scope boundaries explicit and is recognized by the **Compiler Plugin**, **Detekt**, **Lint**, and **IntelliJ plugin**.

## Installation

\`\`\`kotlin
// build.gradle.kts
dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:0.1.0")
}

// Kotlin Multiplatform (commonMain)
kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation("io.github.santimattius:structured-coroutines-annotations:0.1.0")
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

The compiler plugin and IntelliJ plugin both recognize \`@StructuredScope\` on **function parameters** and **class properties**. For example, \`fun foo(@StructuredScope scope: CoroutineScope) { scope.launch { } }\` is not reported as an unstructured launch. The IDE resolves the scope to the parameter or property and checks for the annotation.

## Framework Scopes (Auto-recognized)

No annotation needed for: \`viewModelScope\` (Android ViewModel), \`lifecycleScope\` (Android Lifecycle), \`rememberCoroutineScope()\` (Jetpack Compose).

## Supported Platforms

JVM, JS, iOS, macOS, watchOS, tvOS, Linux, Windows, WASM. Use the \`annotations\` multiplatform artifact; the Gradle plugin resolves the correct variant per target.
`,
  "detekt-rules": `
# Detekt Rules

Custom Detekt rules for enforcing structured concurrency in Kotlin Coroutines. **Total: 9 rules** (5 from Compiler Plugin + 4 Detekt-only). Use for multiplatform projects and CI/CD.

## Installation

\`\`\`kotlin
plugins {
    id("io.gitlab.arturbosch.detekt") version "1.23.7"
}
dependencies {
    detektPlugins("io.github.santimattius:structured-coroutines-detekt-rules:0.1.0")
}
\`\`\`

## Rules Overview

**Compiler Plugin rules (5):** GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass.

**Detekt-only rules (4):** BlockingCallInCoroutine (JVM; exclude commonMain/iosMain if needed), RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield.

| Rule | Category | Description |
|------|----------|-------------|
| GlobalScopeUsage | Compiler Plugin | \`GlobalScope.launch/async\` |
| InlineCoroutineScope | Compiler Plugin | \`CoroutineScope(...).launch/async\` and property init |
| RunBlockingInSuspend | Compiler Plugin | \`runBlocking\` in suspend |
| DispatchersUnconfined | Compiler Plugin | \`Dispatchers.Unconfined\` |
| CancellationExceptionSubclass | Compiler Plugin | Extending \`CancellationException\` |
| BlockingCallInCoroutine | Detekt-Only | Thread.sleep, JDBC, sync HTTP in coroutines |
| RunBlockingWithDelayInTest | Detekt-Only | \`runBlocking\` + \`delay\` in tests |
| ExternalScopeLaunch | Detekt-Only | Launch on external scope from suspend |
| LoopWithoutYield | Detekt-Only | Loops without cooperation points |

## Configuration

\`\`\`yaml
structured-coroutines:
  GlobalScopeUsage:
    active: true
    severity: error
  InlineCoroutineScope:
    active: true
    severity: error
  BlockingCallInCoroutine:
    active: true
    excludes: ['commonMain', 'iosMain']
\`\`\`

Run: \`./gradlew detekt\`. Full docs: [detekt-rules/README.md](https://github.com/santimattius/structured-coroutines/blob/main/detekt-rules/README.md).
`,
  "intellij-plugin": `
# IntelliJ / Android Studio Plugin

Real-time inspections, quick fixes, intentions, gutter icons, and a **Structured Coroutines tool window** for structured concurrency. Full K1 and K2 Kotlin mode support.

## Installation

- **Marketplace:** Settings/Preferences → Plugins → search "Structured Coroutines" → Install.
- **From disk:** Download ZIP from [Releases](https://github.com/santimattius/structured-coroutines/releases) → Plugins → Install Plugin from Disk.
- **Build locally:** \`./gradlew :intellij-plugin:buildPlugin\` then install the ZIP from \`intellij-plugin/build/distributions/\`. Run sandbox: \`./gradlew :intellij-plugin:runIde\`.

## Inspections (11)

| Inspection | Severity | Description |
|------------|----------|-------------|
| GlobalScopeUsage | ERROR | \`GlobalScope.launch/async\` |
| MainDispatcherMisuse | WARNING | Blocking code on \`Dispatchers.Main\` |
| ScopeReuseAfterCancel | WARNING | Scope cancelled then reused |
| RunBlockingInSuspend | ERROR | \`runBlocking\` in suspend |
| UnstructuredLaunch | WARNING | Launch without structured scope (recognizes \`@StructuredScope\` on params/properties) |
| AsyncWithoutAwait | WARNING | \`async\` without \`await()\` |
| InlineCoroutineScope | ERROR | \`CoroutineScope(...).launch\` |
| JobInBuilderContext | ERROR | \`Job()\`/\`SupervisorJob()\` in builders |
| SuspendInFinally | WARNING | Suspend in finally without NonCancellable |
| CancellationExceptionSwallowed | WARNING | \`catch(Exception)\` swallowing cancellation |
| DispatchersUnconfined | WARNING | \`Dispatchers.Unconfined\` |

## Structured Coroutines Tool Window

**View → Tool Windows → Structured Coroutines.** Lists all findings for the **current file**. Use **Refresh** to run inspections; **double-click** a row to jump to the issue. Correctly recognizes \`@StructuredScope\` on parameters and properties.

## Quick Fixes (9)

Replace with viewModelScope/lifecycleScope/coroutineScope; wrap with Dispatchers.IO; replace cancel with cancelChildren; remove runBlocking; add await / convert to launch; wrap with NonCancellable; add CancellationException handling; supervisorScope for Job in builder.

## Intentions (5)

Migrate to viewModelScope/lifecycleScope; wrap with coroutineScope; convert launch to async; extract suspend function.

## Gutter Icons

Scope type (viewModelScope, lifecycleScope, GlobalScope, etc.) and dispatcher context (Main, IO, Default, Unconfined).

## Compatibility

- IntelliJ IDEA 2024.3+ / Android Studio Ladybug+
- K1 and K2 mode supported
`,
  "gradle-plugin": `
# Gradle Plugin

Integrates the Structured Coroutines **K2/FIR Compiler Plugin** so you can enforce structured concurrency at compile time. All **11 rules** are configurable as \`error\` or \`warning\`.

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
    id("io.github.santimattius.structured-coroutines") version "0.1.0"
}

dependencies {
    implementation("io.github.santimattius:structured-coroutines-annotations:0.1.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")
}
\`\`\`

## Configuration

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
}
\`\`\`

## Rules Summary

| Severity | Count | Examples |
|----------|-------|----------|
| Error (default) | 7 | GlobalScope, inline scope, unstructured launch, runBlocking in suspend, Job() in builders, CancellationException subclass, async without await |
| Warning (default) | 4 | Dispatchers.Unconfined, suspend in finally, CancellationException swallowed, redundant launch in coroutineScope |

Supports **JVM** and **Kotlin Multiplatform**. For KMP, apply \`kotlin(\"multiplatform\")\` and add annotations in \`commonMain\`. See [gradle-plugin/README.md](https://github.com/santimattius/structured-coroutines/blob/main/gradle-plugin/README.md) for KMP setup and troubleshooting.
`,
  "lint-rules": `
# Android Lint Rules

Custom Android Lint rules for structured concurrency and **Android-specific** detection. **Total: 17 rules** (9 from Compiler Plugin + 3 Android-specific + 5 additional). Run with \`./gradlew lint\`; integrate with Android Studio for real-time feedback and quick fixes.

## Installation

\`\`\`kotlin
// build.gradle.kts (Android module)
dependencies {
    lintChecks("io.github.santimattius:structured-coroutines-lint-rules:0.1.0")
}
\`\`\`

**Note:** Android Lint is Android-only. For multiplatform, use the [Compiler Plugin](/docs/compiler) or [Detekt Rules](/docs/detekt-rules).

## Rules Overview

| Category | Count | Examples |
|----------|-------|----------|
| Compiler Plugin | 9 | GlobalScopeUsage, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait |
| Android-Specific | 3 | **MainDispatcherMisuse** (blocking on Main → ANRs), **ViewModelScopeLeak**, **LifecycleAwareScope** |
| Additional | 5 | UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel |

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

The **K2/FIR Kotlin Compiler Plugin** enforces structured concurrency at compile time. **11 rules** (7 errors, 4 warnings). Severity is configured via the [Gradle Plugin](/docs/gradle-plugin).

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
- Redundant \`launch\` in \`coroutineScope\`

## Checkers (11 Rules)

| Checker | Default | Description |
|---------|---------|-------------|
| UnstructuredLaunchChecker | Error | GlobalScope, inline scope, unstructured launch |
| RunBlockingInSuspendChecker | Error | runBlocking in suspend |
| JobInBuilderContextChecker | Error | Job()/SupervisorJob() in builders |
| DispatchersUnconfinedChecker | Warning | Dispatchers.Unconfined |
| CancellationExceptionSubclassChecker | Error | Extending CancellationException |
| SuspendInFinallyChecker | Warning | Suspend in finally |
| CancellationExceptionSwallowedChecker | Warning | catch(Exception) in suspend context |
| UnusedDeferredChecker | Error | async without await |
| RedundantLaunchInCoroutineScopeChecker | Warning | Redundant launch in coroutineScope |

## Requirements

- Kotlin 2.3.0+ (K2)
- Gradle 8.0+

The **sample** project includes a \`compilation\` package with one example per compiler rule (7 errors, 4 warnings) for testing. See [compiler/README.md](https://github.com/santimattius/structured-coroutines/blob/main/compiler/README.md).
`,
  "kotlin-coroutines-skill": `
# Kotlin Coroutines Agent Skill

Expert guidance for **AI coding tools** (ChatGPT, Claude, Cursor, etc.) — safe structured concurrency, performance, and Kotlin/Coroutines best practices. This package is part of the [Structured Coroutines](https://github.com/santimattius/structured-coroutines) project and provides **consistent, rule-based AI/agent-driven guidance** for reviewing or refactoring Kotlin/Android coroutine code.

## Why This Skill Exists

- **Structured concurrency is easy to get wrong:** \`GlobalScope\`, wrong Dispatchers, swallowed \`CancellationException\`, and misuse of \`SupervisorJob\` lead to leaks, ANRs, and flaky behavior. This skill encodes a single set of rules so agents give **aligned** recommendations.
- **Faster reviews and migrations:** Teams can point their AI at this skill and get code that follows the same checklist (no GlobalScope, proper scopes, \`withContext(IO)\`, virtual-time tests, etc.).

## What's Included

| Asset | Description |
|-------|-------------|
| **SYSTEM_PROMPT.md** | Full system prompt: identity, strict rules, tone, output format (analysis → erroneous → optimized → explanation). |
| **SKILL.md** | Playbook: maps topic/error to the right reference file. |
| **references/** | One markdown file per best practice (Bad / Recommended / Why / Quick fix). |
| **CONFIG.json** | Metadata: name, description, version, triggers, reference index. |

References cover: GlobalScope, async without await, breaking structured concurrency, runBlocking in suspend, blocking/wrong Dispatchers, Dispatchers.Unconfined, Job/SupervisorJob in builders, cancellation in loops, swallowing CancellationException, suspend cleanup with NonCancellable, reusing cancelled scope, slow tests, channels, and architecture patterns.

## Installation

- **ChatGPT (Custom GPTs):** Paste \`SYSTEM_PROMPT.md\` into Configure → Instructions.
- **Claude (Projects):** Paste \`SYSTEM_PROMPT.md\` into Project settings → Custom instructions.
- **Cursor:** Create a rule in \`.cursor/rules/\` (e.g. \`kotlin-coroutines-skill.md\`) with the content of \`SYSTEM_PROMPT.md\`; use globs \`**/*.kt\` if supported.
- **Claude Code (Plugin):** \`claude --plugin-dir /path/to/structured-coroutines/kotlin-coroutines-skill\`.

Full instructions: [kotlin-coroutines-skill/README.md](https://github.com/santimattius/structured-coroutines/blob/main/kotlin-coroutines-skill/README.md).
`,
  "api": `
# API Reference

Key artifacts and documentation are maintained in the repository:

| Artifact | Description |
|----------|-------------|
| \`io.github.santimattius:structured-coroutines-annotations\` | \`@StructuredScope\`, multiplatform |
| \`io.github.santimattius:structured-coroutines-compiler\` | K2/FIR compiler plugin |
| \`io.github.santimattius.structured-coroutines\` (Gradle) | Gradle plugin |
| \`io.github.santimattius:structured-coroutines-detekt-rules\` | Detekt rules (9) |
| \`io.github.santimattius:structured-coroutines-lint-rules\` | Android Lint rules (17) |

**Module docs:** [Gradle Plugin](https://github.com/santimattius/structured-coroutines/blob/main/gradle-plugin/README.md), [Detekt](https://github.com/santimattius/structured-coroutines/blob/main/detekt-rules/README.md), [Lint](https://github.com/santimattius/structured-coroutines/blob/main/lint-rules/README.md), [IntelliJ](https://github.com/santimattius/structured-coroutines/blob/main/intellij-plugin/README.md), [Annotations](https://github.com/santimattius/structured-coroutines/blob/main/annotations/README.md), [Compiler](https://github.com/santimattius/structured-coroutines/blob/main/compiler/README.md), [Kotlin Coroutines Skill](https://github.com/santimattius/structured-coroutines/blob/main/kotlin-coroutines-skill/README.md).

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

- **Compiler:** \`CancellationExceptionSwallowed\` now detects \`catch(Exception)\` inside **suspend lambdas** (e.g. \`scope.launch { try { } catch (e: Exception) { } }\`), not only in suspend functions.
- **IntelliJ plugin:** Correct detection of \`@StructuredScope\` on parameters and properties; new **Structured Coroutines** tool window (View → Tool Windows) to list and navigate all findings for the current file.
- **Sample:** New \`compilation\` package with one subpackage per compiler check (7 errors, 4 warnings) for testing and documentation.
- **New:** \`kotlin-coroutines-skill/\` package for AI/agent-driven coroutine best practices.

See [CHANGES_SINCE_0.1.0.md](https://github.com/santimattius/structured-coroutines/blob/main/CHANGES_SINCE_0.1.0.md) in the repo for full details.

## v0.1.0

- K2/FIR Compiler Plugin with 11 rules (7 error, 4 warning).
- Gradle Plugin with configurable severity and KMP support.
- Annotations artifact (multiplatform) for \`@StructuredScope\`.
- Detekt ruleset (9 rules) for CI and multiplatform.
- Android Lint rules (17 rules) including MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.
- IntelliJ/Android Studio plugin: 11 inspections, 9 quick fixes, 5 intentions, gutter icons, tool window; K2 compatible.
`
};
