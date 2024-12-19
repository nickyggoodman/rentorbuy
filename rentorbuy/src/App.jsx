import './App.css'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      desiredLocation: "",
      homePrice: 500000,
      downPayment: 0.20,
      mortgageRate: 0.05,
      loanTerm: 30,
      inflationRate: 0,
      homeValGrowth: 0,
      homeInsurance: 0,
      closingCosts: 0,
      hoaCondoFees: 0,
      monthlyMaintenance: 0,
      propertyTax: 0,
      stayDuration: 30,
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
   * Overview:
   * - Renting does not provide equity, but a owning a house provides capital
   *   gains.
   *
   * - Rent will increase with inflation, but a mortgage payment does not.
   *   Given there is inflation (say 3%), rent will be more expensive
   *   than your mortgage payment towards the end of your mortgage, ceterus
   *   paribus.
   * 
   * - Renting costs such as parking, amentities fees, maintenances fees will
   *   increase with inflation, but so will the costs of owning a home such as
   *   property tax and maintenance costs. 
   *
   * - A dynamic model which accounts for inflation will give the most
   *   realistic comparison between owning a home and renting.
   *
   * - Some localities see a larger spread between home price and rent. Rent
   *   can be nearly half the price of a mortgage in large city centers or
   *   areas with low supply such as Los Angeles. This can be added in the
   *   calculation, but is generally difficult to predict 10, 20, years out.
   *
   */

  /*
   * Will change the state of the inputValues json dependent. If it is a number
   * then want to read the value as a number so we don't have to convert later.
   */
  function handleInputChange(e) {
//    e.target.type == "number"? setInputValues({
//      ...inputValues,
//      [e.target.id] : e.target.valueAsNumber
//    }) : setInputValues({
//      ...inputValues,
//      [e.target.id] : e.target.value
//    });
    if (e.target.type == "number") {
      setInputValues({
        ...inputValues,
        [e.target.id] : e.target.valueAsNumber || 0
      });
    } else {
      setInputValues({
        ...inputValues,
        [e.target.id] : e.target.value || 0
      });
    }
  }

  /*
   * see formula: https://en.wikipedia.org/wiki/Mortgage_calculator
   * calculates the monthly payment given the loan term, mortgage rate,
   * and principal after down payment.
   */
  function calcMortgagePayment() {
    const r = inputValues.mortgageRate/12;
    const n = inputValues.loanTerm*12;
    const p = inputValues.homePrice * (1 - inputValues.downPayment);
    return ((p * r * (1 + r)**n)/(((1 + r)**n) - 1));
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

    return totalCost;
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

    return totalCost;
  }

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>

      <div className="inputField">
        <label htmlFor="desiredLocation">Desired location</label>
        <input  
          value={inputValues.desiredLocation}
          type="text"  
          name="desiredLocation" 
          id="desiredLocation"
          onChange={handleInputChange}/>
      </div>

      <h2>Owning</h2>

      <div className="inputField">
        <label htmlFor="homePrice">Home price</label>
        <input 
          value={inputValues.homePrice} 
          type="number"  
          name="homePrice" 
          id="homePrice" 
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="downPayment">Down payment</label>
        <input 
          type="number" 
          value={inputValues.downPayment} 
          name="downPayment" 
          id="downPayment"
          onChange={handleInputChange} />
      </div>  

      <div className="inputField">
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="number" 
          value={inputValues.mortgageRate} 
          name="mortgageRate" 
          id="mortgageRate"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm" onChange={handleInputChange}>
          <option value={30}>30 year</option>
          <option value={20}>20 year</option>
          <option value={15}>15 year</option>
        </select>
      </div>

      <div className="inputField">
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="number" 
          value={inputValues.stayDuration} 
          name="stayDuration" 
          id="stayDuration"
          onChange={handleInputChange} />
      </div>

    
      <div className="inputField">
        <label htmlFor="homeInsurance">Home insurance</label>
        <input 
          type="number" 
          value={inputValues.homeInsurance} 
          name="homeInsurance" 
          id="homeInsurance"
          onChange={handleInputChange}/>
      </div>

      <div className="inputField">
        <label htmlFor="closingCosts">Closing cost</label>
        <input 
          type="number" 
          value={inputValues.closingCosts} 
          name="closingCosts" 
          id="closingCosts"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="hoaCondoFees">HOA/condo fees</label>
        <input 
          type="number" 
          value={inputValues.hoaCondoFees} 
          name="hoaCondoFees" 
          id="hoaCondoFees"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input 
          type="number" 
          value={inputValues.monthlyMaintenance} 
          name="monthlyMaintenance" 
          id="monthlyMaintenance" 
          onChange={handleInputChange} />
      </div>
    
      <div className="inputField">
        <label htmlFor="propertyTax">Property tax</label>
        <input 
          type="number" 
          value={inputValues.propertyTax} 
          name="propertyTax" 
          id="propertyTax"
          onChange={handleInputChange} />
      </div>

      
      <div className="inputField">
        <label htmlFor="inflationRate">Inflation rate</label>
        <input 
          value={inputValues.inflationRate} 
          type="number"  
          name="inflationRate" 
          id="inflationRate" 
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="homeValGrowth">Home value growth rate</label>
        <input 
          value={inputValues.homeValGrowth} 
          type="number"  
          name="homeValGrowth" 
          id="homeValGrowth" 
          onChange={handleInputChange} />
      </div>
      
    {
      /*
       * section II for everything that consists of the cost of renting a 
       * place. These will be multiplied by 12 months by the years of staying
       * in a location
       */
    }
      <h2>Renting</h2>

      <div className="inputField">
        <label htmlFor="desiredRent">Desired rent</label>
        <input 
          type="number" 
          value={inputValues.desiredRent} 
          name="desiredRent" 
          id="desiredRent" 
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input 
          type="number" 
          value={inputValues.renterInsurance} 
          name="renterInsurance" 
          id="renterInsurance"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="securityDeposit">Security deposit</label>
        <input 
          type="number" 
          value={inputValues.securityDeposit} 
          name="securityDeposit" 
          id="securityDeposit"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="petDeposit">Pet deposit</label>
        <input 
          type="number" 
          value={inputValues.petDeposit} 
          name="petDeposit" 
          id="petDeposit"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="utilIncluded">Utilities included</label>
        <input 
          type="number" 
          value={inputValues.utilIncluded} 
          name="utilIncluded" 
          id="utilIncluded"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="appFee">Application fee</label>
        <input 
          type="number" 
          value={inputValues.appFee} 
          name="appFee" 
          id="appFee"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="parkingFee">Parking fee</label>
        <input 
          type="number" 
          value={inputValues.parkingFee} 
          name="parkingFee" 
          id="parkingFee"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input 
          type="number" 
          value={inputValues.maintenanceFee} 
          name="maintenanceFee" 
          id="maintenanceFee"
          onChange={handleInputChange} />
      </div>

      <div className="inputField">
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input 
          type="number" 
          value={inputValues.amenitiesFee} 
          name="amenitiesFee" 
          id="amenitiesFee"
          onChange={handleInputChange} />
      </div>

      <h2>Total costs</h2>
    
      <h3>Owning costs</h3>
      <p>{calcOwnerCost()}</p>

      <h3>Renting cost:</h3>
      <p>{calcRenterCost()}</p>
           
    </>
  );
}

export default App

