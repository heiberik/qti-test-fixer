# QTI TEST FIXER

QTI Test fixer is a nodeJS application for mass editing Items in a Test. 

## Installation

1. In your terminal in your decired folder:
2. $ git clone https://github.com/heiberik/qti-test-fixer
3. $ cd ./qti-test-fixer
4. $ npm install


## Usage 

Export your tests and put them into the folder "tests". This folder can container multiple tests. 

In the "config.js" file: modify the two variables "replace" and "replaceWith" according to your needs. 

By default the program will replace all occurences of '<div class="grid-row">' with '<div class="grid-row" translate="no">'.

To run the program:

```javascript
$ node app.js
```

You will find your modified tests in the folder "results". 
