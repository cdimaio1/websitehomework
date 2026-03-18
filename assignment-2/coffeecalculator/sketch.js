//Caroline Dimaio
//Assignment 2: Interactive Calculator
//This program calculates how many cups of coffee the user drinks and how much they spend on coffee in a year
let name = prompt("What is your name?: ");// ask user their name
alert("Nice to meet you " + name + "!"); // greet user

let num1String = prompt("How many times do you drink coffee in a week? "); //ask user how many times they drink coffee per week
let num1Integer = Number(num1String) // convert string answer to number for calculations
alert("Based on that number, let's estimate how many cups of coffee you drink in a year!"); // tell user the program will estimate how much they drink per year
let weeks = 52; //52 weeks in a year
let sum = num1Integer * weeks// multiply users entered value of coffee number by the amount of weeks in a year
alert("Wow! You drink about " + sum + " cups of coffee every year!")//tell user the yearly total amount of coffee they consume
alert("Now let's see how much that is costing you!")// introduce next calculation
let num2String = prompt("On average, how much would you say each coffee costs? : ")// ask user how much they spend per cup of coffee
let num2Integer = Number(num2String)// convert string input to integer for calculations
let coffeeCost = sum * num2Integer// multiply the amount of coffee they drink per year times the cost per cup
alert("You spend roughly $" + coffeeCost + " every year on coffee!")// tell the user an estimate of how much they spend per year

