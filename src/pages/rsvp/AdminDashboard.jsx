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

  return guests
    .map((g) => (typeof g === "string" ? g : "Unnamed"))
    .join(", ");
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) fetchRsvps();
  }, [isAuth]);

  /* ================= LOGIN ================= */

  const handleLogin = () => {
    if (password === "2000") {
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
    } catch (error) {
      message.error("Delete failed");
    }
  };

  /* ================= VIEW DETAILS ================= */

  const handleViewDetails = (rsvp) => {
    setSelectedRsvp(rsvp);
    setModalVisible(true);
  };

  /* ================= EXPORT EXCEL ================= */

  const exportExcel = () => {
    const wsData = rsvps.map((rsvp) => ({
      Attending:
        rsvp.ceremony.attending === "yes" ? "Yes" : "No",

      Guests: formatGuests(rsvp.ceremony.guests),

      GuestCount:
        rsvp.ceremony.guests?.length || 0,

      Kids:
        rsvp.ceremony.kids || 0,

      Dietary:
        rsvp.ceremony.dietary?.join(", ") || "-",

      Allergies:
        rsvp.ceremony.allergiesNote || "-",

      Message:
        rsvp.message || "-",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([buffer]);

    saveAs(blob, "RSVP_List.xlsx");
  };

  /* ================= FILTER + SEARCH ================= */

  const filteredData = rsvps.filter((r) => {

    const ceremony = r.ceremony || {};

    const matchesFilter =
      filter === "all" ||
      ceremony.attending === filter;

    const matchesSearch =
      (ceremony.guests || [])
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /* ================= TABLE ================= */

  const columns = [

    {
      title: "Guests",
      render: (_, record) =>
        formatGuests(record.ceremony.guests),
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
      render: (_, record) =>
        record.ceremony.guests?.length || 0,
    },

    {
      title: "Kids",
      render: (_, record) =>
        record.ceremony.kids || 0,
    },

    {
      title: "Dietary",
      render: (_, record) =>
        record.ceremony.dietary?.join(", ") || "-",
    },

    {
      title: "Message",
      dataIndex: "message",
    },

    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => handleViewDetails(record)}>
            View
          </Button>

          <Popconfirm
            title="Delete RSVP?"
            onConfirm={() =>
              handleDelete(record.id)
            }
          >
            <Button danger>
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
            onChange={(e) =>
              setPassword(e.target.value)
            }
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
    <div style={{ padding: 20 }}>

      <Row gutter={16} style={{ marginBottom: 20 }}>

        <Col>
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 200 }}
          >
            <Select.Option value="all">
              All
            </Select.Option>

            <Select.Option value="yes">
              Attending
            </Select.Option>

            <Select.Option value="no">
              Not Attending
            </Select.Option>

          </Select>
        </Col>

        <Col>
          <Input
            placeholder="Search Guest"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </Col>

        <Col>
          <Button
            type="primary"
            onClick={exportExcel}
          >
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
        title="RSVP Details"
        onCancel={() =>
          setModalVisible(false)
        }
        footer={[
          <Button
            type="primary"
            onClick={() =>
              setModalVisible(false)
            }
          >
            Close
          </Button>,
        ]}
      >

        {selectedRsvp && (

          <>

            <p>
              <b>Attending:</b>{" "}
              {selectedRsvp.ceremony.attending}
            </p>

            <p>
              <b>Guests:</b>{" "}
              {formatGuests(
                selectedRsvp.ceremony.guests
              )}
            </p>

            <p>
              <b>Kids:</b>{" "}
              {selectedRsvp.ceremony.kids}
            </p>

            <p>
              <b>Dietary:</b>{" "}
              {selectedRsvp.ceremony.dietary?.join(
                ", "
              )}
            </p>

            <p>
              <b>Allergies:</b>{" "}
              {selectedRsvp.ceremony.allergiesNote ||
                "-"}
            </p>

            <p>
              <b>Message:</b>{" "}
              {selectedRsvp.message}
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

  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },

  card: {
    width: 350,
  },

};