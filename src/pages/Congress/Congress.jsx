import React, { useState } from "react";
import { Steps } from "antd";
const items = [
  {
    title: "Đề xuất",
  },
  {
    title: "Đăng kí",
  },
  {
    title: "Nghiệm thu cấp bộ môn",
  },
  {
    title: "Nghiệm thu cấp khoa",
  },
  {
    title: "báo cáo cấp trường",
  },
  {
    title: "Kết thúc",
  },
];

const details = [
  {
    title: "giai đoạn Đề xuất",
    dateTime: "Từ 20/04/2023 đến 28/04/2023",
    dicription:
      "Giai đoạn nghiên cứu khoa học sinh viên là một phần quan trọng trong hành trình học tập và phát triển nghề nghiệp của sinh viên đại học. Trong giai đoạn này, sinh viên có cơ hội thực hiện các dự án nghiên cứu độc lập hoặc tham gia vào các dự án nghiên cứu được hướng dẫn bởi giảng viên và chuyên gia trong lĩnh vực.",
    file: "file",
  },
  {
    title: "giai đoạn Đăng kí",
    dateTime: "Từ 4/05/2023 đến 12/05/2023",
    dicription:
      "Giai đoạn đăng kí đề tài là bước quan trọng tiếp theo sau giai đoạn nghiên cứu khoa học sinh viên. Trong giai đoạn này, sinh viên sẽ chọn và đăng kí đề tài nghiên cứu cụ thể mà họ muốn thực hiện dưới sự hướng dẫn của giảng viên hoặc người hướng dẫn nghiên cứu.",
    file: "file",
  },
  {
    title: "giai đoạn Nghiệm thu cấp bộ môn",
    dateTime: "Từ 28/05/2023 đến 28/06/2023",
    dicription:
      "Sau khi hoàn thành giai đoạn nghiên cứu và đăng kí đề tài, sinh viên sẽ chuyển tới giai đoạn nghiệm thu cấp bộ môn. Giai đoạn này là quá trình kiểm tra, đánh giá và chấp nhận dự án nghiên cứu của sinh viên bởi bộ môn hoặc ban chủ nhiệm khoa.",
    file: "file",
  },
  {
    title: "giai đoạn Nghiệm thu cấp khoa",
    dateTime: "Từ 5/06/2023 đến 7/06/2023",
    dicription:
      "Sau khi hoàn thành giai đoạn nghiệm thu cấp bộ môn, sinh viên có thể tiến hành giai đoạn nghiệm thu cấp khoa. Giai đoạn này là bước quan trọng để đánh giá dự án nghiên cứu của sinh viên từ phía toàn khoa hoặc bộ môn.",
    file: "file",
  },
  {
    title: "giai đoạn báo cáo cấp trường",
    dateTime: "Từ 8/06/2023 đến 10/06/2023",
    dicription:
      "Sau khi hoàn thành giai đoạn nghiệm thu cấp khoa, sinh viên có thể tiến hành giai đoạn báo cáo cấp trường. Giai đoạn này là bước cuối cùng trong quá trình nghiên cứu và đánh giá dự án nghiên cứu của sinh viên từ phía toàn trường.",
    file: "file",
  },
  {
    title: "giai đoạn Kết thúc",
    dateTime: "10/06/2023",
    dicription:
      "Giai đoạn kết thúc dự án nghiên cứu là giai đoạn cuối cùng trong quá trình học tập và thực hiện dự án nghiên cứu khoa học. Đây là thời điểm mà sinh viên đánh giá và tổng kết toàn bộ hành trình nghiên cứu của mình, cũng như trình bày kết quả và học hỏi từ dự án. ",
    file: "file",
  },
];
const Congress = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };
  const handleDownload = () => {
    // Add the URL of the DOCX file you want users to download
    const docxFileUrl = "C:/Users/phuon/Downloads/Đồ án tốt nghiệp.docx";
    window.location.href = docxFileUrl;
    console.log(docxFileUrl);
  };
  return (
    <>
      <div className="heading">Giao diện đại hội</div>
      <div style={{ padding: 20, border: "1px solid #ccc" }}>
        <p style={{ fontWeight: 500, marginBottom: 24, fontSize: 20 }}>
          Sự kiện đang diễn ra
        </p>
        <Steps
          current={current}
          onChange={onChange}
          labelPlacement="vertical"
          items={items}
        />
        <p style={{ margin: 24 }}>Chi tiết giai đoạn</p>
        <div style={{ display: "flex", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 400,
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            <p>Giai đoạn: </p>
            <p>Thời gian thực hiện:</p>
            <p>Tóm tắt chung</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 15,
            }}
          >
            <p>{details[current].title} </p>
            <p>{details[current].dateTime}</p>
            <p>{details[current].dicription}</p>
            <a href={""} target="_blank" download>
              Tài liệu đính kèm
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congress;
