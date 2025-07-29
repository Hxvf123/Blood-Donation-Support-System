import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./CheckIn.scss";

const CheckinPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleCheckin = async () => {
    if (inputValue.trim() === "") {
      toast.error("Vui lòng nhập mã check-in!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    // const payload = {
    //   userId: inputValue.trim(),
    // };

    try {
      const response = await axios.put("http://localhost:5294/api/BloodDonation/check-in-by-id", JSON.stringify(inputValue.trim()), {
        headers: {
          Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
        },
      });

      if (response.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.success(`Check-in thành công cho mã: ${inputValue}`);
      }

      setInputValue("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Check-in thất bại. Vui lòng thử lại!";
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="checkin-container">
      <h2 className="text-center mb-4">Check-in Sự Kiện</h2>

      <Form className="checkin-form" onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="checkinInput">
          <Form.Label>Mã Check-in</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mã Check-in"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={handleCheckin}
        >
          Check-in
        </Button>
        
      </Form>
    </Container>
  );
};

export default CheckinPage;
