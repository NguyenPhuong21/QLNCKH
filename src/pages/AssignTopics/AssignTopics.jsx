import React from 'react'
import { Popconfirm, Table, Image } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, CheckOutlined } from '@ant-design/icons';
import CustomButton from "../../components/CustomButton";
import { deleteIcon } from "../../assets";
import { editIcon } from "../../assets";
import { listWorkIcon } from "../../assets";

const AssignTopics = () => {
  
  const dataSource = [
    {
      name: 'Đề tài nghiên cứu về nấm độc',
      code: '1921050467',
      instructors: 'Đinh Bảo Ngọc',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Sản xuất đồ bảo hộ y tế tự hủy',
      code: '1921050467',
      instructors: 'Nông Thị Oanh',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứu về nấm độc',
      code: '1921050467',
      instructors: 'Đinh Bảo Ngọc',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứu về nấm độc',
      code: '1921050467',
      instructors: 'Đinh Bảo Ngọc',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứu về nấm độc',
      code: '1921050467',
      instructors: 'Đinh Bảo Ngọc',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứu về nấm độc',
      code: '1921050467',
      instructors: 'Đinh Bảo Ngọc',
      status:'Đang chờ duyệt'
    },
    {
      name: 'Đề tài nghiên cứ ứng dụng AI vào thăm khám chữa bệnh',
      code: '1921050437',
      instructors: 'Nguyễn Duy Huy',
      status:'Đang chờ duyệt'
    },
  ];
  
  const columns = [
    {
      title: 'Tên đề tài',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Giáo viên hướng dẫn',
      dataIndex: 'instructors',
      key: 'instructors',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: "center",
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      align: "center",
      render: (_, record) => {
        return (
          <div className="default-flex">
              <>
              <Popconfirm
                  title="Phân công"
                  // description={`Xác nhận thanh toán nạp tiền`}
                  icon={<CheckOutlined  style={{ color: "green" }} />}
                  // onConfirm={() => handleAprrovePaymentOrders(record.key)}
                >
                  <CustomButton
                    type="text"
                    icon={<Image width={24} src={listWorkIcon} preview={false} />}
                  />
                </Popconfirm>
                <Popconfirm
                  title="Chỉnh sửa"
                  // description={`Xác nhận thanh toán nạp tiền`}
                  icon={<CheckCircleOutlined style={{ color: "green" }} />}
                  // onConfirm={() => handleAprrovePaymentOrders(record.key)}
                >
                  <CustomButton
                    type="text"
                    icon={<Image width={24} src={editIcon} preview={false} />}
                  />
                </Popconfirm>

                <Popconfirm
                  title="Xóa"
                  // description={`Xác nhận từ chối thanh toán nạp tiền:`}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  // onConfirm={() => handleRefusePaymentOrders(record.key)}
                >
                  <CustomButton
                    type="text"
                    icon={<Image width={24} src={deleteIcon} preview={false} />}
                  />
                </Popconfirm>
              </>
          </div>
        );
     }
    }
  ];

  return (
    <>
       <div className="heading">Danh sách đề tài</div>
       <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }}  scroll={{ y: 540 }}/>;
    </>
  )
}

export default AssignTopics
