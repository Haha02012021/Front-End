import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Space,
  notification,
} from "antd";
import AuthService from "../../../services/auth.service";
import { formMessages, notiMessages } from "../../../constants/messages";
import { UserOutlined } from "@ant-design/icons";
import AuthContext from "../../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const checkSignedIn = () => {
    navigate("/");
  };

  if (user) {
    checkSignedIn();
  }

  const handleLogin = async (values) => {
    try {
      const res = await AuthService.login(values);
      notification.success({
        message: res.message,
        duration: 1,
      });
      delete res.message;
    //   localStorage.setItem("token", JSON.stringify(res.token));
    //   delete res.token;
      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/");
    } catch (error) {
      notification.error({
        message: error.response.data.message,
        duration: 1,
      });
    }
  };

  const handleLoginFailed = () => {};

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card style={{ width: 400 }}>
        <Space direction="vertical" style={{ width: "100%" }} size={8}>
          <Flex justify="center">
            <Avatar icon={<UserOutlined />} size={80} />
          </Flex>
          <Form
            onFinish={handleLogin}
            onFinishFailed={handleLoginFailed}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              type="text"
              rules={[
                {
                  required: true,
                  message: formMessages.username.required,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              type="password"
              rules={[
                {
                  required: true,
                  message: formMessages.password.required,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </Space>
      </Card>
    </Flex>
  );
};

export default Login;
