import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Tag,
  Select,
  Card,
  Row,
  Col,
  message,
  Popconfirm,
  Modal,
} from "antd";

import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ================= FORMAT GUESTS ================= */
const formatGuests = (guests) => {
  if (!guests || guests.length === 0) return "-";
  return guests.map((g) => (typeof g === "string" ? g : "Unnamed")).join(", ");
};

/* ================= ADMIN DASHBOARD ================= */
const AdminDashboard = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");

  const [rsvps, setRsvps] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState(null);

  /* ================= FETCH RSVPS ================= */
  const fetchRsvps = async () => {
    try {
      const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ceremony: d.ceremony || {},
          message: d.message || "-",
          createdAt: d.createdAt || null,
        };
      });

      setRsvps(data);
    } catch (error) {
      message.error("Failed to fetch RSVPs");
    }
  };

  useEffect(() => {
    if (isAuth) fetchRsvps();
  }, [isAuth]);

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    if (password === "eb28!") {
      setIsAuth(true);
      message.success("Login successful");
    } else {
      message.error("Wrong password");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      message.success("Deleted successfully");
      fetchRsvps();
    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= VIEW ================= */
  const handleViewDetails = (rsvp) => {
    setSelectedRsvp(rsvp);
    setModalVisible(true);
  };

  /* ================= EXPORT ================= */
  const exportExcel = () => {
    const wsData = rsvps.map((rsvp) => ({
      Name: rsvp.ceremony.guestName || "-",
      Attending: rsvp.ceremony.attending === "yes" ? "Yes" : "No",
      Guests: formatGuests(rsvp.ceremony.guests),
      GuestCount: rsvp.ceremony.guests?.length || 0,
      Kids: rsvp.ceremony.kids || 0,
      Dietary: rsvp.ceremony.dietary?.join(", ") || "-",
      Allergies: rsvp.ceremony.allergiesNote || "-",
      Message: rsvp.message || "-",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer]);
    saveAs(blob, "RSVP_List.xlsx");
  };

  /* ================= FILTER ================= */
  const filteredData = rsvps.filter((r) => {
    const ceremony = r.ceremony || {};

    const matchesFilter =
      filter === "all" || ceremony.attending === filter;

    const matchesSearch = (ceremony.guests || [])
      .concat(ceremony.guestName || "")
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Guest Name",
      dataIndex: ["ceremony", "guestName"],
      key: "guestName",
      render: (text) => text || "-",
    },
    {
      title: "Guests",
      render: (_, record) => formatGuests(record.ceremony.guests),
    },
    {
      title: "Attendance",
      render: (_, record) =>
        record.ceremony.attending === "yes" ? (
          <Tag color="green">Attending</Tag>
        ) : (
          <Tag color="red">No</Tag>
        ),
    },
    {
      title: "Guest Count",
      render: (_, record) => record.ceremony.guests?.length || 0,
    },
    {
      title: "Kids",
      render: (_, record) => record.ceremony.kids || 0,
    },
    {
      title: "Dietary",
      render: (_, record) => record.ceremony.dietary?.join(", ") || "-",
    },
    {
      title: "Message",
      dataIndex: "message",
      responsive: ["md"],
    },
    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 6 }}>
          <Button size="small" onClick={() => handleViewDetails(record)}>
            View
          </Button>
          <Popconfirm
            title="Delete RSVP?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  /* ================= LOGIN SCREEN ================= */
  if (!isAuth) {
    return (
      <div style={styles.wrapper}>
        <Card title="Admin Login" style={styles.card}>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div style={styles.container}>
      {/* FILTER AREA */}
      <Row gutter={[10, 10]} style={{ marginBottom: 15 }}>
        <Col xs={24} sm={12} md={6}>
          <Select value={filter} onChange={setFilter} style={{ width: "100%" }}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="yes">Attending</Select.Option>
            <Select.Option value="no">Not Attending</Select.Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search Guest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col xs={24} sm={24} md={6}>
          <Button type="primary" block onClick={exportExcel}>
            Export Excel
          </Button>
        </Col>
      </Row>

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </div>

      {/* MODAL */}
      <Modal
        open={modalVisible}
        title="RSVP Details"
        onCancel={() => setModalVisible(false)}
        width={350}
        footer={[
          <Button key="close" type="primary" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRsvp && (
          <>
            <p>
              <b>Name:</b> {selectedRsvp.ceremony.guestName || "-"}
            </p>
            <p>
              <b>Attending:</b> {selectedRsvp.ceremony.attending === "yes" ? "Yes" : "No"}
            </p>
            <p>
              <b>Guests:</b> {formatGuests(selectedRsvp.ceremony.guests)}
            </p>
            <p>
              <b>Kids:</b> {selectedRsvp.ceremony.kids || 0}
            </p>
            <p>
              <b>Dietary:</b> {selectedRsvp.ceremony.dietary?.join(", ") || "-"}
            </p>
            <p>
              <b>Allergies:</b> {selectedRsvp.ceremony.allergiesNote || "-"}
            </p>
            <p>
              <b>Message:</b> {selectedRsvp.message || "-"}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: 15,
    maxWidth: 1200,
    margin: "auto",
  },
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: 15,
  },
  card: {
    width: "100%",
    maxWidth: 350,
  },
};