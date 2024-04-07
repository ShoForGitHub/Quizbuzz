1. ✔Start to Quiz change
2. ✔play again reset
3. ✔html decode(only works in Quiz component?)
4. ✔shuffle correct and incorrect answers(shuffled them in App.jsx, in Quiz.jsx will cause re-renders and options will change their positions at every render)
5. ✔broken buttons when options'texts are too long(add 'flex' to the div which wraps input and label)
6. check answer options' color
7. ✔Add DeepL API
8. Add category and difficulty choices?
9. ✔Add language select
10. Hide API KEY
https://www.smashingmagazine.com/2023/05/safest-way-hide-api-keys-react/
11. ✔score won't update when ja is chosen, since userAnswer is translated , correct answer in App.jsx is still english
12. ✔make user must answer all quizzes
13. ✔responsive options, etc
14. add ✔✖ icons to options like red and green colors
15. Hide circle(input) of radio buttons and maintain accessibility at the same time
https://codepen.io/azrikahar/pen/zYKyQxw
16. to fix: rerendered every time when an option is checked
(
    maybe create a new formData; 
    ✖disabled={props.isAnswered ? true : false};
    ✖bg-color
)
17. Use react form?