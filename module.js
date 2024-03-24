function pair(a, b)
{
    return select => select(a, b)
}
function first(p)
{
    return p((a, b) => a);
}
function second(p)
{
    return p((a, b) => b);
}
function isPair(x)
{
    return typeof(x) == 'function';
}
function pairToString(p)
{
    if(!isPair(p))
    {
        return String(p);
    }
    else
    {
        return "(" +
            pairToString(first(p)) +
            "," +
            pairToString(second(p)) +
            ")";
    }
}
var head = first;
var tail = second;
function length(ls)
{
    if (ls == null)
    {
        return 0;
    }
    else
    {
        return 1 + length(tail(ls));
    }
}

function binop(op, e1, e2)
{
    return pair("binop", pair(op, pair(e1, pair(e2, null))));
}

function isBinOp(x)
{
    if(!isPair(x))
    {
        return false;
    }
    else
    {
        return first(x) == "binop";
    }
}

function binopOp(b)
{
    return first(second(b));
}

function binopE1(b)
{
    return first(second(second(b)));
}

function binopE2(b)
{
    var e2 = second(second(second(b)));
    if (isBinOp(e2))
    {
        return e2;
    }
    else
    {
        return first(e2);
    }
}

function lookupTable(key, table)
{
    if (table == null)
    {
        return null;
    }
    else
    {
        var cur = head(table);
        if (first(cur) == key)
        {
            return second(cur);
        }
        else
        {
            return lookupTable(key, tail(table));
        }
    }
}

var emptyTable = null;
function addTable(key, value, table)
{
    return pair(pair(key, value), table);
}

function listToString(ls)
{
    if (!isPair(ls)) {
        return String(ls);
    }
    else
    {
        return pairToString(head(ls)) + " , " + listToString(tail(ls));
    }
}

var emptyBST = null;
function bst(key, value, left, right)
{
    return pair("bst", pair(pair(key, value), pair(left, right)));
}
function addBST(key, value, node)
{
    if (node == emptyBST)
    {
        return bst(key, value, emptyBST, emptyBST);
    }
    else
    {
        var nodeKey = first(first(second(node)));
        var nodeValue = second(first(second(node)));
        var nodeLeft = first(second(second(node)));
        var nodeRight = second(second(second(node)));
        if (nodeKey > key)
        {
            return bst(nodeKey,nodeValue,addBST(key, value, nodeLeft), nodeRight);
        }
        else if (nodeKey < key)
        {
            return bst(nodeKey,nodeValue,nodeLeft,addBST(key, value, nodeRight));
        }
        else if (nodeKey == key)
        {
            return bst(key, value, nodeLeft, addBST(nodeKey, nodeValue, nodeRight));
        }
    }
}

function lookupBST(key, node)
{
    if (node == emptyBST)
    {
        throw("key not exists in bst.")
    }
    else
    {
        var nodeKey = first(first(second(node)));
        var nodeValue = second(first(second(node)));
        var nodeLeft = first(second(second(node)));
        var nodeRight = second(second(second(node)));
        if (nodeKey == key)
        {
            return nodeValue;
        }
        else if (nodeKey > key)
        {
            return lookupBST(key, nodeLeft);
        }
        else if (nodeKey < key)
        {
            return lookupBST(key, nodeRight);
        }
    }
}

var show = console.log;

function test(name, expect, testcase)
{
    var real = testcase;
    if (real != expect)
    {
        throw "Test " + name + " failed: " + String(real) + " : Expected " + String(expect);
    }
    else
    {
        show("Pass: " + name);
    }
}

module.exports = {
    pair,
    first,
    second,
    isPair,
    pairToString,
    head,
    tail,
    binop,
    isBinOp,
    binopOp,
    binopE1,
    binopE2,
    lookupTable,
    emptyTable,
    addTable,
    listToString,
    emptyBST,
    addBST,
    lookupBST,
    show,
    test
};