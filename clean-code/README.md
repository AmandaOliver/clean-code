# Clean-code

I  wouldn’t like to make this article an index of rules, you can find that in the .eslintrc file. What I would like is to transmit you a feeling, a feeling of professionality.
What do you think clean code is? I would say it’s the practise of “be professional”, of being proud of your work, of being a nice person.
Writing clean code is like picking up your trash when leaving the camp. And because of so, we should follow the *Boy Scout Rule*:
**Leave the camground cleaner than you found it**.

How much time do need to understand what this function does?

```javascript
 setStake : function (id (WTF), stake) {
                if(typeof _this.setStake.error !== 'undefined' && _this.setStake.error) { (WTF)
                    var err = _this.setStake.error;
                    _this.setStake.error = null;
                    return [false,err]; (WTF)
                }

                if(state.singles.length) {
                    state.singles[0].stake = stake; (WTF)
                    state.total_stake = stake; (WTF)
                } else {
                    return [false,"SLIP_API_ERR_ID_NOT_FOUND"]; (WTF)
                }

                return retState(); (WTF over 9000)
            },
```

![The only valid measurement](https://github.com/AmandaOliver/clean-code/blob/master/clean-code/src/images/image1.jpg)


# Naming it's hard!

The name of a variable, function or class should answer all the big questions. It should tell you why does it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal it's intend.

Pick one word per abstract concept, and stick to it. For example, if we decide to call to an array of arrays *Matrix*, let's never call that *Table*, even if it's the same.

The same way, avoid using the same word for two purposes, if we use get for selectors, let's not mix it with find, select... That way when we find a function called "getSomething" we know exactly what that function is.

Don't add gratuituous context, shorter names are better than longer ones, as long as they are clear.

If you need to write a comment it means that you failed writting clean-code, the information provided by a comment should be rather provided by the code. Comments are hardly maintained, prone to be outdated and when this happens, misleading.
Commented code is even worse. If you're afraid of erasing some piece of code that you think might be useful in the future remember that we have a version control system and no code gets ever erased.


Let's see an example:

```javascript
    /**
     * Determine if we should respawn a process based on his exit code and signal
     *
     * @param  {Integer} code   Process exit code
     * @param  {String} signal Process signal code
     * @return {Boolean} True if we have to respawn
     */
    respawn: function(code,signal) {
        return  (code !== 0 || signal !== 'undefined');
    },

```

Should be(using types):

```javascript
    shouldRespawnProcess: function(exitCode: number, signalCode: string): boolean {
        return  (exitCode !== 0 || signalCode !== 'undefined');
    },
```


# Functions

## Principle of Least Astonishment (or least WTFs)

Following this principle any function (or class) should implement the behaviours that another programmer could reasonably expect. For example, what do you expect the following function to do?:

```javascript
findBetById(bets,id)
```

it's pretty clear right? What about this one?

```javascript
findBetForUIById(id)
```


## Be small, compose!

The first rule of functions is that they should be small. They also should work in just one level of abstraction, it's better not to mix fetching of the data with rendering of it:

```javascript
const findBetForUIById = async (id) => {
    const bet
    let bets = getBetsFromState()
    if(!bets){
        const response = await fetch(URL)
        if(response.ok){
            const jsonResponse = response.json()
            bet = jsonResponse.data && jsonResponse.data.bets ? bets.find((bet)=>bet.betUid===id) : undefined
        }
    }else{
        bet = bets.id
    }
    if(bet){
        return ({
            someProperty: bet.someProperty,
            otherProperty: bet.otherProperty,
            andAnother: bet.andAnother + butModified
        })
    }
    return
}
```

```javascript
const findBetById = (bets, id) => { bets && bets.id }

const getBetsMapFromArray = (bets) => bets.map(bet=>({bet.betUid: bet}))

const getBets = () => getBetsFromState() || getBetsMapFromArray(fetchBets())

const fetchBets = async () => {
    const bets
    const response = await fetch(URL)
    if(response.ok){
        const jsonResponse = response.json()
        bets = jsonResponse.data && jsonResponse.data.bets
    }
    return bets
}

let bets = await getBets()
const bet = findBetById(bets, id)
return transformToUIBet(bet)
```

## Do just one thing!

3rd rule: SRP, functions should do just one thing. If you're passing a flag to a function, then you're not:

```javascript
const createFile = (fileName, isTemporal) => {
    if(isTemporal){
        fs.create(`./temp/${fileName}`);
    }
    else{
        fs.create(fileName);
    }
}
```

```javascript
function createFile(fileName) {
  fs.create(fileName);
}

function createTempFile(fileName) {
  createFile(`./temp/${fileName}`);
}
```
The same applies for switch statements, use polimorphism instead.


## The fewer the better

You should have a good justification for writting a function over 20 lines and for each of the arguments provided to it.

Why do I say so? Because having more arguments increases the tests complexity, suppose that we have a function that receives just boolean parameters:

- 0 params: 1 test case (func())
- 1 param: 2 test cases (func(true), func(false))
- 2 params: 4 test cases (func(true, true), func(false, false), func(true, false), func(false, true))

...and so on.

Also, more arguments you have more data you need to keep in mind when analysing it, and more prone to bugs the function is.


Object deestructuring comes very handy in this case:

```javascript

makePizza(mozarella, tomatoSauce, pepperoni, olives, base)

const makePizza = (mozarella, tomatoSauce, pepperoni, olives, base) => { ... }

```

```javascript

makePizza(toppings, base)

const makePizza = ({mozarella, tomatoSauce, pepperoni, olives}, base) => { ... }

```

## Prefer pure functions

Pure functions are functions that accept an input and returns a value without modifying any data outside its scope.
We should ALWAYS use pure functions, as side effect are difficult to track and debug, can cause race conditions and breaks the SRP.

```javascript
let globalName = 'Amanda Oliver'
const splitName = () => {
    globalName = globalName.split(' ')
}

splitName() // ["Amanda", "Oliver"]

//Some other module
splitNameToObject() // {name: ["Amanda,Oliver"], lastname: undefined}

```

```javascript
const globalName = 'Amanda Oliver'
const splitName = (name) => {
    name = name.split(' ')
}

const splittedName = splitName(globalName) // ["Amanda", "Oliver"]

//Some other module
const objectName = splitNameToObject(globalName) // {name: "Amanda", lastname: "Oliver"}

```

The same for prototypes of functions, if you need extra functionality use some kind of form of decorator pattern, as per the OCP, code should be open for extension but closed for modification.


In JavaScript, primitives are passed by value and objects/arrays are passed by reference, so we need to be careful of not modify them.

```javascript
const addITemToCollection = (collection, item) => collection.push(item)
```
This modifies the original collection array. Let's do it better:

```javascript
const addITemToCollection = (collection, item) => [...collection, item]

```


# Prefer async/await

```javascript
import { get } from 'request';
import { writeFile } from 'fs';

get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', (requestErr, response) => {
  if (requestErr) {
    console.error(requestErr);
  } else {
    writeFile('article.html', response.body, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log('File written');
      }
    });
  }
});
```

It's worse than:

```javascript
import { get } from 'request-promise';
import { writeFile } from 'fs-promise';

get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((response) => {
    return writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch((err) => {
    console.error(err);
  });
```

and this is still worse than:

```javascript
import { get } from 'request-promise';
import { writeFile } from 'fs-promise';

async function getCleanCodeArticle() {
  try {
    const response = await get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
    await writeFile('article.html', response);
    console.log('File written');
  } catch(err) {
    console.error(err);
  }
}
```

# Formatting

In a project, all the files should follow the same structure, whatever that structure is. If we are collapsing the exports at the end of the files we should do that in all of them and if a function calls another, keep those functions vertically close in the source file.

Ideally, keep the caller right above the callee. We tend to read code from top-to-bottom, like a newspaper. Because of this, make your code read that way.

# Environment

You should be able to run your project with
```javascript
   yarn start
```

test it with
```javascript
   yarn test
```

build a production ready bundle with
```javascript
   yarn build
```

We can have more scripts, of course, but this three (if necessary) should be there. When you start working on a project you should not need to go to package.json and figure out how to run it or test it.


# The importance of tests

We don't write clean code on the first iteration, usually we first code a working algorithm, only then we think how to make it better, and then we do it again, and again, and again until we are happy with the result.

For being able to do so in a timely manner we need to have 100% trust on the tests, that way we can refactor without fear of breaking anything and without having to test it manually per every change we make.

Also, tests are our most appreciate documentation, you should be able to look at the test and simply understand what that method behaviour is on detail. For that purpose we should have only one test per concern and one assertion per test ( when possible ):

```javascript
import assert from 'assert';

describe('myDate', () => {
  it('handles date boundaries', () => {
    let date;
    date = new myDate('01/03/2015');
    date.addDays(30);
    assert.equal('01/04/2015', date);

    date = new myDate('1/1/2015');
    date.addDays(30);
    assert.equal('1/31/2015', date);
  });
});
```
```javascript
import assert from 'assert';

describe('myDate', () => {
  it('handles 31-day months', () => {
    const date = new myDate('01/01/2015');
    date.addDays(30);
    assert.equal('31/01/2015', date);
  });
  it('handles 30-day months', () => {
    const date = new myDate('01/03/2015');
    date.addDays(30);
    assert.equal('01/04/2015', date);
  });
});
```

## F.I.R.S.T

Clean tests follow this 5 rules:

1. **Fast**: If tests are slow we have no time to run them, no tests, no refactor, no clean code, nobody understands anything, boom, bankrupt

2. **Independent**: tests should not depend on each other. When tests depends on each other one failure in the first one will create a cascade of failures that make diagnosis much more difficult.

3. **Repeatable**: tests should be able to run the same in any environment: local computer, gitlab CI, jenkins etc. If the behaviour isn't coherent we will always have doubts when they fail. Is it the code, is the environment?

4. **Self-validating**: tests should have a boolean output, they should make really clear if they passed or not. We shouln't have to be reading a log for figuring it out.

5. **Timely**: the tests should be written BEFORE the actual code. When doing end-to-end tests, later on they serve as documentation for developers on the details of the behaviour, when doing unit-tests they help building testable code.


# Miscelanea

- Avoid complex conditionals on ifs, extract them to a variable
- Avoid negative conditionals unless it's existencial (!bets)
- Configurable data should be at the higher level
- Don't be arbitrary, keep patterns
- Follow proportion scope-name `i` it's ok for a for loop, `StakeBoxWithErrorSubscriptions` is ok as component name as well
- Use coverage tools for tests
