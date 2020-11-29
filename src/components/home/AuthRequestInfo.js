import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const AuthRequestInfo = () => {
  const { loading, errorMessage, successMessage } = useContext(UserContext);

  const caption = () =>
    loading
      ? 'Loading...'
      : errorMessage
      ? errorMessage
      : successMessage
      ? successMessage
      : '';

  const captionClass = () =>
    loading ? '' : errorMessage ? 'text-danger' : 'text-success';

  return <Form.Text className={captionClass()}>{caption()}</Form.Text>;
};

export default AuthRequestInfo;
