import { useState, useEffect, FC } from 'react'
import './App.css'

type Merchant = {
  id: number,
  name: string,
  email: string
}

const App: FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  const getMerchant = () => {
    fetch('http://localhost:3001')
      .then((response) => response.json())
      .then((data: Merchant[]) => {
        setMerchants(data);
      });
  }

  const createMerchant = () => {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then((response) => {
      if (!response.ok) {
        console.error(response)
      }
      return response.json()
    })
    .then(data => {
      alert(data);
      getMerchant();
    });
  }

  const deleteMerchant = () => {
    let id = prompt('Enter merchant id');
    if (id) {
      fetch(`http://localhost:3001/merchants/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        alert(data);
        getMerchant();
      });
    }
  }

  const updateMerchant = () => {
    let id = prompt('Enter merchant id');
    let name = prompt('Enter new merchant name');
    let email = prompt('Enter new merchant email');
    if (id) {
      fetch(`http://localhost:3001/merchants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          getMerchant();
        })
    }
  }

  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <div>
      {merchants.length > 0 ? (
        merchants.map((merchant) => (
          <div key={merchant.id}>
            {merchant.id} {merchant.name} {merchant.email}
          </div>
        ))
      ) : ('There is no merchant data available')}
      <br />
      <button onClick={createMerchant}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button>
      <br />
      <button onClick={updateMerchant}>Update merchant</button>
    </div>
  )
}

  export default App;