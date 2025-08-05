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
import { useNavigate } from "react-router-dom";

const NhanViecForm = () => {
  const stompClient = useRef(null);
  const navigate = useNavigate();

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

  const maNV = localStorage.getItem("maNV");

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    socket.onclose = (e) => {
      console.error("SockJS closed", e);
      if (e?.status === 403 || e?.code === 1002) {
        navigate("/login"); // Chuyển hướng nếu bị lỗi 403
      }
    };

    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");

        // Nhận danh sách công việc có thể nhận
        stompClient.current.subscribe("/topic/jobs", (message) => {
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

        stompClient.current.subscribe(
          `/topic/error/chia-don/${maNV}`,
          (message) => {
            try {
              const data = JSON.parse(message.body);
              toast.error(data.error || "Lỗi chia việc!", {
                position: "top-center",
              });
            } catch (e) {
              toast.error("Lỗi định dạng phản hồi từ server", {
                position: "top-center",
              });
            }
          }
        );
        stompClient.current.subscribe(
          `/topic/success/chia-don/${maNV}`,
          (message) => {
            toast.success(message.body || "Bạn đã chia việc thành công!", {
              position: "top-center",
            });
          }
        );

        // Yêu cầu dữ liệu ban đầu từ server

        sendTacVuData();
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame);
        if (frame.headers["message"]?.includes("403")) {
          navigate("/login"); // hoặc navigate("/login") nếu dùng react-router
        }
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error", error);
        if (error?.message?.includes("403")) {
          navigate("/login");
        }
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);


  // 3. Hàm gửi dữ liệu theo tacVu
  const sendTacVuData = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: "/app/getJobs",
        
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

  const handleNhanViec = (data) => {
    const id = data.id || data; // Lấy id từ data
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/nhan",
        body: JSON.stringify({ id, maNV}),
      });
      toast.success("Bạn đã nhận việc thành công!");
    }
  };

  console.log("listNhan:", listNhan);
  console.log("listDaNhan:", listDaNhan);
  console.log("listDuyet:", listDuyet);
  console.log("listHoanThanh:", listHoanThanh);
  

  useEffect(() => {
    if (isUpload && fileUp && idDon) {
      handleNopViec(idDon); // Gọi handleNopViec tự động
    }
  }, [isUpload, fileUp, idDon]);

  const handleNopViec = (data) => {
    console.log("handleNopViec called with data:", data);
    const id = data.id || data;
    const tacVu = data.tacVu || "THIET_KE" // Lấy id từ data
    setIdDon(id);
    if (tacVu === "THIET_KE") {
      if (!fileUp || Object.keys(fileUp).length === 0) {
        toast.warning("Gửi file để nộp", { position: "top-center" });
        showModal();
        return;
      }
      console.log("id nop viec:", id);

      console.log("File to upload:", fileUp);

      const data = { id, maNV, file: fileUp.id };
      console.log("Data to handleNopViec:", data);

      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/noptk",
          body: JSON.stringify(data),
        });
        handleCancel();
      }
      setIsUpload(false);
      setIdDon();
      setFileUp({});
      return;
    }

    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/nopcv",
        body: JSON.stringify({ id, maNV }),
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
      children: (
        <NhanCV
          listNhan={listNhan}
          handleNhanViec={handleNhanViec}
        />
      ),
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
    {
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
