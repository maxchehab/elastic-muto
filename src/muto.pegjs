/*
 * Core PEG
 */
ExprWrapper "Expression Wrapper"
    = expr:Expression {
        return expr instanceof BoolQuery
            ? expr
            : new BoolQuery().must(expr)
    }

Expression "Where Expression"
    = '(' head:Expression tail:(And expr:Expression { return expr; })+ ')' {
        var conditions = tail;
        conditions.unshift(head);
        return new BoolQuery().must(conditions);
    }
    / '(' head:Expression tail:(Or expr:Expression { return expr; })+ ')' {
        var conditions = tail;
        conditions.unshift(head);
        return new BoolQuery().should(conditions);
    }
    / '(' expr:Expression ')' { return expr; }
    / head:PropertyCondition
    torso:(And cond:PropertyCondition { return cond; })+
    tail:(And expr:Expression { return expr; })* {
        var conditions = torso.concat(tail);
        conditions.unshift(head);
        return new BoolQuery().must(conditions);
    }
    / head:PropertyCondition
    torso:(And cond:PropertyCondition { return cond; })*
    tail:(And expr:Expression { return expr; })+ {
        var conditions = torso.concat(tail);
        conditions.unshift(head);
        return new BoolQuery().must(conditions);
    }
    / head:PropertyCondition
    torso:(Or cond:PropertyCondition { return cond; })+
    tail:(Or expr:Expression { return expr; })* {
        var conditions = torso.concat(tail);
        conditions.unshift(head);
        return new BoolQuery().should(conditions);
    }
    / head:PropertyCondition
    torso:(Or cond:PropertyCondition { return cond; })*
    tail:(Or expr:Expression { return expr; })+ {
        var conditions = torso.concat(tail);
        conditions.unshift(head);
        return new BoolQuery().should(conditions);
    }
    / PropertyCondition

PropertyCondition "Property Condition"
    = _ '(' _ cond:PropertyCondition _ ')' _ { return cond; }
    / NumLtCondition
    / NumGtCondition
    / NumLteCondition
    / NumGteCondition
    / NumEqCondition
    / NumNeCondition
    / StrEqCondition
    / StrNeCondition

/*
 * Numeric property conditions
 */

NumLteCondition "Number property less than or equal to condition"
    = key:PropertyKey LteOperator value:NumericValue
    { return options.numLte(key, value); }

NumGteCondition "Number property greater than or equal to condition"
    = key:PropertyKey GteOperator value:NumericValue
    { return options.numGte(key, value); }

NumLtCondition "Number property less than condition"
    = key:PropertyKey LtOperator value:NumericValue
    { return options.numLt(key, value); }

NumGtCondition "Number property greater than condition"
    = key:PropertyKey GtOperator value:NumericValue
    { return options.numGt(key, value); }

NumEqCondition "Number property equality condition"
    = key:PropertyKey EqOperator value:NumericValue
    { return options.numEq(key, value); }

NumNeCondition "Number property inequality condition"
    = key:PropertyKey NeOperator value:NumericValue
    { return options.numNe(key, value); }

/*
 * String property conditions
 */
StrEqCondition "String property equality condition"
    = key:PropertyKey EqOperator value:StringValue
    { return options.strEq(key, value, options.notAnalysedFields); }

StrNeCondition "String property inequality condition"
    = key:PropertyKey NeOperator value:StringValue
    { return options.strNe(key, value, options.notAnalysedFields); }

/*
 * Property Keys, operators and property values
 */
PropertyKey "Property key"
    = begin_property chars:char+ end_property
    { return options.propertyKey(chars) }

EqOperator "Equal operator"
    = _ "==" _

NeOperator "Not equal operator"
    = _ "!=" _

LtOperator "Less than operator"
    = _ "<" _

GtOperator "Greater than operator"
    = _ ">" _

LteOperator "Less than or equal to operator"
    = _ "<=" _

GteOperator "Greater than or equal to operator"
    = _ ">=" _

NumericValue "Numeric Value"
    = quotation_mark val:NumericValue quotation_mark { return val; }
    / minus? int frac? exp? { return parseFloat(text()); }

StringValue "String value"
    = quotation_mark chars:char* quotation_mark { return chars.join(""); }

/*
 * Supporting identifiers
 */
Or "or condition"
    = _ "or"i _

And "and condition"
    = _ "and"i _

begin_property = _ '"'
end_property = '"' _


/* ----- Numbers ----- */
decimal_point = "."
digit1_9      = [1-9]
e             = [eE]
exp           = e (minus / plus)? DIGIT+
frac          = decimal_point DIGIT+
int           = zero / (digit1_9 DIGIT*)
minus         = "-"
plus          = "+"
zero          = "0"

/* ----- Strings ----- */
char
    = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    ) { return sequence; }

escape         = "\\"
quotation_mark = '"'
unescaped = [^\0-\x1F\x22\x5C]

DIGIT  = [0-9]
HEXDIG = [0-9a-f]i

_ "whitespace"
    = [ \t\n\r]*
