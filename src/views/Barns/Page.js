import React, { Component } from 'react';
import AxiosRest from '../../libs/AxiosRest';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Popconfirm,
    Table,
    Input,
    Icon,
    Modal,
    notification,
    Row
} from 'antd';

const FormItem = Form.Item;

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apiendpoint: 'barns',
            label: {
                cardTitle: 'List Of Barns',
                modalTitleNew: 'Update Barn',
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

    componentDidMount() {
        this.handleList();
    }

    handleList = () => {
        AxiosRest.get(this.state.apiendpoint)
            .then((res) => {
                this.setState({ dataTables: res.data });
            });
    };

    prepareBody = (values) => {
        let carrot = values.carrot
        let sharingType = values.sharingType
        return { sharingType, carrot };
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isFormUpdate) {
                    AxiosRest.put(`${this.state.apiendpoint}/${this.state.updatedata.id}`, this.prepareBody(values))
                        .then((result) => {
                            if (result.data.id == this.state.updatedata.id) {
                                notification.success({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data updated successfully',
                                });
                                // close modal
                                this.openModal(false);
                                // reload list
                                this.handleList();
                            } else {
                                notification.error({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data updated is failed',
                                });
                            }
                        });
                } else {
                    AxiosRest.post(this.state.apiendpoint, this.prepareBody(values))
                        .then((result) => {
                            if (result.data.grade == values.grade) {
                                notification.success({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data created successfully',
                                });
                                // close modal
                                this.openModal(false);
                                // reload list
                                this.handleList();
                            } else {
                                notification.error({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data submitted is failed',
                                });
                            }
                        });
                }
            }
        });
    };

    handleDelete = (id) => {
        AxiosRest.delete(`${this.state.apiendpoint}/${id}`)
            .then((res) => {
                const dataTables = [...this.state.dataTables];
                this.setState({ dataTables: dataTables.filter(item => item.id !== id) });
                notification.success({
                    message: this.state.label.notificationMessage,
                    description: 'Data deleted successfully',
                });
            });
    };

    handleUpdate = (record) => {
        this.setState({ isFormUpdate: true });
        this.setState({ updatedata: record });
        this.props.form.setFieldsValue({
            sharingType: record.sharingType,
            carrot: record.carrot
        });
        this.openModal(true);
    };

    handleNewModal = (record) => {
        this.setState({ updatedata: {} });
        this.setState({ isFormUpdate: false });
        this.resetFormFields();
        this.openModal(true);
    };

    handleCancel = () => {
        this.setState({ updatedata: {} });
        this.resetFormFields();
        this.openModal(false);
    };

    resetFormFields = () => {
        this.props.form.setFieldsValue({
            sharingType: null,
            carrot: null
        });
    };

    openModal = (modalVisible) => {
        this.setState({ modalVisible });
    };

    onChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    };

    getCheckboxProps = record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    });

    getModalTitle = () => {
        return this.state.isFormUpdate ? this.state.label.modalTitleNew : this.state.label.modalTitleUpdate;
    };

    headerTable = () => [{
        key: 'header-column-id',
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
    },
    {
        key: 'header-column-rolename',
        title: 'Barn Name',
        dataIndex: 'name'
    },
    {
        key: 'header-column-start',
        title: 'Start',
        dataIndex: 'startPeriode'
    },
    {
        key: 'header-column-end',
        title: 'End',
        dataIndex: 'endPeriode'
    },
    {
        key: 'header-column-owner',
        title: 'Owner',
        dataIndex: 'owner'
    },
    {
        key: 'header-column-carrot',
        title: 'Carrot',
        dataIndex: 'carrot'
    },
    {
        key: 'header-column-carrot-left',
        title: 'Carrot Left',
        dataIndex: 'owner'
    },
    {
        key: 'header-column-status',
        title: 'Status',
        dataIndex: 'status'
    },
    {
        key: 'header-column-isreleased',
        title: 'Released',
        dataIndex: 'isReleased'
    },
    {
        key: 'header-column-action',
        title: 'Action',
        dataIndex: 'id',
        // render: (id, row, index) => <button type="button" className="ant-btn ant-btn-danger" onClick={(e) => this.state.showDeleteConfirm(id, row, index)}>Delete</button>,
        render: (text, record, index) => {
            return (
                this.state.dataTables.length > 0
                    ? (
                        <span>
                            <a className="ant-btn ant-btn-info" onClick={() => this.handleUpdate(record)} href="javascript:;"><Icon type="edit" /> Edit</a>
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <a className="ant-btn ant-btn-danger" href="javascript:;"><Icon type="delete" /> Delete</a>
                            </Popconfirm>
                        </span>
                    ) : null
            );
        },
    }];

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col span={48}>
                    <Card title={<span><Icon type="bars" /> {this.state.label.cardTitle}</span>} bordered extra={<Button type="primary" icon="plus-circle-o" onClick={() => this.handleNewModal()}>Add New Data</Button>}>
                        <Table
                            rowKey={record => record.id}
                            columns={this.headerTable()}
                            dataSource={this.state.dataTables}
                            rowSelection={this.state.rowSelection}
                        />
                    </Card>
                </Col>

                <Modal
                    title={this.getModalTitle()}
                    centered
                    visible={this.state.modalVisible}
                    onOk={() => this.handleSubmit()}
                    onCancel={() => this.handleCancel()}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem label="Barn">
                            {getFieldDecorator('sharingType', {
                                rules: [{ required: true, message: 'Please input sharing type!', whitespace: true }],
                            })(
                                <Input type="text" id="sharingType" placeholder="input sharing type" />
                            )}
                        </FormItem>
                        <FormItem label="Carrot">
                            {getFieldDecorator('carrot', {
                                rules: [{ required: true, message: 'Please input number of carrot!' }],
                            })(
                                <Input type="number" id="carrot" placeholder="input carrot" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </Row >
        );
    }
}

export default Form.create()(Page);
