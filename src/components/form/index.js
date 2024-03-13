import React, { useState, useRef } from 'react';
import { InputMask as InputMaskPhone } from '@react-input/mask';
import InputMask from "@mona-health/react-input-mask";
import {validateAddress, validateCVV2, validateCountry, validateCreditCard, validateEmail, validateName, validatePhone, validateTerms} from '../../helpers/validation'
import './index.css';
import Dropdown from '../dropdown'

const CustomForm = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErr, setFirstNameErr] = useState(false);
  const firstNameRef = useRef(null);

  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState(false);
  const lastNameRef = useRef(null);

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const emailRef = useRef(null);

  const [phone1, setPhone1] = useState('');
  const [phone1Err, setPhone1Err] = useState(false);
  const phone1Ref = useRef(null);

  const [phone2, setPhone2] = useState('');
  const [phone2Err, setPhone2Err] = useState(false);
  const phone2Ref = useRef(null);

  const [phone3, setPhone3] = useState('');
  const [phone3Err, setPhone3Err] = useState(false);
  const phone3Ref = useRef(null);

  const [country, setSelected] = useState('Сhoose a country');
  const [countryErr, setCountryErr] = useState(false);
  const countryRef = useRef(null);

  const [address, setAddress] = useState('');
  const [addressErr, setAddressErr] = useState(false);
  const addressRef = useRef(null);

  const [creditCard, setCreditCard] = useState('');
  const [creditCardErr, setCreditCardErr] = useState(false);
  const creditCardRef = useRef(null);
  const [creditCardMask, setCreditCardMask] = useState({
    value: '',
    mask: '9999-9999-9999-9999'
  })

  const [cvv, setCvv] = useState('');
  const [cvvErr, setCvvErr] = useState(false);
  const cvvRef = useRef(null);

  const [terms, setTerms] = useState(false);
  const [termsErr, setTermsErr] = useState(false);
  const termsRef = useRef(null);

  const [isLoading, setLoading] = useState(false);

  const onChangeTerms = () => {
    setTerms(prev=>!prev);
    setTermsErr(validateTerms(!terms));
  }

  const handleChangeCountry = (country) => {
    setSelected(country)
  }

  const onChangeFirstName = (value) =>{
    setFirstName(value);
    setFirstNameErr(validateName(value));
  }

  const onChangeLastName = (value) => {
    setLastName(value);
    setLastNameErr(validateName(value));
  }

  const onChangeEmail = (value) => {
    setTimeout(async() => {
      let emailSwitch = await validateEmail(value);
      setEmail(value);
      setEmailErr(emailSwitch);
    }, 500);
  }

  const onChangePhone1 = (value) => {
    setPhone1(value);
    setPhone1Err(validatePhone(value));
  }

  const onChangePhone2 = (value) => {
    setPhone2(value);
    setPhone2Err(validatePhone(value));
  }

  const onChangePhone3 = (value) => {
    setPhone3(value);
    setPhone3Err(validatePhone(value));
  }

  const onChangeAddress = (value) => {
    setAddress(value);
    setAddressErr(validateAddress(value));
  }

  const onChangeCreditCard = (value) => {
 
    let newState = {
      mask: '9999-9999-9999-9999',
      value: value
    };
    if (/^3[47]/.test(value)) {
      newState.mask = '9999-999999-99999';
    }
    setCreditCardMask(newState);

    setCreditCard(value);
    setCreditCardErr(validateCreditCard(value));
  }

  const onChangCvv = (value) => {
    setCvv(value);
    setCvvErr(validateCVV2(value));
  }

  const resetForm = () => {
    setFirstName('');
    firstNameRef.current.value = '';

    setLastName('');
    lastNameRef.current.value = '';

    setPhone1('');
    phone1Ref.current.value = '';

    setPhone2('');
    phone2Ref.current.value = '';

    setPhone3('');
    phone3Ref.current.value = '';

    setEmail('');
    emailRef.current.value = '';

    setAddress('');
    addressRef.current.value = '';

    setSelected('Сhoose a country!');

    setCreditCard('');
    setCreditCardMask({
      value: '',
      mask: '9999-9999-9999-9999'
    });

    setCvv('')
    cvvRef.current.value = '';

    setTerms(false);
  }

  const onBlurFromEmailField = () => {
    setTimeout(async() => {
      let emailSwitch = await validateEmail(email);
      setEmailErr(emailSwitch);
    }, 500);
  }

  const onSubmitForm = () => {
    let flag = false;
    const errors = [
      {'terms': termsErr},
      {'cvv': cvvErr}, 
      {'creditcard': creditCardErr}, 
      {'address': addressErr}, 
      {'country': countryErr}, 
      {'phone3': phone3Err}, 
      {'phone2': phone2Err}, 
      {'phone1': phone1Err}, 
      {'email': emailErr}, 
      {'lastName': lastNameErr}, 
      {'firstName': firstNameErr}, 
    ];

    errors.forEach(async(err)=>{
      switch (Object.keys(err)[0]) {
        case 'firstName':
          if(validateName(firstName).length > 0){
            setFirstNameErr(validateName(firstName));
            firstNameRef.current.focus();
            flag = true;
          }
          break;

        case 'lastName':
          if(validateName(lastName).length > 0){
            setLastNameErr(validateName(lastName));
            lastNameRef.current.focus();
            flag = true;
          }
          break;
      
        case 'email':
          let emailSwitch = await validateEmail(email);
          if(emailSwitch.length > 0 ){
            setEmailErr(emailSwitch);
            emailRef.current.focus();
            flag = true;
          } else {
            setEmailErr(emailSwitch);
          }
          break;
      
        case 'phone1':
          if(validatePhone(phone1).length > 0){
            setPhone1Err(validatePhone(phone1, [phone1, phone2, phone3]));
            phone1Ref.current.focus();
            flag = true;
          }
          break;

        case 'phone2':
          if(validatePhone(phone2).length > 0){
            setPhone2Err(validatePhone(phone2, [phone1, phone2, phone3]));
            if(validatePhone(phone2, [phone1, phone2, phone3]).length !== 0){
              phone2Ref.current.focus();
              flag = true;
            } 
          }
          break;

        case 'phone3':
          if(validatePhone(phone3).length > 0){
            setPhone3Err(validatePhone(phone3, [phone1, phone2, phone3]));
            if(validatePhone(phone3, [phone1, phone2, phone3]).length !== 0){
              phone3Ref.current.focus();
              flag = true;
            } 
          }
          break;
        
        case 'country':
          const countryArray = ['Ukraine', 'USA', 'Poland', 'Finland', 'Germany'];
        
          if(!countryArray.includes(country)){
            setCountryErr(validateCountry(country))
            countryRef.current.focus();
            flag = true;
          }
          break;

        case 'address':
          if(validateAddress(address).length > 0){
            setAddressErr(validateAddress(address));
            addressRef.current.focus();
            flag = true;
          }
          break;

        case 'creditcard':
          if(validateCreditCard(creditCard).length > 0){
            setCreditCardErr(validateCreditCard(creditCard));
            creditCardRef.current.focus();
            flag = true;
          }
          break;

        case 'cvv':
          if(validateCVV2(cvv).length > 0){
            setCvvErr(validateCVV2(cvv));
            cvvRef.current.focus();
            flag = true;
          }
          break;

        case 'terms':
          if(validateTerms(terms)){
            setTermsErr(validateTerms(terms));
            termsRef.current.focus();
            flag = true;
          }
          
          break;

        default:
          console.log('warn')
      }
    })

    const data = {
      firstName,
      lastName,
      email,
      phones: [phone1, phone2, phone3],
      country,
      address,
      creditCard,
      cvv,
      terms
    };
    
    if(!flag && (emailErr.length === 0 || emailErr === false)){
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log('form data: ', data);
        resetForm();
      }, 1000);
  
    }
  }
  
  return(
    <div className='form-container'>
      <form>
        <div className='personal-information-container'>
            <div className='section-headline'>1. Personal information:</div>
            <div className='data'>
                <label>
                    <span className='form-field-title'>first name:</span>
                    <input 
                      className={firstNameErr ? 'err' : ''}
                      ref={firstNameRef}
                      type='text' 
                      onChange={(event)=>onChangeFirstName(event.target.value)}
                      onBlur={()=>setFirstNameErr(validateName(firstName))}/>
                    {<div className='error'>{firstNameErr}</div>}
                </label>

                <label>
                    <span className='form-field-title'>lastname:</span>
                    <input 
                      className={lastNameErr ? 'err' : ''}
                      ref={lastNameRef}
                      type='text' 
                      onChange={(event)=>onChangeLastName(event.target.value)}
                      onBlur={()=>setLastNameErr(validateName(lastName))}/>
                    {<div className='error'>{lastNameErr}</div>}
                </label>
            </div>
        </div>

        <div className='contact-information-container'>
          <div className='section-headline'>2. Contact information:</div>
          <div className='data'>

            <label>
              <span className='form-field-title'>email:</span>
                <input 
                  className={emailErr ? 'err' : ''}
                  placeholder='***@***.***'
                  ref={emailRef}
                  type='email' 
                  onChange={(event)=>onChangeEmail(event.target.value)}
                  onBlur={onBlurFromEmailField}
                  />
                {<div className='error'>{emailErr}</div>}
            </label>

            <label>
              <div className='form-field-title'>phone:</div>
              <div className='phone-container'>
                <div className='country-code'>+38</div>
                <InputMaskPhone 
                  className={phone1Err ? 'err' : ''}
                  placeholder='(000) 000-00-00'
                  ref={phone1Ref}
                  name='phone'
                  mask="(___) ___-__-__" 
                  replacement={{ _: /\d/ }}
                  onChange={(event)=>onChangePhone1(event.target.value)}
                  onBlur={()=>setPhone1Err(validatePhone(phone1))}/>
              </div>
              {<div className='error'>{phone1Err}</div>}
            </label>

            <label>
              <div className='form-field-title'>phone 2:</div>
              <div className='phone-container'>
                <div className='country-code'>+38</div>
                <InputMaskPhone 
                  className={phone1.length === 15 && phone2.length > 0 && phone2Err ? 'err' : ''}
                  placeholder='(000) 000-00-00'
                  disabled={phone1.length === 15 ? false : true}
                  ref={phone2Ref}
                  mask="(___) ___-__-__" 
                  replacement={{ _: /\d/ }} 
                  onChange={(event)=>onChangePhone2(event.target.value)}
                  onBlur={()=>setPhone2Err(validatePhone(phone2))}/>
              </div>
              {phone1.length === 15 && phone2.length > 0 && <div className='error'>{phone2Err}</div>}
      
            </label>

            <label>
              <div className='form-field-title'>phone 3:</div>
              <div className='phone-container'>
                <div className='country-code'>+38</div>
                <InputMaskPhone 
                  className={phone1.length === 15 && phone2.length === 15 && phone3.length > 0 && phone3Err ? 'err' : ''}
                  placeholder='(000) 000-00-00'
                  disabled={phone2.length === 15 ? false : true}
                  ref={phone3Ref}
                  mask="(___) ___-__-__" 
                  replacement={{ _: /\d/ }} 
                  onChange={(event)=>onChangePhone3(event.target.value)}
                  onBlur={()=>setPhone3Err(validatePhone(phone3))}/>
              </div>
              
              {phone1.length === 15 && phone2.length === 15 && phone3.length > 0 && <div className='error'>{phone3Err}</div>}
            </label>

            <label>
              <span className='form-field-title'>country:</span>
              <Dropdown
                ref={countryRef}
                country={country}
                setSelected={setSelected}
                handleChange={(country) => {
                  setCountryErr(false);
                  handleChangeCountry(country)}
                }
                err={countryErr}
                />
              { countryErr && <div className='error'>{countryErr}</div>}
            </label>

            <label>
              <span className='form-field-title'>address:</span>
                <input 
                  className={addressErr ? 'err' : ''}
                  ref={addressRef}
                  name="address" 
                  type='text' 
                  onChange={(event)=>onChangeAddress(event.target.value)}
                  onBlur={()=>setAddressErr(validateAddress(address))}/>
                {<div className='error'>{addressErr}</div>}
            </label>
            </div>
        </div>

        <div className='payment-details-container'>
          <div className='section-headline'>3. Payment details:</div>
          <div className='data'>
            <label>
              <span className='form-field-title'>credit card:</span>
              <InputMask 
                className={creditCardErr ? 'err' : ''}
                ref={creditCardRef}
                placeholder={'1111-1111-1111-1111'}
                mask={creditCardMask.mask} 
                value={creditCardMask.value} 
                maskPlaceholder={null}
                onChange={(event)=>onChangeCreditCard(event.target.value)}
                onBlur={()=>setCreditCardErr(validateCreditCard(creditCard))}
              />
              {<div className='error'>{creditCardErr}</div>}
            </label>

            <label>
              <span className='form-field-title'>CVV2:</span>
                <input 
                  className={`cvv2 ${cvvErr ? 'err' : ''}`}
                  placeholder='***'
                  ref={cvvRef}
                  type='number' 
                  onChange={(event)=>onChangCvv(event.target.value)}
                  onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}}
                  onBlur={()=>setCvvErr(validateCVV2(cvv))}/>
              {<div className='error'>{cvvErr}</div>}
            </label>
          </div>
        </div>

        <div className='terms-container'>
          <div>
            Agreement with terms of use
            <input ref={termsRef} type="checkbox" checked={terms} onChange={onChangeTerms}/>
            {<div className='error'>{termsErr}</div>}
          </div>
        </div>

        <button type="button" className={`btn-submit ${isLoading ? 'loading' : ''}`} onClick={onSubmitForm}></button>

      </form>
    </div>
  )
};

export default CustomForm;
