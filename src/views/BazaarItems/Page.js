import React, { Component } from 'react';
import AxiosRest from '../../libs/AxiosRest';
import { Button, Card, Col, Divider, Form,
         Popconfirm, Table, Input, Icon,
         Modal, notification, Row } from 'antd';

const FormItem = Form.Item;

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apiendpoint: 'bazaars',
            label: {
                cardTitle: 'List Of Bazaars',
                modalTitleNew: 'Update Bazaar',
                modalTitleUpdate: 'Create Barn',
                notificationMessage: 'Info'
            },
            isFormUpdate: false,
            modalVisible: false,
            dataTables: [],
            updatedata: {},
            rowSelection: {
                onChange: this.onChange,
                getCheckboxProps: this.getCheckboxProps,
            },
        };
    }

    render() {

    }
}