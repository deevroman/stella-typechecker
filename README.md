Тайпчекер для языка [Stella](https://fizruk.github.io/stella/), написанный на TypeScript

## Сборка и запуск

```bash
git clone git@github.com:deevroman/stella-typechecker.git && cd stella-typechecker
npm ci
npx webpack --config webpack.config.js --name cli
```

В папке dist_cli появится JS-бандл. Запустите его с помощью Node.js

```bash
node dist_cli/cli.js 
```

Должно работать с Node.js 22, 23.

[Пример сборки в GitHub Actions](https://github.com/deevroman/stella-typechecker/blob/master/.github/workflows/tests.yml)

CI красный поскольку последний шаг это прогон тестов, которые пока полностью не проходят.

<details>
<summary>запуск в браузере</summary>

Было бы странно не запустить TypeScript-код в браузере https://deevroman.github.io/stella-typechecker

Локальный запуск: `npm run dev`

</details>
