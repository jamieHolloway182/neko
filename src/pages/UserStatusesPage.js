import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import { apiPost, apiDelete } from '../api/api';
import { useToast } from '../contexts/ToastContext';
import { DayStatusContext } from '../contexts/DayStatusContext';

const getStatusName = (item) => {
  return item.name || item.status?.name || item.status_name || item.status?.label || `Status ${item.id}`;
};

const getStatusId = (item) => {
  return item.id || item.status?.id || item.status_id || item.user_status_id;
};

const UserStatusesPage = () => {
  const [newStatus, setNewStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addToast } = useToast();
  const { dayStatusDict, statusOptions, setDayStatusDict, loading: dayStatusLoading } = useContext(DayStatusContext);

  const statuses = statusOptions.map((name) => ({
    id: dayStatusDict[name],
    name,
  }));

  const handleCreate = async () => {
    const name = newStatus.trim();
    if (!name) {
      addToast('Please enter a status name', 'danger');
      return;
    }

    setSaving(true);
    try {
      const result = await apiPost('/user-statuses', { name });
      const createdId = result?.id ?? result?.data?.id ?? result?.status?.id;
      if (createdId) {
        setDayStatusDict((prev) => ({ ...prev, [name]: createdId }));
      }
      addToast('User status added');
      setNewStatus('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to create status:', err);
      addToast('Failed to create status', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const id = getStatusId(item);
    if (!id) {
      addToast('Unable to delete this status', 'danger');
      return;
    }

    try {
      await apiDelete(`/user-statuses/${id}`);
      setDayStatusDict((prev) => {
        const next = { ...prev };
        delete next[item.name];
        return next;
      });
      addToast('User status deleted');
    } catch (err) {
      console.error('Failed to delete status:', err);
      addToast('Failed to delete status', 'danger');
    }
  };

  return (
    <Container style={styleSheet.page}>
      <div style={styleSheet.header}>
        <div>
          <h1 style={styleSheet.title}>User Statuses</h1>
        </div>
        <Button
          variant="secondary"
          size="sm"
          style={styleSheet.addButton}
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? 'Cancel' : 'Add new Status'}
        </Button>
      </div>

      {showAddForm && (
        <Row className="align-items-end mb-4">
          <Col sm={8}>
            <Form.Control
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Enter status name"
              style={styleSheet.input}
            />
          </Col>
          <Col sm={4} className="text-end">
            <Button
              variant="primary"
              size="sm"
              style={styleSheet.saveButton}
              onClick={handleCreate}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Status'}
            </Button>
          </Col>
        </Row>
      )}

      {dayStatusLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : statuses.length === 0 ? (
        <div style={styleSheet.empty}>No user statuses found.</div>
      ) : (
        <div style={styleSheet.tableWrapper}>
          <Table responsive variant="dark" className="mb-0" style={styleSheet.table}>
            <thead style={styleSheet.tableHead}>
              <tr>
                <th style={styleSheet.idHeader}>ID</th>
                <th style={styleSheet.nameHeader}>Name</th>
                <th style={styleSheet.actionsHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((status) => {
                const id = getStatusId(status);
                const name = getStatusName(status);
                return (
                  <tr key={id || name} style={styleSheet.row}>
                    <td style={styleSheet.idCell}>{id || '-'}</td>
                    <td style={styleSheet.nameCell}>{name}</td>
                    <td style={styleSheet.actionsCell}>
                      <Button
                        variant="danger"
                        size="sm"
                        style={styleSheet.deleteButton}
                        onClick={() => handleDelete(status)}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

const styleSheet = {
  page: {
    margin: '2% 0 0 6.5%',
    width: '80%',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    margin: 0,
    fontWeight: 700,
  },
  subtitle: {
    color: '#adb5bd',
    fontSize: '0.95rem',
    marginTop: '0.25rem',
  },
  addButton: {
    padding: '0.55rem 1rem',
    borderRadius: '0.35rem',
    border: '1px solid #343a40',
    backgroundColor: '#1f2937',
    color: '#fff',
  },
  input: {
    backgroundColor: '#121418',
    border: '1px solid #343a40',
    color: '#fff',
    padding: '0.85rem 0.9rem',
    borderRadius: '0.35rem',
  },
  saveButton: {
    padding: '0.55rem 1rem',
    borderRadius: '0.35rem',
  },
  empty: {
    color: '#fff',
    padding: '2rem 0',
  },
  tableWrapper: {
    backgroundColor: '#1b1f28',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },
  table: {
    marginBottom: 0,
    color: '#fff',
  },
  tableHead: {
    backgroundColor: '#11151d',
    color: '#adb5bd',
  },
  row: {
    borderBottom: '1px solid #2f3033',
  },
  idHeader: {
    width: '10%',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
  },
  nameHeader: {
    fontSize: '0.95rem',
  },
  actionsHeader: {
    width: '12%',
    textAlign: 'center',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
  },
  idCell: {
    padding: '0.9rem 0.75rem',
    fontSize: '0.95rem',
  },
  nameCell: {
    padding: '0.9rem 0.75rem',
    fontSize: '0.95rem',
  },
  actionsCell: {
    padding: '0.9rem 0.75rem',
    textAlign: 'center',
  },
  deleteButton: {
    minWidth: '44px',
    padding: '0.45rem 0.65rem',
    borderRadius: '0.35rem',
    border: 'none',
    backgroundColor: '#c92a2a',
    color: '#fff',
  },
};

export default UserStatusesPage;
