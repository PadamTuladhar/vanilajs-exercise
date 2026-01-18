var formfield = document.getElementById('formfield');
var tipsFormfield = document.getElementById('tipsFormfield');
var i = 1, j = 1;
var totalTips = 0;
var totalHours = 0;

function add() {
    totalHours = 0;
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'hours');
    newField.setAttribute('id', 'hours-' + i);
    newField.setAttribute('siz', 50);
    formfield.appendChild(newField);
    i++;
}

function addTips() {
    totalTips = 0;
    var newTipField = document.createElement('input');
    newTipField.setAttribute('type', 'text');
    newTipField.setAttribute('name', 'tips');
    newTipField.setAttribute('id', 'tips-' + j);
    newTipField.setAttribute('siz', 50);
    tipsFormfield.appendChild(newTipField);
    j++;
}

function calculate() {
    var combo = 0;
    var tintin = 0;
    var heena = 0;
    var eyelash = 0;
    var hourlyRate = 0;
    var totalCommission = 0;
    var totalWageBeforeTax = 0;
    var totalHourlyWage = 0;
    var taxableWage = 0;
    totalTips = 0;
    totalHours = 0;

    document.getElementById("summary").classList.remove('hide');
    document.getElementById("summary").classList.add('show');

    //total hours calculation
    var input_tags = formfield.getElementsByTagName('input');
    for (i = 0; i < input_tags.length; i++) {
        totalHours += document.getElementById('hours-' + i).value == "" ? 0.00 : parseFloat(document.getElementById('hours-' + i).value);
    }

    //total tips calculation
    var tips_input_tags = tipsFormfield.getElementsByTagName('input');
    for (i = 0; i < tips_input_tags.length; i++) {
        totalTips += document.getElementById('tips-' + i).value == "" ? 0.00 : parseFloat(document.getElementById('tips-' + i).value);
    }

    //total wage calculation
    hourlyRate = document.getElementById('hourly-rate').value == "" ? 0.00 : parseFloat(document.getElementById('hourly-rate').value);
    tintin = document.getElementById('tintin').value == "" ? 0.00 : parseFloat(document.getElementById('tintin').value);
    combo = document.getElementById('combo').value == "" ? 0.00 : parseFloat(document.getElementById('combo').value);
    eyelash = document.getElementById('combo').value == "" ? 0.00 : parseFloat(document.getElementById('eyelash').value);
    heena = document.getElementById('combo').value == "" ? 0.00 : parseFloat(document.getElementById('heena').value);


    totalCommission = (tintin * 2) + combo + (eyelash * 5) + (heena * 2);
    totalHourlyWage = hourlyRate * totalHours;
    totalWageBeforeTax = totalHourlyWage + totalTips + totalCommission;

    document.getElementById('totalHoursWorked').innerText = totalHours.toFixed(2);
    document.getElementById('totalTips').innerText = totalTips.toFixed(2);
    document.getElementById('totalCommission').innerText = totalCommission.toFixed(2);
    document.getElementById('totalHourlyWage').innerText = totalHourlyWage.toFixed(2);
    document.getElementById('totalWageBeforeTax').innerText = totalWageBeforeTax.toFixed(2);

    //tax withholding selection
    var radios = document.getElementsByName('includeBonus');
    var bonusSelection;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            bonusSelection = radios[i].value
        }
    }

    taxableWage = !bonusSelection || bonusSelection == 'include' ? totalWageBeforeTax : totalHourlyWage;

    //federal tax calculation
    var federalTax = document.getElementById('federal-tax').value == "" ? 0 : parseFloat(document.getElementById('federal-tax').value);
    if (federalTax == 0) {
        var federalTaxAmount = 0;
    } else {
        var federalTaxAmount = taxableWage * federalTax / 100;
    }
    document.getElementById('federal').innerText = federalTaxAmount.toFixed(2);

    //state tax calculation
    var stateTax = document.getElementById('state-tax').value == "" ? 10 : parseFloat(document.getElementById('state-tax').value);
    var stateTaxAmount = stateTax == 10 ? 10 : taxableWage * stateTax / 100;
    if (document.getElementById('hours-0').value == "") {
        stateTaxAmount = 0;
    }
    document.getElementById('state').innerText = stateTaxAmount.toFixed(2);

    //medicare calculation
    var medicare = document.getElementById('medicare-tax').value == "" ? 0 : parseFloat(document.getElementById('medicare-tax').value);
    var medicareAmount = medicare == 0 ? 0.00 : taxableWage * parseFloat(medicare) / 100;
    document.getElementById('medicare').innerText = medicareAmount.toFixed(2);

    //social security calculation
    var socialSecurity = document.getElementById('social-security').value == "" ? 0 : parseFloat(document.getElementById('social-security').value);
    var socialSecurityAmount = socialSecurity == 0 ? 0.00 : taxableWage * parseFloat(socialSecurity) / 100;
    document.getElementById('social').innerText = socialSecurityAmount.toFixed(2);

    var netWage = taxableWage - federalTaxAmount - stateTaxAmount - medicareAmount - socialSecurityAmount;
    document.getElementById('netCommission').innerText = parseFloat(totalCommission.toFixed(2)) + parseFloat(totalTips.toFixed(2));
    if (bonusSelection == "do-not-include") {
        document.getElementById('netPay').innerText = taxableWage.toFixed(2);
        document.getElementById("netCommissionView").classList.remove('hide');
        document.getElementById("netCommissionView").classList.add('show');
    } else {
        document.getElementById('netPay').innerText = netWage.toFixed(2);
        document.getElementById("netCommissionView").classList.add('hide');
        document.getElementById("netCommissionView").classList.remove('show');
    }
}

function clearForm() {
    document.getElementById("summary").classList.add('hide');
    document.getElementById("summary").classList.remove('show');
    document.getElementById("hourForm").reset();
    document.getElementById("rateForm").reset();
    document.getElementById("tipsForm").reset();
    document.getElementById("optionalSelectionForm").reset();
}
