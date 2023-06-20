# Branch conventions

- Feature : `feat/your-branch-name`
- Fix : `fix/your-branch-name`
- Refactor : `refact/your-branch-name`

More on the [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

<br>

# Components conventions

1. Use `functional components` instead of arrow components
2. For typescript, use `interface` for props, and types if needed.
3. Default exports should happen on top.

   ```js
   export default function ComponentName() {....}
   ```

4. `Import React from 'react'` should be avoided where possible.
5. Provide comments for all Props, and components. preferrably with this VS code extension : `JSDoc Generator`
6. Assing a PR to its respective issue and the contributor.
7. Add a label depending on the progress of your PR.
