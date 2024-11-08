import './App.css'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      homePrice: 500000,
      downPayment: 0,
      mortgageRate: 0,
      loanTerm: 0,
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

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>

      <div>
        <label htmlFor="desiredLocation">Desired location</label>
        <input  type="text"  name="desiredLocation" id="desiredLocation"/>
      </div>

      <h2>Owning</h2>

      <div>
        <label htmlFor="homePrice">Home price</label>
        <input 
          value={inputValues.homePrice} 
          type="number"  
          name="homePrice" 
          id="homePrice" 
          onChange={handleInputChange}/>
      </div>

      <div>
        <label htmlFor="downPayment">Down payment</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="downPayment" 
          id="downPayment" />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="mortgageRate" 
          id="mortgageRate" />
      </div>

      <div>
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm">
          <option value="30year">30 year</option>
          <option value="15year">15 year</option>
        </select>
      </div>
    
      <div>
        <label htmlFor="homeInsurance">Home insurance</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="homeInsurance" 
          id="homeInsurance" />
      </div>

      <div>
        <label htmlFor="closingCosts">Desired location</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="closingCosts" 
          id="closingCosts" />
      </div>

      <div>
        <label htmlFor="hoaCondoFees">HOA/condo fees</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="hoaCondoFees" 
          id="hoaCondoFees" />
      </div>

      <div>
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="monthlyMaintenance" 
          id="monthlyMaintenance" />
      </div>
    
      <div>
        <label htmlFor="propertyTax">Property tax</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="propertyTax" 
          id="propertyTax"/>
      </div>

      <div>
        <label htmlFor="homePriceGrowth">Home price growth rate</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="homePriceGrowth" 
          id="homePriceGrowth"/>
      </div>
    
      <div>
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="number" 
          defaultValue="0" 
          name="stayDuration" 
          id="stayDuration"/>
      </div>
      
      <h2>Renting</h2>

      <div>
        <label htmlFor="desiredRent">Desired rent</label>
        <input type="number" defaultValue="0" name="desiredRent" id="desiredRent"/>
      </div>

      <div>
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input type="number" defaultValue="0" name="renterInsurance" id="renterInsurance"/>
      </div>

      <div>
        <label htmlFor="securityDeposit">Security deposit</label>
        <input type="number" defaultValue="0" name="securityDeposit" id="securityDeposit"/>
      </div>

      <div>
        <label htmlFor="petDeposit">Pet deposit</label>
        <input type="number" defaultValue="0" name="petDeposit" id="petDeposit"/>
      </div>

      <div>
        <label htmlFor="utilIncluded">Utilities included</label>
        <input type="number" defaultValue="0" name="utilIncluded" id="utilIncluded"/>
      </div>

      <div>
        <label htmlFor="appFee">Application fee</label>
        <input type="number" defaultValue="0" name="appFee" id="appFee"/>
      </div>

      <div>
        <label htmlFor="parkingFee">Parking fee</label>
        <input type="number" defaultValue="0" name="parkingFee" id="parkingFee"/>
      </div>

      <div>
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input type="number" defaultValue="0" name="maintenanceFee" id="maintenanceFee"/>
      </div>

      <div>
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input type="number" defaultValue="0" name="amenitiesFee" id="amenitiesFee"/>
      </div>

      <h2>Total costs</h2>
      <h3>Renting cost:</h3>
      <h3>Owning costs</h3>
      <p>{inputValues.homePrice}</p>
    </>
  );
}

export default App

