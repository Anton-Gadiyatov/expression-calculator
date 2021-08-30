function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    class Lexeme {
        constructor(type, value) {
          this.type = type;
          this.value = value;
        }
      }
      
      class LexemeBuffer {
        pos = 0;
        
        constructor(lexemes) {
          this.lexemes = lexemes;
        }
      
        next() {
          return this.lexemes[this.pos++];
        }
      
        back() {
          this.pos--;
        }
      
        getPos() {
          return pos;
        }
      
      }
      
      
      
      const lexAnalyze = (expressionText) => {
        let i = 0;
        let chunk = '';
        let arr = [];
        while (i < expressionText.length) {
          if (expressionText[i] === '(') {
            arr.push(new Lexeme('LEFT_BRACKET', expressionText[i]))
            i++;
          }
          if (expressionText[i] === ')') {
             arr.push(new Lexeme('RIGHT_BRACKET', expressionText[i]))
             i++;
          }
          if (expressionText[i] === '+') {
            arr.push(new Lexeme('OP_PLUS', expressionText[i]))
            i++;
          }
          if (expressionText[i] === '-') {
            arr.push(new Lexeme('OP_MINUS', expressionText[i]))
            i++;
          }
          if (expressionText[i] === '*') {
              arr.push(new Lexeme('OP_MUL', expressionText[i]))
              i++;
          }
          if (expressionText[i] === '/') {
              arr.push(new Lexeme('OP_DIV', expressionText[i]))
              i++;
          }
          if (!isNaN(expressionText[i])) {
            do {
               chunk = chunk + expressionText[i].toString();
              i++;
            } while (!isNaN(expressionText[i]));
           arr.push(new Lexeme('NUMBER', Number(chunk)));
            chunk = '';
          }    
        }
        arr.push(new Lexeme('EOF', ''));
        return arr;
      }
      
    
      let lexemes = new LexemeBuffer(lexAnalyze(expr)); 

        const expres = (lexemes) => {
              let lexeme = lexemes.next();
              if (lexeme.type == 'EOF') {
                  return 0;
              } else {
                  lexemes.back();
                  return plusminus(lexemes);
              }
      }
      
      
      const plusminus = (lexemes) => {
              
          let value = multdiv(lexemes);
        while (true) {
         let lexeme = lexemes.next();
          if (lexeme.type == 'OP_PLUS') {
            value += multdiv(lexemes)
          }
          if (lexeme.type == 'OP_MINUS') {
             value -= multdiv(lexemes)
          }
          if (lexeme.type == 'EOF' || lexeme.type == 'RIGHT_BRACKET') {
            lexemes.back();
            return value;
          }
        }
      }
      
      const multdiv = (lexemes) => {
        let value = factor(lexemes);
        while (true) {
          let lexeme = lexemes.next();
          if (lexeme.type == 'OP_MUL') {
            value *= factor(lexemes)
          }
          if (lexeme.type == 'OP_DIV') {
             value /= factor(lexemes)
          }
          if (lexeme.type == 'EOF' || lexeme.type == 'RIGHT_BRACKET' || lexeme.type == 'OP_PLUS' || lexeme.type == 'OP_MINUS') {
            lexemes.back();
            return value;
          }
        }
      }
      
      
      const factor = (lexemes) => {
          let value;
          let lexeme = lexemes.next();
        if (lexeme.type == 'NUMBER') {
          return lexeme.value;
        }
        if (lexeme.type == 'LEFT_BRACKET') {
          value = plusminus(lexemes);
          lexeme = lexeme.next();
        }
        if (lexeme.type != 'RIGHT_BRACKET') {
          throw new Error('Brackets must be paired');
        }
        return value;
      }
      return expres(lexemes);
}

module.exports = {
    expressionCalculator
}