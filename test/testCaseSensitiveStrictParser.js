const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["naMe"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified and actual both keys are in mixed case",function(){
    let kvParser=new StrictParser(["naMe"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE"]="jayanth";
    let parsed=kvParser.parse("nAmE=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are multiple and both keys are in mixed case",function(){
    let kvParser=new StrictParser(["Age","naMe"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE"]="jayanth";
    expected["agE"]="40";
    let parsed=kvParser.parse("nAmE=jayanth agE=40");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are multiple with digit and both keys are in mixed case",function(){
    let kvParser=new StrictParser(["Age123","naMe456"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE456"]="jayanth";
    let parsed=kvParser.parse("nAmE456=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are multiple with underscore_digit and both keys are in mixed case",function(){
    let kvParser=new StrictParser(["Age_123","naMe_456"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE_456"]="jayanth";
    let parsed=kvParser.parse("nAmE_456=jayanth");
    assert.deepEqual(parsed,expected);
  });
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
  it("should throw error when specified keys are in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["naMe"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
  it("should throw error when multiple specified keys are there in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["AbcD","naMe"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
    assert.throws(()=>{
      kvParser.parse("abcd=jayanth");
    })
  });
  it("should throw error when no status is passing and it is case sensitive",function(){
    let kvParser=new StrictParser(["AbcD","naMe"]);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
    assert.throws(()=>{
      kvParser.parse("abcd=jayanth");
    })
  });
});
