import './App.css'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      homePrice: 500000
    }
  )

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>
      <div>
        <label htmlFor="desiredLocation">Desired location</label>
        <input defaultValue={inputValues.homePrice} type="number"  name="desiredLocation" id="desiredLocation"/>
      </div>
      <h2>Owning</h2>
      <div>
        <label htmlFor="downPayment">Down payment</label>
        <input type="number" defaultValue="0" name="downPayment" id="downPayment" />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input type="number" defaultValue="0" name="mortgageRate" id="mortgageRate" />
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
        <input type="number" defaultValue="0" name="homeInsurance" id="homeInsurance" />
      </div>

      <div>
        <label htmlFor="closingCosts">Desired location</label>
        <input type="number" defaultValue="0" name="closingCosts" id="closingCosts" />
      </div>

      <div>
        <label htmlFor="HOA/condo fees">HOA/condo fees</label>
        <input type="number" defaultValue="0" name="HOA/condo fees" id="HOA/condo fees" />
      </div>

      <div>
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input type="number" defaultValue="0" name="monthlyMaintenance" id="monthlyMaintenance" />
      </div>
    
      <div>
        <label htmlFor="propertyTax">Property tax</label>
        <input type="number" defaultValue="0" name="propertyTax" id="propertyTax"/>
      </div>

      <div>
        <label htmlFor="homePriceGrowth">Home price growth rate</label>
        <input type="number" defaultValue="0" name="homePriceGrowth" id="homePriceGrowth"/>
      </div>
    
      <div>
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input type="number" defaultValue="0" name="stayDuration" id="stayDuration"/>
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
    </>
  )
}

export default App

