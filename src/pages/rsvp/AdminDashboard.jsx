import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Tag,
  Select,
  Badge,
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

const CEREMONY_NAMES = {
  ceremonyOne: "Sikh Ceremony",
  ceremonyTwo: "Orthodox Ceremony",
};

/* ================= SAFE GUEST FORMATTER ================= */
const formatGuests = (guests) => {
  if (!guests || guests.length === 0) return "-";

  return guests
    .map((g) => {
      // If guest is string (current RSVP form)
      if (typeof g === "string") {
        return g.trim() || "Unnamed Guest";
      }

      // If guest is object (future upgrade support)
      if (typeof g === "object") {
        const first = g?.firstName?.trim() || "";
        const last = g?.lastName?.trim() || "";
        const full = `${first} ${last}`.trim();
        return full || "Unnamed Guest";
      }

      return "Unnamed Guest";
    })
    .join(", ");
};

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
          ceremonies: d.ceremonies || {},
          message: d.message || "-",
          createdAt: d.createdAt || null,
        };
      });

      setRsvps(data);
    } catch (error) {
      message.error("Failed to fetch RSVPs");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuth) fetchRsvps();
  }, [isAuth]);

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    if (password === "jm26") {
      setIsAuth(true);
      message.success("Logged in successfully");
    } else {
      message.error("Incorrect password");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      message.success("RSVP deleted successfully");
      fetchRsvps();
    } catch (error) {
      message.error("Failed to delete RSVP");
      console.error(error);
    }
  };

  /* ================= MODAL ================= */
  const handleViewDetails = (rsvp) => {
    setSelectedRsvp(rsvp);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedRsvp(null);
    setModalVisible(false);
  };

  /* ================= EXCEL EXPORT ================= */
  const exportExcel = () => {
    const wsData = [];

    rsvps.forEach((rsvp) => {
      Object.keys(rsvp.ceremonies).forEach((cerKey) => {
        const cer = rsvp.ceremonies[cerKey];

        wsData.push({
          Ceremony: CEREMONY_NAMES[cerKey] || cerKey,
          Attending: cer.attending === "yes" ? "Yes" : "No",
          Guests: formatGuests(cer.guests),
          GuestCount: cer.guests?.length || 0,
          Message: rsvp.message,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "RSVP_List.xlsx");
  };

  /* ================= FILTER + SEARCH ================= */
  const filteredData = rsvps.filter((r) => {
    const matchesFilter =
      filter === "all" ||
      Object.values(r.ceremonies).some((c) =>
        filter === "yes" ? c.attending === "yes" : c.attending === "no"
      );

    const matchesSearch = Object.values(r.ceremonies)
      .flatMap((c) =>
        (c.guests || []).map((g) => {
          if (typeof g === "string") return g;
          if (typeof g === "object")
            return `${g?.firstName || ""} ${g?.lastName || ""}`;
          return "";
        })
      )
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Ceremony",
      dataIndex: "ceremonies",
      render: (ceremonies) =>
        Object.keys(ceremonies)
          .map((k) => CEREMONY_NAMES[k] || k)
          .join(" | "),
    },
    {
      title: "Guests",
      dataIndex: "ceremonies",
      render: (ceremonies) =>
        Object.values(ceremonies)
          .map((c) => formatGuests(c.guests))
          .join(" | "),
    },
    {
      title: "Attendance",
      dataIndex: "ceremonies",
      render: (ceremonies) =>
        Object.values(ceremonies).map((c, idx) =>
          c.attending === "yes" ? (
            <Tag color="green" key={idx}>
              Attending
            </Tag>
          ) : (
            <Tag color="red" key={idx}>
              Not Attending
            </Tag>
          )
        ),
    },
    {
      title: "Guest Count",
      render: (_, record) =>
        Object.values(record.ceremonies)
          .map((c) => c.guests?.length || 0)
          .join(" | "),
    },
    { title: "Message", dataIndex: "message" },
    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => handleViewDetails(record)}>
            View Details
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this RSVP?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="primary">
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
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Select value={filter} onChange={setFilter} style={{ width: 200 }}>
            <Select.Option value="all">All RSVPs</Select.Option>
            <Select.Option value="yes">Attending</Select.Option>
            <Select.Option value="no">Not Attending</Select.Option>
          </Select>
        </Col>

        <Col>
          <Input
            placeholder="Search by Guest Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col>
          <Button type="primary" onClick={exportExcel}>
            Export Excel
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />

      <Modal
        open={modalVisible}
        title="RSVP Full Details"
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedRsvp &&
          Object.entries(selectedRsvp.ceremonies).map(([cerKey, cer]) => (
            <div key={cerKey} style={{ marginBottom: 12 }}>
              <h4>{CEREMONY_NAMES[cerKey] || cerKey}</h4>
              <p>
                <strong>Attending:</strong>{" "}
                {cer.attending === "yes" ? "Yes" : "No"}
              </p>
              <p>
                <strong>Guest Count:</strong> {cer.guests?.length || 0}
              </p>
              <p>
                <strong>Guests:</strong> {formatGuests(cer.guests)}
              </p>
            </div>
          ))}

        <p>
          <strong>Message:</strong> {selectedRsvp?.message}
        </p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: { width: 360 },
};