
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Trailform = () => {
  const inputStyle = {
    width: '100%',
    padding: '11px',
    borderRadius: '3px',
    border: '2px solid #ccc',
    boxSizing: 'border-box' as const // Cast to correct type
  }

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    company: '',
    expiryDate: new Date(),
    generatedPassword: ''
  })

  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, expiryDate: date })
  }

  const generatePassword = () => {
    const length = 10
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setFormData({ ...formData, generatedPassword: newPassword })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => setSubmitSuccess(false), 3000) // Reset success message after 3 seconds
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          company: '',
          expiryDate: new Date(),
          generatedPassword: ''
        })
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: '1px solid #000000',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s', // Adding transition for smoother animation
    marginTop: '10px',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '1.1rem' // Added margin for better spacing
  }

  return (
    <div>
      <div
        style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '500px', margin: '0 auto' }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Form</h1>
        {submitSuccess && <p style={{ textAlign: 'center', color: 'green' }}>Form submitted successfully!</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor='name' style={{ display: 'block', color: 'black' }}>
              👤 Name:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='e.g. John Doe'
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor='phoneNumber' style={{ display: 'block', color: 'black' }}>
              📞 Phone No:
            </label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Enter phone number'
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor='email' style={{ display: 'block', color: 'black' }}>
              ✉️ Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address'
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor='company' style={{ display: 'block', color: 'black' }}>
              🏢 Company:
            </label>
            <input
              type='text'
              id='company'
              name='company'
              value={formData.company}
              onChange={handleChange}
              placeholder='Enter company name'
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor='expiryDate' style={{ display: 'block', color: 'black' }}>
              📅 Expiry Date:
            </label>
            <DatePicker
              selected={formData.expiryDate}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
              dateFormat='MM/dd/yyyy'
              placeholderText='Select a date'
              wrapperClassName='datepicker-wrapper'
              className='datepicker-input'
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor='generatedPassword' style={{ display: 'block', color: 'black' }}>
              🔑 Generated Password:
            </label>
            <input
              type='text'
              id='generatedPassword'
              name='generatedPassword'
              value={formData.generatedPassword}
              readOnly // Make it read-only
              style={inputStyle}
            />
          </div>
          <button type='button' onClick={generatePassword} style={buttonStyle}>
            🔒 Generate Password
          </button>
          <button type='submit' style={buttonStyle}>
            📝 Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Trailform
