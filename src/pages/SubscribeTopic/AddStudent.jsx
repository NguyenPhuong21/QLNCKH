import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

function AddStudent({ setStudentList, id, lastId, deleteStd }) {
  
  const [student] = useState({ id: ++id, name: "", msv: "" });
  const [name,SetName] = useState("");
  const [msv,SetMsv] = useState("");
  const handleChangeName = (e) => {
    SetName(e.target.value)
    setStudentList((prev) => {
      const std = prev.find((s, i) => s.id === (id-1));
      if (std) {
        std.name = e.target.value;
        return [...prev];
      }
    });
  };
  const handleChangeId = (e, id) => {
    SetMsv(e.target.value)
    setStudentList((prev) => {
      const std = prev.find((s, i) => s.id === (id-1));
      if (std) {
        std.msv = e.target.value;
        return [...prev];
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Form.Item
          name={`TenThanhVien${id}`}
          label="Tên thành viên"
          rules={[
            {
              required: true,
              message: " Vui lòng nhập vào tên thành viên",
            },
          ]}
        >
          <Input value={student.name} onChange={handleChangeName} />
        </Form.Item>
      </div>
      <div style={{ width: "100%" }}>
        <Form.Item
          name={`MaSoSinhVien${id}`}
          label="Mã số sinh viên"
          rules={[
            {
              required: true,
              message: " Vui lòng nhập vào mã số sinh viên",
            },
          ]}
        >
          <Input value={student.id} onChange={(e) => handleChangeId(e, id)} />
        </Form.Item>
      </div>
      {lastId === (id-1)  && name !=""&& msv !="" &&  (
        <Button
          onClick={() => setStudentList((std) => [...std, student])}
          type="primary"
        >
          +
        </Button>
      )}
      <Button type="primary" danger onClick={() => deleteStd(id-1)}>
        x
      </Button>
    </div>
  );
}

export default AddStudent;
