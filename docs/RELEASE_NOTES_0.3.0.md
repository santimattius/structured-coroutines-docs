# Release notes — Structured Coroutines 0.3.0

This document lists **all changes** introduced in the 0.3.0 release branch compared to `main`. Use it to update the project website and documentation. Changes are grouped by **module/tool**. No summarization: real options, examples, and documentation text are included.

---

## 1. Gradle Plugin (`gradle-plugin`)

### 1.1 Configuration presets (profiles)

The plugin supports three configuration presets so you can choose strict, gradual, or relaxed behavior with a single line.

#### New DSL methods

- **`useStrictProfile()`** — Applies the default severities: 7 rules as error, 4 as warning. Use for greenfield projects or when you want the build to fail on violations.
- **`useGradualProfile()`** — Sets all 11 rules to **warning**. Use when migrating a legacy project so the build does not fail while you fix issues.
- **`useRelaxedProfile()`** — Same as gradual (all 11 rules as warning). Use when you want to see findings without blocking the build.

#### Example usage

```kotlin
structuredCoroutines {
    useStrictProfile()   // Default: 7 error, 4 warning (greenfield)
    // useGradualProfile()  // All rules warning (migration)
    // useRelaxedProfile()   // Same as gradual
}
```

#### Severity per rule by profile

| Rule                              | Strict | Gradual / Relaxed |
|-----------------------------------|--------|-------------------|
| `globalScopeUsage`                | error  | warning           |
| `inlineCoroutineScope`            | error  | warning           |
| `unstructuredLaunch`              | error  | warning           |
| `runBlockingInSuspend`            | error  | warning           |
| `jobInBuilderContext`             | error  | warning           |
| `cancellationExceptionSubclass`   | error  | warning           |
| `unusedDeferred`                  | error  | warning           |
| `dispatchersUnconfined`           | warning| warning           |
| `suspendInFinally`                | warning| warning           |
| `cancellationExceptionSwallowed`  | warning| warning           |
| `redundantLaunchInCoroutineScope` | warning| warning           |

#### Profile summary table (for docs/website)

| Profile   | When to use | Effect |
|-----------|--------------|--------|
| **Strict**  | New projects or when you want the build to fail on violations | 7 rules → error, 4 rules → warning (defaults) |
| **Gradual** | Migrating legacy code; build must not fail while you fix issues | All 11 rules → **warning** |
| **Relaxed** | Same as gradual; see findings without blocking the build | All 11 rules → **warning** |

---

### 1.2 Excluding source sets and projects

You can disable the compiler plugin for specific Kotlin compilations (source sets) or for entire projects. Excluded compilations do not run the Structured Coroutines plugin.

#### New extension properties

- **`excludeSourceSets: ListProperty<String>`** — Source set (compilation) names to exclude. Example values: `"main"`, `"test"`, `"jvmMain"`, `"commonMain"`, or custom names like `"legacyMain"`.
- **`excludeProjects: ListProperty<String>`** — Project paths to exclude in Gradle path format (e.g. `:legacy-module`, `:app:oldFeature`).

#### New DSL methods

- **`excludeSourceSets(vararg names: String)`** — Appends the given compilation names to the exclusion list. Names match `KotlinCompilation.getName()`.
- **`excludeProjects(vararg paths: String)`** — Appends the given project paths to the exclusion list.

#### Example: exclude by source set

```kotlin
structuredCoroutines {
    useGradualProfile()
    excludeSourceSets("legacyMain", "test")  // "main", "test", "jvmMain", etc.
}
```

#### Example: exclude by project path

```kotlin
structuredCoroutines {
    excludeProjects(":legacy-module", ":app:oldFeature")
}
```

#### Behavior

- **Source set names** match Kotlin compilation names (e.g. `main`, `test`, `jvmMain`, `commonMain`). Excluded compilations do not run the plugin.
- **Project paths** use Gradle path format (e.g. `:subproject`, `:app:lib`). All compilations of that project are excluded.
- When the plugin is applied to the root only, exclusion lists are read from the root extension. When applied per project, each project’s extension is used.

#### Implementation detail (plugin logic)

- In `isApplicable(kotlinCompilation)`, the plugin resolves the extension from the compilation’s project or from `rootProject`. If the compilation’s project path is in `excludeProjects`, or the compilation name is in `excludeSourceSets`, the plugin returns `false` and the compiler plugin is not applied to that compilation.
- Default conventions: `excludeSourceSets.convention(emptyList())`, `excludeProjects.convention(emptyList())`.

---

### 1.3 Gradle Plugin README changes

#### Table of Contents (new entries)

- [Profiles (strict / gradual / relaxed)](#profiles-strict--gradual--relaxed)
- [Excluding source sets and projects](#excluding-source-sets-and-projects)

#### New section: Profiles (strict / gradual / relaxed)

Full section text:

```markdown
### Profiles (strict / gradual / relaxed)

You can apply a preset instead of configuring each rule:

\`\`\`kotlin
structuredCoroutines {
    useStrictProfile()   // Default: 7 error, 4 warning (greenfield)
    // useGradualProfile()  // All rules warning (migration)
    // useRelaxedProfile()   // Same as gradual
}
\`\`\`

| Profile   | When to use | Effect |
|-----------|--------------|--------|
| **Strict**  | New projects or when you want the build to fail on violations | 7 rules → error, 4 rules → warning (defaults) |
| **Gradual** | Migrating legacy code; build must not fail while you fix issues | All 11 rules → **warning** |
| **Relaxed** | Same as gradual; see findings without blocking the build | All 11 rules → **warning** |

**Severity per rule by profile:**

[Table: Rule × Strict | Gradual/Relaxed — see table above in §1.1]
```

#### New section: Excluding source sets and projects

Full section text:

```markdown
### Excluding source sets and projects

During migration you can disable the compiler plugin for specific source sets or entire projects so legacy code does not fail the build.

**Exclude by source set (compilation name):**

\`\`\`kotlin
structuredCoroutines {
    useGradualProfile()
    excludeSourceSets("legacyMain", "test")  // "main", "test", "jvmMain", etc.
}
\`\`\`

**Exclude by project path:**

\`\`\`kotlin
structuredCoroutines {
    excludeProjects(":legacy-module", ":app:oldFeature")
}
\`\`\`

- **Source set names** match Kotlin compilation names (e.g. `main`, `test`, `jvmMain`, `commonMain`). Excluded compilations do not run the plugin.
- **Project paths** use Gradle path format (e.g. `:subproject`, `:app:lib`). All compilations of that project are excluded.
- When the plugin is applied to the root only, exclusion lists are read from the root extension. When applied per project, each project's extension is used.

For a full migration path (relaxed → gradual → strict) and suppression best practices, see the [Gradual adoption guide](../docs/GRADUAL_ADOPTION.md).
```

#### New subsection under Usage Examples: Using a profile

**New project (strict):** one line applies the default strict behavior.

```kotlin
plugins {
    kotlin("jvm") version "2.3.0"
    id("io.github.santimattius.structured-coroutines") version "0.1.0"
}

structuredCoroutines {
    useStrictProfile()
}
```

**Legacy project (gradual):** all rules as warnings so the build does not fail while you fix issues.

```kotlin
structuredCoroutines {
    useGradualProfile()
}
```

---

### 1.4 Code changes (files and APIs)

| File | Change |
|------|--------|
| `gradle-plugin/src/main/kotlin/.../StructuredCoroutinesExtension.kt` | Added `excludeSourceSets: ListProperty<String>`, `excludeProjects: ListProperty<String>`, `excludeSourceSets(vararg names: String)`, `excludeProjects(vararg paths: String)`, `useStrictProfile()`, `useGradualProfile()`, `useRelaxedProfile()`. |
| `gradle-plugin/src/main/kotlin/.../StructuredCoroutinesGradlePlugin.kt` | In `apply()`: `extension.excludeSourceSets.convention(emptyList())`, `extension.excludeProjects.convention(emptyList())`. Override `isApplicable(kotlinCompilation)` to return `false` when the compilation’s project path is in `excludeProjects` or the compilation name is in `excludeSourceSets` (extension resolved from project or rootProject). |
| `gradle-plugin/README.md` | New sections and table of contents entries as above. |

---

## 2. Documentation (`docs/`)

### 2.1 New document: Gradual adoption guide

**Path:** `docs/GRADUAL_ADOPTION.md`

This guide explains how to adopt the plugin in an existing codebase without breaking the build. It covers profiles (relaxed → gradual → strict), excluding source sets or projects, and suppression best practices.

#### Document structure and full content

**Title:** Gradual adoption guide

**Intro:**

> This guide helps you adopt the Structured Coroutines plugin in an existing codebase without breaking the build. It covers **profiles** (relaxed → gradual → strict), **excluding** source sets or projects, and **suppression** best practices.
>
> **Related:** [gradle-plugin README](../gradle-plugin/README.md) (configuration), [SUPPRESSING_RULES.md](SUPPRESSING_RULES.md) (suppression IDs).

---

**Section 1. Step-by-step path: Relaxed → Gradual → Strict**

| Step | Profile | Goal |
|------|---------|------|
| **1. Relaxed / Gradual** | `useGradualProfile()` or `useRelaxedProfile()` | Enable the plugin with **all rules as warnings**. Build succeeds; you see findings in IDE and CI. |
| **2. Fix and suppress** | Same | Fix violations where possible; use `@Suppress` for justified exceptions (see [Suppression best practices](#3-suppression-best-practices)). |
| **3. Strict** | `useStrictProfile()` | Once the codebase is clean (or only documented exceptions remain), switch to strict so new violations fail the build. |

**Example: enable without breaking the build**

```kotlin
// build.gradle.kts (root or module)
plugins {
    kotlin("jvm") version "2.3.0"
    id("io.github.santimattius.structured-coroutines") version "0.1.0"
}

structuredCoroutines {
    useGradualProfile()  // All warnings; no build failure
}
```

**Example: move to strict when ready**

```kotlin
structuredCoroutines {
    useStrictProfile()   // 7 rules error, 4 warning; violations block the build
}
```

---

**Section 2. Excluding legacy code**

- Use exclusions when you cannot fix or suppress in a given area yet.

**Exclude source sets**

```kotlin
structuredCoroutines {
    useGradualProfile()
    excludeSourceSets("legacyMain", "test")
}
```

Names match Kotlin compilation names: `main`, `test`, `jvmMain`, `commonMain`, or custom names.

**Exclude entire projects**

```kotlin
// Root build.gradle.kts
structuredCoroutines {
    excludeProjects(":legacy-app", ":experimental")
}
```

Use Gradle project paths (e.g. `:subproject`, `:app:feature`).

**When to exclude**

- **Temporary:** Legacy module that you will refactor later; exclude until you can run the plugin there.
- **Permanent:** Optional; prefer fixing or suppressing so the whole codebase is under the same rules. Document why a module is excluded (e.g. in README or ADR).

---

**Section 3. Suppression best practices**

- Suppress at the narrowest scope; document why; use the correct ID per tool (see SUPPRESSING_RULES.md).
- Avoid blanket suppression, suppressing multiple rules “just in case,” or disabling the plugin when exclusions or suppressions would be enough.

**Example**

```kotlin
// Deliberate: fire-and-forget analytics that must survive activity lifecycle.
@Suppress("GLOBAL_SCOPE_USAGE")
fun sendAnalyticsEvent(event: AnalyticsEvent) {
    GlobalScope.launch(Dispatchers.IO) { api.post(event) }
}
```

**Reference links:** Rule codes and practices → BEST_PRACTICES_COROUTINES.md#rule-codes-reference; Suppression IDs by tool → SUPPRESSING_RULES.md.

---

**Section 4. Checklist for migration**

- [ ] Apply the plugin with `useGradualProfile()` (or `useRelaxedProfile()`).
- [ ] Optionally exclude legacy modules or source sets with `excludeSourceSets` / `excludeProjects`.
- [ ] Run the build and fix or suppress reported violations; document suppressions.
- [ ] Align Detekt / Android Lint with the same rules and severities if you use them.
- [ ] When the codebase is ready, switch to `useStrictProfile()` so new violations fail the build.

---

### 2.2 Link from Gradle Plugin README to Gradual adoption guide

In `gradle-plugin/README.md`, in the section **Excluding source sets and projects**, the following sentence was added:

> For a full migration path (relaxed → gradual → strict) and suppression best practices, see the [Gradual adoption guide](../docs/GRADUAL_ADOPTION.md).

---

## 3. Detekt Rules (`detekt-rules`)

### 3.1 Rule set and registered rules

The **Structured Coroutines** Detekt rule set (`ruleSetId: "structured-coroutines"`) includes the following rules. Each rule is registered in `StructuredCoroutinesRuleSetProvider.kt`.

#### Compiler-plugin parity rules (run without the compiler plugin)

| Rule class | Rule ID (in detekt.yml) | Best practice / Code | Description |
|------------|--------------------------|------------------------|-------------|
| `GlobalScopeUsageRule` | `GlobalScopeUsage` | 1.1 / SCOPE_001 | Detects `GlobalScope.launch/async` |
| `InlineCoroutineScopeRule` | `InlineCoroutineScope` | 1.3 / SCOPE_003 | Detects `CoroutineScope(...).launch/async` inline creation |
| `RunBlockingInSuspendRule` | `RunBlockingInSuspend` | 2.2 / RUNBLOCK_002 | Detects `runBlocking` inside suspend functions |
| `DispatchersUnconfinedRule` | `DispatchersUnconfined` | 3.3 / DISPATCH_003 | Detects `Dispatchers.Unconfined` usage |
| `CancellationExceptionSubclassRule` | `CancellationExceptionSubclass` | 5.2 / EXCEPT_002 | Detects classes extending `CancellationException` |
| `CancellationExceptionSwallowedRule` | `CancellationExceptionSwallowed` | 4.3 / CANCEL_003 | Detects `catch(Exception)` that may swallow `CancellationException` |
| `JobInBuilderContextRule` | `JobInBuilderContext` | 3.4 / DISPATCH_004 | Detects `Job()`/`SupervisorJob()` passed to launch/async/withContext |
| `RedundantLaunchInCoroutineScopeRule` | `RedundantLaunchInCoroutineScope` | 2.1 / RUNBLOCK_001 | Detects single `launch` inside `coroutineScope`/`supervisorScope` |
| `SuspendInFinallyRule` | `SuspendInFinally` | 4.4 / CANCEL_004 | Detects suspend calls in `finally` without `withContext(NonCancellable)` |
| `UnusedDeferredRule` | `UnusedDeferred` | 1.2 / SCOPE_002 | Detects `async` result never awaited |

#### Detekt-only rules (static analysis)

| Rule class | Rule ID (in detekt.yml) | Best practice / Code | Description |
|------------|--------------------------|------------------------|-------------|
| `BlockingCallInCoroutineRule` | `BlockingCallInCoroutine` | 3.1 / DISPATCH_001 | Detects blocking calls (e.g. `Thread.sleep`, JDBC) inside coroutines |
| `RunBlockingWithDelayInTestRule` | `RunBlockingWithDelayInTest` | 6.1 / TEST_001 | Detects `runBlocking` + `delay` in tests (suggests `runTest`) |
| `ExternalScopeLaunchRule` | `ExternalScopeLaunch` | 1.3 / SCOPE_003 | Detects launch on external scopes from suspend functions |
| `LoopWithoutYieldRule` | `LoopWithoutYield` | 4.1 / CANCEL_001 | Detects loops without cooperation points (yield, ensureActive, delay) |
| `ScopeReuseAfterCancelRule` | `ScopeReuseAfterCancel` | 4.5 / CANCEL_005 | Detects `scope.cancel()` followed by `scope.launch`/`scope.async` |

**Total:** 15 rules in the rule set.

### 3.2 Configuration (detekt.yml) — full snippet

```yaml
structured-coroutines:
  GlobalScopeUsage:
    active: true
    severity: error
  InlineCoroutineScope:
    active: true
    severity: error
  RunBlockingInSuspend:
    active: true
    severity: warning
  DispatchersUnconfined:
    active: true
    severity: warning
  CancellationExceptionSubclass:
    active: true
    severity: error
  CancellationExceptionSwallowed:
    active: true
    severity: warning
  JobInBuilderContext:
    active: true
    severity: warning
  RedundantLaunchInCoroutineScope:
    active: true
    severity: warning
  SuspendInFinally:
    active: true
    severity: warning
  UnusedDeferred:
    active: true
    severity: warning
  BlockingCallInCoroutine:
    active: true
    excludes: ['commonMain', 'iosMain', 'jsMain']
  RunBlockingWithDelayInTest:
    active: true
  ExternalScopeLaunch:
    active: true
  LoopWithoutYield:
    active: true
  ScopeReuseAfterCancel:
    active: true
```

### 3.3 Detekt-rules README (summary table and sections)

The `detekt-rules/README.md` includes:

- **Table of Contents:** Installation, Configuration, Rules Overview, Compiler Plugin Rules, Detekt-Only Rules, Running Detekt, Kotlin Multiplatform Configuration, CI Integration, Suppressing Rules.
- **Summary table:** All 15 rules with Category (Compiler Plugin / Detekt-Only), Severity, and Description.
- **Best Practices Reference table:** Rule name → best practice section (e.g. 1.1, 4.5).
- **Per-rule sections** (e.g. §15 ScopeReuseAfterCancel): what the rule detects, severity, and code examples (BAD / GOOD).
- **Validating rules:** Instructions to run `./gradlew :sample-detekt:detekt` and expect **15 findings**.

### 3.4 Source files (main)

| Path | Purpose |
|------|---------|
| `StructuredCoroutinesRuleSetProvider.kt` | Registers all 15 rules in the `structured-coroutines` rule set |
| `rules/GlobalScopeUsageRule.kt` | SCOPE_001 |
| `rules/InlineCoroutineScopeRule.kt` | SCOPE_003 |
| `rules/RunBlockingInSuspendRule.kt` | RUNBLOCK_002 |
| `rules/DispatchersUnconfinedRule.kt` | DISPATCH_003 |
| `rules/CancellationExceptionSubclassRule.kt` | EXCEPT_002 |
| `rules/CancellationExceptionSwallowedRule.kt` | CANCEL_003 |
| `rules/JobInBuilderContextRule.kt` | DISPATCH_004 |
| `rules/RedundantLaunchInCoroutineScopeRule.kt` | RUNBLOCK_001 |
| `rules/SuspendInFinallyRule.kt` | CANCEL_004 |
| `rules/UnusedDeferredRule.kt` | SCOPE_002 |
| `rules/BlockingCallInCoroutineRule.kt` | DISPATCH_001 |
| `rules/RunBlockingWithDelayInTestRule.kt` | TEST_001 |
| `rules/ExternalScopeLaunchRule.kt` | SCOPE_003 |
| `rules/LoopWithoutYieldRule.kt` | CANCEL_001 |
| `rules/ScopeReuseAfterCancelRule.kt` | CANCEL_005 |
| `utils/DetektDocUrl.kt` | Builds doc URLs for rule messages |
| `utils/CoroutineDetektUtils.kt` | Shared utilities |

---

## 4. Android Lint Rules (`lint-rules`)

### 4.1 Issue registry and registered detectors

The **StructuredCoroutinesIssueRegistry** registers the following Lint issues (detectors). Each detector has a unique issue ID used in `lint.xml` and `@SuppressLint`.

#### Compiler-plugin parity and shared rules

| Detector class | Issue ID | Description |
|----------------|----------|-------------|
| `GlobalScopeUsageDetector` | `GlobalScopeUsage` | GlobalScope.launch/async |
| `InlineCoroutineScopeDetector` | `InlineCoroutineScope` | CoroutineScope(...).launch/async |
| `RunBlockingInSuspendDetector` | `RunBlockingInSuspend` | runBlocking in suspend |
| `DispatchersUnconfinedDetector` | `DispatchersUnconfined` | Dispatchers.Unconfined |
| `CancellationExceptionSubclassDetector` | `CancellationExceptionSubclass` | Class extends CancellationException |
| `JobInBuilderContextDetector` | `JobInBuilderContext` | Job()/SupervisorJob() in builders |
| `SuspendInFinallyDetector` | `SuspendInFinally` | Suspend in finally without NonCancellable |
| `CancellationExceptionSwallowedDetector` | `CancellationExceptionSwallowed` | catch(Exception) swallowing CancellationException |
| `AsyncWithoutAwaitDetector` | `AsyncWithoutAwait` | async without await (SCOPE_002) |
| `UnstructuredLaunchDetector` | `UnstructuredLaunch` | Unstructured launch (SCOPE_003) |
| `RedundantLaunchInCoroutineScopeDetector` | `RedundantLaunchInCoroutineScope` | Redundant launch in coroutineScope |
| `RunBlockingWithDelayInTestDetector` | `RunBlockingWithDelayInTest` | runBlocking + delay in tests |
| `LoopWithoutYieldDetector` | `LoopWithoutYield` | Loops without cooperation |
| `ScopeReuseAfterCancelDetector` | `ScopeReuseAfterCancel` | scope.cancel() then scope.launch/async |

#### Android-specific rules

| Detector class | Issue ID | Description |
|----------------|----------|-------------|
| `MainDispatcherMisuseDetector` | `MainDispatcherMisuse` | Blocking on Main (DISPATCH_001) |
| `ViewModelScopeLeakDetector` | `ViewModelScopeLeak` | ViewModel scope leak (ARCH_002) |
| `LifecycleAwareScopeDetector` | `LifecycleAwareScope` | Flow collect without repeatOnLifecycle (ARCH_002) |

**Total:** 17 issues in the registry.

### 4.2 Configuration (lint.xml) — full snippet from README

```xml
<?xml version="1.0" encoding="UTF-8"?>
<lint>
    <issue id="GlobalScopeUsage" severity="error" />
    <issue id="InlineCoroutineScope" severity="error" />
    <issue id="RunBlockingInSuspend" severity="error" />
    <issue id="DispatchersUnconfined" severity="warning" />
    <issue id="CancellationExceptionSubclass" severity="error" />
    <issue id="JobInBuilderContext" severity="error" />
    <issue id="SuspendInFinally" severity="warning" />
    <issue id="CancellationExceptionSwallowed" severity="warning" />
    <issue id="AsyncWithoutAwait" severity="error" />
    <issue id="MainDispatcherMisuse" severity="error" />
    <issue id="ViewModelScopeLeak" severity="error" />
    <issue id="LifecycleAwareScope" severity="error" />
    <issue id="UnstructuredLaunch" severity="error" />
    <issue id="RedundantLaunchInCoroutineScope" severity="warning" />
    <issue id="RunBlockingWithDelayInTest" severity="warning" />
    <issue id="LoopWithoutYield" severity="warning" />
    <issue id="ScopeReuseAfterCancel" severity="warning" />
</lint>
```

### 4.3 Lint-rules README (structure)

- **Table of Contents:** Installation, Configuration, Rules Overview, Compiler Plugin Rules, Android-Specific Rules, Additional Rules, Running Lint, CI Integration, Suppressing Rules, Comparison with Other Tools, Usage Strategy, Limitations.
- **Installation:** Android Gradle Plugin, `lintChecks("io.github.santimattius:structured-coroutines-lint-rules:...")`, Maven Central / JitPack, local development.
- **Configuration:** Full `lint.xml` snippet as above.
- **Rules Overview:** Tables and descriptions per category.

### 4.4 Source files (main)

| Path | Purpose |
|------|---------|
| `StructuredCoroutinesIssueRegistry.kt` | Registers all 17 issues |
| `detectors/GlobalScopeUsageDetector.kt` … (17 detector files) | One detector per issue |
| `utils/LintDocUrl.kt`, `CoroutineLintUtils.kt`, `AndroidLintUtils.kt` | Shared utilities |

---

## 5. IntelliJ Plugin (`intellij-plugin`)

### 5.1 Inspections (registered in StructuredCoroutinesInspectionProvider)

The following 12 inspections are registered and run in the IDE:

| Inspection class | Purpose |
|------------------|---------|
| `GlobalScopeInspection` | GlobalScope usage |
| `MainDispatcherMisuseInspection` | Blocking on Main |
| `ScopeReuseAfterCancelInspection` | scope.cancel() then scope.launch/async |
| `RunBlockingInSuspendInspection` | runBlocking in suspend |
| `UnstructuredLaunchInspection` | Unstructured launch |
| `AsyncWithoutAwaitInspection` | async without await |
| `InlineCoroutineScopeInspection` | Inline CoroutineScope creation |
| `JobInBuilderContextInspection` | Job()/SupervisorJob() in builders |
| `SuspendInFinallyInspection` | Suspend in finally without NonCancellable |
| `CancellationExceptionSwallowedInspection` | Swallowing CancellationException |
| `CancellationExceptionSubclassInspection` | Class extends CancellationException |
| `DispatchersUnconfinedInspection` | Dispatchers.Unconfined |

### 5.2 Quick fixes

| Quick fix class | Use case |
|-----------------|----------|
| `ReplaceGlobalScopeQuickFix` | Replace GlobalScope with a proper scope |
| `RemoveRunBlockingQuickFix` | Remove or replace runBlocking |
| `AddAwaitQuickFix` | Add await() for Deferred |
| `AddCancellationExceptionCatchQuickFix` | Re-throw CancellationException in catch |
| `ReplaceJobWithSupervisorScopeQuickFix` | Use supervisorScope instead of Job() |
| `WrapWithIODispatcherQuickFix` | Wrap blocking call with Dispatchers.IO |
| `ConvertAsyncToLaunchQuickFix` | Convert async to launch when result unused |
| `ReplaceCancelWithCancelChildrenQuickFix` | Replace cancel() with cancelChildren() for scope reuse |
| `WrapWithNonCancellableQuickFix` | Wrap suspend in finally with withContext(NonCancellable) |

### 5.3 Intentions

| Intention class | Use case |
|-----------------|----------|
| `WrapWithCoroutineScopeIntention` | Wrap code in coroutineScope |
| `MigrateToLifecycleScopeIntention` | Migrate to lifecycleScope (Android) |
| `MigrateToViewModelScopeIntention` | Migrate to viewModelScope (Android) |
| `ExtractSuspendFunctionIntention` | Extract to suspend function |
| `ConvertLaunchToAsyncIntention` | Convert launch to async |

### 5.4 Other features

- **Tool window:** `StructuredCoroutinesToolWindowFactory`, `StructuredCoroutinesViewPanel`, `StructuredCoroutinesInspectionRunner` — tool window to list and navigate findings.
- **Line markers:** `CoroutineScopeLineMarkerProvider`, `DispatcherContextLineMarkerProvider` — gutter icons for scope and dispatcher context.
- **Base inspection:** `CoroutineInspectionBase` — shared base for inspections with rule codes and doc links.

---

## 6. New module: Sample-Detekt (`sample-detekt`)

### 6.1 Purpose

- **Validate** that each Detekt rule in `detekt-rules` fires on the expected code patterns.
- **No compiler plugin** is applied (unlike `sample/`); only Detekt runs.
- The build is configured with **ignoreFailures = true** so the project compiles; run `:sample-detekt:detekt` to see the report.

### 6.2 How to run

From the project root:

```bash
./gradlew :sample-detekt:detekt
```

Expected: **15 findings** from the `structured-coroutines` rule set.

### 6.3 Build and configuration

**build.gradle.kts:**

```kotlin
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.detekt)
}

dependencies {
    implementation(libs.kotlinx.coroutines.core)
    testImplementation(libs.kotlin.test)
    testImplementation(libs.junit.jupiter)
}

kotlin {
    jvmToolchain(17)
}

detekt {
    buildUponDefaultConfig = true
    config.setFrom(files(project.layout.projectDirectory.file("detekt.yml")))
    ignoreFailures = true
}

dependencies {
    detektPlugins(project(":detekt-rules"))
}
```

**detekt.yml** (excerpt): enables all 15 `structured-coroutines` rules; disables `TooGenericExceptionCaught`, `MatchingDeclarationName`, `UnusedPrivateProperty` to avoid extra findings on the example code.

### 6.4 Expected findings (15) — rule, file, trigger

| Rule | File | What triggers it |
|------|------|------------------|
| GlobalScopeUsage (SCOPE_001) | GlobalScopeUsageExample.kt | `GlobalScope.launch { }` |
| InlineCoroutineScope (SCOPE_003) | InlineCoroutineScopeExample.kt | `CoroutineScope(Dispatchers.Default).launch { }` |
| RunBlockingInSuspend (RUNBLOCK_002) | RunBlockingInSuspendExample.kt | `runBlocking { }` inside `suspend fun` |
| DispatchersUnconfined (DISPATCH_003) | DispatchersUnconfinedExample.kt | `launch(Dispatchers.Unconfined) { }` |
| CancellationExceptionSubclass (EXCEPT_002) | CancellationExceptionSubclassExample.kt | `class X : CancellationException()` |
| CancellationExceptionSwallowed (CANCEL_003) | CancellationExceptionSwallowedExample.kt | `catch (ex: Exception) { }` inside `launch { }` |
| BlockingCallInCoroutine (DISPATCH_001) | BlockingCallInCoroutineExample.kt | `Thread.sleep()` inside `launch { }` |
| ExternalScopeLaunch (SCOPE_003) | ExternalScopeLaunchExample.kt | `scope.launch { }` from a `suspend fun` |
| LoopWithoutYield (CANCEL_001) | LoopWithoutYieldExample.kt | `for` loop in `suspend fun` without cooperation point |
| RunBlockingWithDelayInTest (TEST_001) | RunBlockingWithDelayInTestExampleTest.kt | `runBlocking { delay() }` in a test file |
| JobInBuilderContext (DISPATCH_004) | JobInBuilderContextExample.kt | `launch(Job()) { }` |
| RedundantLaunchInCoroutineScope (RUNBLOCK_001) | RedundantLaunchInCoroutineScopeExample.kt | single `launch { }` inside `coroutineScope { }` |
| SuspendInFinally (CANCEL_004) | SuspendInFinallyExample.kt | `delay()` in `finally` without `NonCancellable` |
| UnusedDeferred (SCOPE_002) | UnusedDeferredExample.kt | `async { }` result never awaited |
| ScopeReuseAfterCancel (CANCEL_005) | ScopeReuseAfterCancelExample.kt | `scope.cancel()` then `scope.launch { }` |

### 6.5 Example source files (paths)

- **Main source set:** `src/main/kotlin/io/github/santimattius/structured/sample/detekt/`
  - GlobalScopeUsageExample.kt
  - InlineCoroutineScopeExample.kt
  - RunBlockingInSuspendExample.kt
  - DispatchersUnconfinedExample.kt
  - CancellationExceptionSubclassExample.kt
  - CancellationExceptionSwallowedExample.kt
  - BlockingCallInCoroutineExample.kt
  - ExternalScopeLaunchExample.kt
  - LoopWithoutYieldExample.kt
  - JobInBuilderContextExample.kt
  - RedundantLaunchInCoroutineScopeExample.kt
  - SuspendInFinallyExample.kt
  - UnusedDeferredExample.kt
  - ScopeReuseAfterCancelExample.kt
- **Test source set:** `src/test/kotlin/io/github/santimattius/structured/sample/detekt/`
  - RunBlockingWithDelayInTestExampleTest.kt

### 6.6 Relation to `sample/`

- **sample:** uses the **compiler plugin**; compilation fails with expected error codes (used by compiler tests).
- **sample-detekt:** uses **Detekt only**; compiles successfully and validates that Detekt rules report as expected.

---

## 7. Summary for website / release announcement

**Version:** 0.3.0

**Highlights:**

1. **Gradle Plugin — Configuration profiles**  
   Use `useStrictProfile()`, `useGradualProfile()`, or `useRelaxedProfile()` to apply a preset: strict (7 error, 4 warning), or gradual/relaxed (all 11 rules as warning) for migration.

2. **Gradle Plugin — Exclude source sets and projects**  
   Use `excludeSourceSets("legacyMain", "test")` and `excludeProjects(":legacy-module")` so the compiler plugin does not run on selected compilations or projects during migration.

3. **Documentation — Gradual adoption guide**  
   New guide at `docs/GRADUAL_ADOPTION.md`: step-by-step path (relaxed → gradual → strict), how to exclude legacy code, and suppression best practices.

4. **Detekt Rules — 15 rules**  
   Rule set `structured-coroutines` with compiler-parity rules (GlobalScope, InlineCoroutineScope, RunBlockingInSuspend, DispatchersUnconfined, CancellationExceptionSubclass/Swallowed, JobInBuilderContext, RedundantLaunchInCoroutineScope, SuspendInFinally, UnusedDeferred) and Detekt-only rules (BlockingCallInCoroutine, RunBlockingWithDelayInTest, ExternalScopeLaunch, LoopWithoutYield, **ScopeReuseAfterCancel**). Full configuration in detekt-rules README.

5. **Android Lint Rules — 17 issues**  
   Registry with all compiler-parity rules, Android-specific rules (MainDispatcherMisuse, ViewModelScopeLeak, LifecycleAwareScope), and ScopeReuseAfterCancel. Configuration via `lint.xml`; see lint-rules README.

6. **IntelliJ Plugin — 12 inspections, 9 quick fixes, 5 intentions**  
   Inspections for GlobalScope, runBlocking, async/await, Job in builder, suspend in finally, CancellationException, Dispatchers.Unconfined, ScopeReuseAfterCancel, etc. Quick fixes (e.g. Replace cancel with cancelChildren, Wrap with NonCancellable) and intentions (Migrate to lifecycleScope/viewModelScope, Convert launch to async). Tool window and line markers.

7. **New module: sample-detekt**  
   Dedicated module to validate Detekt rules: 14 example Kotlin files in main + 1 in test, one intentional violation per rule. Run `./gradlew :sample-detekt:detekt` for 15 findings. No compiler plugin; Detekt only.

**Modules touched:** `gradle-plugin`, `docs`, `detekt-rules`, `lint-rules`, `intellij-plugin`, `sample-detekt` (new).

**Iteration plan:** Semana 3 (Perfiles Gradle) + Semana 4 (Excluir source sets y guía de adopción gradual); plus existing Detekt/Lint/IDE rules and sample-detekt for validation.
