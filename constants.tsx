
import { ModuleCard, ComparisonRow } from './types';

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
      title: "Compiler",
      description: "K2/FIR Kotlin Compiler Plugin that enforces structured concurrency at compile time.",
      icon: "memory",
      path: "/docs/compiler"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: "GlobalScope Usage", compiler: "none", detekt: "check", lint: "check", ide: "check" },
  { feature: "Uncaught Exceptions", compiler: "none", detekt: "warning", lint: "check", ide: "check" },
  { feature: "Leaked Context", compiler: "none", detekt: "warning", lint: "warning", ide: "check" },
  { feature: "Auto-Correction", compiler: "none", detekt: "none", lint: "check", ide: "check" },
];

export const DOCS_CONTENT: Record<string, string> = {
  "introduction": `
# Introduction

**Structured Coroutines** is a toolkit that brings the principles of structured concurrency to Kotlin development. It helps you avoid leaked scopes, uncaught exceptions, and improper context management—issues that lead to subtle bugs in production.

## Why This Toolkit?

Kotlin Coroutines are powerful but easy to misuse. This toolkit provides:

- **Compile-time checks** via the K2/FIR Compiler Plugin—unsafe patterns fail the build.
- **Static analysis** via Detekt rules for CI/CD and multiplatform projects.
- **IDE feedback** via the IntelliJ/Android Studio plugin with inspections and quick fixes.
- **Android-specific rules** via Android Lint (e.g. \`MainDispatcherMisuse\`, \`ViewModelScopeLeak\`).

## Getting Started

We recommend starting with [Core Concepts](/docs/core-concepts) for the underlying best practices, then [Gradle Plugin](/docs/gradle-plugin) for installation and [Annotations](/docs/annotations) for marking scopes with \`@StructuredScope\`.
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

\`\`\`kotlin
@StructuredScope
class MyFeature(val scope: CoroutineScope) {
    fun doWork() = scope.launch {
        // Managed child—cancelled when scope is cancelled
    }
}
\`\`\`

For a full checklist, see the best-practices documentation in the repository.
`,
  "annotations": `
# Annotations

Multiplatform annotations for marking structured coroutine scopes. The \`@StructuredScope\` annotation makes scope boundaries explicit and is recognized by the Compiler Plugin, Detekt, and Lint.

## Installation

\`\`\`kotlin
// build.gradle.kts
dependencies {
    implementation("io.github.santimattius:annotations:0.1.0")
}

// Kotlin Multiplatform (commonMain)
kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation("io.github.santimattius:annotations:0.1.0")
            }
        }
    }
}
\`\`\`

## Usage

Mark function parameters, constructor parameters, or class properties that hold a \`CoroutineScope\`:

\`\`\`kotlin
import io.github.santimattius.structured.annotations.StructuredScope

// Function parameter
fun loadData(@StructuredScope scope: CoroutineScope) {
    scope.launch { fetchData() }
}

// Constructor injection
class UserService(@StructuredScope private val scope: CoroutineScope) {
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

## Framework Scopes (Auto-recognized)

\`viewModelScope\`, \`lifecycleScope\`, and \`rememberCoroutineScope()\` are recognized without annotation.
`,
  "detekt-rules": `
# Detekt Rules

Custom Detekt rules enforce structured concurrency best practices in Kotlin. Use them for multiplatform projects and CI/CD pipelines where the Compiler Plugin is not applied.

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

| Rule | Severity | Description |
|------|----------|-------------|
| **GlobalScopeUsage** | Error | Detects \`GlobalScope.launch/async\` |
| **InlineCoroutineScope** | Error | Detects \`CoroutineScope(...).launch/async\` |
| **RunBlockingInSuspend** | Warning | Detects \`runBlocking\` in suspend functions |
| **DispatchersUnconfined** | Warning | Detects \`Dispatchers.Unconfined\` usage |
| **CancellationExceptionSubclass** | Error | Detects classes extending \`CancellationException\` |
| **BlockingCallInCoroutine** | Warning | Detects blocking calls inside coroutines (JVM) |
| **RunBlockingWithDelayInTest** | Warning | Detects \`runBlocking\` + \`delay\` in tests |
| **ExternalScopeLaunch** | Warning | Detects launch on external scope from suspend |
| **LoopWithoutYield** | Warning | Detects loops without cooperation points |

## Configuration

\`\`\`yaml
structured-coroutines:
  GlobalScopeUsage:
    active: true
    severity: error
  InlineCoroutineScope:
    active: true
    severity: error
\`\`\`

Run with: \`./gradlew detekt\`
`,
  "intellij-plugin": `
# IntelliJ / Android Studio Plugin

Real-time inspections, quick fixes, intentions, and gutter icons for structured concurrency. The plugin works in both K1 and K2 Kotlin mode.

## Installation

1. **Settings/Preferences** → **Plugins**
2. Search for **Structured Coroutines**
3. Install and restart the IDE

Or install from disk using the plugin ZIP from [Releases](https://github.com/santimattius/structured-coroutines/releases).

## Features

- **Inspections:** GlobalScope usage, runBlocking in suspend, MainDispatcherMisuse, Job/SupervisorJob in builders, async without await, suspend in finally, CancellationException swallowed, Dispatchers.Unconfined, scope reuse after cancel, and more.
- **Quick Fixes:** Replace GlobalScope with viewModelScope/lifecycleScope/coroutineScope, wrap with \`withContext(Dispatchers.IO)\`, add \`.await()\`, wrap finally in \`withContext(NonCancellable)\`, add CancellationException handling, etc.
- **Intentions:** Migrate to viewModelScope/lifecycleScope, wrap with \`coroutineScope { }\`, convert launch to async, extract suspend function.
- **Gutter Icons:** Scope type (e.g. viewModelScope, lifecycleScope, GlobalScope) and dispatcher context (Main, IO, Default, Unconfined).

## Compatibility

- IntelliJ IDEA 2024.3+
- Android Studio Ladybug (2024.2)+
- K1 and K2 Kotlin mode supported
`,
  "gradle-plugin": `
# Gradle Plugin

The Gradle plugin integrates the Structured Coroutines Kotlin Compiler Plugin so you can enforce structured concurrency at compile time. All compiler rules are configurable as **error** or **warning**.

## Installation

\`\`\`kotlin
// settings.gradle.kts — add mavenLocal() for local development
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
    kotlin("jvm") version "2.3.0"   // Kotlin 2.0+ (K2) required
    id("io.github.santimattius.structured-coroutines") version "0.1.0"
}

dependencies {
    implementation("io.github.santimattius:annotations:0.1.0")
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
| Error (default) | 7 | GlobalScope, runBlocking in suspend, Job() in builders, async without await |
| Warning (default) | 4 | Dispatchers.Unconfined, suspend in finally, CancellationException swallowed, redundant launch |

Supports JVM and Kotlin Multiplatform. See the full [Gradle Plugin documentation](https://github.com/santimattius/structured-coroutines/blob/main/docs/GRADLE-PLUGIN.md) in the repo for KMP setup and troubleshooting.
`,
  "lint-rules": `
# Android Lint Rules

Custom Android Lint rules enforce structured concurrency and Android-specific patterns. They run with \`./gradlew lint\` and integrate with Android Studio for real-time feedback.

## Installation

\`\`\`kotlin
// build.gradle.kts (Android module)
dependencies {
    lintChecks("io.github.santimattius:structured-coroutines-lint-rules:0.1.0")
}
\`\`\`

## Rules Overview

| Category | Rules | Description |
|----------|-------|-------------|
| **Compiler Plugin** | 9 rules | GlobalScope, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, JobInBuilderContext, SuspendInFinally, CancellationExceptionSwallowed, AsyncWithoutAwait, etc. |
| **Android-Specific** | 3 rules | **MainDispatcherMisuse** (blocking on Main), **ViewModelScopeLeak** (custom scopes in ViewModel), **LifecycleAwareScope** (lifecycleScope usage) |
| **Additional** | 5 rules | UnstructuredLaunch, RedundantLaunchInCoroutineScope, RunBlockingWithDelayInTest, LoopWithoutYield, ScopeReuseAfterCancel |

**Total: 17 rules.** Configure severity in \`lint.xml\` per issue id.

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

Run: \`./gradlew lint\`. Reports: \`app/build/reports/lint-results.html\`
`,
  "compiler": `
# Compiler Plugin

The **K2/FIR Kotlin Compiler Plugin** enforces structured concurrency at compile time. Violations are reported as errors or warnings and can block the build.

## Overview

The plugin uses the K2/FIR API to analyze code and detect:

- \`GlobalScope\` usage and inline \`CoroutineScope(...)\` creation
- \`runBlocking\` inside suspend functions
- \`Job()\` / \`SupervisorJob()\` passed to builders
- \`Dispatchers.Unconfined\` usage
- Classes extending \`CancellationException\`
- Suspend calls in \`finally\` without \`NonCancellable\`
- \`catch(Exception)\` that may swallow \`CancellationException\`
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
| CancellationExceptionSwallowedChecker | Warning | catch(Exception) swallowing |
| UnusedDeferredChecker | Error | async without await |
| RedundantLaunchInCoroutineScopeChecker | Warning | Redundant launch |

## Requirements

- Kotlin 2.3.0+ (K2)
- Gradle 8.0+

Rule severity is configured via the [Gradle Plugin](/docs/gradle-plugin) \`structuredCoroutines { }\` block.
`,
  "api": `
# API Reference

Detailed API documentation for the toolkit is maintained in the repository. Key artifacts:

- **Annotations:** \`io.github.santimattius:annotations\` — \`@StructuredScope\` and multiplatform artifacts.
- **Compiler Plugin:** \`io.github.santimattius:structured-coroutines-compiler\` — K2/FIR compiler plugin.
- **Gradle Plugin:** \`io.github.santimattius.structured-coroutines\` — Gradle integration.
- **Detekt:** \`io.github.santimattius:structured-coroutines-detekt-rules\`
- **Lint:** \`io.github.santimattius:structured-coroutines-lint-rules\`

For full API docs (KDoc), see the source and published artifacts on Maven Central or the project [GitHub](https://github.com/santimattius/structured-coroutines).
`,
  "changelog": `
# Changelog

## Unreleased (2026)

Current version is not released yet. Follow the project on GitHub for release announcements.

## v1.0.0 (2026-12-20)

- Initial stable release (planned).
- K2/FIR Compiler Plugin with 11 rules (7 error, 4 warning).
- Gradle Plugin with configurable severity and KMP support.
- Annotations artifact (multiplatform) for \`@StructuredScope\`.
- Detekt ruleset (9 rules) for CI and multiplatform.
- Android Lint rules (17 rules) including MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope.
- IntelliJ/Android Studio plugin: inspections, quick fixes, intentions, gutter icons; K2 compatible.
`
};
