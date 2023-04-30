import React, { useState } from 'react';
import Select from 'react-select';

const Update = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    const roleOptions = [
        { value: 'MANAGER', label: 'Manager' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' }
    ];

    const handleRoleChange = (selectedOptions) => {
        const roles = selectedOptions.map((option) => ({ role: option.value }));
        setRoles(roles);
        setSelectedRoles(selectedOptions);
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (roles.length === 0) {
            setFormError(true);
            return;
        }
        const postData = {
            username:username,
            email:email,
            contactNo:contactNo,
            roles:roles,
        }
        console.log(postData)
        // axios.post('/api/endpoint', formData)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
        setFormSubmitted(true);
        setFormSuccess(true);
    };

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="contactNo">Contact No:</label>
            <input
                type="tel"
                id="contactNo"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="role">Role:</label>
            <Select
                id="role"
                options={roleOptions}
                isClearable
                isMulti
                value={selectedRoles}
                onChange={handleRoleChange}
            />
        </div>
        <div>
            <label>Roles:</label>
            <ul>
                {roles.map((role, index) => (
                    <li key={index}>{role.role}</li>
                ))}
            </ul>
        </div>
        {formError && <p>Please add at least one role.</p>}
        <button type="submit">Submit</button>
    </form>
    {formSubmitted && formSuccess && <p>Form submitted successfully!</p>}
</div>
  )
}

export default Update