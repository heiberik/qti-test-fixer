# QTI TEST FIXER

QTI Test fixer is a nodeJS application for mass editing QTI Items in a QTI Test. 

## Installation

* In your terminal in your decired folder:
* $ git clone https://github.com/heiberik/qti-test-fixer
* $ cd ./qti-test-fixer
* $ npm install


## Usage 

Export your tests and put them into the folder "tests". This folder can container multiple tests. 

In the "config.js" file: modify the two variables "replace" and "replaceWith" according to your needs. 

By default the program will replace all occurences of: 
```xml
<div class="grid-row">
``` 
with 
```xml
<div class="grid-row" translate="no">'.
``` 

To run the program:

```javascript
$ node app.js
```

You will find your modified tests in the folder "results". 
