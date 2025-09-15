import {example} from "./examples";
import {SyntaxErrorReport, parseAndTypecheck} from "./typechecker";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import {tokenInfo} from "./utils";


const stellaKeywords = [
    "language", "core", "extend", "with",
    "fn", "return", "if", "then", "else",
    "let", "in", "as", "cast", "throw", "try", "catch",
    "panic!", "Top", "Bot", "Nat", "Bool", "Unit"
];

function stellaCompletion(context: CompletionContext) {
    let word = context.matchBefore(/\w*/);
    if (!word || (word.from == word.to && !context.explicit)) return null;
    return {
        from: word.from,
        options: stellaKeywords.map(kw => ({ label: kw, type: "keyword" }))
    };
}


if (typeof window !== undefined) {
    const myTheme = EditorView.theme({
        "&": {
            height: "50vh",
            background: "black",
        },
        ".cm-activeLine:not(::selection)": {
            backgroundColor: "#111111"
        },
        ".cm-selectionBackground": {
            backgroundColor: "rgba(0, 128, 255, 0.3)"
        },
        ".cm-selectionMatch": {
            backgroundColor: "rgba(255, 255, 0, 0.2)"
        },
        ".cm-content ::selection": {
            backgroundColor: "rgba(0, 128, 255, 0.3)",
            color: "white"
        },
    }, {dark: true});

    function check(code: string) {
        const typecheckResult = parseAndTypecheck(code);
        const resultDiv = document.getElementById("result")!
        if ("syntaxErrors" in typecheckResult) {
            resultDiv.textContent = typecheckResult.syntaxErrors.map(i => {
                return `line: ${i.line}:${i.charPositionInLine} ${i.message}\n`;
            }).join('\n');
        } else {
            resultDiv.textContent = JSON.stringify(typecheckResult, (key, value) => {
                if (key === "token") {
                    return tokenInfo(value);
                }
                return value;
            }, 2);
        }
    }

    const onUpdate = EditorView.updateListener.of(update => {
        if (!update.docChanged) {
            return;
        }
        check(update.state.doc.toString());
    });

    const editor = new EditorView({
        state: EditorState.create({
            doc: example,
            extensions: [basicSetup, myTheme, onUpdate, /*autocompletion({ override: [stellaCompletion] })*/],
        }),
        parent: document.getElementById("code")!
    });

    check(example);
}
