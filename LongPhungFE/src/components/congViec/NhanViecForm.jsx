import { Tabs, Badge } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import NhanCV from "./NhanCV";
import DaNhanCV from "./DaNhanCV";
import DuyetCV from "./DuyetCV";
import HoanThanhCV from "./HoanThanhCV";
import { API_SOCKET } from "../../services/constans";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import DonHangService from "../../services/DonHangService";

const NhanViecForm = () => {
  const stompClient = useRef(null);
  const service = new DonHangService();

  const tacVu = localStorage.getItem("tacVu");

  const [check, setCheck] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [listNhan, setListNhan] = useState([]);
  const [listDaNhan, setListDaNhan] = useState([]);
  const [listDuyet, setListDuyet] = useState([]);
  const [listHoanThanh, setListHoanThanh] = useState([]);

  const [newTaskCompleted, setNewTaskCompleted] = useState(0);
  const [newTask, setNewTask] = useState(0);
  const [newTaskNhan, setNewTaskNhan] = useState(0);
  const [newTaskDuyet, setNewTaskDuyet] = useState(0);

  const [fileUp, setFileUp] = useState({});
  const [idDon, setIdDon] = useState();

  const maNV =  localStorage.getItem("maNV")

  

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");

        // Nhận danh sách công việc có thể nhận
        stompClient.current.subscribe("/topic/jobs/"+ tacVu, (message) => {
          const newJobs = JSON.parse(message.body);
          setListNhan((prevJobs) => {
            if (JSON.stringify(prevJobs) !== JSON.stringify(newJobs)) {
              setNewTask(newJobs.length);
              return newJobs;
            }
            return prevJobs; // Không cập nhật nếu dữ liệu không đổi
          });
        });

        // Nhận danh sách công việc đã nhận
        stompClient.current.subscribe("/topic/jobsNhan/" + maNV, (message) => {
          const newJobs = JSON.parse(message.body);
          setListDaNhan((prevJobs) => {
            if (JSON.stringify(prevJobs) !== JSON.stringify(newJobs)) {
              setNewTaskNhan(newJobs.length);
              return newJobs;
            }
            return prevJobs; // Không cập nhật nếu dữ liệu không đổi
          });
        });

        // Nhận danh sách công việc đang duyệt
        stompClient.current.subscribe("/topic/jobsduyet/" + maNV, (message) => {
          const newJobs = JSON.parse(message.body);
          setListDuyet((prevJobs) => {
            if (JSON.stringify(prevJobs) !== JSON.stringify(newJobs)) {
              setNewTaskDuyet(newJobs.length);
              return newJobs;
            }
            return prevJobs; // Không cập nhật nếu dữ liệu không đổi
          });
        });

        // Nhận danh sách công việc đã hoàn thành
        stompClient.current.subscribe(
          "/topic/jobshoanthanhtk/" + maNV,
          (message) => {
            const newData = JSON.parse(message.body);

            setListHoanThanh((prevList) => {
              const newItems = newData.filter(
                (newItem) => !prevList.some((item) => item.id === newItem.id)
              );

              if (newItems.length > 0) {
                setNewTaskCompleted((prev) => prev + newItems.length);
                return [...newItems, ...prevList]; // Dữ liệu mới lên đầu
              }

              return prevList;
            });
          }
        );

        // Yêu cầu dữ liệu ban đầu từ server
       
        sendTacVuData()
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  useEffect(() => {
    sendTacVuData();
  }, [tacVu]);

  console.log(listNhan);
  console.log(listDaNhan);
  console.log(listDuyet);
  console.log(listHoanThanh);
  
  
  // 3. Hàm gửi dữ liệu theo tacVu
  const sendTacVuData = () => {
    if (stompClient.current && stompClient.current.connected && tacVu) {
      stompClient.current.publish({
        destination: "/app/getJobs",
        body: tacVu,
      });
      stompClient.current.publish({
        destination: "/app/getJobsNhan",
        body: maNV,
      });
      stompClient.current.publish({
        destination: "/app/getJobsDuyet",
        body: maNV,
      });
      stompClient.current.publish({
        destination: "/app/getJobsTKHoanThanh",
        body: maNV,
      });
    }
  };

  const handleTabClick = (key) => {
    if (key === "4") {
      setNewTaskCompleted(0); // Reset badge khi chuyển sang tab "Việc đã hoàn thành"
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNhanViec = (id) => {
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/nhan",
        body: JSON.stringify({ id, maNV, tacVu }),
      });
      toast.success("Bạn đã nhận việc thành công!");
    }
  };

  useEffect(() => {
    if (isUpload && fileUp && idDon) {
      handleNopViec(idDon); // Gọi handleNopViec tự động
    }
  }, [isUpload, fileUp, idDon]);

  const handleNopViec = (id) => {
    setIdDon(id);
    if(tacVu === "THIET_KE"){
      if (!fileUp || Object.keys(fileUp).length === 0) {
        toast.warning("Gửi file để nộp", { position: "top-center" });
        showModal();
        return;
      }
  
      service.updateDonCT(id, fileUp);
      
      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/noptk",
          body: JSON.stringify({id, maNV, tacVu}),
        });
        handleCancel();
      }
      setIsUpload(false);
      setIdDon();
      setFileUp({});
      return
    }

    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/nopcv",
        body: JSON.stringify({id, maNV, tacVu}),
      });
      handleCancel();
    }
  };


  const items = [
    {
      key: "1",
      closable: false,
      icon: <IoBriefcaseOutline />,
      label: (
        <span>
          Việc có thể nhận{" "}
          {newTask > 0 && (
            <Badge count={newTask} overflowCount={99} status="default" />
          )}
        </span>
      ),
      children: <NhanCV listNhan={listNhan} handleNhanViec={handleNhanViec} />,
    },
    {
      key: "2",
      closable: false,
      icon: <CiInboxIn />,
      label: (
        <span>
          Việc đã nhận{" "}
          {newTaskNhan > 0 && (
            <Badge count={newTaskNhan} overflowCount={99} status="processing" />
          )}
        </span>
      ),
      children: (
        <DaNhanCV
          listDaNhan={listDaNhan}
          handleNopViec={handleNopViec}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          setIsUpload={setIsUpload}
          setFileUp={setFileUp}
        />
      ),
    },
    tacVu === "THIET_KE" &&{
      key: "3",
      closable: false,
      icon: <CiClock2 />,
      label: (
        <span>
          Việc đang duyệt{" "}
          {newTaskDuyet > 0 && (
            <Badge count={newTaskDuyet} overflowCount={99} status="warning" />
          )}
        </span>
      ),

      children: <DuyetCV listDuyet={listDuyet} />,
    },
    {
      key: "4",
      closable: false,
      icon: <FiCheckCircle />,
      label: "Việc đã hoàn thành",
      badge:
        newTaskCompleted > 0 ? (
          <Badge count={newTaskCompleted} status="success" />
        ) : null,
      children: <HoanThanhCV listHoanThanh={listHoanThanh} />,
    },
  ];

  return (
    <Tabs
      type="card"
      defaultActiveKey="1"
      items={items}
      onTabClick={handleTabClick}
    />
  );
};

export default NhanViecForm;
