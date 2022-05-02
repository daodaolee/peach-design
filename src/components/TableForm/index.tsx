import React from 'react'
import './index.less'
import { Row, Col, Form, Button, Input, Select, DatePicker } from 'antd'
const { Option } = Select,
  { RangePicker } = DatePicker

function TableForm(prop:any) {
  const [form] = Form.useForm(),
    data = [
      {
        label: '输入框',
        type: 'input',
        placeholder: '请输入',
        field: 'in1'
      },
      {
        label: '输入框',
        type: 'input',
        placeholder: '请输入',
        field: 'in2'
      },
      {
        label: '下拉框',
        type: 'select',
        field: 'se1'
      },
      {
        label: '日期选择框',
        type: 'datePicker',
        field: 'd1'
      },
      {
        label: '日期范围框',
        type: 'rangePicker',
        field: 'r1'
      }
    ],
    searchHandle = (values: any) => {
      prop.getFormData(values)
    }

  return (
    <div className="tableform">
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={searchHandle}>
        <Row gutter={24}>
          {data.map((item, index) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index}>
              {item.type === 'input' ? (
                <Form.Item label={item.label} shouldUpdate name={item.field}>
                  <Input placeholder="请输入" />
                </Form.Item>
              ) : item.type === 'select' ? (
                <Form.Item label={item.label} shouldUpdate name={item.field}>
                  <Select placeholder="请选择">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>
                </Form.Item>
              ) : item.type === 'datePicker' ? (
                <Form.Item label={item.label} shouldUpdate name={item.field}>
                  <DatePicker className="w100" />
                </Form.Item>
              ) : (
                <Form.Item label={item.label} shouldUpdate name={item.field}>
                  <RangePicker className="w100" />
                </Form.Item>
              )}
            </Col>
          ))}
          <Col xs={24} sm={24} md={12} lg={8} xl={6} className="searchBtn">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default TableForm
