import React from 'react';
import { Form} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BloodDonationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { differenceInYears } from 'date-fns';

const schema = yup.object({
    fullName: yup.string().required('Vui lòng nhập Họ và Tên'),

    birthDate: yup
        .date()
        .nullable()
        .required('Vui lòng chọn ngày sinh')
        .test('is-18', 'Bạn phải đủ 18 tuổi', function (value) {
            return value && differenceInYears(new Date(), value) >= 18;
        }),

    gender: yup.string().required('Vui lòng chọn giới tính'),

    phone: yup
        .string()
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, 'Số điện thoại không hợp lệ')
        .required('Bắt buộc nhập số điện thoại'),

    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),

    address: yup.string().required('Vui lòng nhập địa chỉ'),

    bloodGroup: yup.string().required('Vui lòng nhập nhóm máu'),
}).required();

const BloodDonationForm = ({ onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: '',
            birthDate: null,
            gender: '',
            phone: '',
            email: '',
            address: '',
            bloodGroup: '',
        },
        resolver: yupResolver(schema)
    });

    const onHandleSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data); // Truyền dữ liệu lên component cha
        }
    };

    return (
        <div className="form-container">
            <h2>Thông Tin Của Bạn</h2>
            <Form onSubmit={handleSubmit(onHandleSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                type="text"
                                placeholder="Nhập họ và tên"
                                isInvalid={!!errors.fullName}
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.fullName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
    <Form.Label>Ngày sinh</Form.Label>
    <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
            <DatePicker
                {...field}
                selected={field.value ? new Date(field.value) : null}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                maxDate={new Date()}
                autoComplete="off"
            />
        )}
    />
    <div className="invalid-feedback d-block">
        {errors.birthDate?.message}
    </div>
</Form.Group>


                <Form.Group className="mb-4 gender-group">
                    <Form.Label>Giới tính</Form.Label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Form.Select {...field} isInvalid={!!errors.gender}>
                                <option value="">--Chọn--</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </Form.Select>
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.gender?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                isInvalid={!!errors.phone}
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                type="email"
                                placeholder="Nhập email"
                                isInvalid={!!errors.email}
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                type="text"
                                placeholder="Nhập địa chỉ"
                                isInvalid={!!errors.address}
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nhóm máu</Form.Label>
                    <Controller
                        name="bloodGroup"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                type="text"
                                placeholder="Nhập nhóm máu"
                                isInvalid={!!errors.bloodGroup}
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="buttons">
                    <button type="submit" className="register-button">
                        Lưu thông tin
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default BloodDonationForm;
