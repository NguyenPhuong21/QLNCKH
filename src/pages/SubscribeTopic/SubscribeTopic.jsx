import React, { useId, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import AddStudent from "./AddStudent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SubscribeTopic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const key = useId();
  const [form] = Form.useForm();
  const [students, setStudents] = useState([{ id: 1, name: "", msv: "" }]);
  const [value, setValue] = useState("");

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteStudent = (id) => {
    setStudents((stds) => {
      const result = stds.filter((s, i) => s.id != id);
      return result;
    });
  };
  return (
    <>
      <div className="heading">Đăng kí đề tài</div>
      <Form layout="vertical">
        <Form.Item label="Tên đề tài">
          <Input />
        </Form.Item>
        {/* <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
          Thêm thành viên
        </Button> */}
        <Form.Item label="Mã số sinh viên">
          <Input />
        </Form.Item>
        <Form.Item label="Giảng viên hướng dẫn">
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </Form.Item>

        <Modal
          title="Thành viên nhóm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {students &&
            students.map((s, index) => (
              <AddStudent
                key={key + index}
                id={s.id}
                lastId={students.length}
                setStudentList={setStudents}
                deleteStd={deleteStudent}
              />
            ))}
        </Modal>
      </Form>
    </>
  );
};

export default SubscribeTopic;
