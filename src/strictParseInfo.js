const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,state) {
  let newKey=key;
  if(!state)
    newKey = key.toLowerCase();
  return list.find(function(validKey){
    let newValidKey = validKey;
    if(!state){
      newValidKey = validKey.toLowerCase();
    }
    return newKey==newValidKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,state) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.state = state;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey,this.state))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
