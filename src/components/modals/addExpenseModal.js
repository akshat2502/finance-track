import React from 'react'
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import PropTypes from 'prop-types';

function AddExpenseModal({ isExpenseModalVisible, handleExpenseCancel, onFinish}) {

    const [form]= Form.useForm();

  return (
    <div>
     <Modal 
      open={isExpenseModalVisible} 
      onCancel={handleExpenseCancel} 
      style={{fontWeight: 500}} 
      title="Add Expense" 
      footer={null} >

<Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
        onFinish(values, "expense");
        form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}>
          <Input type="text" className="Custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="Custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker className="Custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[ { required: true, message: "Please select a tag!" } ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="groceries">Groceries</Select.Option>
            <Select.Option value="bills">Bills & Utilities</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit" >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
      </Modal>

    </div>
  )
}

AddExpenseModal.propTypes = {
  isExpenseModalVisible: PropTypes.bool.isRequired,
  handleExpenseCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default AddExpenseModal;