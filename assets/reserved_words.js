const sqlReservedWordsUpper = [
    "ADD", "ALL", "ALTER", "AND", "ANY", "AS", "ASC", "AUTHORIZATION", "BACKUP",
    "BEGIN", "BETWEEN", "BREAK", "BROWSE", "BULK", "BY", "CASCADE", "CASE", "CHECK",
    "CHECKPOINT", "CLOSE", "CLUSTERED", "COALESCE", "COLLATE", "COLUMN", "COMMIT",
    "COMPUTE", "CONSTRAINT", "CONTAINS", "CONTAINSTABLE", "CONTINUE", "CONVERT",
    "CREATE", "CROSS", "CURRENT", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP",
    "CURRENT_USER", "CURSOR", "DATABASE", "DBCC", "DEALLOCATE", "DECLARE", "DEFAULT",
    "DELETE", "DENY", "DESC", "DISK", "DISTINCT", "DISTRIBUTED", "DOUBLE", "DROP",
    "DUMP", "ELSE", "END", "ERRLVL", "ESCAPE", "EXCEPT", "EXEC", "EXECUTE", "EXISTS",
    "EXIT", "EXTERNAL", "FETCH", "FILE", "FILLFACTOR", "FOR", "FOREIGN", "FREETEXT",
    "FREETEXTTABLE", "FROM", "FULL", "FUNCTION", "GOTO", "GRANT", "GROUP", "HAVING",
    "HOLDLOCK", "IDENTITY", "IDENTITY_INSERT", "IDENTITYCOL", "IF", "IN", "INDEX",
    "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KILL", "LEFT",
    "LIKE", "LINENO", "LOAD", "MERGE", "NATIONAL", "NOCHECK", "NONCLUSTERED", "NOT",
    "NULL", "NULLIF", "OF", "OFF", "OFFSETS", "ON", "OPEN", "OPENDATASOURCE",
    "OPENQUERY", "OPENROWSET", "OPENXML", "OPTION", "OR", "ORDER", "OUTER", "OVER",
    "PERCENT", "PIVOT", "PLAN", "PRECISION", "PRIMARY", "PRINT", "PROC", "PROCEDURE",
    "PUBLIC", "RAISERROR", "READ", "READTEXT", "RECONFIGURE", "REFERENCES",
    "REPLICATION", "RESTORE", "RESTRICT", "RETURN", "REVERT", "REVOKE", "RIGHT",
    "ROLLBACK", "ROWCOUNT", "ROWGUIDCOL", "RULE", "SAVE", "SCHEMA", "SECURITYAUDIT",
    "SELECT", "SEMANTICKEYPHRASETABLE", "SEMANTICSIMILARITYDETAILSTABLE",
    "SEMANTICSIMILARITYTABLE", "SESSION_USER", "SET", "SETUSER", "SHUTDOWN", "SOME",
    "STATISTICS", "SYSTEM_USER", "TABLE", "TABLESAMPLE", "TEXTSIZE", "THEN", "TO",
    "TOP", "TRAN", "TRANSACTION", "TRIGGER", "TRUNCATE", "TRY_CONVERT", "TSEQUAL",
    "UNION", "UNIQUE", "UNPIVOT", "UPDATE", "UPDATETEXT", "USE", "USER", "VALUES",
    "VARYING", "VIEW", "WAITFOR", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN GROUP",
    "WRITETEXT", "XOR"
];

const pythonReservedWords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def',
    'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
    'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
    'while', 'with', 'yield', 'ArithmeticError', 'AssertionError', 'AttributeError',
    'BaseException', 'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning',
    'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError',
    'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning', 'EOFError',
    'Ellipsis', 'EnvironmentError', 'Exception', 'False', 'FileExistsError',
    'FileNotFoundError', 'FloatingPointError', 'FutureWarning', 'GeneratorExit', 'IOError',
    'ImportError', 'ImportWarning', 'IndentationError', 'IndexError',
    'InterruptedError', 'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError',
    'MemoryError', 'NameError', 'None', 'NotADirectoryError', 'NotImplemented',
    'NotImplementedError', 'OSError', 'OverflowError', 'PendingDeprecationWarning',
    'PermissionError', 'ProcessLookupError', 'RecursionError', 'ReferenceError',
    'ResourceWarning', 'RuntimeError', 'RuntimeWarning', 'StopAsyncIteration',
    'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError', 'SystemExit',
    'TabError', 'TimeoutError', 'True', 'TypeError', 'UnboundLocalError',
    'UnicodeDecodeError', 'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError',
    'UnicodeWarning', 'UserWarning', 'ValueError', 'Warning', 'ZeroDivisionError', '_',
    '__build_class__', '__debug__', '__doc__', '__import__', '__loader__', '__name__',
    '__package__', '__spec__', 'abs', 'all', 'any', 'ascii', 'bin', 'bool',
    'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex',
    'copyright', 'credits', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval',
    'exec', 'exit', 'filter', 'float', 'format', 'frozenset', 'getattr',
    'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int',
    'isinstance', 'issubclass', 'iter', 'len', 'license', 'list', 'locals', 'map',
    'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow',
    'print', 'property', 'quit', 'range', 'repr', 'reversed', 'round', 'set',
    'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple',
    'type', 'vars', 'zip',
    "__main__",
    "__init__",
    "__del__",
    "__repr__",
    "__str__",
    "__bytes__",
    "__eq__",
    "__ne__",
    "__lt__",
    "__le__",
    "__gt__",
    "__ge__",
    "__add__",
    "__sub__",
    "__mul__",
    "__truediv__",
    "__floordiv__",
    "__mod__",
    "__pow__",
    "__and__",
    "__or__",
    "__xor__",
    "__lshift__",
    "__rshift__",
    "__neg__",
    "__pos__",
    "__abs__",
    "__invert__",
    "__complex__",
    "__int__",
    "__float__",
    "__index__",
    "__call__",
    "__enter__", "__exit__",
    "__getitem__", " __setitem__", "__delitem__",
    "__iter__", "__next__",
    "__contains__",
    "__len__",
    "__await__",
    "__aiter__", "__anext__",
    "__aenter__", "__aexit__",
];
const pythonReservedWordsUpper = pythonReservedWords.map(word => word.toUpperCase());

module.exports = {
    sqlReservedWordsUpper,
    pythonReservedWordsUpper
};
