import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Select, Slider, Badge, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCategory } from '../../service/category';
import { getEnrollment, updateStatus } from '../../service/Erollment';

function Enrollment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleFormSubmit = (values) => {
    console.log('Form Values:', values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleStatusSubmit = (values) => {
    updateStatus(selectedEnrollment.id, values.status, token).then(() => {
      if (true) {
        setRefresh((prev) => prev + 1);
      }
    });
    setIsStatusModalOpen(false);
    statusForm.resetFields();
  };

  let currentAdmin = null;
  const storedData = localStorage.getItem('authToken');
  if (storedData) {
    try {
      currentAdmin = JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
  }
  const token = currentAdmin?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollment = await getEnrollment(token);
        const enrollmentWithId = enrollment.content.map(
          (enrollment, index) => ({
            ...enrollment,
            num: index + 1,
          })
        );
        setData(enrollmentWithId);
        const category = await getCategory();
        setDataCategory(category);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    };
    fetchData();
  }, [refresh, token]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
    statusForm.resetFields();
  };

  const handleUpdateStatusClick = (record) => {
    setSelectedEnrollment(record);
    setIsStatusModalOpen(true);
  };

  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return (
          <Badge
            status="success"
            text="Completed"
            style={{ color: '#52c41a' }}
          />
        );
      case 'rejected':
        return (
          <Badge status="error" text="Rejected" style={{ color: '#f5222d' }} />
        );
      case 'pending':
        return (
          <Badge
            status="processing"
            text="Pending"
            style={{ color: '#faad14' }}
          />
        );
      case 'approved':
        return (
          <Badge
            status="warning"
            text="Approved"
            style={{ color: '#1890ff' }}
          />
        );
      case 'withdrawn':
        return (
          <Badge
            status="default"
            text="Withdrawn"
            style={{ color: '#d9d9d9' }}
          />
        );
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'num',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'Student Name',
      dataIndex: 'student',
      render: (student) => student.name,
      sorter: (a, b) => a.student.name.localeCompare(b.student.name),
      width: '15%',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => renderStatusBadge(status),
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <Button
            className="bg-yellow-500 text-white"
            onClick={() => handleUpdateStatusClick(record)}
          >
            Update Status
          </Button>
          <Button className="bg-red-700 text-white">Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 h-full">
      <h2 className="flex justify-center text-4xl text-cyan-600">Enrollment</h2>
      {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Add Class
      </Button> */}

      <Modal
        title="Add New Class"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Courses"
            name="courses"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select placeholder="Select a course">
              {dataCategory.map((category, idx) => (
                <Select.Option value={category.id} key={idx}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of Students"
            name="numberOfStudents"
            rules={[
              { required: true, message: 'Please select number of students' },
            ]}
          >
            <Slider min={1} max={50} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Class
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Status"
        open={isStatusModalOpen}
        onCancel={handleStatusCancel}
        footer={null}
      >
        <Form form={statusForm} onFinish={handleStatusSubmit} layout="vertical">
          <Form.Item
            label="Status"
            name="status"
            initialValue={selectedEnrollment?.status}
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select a status">
              <Select.Option value="COMPLETED">Completed</Select.Option>
              <Select.Option value="REJECTED">Rejected</Select.Option>
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="APPROVED">Approved</Select.Option>
              <Select.Option value="WITHDRAWN">Withdrawn</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Status
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default Enrollment;
