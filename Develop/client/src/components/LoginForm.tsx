import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useMutation hook for LOGIN_USER
  const [loginUser, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your login!
      </Alert>
      {error && (
        <Alert variant="danger">
          {error.message}
        </Alert>
      )}
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email address"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email || ''}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password || ''}
          required
        />
      </Form.Group>
      <Button disabled={!(userFormData.email && userFormData.password)} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;