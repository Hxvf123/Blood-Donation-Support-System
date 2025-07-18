import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import './ManagerAccount.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaIdCard, FaUser, FaEnvelope, FaUserTag, FaUserCog } from 'react-icons/fa';


function AccountManagement() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const accountsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAccounts(accountsList);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, { role: newRole });

      setAccounts(prev =>
        prev.map(user => (user.id === id ? { ...user, role: newRole } : user))
      );

      toast.success("Cập nhật vai trò thành công!");
    } catch (error) {
      console.error('Lỗi khi cập nhật vai trò:', error);
      toast.error("Lỗi khi cập nhật vai trò!");
    }
  };

  return (
    <div className="account-management">
      <h2> Danh sách tài khoản</h2>

      {accounts.length === 0 ? (
        <p className="no-data">Không có tài khoản nào.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><FaIdCard style={{ marginRight: '6px' }} />ID</th>
                <th><FaUser style={{ marginRight: '6px' }} />Tên</th>
                <th><FaEnvelope style={{ marginRight: '6px' }} />Email</th>
                <th><FaUserTag style={{ marginRight: '6px' }} />Vai trò</th>
                <th><FaUserCog style={{ marginRight: '6px' }} />Chỉnh sửa</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td>{acc.role}</td>
                  <td>
                    <select
                      value={acc.role}
                      onChange={(e) => handleRoleChange(acc.id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>

                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default AccountManagement;