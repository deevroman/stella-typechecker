_antlr:
	 ./third-party/bnfc-2.9.5-mac.binary --antlr --java docs/Stella.cf -o antlr_from_bf

_parser:
	antlr4ts -no-listener -visitor -lib antlr_from_bf/stella antlr_from_bf/stella/StellaLexer.g4 -o src/gen/antlr -package stella
	antlr4ts -no-listener -visitor -lib antlr_from_bf/stella -lib src/gen/antlr/antlr_from_bf/stella antlr_from_bf/stella/StellaParser.g4 -o src/gen/antlr -package stella

parser:
	antlr4ts -no-listener -visitor -lib generic-main-antlr/antlr generic-main-antlr/antlr/stellaLexer.g4 generic-main-antlr/antlr/stellaParser.g4 -o src/gen -package stella

build_cli:
	npx webpack --config webpack.config.js --name cli

cli: build_cli
	node dist_cli/cli.js
