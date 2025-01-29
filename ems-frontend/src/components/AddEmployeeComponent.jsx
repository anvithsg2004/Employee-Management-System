import React, { useEffect, useState } from 'react';
import { createEmployee, updateEmployee, getEmployeeById, deleteEmployee } from '../services/EmployeeServices';
import { useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const { id } = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    // Fetch employee details if editing
    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validate()) {

            const employee = { firstName, lastName, email };

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    navigator('/employees')
                }).catch(error => { console.error(error) });
            } else {
                createEmployee(employee)
                    .then(() => {
                        console.log("✅ Employee created! Navigating to /employees...");
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error("❌ Error creating employee:", error);
                    });
            }
        }
    }

    function validate() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function handleDelete() {
        if (id) {
            deleteEmployee(id)
                .then(() => {
                    alert("Employee deleted successfully!");
                    navigator('/employees');
                })
                .catch(error => {
                    console.error("❌ Error deleting employee:", error);
                });
        }
    }

    function pageTitle() {
        return <h2 className='text-center'>{id ? "Update Employee" : "Add Employee"}</h2>;
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    value={firstName}
                                    className='form-control'
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && <div className='text-danger'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className='form-control'
                                    onChange={handleLastName}
                                />
                                {errors.lastName && <div className='text-danger'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    value={email}
                                    className='form-control'
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='text-danger'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

                            {/* Delete Button (conditionally rendered) */}
                            {id && (
                                <button
                                    type='button'
                                    className='btn btn-danger ml-5 mr-5'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeeComponent;
