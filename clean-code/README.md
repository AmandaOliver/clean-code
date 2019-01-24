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

>The name of a variable, function or class should answer all the big questions. It should tell you why does it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal it's intend.

Pick one word per abstract concept, and stick to it. For example, if we decide to call to an array of arrays *Matrix*, let's never call that *Table*, even if it's the same.

The same way, avoid using the same word for two purposes, if we use get for selectors, let's not mix find with find, select... That way when we find a function called "getSomething" we know exactly what that function is.

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

## Be small, compose!

The first rule of functions is that they should be small.

```javascript
const findBetForUI = async (id) => {
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
const findBet = (bets, id) => { bets && bets.id }
const getBets = async () => getBetsFromState() || await fetchBets()
const fetchBets =  async () => {
    const bets
    const response = await fetch(URL)
    if(response.ok){
        const jsonResponse = response.json()
        bets = jsonResponse.data && jsonResponse.data.bets
    }
    return transformToMap(bets, betUid)
}

const findBetForUI = async (id) => {
    let bets = await getBets()
    const bet = findBet(bets, id)
    return transformToUIBet(bet)
}

```

## fewer arguments the better

The second rule is that as fewer arguments, the better. You should have a good justification for writting a function over 20 lines and for each of the arguments provided to it.

Why do I say so? Because having more arguments increases the tests complexity, suppose that we have a function that receives just boolean parameters:

0 params: 1 test case (func())
1 param: 2 test cases (func(true), func(false))
2 params: 4 test cases (func(true, true), func(false, false), func(true, false), func(false, true))

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

## Do just one thing!

3rd rule: SRP, functions should do just one thing on one level of abstraction



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
