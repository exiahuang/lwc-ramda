# LWC Ramda

[lwc-ramda](https://github.com/exiahuang/lwc-ramda) is ramda for salesforce lwc developer.

![ramda](https://ramdajs.com/ramdaFilled_200x235.png)

## deploy lwc-ramda

<a href="https://githubsfdeploy.herokuapp.com?owner=exiahuang&repo=lwc-ramda">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

or 

```sh
git clone https://github.com/exiahuang/lwc-ramda.git
cd lwc-ramda
sfdx force:source:deploy --loglevel fatal -p force-app/main/default/lwc/ramda/ramda.js-meta.xml --targetusername=$username_or_alias_for_your_sfdc_org
```

## usage

create a lwc compnent
```sh
sfdx force:lightning:component:create --type lwc -n $lwc_name
```

import Ramda in your js lwc code

```js
import * as R from 'c/ramda';

const coder = R.always('Exia');

const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const greet = R.compose(
  trace('[welcome to LWC Ramda]'),
  R.replace('{name}', R.__, 'Hello, {name}!')
);
greet(coder);

const f = R.compose(trace('f(x)=3x+5 is'), R.add(5), R.multiply(3));
f(4);

const g = R.compose(trace('g(x)=(4+x)*5 is'), R.multiply(5), R.add(4));
g(8);
```


## document

- https://ramdajs.com/docs/
