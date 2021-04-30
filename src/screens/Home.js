import { Card, CardItem, Content, Body, Button, Container, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';

export default function HomeScreen(props) {
    console.log()
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>HOME SCREEN</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Test application</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            block
            dark
            style={{ marginTop: 10 }}
            onPress={() => props.navigation.navigate("ImagePicker")}
          >
            <Text>Image picker</Text>
          </Button>
          <Button
            full
            block
            primary
            style={{ marginTop: 10 }}
            onPress={() => props.navigation.navigate("SimpleForm")}
          >
            <Text>Simple form</Text>
          </Button>
        </Content>
      </Container>
    );
  }