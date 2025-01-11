import './App.css'
import CalcForm from './CalcForm.jsx'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      desiredLocation: "",
      homePrice: 0,
      downPayment: 0,
      mortgageRate: 0,
      loanTerm: 30,
      inflationRate: 0,
      homeValGrowth: 0,
      homeInsurance: 0,
      closingCosts: 0,
      hoaCondoFees: 0,
      monthlyMaintenance: 0,
      propertyTax: 0,
      stayDuration: 0,
      desiredRent: 0,
      renterInsurance: 0,
      securityDeposit: 0,
      petDeposit: 0,
      utilIncluded: 0,
      appFee: 0,
      parkingFee: 0,
      maintenanceFee: 0,
      amenitiesFee: 0,
    }
  );

  /*
   * see formula: https://en.wikipedia.org/wiki/Mortgage_calculator
   * calculates the monthly payment given the loan term, mortgage rate,
   * and principal after down payment.
   */
  function calcMortgagePayment() {
    const r = inputValues.mortgageRate/12;
    const n = inputValues.loanTerm*12;
    const p = inputValues.homePrice * (1 - inputValues.downPayment);
    
    if (r == 0) {
      return p/n
    } else {
      return ((p * r * (1 + r)**n)/(((1 + r)**n) - 1));
    }

  } 

  function genOwnerCostArr() {
    let costArr = [];
    // changes according to fair market value growth rate
    let propertyTax = inputValues.propertyTax;
    // changes according to overall inflation rate
    let homeInsurance = inputValues.homeInsurance;
    let maintenanceCost = inputValues.monthlyMaintenance;
    let hoaFee = inputValues.hoaCondoFees;
    // assuming will not change (realistically would but we predict the avg.)
    const r = inputValues.inflationRate;

    // independent to inflation. constant mortgage payment and one time down.
    // totalCost += (calcMortgagePayment() * inputValues.loanTerm * 12) 
    // + inputValues.homePrice*inputValues.downPayment
    //  + inputValues.closingCosts;
   
    costArr.push(
      (calcMortgagePayment() * inputValues.loanTerm * 12) 
      + inputValues.homePrice*inputValues.downPayment
    );

    // property tax depends on the growth rate of the house since it is 
    // determined by fair market value.
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly property tax adjusting for home growth rate
      totalCost += propertyTax;
      propertyTax = propertyTax * (1 + inputValues.homeValGrowth/12);
    }

    // home insurance depends on the cost to replace (rebulid) your home
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly expenditures adjusting for overall inflation rate
      totalCost = totalCost + homeInsurance + maintenanceCost + hoaFee;
      homeInsurance = homeInsurance * (1 + r/12);
      maintenanceCost = maintenanceCost * (1 + r/12);
      hoaFee = hoaFee * (1 + r/12)
    }


    return; 
  }

  function genRenterCostArr() {
    return; 
  }

  /*
   *
   */
  function calcOwnerCost() {
    let totalCost = 0;
    // changes according to fair market value growth rate
    let propertyTax = inputValues.propertyTax;
    // changes according to overall inflation rate
    let homeInsurance = inputValues.homeInsurance;
    let maintenanceCost = inputValues.monthlyMaintenance;
    let hoaFee = inputValues.hoaCondoFees;
    // assuming will not change (realistically would but we predict the avg.)
    const r = inputValues.inflationRate;

    // independent to inflation. constant mortgage payment and one time down.
    totalCost += (calcMortgagePayment() * inputValues.loanTerm * 12) 
      + inputValues.homePrice*inputValues.downPayment
      + inputValues.closingCosts;
   
    // property tax depends on the growth rate of the house since it is 
    // determined by fair market value.
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly property tax adjusting for home growth rate
      totalCost += propertyTax;
      propertyTax = propertyTax * (1 + inputValues.homeValGrowth/12);
    }

    // home insurance depends on the cost to replace (rebulid) your home
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly expenditures adjusting for overall inflation rate
      totalCost = totalCost + homeInsurance + maintenanceCost + hoaFee;
      homeInsurance = homeInsurance * (1 + r/12);
      maintenanceCost = maintenanceCost * (1 + r/12);
      hoaFee = hoaFee * (1 + r/12)
    }

    return totalCost.toFixed(2);
  } 

  function calcRenterCost() {
    let totalCost = 0;
    let growingCosts = inputValues.desiredRent + inputValues.renterInsurance 
      + inputValues.securityDeposit + inputValues.parkingFee 
      + inputValues.maintenanceFee + inputValues.amenitiesFee;
    const r = inputValues.inflationRate;

    totalCost += inputValues.securityDeposit + inputValues.petDeposit + inputValues.appFee;

    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      totalCost += growingCosts;
      growingCosts = growingCosts * (1 + r/12);
    }

    return totalCost.toFixed(2);
  }


  

  return (
    <>
      <CalcForm 
        updateInputValue = {(k, v)=>{
          console.log("updating " + k + " value")
          setInputValues({
            ...inputValues,
            [k] : v
          })
        }}
      />
      
      <h1>Rent or Buy?</h1>
    
      <h2>Location</h2>

      <h2>Total costs</h2>
    
      <h3>Owning costs</h3>
      <p>${calcOwnerCost()}</p>

      <h3>Renting cost:</h3>
      <p>${calcRenterCost()}</p>
           
    </>
  );
}

export default App

