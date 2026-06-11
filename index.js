function parseTerms(input) {
  const terms = [];
  const regex = /"([^"]+)"|(\S+)/g;
  let m;
  while ((m = regex.exec(input))) {
    terms.push((m[1] || m[2]).trim());
  }
  return terms.sort((a, b) => b.length - a.length);
}

function redactDocument(termsInput, text) {
  const terms = parseTerms(termsInput);
  const removed = [];
  let i = 0;
  let out = "";

  while (i < text.length) {
    let matched = null;

    for (const term of terms) {
      if (text.slice(i, i + term.length) === term) {
        matched = term;
        break;
      }
    }

    if (matched) {
      removed.push({ start: out.length, original: matched });
      out += "XXXX";
      i += matched.length;
    } else {
      out += text[i];
      i++;
    }
  }

  return { redactedText: out, key: removed };
}


function unredactDocument(redactedText, key) {
  let result = redactedText;
  let offset = 0;

  for (const item of key) {
    const start = item.start + offset;
    result = result.slice(0, start) + item.original + result.slice(start + 4);
    offset += item.original.length - 4;
  }

  return result;
}

// test 
const termsInput = 'secret "credit card" password';
const text = 'My secret is that my credit card password is 1234.';

const redacted = redactDocument(termsInput, text);
console.log("Redacted result:", redacted);

const restored = unredactDocument(redacted.redactedText, redacted.key);
console.log("Restored result:", restored);