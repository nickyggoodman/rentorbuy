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
      homeInsurance: 0,
      closingCosts: 0,
      hoaCondoFees: 0,
      monthlyMaintenance: 0,
      propertyTax: 0,
      homePriceGrowth: 0,
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

  function handleInputChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.id] : e.target.value
    });
  }

  /*
    The total principle that you pay is unaffected by the length of the 
    mortgage term or the interest rate. When you have a longer loan term,
    or if you have a higher interest, then the total interest payed will be
    larger. have a 15 year loan instead of a 30 year loan could save you
    100k in the end. and having a few percentage point lower interest rate
    could make the difference of 100k. 

    The actual amount you pay per month
    does not change over the length of the term, only the proportion of the 
    payment that goes to the interest vs. the principle will change over
    the course of the mortage term.** 
    
    ** for Fixed Rate Mortgages.
  */

  // see formula: https://en.wikipedia.org/wiki/Mortgage_calculator
  function calculateMonthlyPayment() {
    const r = inputValues.mortgageRate/12;
    const n = inputValues.loanTerm*12;
    const p = inputValues.homePrice * (1 - inputValues.downPayment);
    return ((p * r * (1 + r)**n)/(((1 + r)**n) - 1));
  } 

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>

      <div>
        <label htmlFor="desiredLocation">Desired location</label>
        <input  
          type="text"  
          name="desiredLocation" 
          id="desiredLocation"
          onChange={handleInputChange}/>
      </div>

      <h2>Owning</h2>

      <div>
        <label htmlFor="homePrice">Home price</label>
        <input 
          value={inputValues.homePrice} 
          type="number"  
          name="homePrice" 
          id="homePrice" 
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="downPayment">Down payment</label>
        <input 
          type="number" 
          defaultValue="0.20" 
          name="downPayment" 
          id="downPayment"
          onChange={handleInputChange} />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="number" 
          defaultValue="0.05" 
          name="mortgageRate" 
          id="mortgageRate"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm" onChange={handleInputChange}>
          <option value={30}>30 year</option>
          <option value={20}>20 year</option>
          <option value={15}>15 year</option>
        </select>
      </div>
    
      <div>
        <label htmlFor="homeInsurance">Home insurance</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="homeInsurance" 
          id="homeInsurance"
          onChange={handleInputChange}/>
      </div>

      <div>
        <label htmlFor="closingCosts">Desired location</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="closingCosts" 
          id="closingCosts"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="hoaCondoFees">HOA/condo fees</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="hoaCondoFees" 
          id="hoaCondoFees"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="monthlyMaintenance" 
          id="monthlyMaintenance" 
          onChange={handleInputChange} />
      </div>
    
      <div>
        <label htmlFor="propertyTax">Property tax</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="propertyTax" 
          id="propertyTax"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="homePriceGrowth">Home price growth rate</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="homePriceGrowth" 
          id="homePriceGrowth"
          onChange={handleInputChange} />
      </div>
    
      <div>
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="stayDuration" 
          id="stayDuration"
          onChange={handleInputChange} />
      </div>
      
      <h2>Renting</h2>

      <div>
        <label htmlFor="desiredRent">Desired rent</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="desiredRent" 
          id="desiredRent" 
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="renterInsurance" 
          id="renterInsurance"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="securityDeposit">Security deposit</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="securityDeposit" 
          id="securityDeposit"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="petDeposit">Pet deposit</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="petDeposit" 
          id="petDeposit"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="utilIncluded">Utilities included</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="utilIncluded" 
          id="utilIncluded"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="appFee">Application fee</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="appFee" 
          id="appFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="parkingFee">Parking fee</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="parkingFee" 
          id="parkingFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="maintenanceFee" 
          id="maintenanceFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="amenitiesFee" 
          id="amenitiesFee"
          onChange={handleInputChange} />
      </div>

      <h2>Total costs</h2>
      <h3>Renting cost:</h3>
      <h3>Owning costs</h3>
      <p>{inputValues.loanTerm}</p>
      <h3>monthly payment</h3>
      <p>{calculateMonthlyPayment()}</p>
    </>
  );
}

export default App

