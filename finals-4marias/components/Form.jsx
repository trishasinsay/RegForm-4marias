import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Form.module.css"
import Swal from "sweetalert2";
import Axios from "axios";
import React, { useState } from "react";

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Graduate&family=Inter:wght@300;600&display=swap" rel="stylesheet"></link>
</link>

export default function FORM(){
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [address, setaddress] = useState("")
  const [old_tupStudent, setold_tupStudent] = useState("")
  const [reason, setreason] = useState("")

const schema = yup.object().shape({
  firstName: yup.string().max(255).required('First name is required'),
  lastName: yup.string().max(255).required('Last name is required'),
  email: yup.string().email().required(),
  mobile: yup.number().required("A phone number is required"),
  address: yup.string().max(255).required('Address is required'),
  old_tupStudent: yup.mixed().oneOf(['Yes','No'], "Field is required"),
  reason: yup.string().max(255).required('This is required'),
  
});

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
    Swal.fire({
      title: "REGISTRATION COMPLETE!",
      icon: 'success',
      text: 'You have successfully submitted your form!',
      confirmButtonText: 'OK',
      padding:"45px",
      width: 450,
      background: "black",
      color: "white",
      confirmButtonColor: "blue",
  });
    Axios.post("http://localhost:3306/Registration", {
      firstName:firstName,
      lastName:lastName,
      email:email,
      mobile:mobile,
      address:address,
      old_tupStudent:old_tupStudent,
      reason:reason,

   
    });
  };

  return (
    <div className={styles.main}>
        <div className={styles.form}>
            <h2>Registration Form</h2>
        </div>
        <div onSubmit={handleSubmit(submitForm)} className={styles.container}>
            <form className={styles.containerB}> <img src={"/logo 1.png"}/>
              <div className={styles.firstName}>
                <input {...register("firstName")} className={styles.name} placeholder="First Name" type="text" onChange= {(e) => {setfirstName(e.target.value)}}required/>
                <p>{errors.firstName?.message}</p>
                <br/>
              </div>
          
              <div className={styles.lastName}>
                <input {...register("lastName")} className={styles.name} placeholder="Last Name" type="text" onChange= {(e) => {setlastName(e.target.value)}} required />
                <p>{errors.lastName?.message}</p>
                <br />
              </div>
              
        
              <div className={styles.email}>
                <input {...register("email")} className={styles.name} placeholder="Email" type="email" onChange= {(e) => {setemail(e.target.value)}}required />
                <p>{errors.email?.message}</p>
                <br />
              </div>
                
        
                <div className={styles.mobile}>
                  <input {...register("mobile")} className={styles.name} placeholder="Mobile Number" type="number" onChange= {(e) => {setmobile(e.target.value)}}required />
                  <p>{errors.mobile?.message}</p>
                  <br />
                </div>
                

                <div className={styles.old_tupStudent}> 
                  <h3 className={styles.old}>ARE YOU OLD TUPC STUDENTS?</h3>
                    <div className={styles.options}>
                      <label htmlFor="YES">YES</label>
                      <input type="radio" name="options" value ="Yes"
                      {...register("old_tupStudent")} onChange= {(e) => {setold_tupStudent(e.target.value)}} required/>
            
                      <label1 htmlFor="NO">NO</label1>
                      <input type="radio" name="options" value ="No"
                      {...register("old_tupStudent")} onChange= {(e) => {setold_tupStudent(e.target.value)}} required/>
                      <p className={styles.error}>{errors.old_tupStudent?.message}</p>
                      <br />
                    </div>
                </div>
                
                <div className={styles.address}>
                  <input {...register("address")} className={styles.name} placeholder="Address" type="text" onChange= {(e) => {setaddress(e.target.value)}} required />
                  <p>{errors.address?.message}</p>
                  <br />
                </div>
           
                <div className={styles.reason}>
                  <input {...register("reason")} className={styles.name} placeholder="Why do you want to study here?" type="text" onChange= {(e) => {setreason(e.target.value)}}required />
                  <p >{errors.reason?.message}</p>
                  <br />
                </div>
          
                <div className={styles.submit}>
                  <button type="submit">Submit</button>
                <div>
                </div>
                </div>
              </form>
          </div>
      </div> 
  )
};
