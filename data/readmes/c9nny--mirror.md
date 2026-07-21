A tool for reconstructing lexical scope topology in incomplete functional language programs. Its written to inspect partially recovered abstract syntax, enumerate explainable name binding candidates and apply only semantics preserving repairs that satisfy an explicit confidence policy

Canonical lexical resolution is done unconditionally before any recovery pass. Heuristic inference is strictly subordinate and must never introduce, replace or override any binding edge derivable from the languages lexical semantics
