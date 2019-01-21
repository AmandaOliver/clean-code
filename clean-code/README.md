# Clean-code

![The only valid measurement](https://github.com/AmandaOliver/clean-code/blob/master/clean-code/src/images/image1.jpg)


Even having agile system for developing our software resources, in any mature companies there is a moment when a project in `development` moves forward to be in `maintenance`.
Maintenance does not mean that we do not develop new features from time to time, but the main effort that will be realized on this kind of project is, to adapt to changes around it and solve some bugs as they come.
So it's in this phase when having an easy-path to the root of the problem it's more important, as for an average bug-fix we can spend 90% of the time just reading and debugging code. So, why not to make it easier to understand?. Writting clean code is the same as not leaving mess in the toilet for the next person to come.
**Leave it as you'll like to find it!.**

Let's see an example, how much time do need to understand what this function does?

```javascript
 setStake : function (id, stake) {
                if(typeof _this.setStake.error !== 'undefined' && _this.setStake.error) {
                    var err = _this.setStake.error;
                    _this.setStake.error = null;
                    return [false,err];
                }

                if(state.singles.length) {
                    state.singles[0].stake = stake;
                    state.total_stake = stake;
                } else {
                    return [false,"SLIP_API_ERR_ID_NOT_FOUND"];
                }

                return retState();
            },
```
