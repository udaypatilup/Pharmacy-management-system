import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const SellMedicine = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [billItems, setBillItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [customerSuggestions, setCustomerSuggestions] = useState([]);
    const [medicineSuggestions, setMedicineSuggestions] = useState([]);
    const [customerInput, setCustomerInput] = useState('');
    const [medicineInput, setMedicineInput] = useState('');
    const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);

    useEffect(() => {
        fetchCustomers();
        fetchMedicines();
    }, []);

    useEffect(() => {
        setIsAddButtonEnabled(selectedCustomer && selectedMedicine && quantity !== '');
    }, [selectedCustomer, selectedMedicine, quantity]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getMedicines');
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const handleCustomerSelection = (customer) => {
        setSelectedCustomer(customer);
        setCustomerInput(customer.name);
    };

    const handleMedicineSelection = (medicine) => {
        setSelectedMedicine(medicine);
        setMedicineInput(medicine.name);
    };

    const handleAddToBill = () => {
        // Check if customer and medicine are selected
        console.log(selectedCustomer, selectedMedicine);
        if (!selectedCustomer || !selectedMedicine) {
            alert('Please select a customer and a medicine.');
            return;
        }

        // Check if quantity is empty or negative
        console.log(quantity);
        if (!quantity || parseInt(quantity) <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        // Check if the selected medicine is already in the bill items
        const existingItemIndex = billItems.findIndex(item => item.medicine._id === selectedMedicine._id);
        if (existingItemIndex !== -1) {
            // If it exists, update the quantity of the existing item
            const updatedBillItems = [...billItems];
            updatedBillItems[existingItemIndex].quantity += parseInt(quantity);
            setBillItems(updatedBillItems);
        } else {
            // If it doesn't exist, add a new item to the bill
            const newItem = {
                medicine: selectedMedicine,
                quantity: parseInt(quantity),
            };
            setBillItems([...billItems, newItem]);
        }

        setTotal(total + selectedMedicine.pricePerUnit * parseInt(quantity));
        setQuantity('');
    };


    const handleFinalizeSell = async () => {
        try {
            await Promise.all(
                billItems.map(async (item) => {
                    await axios.put(`http://localhost:5000/api/medicines/${item.medicine.medicineID}`, {
                        ...item.medicine,
                        quantity: item.medicine.quantity - item.quantity,
                    });
                })
            );
            alert('Sell finalized successfully');
            setSelectedCustomer(null);
            setSelectedMedicine(null);
            setQuantity('');
            setBillItems([]);
            setTotal(0);
        } catch (error) {
            console.error('Error finalizing sell:', error);
        }
    };

    useEffect(() => {
        setCustomerSuggestions(customers);
        setMedicineSuggestions(medicines);
    }, [customers, medicines]);

    const filterCustomers = (searchTerm) => {
        return customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filterMedicines = (searchTerm) => {
        return medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    return (
        <div>
        <Navbar/>
        <div style={{backgroundImage:'url("https://media.istockphoto.com/id/1334339763/photo/beautiful-abstract-3d-surface-with-glitter-sparkles-abstract-3d-waves-on-surface-blue.jpg?s=2048x2048&w=is&k=20&c=JMg91yu54tN3aIL0wq5aj0t7da9zzIzwc9S6wdGThCo=")', backgroundSize:'cover',height:'150vh'}}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>SellMedicine</h1>
            <div>
                <label><b>Customer Name:</b></label>
                <input
                    type="text"
                    value={customerInput}
                    onChange={(e) => {
                        setCustomerInput(e.target.value);
                        setCustomerSuggestions(filterCustomers(e.target.value));
                    }}
                />
                <select
                    value={selectedCustomer ? selectedCustomer.name : ''}
                    onChange={(e) => {
                        const selectedCustomer = customers.find(customer => customer.name === e.target.value);
                        handleCustomerSelection(selectedCustomer);
                    }}
                >
                    <option value="">Select a customer</option>
                    {customerSuggestions.map((customer) => (
                        <option key={customer._id} value={customer.name}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>
            <hr />
            <div>
                <label><b>Medicine Name:</b></label>
                <input
                    type="text"
                    value={medicineInput}
                    onChange={(e) => {
                        setMedicineInput(e.target.value);
                        setMedicineSuggestions(filterMedicines(e.target.value));
                    }}
                />
                <select
                    value={selectedMedicine ? selectedMedicine.name : ''}
                    onChange={(e) => {
                        const selectedMedicine = medicines.find(medicine => medicine.name === e.target.value);
                        handleMedicineSelection(selectedMedicine);
                    }}
                >
                    <option value="">Select a medicine</option>
                    {medicineSuggestions.map((medicine) => (
                        <option key={medicine._id} value={medicine.name}>
                            {medicine.name}
                        </option>
                    ))}
                </select>
                <label><b>Quantity:</b></label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                    onClick={handleAddToBill}
                    disabled={!selectedCustomer || !selectedMedicine || !quantity || parseInt(quantity) <= 0}
                    className={(!selectedCustomer || !selectedMedicine || !quantity || parseInt(quantity) <= 0) ? 'disabled-button' : ''}
                >
                    Add to Bill
                </button>


            </div>
            <hr />
            <div style={{ marginTop: '20px' }}>
                <h3>Bill Items</h3>
                <ul>
                    {billItems.map((item, index) => (
                        <li key={index}>
                            {item.medicine.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total: {total}</p>
                <button onClick={handleFinalizeSell}>Finalize Sell</button>
            </div>
        </div>
        </div>
        </div>
    );
};

export default SellMedicine;
