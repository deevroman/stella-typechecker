import {example} from "./examples";
import {SyntaxErrorReport, parseAndTypecheck} from "./typechecker";
import {CompletionContext, autocompletion} from "@codemirror/autocomplete";
import {EditorState} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {basicSetup} from "codemirror";
import {tokenInfo} from "./utils";


const stellaKeywords = [
    "language", "core", "extend", "with",
    "fn", "return", "if", "then", "else",
    "let", "in", "as", "cast", "throw", "try", "catch",
    "panic!", "Top", "Bot", "Nat", "Bool", "Unit"
];

const stellaExtensions = [
    "#ambiguous-type-as-bottom",
    "#arithmetic-operators",
    "#bottom-type",
    "#comparison-operators",
    "#endif",
    "#equirecursive-types",
    "#error",
    "#exception-type-declaration",
    "#exceptions",
    "#fixpoint-combinator",
    "#general-recursion",
    "#ifdef",
    "#include",
    "#inline-functions",
    "#integers",
    "#isorecursive-types",
    "#let-bindings",
    "#let-many-bindings",
    "#let-patterns",
    "#letrec-bindings",
    "#letrec-many-bindings",
    "#lists",
    "#logical-operators",
    "#multiparameter-functions",
    "#natural-literals",
    "#nested-function-declarations",
    "#no-return-type-as-auto",
    "#no-return-type-as-unit",
    "#nullary-functions",
    "#nullary-variant-labels",
    "#open-variant-exceptions",
    "#pairs",
    "#panic",
    "#pattern-ascriptions",
    "#predecessor",
    "#records",
    "#recursive-types",
    "#references",
    "#sequencing",
    "#structural-patterns",
    "#structural-subtyping",
    "#sum-types",
    "#throw-type-annotations",
    "#top-type",
    "#try-cast-as",
    "#tuples",
    "#type-aliases",
    "#type-ascriptions",
    "#type-cast",
    "#type-cast-patterns",
    "#type-reconstruction",
    "#unit-type",
    "#universal-types",
    "#variants"
]

function stellaCompletion(context: CompletionContext) {
    debugger
    let word = context.matchBefore(/[#\w]*/);
    if (!word || (word.from == word.to && !context.explicit)) return null;
    return {
        from: word.from,
        options: [...stellaKeywords, ...stellaExtensions].map(kw => ({label: kw, type: "keyword"}))
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
            extensions: [
                basicSetup,
                myTheme,
                onUpdate,
                autocompletion({
                    override: [stellaCompletion]
                })
            ],
        }),
        parent: document.getElementById("code")!
    });

    check(example);
}
