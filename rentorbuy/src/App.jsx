import './App.css'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      desiredLocation: "",
      homePrice: 500000,
      downPayment: 0,
      mortgageRate: 0,
      loanTerm: "30 year",
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
 
  // see formula:  https://en.wikipedia.org/wiki/Mortgage_calculator
  // payment same:  https://www.calculator.net/mortgage-calculator.html
  function calculateTotalCost() {
    const sum = 0;

    return sum;
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
          defaultValue="0" 
          name="downPayment" 
          id="downPayment"
          onChange={handleInputChange} />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="mortgageRate" 
          id="mortgageRate"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm" onChange={handleInputChange}>
          <option value="30 year">30 year</option>
          <option value="15 year">15 year</option>
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
    </>
  );
}

export default App

