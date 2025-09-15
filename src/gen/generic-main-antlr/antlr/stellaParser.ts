// Generated from generic-main-antlr/antlr/stellaParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { stellaParserVisitor } from "./stellaParserVisitor";


export class stellaParser extends Parser {
	public static readonly Surrogate_id_SYMB_0 = 1;
	public static readonly Surrogate_id_SYMB_1 = 2;
	public static readonly Surrogate_id_SYMB_2 = 3;
	public static readonly Surrogate_id_SYMB_3 = 4;
	public static readonly Surrogate_id_SYMB_4 = 5;
	public static readonly Surrogate_id_SYMB_5 = 6;
	public static readonly Surrogate_id_SYMB_6 = 7;
	public static readonly Surrogate_id_SYMB_7 = 8;
	public static readonly Surrogate_id_SYMB_8 = 9;
	public static readonly Surrogate_id_SYMB_9 = 10;
	public static readonly Surrogate_id_SYMB_10 = 11;
	public static readonly Surrogate_id_SYMB_11 = 12;
	public static readonly Surrogate_id_SYMB_12 = 13;
	public static readonly Surrogate_id_SYMB_13 = 14;
	public static readonly Surrogate_id_SYMB_14 = 15;
	public static readonly Surrogate_id_SYMB_15 = 16;
	public static readonly Surrogate_id_SYMB_16 = 17;
	public static readonly Surrogate_id_SYMB_17 = 18;
	public static readonly Surrogate_id_SYMB_18 = 19;
	public static readonly Surrogate_id_SYMB_19 = 20;
	public static readonly Surrogate_id_SYMB_20 = 21;
	public static readonly Surrogate_id_SYMB_21 = 22;
	public static readonly Surrogate_id_SYMB_22 = 23;
	public static readonly Surrogate_id_SYMB_23 = 24;
	public static readonly Surrogate_id_SYMB_24 = 25;
	public static readonly Surrogate_id_SYMB_25 = 26;
	public static readonly Surrogate_id_SYMB_26 = 27;
	public static readonly Surrogate_id_SYMB_27 = 28;
	public static readonly Surrogate_id_SYMB_28 = 29;
	public static readonly Surrogate_id_SYMB_29 = 30;
	public static readonly Surrogate_id_SYMB_30 = 31;
	public static readonly Surrogate_id_SYMB_31 = 32;
	public static readonly Surrogate_id_SYMB_32 = 33;
	public static readonly Surrogate_id_SYMB_33 = 34;
	public static readonly Surrogate_id_SYMB_34 = 35;
	public static readonly Surrogate_id_SYMB_35 = 36;
	public static readonly Surrogate_id_SYMB_36 = 37;
	public static readonly Surrogate_id_SYMB_37 = 38;
	public static readonly Surrogate_id_SYMB_38 = 39;
	public static readonly Surrogate_id_SYMB_39 = 40;
	public static readonly Surrogate_id_SYMB_40 = 41;
	public static readonly Surrogate_id_SYMB_41 = 42;
	public static readonly Surrogate_id_SYMB_42 = 43;
	public static readonly Surrogate_id_SYMB_43 = 44;
	public static readonly Surrogate_id_SYMB_44 = 45;
	public static readonly Surrogate_id_SYMB_45 = 46;
	public static readonly Surrogate_id_SYMB_46 = 47;
	public static readonly Surrogate_id_SYMB_47 = 48;
	public static readonly Surrogate_id_SYMB_48 = 49;
	public static readonly Surrogate_id_SYMB_49 = 50;
	public static readonly Surrogate_id_SYMB_50 = 51;
	public static readonly Surrogate_id_SYMB_51 = 52;
	public static readonly Surrogate_id_SYMB_52 = 53;
	public static readonly Surrogate_id_SYMB_53 = 54;
	public static readonly Surrogate_id_SYMB_54 = 55;
	public static readonly Surrogate_id_SYMB_55 = 56;
	public static readonly Surrogate_id_SYMB_56 = 57;
	public static readonly Surrogate_id_SYMB_57 = 58;
	public static readonly Surrogate_id_SYMB_58 = 59;
	public static readonly Surrogate_id_SYMB_59 = 60;
	public static readonly Surrogate_id_SYMB_60 = 61;
	public static readonly Surrogate_id_SYMB_61 = 62;
	public static readonly Surrogate_id_SYMB_62 = 63;
	public static readonly Surrogate_id_SYMB_63 = 64;
	public static readonly Surrogate_id_SYMB_64 = 65;
	public static readonly Surrogate_id_SYMB_65 = 66;
	public static readonly EXCEPTION = 67;
	public static readonly VARIANT = 68;
	public static readonly CAST = 69;
	public static readonly ASSIGN = 70;
	public static readonly REF_TYPE = 71;
	public static readonly REFERENCE = 72;
	public static readonly PANIC = 73;
	public static readonly THROW = 74;
	public static readonly TRY = 75;
	public static readonly CATCH = 76;
	public static readonly TOP_TYPE = 77;
	public static readonly BOTTOM_TYPE = 78;
	public static readonly AUTO_TYPE = 79;
	public static readonly GENERIC = 80;
	public static readonly FORALL = 81;
	public static readonly COMMENT_antlr_builtin = 82;
	public static readonly MULTICOMMENT_antlr_builtin = 83;
	public static readonly StellaIdent = 84;
	public static readonly ExtensionName = 85;
	public static readonly MemoryAddress = 86;
	public static readonly INTEGER = 87;
	public static readonly WS = 88;
	public static readonly ErrorToken = 89;
	public static readonly RULE_start_Program = 0;
	public static readonly RULE_start_Expr = 1;
	public static readonly RULE_start_Type = 2;
	public static readonly RULE_program = 3;
	public static readonly RULE_languageDecl = 4;
	public static readonly RULE_extension = 5;
	public static readonly RULE_decl = 6;
	public static readonly RULE_annotation = 7;
	public static readonly RULE_paramDecl = 8;
	public static readonly RULE_expr = 9;
	public static readonly RULE_patternBinding = 10;
	public static readonly RULE_binding = 11;
	public static readonly RULE_matchCase = 12;
	public static readonly RULE_pattern = 13;
	public static readonly RULE_labelledPattern = 14;
	public static readonly RULE_stellatype = 15;
	public static readonly RULE_recordFieldType = 16;
	public static readonly RULE_variantFieldType = 17;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start_Program", "start_Expr", "start_Type", "program", "languageDecl",
		"extension", "decl", "annotation", "paramDecl", "expr", "patternBinding",
		"binding", "matchCase", "pattern", "labelledPattern", "stellatype", "recordFieldType",
		"variantFieldType",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "','", "';'", "'('", "')'", "'{'", "'}'", "'='", "':'", "'->'",
		"'=>'", "'|'", "'<|'", "'|>'", "'['", "']'", "'<'", "'<='", "'>'", "'>='",
		"'=='", "'!='", "'+'", "'-'", "'*'", "'/'", "'.'", "'List::head'", "'List::isempty'",
		"'List::tail'", "'Nat::pred'", "'Nat::iszero'", "'Nat::rec'", "'Bool'",
		"'Nat'", "'Unit'", "'and'", "'as'", "'cons'", "'core'", "'else'", "'extend'",
		"'false'", "'fix'", "'fn'", "'fold'", "'if'", "'in'", "'inl'", "'inline'",
		"'inr'", "'language'", "'let'", "'letrec'", "'match'", "'not'", "'or'",
		"'return'", "'succ'", "'then'", "'throws'", "'true'", "'type'", "'unfold'",
		"'unit'", "'with'", "'\u00B5'", "'exception'", "'variant'", "'cast'",
		"':='", "'&'", "'new'", "'panic!'", "'throw'", "'try'", "'catch'", "'Top'",
		"'Bot'", "'auto'", "'generic'", "'forall'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "Surrogate_id_SYMB_0", "Surrogate_id_SYMB_1", "Surrogate_id_SYMB_2",
		"Surrogate_id_SYMB_3", "Surrogate_id_SYMB_4", "Surrogate_id_SYMB_5", "Surrogate_id_SYMB_6",
		"Surrogate_id_SYMB_7", "Surrogate_id_SYMB_8", "Surrogate_id_SYMB_9", "Surrogate_id_SYMB_10",
		"Surrogate_id_SYMB_11", "Surrogate_id_SYMB_12", "Surrogate_id_SYMB_13",
		"Surrogate_id_SYMB_14", "Surrogate_id_SYMB_15", "Surrogate_id_SYMB_16",
		"Surrogate_id_SYMB_17", "Surrogate_id_SYMB_18", "Surrogate_id_SYMB_19",
		"Surrogate_id_SYMB_20", "Surrogate_id_SYMB_21", "Surrogate_id_SYMB_22",
		"Surrogate_id_SYMB_23", "Surrogate_id_SYMB_24", "Surrogate_id_SYMB_25",
		"Surrogate_id_SYMB_26", "Surrogate_id_SYMB_27", "Surrogate_id_SYMB_28",
		"Surrogate_id_SYMB_29", "Surrogate_id_SYMB_30", "Surrogate_id_SYMB_31",
		"Surrogate_id_SYMB_32", "Surrogate_id_SYMB_33", "Surrogate_id_SYMB_34",
		"Surrogate_id_SYMB_35", "Surrogate_id_SYMB_36", "Surrogate_id_SYMB_37",
		"Surrogate_id_SYMB_38", "Surrogate_id_SYMB_39", "Surrogate_id_SYMB_40",
		"Surrogate_id_SYMB_41", "Surrogate_id_SYMB_42", "Surrogate_id_SYMB_43",
		"Surrogate_id_SYMB_44", "Surrogate_id_SYMB_45", "Surrogate_id_SYMB_46",
		"Surrogate_id_SYMB_47", "Surrogate_id_SYMB_48", "Surrogate_id_SYMB_49",
		"Surrogate_id_SYMB_50", "Surrogate_id_SYMB_51", "Surrogate_id_SYMB_52",
		"Surrogate_id_SYMB_53", "Surrogate_id_SYMB_54", "Surrogate_id_SYMB_55",
		"Surrogate_id_SYMB_56", "Surrogate_id_SYMB_57", "Surrogate_id_SYMB_58",
		"Surrogate_id_SYMB_59", "Surrogate_id_SYMB_60", "Surrogate_id_SYMB_61",
		"Surrogate_id_SYMB_62", "Surrogate_id_SYMB_63", "Surrogate_id_SYMB_64",
		"Surrogate_id_SYMB_65", "EXCEPTION", "VARIANT", "CAST", "ASSIGN", "REF_TYPE",
		"REFERENCE", "PANIC", "THROW", "TRY", "CATCH", "TOP_TYPE", "BOTTOM_TYPE",
		"AUTO_TYPE", "GENERIC", "FORALL", "COMMENT_antlr_builtin", "MULTICOMMENT_antlr_builtin",
		"StellaIdent", "ExtensionName", "MemoryAddress", "INTEGER", "WS", "ErrorToken",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(stellaParser._LITERAL_NAMES, stellaParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return stellaParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "stellaParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return stellaParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return stellaParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(stellaParser._ATN, this);
	}
	// @RuleVersion(0)
	public start_Program(): Start_ProgramContext {
		let _localctx: Start_ProgramContext = new Start_ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, stellaParser.RULE_start_Program);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			_localctx._x = this.program();
			this.state = 37;
			this.match(stellaParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public start_Expr(): Start_ExprContext {
		let _localctx: Start_ExprContext = new Start_ExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, stellaParser.RULE_start_Expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 39;
			_localctx._x = this.expr(0);
			this.state = 40;
			this.match(stellaParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public start_Type(): Start_TypeContext {
		let _localctx: Start_TypeContext = new Start_TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, stellaParser.RULE_start_Type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 42;
			_localctx._x = this.stellatype(0);
			this.state = 43;
			this.match(stellaParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, stellaParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 45;
			this.languageDecl();
			this.state = 49;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === stellaParser.Surrogate_id_SYMB_40) {
				{
				{
				this.state = 46;
				_localctx._extension = this.extension();
				_localctx._extensions.push(_localctx._extension);
				}
				}
				this.state = 51;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 55;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (stellaParser.Surrogate_id_SYMB_43 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_48 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_61 - 44)) | (1 << (stellaParser.EXCEPTION - 44)))) !== 0) || _la === stellaParser.GENERIC) {
				{
				{
				this.state = 52;
				_localctx._decl = this.decl();
				_localctx._decls.push(_localctx._decl);
				}
				}
				this.state = 57;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public languageDecl(): LanguageDeclContext {
		let _localctx: LanguageDeclContext = new LanguageDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, stellaParser.RULE_languageDecl);
		try {
			_localctx = new LanguageCoreContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 58;
			this.match(stellaParser.Surrogate_id_SYMB_50);
			this.state = 59;
			this.match(stellaParser.Surrogate_id_SYMB_38);
			this.state = 60;
			this.match(stellaParser.Surrogate_id_SYMB_1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public extension(): ExtensionContext {
		let _localctx: ExtensionContext = new ExtensionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, stellaParser.RULE_extension);
		let _la: number;
		try {
			_localctx = new AnExtensionContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 62;
			this.match(stellaParser.Surrogate_id_SYMB_40);
			this.state = 63;
			this.match(stellaParser.Surrogate_id_SYMB_64);
			this.state = 64;
			(_localctx as AnExtensionContext)._ExtensionName = this.match(stellaParser.ExtensionName);
			(_localctx as AnExtensionContext)._extensionNames.push((_localctx as AnExtensionContext)._ExtensionName);
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === stellaParser.Surrogate_id_SYMB_0) {
				{
				{
				this.state = 65;
				this.match(stellaParser.Surrogate_id_SYMB_0);
				this.state = 66;
				(_localctx as AnExtensionContext)._ExtensionName = this.match(stellaParser.ExtensionName);
				(_localctx as AnExtensionContext)._extensionNames.push((_localctx as AnExtensionContext)._ExtensionName);
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 72;
			this.match(stellaParser.Surrogate_id_SYMB_1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decl(): DeclContext {
		let _localctx: DeclContext = new DeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, stellaParser.RULE_decl);
		let _la: number;
		try {
			this.state = 190;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				_localctx = new DeclFunContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 77;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_48) {
					{
					{
					this.state = 74;
					(_localctx as DeclFunContext)._annotation = this.annotation();
					(_localctx as DeclFunContext)._annotations.push((_localctx as DeclFunContext)._annotation);
					}
					}
					this.state = 79;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 80;
				this.match(stellaParser.Surrogate_id_SYMB_43);
				this.state = 81;
				(_localctx as DeclFunContext)._name = this.match(stellaParser.StellaIdent);
				this.state = 82;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 91;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.StellaIdent) {
					{
					this.state = 83;
					(_localctx as DeclFunContext)._paramDecl = this.paramDecl();
					(_localctx as DeclFunContext)._paramDecls.push((_localctx as DeclFunContext)._paramDecl);
					this.state = 88;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 84;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 85;
						(_localctx as DeclFunContext)._paramDecl = this.paramDecl();
						(_localctx as DeclFunContext)._paramDecls.push((_localctx as DeclFunContext)._paramDecl);
						}
						}
						this.state = 90;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 93;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_8) {
					{
					this.state = 94;
					this.match(stellaParser.Surrogate_id_SYMB_8);
					this.state = 95;
					(_localctx as DeclFunContext)._returnType = this.stellatype(0);
					}
				}

				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_59) {
					{
					this.state = 98;
					this.match(stellaParser.Surrogate_id_SYMB_59);
					this.state = 99;
					(_localctx as DeclFunContext)._stellatype = this.stellatype(0);
					(_localctx as DeclFunContext)._throwTypes.push((_localctx as DeclFunContext)._stellatype);
					this.state = 104;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 100;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 101;
						(_localctx as DeclFunContext)._stellatype = this.stellatype(0);
						(_localctx as DeclFunContext)._throwTypes.push((_localctx as DeclFunContext)._stellatype);
						}
						}
						this.state = 106;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 109;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 113;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (stellaParser.Surrogate_id_SYMB_43 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_48 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_61 - 44)) | (1 << (stellaParser.EXCEPTION - 44)))) !== 0) || _la === stellaParser.GENERIC) {
					{
					{
					this.state = 110;
					(_localctx as DeclFunContext)._decl = this.decl();
					(_localctx as DeclFunContext)._localDecls.push((_localctx as DeclFunContext)._decl);
					}
					}
					this.state = 115;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 116;
				this.match(stellaParser.Surrogate_id_SYMB_56);
				this.state = 117;
				(_localctx as DeclFunContext)._returnExpr = this.expr(0);
				this.state = 118;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 2:
				_localctx = new DeclFunGenericContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 123;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_48) {
					{
					{
					this.state = 120;
					(_localctx as DeclFunGenericContext)._annotation = this.annotation();
					(_localctx as DeclFunGenericContext)._annotations.push((_localctx as DeclFunGenericContext)._annotation);
					}
					}
					this.state = 125;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 126;
				this.match(stellaParser.GENERIC);
				this.state = 127;
				this.match(stellaParser.Surrogate_id_SYMB_43);
				this.state = 128;
				(_localctx as DeclFunGenericContext)._name = this.match(stellaParser.StellaIdent);
				this.state = 129;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 130;
				(_localctx as DeclFunGenericContext)._StellaIdent = this.match(stellaParser.StellaIdent);
				(_localctx as DeclFunGenericContext)._generics.push((_localctx as DeclFunGenericContext)._StellaIdent);
				this.state = 135;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 131;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 132;
					(_localctx as DeclFunGenericContext)._StellaIdent = this.match(stellaParser.StellaIdent);
					(_localctx as DeclFunGenericContext)._generics.push((_localctx as DeclFunGenericContext)._StellaIdent);
					}
					}
					this.state = 137;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 138;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				this.state = 139;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.StellaIdent) {
					{
					this.state = 140;
					(_localctx as DeclFunGenericContext)._paramDecl = this.paramDecl();
					(_localctx as DeclFunGenericContext)._paramDecls.push((_localctx as DeclFunGenericContext)._paramDecl);
					this.state = 145;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 141;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 142;
						(_localctx as DeclFunGenericContext)._paramDecl = this.paramDecl();
						(_localctx as DeclFunGenericContext)._paramDecls.push((_localctx as DeclFunGenericContext)._paramDecl);
						}
						}
						this.state = 147;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 150;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				this.state = 153;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_8) {
					{
					this.state = 151;
					this.match(stellaParser.Surrogate_id_SYMB_8);
					this.state = 152;
					(_localctx as DeclFunGenericContext)._returnType = this.stellatype(0);
					}
				}

				this.state = 164;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_59) {
					{
					this.state = 155;
					this.match(stellaParser.Surrogate_id_SYMB_59);
					this.state = 156;
					(_localctx as DeclFunGenericContext)._stellatype = this.stellatype(0);
					(_localctx as DeclFunGenericContext)._throwTypes.push((_localctx as DeclFunGenericContext)._stellatype);
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 157;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 158;
						(_localctx as DeclFunGenericContext)._stellatype = this.stellatype(0);
						(_localctx as DeclFunGenericContext)._throwTypes.push((_localctx as DeclFunGenericContext)._stellatype);
						}
						}
						this.state = 163;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 166;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 170;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (stellaParser.Surrogate_id_SYMB_43 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_48 - 44)) | (1 << (stellaParser.Surrogate_id_SYMB_61 - 44)) | (1 << (stellaParser.EXCEPTION - 44)))) !== 0) || _la === stellaParser.GENERIC) {
					{
					{
					this.state = 167;
					(_localctx as DeclFunGenericContext)._decl = this.decl();
					(_localctx as DeclFunGenericContext)._localDecls.push((_localctx as DeclFunGenericContext)._decl);
					}
					}
					this.state = 172;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 173;
				this.match(stellaParser.Surrogate_id_SYMB_56);
				this.state = 174;
				(_localctx as DeclFunGenericContext)._returnExpr = this.expr(0);
				this.state = 175;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 3:
				_localctx = new DeclTypeAliasContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 177;
				this.match(stellaParser.Surrogate_id_SYMB_61);
				this.state = 178;
				(_localctx as DeclTypeAliasContext)._name = this.match(stellaParser.StellaIdent);
				this.state = 179;
				this.match(stellaParser.Surrogate_id_SYMB_6);
				this.state = 180;
				(_localctx as DeclTypeAliasContext)._atype = this.stellatype(0);
				}
				break;

			case 4:
				_localctx = new DeclExceptionTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 181;
				this.match(stellaParser.EXCEPTION);
				this.state = 182;
				this.match(stellaParser.Surrogate_id_SYMB_61);
				this.state = 183;
				this.match(stellaParser.Surrogate_id_SYMB_6);
				this.state = 184;
				(_localctx as DeclExceptionTypeContext)._exceptionType = this.stellatype(0);
				}
				break;

			case 5:
				_localctx = new DeclExceptionVariantContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 185;
				this.match(stellaParser.EXCEPTION);
				this.state = 186;
				this.match(stellaParser.VARIANT);
				this.state = 187;
				(_localctx as DeclExceptionVariantContext)._name = this.match(stellaParser.StellaIdent);
				this.state = 188;
				this.match(stellaParser.Surrogate_id_SYMB_7);
				this.state = 189;
				(_localctx as DeclExceptionVariantContext)._variantType = this.stellatype(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation(): AnnotationContext {
		let _localctx: AnnotationContext = new AnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, stellaParser.RULE_annotation);
		try {
			_localctx = new InlineAnnotationContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 192;
			this.match(stellaParser.Surrogate_id_SYMB_48);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramDecl(): ParamDeclContext {
		let _localctx: ParamDeclContext = new ParamDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, stellaParser.RULE_paramDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 194;
			_localctx._name = this.match(stellaParser.StellaIdent);
			this.state = 195;
			this.match(stellaParser.Surrogate_id_SYMB_7);
			this.state = 196;
			_localctx._paramType = this.stellatype(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 18;
		this.enterRecursionRule(_localctx, 18, stellaParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 452;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				_localctx = new ConstTrueContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 199;
				this.match(stellaParser.Surrogate_id_SYMB_60);
				}
				break;

			case 2:
				{
				_localctx = new ConstFalseContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 200;
				this.match(stellaParser.Surrogate_id_SYMB_41);
				}
				break;

			case 3:
				{
				_localctx = new ConstUnitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 201;
				this.match(stellaParser.Surrogate_id_SYMB_63);
				}
				break;

			case 4:
				{
				_localctx = new ConstIntContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 202;
				(_localctx as ConstIntContext)._n = this.match(stellaParser.INTEGER);
				}
				break;

			case 5:
				{
				_localctx = new ConstMemoryContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 203;
				(_localctx as ConstMemoryContext)._mem = this.match(stellaParser.MemoryAddress);
				}
				break;

			case 6:
				{
				_localctx = new VarContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 204;
				(_localctx as VarContext)._name = this.match(stellaParser.StellaIdent);
				}
				break;

			case 7:
				{
				_localctx = new PanicContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 205;
				this.match(stellaParser.PANIC);
				}
				break;

			case 8:
				{
				_localctx = new ThrowContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 206;
				this.match(stellaParser.THROW);
				this.state = 207;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 208;
				(_localctx as ThrowContext)._expr_ = this.expr(0);
				this.state = 209;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 9:
				{
				_localctx = new TryCatchContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 211;
				this.match(stellaParser.TRY);
				this.state = 212;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 213;
				(_localctx as TryCatchContext)._tryExpr = this.expr(0);
				this.state = 214;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				this.state = 215;
				this.match(stellaParser.CATCH);
				this.state = 216;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 217;
				(_localctx as TryCatchContext)._pat = this.pattern(0);
				this.state = 218;
				this.match(stellaParser.Surrogate_id_SYMB_9);
				this.state = 219;
				(_localctx as TryCatchContext)._fallbackExpr = this.expr(0);
				this.state = 220;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 10:
				{
				_localctx = new TryCastAsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 222;
				this.match(stellaParser.TRY);
				this.state = 223;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 224;
				(_localctx as TryCastAsContext)._tryExpr = this.expr(0);
				this.state = 225;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				this.state = 226;
				this.match(stellaParser.CAST);
				this.state = 227;
				this.match(stellaParser.Surrogate_id_SYMB_36);
				this.state = 228;
				(_localctx as TryCastAsContext)._type_ = this.stellatype(0);
				this.state = 229;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 230;
				(_localctx as TryCastAsContext)._pattern_ = this.pattern(0);
				this.state = 231;
				this.match(stellaParser.Surrogate_id_SYMB_9);
				this.state = 232;
				(_localctx as TryCastAsContext)._expr_ = this.expr(0);
				this.state = 233;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				this.state = 234;
				this.match(stellaParser.Surrogate_id_SYMB_64);
				this.state = 235;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 236;
				(_localctx as TryCastAsContext)._fallbackExpr = this.expr(0);
				this.state = 237;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 11:
				{
				_localctx = new TryWithContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 239;
				this.match(stellaParser.TRY);
				this.state = 240;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 241;
				(_localctx as TryWithContext)._tryExpr = this.expr(0);
				this.state = 242;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				this.state = 243;
				this.match(stellaParser.Surrogate_id_SYMB_64);
				this.state = 244;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 245;
				(_localctx as TryWithContext)._fallbackExpr = this.expr(0);
				this.state = 246;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 12:
				{
				_localctx = new InlContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 248;
				this.match(stellaParser.Surrogate_id_SYMB_47);
				this.state = 249;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 250;
				(_localctx as InlContext)._expr_ = this.expr(0);
				this.state = 251;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 13:
				{
				_localctx = new InrContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 253;
				this.match(stellaParser.Surrogate_id_SYMB_49);
				this.state = 254;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 255;
				(_localctx as InrContext)._expr_ = this.expr(0);
				this.state = 256;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 14:
				{
				_localctx = new ConsListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 258;
				this.match(stellaParser.Surrogate_id_SYMB_37);
				this.state = 259;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 260;
				(_localctx as ConsListContext)._head = this.expr(0);
				this.state = 261;
				this.match(stellaParser.Surrogate_id_SYMB_0);
				this.state = 262;
				(_localctx as ConsListContext)._tail = this.expr(0);
				this.state = 263;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 15:
				{
				_localctx = new HeadContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 265;
				this.match(stellaParser.Surrogate_id_SYMB_26);
				this.state = 266;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 267;
				(_localctx as HeadContext)._list = this.expr(0);
				this.state = 268;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 16:
				{
				_localctx = new IsEmptyContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 270;
				this.match(stellaParser.Surrogate_id_SYMB_27);
				this.state = 271;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 272;
				(_localctx as IsEmptyContext)._list = this.expr(0);
				this.state = 273;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 17:
				{
				_localctx = new TailContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 275;
				this.match(stellaParser.Surrogate_id_SYMB_28);
				this.state = 276;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 277;
				(_localctx as TailContext)._list = this.expr(0);
				this.state = 278;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 18:
				{
				_localctx = new SuccContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 280;
				this.match(stellaParser.Surrogate_id_SYMB_57);
				this.state = 281;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 282;
				(_localctx as SuccContext)._n = this.expr(0);
				this.state = 283;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 19:
				{
				_localctx = new LogicNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 285;
				this.match(stellaParser.Surrogate_id_SYMB_54);
				this.state = 286;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 287;
				(_localctx as LogicNotContext)._expr_ = this.expr(0);
				this.state = 288;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 20:
				{
				_localctx = new PredContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 290;
				this.match(stellaParser.Surrogate_id_SYMB_29);
				this.state = 291;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 292;
				(_localctx as PredContext)._n = this.expr(0);
				this.state = 293;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 21:
				{
				_localctx = new IsZeroContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 295;
				this.match(stellaParser.Surrogate_id_SYMB_30);
				this.state = 296;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 297;
				(_localctx as IsZeroContext)._n = this.expr(0);
				this.state = 298;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 22:
				{
				_localctx = new FixContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 300;
				this.match(stellaParser.Surrogate_id_SYMB_42);
				this.state = 301;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 302;
				(_localctx as FixContext)._expr_ = this.expr(0);
				this.state = 303;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 23:
				{
				_localctx = new NatRecContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 305;
				this.match(stellaParser.Surrogate_id_SYMB_31);
				this.state = 306;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 307;
				(_localctx as NatRecContext)._n = this.expr(0);
				this.state = 308;
				this.match(stellaParser.Surrogate_id_SYMB_0);
				this.state = 309;
				(_localctx as NatRecContext)._initial = this.expr(0);
				this.state = 310;
				this.match(stellaParser.Surrogate_id_SYMB_0);
				this.state = 311;
				(_localctx as NatRecContext)._step = this.expr(0);
				this.state = 312;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 24:
				{
				_localctx = new FoldContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 314;
				this.match(stellaParser.Surrogate_id_SYMB_44);
				this.state = 315;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 316;
				(_localctx as FoldContext)._type_ = this.stellatype(0);
				this.state = 317;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				this.state = 318;
				(_localctx as FoldContext)._expr_ = this.expr(34);
				}
				break;

			case 25:
				{
				_localctx = new UnfoldContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 320;
				this.match(stellaParser.Surrogate_id_SYMB_62);
				this.state = 321;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 322;
				(_localctx as UnfoldContext)._type_ = this.stellatype(0);
				this.state = 323;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				this.state = 324;
				(_localctx as UnfoldContext)._expr_ = this.expr(33);
				}
				break;

			case 26:
				{
				_localctx = new RefContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 326;
				this.match(stellaParser.REFERENCE);
				this.state = 327;
				(_localctx as RefContext)._expr_ = this.expr(27);
				}
				break;

			case 27:
				{
				_localctx = new DerefContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 328;
				this.match(stellaParser.Surrogate_id_SYMB_23);
				this.state = 329;
				(_localctx as DerefContext)._expr_ = this.expr(26);
				}
				break;

			case 28:
				{
				_localctx = new AbstractionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 330;
				this.match(stellaParser.Surrogate_id_SYMB_43);
				this.state = 331;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 340;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.StellaIdent) {
					{
					this.state = 332;
					(_localctx as AbstractionContext)._paramDecl = this.paramDecl();
					(_localctx as AbstractionContext)._paramDecls.push((_localctx as AbstractionContext)._paramDecl);
					this.state = 337;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 333;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 334;
						(_localctx as AbstractionContext)._paramDecl = this.paramDecl();
						(_localctx as AbstractionContext)._paramDecls.push((_localctx as AbstractionContext)._paramDecl);
						}
						}
						this.state = 339;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 342;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				this.state = 343;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 344;
				this.match(stellaParser.Surrogate_id_SYMB_56);
				this.state = 345;
				(_localctx as AbstractionContext)._returnExpr = this.expr(0);
				this.state = 346;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 29:
				{
				_localctx = new TupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 348;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 357;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13) | (1 << stellaParser.Surrogate_id_SYMB_23) | (1 << stellaParser.Surrogate_id_SYMB_26) | (1 << stellaParser.Surrogate_id_SYMB_27) | (1 << stellaParser.Surrogate_id_SYMB_28) | (1 << stellaParser.Surrogate_id_SYMB_29) | (1 << stellaParser.Surrogate_id_SYMB_30))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (stellaParser.Surrogate_id_SYMB_31 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_37 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_42 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_43 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_44 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_45 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_51 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_52 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_53 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_54 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_62 - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (stellaParser.Surrogate_id_SYMB_63 - 64)) | (1 << (stellaParser.REFERENCE - 64)) | (1 << (stellaParser.PANIC - 64)) | (1 << (stellaParser.THROW - 64)) | (1 << (stellaParser.TRY - 64)) | (1 << (stellaParser.GENERIC - 64)) | (1 << (stellaParser.StellaIdent - 64)) | (1 << (stellaParser.MemoryAddress - 64)) | (1 << (stellaParser.INTEGER - 64)))) !== 0)) {
					{
					this.state = 349;
					(_localctx as TupleContext)._expr = this.expr(0);
					(_localctx as TupleContext)._exprs.push((_localctx as TupleContext)._expr);
					this.state = 354;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 350;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 351;
						(_localctx as TupleContext)._expr = this.expr(0);
						(_localctx as TupleContext)._exprs.push((_localctx as TupleContext)._expr);
						}
						}
						this.state = 356;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 359;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 30:
				{
				_localctx = new RecordContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 360;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 361;
				(_localctx as RecordContext)._binding = this.binding();
				(_localctx as RecordContext)._bindings.push((_localctx as RecordContext)._binding);
				this.state = 366;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 362;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 363;
					(_localctx as RecordContext)._binding = this.binding();
					(_localctx as RecordContext)._bindings.push((_localctx as RecordContext)._binding);
					}
					}
					this.state = 368;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 369;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 31:
				{
				_localctx = new VariantContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 371;
				this.match(stellaParser.Surrogate_id_SYMB_11);
				this.state = 372;
				(_localctx as VariantContext)._label = this.match(stellaParser.StellaIdent);
				this.state = 375;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_6) {
					{
					this.state = 373;
					this.match(stellaParser.Surrogate_id_SYMB_6);
					this.state = 374;
					(_localctx as VariantContext)._rhs = this.expr(0);
					}
				}

				this.state = 377;
				this.match(stellaParser.Surrogate_id_SYMB_12);
				}
				break;

			case 32:
				{
				_localctx = new MatchContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 378;
				this.match(stellaParser.Surrogate_id_SYMB_53);
				this.state = 379;
				(_localctx as MatchContext)._expr_ = this.expr(0);
				this.state = 380;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13))) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (stellaParser.Surrogate_id_SYMB_37 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_63 - 38)))) !== 0) || _la === stellaParser.StellaIdent || _la === stellaParser.INTEGER) {
					{
					this.state = 381;
					(_localctx as MatchContext)._matchCase = this.matchCase();
					(_localctx as MatchContext)._cases.push((_localctx as MatchContext)._matchCase);
					this.state = 386;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_10) {
						{
						{
						this.state = 382;
						this.match(stellaParser.Surrogate_id_SYMB_10);
						this.state = 383;
						(_localctx as MatchContext)._matchCase = this.matchCase();
						(_localctx as MatchContext)._cases.push((_localctx as MatchContext)._matchCase);
						}
						}
						this.state = 388;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 391;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 33:
				{
				_localctx = new ListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 393;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 402;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13) | (1 << stellaParser.Surrogate_id_SYMB_23) | (1 << stellaParser.Surrogate_id_SYMB_26) | (1 << stellaParser.Surrogate_id_SYMB_27) | (1 << stellaParser.Surrogate_id_SYMB_28) | (1 << stellaParser.Surrogate_id_SYMB_29) | (1 << stellaParser.Surrogate_id_SYMB_30))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (stellaParser.Surrogate_id_SYMB_31 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_37 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_42 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_43 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_44 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_45 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_51 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_52 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_53 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_54 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_62 - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (stellaParser.Surrogate_id_SYMB_63 - 64)) | (1 << (stellaParser.REFERENCE - 64)) | (1 << (stellaParser.PANIC - 64)) | (1 << (stellaParser.THROW - 64)) | (1 << (stellaParser.TRY - 64)) | (1 << (stellaParser.GENERIC - 64)) | (1 << (stellaParser.StellaIdent - 64)) | (1 << (stellaParser.MemoryAddress - 64)) | (1 << (stellaParser.INTEGER - 64)))) !== 0)) {
					{
					this.state = 394;
					(_localctx as ListContext)._expr = this.expr(0);
					(_localctx as ListContext)._exprs.push((_localctx as ListContext)._expr);
					this.state = 399;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 395;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 396;
						(_localctx as ListContext)._expr = this.expr(0);
						(_localctx as ListContext)._exprs.push((_localctx as ListContext)._expr);
						}
						}
						this.state = 401;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 404;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				}
				break;

			case 34:
				{
				_localctx = new IfContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 405;
				this.match(stellaParser.Surrogate_id_SYMB_45);
				this.state = 406;
				(_localctx as IfContext)._condition = this.expr(0);
				this.state = 407;
				this.match(stellaParser.Surrogate_id_SYMB_58);
				this.state = 408;
				(_localctx as IfContext)._thenExpr = this.expr(0);
				this.state = 409;
				this.match(stellaParser.Surrogate_id_SYMB_39);
				this.state = 410;
				(_localctx as IfContext)._elseExpr = this.expr(7);
				}
				break;

			case 35:
				{
				_localctx = new LetContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 412;
				this.match(stellaParser.Surrogate_id_SYMB_51);
				this.state = 413;
				(_localctx as LetContext)._patternBinding = this.patternBinding();
				(_localctx as LetContext)._patternBindings.push((_localctx as LetContext)._patternBinding);
				this.state = 418;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 414;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 415;
					(_localctx as LetContext)._patternBinding = this.patternBinding();
					(_localctx as LetContext)._patternBindings.push((_localctx as LetContext)._patternBinding);
					}
					}
					this.state = 420;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 421;
				this.match(stellaParser.Surrogate_id_SYMB_46);
				this.state = 422;
				(_localctx as LetContext)._body = this.expr(5);
				}
				break;

			case 36:
				{
				_localctx = new LetRecContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 424;
				this.match(stellaParser.Surrogate_id_SYMB_52);
				this.state = 425;
				(_localctx as LetRecContext)._patternBinding = this.patternBinding();
				(_localctx as LetRecContext)._patternBindings.push((_localctx as LetRecContext)._patternBinding);
				this.state = 430;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 426;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 427;
					(_localctx as LetRecContext)._patternBinding = this.patternBinding();
					(_localctx as LetRecContext)._patternBindings.push((_localctx as LetRecContext)._patternBinding);
					}
					}
					this.state = 432;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 433;
				this.match(stellaParser.Surrogate_id_SYMB_46);
				this.state = 434;
				(_localctx as LetRecContext)._body = this.expr(4);
				}
				break;

			case 37:
				{
				_localctx = new TypeAbstractionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 436;
				this.match(stellaParser.GENERIC);
				this.state = 437;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 438;
				(_localctx as TypeAbstractionContext)._StellaIdent = this.match(stellaParser.StellaIdent);
				(_localctx as TypeAbstractionContext)._generics.push((_localctx as TypeAbstractionContext)._StellaIdent);
				this.state = 443;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 439;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 440;
					(_localctx as TypeAbstractionContext)._StellaIdent = this.match(stellaParser.StellaIdent);
					(_localctx as TypeAbstractionContext)._generics.push((_localctx as TypeAbstractionContext)._StellaIdent);
					}
					}
					this.state = 445;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 446;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				this.state = 447;
				(_localctx as TypeAbstractionContext)._expr_ = this.expr(3);
				}
				break;

			case 38:
				{
				_localctx = new ParenthesisedExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 448;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 449;
				(_localctx as ParenthesisedExprContext)._expr_ = this.expr(0);
				this.state = 450;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 538;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 536;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
					case 1:
						{
						_localctx = new MultiplyContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MultiplyContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 454;
						if (!(this.precpred(this._ctx, 30))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 30)");
						}
						this.state = 455;
						this.match(stellaParser.Surrogate_id_SYMB_23);
						this.state = 456;
						(_localctx as MultiplyContext)._right = this.expr(31);
						}
						break;

					case 2:
						{
						_localctx = new DivideContext(new ExprContext(_parentctx, _parentState));
						(_localctx as DivideContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 457;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 458;
						this.match(stellaParser.Surrogate_id_SYMB_24);
						this.state = 459;
						(_localctx as DivideContext)._right = this.expr(30);
						}
						break;

					case 3:
						{
						_localctx = new LogicAndContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LogicAndContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 460;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 461;
						this.match(stellaParser.Surrogate_id_SYMB_35);
						this.state = 462;
						(_localctx as LogicAndContext)._right = this.expr(29);
						}
						break;

					case 4:
						{
						_localctx = new AddContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AddContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 463;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 464;
						this.match(stellaParser.Surrogate_id_SYMB_21);
						this.state = 465;
						(_localctx as AddContext)._right = this.expr(26);
						}
						break;

					case 5:
						{
						_localctx = new SubtractContext(new ExprContext(_parentctx, _parentState));
						(_localctx as SubtractContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 466;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 467;
						this.match(stellaParser.Surrogate_id_SYMB_22);
						this.state = 468;
						(_localctx as SubtractContext)._right = this.expr(25);
						}
						break;

					case 6:
						{
						_localctx = new LogicOrContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LogicOrContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 469;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 470;
						this.match(stellaParser.Surrogate_id_SYMB_55);
						this.state = 471;
						(_localctx as LogicOrContext)._right = this.expr(24);
						}
						break;

					case 7:
						{
						_localctx = new LessThanContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LessThanContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 472;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 473;
						this.match(stellaParser.Surrogate_id_SYMB_15);
						this.state = 474;
						(_localctx as LessThanContext)._right = this.expr(15);
						}
						break;

					case 8:
						{
						_localctx = new LessThanOrEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LessThanOrEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 475;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 476;
						this.match(stellaParser.Surrogate_id_SYMB_16);
						this.state = 477;
						(_localctx as LessThanOrEqualContext)._right = this.expr(14);
						}
						break;

					case 9:
						{
						_localctx = new GreaterThanContext(new ExprContext(_parentctx, _parentState));
						(_localctx as GreaterThanContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 478;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 479;
						this.match(stellaParser.Surrogate_id_SYMB_17);
						this.state = 480;
						(_localctx as GreaterThanContext)._right = this.expr(13);
						}
						break;

					case 10:
						{
						_localctx = new GreaterThanOrEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as GreaterThanOrEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 481;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 482;
						this.match(stellaParser.Surrogate_id_SYMB_18);
						this.state = 483;
						(_localctx as GreaterThanOrEqualContext)._right = this.expr(12);
						}
						break;

					case 11:
						{
						_localctx = new EqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as EqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 484;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 485;
						this.match(stellaParser.Surrogate_id_SYMB_19);
						this.state = 486;
						(_localctx as EqualContext)._right = this.expr(11);
						}
						break;

					case 12:
						{
						_localctx = new NotEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as NotEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 487;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 488;
						this.match(stellaParser.Surrogate_id_SYMB_20);
						this.state = 489;
						(_localctx as NotEqualContext)._right = this.expr(10);
						}
						break;

					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AssignContext)._lhs = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 490;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 491;
						this.match(stellaParser.ASSIGN);
						this.state = 492;
						(_localctx as AssignContext)._rhs = this.expr(9);
						}
						break;

					case 14:
						{
						_localctx = new SequenceContext(new ExprContext(_parentctx, _parentState));
						(_localctx as SequenceContext)._expr1 = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 493;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 494;
						this.match(stellaParser.Surrogate_id_SYMB_1);
						this.state = 495;
						(_localctx as SequenceContext)._expr2 = this.expr(7);
						}
						break;

					case 15:
						{
						_localctx = new DotRecordContext(new ExprContext(_parentctx, _parentState));
						(_localctx as DotRecordContext)._expr_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 496;
						if (!(this.precpred(this._ctx, 59))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 59)");
						}
						this.state = 497;
						this.match(stellaParser.Surrogate_id_SYMB_25);
						this.state = 498;
						(_localctx as DotRecordContext)._label = this.match(stellaParser.StellaIdent);
						}
						break;

					case 16:
						{
						_localctx = new DotTupleContext(new ExprContext(_parentctx, _parentState));
						(_localctx as DotTupleContext)._expr_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 499;
						if (!(this.precpred(this._ctx, 58))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 58)");
						}
						this.state = 500;
						this.match(stellaParser.Surrogate_id_SYMB_25);
						this.state = 501;
						(_localctx as DotTupleContext)._index = this.match(stellaParser.INTEGER);
						}
						break;

					case 17:
						{
						_localctx = new ApplicationContext(new ExprContext(_parentctx, _parentState));
						(_localctx as ApplicationContext)._fun = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 502;
						if (!(this.precpred(this._ctx, 32))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 32)");
						}
						this.state = 503;
						this.match(stellaParser.Surrogate_id_SYMB_2);
						this.state = 512;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13) | (1 << stellaParser.Surrogate_id_SYMB_23) | (1 << stellaParser.Surrogate_id_SYMB_26) | (1 << stellaParser.Surrogate_id_SYMB_27) | (1 << stellaParser.Surrogate_id_SYMB_28) | (1 << stellaParser.Surrogate_id_SYMB_29) | (1 << stellaParser.Surrogate_id_SYMB_30))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (stellaParser.Surrogate_id_SYMB_31 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_37 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_42 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_43 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_44 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_45 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_51 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_52 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_53 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_54 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 32)) | (1 << (stellaParser.Surrogate_id_SYMB_62 - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (stellaParser.Surrogate_id_SYMB_63 - 64)) | (1 << (stellaParser.REFERENCE - 64)) | (1 << (stellaParser.PANIC - 64)) | (1 << (stellaParser.THROW - 64)) | (1 << (stellaParser.TRY - 64)) | (1 << (stellaParser.GENERIC - 64)) | (1 << (stellaParser.StellaIdent - 64)) | (1 << (stellaParser.MemoryAddress - 64)) | (1 << (stellaParser.INTEGER - 64)))) !== 0)) {
							{
							this.state = 504;
							(_localctx as ApplicationContext)._expr = this.expr(0);
							(_localctx as ApplicationContext)._args.push((_localctx as ApplicationContext)._expr);
							this.state = 509;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							while (_la === stellaParser.Surrogate_id_SYMB_0) {
								{
								{
								this.state = 505;
								this.match(stellaParser.Surrogate_id_SYMB_0);
								this.state = 506;
								(_localctx as ApplicationContext)._expr = this.expr(0);
								(_localctx as ApplicationContext)._args.push((_localctx as ApplicationContext)._expr);
								}
								}
								this.state = 511;
								this._errHandler.sync(this);
								_la = this._input.LA(1);
							}
							}
						}

						this.state = 514;
						this.match(stellaParser.Surrogate_id_SYMB_3);
						}
						break;

					case 18:
						{
						_localctx = new TypeApplicationContext(new ExprContext(_parentctx, _parentState));
						(_localctx as TypeApplicationContext)._fun = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 515;
						if (!(this.precpred(this._ctx, 31))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 31)");
						}
						this.state = 516;
						this.match(stellaParser.Surrogate_id_SYMB_13);
						{
						this.state = 517;
						(_localctx as TypeApplicationContext)._stellatype = this.stellatype(0);
						(_localctx as TypeApplicationContext)._types.push((_localctx as TypeApplicationContext)._stellatype);
						this.state = 522;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la === stellaParser.Surrogate_id_SYMB_0) {
							{
							{
							this.state = 518;
							this.match(stellaParser.Surrogate_id_SYMB_0);
							this.state = 519;
							(_localctx as TypeApplicationContext)._stellatype = this.stellatype(0);
							(_localctx as TypeApplicationContext)._types.push((_localctx as TypeApplicationContext)._stellatype);
							}
							}
							this.state = 524;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
						this.state = 525;
						this.match(stellaParser.Surrogate_id_SYMB_14);
						}
						break;

					case 19:
						{
						_localctx = new TypeAscContext(new ExprContext(_parentctx, _parentState));
						(_localctx as TypeAscContext)._expr_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 527;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 528;
						this.match(stellaParser.Surrogate_id_SYMB_36);
						this.state = 529;
						(_localctx as TypeAscContext)._type_ = this.stellatype(0);
						}
						break;

					case 20:
						{
						_localctx = new TypeCastContext(new ExprContext(_parentctx, _parentState));
						(_localctx as TypeCastContext)._expr_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 530;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 531;
						this.match(stellaParser.CAST);
						this.state = 532;
						this.match(stellaParser.Surrogate_id_SYMB_36);
						this.state = 533;
						(_localctx as TypeCastContext)._type_ = this.stellatype(0);
						}
						break;

					case 21:
						{
						_localctx = new TerminatingSemicolonContext(new ExprContext(_parentctx, _parentState));
						(_localctx as TerminatingSemicolonContext)._expr_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_expr);
						this.state = 534;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 535;
						this.match(stellaParser.Surrogate_id_SYMB_1);
						}
						break;
					}
					}
				}
				this.state = 540;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternBinding(): PatternBindingContext {
		let _localctx: PatternBindingContext = new PatternBindingContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, stellaParser.RULE_patternBinding);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 541;
			_localctx._pat = this.pattern(0);
			this.state = 542;
			this.match(stellaParser.Surrogate_id_SYMB_6);
			this.state = 543;
			_localctx._rhs = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public binding(): BindingContext {
		let _localctx: BindingContext = new BindingContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, stellaParser.RULE_binding);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 545;
			_localctx._name = this.match(stellaParser.StellaIdent);
			this.state = 546;
			this.match(stellaParser.Surrogate_id_SYMB_6);
			this.state = 547;
			_localctx._rhs = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchCase(): MatchCaseContext {
		let _localctx: MatchCaseContext = new MatchCaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, stellaParser.RULE_matchCase);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 549;
			_localctx._pattern_ = this.pattern(0);
			this.state = 550;
			this.match(stellaParser.Surrogate_id_SYMB_9);
			this.state = 551;
			_localctx._expr_ = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public pattern(): PatternContext;
	public pattern(_p: number): PatternContext;
	// @RuleVersion(0)
	public pattern(_p?: number): PatternContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: PatternContext = new PatternContext(this._ctx, _parentState);
		let _prevctx: PatternContext = _localctx;
		let _startState: number = 26;
		this.enterRecursionRule(_localctx, 26, stellaParser.RULE_pattern, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 628;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				_localctx = new PatternVariantContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 554;
				this.match(stellaParser.Surrogate_id_SYMB_11);
				this.state = 555;
				(_localctx as PatternVariantContext)._label = this.match(stellaParser.StellaIdent);
				this.state = 558;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.Surrogate_id_SYMB_6) {
					{
					this.state = 556;
					this.match(stellaParser.Surrogate_id_SYMB_6);
					this.state = 557;
					(_localctx as PatternVariantContext)._pattern_ = this.pattern(0);
					}
				}

				this.state = 560;
				this.match(stellaParser.Surrogate_id_SYMB_12);
				}
				break;

			case 2:
				{
				_localctx = new PatternInlContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 561;
				this.match(stellaParser.Surrogate_id_SYMB_47);
				this.state = 562;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 563;
				(_localctx as PatternInlContext)._pattern_ = this.pattern(0);
				this.state = 564;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 3:
				{
				_localctx = new PatternInrContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 566;
				this.match(stellaParser.Surrogate_id_SYMB_49);
				this.state = 567;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 568;
				(_localctx as PatternInrContext)._pattern_ = this.pattern(0);
				this.state = 569;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 4:
				{
				_localctx = new PatternTupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 571;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 580;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13))) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (stellaParser.Surrogate_id_SYMB_37 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_63 - 38)))) !== 0) || _la === stellaParser.StellaIdent || _la === stellaParser.INTEGER) {
					{
					this.state = 572;
					(_localctx as PatternTupleContext)._pattern = this.pattern(0);
					(_localctx as PatternTupleContext)._patterns.push((_localctx as PatternTupleContext)._pattern);
					this.state = 577;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 573;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 574;
						(_localctx as PatternTupleContext)._pattern = this.pattern(0);
						(_localctx as PatternTupleContext)._patterns.push((_localctx as PatternTupleContext)._pattern);
						}
						}
						this.state = 579;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 582;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 5:
				{
				_localctx = new PatternRecordContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 583;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 592;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.StellaIdent) {
					{
					this.state = 584;
					(_localctx as PatternRecordContext)._labelledPattern = this.labelledPattern();
					(_localctx as PatternRecordContext)._patterns.push((_localctx as PatternRecordContext)._labelledPattern);
					this.state = 589;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 585;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 586;
						(_localctx as PatternRecordContext)._labelledPattern = this.labelledPattern();
						(_localctx as PatternRecordContext)._patterns.push((_localctx as PatternRecordContext)._labelledPattern);
						}
						}
						this.state = 591;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 594;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 6:
				{
				_localctx = new PatternListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 595;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 604;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13))) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (stellaParser.Surrogate_id_SYMB_37 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_41 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_47 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_49 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_57 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_60 - 38)) | (1 << (stellaParser.Surrogate_id_SYMB_63 - 38)))) !== 0) || _la === stellaParser.StellaIdent || _la === stellaParser.INTEGER) {
					{
					this.state = 596;
					(_localctx as PatternListContext)._pattern = this.pattern(0);
					(_localctx as PatternListContext)._patterns.push((_localctx as PatternListContext)._pattern);
					this.state = 601;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 597;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 598;
						(_localctx as PatternListContext)._pattern = this.pattern(0);
						(_localctx as PatternListContext)._patterns.push((_localctx as PatternListContext)._pattern);
						}
						}
						this.state = 603;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 606;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				}
				break;

			case 7:
				{
				_localctx = new PatternConsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 607;
				this.match(stellaParser.Surrogate_id_SYMB_37);
				this.state = 608;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 609;
				(_localctx as PatternConsContext)._head = this.pattern(0);
				this.state = 610;
				this.match(stellaParser.Surrogate_id_SYMB_0);
				this.state = 611;
				(_localctx as PatternConsContext)._tail = this.pattern(0);
				this.state = 612;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 8:
				{
				_localctx = new PatternFalseContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 614;
				this.match(stellaParser.Surrogate_id_SYMB_41);
				}
				break;

			case 9:
				{
				_localctx = new PatternTrueContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 615;
				this.match(stellaParser.Surrogate_id_SYMB_60);
				}
				break;

			case 10:
				{
				_localctx = new PatternUnitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 616;
				this.match(stellaParser.Surrogate_id_SYMB_63);
				}
				break;

			case 11:
				{
				_localctx = new PatternIntContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 617;
				(_localctx as PatternIntContext)._n = this.match(stellaParser.INTEGER);
				}
				break;

			case 12:
				{
				_localctx = new PatternSuccContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 618;
				this.match(stellaParser.Surrogate_id_SYMB_57);
				this.state = 619;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 620;
				(_localctx as PatternSuccContext)._pattern_ = this.pattern(0);
				this.state = 621;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;

			case 13:
				{
				_localctx = new PatternVarContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 623;
				(_localctx as PatternVarContext)._name = this.match(stellaParser.StellaIdent);
				}
				break;

			case 14:
				{
				_localctx = new ParenthesisedPatternContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 624;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 625;
				(_localctx as ParenthesisedPatternContext)._pattern_ = this.pattern(0);
				this.state = 626;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 639;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 637;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
					case 1:
						{
						_localctx = new PatternAscContext(new PatternContext(_parentctx, _parentState));
						(_localctx as PatternAscContext)._pattern_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_pattern);
						this.state = 630;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 631;
						this.match(stellaParser.Surrogate_id_SYMB_36);
						this.state = 632;
						(_localctx as PatternAscContext)._type_ = this.stellatype(0);
						}
						break;

					case 2:
						{
						_localctx = new PatternCastAsContext(new PatternContext(_parentctx, _parentState));
						(_localctx as PatternCastAsContext)._pattern_ = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_pattern);
						this.state = 633;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 634;
						this.match(stellaParser.CAST);
						this.state = 635;
						this.match(stellaParser.Surrogate_id_SYMB_36);
						this.state = 636;
						(_localctx as PatternCastAsContext)._type_ = this.stellatype(0);
						}
						break;
					}
					}
				}
				this.state = 641;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public labelledPattern(): LabelledPatternContext {
		let _localctx: LabelledPatternContext = new LabelledPatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, stellaParser.RULE_labelledPattern);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 642;
			_localctx._label = this.match(stellaParser.StellaIdent);
			this.state = 643;
			this.match(stellaParser.Surrogate_id_SYMB_6);
			this.state = 644;
			_localctx._pattern_ = this.pattern(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public stellatype(): StellatypeContext;
	public stellatype(_p: number): StellatypeContext;
	// @RuleVersion(0)
	public stellatype(_p?: number): StellatypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: StellatypeContext = new StellatypeContext(this._ctx, _parentState);
		let _prevctx: StellatypeContext = _localctx;
		let _startState: number = 30;
		this.enterRecursionRule(_localctx, 30, stellaParser.RULE_stellatype, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 727;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				{
				_localctx = new TypeBoolContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 647;
				this.match(stellaParser.Surrogate_id_SYMB_32);
				}
				break;

			case 2:
				{
				_localctx = new TypeNatContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 648;
				this.match(stellaParser.Surrogate_id_SYMB_33);
				}
				break;

			case 3:
				{
				_localctx = new TypeRefContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 649;
				this.match(stellaParser.REF_TYPE);
				this.state = 650;
				(_localctx as TypeRefContext)._type_ = this.stellatype(15);
				}
				break;

			case 4:
				{
				_localctx = new TypeFunContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 651;
				this.match(stellaParser.Surrogate_id_SYMB_43);
				this.state = 652;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 661;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (stellaParser.Surrogate_id_SYMB_32 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_33 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_34 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_43 - 33)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (stellaParser.Surrogate_id_SYMB_65 - 66)) | (1 << (stellaParser.REF_TYPE - 66)) | (1 << (stellaParser.TOP_TYPE - 66)) | (1 << (stellaParser.BOTTOM_TYPE - 66)) | (1 << (stellaParser.AUTO_TYPE - 66)) | (1 << (stellaParser.FORALL - 66)) | (1 << (stellaParser.StellaIdent - 66)))) !== 0)) {
					{
					this.state = 653;
					(_localctx as TypeFunContext)._stellatype = this.stellatype(0);
					(_localctx as TypeFunContext)._paramTypes.push((_localctx as TypeFunContext)._stellatype);
					this.state = 658;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 654;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 655;
						(_localctx as TypeFunContext)._stellatype = this.stellatype(0);
						(_localctx as TypeFunContext)._paramTypes.push((_localctx as TypeFunContext)._stellatype);
						}
						}
						this.state = 660;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 663;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				this.state = 664;
				this.match(stellaParser.Surrogate_id_SYMB_8);
				this.state = 665;
				(_localctx as TypeFunContext)._returnType = this.stellatype(13);
				}
				break;

			case 5:
				{
				_localctx = new TypeForAllContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 666;
				this.match(stellaParser.FORALL);
				this.state = 670;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.StellaIdent) {
					{
					{
					this.state = 667;
					(_localctx as TypeForAllContext)._StellaIdent = this.match(stellaParser.StellaIdent);
					(_localctx as TypeForAllContext)._types.push((_localctx as TypeForAllContext)._StellaIdent);
					}
					}
					this.state = 672;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 673;
				this.match(stellaParser.Surrogate_id_SYMB_25);
				this.state = 674;
				(_localctx as TypeForAllContext)._type_ = this.stellatype(12);
				}
				break;

			case 6:
				{
				_localctx = new TypeRecContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 675;
				this.match(stellaParser.Surrogate_id_SYMB_65);
				this.state = 676;
				(_localctx as TypeRecContext)._var = this.match(stellaParser.StellaIdent);
				this.state = 677;
				this.match(stellaParser.Surrogate_id_SYMB_25);
				this.state = 678;
				(_localctx as TypeRecContext)._type_ = this.stellatype(11);
				}
				break;

			case 7:
				{
				_localctx = new TypeTupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 679;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 688;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << stellaParser.Surrogate_id_SYMB_2) | (1 << stellaParser.Surrogate_id_SYMB_4) | (1 << stellaParser.Surrogate_id_SYMB_11) | (1 << stellaParser.Surrogate_id_SYMB_13))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (stellaParser.Surrogate_id_SYMB_32 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_33 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_34 - 33)) | (1 << (stellaParser.Surrogate_id_SYMB_43 - 33)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (stellaParser.Surrogate_id_SYMB_65 - 66)) | (1 << (stellaParser.REF_TYPE - 66)) | (1 << (stellaParser.TOP_TYPE - 66)) | (1 << (stellaParser.BOTTOM_TYPE - 66)) | (1 << (stellaParser.AUTO_TYPE - 66)) | (1 << (stellaParser.FORALL - 66)) | (1 << (stellaParser.StellaIdent - 66)))) !== 0)) {
					{
					this.state = 680;
					(_localctx as TypeTupleContext)._stellatype = this.stellatype(0);
					(_localctx as TypeTupleContext)._types.push((_localctx as TypeTupleContext)._stellatype);
					this.state = 685;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 681;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 682;
						(_localctx as TypeTupleContext)._stellatype = this.stellatype(0);
						(_localctx as TypeTupleContext)._types.push((_localctx as TypeTupleContext)._stellatype);
						}
						}
						this.state = 687;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 690;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 8:
				{
				_localctx = new TypeRecordContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 691;
				this.match(stellaParser.Surrogate_id_SYMB_4);
				this.state = 692;
				(_localctx as TypeRecordContext)._recordFieldType = this.recordFieldType();
				(_localctx as TypeRecordContext)._fieldTypes.push((_localctx as TypeRecordContext)._recordFieldType);
				this.state = 697;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === stellaParser.Surrogate_id_SYMB_0) {
					{
					{
					this.state = 693;
					this.match(stellaParser.Surrogate_id_SYMB_0);
					this.state = 694;
					(_localctx as TypeRecordContext)._recordFieldType = this.recordFieldType();
					(_localctx as TypeRecordContext)._fieldTypes.push((_localctx as TypeRecordContext)._recordFieldType);
					}
					}
					this.state = 699;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 700;
				this.match(stellaParser.Surrogate_id_SYMB_5);
				}
				break;

			case 9:
				{
				_localctx = new TypeVariantContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 702;
				this.match(stellaParser.Surrogate_id_SYMB_11);
				this.state = 711;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === stellaParser.StellaIdent) {
					{
					this.state = 703;
					(_localctx as TypeVariantContext)._variantFieldType = this.variantFieldType();
					(_localctx as TypeVariantContext)._fieldTypes.push((_localctx as TypeVariantContext)._variantFieldType);
					this.state = 708;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === stellaParser.Surrogate_id_SYMB_0) {
						{
						{
						this.state = 704;
						this.match(stellaParser.Surrogate_id_SYMB_0);
						this.state = 705;
						(_localctx as TypeVariantContext)._variantFieldType = this.variantFieldType();
						(_localctx as TypeVariantContext)._fieldTypes.push((_localctx as TypeVariantContext)._variantFieldType);
						}
						}
						this.state = 710;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 713;
				this.match(stellaParser.Surrogate_id_SYMB_12);
				}
				break;

			case 10:
				{
				_localctx = new TypeListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 714;
				this.match(stellaParser.Surrogate_id_SYMB_13);
				this.state = 715;
				(_localctx as TypeListContext)._type_ = this.stellatype(0);
				this.state = 716;
				this.match(stellaParser.Surrogate_id_SYMB_14);
				}
				break;

			case 11:
				{
				_localctx = new TypeUnitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 718;
				this.match(stellaParser.Surrogate_id_SYMB_34);
				}
				break;

			case 12:
				{
				_localctx = new TypeTopContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 719;
				this.match(stellaParser.TOP_TYPE);
				}
				break;

			case 13:
				{
				_localctx = new TypeBottomContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 720;
				this.match(stellaParser.BOTTOM_TYPE);
				}
				break;

			case 14:
				{
				_localctx = new TypeAutoContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 721;
				this.match(stellaParser.AUTO_TYPE);
				}
				break;

			case 15:
				{
				_localctx = new TypeVarContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 722;
				(_localctx as TypeVarContext)._name = this.match(stellaParser.StellaIdent);
				}
				break;

			case 16:
				{
				_localctx = new TypeParensContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 723;
				this.match(stellaParser.Surrogate_id_SYMB_2);
				this.state = 724;
				(_localctx as TypeParensContext)._type_ = this.stellatype(0);
				this.state = 725;
				this.match(stellaParser.Surrogate_id_SYMB_3);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 734;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new TypeSumContext(new StellatypeContext(_parentctx, _parentState));
					(_localctx as TypeSumContext)._left = _prevctx;
					this.pushNewRecursionContext(_localctx, _startState, stellaParser.RULE_stellatype);
					this.state = 729;
					if (!(this.precpred(this._ctx, 14))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
					}
					this.state = 730;
					this.match(stellaParser.Surrogate_id_SYMB_21);
					this.state = 731;
					(_localctx as TypeSumContext)._right = this.stellatype(15);
					}
					}
				}
				this.state = 736;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recordFieldType(): RecordFieldTypeContext {
		let _localctx: RecordFieldTypeContext = new RecordFieldTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, stellaParser.RULE_recordFieldType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 737;
			_localctx._label = this.match(stellaParser.StellaIdent);
			this.state = 738;
			this.match(stellaParser.Surrogate_id_SYMB_7);
			this.state = 739;
			_localctx._type_ = this.stellatype(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variantFieldType(): VariantFieldTypeContext {
		let _localctx: VariantFieldTypeContext = new VariantFieldTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, stellaParser.RULE_variantFieldType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 741;
			_localctx._label = this.match(stellaParser.StellaIdent);
			this.state = 744;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === stellaParser.Surrogate_id_SYMB_7) {
				{
				this.state = 742;
				this.match(stellaParser.Surrogate_id_SYMB_7);
				this.state = 743;
				_localctx._type_ = this.stellatype(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 9:
			return this.expr_sempred(_localctx as ExprContext, predIndex);

		case 13:
			return this.pattern_sempred(_localctx as PatternContext, predIndex);

		case 15:
			return this.stellatype_sempred(_localctx as StellatypeContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 30);

		case 1:
			return this.precpred(this._ctx, 29);

		case 2:
			return this.precpred(this._ctx, 28);

		case 3:
			return this.precpred(this._ctx, 25);

		case 4:
			return this.precpred(this._ctx, 24);

		case 5:
			return this.precpred(this._ctx, 23);

		case 6:
			return this.precpred(this._ctx, 14);

		case 7:
			return this.precpred(this._ctx, 13);

		case 8:
			return this.precpred(this._ctx, 12);

		case 9:
			return this.precpred(this._ctx, 11);

		case 10:
			return this.precpred(this._ctx, 10);

		case 11:
			return this.precpred(this._ctx, 9);

		case 12:
			return this.precpred(this._ctx, 8);

		case 13:
			return this.precpred(this._ctx, 6);

		case 14:
			return this.precpred(this._ctx, 59);

		case 15:
			return this.precpred(this._ctx, 58);

		case 16:
			return this.precpred(this._ctx, 32);

		case 17:
			return this.precpred(this._ctx, 31);

		case 18:
			return this.precpred(this._ctx, 22);

		case 19:
			return this.precpred(this._ctx, 21);

		case 20:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private pattern_sempred(_localctx: PatternContext, predIndex: number): boolean {
		switch (predIndex) {
		case 21:
			return this.precpred(this._ctx, 3);

		case 22:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}
	private stellatype_sempred(_localctx: StellatypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 23:
			return this.precpred(this._ctx, 14);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03[\u02ED\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x04\x03" +
		"\x04\x03\x04\x03\x05\x03\x05\x07\x052\n\x05\f\x05\x0E\x055\v\x05\x03\x05" +
		"\x07\x058\n\x05\f\x05\x0E\x05;\v\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07F\n\x07\f\x07\x0E\x07I\v\x07" +
		"\x03\x07\x03\x07\x03\b\x07\bN\n\b\f\b\x0E\bQ\v\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x07\bY\n\b\f\b\x0E\b\\\v\b\x05\b^\n\b\x03\b\x03\b\x03\b" +
		"\x05\bc\n\b\x03\b\x03\b\x03\b\x03\b\x07\bi\n\b\f\b\x0E\bl\v\b\x05\bn\n" +
		"\b\x03\b\x03\b\x07\br\n\b\f\b\x0E\bu\v\b\x03\b\x03\b\x03\b\x03\b\x03\b" +
		"\x07\b|\n\b\f\b\x0E\b\x7F\v\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x07\b\x88\n\b\f\b\x0E\b\x8B\v\b\x03\b\x03\b\x03\b\x03\b\x03\b\x07\b" +
		"\x92\n\b\f\b\x0E\b\x95\v\b\x05\b\x97\n\b\x03\b\x03\b\x03\b\x05\b\x9C\n" +
		"\b\x03\b\x03\b\x03\b\x03\b\x07\b\xA2\n\b\f\b\x0E\b\xA5\v\b\x05\b\xA7\n" +
		"\b\x03\b\x03\b\x07\b\xAB\n\b\f\b\x0E\b\xAE\v\b\x03\b\x03\b\x03\b\x03\b" +
		"\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x05\b\xC1\n\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v" +
		"\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x07\v\u0152\n\v\f\v\x0E\v\u0155\v\v\x05\v\u0157\n" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\u0163" +
		"\n\v\f\v\x0E\v\u0166\v\v\x05\v\u0168\n\v\x03\v\x03\v\x03\v\x03\v\x03\v" +
		"\x07\v\u016F\n\v\f\v\x0E\v\u0172\v\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x05\v\u017A\n\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\u0183" +
		"\n\v\f\v\x0E\v\u0186\v\v\x05\v\u0188\n\v\x03\v\x03\v\x03\v\x03\v\x03\v" +
		"\x03\v\x07\v\u0190\n\v\f\v\x0E\v\u0193\v\v\x05\v\u0195\n\v\x03\v\x03\v" +
		"\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\u01A3" +
		"\n\v\f\v\x0E\v\u01A6\v\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07" +
		"\v\u01AF\n\v\f\v\x0E\v\u01B2\v\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x07\v\u01BC\n\v\f\v\x0E\v\u01BF\v\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x05\v\u01C7\n\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\u01FE\n" +
		"\v\f\v\x0E\v\u0201\v\v\x05\v\u0203\n\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x07\v\u020B\n\v\f\v\x0E\v\u020E\v\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\u021B\n\v\f\v\x0E\v\u021E\v\v\x03" +
		"\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u0231\n\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u0242\n\x0F\f\x0F\x0E" +
		"\x0F\u0245\v\x0F\x05\x0F\u0247\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x07\x0F\u024E\n\x0F\f\x0F\x0E\x0F\u0251\v\x0F\x05\x0F\u0253\n\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u025A\n\x0F\f\x0F\x0E" +
		"\x0F\u025D\v\x0F\x05\x0F\u025F\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05" +
		"\x0F\u0277\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x07\x0F\u0280\n\x0F\f\x0F\x0E\x0F\u0283\v\x0F\x03\x10\x03\x10\x03\x10" +
		"\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x07\x11\u0293\n\x11\f\x11\x0E\x11\u0296\v\x11\x05\x11" +
		"\u0298\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07\x11\u029F\n\x11" +
		"\f\x11\x0E\x11\u02A2\v\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07\x11\u02AE\n\x11\f\x11\x0E\x11" +
		"\u02B1\v\x11\x05\x11\u02B3\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x07\x11\u02BA\n\x11\f\x11\x0E\x11\u02BD\v\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x07\x11\u02C5\n\x11\f\x11\x0E\x11\u02C8\v\x11" +
		"\x05\x11\u02CA\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u02DA" +
		"\n\x11\x03\x11\x03\x11\x03\x11\x07\x11\u02DF\n\x11\f\x11\x0E\x11\u02E2" +
		"\v\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x05\x13" +
		"\u02EB\n\x13\x03\x13\x02\x02\x05\x14\x1C \x14\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02\x02\x02\x02\u0369\x02&\x03\x02\x02" +
		"\x02\x04)\x03\x02\x02\x02\x06,\x03\x02\x02\x02\b/\x03\x02\x02\x02\n<\x03" +
		"\x02\x02\x02\f@\x03\x02\x02\x02\x0E\xC0\x03\x02\x02\x02\x10\xC2\x03\x02" +
		"\x02\x02\x12\xC4\x03\x02\x02\x02\x14\u01C6\x03\x02\x02\x02\x16\u021F\x03" +
		"\x02\x02\x02\x18\u0223\x03\x02\x02\x02\x1A\u0227\x03\x02\x02\x02\x1C\u0276" +
		"\x03\x02\x02\x02\x1E\u0284\x03\x02\x02\x02 \u02D9\x03\x02\x02\x02\"\u02E3" +
		"\x03\x02\x02\x02$\u02E7\x03\x02\x02\x02&\'\x05\b\x05\x02\'(\x07\x02\x02" +
		"\x03(\x03\x03\x02\x02\x02)*\x05\x14\v\x02*+\x07\x02\x02\x03+\x05\x03\x02" +
		"\x02\x02,-\x05 \x11\x02-.\x07\x02\x02\x03.\x07\x03\x02\x02\x02/3\x05\n" +
		"\x06\x0202\x05\f\x07\x0210\x03\x02\x02\x0225\x03\x02\x02\x0231\x03\x02" +
		"\x02\x0234\x03\x02\x02\x0249\x03\x02\x02\x0253\x03\x02\x02\x0268\x05\x0E" +
		"\b\x0276\x03\x02\x02\x028;\x03\x02\x02\x0297\x03\x02\x02\x029:\x03\x02" +
		"\x02\x02:\t\x03\x02\x02\x02;9\x03\x02\x02\x02<=\x075\x02\x02=>\x07)\x02" +
		"\x02>?\x07\x04\x02\x02?\v\x03\x02\x02\x02@A\x07+\x02\x02AB\x07C\x02\x02" +
		"BG\x07W\x02\x02CD\x07\x03\x02\x02DF\x07W\x02\x02EC\x03\x02\x02\x02FI\x03" +
		"\x02\x02\x02GE\x03\x02\x02\x02GH\x03\x02\x02\x02HJ\x03\x02\x02\x02IG\x03" +
		"\x02\x02\x02JK\x07\x04\x02\x02K\r\x03\x02\x02\x02LN\x05\x10\t\x02ML\x03" +
		"\x02\x02\x02NQ\x03\x02\x02\x02OM\x03\x02\x02\x02OP\x03\x02\x02\x02PR\x03" +
		"\x02\x02\x02QO\x03\x02\x02\x02RS\x07.\x02\x02ST\x07V\x02\x02T]\x07\x05" +
		"\x02\x02UZ\x05\x12\n\x02VW\x07\x03\x02\x02WY\x05\x12\n\x02XV\x03\x02\x02" +
		"\x02Y\\\x03\x02\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[^\x03\x02" +
		"\x02\x02\\Z\x03\x02\x02\x02]U\x03\x02\x02\x02]^\x03\x02\x02\x02^_\x03" +
		"\x02\x02\x02_b\x07\x06\x02\x02`a\x07\v\x02\x02ac\x05 \x11\x02b`\x03\x02" +
		"\x02\x02bc\x03\x02\x02\x02cm\x03\x02\x02\x02de\x07>\x02\x02ej\x05 \x11" +
		"\x02fg\x07\x03\x02\x02gi\x05 \x11\x02hf\x03\x02\x02\x02il\x03\x02\x02" +
		"\x02jh\x03\x02\x02\x02jk\x03\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02\x02" +
		"\x02md\x03\x02\x02\x02mn\x03\x02\x02\x02no\x03\x02\x02\x02os\x07\x07\x02" +
		"\x02pr\x05\x0E\b\x02qp\x03\x02\x02\x02ru\x03\x02\x02\x02sq\x03\x02\x02" +
		"\x02st\x03\x02\x02\x02tv\x03\x02\x02\x02us\x03\x02\x02\x02vw\x07;\x02" +
		"\x02wx\x05\x14\v\x02xy\x07\b\x02\x02y\xC1\x03\x02\x02\x02z|\x05\x10\t" +
		"\x02{z\x03\x02\x02\x02|\x7F\x03\x02\x02\x02}{\x03\x02\x02\x02}~\x03\x02" +
		"\x02\x02~\x80\x03\x02\x02\x02\x7F}\x03\x02\x02\x02\x80\x81\x07R\x02\x02" +
		"\x81\x82\x07.\x02\x02\x82\x83\x07V\x02\x02\x83\x84\x07\x10\x02\x02\x84" +
		"\x89\x07V\x02\x02\x85\x86\x07\x03\x02\x02\x86\x88\x07V\x02\x02\x87\x85" +
		"\x03\x02\x02\x02\x88\x8B\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02\x89\x8A" +
		"\x03\x02\x02\x02\x8A\x8C\x03\x02\x02\x02\x8B\x89\x03\x02\x02\x02\x8C\x8D" +
		"\x07\x11\x02\x02\x8D\x96\x07\x05\x02\x02\x8E\x93\x05\x12\n\x02\x8F\x90" +
		"\x07\x03\x02\x02\x90\x92\x05\x12\n\x02\x91\x8F\x03\x02\x02\x02\x92\x95" +
		"\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x97" +
		"\x03\x02\x02\x02\x95\x93\x03\x02\x02\x02\x96\x8E\x03\x02\x02\x02\x96\x97" +
		"\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x9B\x07\x06\x02\x02\x99\x9A" +
		"\x07\v\x02\x02\x9A\x9C\x05 \x11\x02\x9B\x99\x03\x02\x02\x02\x9B\x9C\x03" +
		"\x02\x02\x02\x9C\xA6\x03\x02\x02\x02\x9D\x9E\x07>\x02\x02\x9E\xA3\x05" +
		" \x11\x02\x9F\xA0\x07\x03\x02\x02\xA0\xA2\x05 \x11\x02\xA1\x9F\x03\x02" +
		"\x02\x02\xA2\xA5\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02" +
		"\x02\x02\xA4\xA7\x03\x02\x02\x02\xA5\xA3\x03\x02\x02\x02\xA6\x9D\x03\x02" +
		"\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\xAC\x07\x07" +
		"\x02\x02\xA9\xAB\x05\x0E\b\x02\xAA\xA9\x03\x02\x02\x02\xAB\xAE\x03\x02" +
		"\x02\x02\xAC\xAA\x03\x02\x02\x02\xAC\xAD\x03\x02\x02\x02\xAD\xAF\x03\x02" +
		"\x02\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB0\x07;\x02\x02\xB0\xB1\x05\x14" +
		"\v\x02\xB1\xB2\x07\b\x02\x02\xB2\xC1\x03\x02\x02\x02\xB3\xB4\x07@\x02" +
		"\x02\xB4\xB5\x07V\x02\x02\xB5\xB6\x07\t\x02\x02\xB6\xC1\x05 \x11\x02\xB7" +
		"\xB8\x07E\x02\x02\xB8\xB9\x07@\x02\x02\xB9\xBA\x07\t\x02\x02\xBA\xC1\x05" +
		" \x11\x02\xBB\xBC\x07E\x02\x02\xBC\xBD\x07F\x02\x02\xBD\xBE\x07V\x02\x02" +
		"\xBE\xBF\x07\n\x02\x02\xBF\xC1\x05 \x11\x02\xC0O\x03\x02\x02\x02\xC0}" +
		"\x03\x02\x02\x02\xC0\xB3\x03\x02\x02\x02\xC0\xB7\x03\x02\x02\x02\xC0\xBB" +
		"\x03\x02\x02\x02\xC1\x0F\x03\x02\x02\x02\xC2\xC3\x073\x02\x02\xC3\x11" +
		"\x03\x02\x02\x02\xC4\xC5\x07V\x02\x02\xC5\xC6\x07\n\x02\x02\xC6\xC7\x05" +
		" \x11\x02\xC7\x13\x03\x02\x02\x02\xC8\xC9\b\v\x01\x02\xC9\u01C7\x07?\x02" +
		"\x02\xCA\u01C7\x07,\x02\x02\xCB\u01C7\x07B\x02\x02\xCC\u01C7\x07Y\x02" +
		"\x02\xCD\u01C7\x07X\x02\x02\xCE\u01C7\x07V\x02\x02\xCF\u01C7\x07K\x02" +
		"\x02\xD0\xD1\x07L\x02\x02\xD1\xD2\x07\x05\x02\x02\xD2\xD3\x05\x14\v\x02" +
		"\xD3\xD4\x07\x06\x02\x02\xD4\u01C7\x03\x02\x02\x02\xD5\xD6\x07M\x02\x02" +
		"\xD6\xD7\x07\x07\x02\x02\xD7\xD8\x05\x14\v\x02\xD8\xD9\x07\b\x02\x02\xD9" +
		"\xDA\x07N\x02\x02\xDA\xDB\x07\x07\x02\x02\xDB\xDC\x05\x1C\x0F\x02\xDC" +
		"\xDD\x07\f\x02\x02\xDD\xDE\x05\x14\v\x02\xDE\xDF\x07\b\x02\x02\xDF\u01C7" +
		"\x03\x02\x02\x02\xE0\xE1\x07M\x02\x02\xE1\xE2\x07\x07\x02\x02\xE2\xE3" +
		"\x05\x14\v\x02\xE3\xE4\x07\b\x02\x02\xE4\xE5\x07G\x02\x02\xE5\xE6\x07" +
		"\'\x02\x02\xE6\xE7\x05 \x11\x02\xE7\xE8\x07\x07\x02\x02\xE8\xE9\x05\x1C" +
		"\x0F\x02\xE9\xEA\x07\f\x02\x02\xEA\xEB\x05\x14\v\x02\xEB\xEC\x07\b\x02" +
		"\x02\xEC\xED\x07C\x02\x02\xED\xEE\x07\x07\x02\x02\xEE\xEF\x05\x14\v\x02" +
		"\xEF\xF0\x07\b\x02\x02\xF0\u01C7\x03\x02\x02\x02\xF1\xF2\x07M\x02\x02" +
		"\xF2\xF3\x07\x07\x02\x02\xF3\xF4\x05\x14\v\x02\xF4\xF5\x07\b\x02\x02\xF5" +
		"\xF6\x07C\x02\x02\xF6\xF7\x07\x07\x02\x02\xF7\xF8\x05\x14\v\x02\xF8\xF9" +
		"\x07\b\x02\x02\xF9\u01C7\x03\x02\x02\x02\xFA\xFB\x072\x02\x02\xFB\xFC" +
		"\x07\x05\x02\x02\xFC\xFD\x05\x14\v\x02\xFD\xFE\x07\x06\x02\x02\xFE\u01C7" +
		"\x03\x02\x02\x02\xFF\u0100\x074\x02\x02\u0100\u0101\x07\x05\x02\x02\u0101" +
		"\u0102\x05\x14\v\x02\u0102\u0103\x07\x06\x02\x02\u0103\u01C7\x03\x02\x02" +
		"\x02\u0104\u0105\x07(\x02\x02\u0105\u0106\x07\x05\x02\x02\u0106\u0107" +
		"\x05\x14\v\x02\u0107\u0108\x07\x03\x02\x02\u0108\u0109\x05\x14\v\x02\u0109" +
		"\u010A\x07\x06\x02\x02\u010A\u01C7\x03\x02\x02\x02\u010B\u010C\x07\x1D" +
		"\x02\x02\u010C\u010D\x07\x05\x02\x02\u010D\u010E\x05\x14\v\x02\u010E\u010F" +
		"\x07\x06\x02\x02\u010F\u01C7\x03\x02\x02\x02\u0110\u0111\x07\x1E\x02\x02" +
		"\u0111\u0112\x07\x05\x02\x02\u0112\u0113\x05\x14\v\x02\u0113\u0114\x07" +
		"\x06\x02\x02\u0114\u01C7\x03\x02\x02\x02\u0115\u0116\x07\x1F\x02\x02\u0116" +
		"\u0117\x07\x05\x02\x02\u0117\u0118\x05\x14\v\x02\u0118\u0119\x07\x06\x02" +
		"\x02\u0119\u01C7\x03\x02\x02\x02\u011A\u011B\x07<\x02\x02\u011B\u011C" +
		"\x07\x05\x02\x02\u011C\u011D\x05\x14\v\x02\u011D\u011E\x07\x06\x02\x02" +
		"\u011E\u01C7\x03\x02\x02\x02\u011F\u0120\x079\x02\x02\u0120\u0121\x07" +
		"\x05\x02\x02\u0121\u0122\x05\x14\v\x02\u0122\u0123\x07\x06\x02\x02\u0123" +
		"\u01C7\x03\x02\x02\x02\u0124\u0125\x07 \x02\x02\u0125\u0126\x07\x05\x02" +
		"\x02\u0126\u0127\x05\x14\v\x02\u0127\u0128\x07\x06\x02\x02\u0128\u01C7" +
		"\x03\x02\x02\x02\u0129\u012A\x07!\x02\x02\u012A\u012B\x07\x05\x02\x02" +
		"\u012B\u012C\x05\x14\v\x02\u012C\u012D\x07\x06\x02\x02\u012D\u01C7\x03" +
		"\x02\x02\x02\u012E\u012F\x07-\x02\x02\u012F\u0130\x07\x05\x02\x02\u0130" +
		"\u0131\x05\x14\v\x02\u0131\u0132\x07\x06\x02\x02\u0132\u01C7\x03\x02\x02" +
		"\x02\u0133\u0134\x07\"\x02\x02\u0134\u0135\x07\x05\x02\x02\u0135\u0136" +
		"\x05\x14\v\x02\u0136\u0137\x07\x03\x02\x02\u0137\u0138\x05\x14\v\x02\u0138" +
		"\u0139\x07\x03\x02\x02\u0139\u013A\x05\x14\v\x02\u013A\u013B\x07\x06\x02" +
		"\x02\u013B\u01C7\x03\x02\x02\x02\u013C\u013D\x07/\x02\x02\u013D\u013E" +
		"\x07\x10\x02\x02\u013E\u013F\x05 \x11\x02\u013F\u0140\x07\x11\x02\x02" +
		"\u0140\u0141\x05\x14\v$\u0141\u01C7\x03\x02\x02\x02\u0142\u0143\x07A\x02" +
		"\x02\u0143\u0144\x07\x10\x02\x02\u0144\u0145\x05 \x11\x02\u0145\u0146" +
		"\x07\x11\x02\x02\u0146\u0147\x05\x14\v#\u0147\u01C7\x03\x02\x02\x02\u0148" +
		"\u0149\x07J\x02\x02\u0149\u01C7\x05\x14\v\x1D\u014A\u014B\x07\x1A\x02" +
		"\x02\u014B\u01C7\x05\x14\v\x1C\u014C\u014D\x07.\x02\x02\u014D\u0156\x07" +
		"\x05\x02\x02\u014E\u0153\x05\x12\n\x02\u014F\u0150\x07\x03\x02\x02\u0150" +
		"\u0152\x05\x12\n\x02\u0151\u014F\x03\x02\x02\x02\u0152\u0155\x03\x02\x02" +
		"\x02\u0153\u0151\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154\u0157" +
		"\x03\x02\x02\x02\u0155\u0153\x03\x02\x02\x02\u0156\u014E\x03\x02\x02\x02" +
		"\u0156\u0157\x03\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158\u0159\x07" +
		"\x06\x02\x02\u0159\u015A\x07\x07\x02\x02\u015A\u015B\x07;\x02\x02\u015B" +
		"\u015C\x05\x14\v\x02\u015C\u015D\x07\b\x02\x02\u015D\u01C7\x03\x02\x02" +
		"\x02\u015E\u0167\x07\x07\x02\x02\u015F\u0164\x05\x14\v\x02\u0160\u0161" +
		"\x07\x03\x02\x02\u0161\u0163\x05\x14\v\x02\u0162\u0160\x03\x02\x02\x02" +
		"\u0163\u0166\x03\x02\x02\x02\u0164\u0162\x03\x02\x02\x02\u0164\u0165\x03" +
		"\x02\x02\x02\u0165\u0168\x03\x02\x02\x02\u0166\u0164\x03\x02\x02\x02\u0167" +
		"\u015F\x03\x02\x02\x02\u0167\u0168\x03\x02\x02\x02\u0168\u0169\x03\x02" +
		"\x02\x02\u0169\u01C7\x07\b\x02\x02\u016A\u016B\x07\x07\x02\x02\u016B\u0170" +
		"\x05\x18\r\x02\u016C\u016D\x07\x03\x02\x02\u016D\u016F\x05\x18\r\x02\u016E" +
		"\u016C\x03\x02\x02\x02\u016F\u0172\x03\x02\x02\x02\u0170\u016E\x03\x02" +
		"\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171\u0173\x03\x02\x02\x02\u0172" +
		"\u0170\x03\x02\x02\x02\u0173\u0174\x07\b\x02\x02\u0174\u01C7\x03\x02\x02" +
		"\x02\u0175\u0176\x07\x0E\x02\x02\u0176\u0179\x07V\x02\x02\u0177\u0178" +
		"\x07\t\x02\x02\u0178\u017A\x05\x14\v\x02\u0179\u0177\x03\x02\x02\x02\u0179" +
		"\u017A\x03\x02\x02\x02\u017A\u017B\x03\x02\x02\x02\u017B\u01C7\x07\x0F" +
		"\x02\x02\u017C\u017D\x078\x02\x02\u017D\u017E\x05\x14\v\x02\u017E\u0187" +
		"\x07\x07\x02\x02\u017F\u0184\x05\x1A\x0E\x02\u0180\u0181\x07\r\x02\x02" +
		"\u0181\u0183\x05\x1A\x0E\x02\u0182\u0180\x03\x02\x02\x02\u0183\u0186\x03" +
		"\x02\x02\x02\u0184\u0182\x03\x02\x02\x02\u0184\u0185\x03\x02\x02\x02\u0185" +
		"\u0188\x03\x02\x02\x02\u0186\u0184\x03\x02\x02\x02\u0187\u017F\x03\x02" +
		"\x02\x02\u0187\u0188\x03\x02\x02\x02\u0188\u0189\x03\x02\x02\x02\u0189" +
		"\u018A\x07\b\x02\x02\u018A\u01C7\x03\x02\x02\x02\u018B\u0194\x07\x10\x02" +
		"\x02\u018C\u0191\x05\x14\v\x02\u018D\u018E\x07\x03\x02\x02\u018E\u0190" +
		"\x05\x14\v\x02\u018F\u018D\x03\x02\x02\x02\u0190\u0193\x03\x02\x02\x02" +
		"\u0191\u018F\x03\x02\x02\x02\u0191\u0192\x03\x02\x02\x02\u0192\u0195\x03" +
		"\x02\x02\x02\u0193\u0191\x03\x02\x02\x02\u0194\u018C\x03\x02\x02\x02\u0194" +
		"\u0195\x03\x02\x02\x02\u0195\u0196\x03\x02\x02\x02\u0196\u01C7\x07\x11" +
		"\x02\x02\u0197\u0198\x070\x02\x02\u0198\u0199\x05\x14\v\x02\u0199\u019A" +
		"\x07=\x02\x02\u019A\u019B\x05\x14\v\x02\u019B\u019C\x07*\x02\x02\u019C" +
		"\u019D\x05\x14\v\t\u019D\u01C7\x03\x02\x02\x02\u019E\u019F\x076\x02\x02" +
		"\u019F\u01A4\x05\x16\f\x02\u01A0\u01A1\x07\x03\x02\x02\u01A1\u01A3\x05" +
		"\x16\f\x02\u01A2\u01A0\x03\x02\x02\x02\u01A3\u01A6\x03\x02\x02\x02\u01A4" +
		"\u01A2\x03\x02\x02\x02\u01A4\u01A5\x03\x02\x02\x02\u01A5\u01A7\x03\x02" +
		"\x02\x02\u01A6\u01A4\x03\x02\x02\x02\u01A7\u01A8\x071\x02\x02\u01A8\u01A9" +
		"\x05\x14\v\x07\u01A9\u01C7\x03\x02\x02\x02\u01AA\u01AB\x077\x02\x02\u01AB" +
		"\u01B0\x05\x16\f\x02\u01AC\u01AD\x07\x03\x02\x02\u01AD\u01AF\x05\x16\f" +
		"\x02\u01AE\u01AC\x03\x02\x02\x02\u01AF\u01B2\x03\x02\x02\x02\u01B0\u01AE" +
		"\x03\x02\x02\x02\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B3\x03\x02\x02\x02" +
		"\u01B2\u01B0\x03\x02\x02\x02\u01B3\u01B4\x071\x02\x02\u01B4\u01B5\x05" +
		"\x14\v\x06\u01B5\u01C7\x03\x02\x02\x02\u01B6\u01B7\x07R\x02\x02\u01B7" +
		"\u01B8\x07\x10\x02\x02\u01B8\u01BD\x07V\x02\x02\u01B9\u01BA\x07\x03\x02" +
		"\x02\u01BA\u01BC\x07V\x02\x02\u01BB\u01B9\x03\x02\x02\x02\u01BC\u01BF" +
		"\x03\x02\x02\x02\u01BD\u01BB\x03\x02\x02\x02\u01BD\u01BE\x03\x02\x02\x02" +
		"\u01BE\u01C0\x03\x02\x02\x02\u01BF\u01BD\x03\x02\x02\x02\u01C0\u01C1\x07" +
		"\x11\x02\x02\u01C1\u01C7\x05\x14\v\x05\u01C2\u01C3\x07\x05\x02\x02\u01C3" +
		"\u01C4\x05\x14\v\x02\u01C4\u01C5\x07\x06\x02\x02\u01C5\u01C7\x03\x02\x02" +
		"\x02\u01C6\xC8\x03\x02\x02\x02\u01C6\xCA\x03\x02\x02\x02\u01C6\xCB\x03" +
		"\x02\x02\x02\u01C6\xCC\x03\x02\x02\x02\u01C6\xCD\x03\x02\x02\x02\u01C6" +
		"\xCE\x03\x02\x02\x02\u01C6\xCF\x03\x02\x02\x02\u01C6\xD0\x03\x02\x02\x02" +
		"\u01C6\xD5\x03\x02\x02\x02\u01C6\xE0\x03\x02\x02\x02\u01C6\xF1\x03\x02" +
		"\x02\x02\u01C6\xFA\x03\x02\x02\x02\u01C6\xFF\x03\x02\x02\x02\u01C6\u0104" +
		"\x03\x02\x02\x02\u01C6\u010B\x03\x02\x02\x02\u01C6\u0110\x03\x02\x02\x02" +
		"\u01C6\u0115\x03\x02\x02\x02\u01C6\u011A\x03\x02\x02\x02\u01C6\u011F\x03" +
		"\x02\x02\x02\u01C6\u0124\x03\x02\x02\x02\u01C6\u0129\x03\x02\x02\x02\u01C6" +
		"\u012E\x03\x02\x02\x02\u01C6\u0133\x03\x02\x02\x02\u01C6\u013C\x03\x02" +
		"\x02\x02\u01C6\u0142\x03\x02\x02\x02\u01C6\u0148\x03\x02\x02\x02\u01C6" +
		"\u014A\x03\x02\x02\x02\u01C6\u014C\x03\x02\x02\x02\u01C6\u015E\x03\x02" +
		"\x02\x02\u01C6\u016A\x03\x02\x02\x02\u01C6\u0175\x03\x02\x02\x02\u01C6" +
		"\u017C\x03\x02\x02\x02\u01C6\u018B\x03\x02\x02\x02\u01C6\u0197\x03\x02" +
		"\x02\x02\u01C6\u019E\x03\x02\x02\x02\u01C6\u01AA\x03\x02\x02\x02\u01C6" +
		"\u01B6\x03\x02\x02\x02\u01C6\u01C2\x03\x02\x02\x02\u01C7\u021C\x03\x02" +
		"\x02\x02\u01C8\u01C9\f \x02\x02\u01C9\u01CA\x07\x1A\x02\x02\u01CA\u021B" +
		"\x05\x14\v!\u01CB\u01CC\f\x1F\x02\x02\u01CC\u01CD\x07\x1B\x02\x02\u01CD" +
		"\u021B\x05\x14\v \u01CE\u01CF\f\x1E\x02\x02\u01CF\u01D0\x07&\x02\x02\u01D0" +
		"\u021B\x05\x14\v\x1F\u01D1\u01D2\f\x1B\x02\x02\u01D2\u01D3\x07\x18\x02" +
		"\x02\u01D3\u021B\x05\x14\v\x1C\u01D4\u01D5\f\x1A\x02\x02\u01D5\u01D6\x07" +
		"\x19\x02\x02\u01D6\u021B\x05\x14\v\x1B\u01D7\u01D8\f\x19\x02\x02\u01D8" +
		"\u01D9\x07:\x02\x02\u01D9\u021B\x05\x14\v\x1A\u01DA\u01DB\f\x10\x02\x02" +
		"\u01DB\u01DC\x07\x12\x02\x02\u01DC\u021B\x05\x14\v\x11\u01DD\u01DE\f\x0F" +
		"\x02\x02\u01DE\u01DF\x07\x13\x02\x02\u01DF\u021B\x05\x14\v\x10\u01E0\u01E1" +
		"\f\x0E\x02\x02\u01E1\u01E2\x07\x14\x02\x02\u01E2\u021B\x05\x14\v\x0F\u01E3" +
		"\u01E4\f\r\x02\x02\u01E4\u01E5\x07\x15\x02\x02\u01E5\u021B\x05\x14\v\x0E" +
		"\u01E6\u01E7\f\f\x02\x02\u01E7\u01E8\x07\x16\x02\x02\u01E8\u021B\x05\x14" +
		"\v\r\u01E9\u01EA\f\v\x02\x02\u01EA\u01EB\x07\x17\x02\x02\u01EB\u021B\x05" +
		"\x14\v\f\u01EC\u01ED\f\n\x02\x02\u01ED\u01EE\x07H\x02\x02\u01EE\u021B" +
		"\x05\x14\v\v\u01EF\u01F0\f\b\x02\x02\u01F0\u01F1\x07\x04\x02\x02\u01F1" +
		"\u021B\x05\x14\v\t\u01F2\u01F3\f=\x02\x02\u01F3\u01F4\x07\x1C\x02\x02" +
		"\u01F4\u021B\x07V\x02\x02\u01F5\u01F6\f<\x02\x02\u01F6\u01F7\x07\x1C\x02" +
		"\x02\u01F7\u021B\x07Y\x02\x02\u01F8\u01F9\f\"\x02\x02\u01F9\u0202\x07" +
		"\x05\x02\x02\u01FA\u01FF\x05\x14\v\x02\u01FB\u01FC\x07";
	private static readonly _serializedATNSegment1: string =
		"\x03\x02\x02\u01FC\u01FE\x05\x14\v\x02\u01FD\u01FB\x03\x02\x02\x02\u01FE" +
		"\u0201\x03\x02\x02\x02\u01FF\u01FD\x03\x02\x02\x02\u01FF\u0200\x03\x02" +
		"\x02\x02\u0200\u0203\x03\x02\x02\x02\u0201\u01FF\x03\x02\x02\x02\u0202" +
		"\u01FA\x03\x02\x02\x02\u0202\u0203\x03\x02\x02\x02\u0203\u0204\x03\x02" +
		"\x02\x02\u0204\u021B\x07\x06\x02\x02\u0205\u0206\f!\x02\x02\u0206\u0207" +
		"\x07\x10\x02\x02\u0207\u020C\x05 \x11\x02\u0208\u0209\x07\x03\x02\x02" +
		"\u0209\u020B\x05 \x11\x02\u020A\u0208\x03\x02\x02\x02\u020B\u020E\x03" +
		"\x02\x02\x02\u020C\u020A\x03\x02\x02\x02\u020C\u020D\x03\x02\x02\x02\u020D" +
		"\u020F\x03\x02\x02\x02\u020E\u020C\x03\x02\x02\x02\u020F\u0210\x07\x11" +
		"\x02\x02\u0210\u021B\x03\x02\x02\x02\u0211\u0212\f\x18\x02\x02\u0212\u0213" +
		"\x07\'\x02\x02\u0213\u021B\x05 \x11\x02\u0214\u0215\f\x17\x02\x02\u0215" +
		"\u0216\x07G\x02\x02\u0216\u0217\x07\'\x02\x02\u0217\u021B\x05 \x11\x02" +
		"\u0218\u0219\f\x03\x02\x02\u0219\u021B\x07\x04\x02\x02\u021A\u01C8\x03" +
		"\x02\x02\x02\u021A\u01CB\x03\x02\x02\x02\u021A\u01CE\x03\x02\x02\x02\u021A" +
		"\u01D1\x03\x02\x02\x02\u021A\u01D4\x03\x02\x02\x02\u021A\u01D7\x03\x02" +
		"\x02\x02\u021A\u01DA\x03\x02\x02\x02\u021A\u01DD\x03\x02\x02\x02\u021A" +
		"\u01E0\x03\x02\x02\x02\u021A\u01E3\x03\x02\x02\x02\u021A\u01E6\x03\x02" +
		"\x02\x02\u021A\u01E9\x03\x02\x02\x02\u021A\u01EC\x03\x02\x02\x02\u021A" +
		"\u01EF\x03\x02\x02\x02\u021A\u01F2\x03\x02\x02\x02\u021A\u01F5\x03\x02" +
		"\x02\x02\u021A\u01F8\x03\x02\x02\x02\u021A\u0205\x03\x02\x02\x02\u021A" +
		"\u0211\x03\x02\x02\x02\u021A\u0214\x03\x02\x02\x02\u021A\u0218\x03\x02" +
		"\x02\x02\u021B\u021E\x03\x02\x02\x02\u021C\u021A\x03\x02\x02\x02\u021C" +
		"\u021D\x03\x02\x02\x02\u021D\x15\x03\x02\x02\x02\u021E\u021C\x03\x02\x02" +
		"\x02\u021F\u0220\x05\x1C\x0F\x02\u0220\u0221\x07\t\x02\x02\u0221\u0222" +
		"\x05\x14\v\x02\u0222\x17\x03\x02\x02\x02\u0223\u0224\x07V\x02\x02\u0224" +
		"\u0225\x07\t\x02\x02\u0225\u0226\x05\x14\v\x02\u0226\x19\x03\x02\x02\x02" +
		"\u0227\u0228\x05\x1C\x0F\x02\u0228\u0229\x07\f\x02\x02\u0229\u022A\x05" +
		"\x14\v\x02\u022A\x1B\x03\x02\x02\x02\u022B\u022C\b\x0F\x01\x02\u022C\u022D" +
		"\x07\x0E\x02\x02\u022D\u0230\x07V\x02\x02\u022E\u022F\x07\t\x02\x02\u022F" +
		"\u0231\x05\x1C\x0F\x02\u0230\u022E\x03\x02\x02\x02\u0230\u0231\x03\x02" +
		"\x02\x02\u0231\u0232\x03\x02\x02\x02\u0232\u0277\x07\x0F\x02\x02\u0233" +
		"\u0234\x072\x02\x02\u0234\u0235\x07\x05\x02\x02\u0235\u0236\x05\x1C\x0F" +
		"\x02\u0236\u0237\x07\x06\x02\x02\u0237\u0277\x03\x02\x02\x02\u0238\u0239" +
		"\x074\x02\x02\u0239\u023A\x07\x05\x02\x02\u023A\u023B\x05\x1C\x0F\x02" +
		"\u023B\u023C\x07\x06\x02\x02\u023C\u0277\x03\x02\x02\x02\u023D\u0246\x07" +
		"\x07\x02\x02\u023E\u0243\x05\x1C\x0F\x02\u023F\u0240\x07\x03\x02\x02\u0240" +
		"\u0242\x05\x1C\x0F\x02\u0241\u023F\x03\x02\x02\x02\u0242\u0245\x03\x02" +
		"\x02\x02\u0243\u0241\x03\x02\x02\x02\u0243\u0244\x03\x02\x02\x02\u0244" +
		"\u0247\x03\x02\x02\x02\u0245\u0243\x03\x02\x02\x02\u0246\u023E\x03\x02" +
		"\x02\x02\u0246\u0247\x03\x02\x02\x02\u0247\u0248\x03\x02\x02\x02\u0248" +
		"\u0277\x07\b\x02\x02\u0249\u0252\x07\x07\x02\x02\u024A\u024F\x05\x1E\x10" +
		"\x02\u024B\u024C\x07\x03\x02\x02\u024C\u024E\x05\x1E\x10\x02\u024D\u024B" +
		"\x03\x02\x02\x02\u024E\u0251\x03\x02\x02\x02\u024F\u024D\x03\x02\x02\x02" +
		"\u024F\u0250\x03\x02\x02\x02\u0250\u0253\x03\x02\x02\x02\u0251\u024F\x03" +
		"\x02\x02\x02\u0252\u024A\x03\x02\x02\x02\u0252\u0253\x03\x02\x02\x02\u0253" +
		"\u0254\x03\x02\x02\x02\u0254\u0277\x07\b\x02\x02\u0255\u025E\x07\x10\x02" +
		"\x02\u0256\u025B\x05\x1C\x0F\x02\u0257\u0258\x07\x03\x02\x02\u0258\u025A" +
		"\x05\x1C\x0F\x02\u0259\u0257\x03\x02\x02\x02\u025A\u025D\x03\x02\x02\x02" +
		"\u025B\u0259\x03\x02\x02\x02\u025B\u025C\x03\x02\x02\x02\u025C\u025F\x03" +
		"\x02\x02\x02\u025D\u025B\x03\x02\x02\x02\u025E\u0256\x03\x02\x02\x02\u025E" +
		"\u025F\x03\x02\x02\x02\u025F\u0260\x03\x02\x02\x02\u0260\u0277\x07\x11" +
		"\x02\x02\u0261\u0262\x07(\x02\x02\u0262\u0263\x07\x05\x02\x02\u0263\u0264" +
		"\x05\x1C\x0F\x02\u0264\u0265\x07\x03\x02\x02\u0265\u0266\x05\x1C\x0F\x02" +
		"\u0266\u0267\x07\x06\x02\x02\u0267\u0277\x03\x02\x02\x02\u0268\u0277\x07" +
		",\x02\x02\u0269\u0277\x07?\x02\x02\u026A\u0277\x07B\x02\x02\u026B\u0277" +
		"\x07Y\x02\x02\u026C\u026D\x07<\x02\x02\u026D\u026E\x07\x05\x02\x02\u026E" +
		"\u026F\x05\x1C\x0F\x02\u026F\u0270\x07\x06\x02\x02\u0270\u0277\x03\x02" +
		"\x02\x02\u0271\u0277\x07V\x02\x02\u0272\u0273\x07\x05\x02\x02\u0273\u0274" +
		"\x05\x1C\x0F\x02\u0274\u0275\x07\x06\x02\x02\u0275\u0277\x03\x02\x02\x02" +
		"\u0276\u022B\x03\x02\x02\x02\u0276\u0233\x03\x02\x02\x02\u0276\u0238\x03" +
		"\x02\x02\x02\u0276\u023D\x03\x02\x02\x02\u0276\u0249\x03\x02\x02\x02\u0276" +
		"\u0255\x03\x02\x02\x02\u0276\u0261\x03\x02\x02\x02\u0276\u0268\x03\x02" +
		"\x02\x02\u0276\u0269\x03\x02\x02\x02\u0276\u026A\x03\x02\x02\x02\u0276" +
		"\u026B\x03\x02\x02\x02\u0276\u026C\x03\x02\x02\x02\u0276\u0271\x03\x02" +
		"\x02\x02\u0276\u0272\x03\x02\x02\x02\u0277\u0281\x03\x02\x02\x02\u0278" +
		"\u0279\f\x05\x02\x02\u0279\u027A\x07\'\x02\x02\u027A\u0280\x05 \x11\x02" +
		"\u027B\u027C\f\x04\x02\x02\u027C\u027D\x07G\x02\x02\u027D\u027E\x07\'" +
		"\x02\x02\u027E\u0280\x05 \x11\x02\u027F\u0278\x03\x02\x02\x02\u027F\u027B" +
		"\x03\x02\x02\x02\u0280\u0283\x03\x02\x02\x02\u0281\u027F\x03\x02\x02\x02" +
		"\u0281\u0282\x03\x02\x02\x02\u0282\x1D\x03\x02\x02\x02\u0283\u0281\x03" +
		"\x02\x02\x02\u0284\u0285\x07V\x02\x02\u0285\u0286\x07\t\x02\x02\u0286" +
		"\u0287\x05\x1C\x0F\x02\u0287\x1F\x03\x02\x02\x02\u0288\u0289\b\x11\x01" +
		"\x02\u0289\u02DA\x07#\x02\x02\u028A\u02DA\x07$\x02\x02\u028B\u028C\x07" +
		"I\x02\x02\u028C\u02DA\x05 \x11\x11\u028D\u028E\x07.\x02\x02\u028E\u0297" +
		"\x07\x05\x02\x02\u028F\u0294\x05 \x11\x02\u0290\u0291\x07\x03\x02\x02" +
		"\u0291\u0293\x05 \x11\x02\u0292\u0290\x03\x02\x02\x02\u0293\u0296\x03" +
		"\x02\x02\x02\u0294\u0292\x03\x02\x02\x02\u0294\u0295\x03\x02\x02\x02\u0295" +
		"\u0298\x03\x02\x02\x02\u0296\u0294\x03\x02\x02\x02\u0297\u028F\x03\x02" +
		"\x02\x02\u0297\u0298\x03\x02\x02\x02\u0298\u0299\x03\x02\x02\x02\u0299" +
		"\u029A\x07\x06\x02\x02\u029A\u029B\x07\v\x02\x02\u029B\u02DA\x05 \x11" +
		"\x0F\u029C\u02A0\x07S\x02\x02\u029D\u029F\x07V\x02\x02\u029E\u029D\x03" +
		"\x02\x02\x02\u029F\u02A2\x03\x02\x02\x02\u02A0\u029E\x03\x02\x02\x02\u02A0" +
		"\u02A1\x03\x02\x02\x02\u02A1\u02A3\x03\x02\x02\x02\u02A2\u02A0\x03\x02" +
		"\x02\x02\u02A3\u02A4\x07\x1C\x02\x02\u02A4\u02DA\x05 \x11\x0E\u02A5\u02A6" +
		"\x07D\x02\x02\u02A6\u02A7\x07V\x02\x02\u02A7\u02A8\x07\x1C\x02\x02\u02A8" +
		"\u02DA\x05 \x11\r\u02A9\u02B2\x07\x07\x02\x02\u02AA\u02AF\x05 \x11\x02" +
		"\u02AB\u02AC\x07\x03\x02\x02\u02AC\u02AE\x05 \x11\x02\u02AD\u02AB\x03" +
		"\x02\x02\x02\u02AE\u02B1\x03\x02\x02\x02\u02AF\u02AD\x03\x02\x02\x02\u02AF" +
		"\u02B0\x03\x02\x02\x02\u02B0\u02B3\x03\x02\x02\x02\u02B1\u02AF\x03\x02" +
		"\x02\x02\u02B2\u02AA\x03\x02\x02\x02\u02B2\u02B3\x03\x02\x02\x02\u02B3" +
		"\u02B4\x03\x02\x02\x02\u02B4\u02DA\x07\b\x02\x02\u02B5\u02B6\x07\x07\x02" +
		"\x02\u02B6\u02BB\x05\"\x12\x02\u02B7\u02B8\x07\x03\x02\x02\u02B8\u02BA" +
		"\x05\"\x12\x02\u02B9\u02B7\x03\x02\x02\x02\u02BA\u02BD\x03\x02\x02\x02" +
		"\u02BB\u02B9\x03\x02\x02\x02\u02BB\u02BC\x03\x02\x02\x02\u02BC\u02BE\x03" +
		"\x02\x02\x02\u02BD\u02BB\x03\x02\x02\x02\u02BE\u02BF\x07\b\x02\x02\u02BF" +
		"\u02DA\x03\x02\x02\x02\u02C0\u02C9\x07\x0E\x02\x02\u02C1\u02C6\x05$\x13" +
		"\x02\u02C2\u02C3\x07\x03\x02\x02\u02C3\u02C5\x05$\x13\x02\u02C4\u02C2" +
		"\x03\x02\x02\x02\u02C5\u02C8\x03\x02\x02\x02\u02C6\u02C4\x03\x02\x02\x02" +
		"\u02C6\u02C7\x03\x02\x02\x02\u02C7\u02CA\x03\x02\x02\x02\u02C8\u02C6\x03" +
		"\x02\x02\x02\u02C9\u02C1\x03\x02\x02\x02\u02C9\u02CA\x03\x02\x02\x02\u02CA" +
		"\u02CB\x03\x02\x02\x02\u02CB\u02DA\x07\x0F\x02\x02\u02CC\u02CD\x07\x10" +
		"\x02\x02\u02CD\u02CE\x05 \x11\x02\u02CE\u02CF\x07\x11\x02\x02\u02CF\u02DA" +
		"\x03\x02\x02\x02\u02D0\u02DA\x07%\x02\x02\u02D1\u02DA\x07O\x02\x02\u02D2" +
		"\u02DA\x07P\x02\x02\u02D3\u02DA\x07Q\x02\x02\u02D4\u02DA\x07V\x02\x02" +
		"\u02D5\u02D6\x07\x05\x02\x02\u02D6\u02D7\x05 \x11\x02\u02D7\u02D8\x07" +
		"\x06\x02\x02\u02D8\u02DA\x03\x02\x02\x02\u02D9\u0288\x03\x02\x02\x02\u02D9" +
		"\u028A\x03\x02\x02\x02\u02D9\u028B\x03\x02\x02\x02\u02D9\u028D\x03\x02" +
		"\x02\x02\u02D9\u029C\x03\x02\x02\x02\u02D9\u02A5\x03\x02\x02\x02\u02D9" +
		"\u02A9\x03\x02\x02\x02\u02D9\u02B5\x03\x02\x02\x02\u02D9\u02C0\x03\x02" +
		"\x02\x02\u02D9\u02CC\x03\x02\x02\x02\u02D9\u02D0\x03\x02\x02\x02\u02D9" +
		"\u02D1\x03\x02\x02\x02\u02D9\u02D2\x03\x02\x02\x02\u02D9\u02D3\x03\x02" +
		"\x02\x02\u02D9\u02D4\x03\x02\x02\x02\u02D9\u02D5\x03\x02\x02\x02\u02DA" +
		"\u02E0\x03\x02\x02\x02\u02DB\u02DC\f\x10\x02\x02\u02DC\u02DD\x07\x18\x02" +
		"\x02\u02DD\u02DF\x05 \x11\x11\u02DE\u02DB\x03\x02\x02\x02\u02DF\u02E2" +
		"\x03\x02\x02\x02\u02E0\u02DE\x03\x02\x02\x02\u02E0\u02E1\x03\x02\x02\x02" +
		"\u02E1!\x03\x02\x02\x02\u02E2\u02E0\x03\x02\x02\x02\u02E3\u02E4\x07V\x02" +
		"\x02\u02E4\u02E5\x07\n\x02\x02\u02E5\u02E6\x05 \x11\x02\u02E6#\x03\x02" +
		"\x02\x02\u02E7\u02EA\x07V\x02\x02\u02E8\u02E9\x07\n\x02\x02\u02E9\u02EB" +
		"\x05 \x11\x02\u02EA\u02E8\x03\x02\x02\x02\u02EA\u02EB\x03\x02\x02\x02" +
		"\u02EB%\x03\x02\x02\x02=39GOZ]bjms}\x89\x93\x96\x9B\xA3\xA6\xAC\xC0\u0153" +
		"\u0156\u0164\u0167\u0170\u0179\u0184\u0187\u0191\u0194\u01A4\u01B0\u01BD" +
		"\u01C6\u01FF\u0202\u020C\u021A\u021C\u0230\u0243\u0246\u024F\u0252\u025B" +
		"\u025E\u0276\u027F\u0281\u0294\u0297\u02A0\u02AF\u02B2\u02BB\u02C6\u02C9" +
		"\u02D9\u02E0\u02EA";
	public static readonly _serializedATN: string = Utils.join(
		[
			stellaParser._serializedATNSegment0,
			stellaParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!stellaParser.__ATN) {
			stellaParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(stellaParser._serializedATN));
		}

		return stellaParser.__ATN;
	}

}

export class Start_ProgramContext extends ParserRuleContext {
	public _x!: ProgramContext;
	public EOF(): TerminalNode { return this.getToken(stellaParser.EOF, 0); }
	public program(): ProgramContext {
		return this.getRuleContext(0, ProgramContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_start_Program; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitStart_Program) {
			return visitor.visitStart_Program(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Start_ExprContext extends ParserRuleContext {
	public _x!: ExprContext;
	public EOF(): TerminalNode { return this.getToken(stellaParser.EOF, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_start_Expr; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitStart_Expr) {
			return visitor.visitStart_Expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Start_TypeContext extends ParserRuleContext {
	public _x!: StellatypeContext;
	public EOF(): TerminalNode { return this.getToken(stellaParser.EOF, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_start_Type; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitStart_Type) {
			return visitor.visitStart_Type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProgramContext extends ParserRuleContext {
	public _extension!: ExtensionContext;
	public _extensions: ExtensionContext[] = [];
	public _decl!: DeclContext;
	public _decls: DeclContext[] = [];
	public languageDecl(): LanguageDeclContext {
		return this.getRuleContext(0, LanguageDeclContext);
	}
	public extension(): ExtensionContext[];
	public extension(i: number): ExtensionContext;
	public extension(i?: number): ExtensionContext | ExtensionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExtensionContext);
		} else {
			return this.getRuleContext(i, ExtensionContext);
		}
	}
	public decl(): DeclContext[];
	public decl(i: number): DeclContext;
	public decl(i?: number): DeclContext | DeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclContext);
		} else {
			return this.getRuleContext(i, DeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_program; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LanguageDeclContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_languageDecl; }
	public copyFrom(ctx: LanguageDeclContext): void {
		super.copyFrom(ctx);
	}
}
export class LanguageCoreContext extends LanguageDeclContext {
	public Surrogate_id_SYMB_50(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_50, 0); }
	public Surrogate_id_SYMB_38(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_38, 0); }
	public Surrogate_id_SYMB_1(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_1, 0); }
	constructor(ctx: LanguageDeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLanguageCore) {
			return visitor.visitLanguageCore(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExtensionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_extension; }
	public copyFrom(ctx: ExtensionContext): void {
		super.copyFrom(ctx);
	}
}
export class AnExtensionContext extends ExtensionContext {
	public _ExtensionName!: Token;
	public _extensionNames: Token[] = [];
	public Surrogate_id_SYMB_40(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_40, 0); }
	public Surrogate_id_SYMB_64(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_64, 0); }
	public Surrogate_id_SYMB_1(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_1, 0); }
	public ExtensionName(): TerminalNode[];
	public ExtensionName(i: number): TerminalNode;
	public ExtensionName(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.ExtensionName);
		} else {
			return this.getToken(stellaParser.ExtensionName, i);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExtensionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitAnExtension) {
			return visitor.visitAnExtension(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_decl; }
	public copyFrom(ctx: DeclContext): void {
		super.copyFrom(ctx);
	}
}
export class DeclFunContext extends DeclContext {
	public _annotation!: AnnotationContext;
	public _annotations: AnnotationContext[] = [];
	public _name!: Token;
	public _paramDecl!: ParamDeclContext;
	public _paramDecls: ParamDeclContext[] = [];
	public _returnType!: StellatypeContext;
	public _stellatype!: StellatypeContext;
	public _throwTypes: StellatypeContext[] = [];
	public _decl!: DeclContext;
	public _localDecls: DeclContext[] = [];
	public _returnExpr!: ExprContext;
	public Surrogate_id_SYMB_43(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_43, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_56(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_56, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public Surrogate_id_SYMB_8(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_8, 0); }
	public Surrogate_id_SYMB_59(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_59, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public paramDecl(): ParamDeclContext[];
	public paramDecl(i: number): ParamDeclContext;
	public paramDecl(i?: number): ParamDeclContext | ParamDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamDeclContext);
		} else {
			return this.getRuleContext(i, ParamDeclContext);
		}
	}
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	public decl(): DeclContext[];
	public decl(i: number): DeclContext;
	public decl(i?: number): DeclContext | DeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclContext);
		} else {
			return this.getRuleContext(i, DeclContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: DeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeclFun) {
			return visitor.visitDeclFun(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclFunGenericContext extends DeclContext {
	public _annotation!: AnnotationContext;
	public _annotations: AnnotationContext[] = [];
	public _name!: Token;
	public _StellaIdent!: Token;
	public _generics: Token[] = [];
	public _paramDecl!: ParamDeclContext;
	public _paramDecls: ParamDeclContext[] = [];
	public _returnType!: StellatypeContext;
	public _stellatype!: StellatypeContext;
	public _throwTypes: StellatypeContext[] = [];
	public _decl!: DeclContext;
	public _localDecls: DeclContext[] = [];
	public _returnExpr!: ExprContext;
	public GENERIC(): TerminalNode { return this.getToken(stellaParser.GENERIC, 0); }
	public Surrogate_id_SYMB_43(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_43, 0); }
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_56(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_56, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public StellaIdent(): TerminalNode[];
	public StellaIdent(i: number): TerminalNode;
	public StellaIdent(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.StellaIdent);
		} else {
			return this.getToken(stellaParser.StellaIdent, i);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	public Surrogate_id_SYMB_8(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_8, 0); }
	public Surrogate_id_SYMB_59(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_59, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public paramDecl(): ParamDeclContext[];
	public paramDecl(i: number): ParamDeclContext;
	public paramDecl(i?: number): ParamDeclContext | ParamDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamDeclContext);
		} else {
			return this.getRuleContext(i, ParamDeclContext);
		}
	}
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	public decl(): DeclContext[];
	public decl(i: number): DeclContext;
	public decl(i?: number): DeclContext | DeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclContext);
		} else {
			return this.getRuleContext(i, DeclContext);
		}
	}
	constructor(ctx: DeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeclFunGeneric) {
			return visitor.visitDeclFunGeneric(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclTypeAliasContext extends DeclContext {
	public _name!: Token;
	public _atype!: StellatypeContext;
	public Surrogate_id_SYMB_61(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_61, 0); }
	public Surrogate_id_SYMB_6(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: DeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeclTypeAlias) {
			return visitor.visitDeclTypeAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclExceptionTypeContext extends DeclContext {
	public _exceptionType!: StellatypeContext;
	public EXCEPTION(): TerminalNode { return this.getToken(stellaParser.EXCEPTION, 0); }
	public Surrogate_id_SYMB_61(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_61, 0); }
	public Surrogate_id_SYMB_6(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: DeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeclExceptionType) {
			return visitor.visitDeclExceptionType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclExceptionVariantContext extends DeclContext {
	public _name!: Token;
	public _variantType!: StellatypeContext;
	public EXCEPTION(): TerminalNode { return this.getToken(stellaParser.EXCEPTION, 0); }
	public VARIANT(): TerminalNode { return this.getToken(stellaParser.VARIANT, 0); }
	public Surrogate_id_SYMB_7(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_7, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: DeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeclExceptionVariant) {
			return visitor.visitDeclExceptionVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_annotation; }
	public copyFrom(ctx: AnnotationContext): void {
		super.copyFrom(ctx);
	}
}
export class InlineAnnotationContext extends AnnotationContext {
	public Surrogate_id_SYMB_48(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_48, 0); }
	constructor(ctx: AnnotationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitInlineAnnotation) {
			return visitor.visitInlineAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _paramType!: StellatypeContext;
	public Surrogate_id_SYMB_7(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_7, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_paramDecl; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitParamDecl) {
			return visitor.visitParamDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class DotRecordContext extends ExprContext {
	public _expr_!: ExprContext;
	public _label!: Token;
	public Surrogate_id_SYMB_25(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_25, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDotRecord) {
			return visitor.visitDotRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DotTupleContext extends ExprContext {
	public _expr_!: ExprContext;
	public _index!: Token;
	public Surrogate_id_SYMB_25(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_25, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public INTEGER(): TerminalNode { return this.getToken(stellaParser.INTEGER, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDotTuple) {
			return visitor.visitDotTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConstTrueContext extends ExprContext {
	public Surrogate_id_SYMB_60(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_60, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConstTrue) {
			return visitor.visitConstTrue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConstFalseContext extends ExprContext {
	public Surrogate_id_SYMB_41(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_41, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConstFalse) {
			return visitor.visitConstFalse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConstUnitContext extends ExprContext {
	public Surrogate_id_SYMB_63(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_63, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConstUnit) {
			return visitor.visitConstUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConstIntContext extends ExprContext {
	public _n!: Token;
	public INTEGER(): TerminalNode { return this.getToken(stellaParser.INTEGER, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConstInt) {
			return visitor.visitConstInt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConstMemoryContext extends ExprContext {
	public _mem!: Token;
	public MemoryAddress(): TerminalNode { return this.getToken(stellaParser.MemoryAddress, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConstMemory) {
			return visitor.visitConstMemory(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VarContext extends ExprContext {
	public _name!: Token;
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitVar) {
			return visitor.visitVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PanicContext extends ExprContext {
	public PANIC(): TerminalNode { return this.getToken(stellaParser.PANIC, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPanic) {
			return visitor.visitPanic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThrowContext extends ExprContext {
	public _expr_!: ExprContext;
	public THROW(): TerminalNode { return this.getToken(stellaParser.THROW, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitThrow) {
			return visitor.visitThrow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TryCatchContext extends ExprContext {
	public _tryExpr!: ExprContext;
	public _pat!: PatternContext;
	public _fallbackExpr!: ExprContext;
	public TRY(): TerminalNode { return this.getToken(stellaParser.TRY, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode[];
	public Surrogate_id_SYMB_4(i: number): TerminalNode;
	public Surrogate_id_SYMB_4(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_4);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_4, i);
		}
	}
	public Surrogate_id_SYMB_5(): TerminalNode[];
	public Surrogate_id_SYMB_5(i: number): TerminalNode;
	public Surrogate_id_SYMB_5(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_5);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_5, i);
		}
	}
	public CATCH(): TerminalNode { return this.getToken(stellaParser.CATCH, 0); }
	public Surrogate_id_SYMB_9(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_9, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTryCatch) {
			return visitor.visitTryCatch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TryCastAsContext extends ExprContext {
	public _tryExpr!: ExprContext;
	public _type_!: StellatypeContext;
	public _pattern_!: PatternContext;
	public _expr_!: ExprContext;
	public _fallbackExpr!: ExprContext;
	public TRY(): TerminalNode { return this.getToken(stellaParser.TRY, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode[];
	public Surrogate_id_SYMB_4(i: number): TerminalNode;
	public Surrogate_id_SYMB_4(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_4);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_4, i);
		}
	}
	public Surrogate_id_SYMB_5(): TerminalNode[];
	public Surrogate_id_SYMB_5(i: number): TerminalNode;
	public Surrogate_id_SYMB_5(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_5);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_5, i);
		}
	}
	public CAST(): TerminalNode { return this.getToken(stellaParser.CAST, 0); }
	public Surrogate_id_SYMB_36(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_36, 0); }
	public Surrogate_id_SYMB_9(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_9, 0); }
	public Surrogate_id_SYMB_64(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_64, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTryCastAs) {
			return visitor.visitTryCastAs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TryWithContext extends ExprContext {
	public _tryExpr!: ExprContext;
	public _fallbackExpr!: ExprContext;
	public TRY(): TerminalNode { return this.getToken(stellaParser.TRY, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode[];
	public Surrogate_id_SYMB_4(i: number): TerminalNode;
	public Surrogate_id_SYMB_4(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_4);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_4, i);
		}
	}
	public Surrogate_id_SYMB_5(): TerminalNode[];
	public Surrogate_id_SYMB_5(i: number): TerminalNode;
	public Surrogate_id_SYMB_5(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_5);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_5, i);
		}
	}
	public Surrogate_id_SYMB_64(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_64, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTryWith) {
			return visitor.visitTryWith(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InlContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_47(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_47, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitInl) {
			return visitor.visitInl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InrContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_49(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_49, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitInr) {
			return visitor.visitInr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConsListContext extends ExprContext {
	public _head!: ExprContext;
	public _tail!: ExprContext;
	public Surrogate_id_SYMB_37(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_37, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_0(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_0, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitConsList) {
			return visitor.visitConsList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class HeadContext extends ExprContext {
	public _list!: ExprContext;
	public Surrogate_id_SYMB_26(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_26, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitHead) {
			return visitor.visitHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IsEmptyContext extends ExprContext {
	public _list!: ExprContext;
	public Surrogate_id_SYMB_27(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_27, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitIsEmpty) {
			return visitor.visitIsEmpty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TailContext extends ExprContext {
	public _list!: ExprContext;
	public Surrogate_id_SYMB_28(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_28, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTail) {
			return visitor.visitTail(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SuccContext extends ExprContext {
	public _n!: ExprContext;
	public Surrogate_id_SYMB_57(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_57, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitSucc) {
			return visitor.visitSucc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicNotContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_54(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_54, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLogicNot) {
			return visitor.visitLogicNot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PredContext extends ExprContext {
	public _n!: ExprContext;
	public Surrogate_id_SYMB_29(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_29, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPred) {
			return visitor.visitPred(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IsZeroContext extends ExprContext {
	public _n!: ExprContext;
	public Surrogate_id_SYMB_30(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_30, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitIsZero) {
			return visitor.visitIsZero(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FixContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_42(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_42, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitFix) {
			return visitor.visitFix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NatRecContext extends ExprContext {
	public _n!: ExprContext;
	public _initial!: ExprContext;
	public _step!: ExprContext;
	public Surrogate_id_SYMB_31(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_31, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitNatRec) {
			return visitor.visitNatRec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FoldContext extends ExprContext {
	public _type_!: StellatypeContext;
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_44(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_44, 0); }
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitFold) {
			return visitor.visitFold(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnfoldContext extends ExprContext {
	public _type_!: StellatypeContext;
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_62(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_62, 0); }
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitUnfold) {
			return visitor.visitUnfold(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ApplicationContext extends ExprContext {
	public _fun!: ExprContext;
	public _expr!: ExprContext;
	public _args: ExprContext[] = [];
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitApplication) {
			return visitor.visitApplication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeApplicationContext extends ExprContext {
	public _fun!: ExprContext;
	public _stellatype!: StellatypeContext;
	public _types: StellatypeContext[] = [];
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeApplication) {
			return visitor.visitTypeApplication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplyContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_23(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_23, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitMultiply) {
			return visitor.visitMultiply(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DivideContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_24(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_24, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDivide) {
			return visitor.visitDivide(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicAndContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_35(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_35, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLogicAnd) {
			return visitor.visitLogicAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RefContext extends ExprContext {
	public _expr_!: ExprContext;
	public REFERENCE(): TerminalNode { return this.getToken(stellaParser.REFERENCE, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitRef) {
			return visitor.visitRef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DerefContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_23(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_23, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitDeref) {
			return visitor.visitDeref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_21(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_21, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitAdd) {
			return visitor.visitAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubtractContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_22(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_22, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitSubtract) {
			return visitor.visitSubtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicOrContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_55(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_55, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLogicOr) {
			return visitor.visitLogicOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeAscContext extends ExprContext {
	public _expr_!: ExprContext;
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_36(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_36, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeAsc) {
			return visitor.visitTypeAsc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeCastContext extends ExprContext {
	public _expr_!: ExprContext;
	public _type_!: StellatypeContext;
	public CAST(): TerminalNode { return this.getToken(stellaParser.CAST, 0); }
	public Surrogate_id_SYMB_36(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_36, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeCast) {
			return visitor.visitTypeCast(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AbstractionContext extends ExprContext {
	public _paramDecl!: ParamDeclContext;
	public _paramDecls: ParamDeclContext[] = [];
	public _returnExpr!: ExprContext;
	public Surrogate_id_SYMB_43(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_43, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_56(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_56, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public paramDecl(): ParamDeclContext[];
	public paramDecl(i: number): ParamDeclContext;
	public paramDecl(i?: number): ParamDeclContext | ParamDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamDeclContext);
		} else {
			return this.getRuleContext(i, ParamDeclContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitAbstraction) {
			return visitor.visitAbstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleContext extends ExprContext {
	public _expr!: ExprContext;
	public _exprs: ExprContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTuple) {
			return visitor.visitTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RecordContext extends ExprContext {
	public _binding!: BindingContext;
	public _bindings: BindingContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public binding(): BindingContext[];
	public binding(i: number): BindingContext;
	public binding(i?: number): BindingContext | BindingContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BindingContext);
		} else {
			return this.getRuleContext(i, BindingContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitRecord) {
			return visitor.visitRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariantContext extends ExprContext {
	public _label!: Token;
	public _rhs!: ExprContext;
	public Surrogate_id_SYMB_11(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_11, 0); }
	public Surrogate_id_SYMB_12(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_12, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public Surrogate_id_SYMB_6(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitVariant) {
			return visitor.visitVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatchContext extends ExprContext {
	public _expr_!: ExprContext;
	public _matchCase!: MatchCaseContext;
	public _cases: MatchCaseContext[] = [];
	public Surrogate_id_SYMB_53(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_53, 0); }
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public matchCase(): MatchCaseContext[];
	public matchCase(i: number): MatchCaseContext;
	public matchCase(i?: number): MatchCaseContext | MatchCaseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MatchCaseContext);
		} else {
			return this.getRuleContext(i, MatchCaseContext);
		}
	}
	public Surrogate_id_SYMB_10(): TerminalNode[];
	public Surrogate_id_SYMB_10(i: number): TerminalNode;
	public Surrogate_id_SYMB_10(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_10);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_10, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitMatch) {
			return visitor.visitMatch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListContext extends ExprContext {
	public _expr!: ExprContext;
	public _exprs: ExprContext[] = [];
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LessThanContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_15(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_15, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLessThan) {
			return visitor.visitLessThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LessThanOrEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_16(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_16, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLessThanOrEqual) {
			return visitor.visitLessThanOrEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_17(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_17, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitGreaterThan) {
			return visitor.visitGreaterThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanOrEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_18(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_18, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitGreaterThanOrEqual) {
			return visitor.visitGreaterThanOrEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_19(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_19, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitEqual) {
			return visitor.visitEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _right!: ExprContext;
	public Surrogate_id_SYMB_20(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_20, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitNotEqual) {
			return visitor.visitNotEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignContext extends ExprContext {
	public _lhs!: ExprContext;
	public _rhs!: ExprContext;
	public ASSIGN(): TerminalNode { return this.getToken(stellaParser.ASSIGN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitAssign) {
			return visitor.visitAssign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfContext extends ExprContext {
	public _condition!: ExprContext;
	public _thenExpr!: ExprContext;
	public _elseExpr!: ExprContext;
	public Surrogate_id_SYMB_45(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_45, 0); }
	public Surrogate_id_SYMB_58(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_58, 0); }
	public Surrogate_id_SYMB_39(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_39, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitIf) {
			return visitor.visitIf(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SequenceContext extends ExprContext {
	public _expr1!: ExprContext;
	public _expr2!: ExprContext;
	public Surrogate_id_SYMB_1(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_1, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitSequence) {
			return visitor.visitSequence(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LetContext extends ExprContext {
	public _patternBinding!: PatternBindingContext;
	public _patternBindings: PatternBindingContext[] = [];
	public _body!: ExprContext;
	public Surrogate_id_SYMB_51(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_51, 0); }
	public Surrogate_id_SYMB_46(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_46, 0); }
	public patternBinding(): PatternBindingContext[];
	public patternBinding(i: number): PatternBindingContext;
	public patternBinding(i?: number): PatternBindingContext | PatternBindingContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternBindingContext);
		} else {
			return this.getRuleContext(i, PatternBindingContext);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLet) {
			return visitor.visitLet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LetRecContext extends ExprContext {
	public _patternBinding!: PatternBindingContext;
	public _patternBindings: PatternBindingContext[] = [];
	public _body!: ExprContext;
	public Surrogate_id_SYMB_52(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_52, 0); }
	public Surrogate_id_SYMB_46(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_46, 0); }
	public patternBinding(): PatternBindingContext[];
	public patternBinding(i: number): PatternBindingContext;
	public patternBinding(i?: number): PatternBindingContext | PatternBindingContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternBindingContext);
		} else {
			return this.getRuleContext(i, PatternBindingContext);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLetRec) {
			return visitor.visitLetRec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeAbstractionContext extends ExprContext {
	public _StellaIdent!: Token;
	public _generics: Token[] = [];
	public _expr_!: ExprContext;
	public GENERIC(): TerminalNode { return this.getToken(stellaParser.GENERIC, 0); }
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public StellaIdent(): TerminalNode[];
	public StellaIdent(i: number): TerminalNode;
	public StellaIdent(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.StellaIdent);
		} else {
			return this.getToken(stellaParser.StellaIdent, i);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeAbstraction) {
			return visitor.visitTypeAbstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesisedExprContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitParenthesisedExpr) {
			return visitor.visitParenthesisedExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TerminatingSemicolonContext extends ExprContext {
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_1(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_1, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTerminatingSemicolon) {
			return visitor.visitTerminatingSemicolon(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternBindingContext extends ParserRuleContext {
	public _pat!: PatternContext;
	public _rhs!: ExprContext;
	public Surrogate_id_SYMB_6(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_patternBinding; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternBinding) {
			return visitor.visitPatternBinding(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BindingContext extends ParserRuleContext {
	public _name!: Token;
	public _rhs!: ExprContext;
	public Surrogate_id_SYMB_6(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_binding; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitBinding) {
			return visitor.visitBinding(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchCaseContext extends ParserRuleContext {
	public _pattern_!: PatternContext;
	public _expr_!: ExprContext;
	public Surrogate_id_SYMB_9(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_9, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_matchCase; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitMatchCase) {
			return visitor.visitMatchCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_pattern; }
	public copyFrom(ctx: PatternContext): void {
		super.copyFrom(ctx);
	}
}
export class PatternVariantContext extends PatternContext {
	public _label!: Token;
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_11(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_11, 0); }
	public Surrogate_id_SYMB_12(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_12, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public Surrogate_id_SYMB_6(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public pattern(): PatternContext | undefined {
		return this.tryGetRuleContext(0, PatternContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternVariant) {
			return visitor.visitPatternVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternInlContext extends PatternContext {
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_47(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_47, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternInl) {
			return visitor.visitPatternInl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternInrContext extends PatternContext {
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_49(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_49, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternInr) {
			return visitor.visitPatternInr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternTupleContext extends PatternContext {
	public _pattern!: PatternContext;
	public _patterns: PatternContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public pattern(): PatternContext[];
	public pattern(i: number): PatternContext;
	public pattern(i?: number): PatternContext | PatternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternContext);
		} else {
			return this.getRuleContext(i, PatternContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternTuple) {
			return visitor.visitPatternTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternRecordContext extends PatternContext {
	public _labelledPattern!: LabelledPatternContext;
	public _patterns: LabelledPatternContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public labelledPattern(): LabelledPatternContext[];
	public labelledPattern(i: number): LabelledPatternContext;
	public labelledPattern(i?: number): LabelledPatternContext | LabelledPatternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LabelledPatternContext);
		} else {
			return this.getRuleContext(i, LabelledPatternContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternRecord) {
			return visitor.visitPatternRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternListContext extends PatternContext {
	public _pattern!: PatternContext;
	public _patterns: PatternContext[] = [];
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public pattern(): PatternContext[];
	public pattern(i: number): PatternContext;
	public pattern(i?: number): PatternContext | PatternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternContext);
		} else {
			return this.getRuleContext(i, PatternContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternList) {
			return visitor.visitPatternList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternConsContext extends PatternContext {
	public _head!: PatternContext;
	public _tail!: PatternContext;
	public Surrogate_id_SYMB_37(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_37, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_0(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_0, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public pattern(): PatternContext[];
	public pattern(i: number): PatternContext;
	public pattern(i?: number): PatternContext | PatternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternContext);
		} else {
			return this.getRuleContext(i, PatternContext);
		}
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternCons) {
			return visitor.visitPatternCons(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternFalseContext extends PatternContext {
	public Surrogate_id_SYMB_41(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_41, 0); }
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternFalse) {
			return visitor.visitPatternFalse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternTrueContext extends PatternContext {
	public Surrogate_id_SYMB_60(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_60, 0); }
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternTrue) {
			return visitor.visitPatternTrue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternUnitContext extends PatternContext {
	public Surrogate_id_SYMB_63(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_63, 0); }
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternUnit) {
			return visitor.visitPatternUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternIntContext extends PatternContext {
	public _n!: Token;
	public INTEGER(): TerminalNode { return this.getToken(stellaParser.INTEGER, 0); }
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternInt) {
			return visitor.visitPatternInt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternSuccContext extends PatternContext {
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_57(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_57, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternSucc) {
			return visitor.visitPatternSucc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternVarContext extends PatternContext {
	public _name!: Token;
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternVar) {
			return visitor.visitPatternVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternAscContext extends PatternContext {
	public _pattern_!: PatternContext;
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_36(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_36, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternAsc) {
			return visitor.visitPatternAsc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PatternCastAsContext extends PatternContext {
	public _pattern_!: PatternContext;
	public _type_!: StellatypeContext;
	public CAST(): TerminalNode { return this.getToken(stellaParser.CAST, 0); }
	public Surrogate_id_SYMB_36(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_36, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitPatternCastAs) {
			return visitor.visitPatternCastAs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesisedPatternContext extends PatternContext {
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(ctx: PatternContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitParenthesisedPattern) {
			return visitor.visitParenthesisedPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabelledPatternContext extends ParserRuleContext {
	public _label!: Token;
	public _pattern_!: PatternContext;
	public Surrogate_id_SYMB_6(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_6, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_labelledPattern; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitLabelledPattern) {
			return visitor.visitLabelledPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StellatypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_stellatype; }
	public copyFrom(ctx: StellatypeContext): void {
		super.copyFrom(ctx);
	}
}
export class TypeBoolContext extends StellatypeContext {
	public Surrogate_id_SYMB_32(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_32, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeBool) {
			return visitor.visitTypeBool(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeNatContext extends StellatypeContext {
	public Surrogate_id_SYMB_33(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_33, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeNat) {
			return visitor.visitTypeNat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeRefContext extends StellatypeContext {
	public _type_!: StellatypeContext;
	public REF_TYPE(): TerminalNode { return this.getToken(stellaParser.REF_TYPE, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeRef) {
			return visitor.visitTypeRef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeSumContext extends StellatypeContext {
	public _left!: StellatypeContext;
	public _right!: StellatypeContext;
	public Surrogate_id_SYMB_21(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_21, 0); }
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeSum) {
			return visitor.visitTypeSum(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeFunContext extends StellatypeContext {
	public _stellatype!: StellatypeContext;
	public _paramTypes: StellatypeContext[] = [];
	public _returnType!: StellatypeContext;
	public Surrogate_id_SYMB_43(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_43, 0); }
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public Surrogate_id_SYMB_8(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_8, 0); }
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeFun) {
			return visitor.visitTypeFun(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeForAllContext extends StellatypeContext {
	public _StellaIdent!: Token;
	public _types: Token[] = [];
	public _type_!: StellatypeContext;
	public FORALL(): TerminalNode { return this.getToken(stellaParser.FORALL, 0); }
	public Surrogate_id_SYMB_25(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_25, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	public StellaIdent(): TerminalNode[];
	public StellaIdent(i: number): TerminalNode;
	public StellaIdent(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.StellaIdent);
		} else {
			return this.getToken(stellaParser.StellaIdent, i);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeForAll) {
			return visitor.visitTypeForAll(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeRecContext extends StellatypeContext {
	public _var!: Token;
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_65(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_65, 0); }
	public Surrogate_id_SYMB_25(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_25, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeRec) {
			return visitor.visitTypeRec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeTupleContext extends StellatypeContext {
	public _stellatype!: StellatypeContext;
	public _types: StellatypeContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public stellatype(): StellatypeContext[];
	public stellatype(i: number): StellatypeContext;
	public stellatype(i?: number): StellatypeContext | StellatypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StellatypeContext);
		} else {
			return this.getRuleContext(i, StellatypeContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeTuple) {
			return visitor.visitTypeTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeRecordContext extends StellatypeContext {
	public _recordFieldType!: RecordFieldTypeContext;
	public _fieldTypes: RecordFieldTypeContext[] = [];
	public Surrogate_id_SYMB_4(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_4, 0); }
	public Surrogate_id_SYMB_5(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_5, 0); }
	public recordFieldType(): RecordFieldTypeContext[];
	public recordFieldType(i: number): RecordFieldTypeContext;
	public recordFieldType(i?: number): RecordFieldTypeContext | RecordFieldTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RecordFieldTypeContext);
		} else {
			return this.getRuleContext(i, RecordFieldTypeContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeRecord) {
			return visitor.visitTypeRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeVariantContext extends StellatypeContext {
	public _variantFieldType!: VariantFieldTypeContext;
	public _fieldTypes: VariantFieldTypeContext[] = [];
	public Surrogate_id_SYMB_11(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_11, 0); }
	public Surrogate_id_SYMB_12(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_12, 0); }
	public variantFieldType(): VariantFieldTypeContext[];
	public variantFieldType(i: number): VariantFieldTypeContext;
	public variantFieldType(i?: number): VariantFieldTypeContext | VariantFieldTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariantFieldTypeContext);
		} else {
			return this.getRuleContext(i, VariantFieldTypeContext);
		}
	}
	public Surrogate_id_SYMB_0(): TerminalNode[];
	public Surrogate_id_SYMB_0(i: number): TerminalNode;
	public Surrogate_id_SYMB_0(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(stellaParser.Surrogate_id_SYMB_0);
		} else {
			return this.getToken(stellaParser.Surrogate_id_SYMB_0, i);
		}
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeVariant) {
			return visitor.visitTypeVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeListContext extends StellatypeContext {
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_13(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_13, 0); }
	public Surrogate_id_SYMB_14(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_14, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeUnitContext extends StellatypeContext {
	public Surrogate_id_SYMB_34(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_34, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeUnit) {
			return visitor.visitTypeUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeTopContext extends StellatypeContext {
	public TOP_TYPE(): TerminalNode { return this.getToken(stellaParser.TOP_TYPE, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeTop) {
			return visitor.visitTypeTop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeBottomContext extends StellatypeContext {
	public BOTTOM_TYPE(): TerminalNode { return this.getToken(stellaParser.BOTTOM_TYPE, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeBottom) {
			return visitor.visitTypeBottom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeAutoContext extends StellatypeContext {
    // CUSTOM FIELD
    typeVarID: number | undefined = undefined;
	public AUTO_TYPE(): TerminalNode { return this.getToken(stellaParser.AUTO_TYPE, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeAuto) {
			return visitor.visitTypeAuto(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeVarContext extends StellatypeContext {
	public _name!: Token;
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeVar) {
			return visitor.visitTypeVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeParensContext extends StellatypeContext {
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_2(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_2, 0); }
	public Surrogate_id_SYMB_3(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_3, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(ctx: StellatypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitTypeParens) {
			return visitor.visitTypeParens(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecordFieldTypeContext extends ParserRuleContext {
	public _label!: Token;
	public _type_!: StellatypeContext;
	public Surrogate_id_SYMB_7(): TerminalNode { return this.getToken(stellaParser.Surrogate_id_SYMB_7, 0); }
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public stellatype(): StellatypeContext {
		return this.getRuleContext(0, StellatypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_recordFieldType; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitRecordFieldType) {
			return visitor.visitRecordFieldType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariantFieldTypeContext extends ParserRuleContext {
	public _label!: Token;
	public _type_!: StellatypeContext;
	public StellaIdent(): TerminalNode { return this.getToken(stellaParser.StellaIdent, 0); }
	public Surrogate_id_SYMB_7(): TerminalNode | undefined { return this.tryGetToken(stellaParser.Surrogate_id_SYMB_7, 0); }
	public stellatype(): StellatypeContext | undefined {
		return this.tryGetRuleContext(0, StellatypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return stellaParser.RULE_variantFieldType; }
	// @Override
	public accept<Result>(visitor: stellaParserVisitor<Result>): Result {
		if (visitor.visitVariantFieldType) {
			return visitor.visitVariantFieldType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
