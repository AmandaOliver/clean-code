# Clean-code

![The only valid measurement](https://github.com/AmandaOliver/clean-code/blob/master/clean-code/src/images/image1.jpg)


Even having agile system for developing our software resources, in any mature companies there is a moment when a project in `development` moves forward to be in `maintenance`.
Maintenance does not mean that we do not develop new features from time to time, but the main effort that will be realized on this kind of project is, to adapt to changes around it and solve some bugs as they come.
So it's in this phase when having an easy-path to the root of the problem it's more important, as for an average bug-fix we can spend 90% of the time just reading and debugging code. So, why not to make it easier to understand?. Writting clean code is the same as not leaving mess in the toilet for the next person to come.
**Leave it as you'll like to find it!.**

Let's see an example, how much time do need to understand what this function does?

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

a lot right? So let's see how to avoid ending up with code like this:

##Comments -> names

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

Should be:

```javascript
    shouldRespawn: function(exitCode: number, signalCode: string): boolean {
        return  (code !== 0 || signal !== 'undefined');
    },
```

## Environment

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


### Functions

The less arguments the better and an options object is not considered one argument
