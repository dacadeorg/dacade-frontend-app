# Contribution rules and git flow

## Branching

- Before making any new changes make sure to go back to the `dev` branch pull and create a new branch from there
- Make sure to follow this branch naming convention
- The dev branch is where developers work on
- Always use the dev branch as the base branch of your pull requests
- The main branch is the production branch.
- Change the base branch using other methods like `git rebase` instead of using the pull request merging for the `dev`, `main`, and `staging`

### Branching model

A Git branching model defines your [branching strategy](https://www.perforce.com/blog/vcs/best-branching-strategies-high-velocity-development) in Git. It determines when and how developers make changes and commit them back to your codebase.

Using a Git branching model can expedite the process of delivering feedback to developers. [Git hosting](https://www.perforce.com/git-hosting) solutions don’t come with a branching model out of the box. These Git branching models are branching patterns designed to help overcome challenges. But with Git, you have to build it!

### **Development branch**

Usually the integration branch for feature work and is often the default branch or a named branch. For pull request workflows, the branch where new feature branches are targeted.

- `dev`

### **Production branch**

Used for deploying a release. Branches from, and merges back into, the development branch. In a Gitflow-based workflow it is used to prepare for a new production release.

- `main`

### **Feature branch**

Used for specific feature work or improvements. Generally branches from, and merges back into, the development branch, using pull requests.
They should have the following prefix `ft/`

- `ft/{FEATURE_NAME}`

### **Hotfix branch**

Used to quickly fix a Production branch without interrupting changes in the development branch. In a Gitflow-based workflow, changes are usually merged into the production and development branches.
They should have the following prefix `ht/`

- `ht/{BUG_NAME}`

### **Bugfix**

This branch is used to fix bugs which might be more intensive when it comes to the amount of changes to be done.
They should start with the prefix `bg/`

- `bg/{BUG_NAME}`

### **Release**

Branch used for release tasks and long-term maintenance versions. They are branched from the development branch and then merged into the production branch.
They should start with this prefix `rl/`

- `rl/{VERSION}`

### Commits

- Follow this guideline [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages
- Try to create a mid-sized every couple of minutes/hours. But more importantly, try to let commits be logically consistent contributions. That means if you have many changes in lines of code you can split them up into multiple commits but each of those commits should have an independent meaning that is described by the commit message.

### PRs, Code Review

- Once you made the first commit just go ahead and push the changes
- Create a Pull request once you pushed your changes to the repository, you don't have to wait to finish the feature in order to create a pull request you can create it as soon as you have the first commit.
- The name of the PR should follow the same naming convention as the commit messages. ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)).
  - Eg: `feat: integrate react markdown`
- If a PR is still being worked on add the GitHub tag `Work in progress`
- Before marking a PR as `Ready for review` make sure that the CI (GitHub actions) and the deployment are passing.
- Request code review by adding the code reviewer as a reviewer to your PR
- After requesting for code review make sure to send a discord message to the project channel with the link to the PR and tag the code reviewer
- PRs should cover a set of related changes covering a single feature, bug fix, or other types of changes

### Resolving Conflicts

- Be super careful, involve the others who are working on similar stuff.
- Make sure you understand what you are accepting or refusing.
- Recent changes are not always the relevant ones, always check that you are not dismissing changes that are actually fixing another bug

### Things to avoid in git

- Avoid using the squash commits feature, it tends to bring conflicts especially when people are using other base branches
- Do not use git force push
- Do not merge your PRs unless your code has been reviewed by a code reviewer and the code reviewer has either approved your changes or accepted all the adjustments you have made upon their review.
- Avoid merging other dependencies PRs into the ones you are working on to avoid having duplicate changes into two PRs in case a change is needed to be used in another.
- Avoid committing the `node_modules` folder (or including it in the version history).

## CSS Rules

### Units of measurement

- Use `rem` whenever possible, and avoid using `px` as a measurement unit
- Translate the Figma designs to `rem`, by dividing the pixels by 16 ( `1rem` equal to `16px`)
- Use line-height ratio (which has no measurement) instead of `px`. To calculate it use the line-height in `px` and divide it by the font-size in `px`.
- page margin: convert the left-right padding of the pages to the content width. this is the formula to calculate it:

```js
content_width = ((figma_page_width - padding_of_one_of_the_sides * 2) * 100) / figma_page_width;

content_width = (1264 * 100) / 1920;
```

- When dealing with mobile devices (iOS and Android), in case you would want an element to occupy just the total height minus the address bar. You may consider using `100svh` instead of `100vh` as the CSS height value.
  - In tailwind CSS the `h-screen` class should give you a height of `100vh`, however, the `100svh` class is not present. you have to add it manually.
  - The image below illustrates how these new dynamic port heights work
    ![plYwy.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1d439c55-218c-4867-9e1f-bc6926e42a3b/71e8372e-174c-4077-a9b9-dee520d61fd5/plYwy.png)
  - You can read more via this [link](https://css-tricks.com/the-large-small-and-dynamic-viewports/)

## Next.js and JavaScript rules

- Components should be placed inside the`./components` folder
- Define components following the functional component style (not the class component style).

**Example:**

```javascript
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

- Component file names should be named in [PascalCase](https://techterms.com/definition/pascalcase). (eg: `SectionWrapper.jsx`)
- File names should be the same as the component. The given name of a component in its definition should be the same as its file name.
- All JS react files including components when they contain HTML (or [JSX](https://reactjs.org/docs/introducing-jsx.html)), should have a file extension of `jsx`
- Avoid having too many line blocks inside a single component instead divide it into multiple smaller components
- A single component should handle a single type of implementation (or functionality) rather than combining different non-related functionalities together.
- When editing a reusable component to adapt it to a certain page or a single usage, make sure to check that the new changes don't break other usages of the component
- When dealing with images in a Next js use [nextjs’ image](https://nextjs.org/docs/api-reference/next/image) component to render and optimize images.
- Integrate fonts using URLs rather than hardcoding them in the project, to avoid effects on the page loading speed which can be heavily affected if you are using a font file included within the project.
- SVG icons and elements should be imported as react components like this

```jsx
import SiteLogo from './assets/logo.svg'

<SiteLogo className={}>
```

They can also be given class names as shown in the above image.

- When dealing with multiple SVGs icons and images in a project, You should try to Keep, the SVG’s content in their own files to reduce the lines of code.

- When you want to apply a class-name conditionally use this [library](https://www.npmjs.com/package/classnames).
- Add comments for every new component created using [JS-doc](https://jsdoc.app/about-getting-started)

```javascript
<div
  className={classNames("w-1/3", "bg-primary", {
    "text-white": type === "default",
    underline: hasLink,
  })}
></div>
```

It will allow you to conditionally add classnames without to much syntax and in a more simplified way.

- When making computations(or calculations) inside a component it’s better to them in a [useEffect](https://reactjs.org/docs/hooks-effect.html) or a [useMemo](https://beta.reactjs.org/reference/react/useMemo). to prevent rerunning the calculation on each render
- Do not wrap into a Fragment (`<> </>`) when you only have one child element.

## Naming (file names, functions, etc.)

- File names should be the same as the component
- Component files should be named in PascalCase
- Component file names should be the same as the function name. Both should be written in PascalCase.
- Class files should also be named in PascalCase
- Class and component names are always singular
- Page files, function files, and other files should be named in kebab-case
- Function names should reflect the function's role
- Folders should be named in kebab-case
- Variables should be named in camelCase
- Global constant variables should be named in SNAKE_CASE (all-caps snake case)
- Custom CSS classes should be named in kebab-case and follow the [bem](http://getbem.com/introduction/) style
- When adding custom CSS classes, make sure their name doesn't conflict with any tailwindcss class.

## Tailwind config

> For every classname you add or modify in the config file. always try to follow the original format and style that tailwindcss uses. You can check the default complete configuration of tailwindcss here [https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js]

- Make sure all the custom class names added are named in a meaningful and reusable way
  - The name of the class should not be bound to where it is used it should instead reflect its role
  - It should be named in a way that it can be used across many components without causing confusion as to what it does or what it means
    - Eg: Instead of naming a width class of `project-description-tablet` with a value of `25.313rem`, I would use the formula below and add a spacing of `101.252`, and in that case the usage instead of being `md:w-project-description-tablet` would be `md:w-101.252`
      > Remark that the new class name no longer reflects which components or part of the project it is used in, it has instead a name that is globalized and can be reused multiple times without causing confusion
- For tailwind to calculate a spacing value name such as `w-1`, `p-2`, `m-3`
  - You should take the value in rem and divide it by `0.25`. `VALUE_IN_REM/0.25`
  - Conversely, you can take the class name value `my-[value]` (eg: for `w-3` take `3` as value) and multiply it by `0.25` to find the value in rem.
  - Alternatively, you can divide by `4` if the value is `px`. however, it is recommended to use values in rem. to convert to rem use `VALUE_IN_PX/16`
  - These custom spacing values should be added to the tailwind config under the `spacing` object.
- Custom attributes such as `w-1`, `gap-1`, `space-x-2`, `w-1`, `p-2`, and `m-2` should be customized under the `spacing` attributes in the tailwind config to avoid duplication in different class utilities that need them
- This is a default tailwindcss default config you can use for reference of how to name classes and where to place different values under the config [file](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js)
- When it comes to fraction classnames for measurements such as width. eg: `w-1/2`, These class names should normally be used for percentages.
  - These fractions should actually equal the value of the percentage. Meaning that (1/2) \* 100 should equal `50`.
    - You should make sure, if you add custom fraction classes that they would give the same value as the one you give it. (as shown above)
  - A quick math formula to convert a percentage to a fraction is to divide the percentage by `100` and add a denominator of `100`
    For example, if you want to convert 25% to a fraction, you would divide `25` by `100` and get `0.25`. Then you can add a denominator of `100`, to get the fraction `25/100`.
    You will have to simplify both the numerator and denominator to the lowest possible value without a floating number. In this example, we will simplify it to 1/4 by dividing both the numerator and denominator by 25.
  - You can use this link to help with the [conversion](https://www.calculatorsoup.com/calculators/math/percent-to-fraction-calculator.php)
- Tailwindcss has by default various screen break points which are already defined

  ```json
  screens: {
   'sm': '640px',
   // => @media (min-width: 640px) { ... }
    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  }
  ```

  - In case you would want to customize them you can checkout this [documentation](https://tailwindcss.com/docs/screens#max-width-breakpoints) or this [one](https://tailwindcss.com/docs/screens#fixed-range-breakpoints)
  - Make sure, none of them overlaps with the default or existing breakpoints you can add the max attribute to the breakpoints if you want breakpoint classes to affect only their respective breakpoints.

## Responsiveness

- In case there are some elements that need to be hidden on certain devices, stick to CSS (tailwind classes) to achieve that and avoid using javascript unless that particular use requires it (for reasons like animation issues and so on).
  - `hidden` class should do that and a combination of a device prefix should allow you to hide that element on those devices. (eg: `md:hidden`, `xl:hidden` , `lg:hidden`)

## Image optimizations

- Use `webp` format to load images faster and without quality loss.
  - This is applicable for images and not icons or logos.
  - Use this tool https://cloudconvert.com/webp-converter to convert images to `web`
- Use `SVG` formats for icons and logos and everywhere where it’s applicable instead of `png`

## Icons and special characters

- Opening quote: https://www.compart.com/en/unicode/U+201C
- Closing quote: https://www.compart.com/en/unicode/U+201D
- Soft hyphen: https://www.compart.com/en/unicode/U+00AD

→ You can find more special characters here https://www.compart.com/en/unicode/

→ You can also find icons to use as images or SVGs on this platform https://fontawesome.com/

## QA your own work-results before submitting a PR for review

- Use the browser device inspect tab and check the design on the following devices:

  - iPhone 5/SE
  - Galaxy S5/Moto G4
  - Pixel 2 XL
  - iPhone 6/7/8
  - iPhone 6/7/8 Plus
  - iPhone X, 12, 13 or 14
  - iPad
  - iPad pro

## Plugins and external libraries (You do not need to go through this section while we are doing CSS combined exercises)

### Which plugins should be installed in the project

- Only use open-source software packages (dependencies) with one of the following licenses:

  - Academic Free License
  - Apache License
  - Apple Public Source License
  - Beerware
  - Boost Software License
  - BSD
  - Creative Commons Zero
  - CC BY
  - CeCILL
  - Common Development and Distribution License
  - Common Public License
  - Cryptix General License
  - Educational Community License
  - FreeBSD
  - ISC license
  - LaTeX Project Public License
  - MIT license / X11 license
  - Mozilla Public License
  - Open Software License
  - OpenSSL license
  - Python Software Foundation License
  - Sleepycat License
  - Unlicense
  - W3C Software Notice and License
  - Do What The Fuck You Want To Public License (WTFPL)
  - XCore Open Source License, also separate "Hardware License Agreement"
  - XFree86 1.1 License
  - zlib/libpng license

- Use dependencies with the most downloads, git stars, and forks.
- Make sure that the dependency you are using is still in active development and not archived
