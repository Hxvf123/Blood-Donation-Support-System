import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerAccount.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaIdCard, FaUser, FaEnvelope, FaUserTag, FaUserCog } from 'react-icons/fa';

function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [checkedRole, setCheckedRole] = useState(false); // để đảm bảo đã kiểm tra quyền xong

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.accessToken;
        const role = user?.role; // 👈 thêm kiểm tra role từ localStorage

        if (role !== "Admin") {
          toast.error("Bạn không có quyền truy cập trang này!");
          setHasPermission(false);
          setCheckedRole(true);
          return;
        }

        setHasPermission(true);
        setCheckedRole(true);

        const res = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/get-all-user", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data?.Data || [];
        setAccounts(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        toast.error("Lỗi khi lấy danh sách người dùng");
      }
    };

    fetchAccounts();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.accessToken;

      await axios.post(
        'https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/set-role',
        {
          UserId: userId,
          Role: newRole
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAccounts(prev =>
        prev.map(user => (user.UserId === userId ? { ...user, Role: newRole } : user))
      );

      toast.success("Cập nhật vai trò thành công!");
    } catch (error) {
      console.error('Lỗi khi cập nhật vai trò:', error);
      toast.error("Lỗi khi cập nhật vai trò!");
    }
  };

  if (!checkedRole) {
    return <p>Đang kiểm tra quyền truy cập...</p>;
  }

  if (!hasPermission) {
    return (
      <div className="create-event-page">
        <ToastContainer />
        <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
          Bạn không có quyền truy cập trang này.
        </h2>
      </div>
    );
  }

  return (
    <div className="account-management">
      <h2>Danh sách tài khoản</h2>

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
                <tr key={acc.UserId}>
                  <td>{acc.UserId}</td>
                  <td>{acc.FullName}</td>
                  <td>{acc.Email}</td>
                  <td>{acc.Role}</td>
                  <td>
                    <select
                      value={acc.Role}
                      onChange={(e) => handleRoleChange(acc.UserId, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Staff">Staff</option>
                      <option value="Manager">Manager</option>
                      <option value="Member">Member</option>
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
