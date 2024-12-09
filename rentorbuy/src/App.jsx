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
    e.target.type == "number"? setInputValues({
      ...inputValues,
      [e.target.id] : e.target.valueAsNumber
    }) : setInputValues({
      ...inputValues,
      [e.target.id] : e.target.value
    });
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
   * summation over n months of stay length with payments interest compounded:
   * S_(i=1)^n (mortgagePayment + insurancePayment*(1+r/n)^(n*i) + ...)
   * 
   * mortgage payment is only paid during length of term. After term ends, all
   * other payments continue (e.g., property tax)
   */
  function calcOwnerCost() {
    let totalCost = 0;
    for (let i = 0; i < inputValues.stayDuration; i++) {
      // mortagage payment stays the same throughout the stay duration
      totalCost += calcMortgagePayment(); 
      // using compound interest to account for inflation
      // property tax dependent on the evaluation of the house, which may
      // outpace the overall inflation rate
    }
    return totalCost;
  }

  /*
   * 
   */
  function calcRenterCost() {
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
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="number" 
          value={inputValues.stayDuration} 
          name="stayDuration" 
          id="stayDuration"
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
      <h3>Renting cost:</h3>
      <p>{calcRenterCost()}</p>
      <h3>Owning costs</h3>
      <p>{calcOwnerCost()}</p>
     
    </>
  );
}

export default App

