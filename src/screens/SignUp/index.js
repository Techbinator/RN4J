import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Left,
  Right,
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";

import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength8 = minLength(8);
export const minLength5 = minLength(5);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={
              input.name === "username"
                ? "person"
                : input.name === "email" ? "mail" : "unlock"
            }
            style={{ color: "#fff" }}
          />
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={
              input.name === "username"
                ? "Username"
                : input.name === "email" ? "Email" : "Password"
            }
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={{ color: "#fff", marginTop: 5, right: 10 }}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text
              style={{
                fontSize: 15,
                color: commonColor.brandDanger,
                textAlign: "right",
                top: -10
              }}
            >
              {error}
            </Text>
          : <Text
              style={{
                fontSize: 15,
                color: "transparent",
                textAlign: "right",
                top: -10
              }}
            >
              error here
            </Text>}
      </View>
    );
  }
  signUp() {
    if (this.props.valid) {
      this.props.navigation.navigate("Login");
    } else {
      Toast.show({
        text: "All the fields are compulsory!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        <Image
          source={require("../../../assets/bg-signup.png")}
          style={styles.background}
        >
          <Content padder>
            <Text style={styles.signupHeader}>CREATE ACCOUNT</Text>
            <View style={styles.signupContainer}>
              <Field
                name="username"
                component={this.renderInput}
                type="text"
                validate={[required, alphaNumeric, minLength5]}
              />

              <Field
                name="email"
                component={this.renderInput}
                type="email"
                validate={[email, required]}
              />
              <Field
                name="password"
                component={this.renderInput}
                type="password"
                validate={[alphaNumeric, minLength8, maxLength15, required]}
              />

              <Button
                rounded
                bordered
                block
                onPress={() => this.signUp()}
                style={styles.signupBtn}
              >
                <Text style={{ color: "#FFF" }}>Continue</Text>
              </Button>
            </View>
          </Content>
          <Footer
            style={{
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Left>
              <Button small transparent>
                <Text style={styles.helpBtns}>Terms & Conditions</Text>
              </Button>
            </Left>
            <Right>
              <Button
                small
                transparent
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={styles.helpBtns}>SignIn</Text>
              </Button>
            </Right>
          </Footer>
        </Image>
      </Container>
    );
  }
}

const SignUp = reduxForm({
  form: "test"
})(SignUpForm);
export default SignUp;
