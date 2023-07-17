# React + Typescript 과제1

## Commit

| **Type**    | **Usage**                                          |
| ----------- | -------------------------------------------------- |
| `feat`      | add feature                                        |
| `fix`       | fix bug                                            |
| `docs`      | update document                                    |
| `style`     | node code change ex) code formatting, missing semi |
| `refactor`  | refactoring code                                   |
| `test`      | add test code ex) unit test, storybook             |
| `chore`     | update etc, ex) update dependencies                |
| `design`    | update design                                      |
| `rename`    | rename or move file/folder                         |
| `remove`    | remove file/folder                                 |
| `!BREAKING` | critical API changes                               |
| `!HOTFIX`   | hotfix critical bug                                |

## Setup ⚙️

1.  **Install IDE**
    -   vscode
    -   web storm
    -   ...
2.  **Install Plugin** at your IDE
    -   [tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    -   [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    -   [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3.  **Install `Node.js`**

    Install [`Node.js`](https://nodejs.org/ko), recommended after `v18.x.x`

4.  **Install `pnpm`**, package manager

    `pnpm` setup documentation is [here](https://pnpm.io/installation)!

    Simply, run this command in your terminal.

    ```bash
    npm install -g pnpm
    ```

    -   `npm`: installed, when `Node.js` is installed.
    -   `pnpm`: faster version of `npm` which is package manager.

5.  **Install project dependencies**

    Run this command at your terminal

    ```bash
    pnpm i
    ```

    After installation, `node_modules` folder will be generated.

6.  **Run development server**

    ```bash
    pnpm dev
    ```

    After running this command, you can see the website at `localhost:3000`. Develope your project with this server.

7.  **Build project**

    Run below command at your terminal

    ```bash
    pnpm build
    ```

    After building process, you can see the website at `localhost:3000` in production mode which is optimized for performance(=lightweight version of project).

    Log message should be look like this.

    ```bash
    vite v4.4.0 building for production...
    ✓ 31 modules transformed.
    dist/index.html                   0.49 kB │ gzip:  0.30 kB
    dist/assets/index-acbea005.css    6.09 kB │ gzip:  1.79 kB
    dist/assets/index-21fcb01b.js   143.49 kB │ gzip: 46.02 kB
    ✓ built in 754ms
    ```
