/**
 * Get all words from input
 */
function getWords(input, callback){
  var remaining = '';
  var idx = 0;  // index of word in database

  input.on('data', function(data) {
    remaining += data;
    var current = remaining.indexOf('\n');
    var last  = 0;
    while (current > -1) {
      var line = remaining.substring(last, current);
      callback(Word(line, idx));
      idx = idx + 1;
      last = current + 1;
      current = remaining.indexOf('\n', last);
    }
    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      callback(Word(remaining, idx));
    }
  });
}

/*
 * Create Word Object from line
 */
function Word(line, idx){
  var word = {};

  // ignore '\t' before '@'
  var at = line.indexOf('@');
  word.index = idx;
  word.key = line.substring(0, at - 1);
  word.descriptions = '';

  var last = at;
  var current = line.indexOf('\\n', last);
  while(current > -1) {
    word.descriptions += HTMLFormat(line.substring(last, current));
    last = current + 2;
    current = line.indexOf('\\n', last);
  }
  word.descriptions += HTMLFormat(line.substring(last));

  return word;
}

/*
 * Format text with html tag
 */
function HTMLFormat(line){
  var openTag, closeTag, content;
  if(line[0] === '@'){
    openTag = '<h4>';
    closeTag = '</h4>';
    content = line.charAt(1).toUpperCase() + line.slice(2);
  }else if(line[0] === '*'){
    openTag = '<b>';
    closeTag = '</b>';
    content = line.charAt(3).toUpperCase() + line.slice(4);
  }else if(line[0] === '-'){
    openTag = '<li>';
    closeTag = '</li>';
    content = line.slice(1);
  }else {
    openTag = '<li>';
    closeTag = '</li>';
    content = line;
  }
  return openTag + content + closeTag;
}

exports.getWords = getWords;
