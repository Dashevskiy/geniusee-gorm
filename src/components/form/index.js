import React, { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ConnectedFocusError } from 'focus-formik-error';
import { InputMask as InputMaskPhone } from '@react-input/mask';
import InputMask from "@mona-health/react-input-mask";
import {validateEmail, validateFirstname, validateLastname, validateCVV2} from '../../helpers/validation'
import {DisplayingErrorMessagesSchema} from '../../helpers/yup'
import './index.css';
import Dropdown from '../dropdown'

const CustomForm = () => {
  const [countrySelected, setSelected] = useState('Сhoose a country');
  const [isLoading, setLoading] = useState(false);
  const [countryErr, setCoutryErr] = useState(false);
  const [creditCardErr, setCCErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const phoneRef = useRef();
  const countryRef = useRef();
  const CCRef = useRef();

  const [creditCardMask, setCreditCard] = useState({
    value: '',
    mask: '9999-9999-9999-9999'
  })

  const [phones, setPhones] = useState([
    {
      idx: 0,
      value: '',
      err: false,
    },
    {
      idx: 1,
      value: '',
      err: false,
    },
    {
      idx: 2,
      value: '',
      err: false,
    }
  ])

  const onChangePhone = (targetValue, idx) =>{
    if(idx === 0){
      const newPhonesArr = phones.map((phone)=>phone.idx === idx ? {idx: idx, value:targetValue, err: targetValue.length < 15 ? true : false } : phone);
      setPhones(newPhonesArr);
    }else{
      const newPhonesArr = phones.map((phone)=>phone.idx === idx ? {idx: idx, value:targetValue, err: targetValue.length === 0 ||targetValue.length === 15 ? false : true } : phone);
      setPhones(newPhonesArr);
    }
  }

  const creditCardOnChange = (event) => {
    let value = event.target.value;
    if(value.length <19){
      setCCErr(true);
    }else{
      setCCErr(false);
    }
    let newState = {
      mask: '9999-9999-9999-9999',
      value: value
    };
    if (/^3[47]/.test(value)) {
      newState.mask = '9999-999999-99999';
    }
    setCreditCard(newState);
    newState.value.length < 19 ? setCCErr(true) : setCCErr(false);
  }

  const handleChangeCountry = (country) => {
    setSelected(country)
  }

  const onClickBySubmit = () => {
    setCoutryErr(true);
    setCCErr(true);
    setPhoneErr(true);
    if(phones[0].value.length < 15){
      phoneRef.current.focus();
    }
    if(!['Ukraine', 'USA', 'Poland', 'Finland', 'Germany'].includes(countrySelected)){
      countryRef.current.focus()
    }

    if(creditCardMask.value.length < 19){
      CCRef.current.focus()
    }
  }

  return(
  <div className='form-container'>
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        cvv2: '',
        terms:'',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={(values, { resetForm  }) => {
        if(!['Ukraine', 'USA', 'Poland', 'Finland', 'Germany'].includes(countrySelected)){
          setCoutryErr(true);
        }else if(creditCardMask.value.length < 19){
          setCCErr(true);
        }else if(phones[0].value.length < 15){
          setPhoneErr(true);
        }else{
          setCoutryErr(false);
          setCCErr(false);
          setPhoneErr(false);
          const data = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            country: countrySelected,
            address: values.address,
            creditcard: creditCardMask.value,
            cvv2: values.cvv2,
            terms: values.terms,
            phone: phones.map((phone)=> phone.value.length === 15 ? `+38${phone.value}` : '')
          }
          console.log('form data: ', data);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            resetForm();
          }, 1000);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <ConnectedFocusError />
            <div className='personal-information-container'>
                <div className='section-headline'>1. Personal information:</div>
                <div className='data'>
                    <label>
                        <span className='form-field-title'>first name:</span>
                        <Field name="firstname" type='text' className={`${errors.firstname ? 'err' : ''}`} validate={validateFirstname}/>
                        {errors.firstname && touched.firstname && <div className='error'>{errors.firstname}</div>}
                    </label>

                    <label>
                        <span className='form-field-title'>lastname:</span>
                        <Field name="lastname" type='text' className={`${errors.lastname ? 'err' : ''}`} validate={validateLastname}/>
                        {errors.lastname && touched.lastname && <div className='error'>{errors.lastname}</div>}
                    </label>
                </div>
            </div>

            <div className='contact-information-container'>
                <div className='section-headline'>2. Contact information:</div>
                <div className='data'>
                    <label>
                      <span className='form-field-title'>email:</span>
                        <Field name="email" type='email' className={`${errors.email ? 'err' : ''}`} validate={validateEmail}/>
                        {errors.email && touched.email && <div className='error'>{errors.email}</div>}
                    </label>

                    <label>
                      <div className='form-field-title'>phone:</div>
                      <div className='phone-container'>
                        <div className='country-code'>+38</div>
                        <InputMaskPhone 
                          ref={phoneRef}
                          className={`${phoneErr && phones[0].value.length < 15 ? 'err' : ''}`}
                          name='phone'
                          mask="(___) ___-__-__" 
                          replacement={{ _: /\d/ }} 
                          onChange={(e)=> onChangePhone(e.target.value, 0)} 
                          onBlur={()=>{phones[0].value.length < 15 ? setPhoneErr(true) : setPhoneErr(false)}}
                        />
                      </div>
                      {phones[0].value.length <15 && phoneErr && <div className='error'>Field is required and must be contains 9 Symbols!</div>}
                    </label>
              
                    <label>
                      <div className='form-field-title'>phone 2:</div>
                      <div className='phone-container'>
                        <div className='country-code'>+38</div>
                        <InputMaskPhone 
                          disabled={phones[0].value.length === 15 ? false : true}
                          className={phones[1].err ? 'err' : ''}
                          // name='phone2'
                          mask="(___) ___-__-__" 
                          replacement={{ _: /\d/ }} 
                          onChange={(e)=>onChangePhone(e.target.value,1)} 
                          // onBlur={()=>{}}
                        />
                      </div>
                      {phones[1].err && phones[2].value.length < 15 &&  <div className='error'>Field is required and must be contains 9 Symbols!</div>}
                    </label>

                    <label>
                      <div className='form-field-title'>phone 3:</div>
                      <div className='phone-container'>
                        <div className='country-code'>+38</div>
                        <InputMaskPhone 
                          disabled={phones[1].value.length === 15 ? false : true}
                          name='phone3'
                          mask="(___) ___-__-__" 
                          replacement={{ _: /\d/ }} 
                          onChange={(e)=>onChangePhone(e.target.value,2)} 
                          // onBlur={()=>{}}
                        />
                      </div>
                      {phones[2].err && phones[2].value.length < 15 &&  <div className='error'>Field is required and must be contains 9 Symbols!</div>}
                    </label>

                    <label>
                      <span className='form-field-title'>country:</span>
                      <Dropdown
                        countrySelected={countrySelected}
                        setSelected={setSelected}
                        handleChange={(country) => handleChangeCountry(country)}
                        err={countryErr}/>
                      <input ref={countryRef} className='hidden'/>
                      {countryErr && countrySelected === 'Сhoose a country' && <div className='error'>Сhoose a country</div>}
                    </label>
                
                    <label>
                      <span className='form-field-title'>address:</span>
                        <Field name="address" type='text' className={`${errors.address ? 'err' : ''}`}/>
                        {errors.address && touched.address && <div className='error'>{errors.address}</div>}
                    </label>
                </div>
            </div>

            <div className='payment-details-container'>
                <div className='section-headline'>3. Payment details:</div>
                <div className='data'>
                    <label>
                      <span className='form-field-title'>credit card:</span>
                      <InputMask 
                        ref={CCRef}
                        className={`${creditCardErr && creditCardMask.value.length < 19 ? 'err' : ''}`}
                        mask={creditCardMask.mask} 
                        value={creditCardMask.value} 
                        maskPlaceholder={null}
                        onChange={(e)=>creditCardOnChange(e)} 
                        onBlur={()=>creditCardMask.value.length < 19 ? setCCErr(true): setCCErr(false)}
                      />
                       {creditCardErr && creditCardMask.value.length < 19 ? <div className='error'>Field is required and must be contains 16 Symbols</div> : null}
                    </label>

                    <label>
                      <span className='form-field-title'>CVV2:</span>
                        <Field 
                          name="cvv2" 
                          type='number' 
                          className={`cvv2 ${errors.cvv2 ? 'err' : ''}`}
                          validate={validateCVV2}
                          onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}}/>
                          {errors.cvv2  && touched.cvv2  && <div className='error'>{errors.cvv2}</div>}
                    </label>
                </div>
            </div>

            <div className='terms-container'>
              <div>
                Agreement with terms of use
                <Field type="checkbox" name="terms" />
              </div>
              {errors.terms  && touched.terms  && <div className='error'>{errors.terms}</div>}
            </div>

          <button type="submit" className={`btn-submit ${isLoading && 'loading'}`} onClick={onClickBySubmit}></button>
        </Form>
      )}
    </Formik>
  </div>
  )
      };

export default CustomForm;