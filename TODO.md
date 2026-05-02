Go and fix this 9 errors and 17 warnings:

jobel@jobel-dynabook-R63-M:~/projects/taskmind$ npm run lint

> taskmind@0.1.0 lint
> eslint


/home/jobel/projects/taskmind/app/analyze/page.tsx
    5:10  warning  'Sparkles' is defined but never used                     @typescript-eslint/no-unused-vars
   12:10  warning  'DeadlineCard' is defined but never used                 @typescript-eslint/no-unused-vars
   22:24  warning  'setCurrentAnalysis' is assigned a value but never used  @typescript-eslint/no-unused-vars
  290:59  warning  'index' is defined but never used                        @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/app/dashboard/page.tsx
   3:10  warning  'motion' is defined but never used                    @typescript-eslint/no-unused-vars
   6:10  warning  'ActionList' is defined but never used                @typescript-eslint/no-unused-vars
  13:21  warning  'currentAnalysis' is assigned a value but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/app/history/page.tsx
  347:50  warning  'index' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/app/settings/page.tsx
  4:10  warning  'motion' is defined but never used            @typescript-eslint/no-unused-vars
  9:43  warning  'getAnalysesCount' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/app/upload/page.tsx
   72:14  warning  'err' is defined but never used           @typescript-eslint/no-unused-vars
  313:9   error    Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/jobel/projects/taskmind/components/analysis/ActionList.tsx
  3:10  warning  'motion' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/components/analysis/DeadlineCard.tsx
  26:9  warning  'isDueTomorrow' is assigned a value but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/components/analysis/UrgencyBadge.tsx
  15:66  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/jobel/projects/taskmind/components/hydrate-wrapper.tsx
  14:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/jobel/projects/taskmind/components/hydrate-wrapper.tsx:14:5
  12 |
  13 |   useEffect(() => {
> 14 |     setHydrated(true);
     |     ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  15 |   }, []);
  16 |
  17 |   if (!hydrated) {  react-hooks/set-state-in-effect

/home/jobel/projects/taskmind/components/ui/stat-card.tsx
  3:10  warning  'motion' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/components/ui/textarea.tsx
  4:18  error  An interface declaring no members is equivalent to its supertype  @typescript-eslint/no-empty-object-type

/home/jobel/projects/taskmind/lib/ai-engine.ts
  142:31  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  180:29  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/jobel/projects/taskmind/lib/use-hydrated.ts
  9:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/jobel/projects/taskmind/lib/use-hydrated.ts:9:5
   7 |
   8 |   useEffect(() => {
>  9 |     setHydrated(true);
     |     ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  10 |   }, []);
  11 |
  12 |   return hydrated;  react-hooks/set-state-in-effect

/home/jobel/projects/taskmind/lib/use-indexed-db.ts
  9:21  warning  'setCurrentAnalysis' is assigned a value but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/store/useAppStore.ts
  92:11  warning  'get' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/utils/dateParser.ts
  6:18  warning  'isWeekend' is defined but never used  @typescript-eslint/no-unused-vars

/home/jobel/projects/taskmind/utils/export.ts
  182:13  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  197:17  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 26 problems (9 errors, 17 warnings)