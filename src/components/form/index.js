import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Alert, Button, Input } from "antd";
import React, { useState } from "react";

function Form({
  isLogin = true,
  credentials,
  setCredentials,
  onFormSubmit,
  disabled,
  loading,
  emailError,
  passwordError,
  confirmPasswordError,
  firstNameError,
  lastNameError,
}) {
  return (
    <div className="pb-form-main-wrapper">
      <div className={`pb-form pb-${isLogin ? "login" : "signup"}`}>
        <div className="pb-form-inner_wrapper">
          {!isLogin && (
            <>
              <div>
                <Input
                  required
                  status={firstNameError?.status ? "error" : ""}
                  placeholder="First Name"
                  value={credentials?.firstName}
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      firstName: event.target.value,
                    })
                  }
                />
                {firstNameError?.status && (
                  <div>
                    <p className="pb-error">{firstNameError?.message}</p>
                  </div>
                )}
              </div>
              <div>
                <Input
                  required
                  status={lastNameError?.status ? "error" : ""}
                  placeholder="Last Name"
                  value={credentials?.lastName}
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      lastName: event.target.value,
                    })
                  }
                />
                {lastNameError?.status && (
                  <div>
                    <p className="pb-error">{lastNameError?.message}</p>
                  </div>
                )}
              </div>
            </>
          )}
          <div>
            <Input
              required
              status={emailError?.status ? "error" : ""}
              type="email"
              placeholder="Email"
              value={credentials?.email}
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
            />
            {emailError?.status && (
              <div>
                <p className="pb-error">{emailError?.message}</p>
              </div>
            )}
          </div>
          <div>
            <Input.Password
              required
              placeholder="Password"
              status={passwordError?.status ? "error" : ""}
              value={credentials?.password}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
            />
            {passwordError?.status && (
              <div>
                <p className="pb-error">{passwordError?.message}</p>
              </div>
            )}
          </div>
          {!isLogin && (
            <div>
              <Input.Password
                required
                placeholder="Repeat Password"
                status={confirmPasswordError?.status ? "error" : ""}
                value={credentials?.repeatPassword}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    repeatPassword: event.target.value,
                  })
                }
              />
              {confirmPasswordError?.status && (
                <div>
                  <p className="pb-error">{confirmPasswordError?.message}</p>
                </div>
              )}
            </div>
          )}
          <Button
            size="large"
            disabled={disabled}
            loading={loading}
            type="primary"
            style={{
              backgroundColor: "#7749F8",
              color: "#ffffff",
              opacity: disabled ? ".5" : "1",
            }}
            onClick={onFormSubmit}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
