import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom"; 
import "./Registermem.css";
import Footer from '../components/Footer';

// ✅ Chỉ cho phép nhập số điện thoại hợp lệ (bắt đầu bằng 0, tổng 10 số)
const schema = yup.object({
    emailOrPhone: yup
        .string()
        .required('Vui lòng nhập SĐT')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
}).required();

function Registermem() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // ✅ Dùng hook điều hướng

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        alert("Đăng ký thành công!");
        console.log("Thông tin đăng ký:", data);

        // ✅ Chuyển hướng sang trang đăng nhập sau khi đăng ký
        navigate("/login");
    };

    return (
        <div className="register-page">
            
            <div className="register-content">
                <div className="register-box">
                    <h2 className="register-title">Đăng ký</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="emailOrPhone">
                            Số điện thoại<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="emailOrPhone"
                            placeholder="Nhập số điện thoại của bạn"
                            {...register("emailOrPhone")}
                        />
                        {errors.emailOrPhone && <p className="error">{errors.emailOrPhone.message}</p>}

                        <label htmlFor="password">
                            Mật khẩu<span className="required">*</span>
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Nhập mật khẩu của bạn"
                                {...register("password")}
                            />
                            <span className="toggle-eye" onClick={togglePassword}></span>
                        </div>
                        {errors.password && <p className="error">{errors.password.message}</p>}

                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu<span className="required">*</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

                        <button type="submit" className="register-button">
                            Đăng ký
                        </button>
                    </form>
                    <div className="register-link">
                        Đã có tài khoản? <a href="/login">Quay về đăng nhập</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Registermem;
