//Initialize Variables
var paycheck1 = 0;
var paycheck2 = 0;
var monthlyIncome = 0;

//Colorado State Tax Percentage
var stateTax = 0.0455;

//Social Security and Medicare Percentages
var soci = 0.062;
var medi = 0.0145;

//Set Up Tax Bracket Constructor
var taxBrackets = [];
var bracket = function (year, taxStatus, b1amount, b1pct, b2amount, b2pct, b3amount, b3pct, b4amount, b4pct, b5amount, b5pct, b6amount, b6pct, b7pct){
    this.year = year;
    this.taxStatus = taxStatus;
    //Tax Bracket 1
    this.b1amount = b1amount;
    this.b1pct = b1pct;
    //Tax Bracket 2
    this.b2amount = b2amount;
    this.b2pct = b2pct;
    //Tax Bracket 3
    this.b3amount = b3amount;
    this.b3pct = b3pct;
    //Tax Bracket 4
    this.b4amount = b4amount;
    this.b4pct = b4pct;
    //Tax Bracket 5
    this.b5amount = b5amount;
    this.b5pct = b5pct;
    //Tax Bracket 6
    this.b6amount = b6amount;
    this.b6pct = b6pct;
    //Tax Bracket 7
    this.b7pct = b7pct;

    this.taxBrackets = function (){taxBrackets.push(this)};
    this.taxBrackets();
};

//Add Tax Brackets
new bracket (2022, "single", 10275, 0.1, 41775, 0.12, 89075, 0.22, 170050, 0.24, 215950, 0.32, 539900, 0.35, 0.37);
new bracket (2022, "married", 20550, 0.1, 83550, 0.12, 178150, 0.22, 340100, 0.24, 431900, 0.32, 647850, 0.35, 0.37);
new bracket (2023, "single", 11000, 0.1, 44725, 0.12, 95375, 0.22, 182100, 0.24, 231250, 0.32, 578125, 0.35, 0.37);
new bracket (2023, "married", 22000, 0.1, 89450, 0.12, 190750, 0.22, 364200, 0.24, 462500, 0.32, 693750, 0.35, 0.37);

function grabValue(name){
    return parseFloat(document.getElementById(name).value);
};

//Set Pay Period Variable
var payPeriod = grabValue("payPeriod");

//Function to Round Outputs

function rounding (num) {
    num = Math.round(num*100)/100;
    return num;
};


//Calculate Paycheck
function runPaycheckAnalysis() {

    var taxableIncome = 0;
    var totalIncome = 0;
    var federal = 0;
    var subTax = 0;
    var taxablePay1 = 0;
    var taxablePay2 = 0;

    //Grab User Entered Filing Status
    var filing = document.getElementById("filing").value;
    var taxYear = parseFloat(document.getElementById("taxYear").value);

    //Grab User Entered Salaries
    var income1 = grabValue("income1");
    var income2 = grabValue("income2");
    var payPeriod = grabValue("payPeriod");
    
    //Grab Retirement and Covert to Percentage to Decimal
    var retirePre1 = grabValue("pretaxRetire1")/100;
    var retirePre2 = grabValue("pretaxRetire2")/100;
    var retirePost1 = grabValue("aftertaxRetire1")/100;
    var retirePost2 = grabValue("aftertaxRetire2")/100;
    
    //Grab Pre-Tax Costs
    var health1 = grabValue("healthIns1");
    var health2 = grabValue("healthIns2");
    var dental1 = grabValue("dentIns1");
    var dental2 = grabValue("dentIns2");
    var hsa1 = grabValue("hsa1");
    var hsa2 = grabValue("hsa2");

    //Grab Pre-Tax Costs
    var disability1 = grabValue("disability1");
    var disability2 = grabValue("disability2");
    var life1 = grabValue("life1");
    var life2 = grabValue("life2");
    var crit1 = grabValue("crit1");
    var crit2 = grabValue("crit2");

    //Grab Withholding Costs
    var hold1 = grabValue("hold1");
    var hold2 = grabValue("hold2");

    //Calculate Income
    totalIncome = (income1 + income2);   
    taxableIncome = totalIncome - (income1 * retirePre1) - (income2 * retirePre2) - ((health1 + health2 + dental1 + dental2 + hsa1 + hsa2) * payPeriod);
    
    //Find Tax Year and Filing Status in Tax Bracket Array
    var arrPos = 0;
    for (var i = 0; i < taxBrackets.length; i++) {
        if (taxBrackets[i].year === taxYear){
            if(taxBrackets[i].taxStatus === filing){
                arrPos = i;
            };
        };
    };

    //Calculate Federal Taxes
    if (taxableIncome < (taxBrackets[arrPos].b1amount + 1)) {
        federal = taxableIncome * taxBrackets[arrPos].b1pct;

    }else if (taxableIncome < (taxBrackets[arrPos].b2amount +1)) {
        subTax =  taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct;
        federal = (taxableIncome - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct + subTax;

    }else if (taxableIncome < (taxBrackets[arrPos].b3amount +1)) {
        subTax = (taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct) + ((taxBrackets[arrPos].b2amount - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct);
        federal = (taxableIncome - taxBrackets[arrPos].b2amount) * taxBrackets[arrPos].b3pct + subTax;

    }else if (taxableIncome < (taxBrackets[arrPos].b4amount +1)) {
        subTax = (taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct) + ((taxBrackets[arrPos].b2amount - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct) + ((taxBrackets[arrPos].b3amount - taxBrackets[arrPos].b2amount) * taxBrackets[arrPos].b3pct);
        federal = (taxableIncome - taxBrackets[arrPos].b3amount) * taxBrackets[arrPos].b4pct + subTax;

    }else if (taxableIncome < (taxBrackets[arrPos].b5amount +1)) {
        subTax = (taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct) + ((taxBrackets[arrPos].b2amount - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct) + ((taxBrackets[arrPos].b3amount - taxBrackets[arrPos].b2amount) * taxBrackets[arrPos].b3pct) + ((taxBrackets[arrPos].b4amount - taxBrackets[arrPos].b3amount) * taxBrackets[arrPos].b4pct);
        federal = (taxableIncome - taxBrackets[arrPos].b4amount) * taxBrackets[arrPos].b5pct + subTax;

    }else if (taxableIncome < (taxBrackets[arrPos].b6amount +1)){
        subTax = (taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct) + ((taxBrackets[arrPos].b2amount - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct) + ((taxBrackets[arrPos].b3amount - taxBrackets[arrPos].b2amount) * taxBrackets[arrPos].b3pct) + ((taxBrackets[arrPos].b4amount - taxBrackets[arrPos].b3amount) * taxBrackets[arrPos].b4pct) + ((taxBrackets[arrPos].b5amount - taxBrackets[arrPos].b4amount) * taxBrackets[arrPos].b5pct);
        federal = (taxableIncome - taxBrackets[arrPos].b5amount) * taxBrackets[arrPos].b6pct + subTax;

    } else {
        subTax = (taxBrackets[arrPos].b1amount * taxBrackets[arrPos].b1pct) + ((taxBrackets[arrPos].b2amount - taxBrackets[arrPos].b1amount) * taxBrackets[arrPos].b2pct) + ((taxBrackets[arrPos].b3amount - taxBrackets[arrPos].b2amount) * taxBrackets[arrPos].b3pct) + ((taxBrackets[arrPos].b4amount - taxBrackets[arrPos].b3amount) * taxBrackets[arrPos].b4pct) + ((taxBrackets[arrPos].b5amount - taxBrackets[arrPos].b4amount) * taxBrackets[arrPos].b5pct) + ((taxBrackets[arrPos].b6amount - taxBrackets[arrPos].b5amount) * taxBrackets[arrPos].b6pct);
        federal = (taxableIncome - taxBrackets[arrPos].b6amount) * taxBrackets[arrPos].b7pct + subTax;
    };

    //Calculate Per Paycheck Taxable Income
    taxablePay1 = income1/payPeriod - (income1/payPeriod * retirePre1) - health1 - dental1 -hsa1;
    taxablePay2 = income2/payPeriod - (income2/payPeriod * retirePre2) - health2 - dental2 -hsa2;
    
    //Calculate Per Pay Period Paycheck Amount
    paycheck1 = taxablePay1 - (federal/taxableIncome * (income1/taxableIncome) * taxablePay1) - ((income1/payPeriod - health1 - dental1 -hsa1) * soci) - ((income2/payPeriod - health1 - dental1 -hsa1) * medi) - (taxablePay1 * stateTax) -(income1/payPeriod * retirePost1) - disability1 - life1 - crit1 - hold1;
    paycheck2 = taxablePay2 - (federal/taxableIncome * (income2/taxableIncome) * taxablePay2) - ((income2/payPeriod - health2 - dental2 -hsa2) * soci) - ((income2/payPeriod - health2 - dental2 -hsa2) * medi) - (taxablePay2 * stateTax) -(income2/payPeriod * retirePost2) - disability2 - life2 - crit2 - hold2;

    paycheck1 = rounding(paycheck1);
    paycheck2 = rounding(paycheck2);

    output("Salary 1 Paycheck Amount", paycheck1);
    output("Salary 2 Paycheck Amount", paycheck2);
};

//Setup Function for Reviewing Cost Vs Pay Analysis
function runCostAnalysis () {
    runPaycheckAnalysis();

    //Grab User Entered Cost Values 
    var mortgage = grabValue("mortgage");
    var electric = grabValue("electric");
    var internet = grabValue("internet");
    var groceries = grabValue("groceries");
    var pet = grabValue("pet");
    var medical = grabValue("medical");
    var personal = grabValue("personal");
    var mobile = grabValue("mobile");
    var entertainment = grabValue("entertainment");
    var grooming = grabValue("grooming");
    var gas = grabValue("gas");
    var student = grabValue("student");
    var car = grabValue("car");
    var travel = grabValue("travel");
    var insure = grabValue("insure");
    var dining = grabValue("dining");

    //Calculate Monthly Income
    monthlyIncome = ((paycheck1 + paycheck2) * 2) - mortgage - electric - internet - groceries - pet - medical - personal - mobile - entertainment - grooming - gas - student - car - travel - insure - dining;

    monthlyIncome = rounding(monthlyIncome);

    output("Monthly Excess", monthlyIncome);
};

function output (label, amount) {

    //Grab Results div and Create an Output div
    var target = document.getElementById("results");
    label = label + ": $" + amount;
    var outputItem = document.createElement('div');

    //Set Text For New Div
    outputItem.innerText = label;

    //Render Output
    target.appendChild(outputItem);

};

//Get and Listen For Button Clicks
var paycheckButton = document.getElementById('paycheckButton');
paycheckButton.addEventListener('click', runPaycheckAnalysis);

var costButton = document.getElementById('costButton');
costButton.addEventListener('click', runCostAnalysis);