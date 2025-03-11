import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// ✅ Define a separate type for form data (instead of importing from Mongoose model)
interface UserFormData {
  username: string;
  email: string;
  password: string;
}

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  // ✅ Initialize form state with empty strings to prevent null issues
  const [userFormData, setUserFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
  });
  
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useMutation hook for ADD_USER
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
      handleModalClose();
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your signup!
      </Alert>
      {error && (
        <Alert variant="danger">
          {error.message}
        </Alert>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username ?? ''} // ✅ Ensures value is always a string
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email address"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email ?? ''} // ✅ Prevents `null` issues
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password ?? ''} // ✅ Prevents `null` issues
          required
        />
      </Form.Group>
      <Button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
