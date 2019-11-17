import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { ScanResultFormData } from '../models/ScanResultFormData';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const validateJson = (rule: any, value: any) => {
  try {
    const result = JSON.parse(value);
    return !!result;
  } catch (error) {
    return false;
  }
}

interface Props extends FormComponentProps<ScanResultFormData> {
  onSubmit: (values: ScanResultFormData) => void;
}

const CreateScanResultFormComponent: React.FC<Props> = (props) => {
  const { form, onSubmit } = props;
  const { getFieldDecorator, getFieldsError, validateFields } = form;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateFields((error, values) => {
      if (!error) {
        onSubmit(values);
      }
    });
  };

  const renderSubmitButton = () => {
    return (
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Save
        </Button>
      </Form.Item>
    )
  }

  const renderNameInput = () => {
    return (
      <Form.Item label="Repository Name">
        {getFieldDecorator('repositoryName', {
          rules: [{ required: true, message: 'Please input the name!', whitespace: true }],
        })(<Input />)}
      </Form.Item>
    )
  }

  const renderFindingsInput = () => {
    return (
      <Form.Item label="Findings">
        {getFieldDecorator('findings', {
          rules: [{ required: true, message: 'Please paste findings Data!', whitespace: true, validator: validateJson, }],
        })(<Input />)}
      </Form.Item>
    )
  }

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      {renderNameInput()}
      {renderFindingsInput()}
      {renderSubmitButton()}
    </Form>
  )
};

const CreateScanResultForm = Form.create<Props>({ name: 'Create Scan Result' })(CreateScanResultFormComponent);

export default CreateScanResultForm;
