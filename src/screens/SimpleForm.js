import moment from 'moment';
import { Button, Container, Content, Form , Input, Item, Label, Textarea } from "native-base";
import React, { useState } from "react";
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker from '../components/DateTimePicker';

export function SimpleForm(props) {

    const [date, setDate] = useState(new Date());
    const [feedback, setFeedback] = useState('');
    const [title, setTtitle] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
        console.log(isDatePickerVisible);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };

    const onSubmit = () => {
        alert('Date: ' + date);
    }

    return (
        <Container>
            <Content style={{
                paddingRight: 16
            }}>
                <Form>
                    <Item stackedLabel>
                        <Label>User feedback</Label>
                        <Textarea style={{ width: '100%' }} rowSpan={5} />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Title</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>Time</Label>
                        <TouchableHighlight
                            onPress= {() => showDatePicker()}>
                        <Text>{moment(date).format('YYYY-MM-DD')}</Text>
                        </TouchableHighlight>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </Item>
                    <Item>
                        <Button
                            full block
                            style={{ marginTop: 10,width:'100%' }}
                            onPress={onSubmit}>
                            <Text style={{ color: 'white' }}>SAVE</Text>
                        </Button>
                    </Item>
                </Form>
            </Content>
        </Container>
    );
}
