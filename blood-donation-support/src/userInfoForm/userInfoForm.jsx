import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./userInfoForm.scss";

const UserInfoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Xử lý dữ liệu ở đây
    };

    const BLOOD_GROUPS = ["A", "B", "AB", "O"];

    return (
        <div className="user-info-form-container">
            <Form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form-title">Thông Tin Của Bạn</h2>

                <Form.Group className="mb-2">
                    <Form.Label className="form-label">Họ và tên</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
                        isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.fullName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="form-label">Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dob", { required: "Vui lòng chọn ngày sinh" })}
                                isInvalid={!!errors.dob}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dob?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="form-label">Giới tính</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Nam"
                                    value="Nam"
                                    {...register("gender", { required: "Chọn giới tính" })}
                                    id="gender-male"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Nữ"
                                    value="Nữ"
                                    {...register("gender", { required: "Chọn giới tính" })}
                                    id="gender-female"
                                />
                            </div>
                            {errors.gender && (
                                <div className="invalid-feedback d-block">
                                    {errors.gender.message}
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-2">
                    <Form.Label className="form-label">Số điện thoại</Form.Label>
                    <Form.Control
                        type="tel"
                        {...register("phone", {
                            required: "Vui lòng nhập số điện thoại",
                            pattern: {
                                value: /^0\d{9}$/,
                                message: "Số điện thoại phải gồm 10 số và bắt đầu bằng số 0"
                            }
                        })}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label className="form-label">Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Nhóm máu</Form.Label>
                    <Form.Select
                        {...register("bloodGroup", {
                            required: "Vui lòng chọn nhóm máu",
                            validate: value =>
                                BLOOD_GROUPS.includes(value)
                        })}
                        isInvalid={!!errors.bloodGroup}
                        defaultValue=""
                    >
                        <option value="" disabled>Chọn nhóm máu</option>
                        {BLOOD_GROUPS.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Cập nhật thông tin
                </Button>
            </Form>
        </div>
    );
};

export default UserInfoForm;
