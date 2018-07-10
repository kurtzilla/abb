import * as React from 'react';
import { Form as AntForm, Icon, Button } from 'antd';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { Link } from 'react-router-dom';

import { InputField } from '../../shared/InputField';
import { NormalizedErrorMap } from '@abb/controller';

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>
          <Field
            name="email"
            prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Email"
            component={InputField}
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              reset password
            </Button>
          </FormItem>
          <FormItem>
            <Link to="/register">register</Link>
          </FormItem>
          <FormItem>
            <Link to="/login">login</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
