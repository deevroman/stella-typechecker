import {Token} from "antlr4ts/Token";

export function tokenInfo(t: Token) {
    return [t?.text, t?.tokenIndex]
}
