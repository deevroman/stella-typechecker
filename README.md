Реализация тайпчекера для языка [Stella](https://fizruk.github.io/stella/), написанная на TypeScript

## Сборка и запуск

```bash
git clone git@github.com:deevroman/stella-typechecker.git && cd stella-typechecker
npm ci
npx webpack --config webpack.config.js --name cli
```

В папке dist_cli появился JS-бандл. Запустите его с помощью Node.js

```bash
node dist_cli/cli.js 
```

Должно работать с Node 22, 23.

[Шаги в GitHub Actions](https://github.com/deevroman/stella-typechecker/blob/master/.github/workflows/tests.yml)
